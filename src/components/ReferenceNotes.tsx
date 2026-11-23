/*
 * Development-only panel listing private reference PDFs for a topic. It is
 * loaded through a lazy import behind `import.meta.env.DEV`, so production
 * builds contain neither this component nor the endpoints it calls. The
 * files themselves are served by dev/localResources.ts from the git-ignored
 * resources/ folder.
 */
import { useEffect, useState } from 'react';
import { Icon } from './Icon';

interface NoteItem {
  title: string;
  file: string;
  source: 'iitian' | 'sme';
  sub: number | null;
}
interface TopicNotes {
  current: NoteItem[];
  legacy: NoteItem[];
}
type NotesIndex = Record<string, { topics: Record<string, TopicNotes> }>;

const SOURCE_LABEL = { iitian: 'IITian', sme: 'SME' } as const;

let cache: Promise<NotesIndex | null> | null = null;
function loadIndex() {
  cache ??= fetch('/__local/notes/index.json')
    .then((r) => (r.ok ? (r.json() as Promise<NotesIndex>) : null))
    .catch(() => null);
  return cache;
}

function Item({ item }: { item: NoteItem }) {
  const href = `/__local/notes/file?src=${item.source}&path=${encodeURIComponent(item.file)}`;
  return (
    <li>
      <a href={href} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-sunken">
        <span className="w-6 shrink-0 text-right text-xs tabular-nums text-muted">{item.sub ?? '·'}</span>
        <span className="min-w-0 flex-1 text-sm text-ink">{item.title}</span>
        <span className="chip h-5 px-1.5 text-[10px]">{SOURCE_LABEL[item.source]}</span>
        <Icon name="external" size={14} className="shrink-0 text-muted" />
      </a>
    </li>
  );
}

export default function ReferenceNotes({ subjectId, topicId }: { subjectId: string; topicId: string }) {
  const [notes, setNotes] = useState<TopicNotes | null>(null);

  useEffect(() => {
    let live = true;
    loadIndex().then((index) => live && setNotes(index?.[subjectId]?.topics[topicId] ?? null));
    return () => {
      live = false;
    };
  }, [subjectId, topicId]);

  if (!notes || (!notes.current.length && !notes.legacy.length)) return null;

  return (
    <section aria-label="Reference notes (private)" className="card mt-6 p-2">
      <header className="flex flex-wrap items-baseline justify-between gap-2 px-3 pb-2 pt-3">
        <h2 className="flex items-center gap-2 font-semibold text-ink">
          <Icon name="layers" size={16} className="text-accent" /> Reference notes (private)
        </h2>
        <p className="text-xs text-muted">Local development only · opens in a new tab</p>
      </header>
      {notes.current.length > 0 && <ol className="divide-y divide-line">{notes.current.map((i) => <Item key={i.source + i.file} item={i} />)}</ol>}
      {notes.legacy.length > 0 && (
        <details className="group mt-1 border-t border-line">
          <summary className="flex cursor-pointer list-none items-center gap-2 px-3 py-3 text-sm font-medium text-ink-2 hover:text-ink">
            <Icon name="chevronRight" size={14} className="transition-transform group-open:rotate-90" />
            Older syllabus <span className="text-muted">({notes.legacy.length})</span>
          </summary>
          <ol className="divide-y divide-line">{notes.legacy.map((i) => <Item key={i.file} item={i} />)}</ol>
        </details>
      )}
    </section>
  );
}
