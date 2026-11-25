import { useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import { getSubject, getTopic, type Topic } from '../content';
import { Icon } from '../components/Icon';
import { SmePdfLinks } from '../components/ReferenceLinks';
import { Markdown, headingsOf } from '../components/Markdown';
import { NOTE_SOURCES, sourceName, useNotesIndex, useTopicNotes, type NoteEntry, type NoteSource } from '../lib/referenceNotes';
import NotFound from './NotFound';

/*
 * Reader for the Save My Exams / IITian Academy notes, one note per page so a
 * subtopic (e.g. Projectile Motion) is never buried inside the whole topic.
 *
 *   /s/:subjectId/:topicId/notes/:source            contents: every note of that source for the topic
 *   /s/:subjectId/:topicId/notes/:source/:noteId    one note, with previous / next
 *
 * Wording, equations and diagrams are the originals.
 */

const noteHref = (topic: Topic, source: NoteSource, id?: string) => `${topic.href}/notes/${source}${id ? `/${id}` : ''}`;

/** Sidebar: both sources' notes for the topic; the open note also lists its own sections. */
function NotesNav({
  topic,
  sources,
  current,
  source,
  sections,
  onPick,
}: {
  topic: Topic;
  sources: { id: NoteSource; name: string; notes: NoteEntry[] }[];
  current?: string;
  source: NoteSource;
  sections: { id: string; text: string }[];
  onPick?: () => void;
}) {
  return (
    <nav aria-label="Reference notes" className="space-y-5">
      {sources.map((s) => (
        <div key={s.id}>
          <Link to={noteHref(topic, s.id)} onClick={onPick} className="eyebrow mb-1.5 block px-3 hover:text-ink">
            {s.name}
          </Link>
          <ol className="space-y-0.5 text-sm">
            {s.notes.map((n, i) => {
              const open = s.id === source && n.id === current;
              return (
                <li key={n.id}>
                  <Link
                    to={noteHref(topic, s.id, n.id)}
                    onClick={onPick}
                    aria-current={open ? 'page' : undefined}
                    className={`flex gap-2 rounded-md px-3 py-1.5 leading-snug hover:bg-sunken hover:text-ink ${open ? 'bg-accent-soft font-medium text-accent' : 'text-ink-2'}`}
                  >
                    <span className="w-5 shrink-0 tabular-nums text-muted">{i + 1}</span>
                    <span>{n.title}</span>
                  </Link>
                  {open && sections.length > 1 && (
                    <ul className="mb-1 ml-10 mt-0.5 space-y-0.5 border-l border-line text-xs">
                      {sections.map((h) => (
                        <li key={h.id}>
                          <a href={`#${h.id}`} onClick={onPick} className="block py-0.5 pl-3 text-muted hover:text-ink">
                            {h.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      ))}
    </nav>
  );
}

function printNote() {
  const closed = [...document.querySelectorAll<HTMLDetailsElement>('.print-area details:not([open])')];
  closed.forEach((d) => (d.open = true));
  document.querySelectorAll<HTMLImageElement>('.print-area img').forEach((img) => (img.loading = 'eager'));
  const restore = () => {
    closed.forEach((d) => (d.open = false));
    window.removeEventListener('afterprint', restore);
  };
  window.addEventListener('afterprint', restore);
  setTimeout(() => window.print(), 300);
}

export default function ReferenceNotes() {
  const { subjectId = '', topicId = '', source = 'sme', noteId } = useParams();
  const { hash } = useLocation();
  const subject = getSubject(subjectId);
  const topic = getTopic(`${subjectId}/${topicId}`);
  const index = useNotesIndex();
  const src = (NOTE_SOURCES.some((s) => s.id === source) ? source : 'sme') as NoteSource;
  const notes = useTopicNotes(topic?.key ?? '', src);
  const [navOpen, setNavOpen] = useState(false);

  // A new note opens at its top (or at the section named in the URL).
  useEffect(() => {
    if (!notes) return;
    const el = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (el) requestAnimationFrame(() => el.scrollIntoView({ block: 'start' }));
    else window.scrollTo(0, 0);
    setNavOpen(false);
  }, [notes, noteId, hash]);

  if (!subject || !topic) return <NotFound />;

  // Old links put the note in the hash (#<note id>): send them to the note's own page.
  if (!noteId && hash && notes?.some((n) => n.id === hash.slice(1))) {
    return <Navigate to={noteHref(topic, src, hash.slice(1))} replace />;
  }

  const sources = NOTE_SOURCES.flatMap((s) => {
    const list = index?.topics[topic.key]?.[s.id];
    return list?.length ? [{ ...s, notes: list }] : [];
  });
  const pos = notes && noteId ? notes.findIndex((n) => n.id === noteId) : -1;
  const note = pos >= 0 ? notes![pos] : undefined;
  const prev = pos > 0 ? notes![pos - 1] : undefined;
  const next = notes && pos >= 0 && pos < notes.length - 1 ? notes[pos + 1] : undefined;
  const sections = note ? headingsOf(note.body).filter((h) => h.depth === 3) : [];

  const nav = (onPick?: () => void) => (
    <NotesNav topic={topic} sources={sources} current={note?.id} source={src} sections={sections} onPick={onPick} />
  );

  return (
    <div className="mx-auto flex max-w-6xl gap-10 px-4 pt-6 md:px-8 md:pt-10">
      <article className="print-area min-w-0 max-w-[48rem] flex-1">
        <nav className="no-print mb-6 flex flex-wrap items-center gap-1 text-sm text-muted">
          <Link to={subject.href} className="inline-flex items-center gap-1 hover:text-ink">
            <Icon name="arrowLeft" size={14} /> {subject.short}
          </Link>
          <span aria-hidden="true">/</span>
          <Link to={topic.href} className="hover:text-ink">
            {topic.code} {topic.title}
          </Link>
          <span aria-hidden="true">/</span>
          <Link to={noteHref(topic, src)} className="hover:text-ink">
            {sourceName(src)} notes
          </Link>
        </nav>

        {notes === undefined ? (
          <div className="mt-4 space-y-3" aria-busy="true">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-5 animate-pulse rounded bg-sunken" style={{ width: `${90 - i * 12}%` }} />
            ))}
          </div>
        ) : !notes?.length ? (
          <div className="card p-6 text-ink-2">
            {sourceName(src)} notes aren't available for this topic{index === null ? ' on this copy of the app' : ''}.
          </div>
        ) : !note ? (
          /* Contents: one card per note */
          <>
            <header>
              <p className="eyebrow mb-2">Reference notes · {sourceName(src)}</p>
              <h1 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                {topic.code} {topic.title}
              </h1>
              <p className="mt-3 text-ink-2">
                {notes.length} {sourceName(src)} note{notes.length === 1 ? '' : 's'} for this topic, each on its own page with the original diagrams and
                worked examples.
              </p>
              {src === 'sme' && <SmePdfLinks topicKey={topic.key} className="no-print mt-4" />}
              {sources.length > 1 && (
                <div role="tablist" aria-label="Source" className="mt-5 inline-flex rounded-lg border border-line bg-sunken p-1">
                  {sources.map((s) => (
                    <Link
                      key={s.id}
                      role="tab"
                      aria-selected={s.id === src}
                      to={noteHref(topic, s.id)}
                      replace
                      className={`inline-flex h-9 items-center rounded-md px-4 text-sm font-medium ${s.id === src ? 'bg-card text-ink shadow-sm' : 'text-muted hover:text-ink'}`}
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              )}
            </header>
            <ol className="mt-8 grid gap-3 sm:grid-cols-2">
              {notes.map((n, i) => (
                <li key={n.id}>
                  <Link to={noteHref(topic, src, n.id)} className="card card-hover flex h-full items-start gap-3 p-4">
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent-soft text-sm font-semibold tabular-nums text-accent">
                      {i + 1}
                    </span>
                    <span className="flex-1 font-medium leading-snug text-ink">{n.title}</span>
                    <Icon name="arrowRight" size={16} className="mt-0.5 text-muted" />
                  </Link>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={`/print?s=${subject.id}&t=${encodeURIComponent(topic.key)}&src=${src}`} className="btn-secondary">
                <Icon name="download" size={16} /> Print all {sourceName(src)} notes for {topic.code}
              </Link>
              <Link to={topic.lessons[0]?.href ?? topic.href} className="btn-ghost">
                <Icon name="book" size={16} /> Back to the lessons
              </Link>
            </div>
          </>
        ) : (
          /* One note */
          <>
            <header>
              <p className="eyebrow mb-2">
                {sourceName(src)} · {topic.code} {topic.title} · {pos + 1} of {notes.length}
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">{note.title}</h1>
              <div className="no-print mt-5 flex flex-wrap items-center gap-2">
                <button type="button" className="btn-secondary xl:hidden" onClick={() => setNavOpen((o) => !o)} aria-expanded={navOpen}>
                  <Icon name="list" size={16} /> All notes
                </button>
                <button type="button" className="btn-ghost ml-auto" onClick={printNote}>
                  <Icon name="download" size={16} /> Print this note
                </button>
              </div>
              {navOpen && <div className="no-print animate-rise card mt-4 p-3 xl:hidden">{nav(() => setNavOpen(false))}</div>}
            </header>

            <div className="prose-lesson reference-note mt-8">
              <Markdown>{note.body}</Markdown>
            </div>
            <p className="mt-8 text-xs text-muted">Notes © {sourceName(src)}, shown for personal revision.</p>
            {src === 'sme' && <SmePdfLinks topicKey={topic.key} className="no-print mt-4" />}

            <footer className="no-print mt-10 grid grid-cols-2 gap-3 border-t border-line pt-6">
              <div>
                {prev && (
                  <Link to={noteHref(topic, src, prev.id)} className="btn-ghost -ml-3 h-auto max-w-full flex-col items-start gap-0 py-2 text-left">
                    <span className="flex items-center gap-1 text-xs text-muted">
                      <Icon name="arrowLeft" size={12} /> Previous
                    </span>
                    <span className="line-clamp-2">{prev.title}</span>
                  </Link>
                )}
              </div>
              <div className="text-right">
                {next ? (
                  <Link to={noteHref(topic, src, next.id)} className="btn-ghost -mr-3 ml-auto h-auto max-w-full flex-col items-end gap-0 py-2 text-right">
                    <span className="flex items-center gap-1 text-xs text-muted">
                      Next <Icon name="arrowRight" size={12} />
                    </span>
                    <span className="line-clamp-2">{next.title}</span>
                  </Link>
                ) : (
                  <Link to={topic.lessons[0]?.href ?? topic.href} className="btn-ghost -mr-3 ml-auto h-auto flex-col items-end gap-0 py-2 text-right">
                    <span className="text-xs text-muted">Done with these notes</span>
                    <span>Back to the lessons</span>
                  </Link>
                )}
              </div>
            </footer>
          </>
        )}
      </article>

      {sources.length > 0 && (
        <aside className="no-print hidden w-64 shrink-0 xl:block">
          <div className="sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto pb-6">{nav()}</div>
        </aside>
      )}
    </div>
  );
}
