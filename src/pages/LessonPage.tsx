import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getLesson, getQuestion, getSubject, getTopic, lessonNeighbours, type Lesson } from '../content';
import { BookmarkButton } from '../components/BookmarkButton';
import { FormulaCard } from '../components/FormulaCard';
import { Icon } from '../components/Icon';
import { Markdown, headingsOf } from '../components/Markdown';
import { NotesPanel } from '../components/NotesPanel';
import { ProgressBar } from '../components/ProgressBar';
import { QuestionCard } from '../components/QuestionCard';
import { useProgress } from '../store/progress';
import NotFound from './NotFound';

const DIFFICULTY = ['', 'Foundation', 'Standard', 'Challenging'];

/* Where you stopped reading each lesson, on this device (not synced: screens differ). */
const SCROLL_KEY = 'dp-academy:scroll';
function readScroll(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(SCROLL_KEY) ?? '{}');
  } catch {
    return {};
  }
}
function saveScroll(key: string, y: number) {
  try {
    const all = readScroll();
    delete all[key];
    if (y > 0) all[key] = y;
    const trimmed = Object.fromEntries(Object.entries(all).slice(-40));
    localStorage.setItem(SCROLL_KEY, JSON.stringify(trimmed));
  } catch {
    /* ignore */
  }
}

/** Offers to jump back to where you stopped last time, and remembers the new position. */
function useResumeReading(lessonKey: string | undefined, article: React.RefObject<HTMLElement | null>) {
  const [resumeAt, setResumeAt] = useState<number | null>(null);
  useEffect(() => {
    if (!lessonKey) return;
    const saved = readScroll()[lessonKey];
    setResumeAt(saved && saved > 800 && !window.location.hash ? saved : null);
    let timer: ReturnType<typeof setTimeout> | undefined;
    const onScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const el = article.current;
        const nearEnd = el ? el.getBoundingClientRect().bottom < window.innerHeight * 1.2 : false;
        saveScroll(lessonKey, nearEnd ? 0 : Math.round(window.scrollY));
        if (window.scrollY > 800) setResumeAt(null);
      }, 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, [lessonKey, article]);
  return [resumeAt, () => setResumeAt(null)] as const;
}

/** Fraction of the article scrolled past. */
function useReadingProgress(ref: React.RefObject<HTMLElement | null>) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.6;
      setP(total <= 0 ? 1 : Math.max(0, Math.min(1, -rect.top / total)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref]);
  return p;
}

/** Subscribes to scroll on its own so the lesson body doesn't re-render as you read. */
function ReadingProgress({ target, variant }: { target: React.RefObject<HTMLElement | null>; variant: 'pinned' | 'inline' }) {
  const p = useReadingProgress(target);
  if (variant === 'pinned') {
    return (
      <div className="sticky top-14 z-20 h-0.5 bg-transparent">
        <div className="h-full bg-accent transition-[width] duration-150" style={{ width: `${p * 100}%` }} />
      </div>
    );
  }
  return (
    <div className="mt-6 flex items-center gap-3">
      <ProgressBar value={p} size="sm" label="Reading progress" />
      <span className="w-10 text-right text-xs text-muted">{Math.round(p * 100)}%</span>
    </div>
  );
}

/** The heading currently at the top of the viewport. */
function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -65% 0px' },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

