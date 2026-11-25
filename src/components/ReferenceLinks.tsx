import { Link } from 'react-router-dom';
import type { Lesson, Topic } from '../content';
import { NOTE_SOURCES, useNotesIndex } from '../lib/referenceNotes';
import { Icon } from './Icon';

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
            </div>
          );
        })}
      </div>
    </section>
  );
}
