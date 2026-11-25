import { Link } from 'react-router-dom';
import type { Lesson, Topic } from '../content';
import { NOTE_SOURCES, smePdfUrl, useNotesIndex, useSmePdfs } from '../lib/referenceNotes';
import { Icon } from './Icon';

/**
 * The topic's original Save My Exams PDFs: each opens in a new tab (the browser's
 * PDF viewer, at the topic's first page) and can be downloaded. Renders nothing
 * while loading or on a copy of the app without the private PDFs.
 */
export function SmePdfLinks({ topicKey, className = '' }: { topicKey: string; className?: string }) {
  const pdfs = useSmePdfs(topicKey);
  if (!pdfs?.length) return null;
  return (
    <div className={className}>
      <p className="mb-1.5 text-xs font-medium text-muted">Original PDF{pdfs.length === 1 ? '' : 's'}</p>
      <ul className="space-y-1 text-sm">
        {pdfs.map((p) => (
          <li key={p.file} className="flex items-center gap-2">
            <a
              href={smePdfUrl(p)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-0 items-center gap-1.5 text-ink-2 hover:text-accent"
              title="Open the original Save My Exams PDF in a new tab"
            >
              <Icon name="note" size={14} className="shrink-0 text-muted" />
              <span className="truncate">{p.title}</span>
              {p.page && p.page > 1 ? <span className="shrink-0 text-xs text-muted">from p. {p.page}</span> : null}
              <Icon name="external" size={12} className="shrink-0 text-muted" />
            </a>
            <a
              href={smePdfUrl(p, false)}
              download={p.file.split('/').pop()}
              className="shrink-0 rounded p-1 text-muted hover:bg-sunken hover:text-ink"
              aria-label={`Download ${p.title} (PDF)`}
              title="Download PDF"
            >
              <Icon name="download" size={14} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/*
 * End-of-lesson links to the Save My Exams and IITian Academy notes: one card
 * per source, opening the notes that best match this lesson (the topic's
 * other notes are one click away in the reader).
 */
export function ReferenceLinks({ lesson, topic }: { lesson: Lesson; topic: Topic }) {
  const index = useNotesIndex();
  const sources = index?.topics[topic.key];
  if (!sources) return null;
  const cards = NOTE_SOURCES.flatMap((s) => {
    const all = sources[s.id];
    if (!all?.length) return [];
    const matched = (index.lessons[lesson.key]?.[s.id] ?? []).map((id) => all.find((n) => n.id === id)).filter((n) => !!n);
    return [{ ...s, all, matched }];
  });
  if (!cards.length) return null;

  return (
    <section aria-labelledby="reference-notes" className="mt-8">
      <h2 id="reference-notes" className="eyebrow mb-3">
        Read it another way
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {cards.map((c) => {
          const base = `${topic.href}/notes/${c.id}`;
          return (
            <div key={c.id} className="card flex flex-col p-4">
              <Link to={c.matched[0] ? `${base}/${c.matched[0].id}` : base} className="group flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-sm font-semibold text-accent">{c.short.slice(0, 3)}</span>
                <span className="flex-1">
                  <span className="block font-medium text-ink group-hover:text-accent">{c.name} notes</span>
                  <span className="block text-xs text-muted">
                    {c.all.length} note{c.all.length === 1 ? '' : 's'} for {topic.code} · diagrams and worked examples
                  </span>
                </span>
                <Icon name="arrowRight" size={16} className="text-muted group-hover:text-accent" />
              </Link>
              {c.matched.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-1.5 border-t border-line pt-3">
                  {c.matched.map((n) => (
                    <li key={n.id}>
                      <Link to={`${base}/${n.id}`} className="chip hover:border-accent hover:text-accent">
                        {n.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {c.id === 'sme' && <SmePdfLinks topicKey={topic.key} className="mt-3 border-t border-line pt-3" />}
            </div>
          );
        })}
      </div>
    </section>
  );
}