function Toc({ items, active, onPick }: { items: { id: string; text: string; depth: number }[]; active?: string; onPick?: () => void }) {
  return (
    <ul className="space-y-0.5 text-sm">
      {items.map((h) => (
        <li key={h.id}>
          <a
            href={`#${h.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              history.replaceState(null, '', `#${h.id}`);
              onPick?.();
            }}
            className={`block rounded-md py-1.5 pr-2 transition-colors ${h.depth === 3 ? 'pl-6' : 'pl-3'} ${
              active === h.id ? 'bg-sunken font-medium text-ink' : 'text-muted hover:text-ink'
            }`}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

function Extras({ lesson }: { lesson: Lesson }) {
  const m = lesson.meta;
  return (
    <>
      {m.formulas.length > 0 && (
        <>
          <h2 id="formulas">Formulas</h2>
          <div className="not-prose grid gap-3 sm:grid-cols-2">
            {m.formulas.map((f) => (
              <FormulaCard key={f.name} formula={f} />
            ))}
          </div>
        </>
      )}
      {m.definitions.length > 0 && (
        <>
          <h2 id="definitions">Definitions</h2>
          <dl className="space-y-3">
            {m.definitions.map((d) => (
              <div key={d.term} className="rounded-lg border border-line bg-card px-4 py-3">
                <dt className="font-semibold text-ink">{d.term}</dt>
                <dd className="mt-0.5 text-[0.975rem]">
                  <Markdown>{d.definition}</Markdown>
                </dd>
              </div>
            ))}
          </dl>
        </>
      )}
      {m.mistakes.length > 0 && (
        <>
          <h2 id="common-mistakes">Common mistakes</h2>
          <ul>
            {m.mistakes.map((x) => (
              <li key={x}>
                <Markdown>{x}</Markdown>
              </li>
            ))}
          </ul>
        </>
      )}
      {m.tips.length > 0 && (
        <>
          <h2 id="exam-tips">Exam tips</h2>
          <ul>
            {m.tips.map((x) => (
              <li key={x}>
                <Markdown>{x}</Markdown>
              </li>
            ))}
          </ul>
        </>
      )}
      {m.related.length > 0 && (
        <>
          <h2 id="related-topics">Related topics</h2>
          <div className="not-prose flex flex-wrap gap-2">
            {m.related.map((k) => {
              const t = getTopic(k);
              return t ? (
                <Link key={k} to={t.href} className="chip h-8 px-3 hover:bg-line">
                  {t.code} {t.title}
                </Link>
              ) : null;
            })}
          </div>
        </>
      )}
    </>
  );
}

export default function LessonPage() {
  const { subjectId = '', topicId = '', lessonSlug = '' } = useParams();
  const lesson = getLesson(`${subjectId}/${topicId}/${lessonSlug}`);
  const topic = getTopic(`${subjectId}/${topicId}`);
  const subject = getSubject(subjectId);
  const visit = useProgress((s) => s.visitLesson);
  const completedAt = useProgress((s) => (lesson ? s.completed[lesson.key] : undefined));
  const setComplete = useProgress((s) => s.setComplete);
  const hasNote = useProgress((s) => (lesson ? !!s.notes[lesson.key] : false));
  const article = useRef<HTMLElement>(null);
  const [notesOpen, setNotesOpen] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const navigate = useNavigate();
  const [resumeAt, dismissResume] = useResumeReading(lesson?.key, article);

  useEffect(() => {
    if (lesson) visit(lesson.key);
  }, [lesson, visit]);

  // Keyboard: ← → move between lessons, M toggles complete, N opens notes.
  useEffect(() => {
    if (!lesson) return;
    const { prev, next } = lessonNeighbours(lesson);
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.defaultPrevented) return;
      if ((e.target as HTMLElement)?.closest('input, textarea, select, [contenteditable], [role="dialog"]')) return;
      if (e.key === 'ArrowLeft' && prev) navigate(prev.href);
      else if (e.key === 'ArrowRight' && next) navigate(next.href);
      else if (e.key === 'm' || e.key === 'M') setComplete(lesson.key, !useProgress.getState().completed[lesson.key]);
      else if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        setNotesOpen(true);
      } else return;
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lesson, navigate, setComplete]);

  const toc = useMemo(() => {
    if (!lesson) return [];
    const m = lesson.meta;
    return [
      { id: 'objectives', text: 'Learning objectives', depth: 2 },
      ...headingsOf(lesson.body),
      ...(m.formulas.length ? [{ id: 'formulas', text: 'Formulas', depth: 2 }] : []),
      ...(m.definitions.length ? [{ id: 'definitions', text: 'Definitions', depth: 2 }] : []),
      ...(m.mistakes.length ? [{ id: 'common-mistakes', text: 'Common mistakes', depth: 2 }] : []),
      ...(m.tips.length ? [{ id: 'exam-tips', text: 'Exam tips', depth: 2 }] : []),
      ...(m.related.length ? [{ id: 'related-topics', text: 'Related topics', depth: 2 }] : []),
    ];
  }, [lesson]);
  const tocIds = useMemo(() => toc.map((t) => t.id), [toc]);
  const topicKey = topic?.key;
  const embed = useCallback(
    (id: string) => {
      const q = getQuestion(`${topicKey}/${id}`);
      return q ? (
        <div className="my-2">
          <QuestionCard question={q} showLessonLink={false} />
        </div>
      ) : null;
    },
    [topicKey],
  );
  const active = useActiveHeading(tocIds);

  if (!lesson || !topic || !subject) return <NotFound />;

  const { prev, next } = lessonNeighbours(lesson);
  const done = !!completedAt;
  const m = lesson.meta;


  const completeAndNext = () => {
    if (!done) setComplete(lesson.key, true);
    if (next) navigate(next.href);
  };

  return (
    <div>
      <ReadingProgress target={article} variant="pinned" />

      <div className="mx-auto flex max-w-6xl gap-10 px-4 pt-6 md:px-8 md:pt-10">
        <article ref={article} className="min-w-0 max-w-[44rem] flex-1">
          <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted">
            <Link to={subject.href} className="inline-flex items-center gap-1 hover:text-ink">
              <Icon name="arrowLeft" size={14} /> {subject.short}
            </Link>
            <span aria-hidden="true">/</span>
            <Link to={topic.href} className="hover:text-ink">
              {topic.code} {topic.title}
            </Link>
          </nav>

          <header>
            <h1 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">{m.title}</h1>
            <p className="mt-3 text-lg text-ink-2">{m.summary}</p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="chip">
                <Icon name="clock" size={12} /> {m.minutes} min
              </span>
              <span className="chip">{DIFFICULTY[m.difficulty]}</span>
              {m.hl && <span className="chip">HL</span>}
              {done && (
                <span className="chip bg-good-soft text-good">
                  <Icon name="check" size={12} /> Completed
                </span>
              )}
              <span className="ml-auto flex items-center gap-1">
                <button type="button" className="icon-btn xl:hidden" onClick={() => setTocOpen((o) => !o)} aria-expanded={tocOpen} aria-label="Contents">
                  <Icon name="list" />
                </button>
                <button
                  type="button"
                  className={`icon-btn xl:hidden ${hasNote ? 'text-accent' : ''}`}
                  onClick={() => setNotesOpen((o) => !o)}
                  aria-expanded={notesOpen}
                  aria-label="Notes"
                >
                  <Icon name="note" />
                </button>
                <BookmarkButton id={lesson.key} kind="lesson" />
              </span>
            </div>
            {tocOpen && (
              <div className="animate-rise card mt-4 p-3 xl:hidden">
                <Toc items={toc} active={active} onPick={() => setTocOpen(false)} />
              </div>
            )}
            {notesOpen && (
              <div className="animate-rise card mt-4 p-4 xl:hidden">
                <NotesPanel lessonKey={lesson.key} autoFocus />
              </div>
            )}
            <ReadingProgress target={article} variant="inline" />
            {resumeAt !== null && (
              <div className="animate-rise mt-4 flex flex-wrap items-center gap-3 rounded-lg border border-line bg-sunken/60 px-4 py-3 text-sm">
                <span className="text-ink-2">You were partway through this lesson.</span>
                <button
                  type="button"
                  className="font-medium text-accent hover:underline"
                  onClick={() => {
                    window.scrollTo({ top: resumeAt, behavior: 'smooth' });
                    dismissResume();
                  }}
                >
                  Continue where you left off
                </button>
                <button type="button" className="icon-btn ml-auto size-7" onClick={dismissResume} aria-label="Dismiss">
                  <Icon name="x" size={14} />
                </button>
              </div>
            )}
          </header>

          <div className="prose-lesson mt-8">
            <section aria-labelledby="objectives" className="rounded-xl border border-line bg-card p-5">
              <h2 id="objectives" className="!mt-0 text-base">
                Learning objectives
              </h2>
              <ul className="mt-3">
                {m.objectives.map((o) => (
                  <li key={o}>
                    <Markdown>{o}</Markdown>
                  </li>
                ))}
              </ul>
              {m.prerequisites.length > 0 && (
                <p className="mt-4 border-t border-line pt-3 text-sm text-muted">
                  <span className="font-medium text-ink-2">Before you start:</span> {m.prerequisites.join(' · ')}
                </p>
              )}
            </section>

            <Markdown embedQuestion={embed}>{lesson.body}</Markdown>
            <Extras lesson={lesson} />
          </div>

          <footer className="mt-14 border-t border-line pt-6">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <div>
                {prev && (
                  <Link to={prev.href} className="btn-ghost -ml-3 h-auto max-w-full flex-col items-start gap-0 py-2 text-left">
                    <span className="flex items-center gap-1 text-xs text-muted">
                      <Icon name="arrowLeft" size={12} /> Previous
                    </span>
                    <span className="line-clamp-1 hidden sm:block">{prev.meta.title}</span>
                  </Link>
                )}
              </div>
              <button type="button" className={done ? 'btn-secondary' : 'btn-primary'} onClick={() => setComplete(lesson.key, !done)} aria-pressed={done}>
                <Icon name="check" size={16} />
                {done ? 'Completed' : 'Mark complete'}
              </button>
              <div className="text-right">
                {next && (
                  <button type="button" onClick={completeAndNext} className="btn-ghost -mr-3 ml-auto h-auto max-w-full flex-col items-end gap-0 py-2 text-right">
                    <span className="flex items-center gap-1 text-xs text-muted">
                      Next <Icon name="arrowRight" size={12} />
                    </span>
                    <span className="line-clamp-1 hidden sm:block">{next.meta.title}</span>
                  </button>
                )}
              </div>
            </div>
            {topic.questions.length > 0 && (
              <Link
                to={`/practice?topic=${encodeURIComponent(topic.key)}`}
                className="card card-hover mt-8 flex items-center gap-4 p-5"
              >
                <Icon name="target" size={22} className="text-accent" />
                <span className="flex-1">
                  <span className="block font-medium text-ink">Practise {topic.title}</span>
                  <span className="block text-sm text-muted">{topic.questions.length} questions with worked explanations</span>
                </span>
                <Icon name="arrowRight" className="text-muted" />
              </Link>
            )}
          </footer>
        </article>

        <aside className="hidden w-64 shrink-0 xl:block">
          <div className="sticky top-24 max-h-[calc(100dvh-7rem)] space-y-6 overflow-y-auto pb-6">
            <div>
              <p className="eyebrow mb-2 px-3">On this page</p>
              <Toc items={toc} active={active} />
            </div>
            <div className="border-t border-line pt-5">
              <NotesPanel lessonKey={lesson.key} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
