import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { search, type ResultKind } from '../lib/search';
import { useUI } from '../store/ui';
import { Icon, type IconName } from './Icon';

const KIND: Record<ResultKind, { label: string; icon: IconName }> = {
  subject: { label: 'Subject', icon: 'book' },
  unit: { label: 'Unit', icon: 'layers' },
  topic: { label: 'Topic', icon: 'list' },
  lesson: { label: 'Lesson', icon: 'note' },
  formula: { label: 'Formula', icon: 'formula' },
  definition: { label: 'Definition', icon: 'bulb' },
  question: { label: 'Question', icon: 'target' },
  flashcard: { label: 'Flashcard', icon: 'cards' },
};

const SUGGESTIONS = ['projectile', 'momentum', 'kinetic energy', 'the mole', 'arithmetic sequence'];

export function SearchCommand() {
  const open = useUI((s) => s.searchOpen);
  const setOpen = useUI((s) => s.setSearch);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // In local development, lessons converted from private notes join the index the first time search opens.
  const [extra, setExtra] = useState(0);
  useEffect(() => {
    if (open && import.meta.env.DEV) import('../lib/localSearch').then((m) => m.loadLocalSearch()).then((n) => n && setExtra(n));
  }, [open]);
  const groups = useMemo(() => search(query), [query, extra]);
  const flat = groups.flatMap((g) => g.hits);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    list.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!open) return null;

  const go = (href: string) => {
    setOpen(false);
    navigate(href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false);
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flat.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' && flat[active]) {
      go(flat[active].href);
    }
  };

  let i = -1;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 pt-[10vh] sm:p-6 sm:pt-[12vh]" role="dialog" aria-modal="true" aria-label="Search">
      <div className="animate-fade absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
      <div className="animate-rise relative flex max-h-[75vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-2xl" onKeyDown={onKeyDown}>
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Icon name="search" className="shrink-0 text-muted" />
          <input
            ref={input}
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search subjects, topics, formulas, questions…"
            className="h-14 flex-1 bg-transparent text-base text-ink placeholder:text-muted focus:outline-none"
            role="combobox"
            aria-expanded={flat.length > 0}
            aria-controls="search-results"
            aria-activedescendant={flat[active] ? `sr-${active}` : undefined}
          />
          <kbd className="hidden rounded border border-line px-1.5 py-0.5 text-[11px] text-muted sm:inline">esc</kbd>
        </div>
        <div ref={list} id="search-results" role="listbox" className="overflow-y-auto p-2">
          {query.trim().length < 2 ? (
            <div className="p-3">
              <p className="eyebrow mb-3">Try</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button key={s} type="button" className="chip h-8 px-3 hover:bg-line" onClick={() => setQuery(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : flat.length === 0 ? (
            <p className="p-6 text-center text-sm text-muted">Nothing matches “{query}”.</p>
          ) : (
            groups.map((g) => (
              <div key={g.subject} className="mb-2">
                <p className="eyebrow px-3 pb-1 pt-2">{g.subject}</p>
                {g.hits.map((h) => {
                  i++;
                  const idx = i;
                  const k = KIND[h.kind];
                  return (
                    <button
                      key={h.id}
                      id={`sr-${idx}`}
                      data-index={idx}
                      role="option"
                      aria-selected={idx === active}
                      type="button"
                      onMouseMove={() => setActive(idx)}
                      onClick={() => go(h.href)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left ${idx === active ? 'bg-sunken' : ''}`}
                    >
                      <Icon name={k.icon} className="shrink-0 text-muted" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm text-ink">{h.title}</span>
                        <span className="block truncate text-xs text-muted">
                          {k.label} · {h.context}
                        </span>
                      </span>
                      {idx === active && <Icon name="arrowRight" size={16} className="shrink-0 text-muted" />}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
