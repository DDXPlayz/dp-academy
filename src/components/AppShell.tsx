import { useEffect, useRef } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { subjects } from '../content';
import { useProgress } from '../store/progress';
import { useUI } from '../store/ui';
import { subjectStats } from '../lib/stats';
import { Icon, type IconName } from './Icon';
import { ThemeToggle, useApplyTheme } from './ThemeToggle';
import { SearchCommand } from './SearchCommand';
import { ProgressRing } from './ProgressBar';

const NAV: { to: string; label: string; icon: IconName; end?: boolean }[] = [
  { to: '/', label: 'Home', icon: 'home', end: true },
  { to: '/subjects', label: 'Subjects', icon: 'book' },
  { to: '/practice', label: 'Practice', icon: 'target' },
  { to: '/bank', label: 'Questions', icon: 'list' },
  { to: '/syllabus', label: 'Syllabus', icon: 'check' },
  { to: '/revise', label: 'Revise', icon: 'cards' },
  { to: '/bookmarks', label: 'Saved', icon: 'bookmark' },
];

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 font-semibold tracking-tight text-ink">
      <img src="/favicon.svg" alt="" className="size-7" />
      <span>DP Academy</span>
    </Link>
  );
}

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const completed = useProgress((s) => s.completed);
  const visited = useProgress((s) => s.visited);
  const attempts = useProgress((s) => s.attempts);
  const state = { completed, visited, attempts };
  return (
    <nav aria-label="Main" className="flex h-full flex-col gap-6 overflow-y-auto px-3 py-5">
      <div className="px-2">
        <Logo />
      </div>
      <ul className="space-y-0.5">
        {NAV.map((n) => (
          <li key={n.to}>
            <NavLink
              to={n.to}
              end={n.end}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex h-9 items-center gap-3 rounded-lg px-2.5 text-sm font-medium transition-colors ${
                  isActive ? 'bg-sunken text-ink' : 'text-ink-2 hover:bg-sunken hover:text-ink'
                }`
              }
            >
              <Icon name={n.icon} />
              {n.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div>
        <p className="eyebrow px-2.5 pb-2">Subjects</p>
        <ul className="space-y-0.5">
          {subjects.map((s) => (
            <li key={s.id}>
              <NavLink
                to={s.href}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex h-9 items-center gap-3 rounded-lg px-2.5 text-sm transition-colors ${
                    isActive ? 'bg-sunken text-ink font-medium' : 'text-ink-2 hover:bg-sunken hover:text-ink'
                  }`
                }
              >
                <ProgressRing value={subjectStats(s, state).progress} size={18} colour={s.colour} />
                <span className="truncate">{s.short}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto px-1">
        <NavLink
          to="/settings"
          onClick={onNavigate}
          className="flex h-9 items-center gap-3 rounded-lg px-2 text-sm text-muted hover:bg-sunken hover:text-ink"
        >
          <Icon name="settings" />
          Settings
        </NavLink>
      </div>
    </nav>
  );
}

function SearchButton({ compact = false }: { compact?: boolean }) {
  const setSearch = useUI((s) => s.setSearch);
  if (compact) {
    return (
      <button type="button" className="icon-btn" onClick={() => setSearch(true)} aria-label="Search">
        <Icon name="search" />
      </button>
    );
  }
  const mac = typeof navigator !== 'undefined' && /Mac|iPad|iPhone/.test(navigator.platform);
  return (
    <button
      type="button"
      onClick={() => setSearch(true)}
      className="flex h-9 w-full max-w-sm items-center gap-2 rounded-lg border border-line bg-card px-3 text-sm text-muted transition-colors hover:border-line-strong"
    >
      <Icon name="search" size={16} />
      <span className="flex-1 text-left">Search topics, formulas, questions…</span>
      <kbd className="hidden font-sans text-xs sm:inline">{mac ? '⌘' : 'Ctrl'} K</kbd>
    </button>
  );
}

function TopBar() {
  const setDrawer = useUI((s) => s.setDrawer);
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-canvas/85 backdrop-blur-md">
      <div className="flex h-14 items-center gap-3 px-4 md:px-6">
        <button type="button" className="icon-btn -ml-2 lg:hidden" onClick={() => setDrawer(true)} aria-label="Open menu">
          <Icon name="menu" />
        </button>
        <div className="md:hidden">
          <Logo />
        </div>
        <div className="hidden flex-1 md:block">
          <SearchButton />
        </div>
        <div className="ml-auto flex items-center gap-1">
          <div className="md:hidden">
            <SearchButton compact />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function BottomNav() {
  return (
    <nav aria-label="Main" className="pb-safe fixed inset-x-0 bottom-0 z-30 border-t border-line bg-card/95 backdrop-blur-md md:hidden">
      <ul className="grid grid-cols-7">
        {NAV.map((n) => (
          <li key={n.to}>
            <NavLink
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `flex h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-medium ${isActive ? 'text-accent' : 'text-muted'}`
              }
            >
              <Icon name={n.icon} size={20} />
              {n.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Drawer() {
  const open = useUI((s) => s.drawerOpen);
  const setDrawer = useUI((s) => s.setDrawer);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLElement>('a')?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDrawer(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setDrawer]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="animate-fade absolute inset-0 bg-black/30" onClick={() => setDrawer(false)} />
      <div ref={panel} className="animate-rise absolute inset-y-0 left-0 w-72 max-w-[85vw] border-r border-line bg-card shadow-xl">
        <Sidebar onNavigate={() => setDrawer(false)} />
      </div>
    </div>
  );
}

export function AppShell() {
  useApplyTheme();
  const { pathname, hash } = useLocation();
  const setSearch = useUI((s) => s.setSearch);

  // New page: start at the top, or at the #anchor once the (lazy) page has rendered it.
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    let tries = 0;
    let frame = 0;
    const find = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) el.scrollIntoView({ block: 'start' });
      else if (tries++ < 60) frame = requestAnimationFrame(find);
    };
    find();
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest('input, textarea, [contenteditable]');
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault();
        setSearch(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setSearch]);

  return (
    <div className="min-h-dvh">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 btn-primary">
        Skip to content
      </a>
      <aside className="app-chrome fixed inset-y-0 left-0 hidden w-60 border-r border-line bg-canvas lg:block">
        <Sidebar />
      </aside>
      <div className="app-body lg:pl-60">
        <div className="app-chrome">
          <TopBar />
        </div>
        <main id="main" key={pathname} className="animate-rise pb-24 md:pb-12">
          <Outlet />
        </main>
      </div>
      <div className="app-chrome">
        <BottomNav />
      </div>
      <Drawer />
      <SearchCommand />
    </div>
  );
}

/** Standard page width and padding. */
export function Page({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return <div className={`mx-auto px-4 pt-6 md:px-8 md:pt-10 ${wide ? 'max-w-6xl' : 'max-w-5xl'}`}>{children}</div>;
}

export function PageHeader({ eyebrow, title, children }: { eyebrow?: React.ReactNode; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <header className="mb-8">
      {eyebrow && <div className="eyebrow mb-2">{eyebrow}</div>}
      <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">{title}</h1>
      {children && <div className="mt-2 max-w-2xl text-ink-2">{children}</div>}
    </header>
  );
}
