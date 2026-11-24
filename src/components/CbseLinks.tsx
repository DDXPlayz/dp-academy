import type { CbseLink } from '../content/schema';
import { Icon } from './Icon';

/** "Also in CBSE" box: matching NCERT chapters with links to a video lesson. */
export function CbseLinks({ links, className = '' }: { links: CbseLink[]; className?: string }) {
  if (!links.length) return null;
  return (
    <aside aria-label="CBSE overlap" className={`card flex flex-col gap-3 p-4 sm:flex-row sm:items-start ${className}`}>
      <span className="chip shrink-0 bg-accent-soft text-accent">CBSE</span>
      <ul className="min-w-0 flex-1 space-y-1.5 text-sm">
        {links.map((l) => (
          <li key={`${l.class}-${l.chapter}`} className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-ink">
              Class {l.class} · {l.chapter}
            </span>
            {l.note && <span className="text-muted">{l.note}</span>}
            {l.video && (
              <a href={l.video} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 text-accent hover:underline">
                <Icon name="external" size={12} /> Prashant Kirad video
              </a>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
