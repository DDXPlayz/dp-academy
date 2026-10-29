import { useRef, useState } from 'react';
import { Page, PageHeader } from '../components/AppShell';
import { Icon } from '../components/Icon';
import { exportableState, useProgress, type Theme } from '../store/progress';

export default function Settings() {
  const name = useProgress((s) => s.name);
  const setName = useProgress((s) => s.setName);
  const theme = useProgress((s) => s.theme);
  const setTheme = useProgress((s) => s.setTheme);
  const importData = useProgress((s) => s.importData);
  const reset = useProgress((s) => s.reset);
  const [message, setMessage] = useState('');
  const file = useRef<HTMLInputElement>(null);

  const download = () => {
    const blob = new Blob([JSON.stringify(exportableState(), null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `dp-academy-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const upload = async (f: File) => {
    try {
      const ok = importData(JSON.parse(await f.text()));
      setMessage(ok ? 'Progress restored.' : 'That file doesn’t look like a DP Academy export.');
    } catch {
      setMessage('Couldn’t read that file.');
    }
  };

  return (
    <Page>
      <PageHeader title="Settings">Your progress is stored only in this browser. Export it to move to another device.</PageHeader>
      <div className="max-w-xl space-y-6">
        <section className="card p-5">
          <label htmlFor="name" className="text-sm font-medium text-ink">
            Name
          </label>
          <input id="name" className="input mt-2" defaultValue={name} onBlur={(e) => setName(e.target.value)} placeholder="Shown in your greeting" />
        </section>

        <section className="card p-5">
          <p className="text-sm font-medium text-ink">Appearance</p>
          <div role="radiogroup" aria-label="Theme" className="mt-3 grid grid-cols-3 gap-2">
            {(['system', 'light', 'dark'] as Theme[]).map((t) => (
              <button
                key={t}
                type="button"
                role="radio"
                aria-checked={theme === t}
                onClick={() => setTheme(t)}
                className={`flex h-16 flex-col items-center justify-center gap-1 rounded-lg border text-sm capitalize ${
                  theme === t ? 'border-accent bg-accent-soft text-ink' : 'border-line text-ink-2 hover:bg-sunken'
                }`}
              >
                <Icon name={t === 'system' ? 'monitor' : t === 'light' ? 'sun' : 'moon'} />
                {t}
              </button>
            ))}
          </div>
        </section>

        <section className="card p-5">
          <p className="text-sm font-medium text-ink">Your data</p>
          <p className="mt-1 text-sm text-muted">Lessons completed, answers, notes, bookmarks and flashcard schedule.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" className="btn-secondary" onClick={download}>
              <Icon name="download" size={16} /> Export
            </button>
            <button type="button" className="btn-secondary" onClick={() => file.current?.click()}>
              <Icon name="upload" size={16} /> Import
            </button>
            <input ref={file} type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
            <button
              type="button"
              className="btn-ghost text-bad hover:text-bad"
              onClick={() => {
                if (confirm('Erase all progress, notes and bookmarks in this browser? This cannot be undone.')) {
                  reset();
                  setMessage('Progress erased.');
                }
              }}
            >
              Reset progress
            </button>
          </div>
          {message && (
            <p className="mt-3 text-sm text-ink-2" role="status">
              {message}
            </p>
          )}
        </section>

        <section className="text-sm leading-relaxed text-muted">
          <p>
            DP Academy is an independent study resource. It is not affiliated with or endorsed by the International Baccalaureate Organization.
            All explanations, examples, diagrams and questions are original.
          </p>
        </section>
      </div>
    </Page>
  );
}
