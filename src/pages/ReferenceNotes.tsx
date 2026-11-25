import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getSubject, getTopic } from '../content';
import { Icon } from '../components/Icon';
import { Markdown } from '../components/Markdown';
import { NOTE_SOURCES, sourceName, useNotesIndex, useTopicNotes, type NoteSource } from '../lib/referenceNotes';
import NotFound from './NotFound';

/*
 * Reader for the Save My Exams / IITian Academy notes of one topic, shown in
 * the app's lesson style. Wording, equations and diagrams are the originals.
 * /s/:subjectId/:topicId/notes/:source#<note id>
 */

function NoteList({ notes, active, onPick }: { notes: { id: string; title: string }[]; active: string; onPick?: () => void }) {
  return (
    <ol className="space-y-0.5 text-sm">
      {notes.map((n, i) => (
        <li key={n.id}>
          <a
            href={`#${n.id}`}
            onClick={onPick}
            className={`flex gap-2 rounded-md px-3 py-1.5 leading-snug hover:bg-sunken hover:text-ink ${active === n.id ? 'bg-accent-soft font-medium text-accent' : 'text-ink-2'}`}
          >
            <span className="w-5 shrink-0 tabular-nums text-muted">{i + 1}</span>
            <span>{n.title}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}

export default function ReferenceNotes() {
  const { subjectId = '', topicId = '', source = 'sme' } = useParams();
  const { hash } = useLocation();
  const subject = getSubject(subjectId);
  const topic = getTopic(`${subjectId}/${topicId}`);
  const index = useNotesIndex();
  const src = (NOTE_SOURCES.some((s) => s.id === source) ? source : 'sme') as NoteSource;
  const notes = useTopicNotes(topic?.key ?? '', src);
  const [active, setActive] = useState('');
  const [listOpen, setListOpen] = useState(false);

  // Jump to the note named in the URL once it has rendered.
  useEffect(() => {
    if (!notes) return;
    const id = decodeURIComponent(hash.slice(1));
    const el = id ? document.getElementById(id) : null;
    if (el) requestAnimationFrame(() => el.scrollIntoView({ block: 'start' }));
    else window.scrollTo(0, 0);
  }, [notes, hash]);

  // Highlight the note being read in the contents list.
  useEffect(() => {
    if (!notes?.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const top = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (top) setActive(top.target.id);
      },
      { rootMargin: '-80px 0px -70% 0px' },
    );
    notes.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [notes]);

  if (!subject || !topic) return <NotFound />;
  const available = NOTE_SOURCES.filter((s) => index?.topics[topic.key]?.[s.id]?.length);

  return (
    <div className="mx-auto flex max-w-6xl gap-10 px-4 pt-6 md:px-8 md:pt-10">
      <article className="min-w-0 max-w-[48rem] flex-1">
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
          <p className="eyebrow mb-2">Reference notes</p>
          <h1 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            {topic.code} {topic.title}
          </h1>
          <p className="mt-3 text-ink-2">
            The original {sourceName(src)} notes for this topic, with their diagrams and worked examples. Use them alongside the lessons for another
            explanation of anything that hasn't clicked.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div role="tablist" aria-label="Source" className="inline-flex rounded-lg border border-line bg-sunken p-1">
              {(available.length ? available : NOTE_SOURCES).map((s) => (
                <Link
                  key={s.id}
                  role="tab"
                  aria-selected={s.id === src}
                  to={`${topic.href}/notes/${s.id}`}
                  replace
                  className={`inline-flex h-9 items-center rounded-md px-4 text-sm font-medium ${s.id === src ? 'bg-card text-ink shadow-sm' : 'text-muted hover:text-ink'}`}
                >
                  {s.name}
                </Link>
              ))}
            </div>
            <button type="button" className="icon-btn xl:hidden" onClick={() => setListOpen((o) => !o)} aria-expanded={listOpen} aria-label="Contents">
              <Icon name="list" />
            </button>
            <Link to={`/print?s=${subject.id}&t=${encodeURIComponent(topic.key)}&src=${src}`} className="btn-secondary ml-auto">
              <Icon name="download" size={16} /> Print
            </Link>
          </div>
          {listOpen && notes && (
            <div className="animate-rise card mt-4 p-3 xl:hidden">
              <NoteList notes={notes} active={active} onPick={() => setListOpen(false)} />
            </div>
          )}
        </header>

        {notes === undefined ? (
          <div className="mt-10 space-y-3" aria-busy="true">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-5 animate-pulse rounded bg-sunken" style={{ width: `${90 - i * 12}%` }} />
            ))}
          </div>
        ) : !notes?.length ? (
          <div className="card mt-10 p-6 text-ink-2">
            {sourceName(src)} notes aren't available for this topic{index === null ? ' on this copy of the app' : ''}.
          </div>
        ) : (
          <div className="mt-8 space-y-14">
            {notes.map((n, i) => (
              <section key={n.id} id={n.id} className="scroll-mt-24">
                <p className="eyebrow mb-1">
                  {sourceName(src)} · {i + 1} of {notes.length}
                </p>
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-ink">{n.title}</h2>
                <div className="prose-lesson reference-note">
                  <Markdown>{n.body}</Markdown>
                </div>
              </section>
            ))}
            <p className="border-t border-line pt-4 text-sm text-muted">
              Notes © {sourceName(src)}, shown for personal revision.
            </p>
          </div>
        )}

        <footer className="mt-10 border-t border-line pt-6">
          <Link to={topic.lessons[0]?.href ?? topic.href} className="card card-hover flex items-center gap-4 p-5">
            <Icon name="book" size={22} className="text-accent" />
            <span className="flex-1">
              <span className="block font-medium text-ink">Back to the lessons</span>
              <span className="block text-sm text-muted">
                {topic.code} {topic.title} · {topic.lessons.length} lessons
              </span>
            </span>
            <Icon name="arrowRight" className="text-muted" />
          </Link>
        </footer>
      </article>

      <aside className="hidden w-64 shrink-0 xl:block">
        <div className="sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto pb-6">
          <p className="eyebrow mb-2 px-3">{sourceName(src)} notes</p>
          {notes ? <NoteList notes={notes} active={active} /> : null}
        </div>
      </aside>
    </div>
  );
}
