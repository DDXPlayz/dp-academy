import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { useLocation } from 'react-router-dom';
import { subjects } from '../content';
import { Icon } from './Icon';

/*
 * A panel docked to the right of every page (a full-screen sheet on phones)
 * with the Desmos graphing and scientific calculators and the official IB
 * data/formula booklets, so they sit next to whatever question you're on.
 *
 * The calculators are Desmos's own pages in an iframe; they need an internet
 * connection. The booklets are the PDFs placed in resources/data-booklets/,
 * served privately like the past papers (see dev/localResources.ts).
 */

export type ToolTab = 'graph' | 'scientific' | 'booklet';

interface ToolsState {
  open: boolean;
  tab: ToolTab;
  booklet: string; // subject id
  wide: boolean;
  setOpen: (open: boolean) => void;
  show: (tab: ToolTab, booklet?: string) => void;
  setTab: (tab: ToolTab) => void;
  setBooklet: (id: string) => void;
  toggleWide: () => void;
}

export const useTools = create<ToolsState>()(
  persist(
    (set) => ({
      open: false,
      tab: 'graph',
      booklet: 'physics',
      wide: false,
      setOpen: (open) => set({ open }),
      show: (tab, booklet) => set((s) => ({ open: true, tab, booklet: booklet ?? s.booklet })),
      setTab: (tab) => set({ tab }),
      setBooklet: (booklet) => set({ booklet }),
      toggleWide: () => set((s) => ({ wide: !s.wide })),
    }),
    { name: 'dp-academy:tools', storage: createJSONStorage(() => localStorage) },
  ),
);

const TABS: { id: ToolTab; label: string }[] = [
  { id: 'graph', label: 'Graphing' },
  { id: 'scientific', label: 'Scientific' },
  { id: 'booklet', label: 'Data booklet' },
];

const SRC: Record<'graph' | 'scientific', string> = {
  graph: 'https://www.desmos.com/calculator',
  scientific: 'https://www.desmos.com/scientific',
};

let bookletList: Promise<Record<string, string>> | null = null;
const loadBooklets = () =>
  (bookletList ??= fetch('/data/booklets.json', { credentials: 'same-origin' })
    .then((r) => (r.ok ? r.json() : {}))
    .catch(() => ({})));

function Booklet({ subjectId }: { subjectId: string }) {
  const [list, setList] = useState<Record<string, string> | null>(null);
  useEffect(() => {
    void loadBooklets().then(setList);
  }, []);
  if (!list) return <p className="p-4 text-sm text-muted">Loading…</p>;
  const file = list[subjectId];
  if (!file) {
    const name = subjects.find((s) => s.id === subjectId)?.title ?? subjectId;
    return (
      <div className="p-5 text-sm text-ink-2">
        <p className="font-medium text-ink">No {name} booklet added yet.</p>
        <p className="mt-2">
          Put the official IB PDF in <code className="rounded bg-sunken px-1">resources/data-booklets/</code> with the subject in its file name (for
          example <code className="rounded bg-sunken px-1">physics-data-booklet.pdf</code>,{' '}
          <code className="rounded bg-sunken px-1">chemistry-data-booklet.pdf</code>,{' '}
          <code className="rounded bg-sunken px-1">math-aa-formula-booklet.pdf</code>), then rebuild. It stays private like the past papers.
        </p>
      </div>
    );
  }
  return <iframe key={file} title={`${subjectId} data booklet`} src={`/data/booklets/${encodeURIComponent(file)}#view=FitH`} className="size-full border-0" />;
}

/** The subject of the page you're on, so the booklet matches the question. */
function useRouteSubject(): string | null {
  const { pathname, search } = useLocation();
  const m = pathname.match(/^\/s\/([^/]+)/);
  if (m) return m[1];
  const q = new URLSearchParams(search);
  return q.get('subject') ?? q.get('topic')?.split('/')[0] ?? null;
}

