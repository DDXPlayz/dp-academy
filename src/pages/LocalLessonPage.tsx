/*
 * Development-only reader for lessons converted from private notes.
 * Registered as a route only when `import.meta.env.DEV` is true.
 */
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getSubject, getTopic } from '../content';
import { Icon } from '../components/Icon';
import { Markdown, headingsOf } from '../components/Markdown';
import { lessonKey, loadLessonMarkdown, SOURCE_LABEL, topicLessons, type LocalLesson } from '../lib/localLessons';
import { useProgress } from '../store/progress';
import NotFound from './NotFound';

export default function LocalLessonPage() {
  const { subjectId = '', topicId = '', slug = '' } = useParams();
  const subject = getSubject(subjectId);
  const topic = getTopic(`${subjectId}/${topicId}`);
  const [list, setList] = useState<LocalLesson[] | null>(null);
  const [md, setMd] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const key = lessonKey(subjectId, topicId, slug);
  const done = useProgress((s) => !!s.completed[key]);
  const setComplete = useProgress((s) => s.setComplete);
  const visit = useProgress((s) => s.visitLesson);

  useEffect(() => {
    topicLessons(subjectId, topicId).then(setList);
  }, [subjectId, topicId]);

  const i = list?.findIndex((l) => l.slug === slug) ?? -1;
  const lesson = list && i >= 0 ? list[i] : undefined;

  useEffect(() => {
    if (!lesson) return;
    setMd(null);
    setError(null);
    loadLessonMarkdown(subjectId, lesson).then(setMd, (e: Error) => setError(e.message));
    visit(key);
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson?.file]);

  const toc = useMemo(() => (md ? headingsOf(md) : []), [md]);
  if (!subject || !topic) return <NotFound />;
  if (list && !lesson) return <NotFound />;
  const prev = list && i > 0 ? list[i - 1] : undefined;
  const next = list && i >= 0 && i < list.length - 1 ? list[i + 1] : undefined;
  const href = (l: LocalLesson) => `/s/${subjectId}/${topicId}/notes/${l.slug}`;

  return (
    <div className="mx-auto flex max-w-6xl gap-10 px-4 pb-24 pt-6 md:px-8 md:pt-10">
      <article className="min-w-0 max-w-[44rem] flex-1">
        <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted">
          <Link to={subject.href} className="inline-flex items-center gap-1 hover:text-ink">
            <Icon name="arrowLeft" size={14} /> {subject.short}
          </Link>
          <Icon name="chevronRight" size={14} />
          <Link to={topic.href} className="hover:text-ink">
            {topic.code} {topic.title}
          </Link>
        </nav>

        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">{lesson?.title ?? ' '}</h1>
          {lesson && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="chip">{SOURCE_LABEL[lesson.source]}</span>
              <span className="chip">
                {topic.code}
                {list ? ` · ${i + 1} of ${list.length}` : ''}
              </span>
              {topic.hl && <span className="chip">HL</span>}
              {done && (
                <span className="chip bg-good-soft text-good">
                  <Icon name="check" size={13} /> Completed
                </span>
              )}
            </div>
          )}
        </header>

        {error && <div className="card p-6 text-bad">{error}</div>}
        {!md && !error && <div className="h-96 animate-pulse rounded-xl bg-sunken" />}
        {md && (
          <div className="prose-lesson">
            <Markdown>{md}</Markdown>
          </div>
        )}

        <footer className="mt-14 border-t border-line pt-6">
          <button type="button" className={done ? 'btn-secondary' : 'btn-primary'} onClick={() => setComplete(key, !done)}>
            <Icon name="check" size={16} /> {done ? 'Marked complete' : 'Mark complete'}
          </button>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {prev ? (
              <Link to={href(prev)} className="card card-hover p-4">
                <span className="text-xs text-muted">Previous</span>
                <span className="mt-1 block font-medium text-ink">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link to={href(next)} className="card card-hover p-4 text-right">
                <span className="text-xs text-muted">Next</span>
                <span className="mt-1 block font-medium text-ink">{next.title}</span>
              </Link>
            ) : (
              <Link to={topic.href} className="card card-hover p-4 text-right">
                <span className="text-xs text-muted">Done with this topic</span>
                <span className="mt-1 block font-medium text-ink">Back to {topic.code}</span>
              </Link>
            )}
          </div>
        </footer>
      </article>

      {toc.length > 2 && (
        <aside className="sticky top-20 hidden max-h-[calc(100vh-6rem)] w-56 shrink-0 self-start overflow-y-auto xl:block">
          <p className="eyebrow mb-3">On this page</p>
          <ul className="space-y-0.5 text-sm">
            {toc.map((h) => (
              <li key={h.id + h.text}>
                <a href={`#${h.id}`} className={`block rounded-md py-1.5 pr-2 text-muted hover:text-ink ${h.depth === 3 ? 'pl-6' : 'pl-3'}`}>
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  );
}
