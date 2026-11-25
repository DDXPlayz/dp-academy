import { useEffect, useRef } from 'react';
import { useUI } from '../store/ui';
import { Icon } from './Icon';

const GROUPS: { title: string; keys: [string, string][] }[] = [
  {
    title: 'Anywhere',
    keys: [
      ['/  or  Ctrl K', 'Search'],
      ['?', 'Show these shortcuts'],
      ['Esc', 'Close a dialog'],
    ],
  },
  {
    title: 'In a lesson',
    keys: [
      ['←  →', 'Previous / next lesson'],
      ['M', 'Mark complete (or not)'],
      ['N', 'Open notes'],
    ],
  },
  {
    title: 'Flashcards',
    keys: [
      ['Space', 'Flip the card'],
      ['1  2  3  4', 'Again · Hard · Good · Easy'],
    ],
  },
];

export function ShortcutsDialog() {
  const open = useUI((s) => s.helpOpen);
  const setHelp = useUI((s) => s.setHelp);
  const close = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    close.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setHelp(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setHelp]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setHelp(false)}>
      <div role="dialog" aria-modal="true" aria-labelledby="shortcuts-title" className="card animate-rise w-full max-w-md p-5" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 id="shortcuts-title" className="font-semibold text-ink">
            Keyboard shortcuts
          </h2>
          <button ref={close} type="button" className="icon-btn" onClick={() => setHelp(false)} aria-label="Close">
            <Icon name="x" />
          </button>
        </div>
        <div className="space-y-5">
          {GROUPS.map((g) => (
            <section key={g.title}>
              <p className="eyebrow mb-2">{g.title}</p>
              <dl className="space-y-1.5 text-sm">
                {g.keys.map(([k, what]) => (
                  <div key={k} className="flex items-center justify-between gap-4">
                    <dt className="text-ink-2">{what}</dt>
                    <dd>
                      <kbd className="rounded-md border border-line-strong bg-sunken px-2 py-0.5 font-sans text-xs text-ink">{k}</kbd>
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