export function ToolsButton() {
  const open = useTools((s) => s.open);
  const setOpen = useTools((s) => s.setOpen);
  return (
    <button
      type="button"
      className={`icon-btn ${open ? 'bg-sunken text-ink' : ''}`}
      onClick={() => setOpen(!open)}
      aria-pressed={open}
      aria-label="Calculators and data booklet"
      title="Calculators and data booklet (T)"
    >
      <Icon name="calculator" size={18} />
    </button>
  );
}

export function ToolsPanel() {
  const { open, tab, booklet, wide, setOpen, setTab, setBooklet, toggleWide } = useTools();
  const routeSubject = useRouteSubject();
  // Mount each tool the first time it's shown and keep it, so a graph or calculation survives switching tabs.
  const [mounted, setMounted] = useState<Set<ToolTab>>(() => new Set());
  useEffect(() => {
    if (open && !mounted.has(tab)) setMounted((m) => new Set(m).add(tab));
  }, [open, tab, mounted]);

  // Follow the subject of the current page.
  useEffect(() => {
    if (routeSubject && subjects.some((s) => s.id === routeSubject)) setBooklet(routeSubject);
  }, [routeSubject, setBooklet]);

  // Reserve room for the docked panel on large screens.
  useEffect(() => {
    document.documentElement.dataset.tools = open ? (wide ? 'wide' : 'open') : '';
  }, [open, wide]);

  return (
    <aside
      aria-label="Calculators and data booklet"
      hidden={!open}
      className={`app-chrome fixed inset-0 z-40 flex flex-col border-l border-line bg-canvas lg:inset-y-0 lg:left-auto lg:right-0 ${
        wide ? 'lg:w-[min(720px,50vw)]' : 'lg:w-[420px]'
      }`}
    >
      <div className="flex h-14 shrink-0 items-center gap-1 border-b border-line px-2">
        <div role="tablist" aria-label="Tool" className="flex flex-1 gap-1 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`h-9 shrink-0 rounded-lg px-3 text-sm font-medium ${tab === t.id ? 'bg-sunken text-ink' : 'text-muted hover:text-ink'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <button type="button" className="icon-btn hidden lg:inline-flex" onClick={toggleWide} aria-label={wide ? 'Make panel narrower' : 'Make panel wider'}>
          <Icon name={wide ? 'chevronRight' : 'chevronLeft'} size={18} />
        </button>
        <button type="button" className="icon-btn" onClick={() => setOpen(false)} aria-label="Close tools">
          <Icon name="x" size={18} />
        </button>
      </div>
      {tab === 'booklet' && (
        <div className="flex shrink-0 gap-1 border-b border-line px-2 py-1.5">
          {subjects.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setBooklet(s.id)}
              aria-pressed={booklet === s.id}
              className={`flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium ${booklet === s.id ? 'bg-sunken text-ink' : 'text-muted hover:text-ink'}`}
            >
              <span className="size-2 rounded-full" style={{ background: s.colour }} />
              {s.short}
            </button>
          ))}
        </div>
      )}
      <div className="relative min-h-0 flex-1">
        {(['graph', 'scientific'] as const).map(
          (t) =>
            mounted.has(t) && (
              <iframe
                key={t}
                title={t === 'graph' ? 'Desmos graphing calculator' : 'Desmos scientific calculator'}
                src={SRC[t]}
                hidden={tab !== t}
                className="absolute inset-0 size-full border-0 bg-white"
                allow="clipboard-write"
              />
            ),
        )}
        {mounted.has('booklet') && (
          <div hidden={tab !== 'booklet'} className="absolute inset-0">
            <Booklet subjectId={booklet} />
          </div>
        )}
      </div>
      {tab !== 'booklet' && <p className="shrink-0 border-t border-line px-3 py-1.5 text-[11px] text-muted">Calculator by Desmos · needs an internet connection</p>}
    </aside>
  );
}
