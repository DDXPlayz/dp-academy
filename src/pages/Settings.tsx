import { useRef, useState } from 'react';
import { Page, PageHeader } from '../components/AppShell';
import { Icon } from '../components/Icon';
import { exportableState, useProgress, type Level, type TextSize, type Theme } from '../store/progress';
import { subjects } from '../content';
import { useUI } from '../store/ui';
import { AccountCard, PeopleCard } from '../components/AccountSettings';
import { flushSync } from '../lib/sync';

export default function Settings() {
  const name = useProgress((s) => s.name);
  const setName = useProgress((s) => s.setName);
  const theme = useProgress((s) => s.theme);
  const setTheme = useProgress((s) => s.setTheme);
  const textSize = useProgress((s) => s.textSize);
  const setTextSize = useProgress((s) => s.setTextSize);
  const setHelp = useUI((s) => s.setHelp);
  const importData = useProgress((s) => s.importData);
  const reset = useProgress((s) => s.reset);
  const examDate = useProgress((s) => s.examDate);
  const setExamDate = useProgress((s) => s.setExamDate);
  const levels = useProgress((s) => s.levels);
  const setLevel = useProgress((s) => s.setLevel);
  const [message, setMessage] = useState('');
  const [confirming, setConfirming] = useState(false);
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
      if (ok) void flushSync();
      setMessage(ok ? 'Progress restored.' : 'That file doesn’t look like a DP Academy export.');
    } catch {
      setMessage('Couldn’t read that file.');
    }
  };

  return (
    <Page>
      <PageHeader title="Settings">Your progress is saved to your account and syncs automatically to every device you sign in on.</PageHeader>
      <div className="max-w-xl space-y-6">
        <AccountCard />
        <PeopleCard />

        <section className="card p-5">
          <label htmlFor="name" className="text-sm font-medium text-ink">
            Name
          </label>
          <input id="name" className="input mt-2" defaultValue={name} onBlur={(e) => setName(e.target.value)} placeholder="Shown in your greeting" />
        </section>

        <section className="card p-5">
          <p className="text-sm font-medium text-ink">Your exams</p>
          <p className="mt-1 text-sm text-muted">Used for the countdown on Home and to hide HL-only topics in subjects you take at SL.</p>
          <label htmlFor="exam-date" className="mt-4 block text-sm text-ink-2">
            Date of your first exam
          </label>
          <div className="mt-1 flex gap-2">
            <input id="exam-date" type="date" className="input max-w-xs" value={examDate} onChange={(e) => setExamDate(e.target.value)} />
            {examDate && (
              <button type="button" className="btn-ghost" onClick={() => setExamDate('')}>
                Clear
              </button>
            )}
          </div>
          <div className="mt-4 space-y-2">
            {subjects
              .filter((sub) => sub.levels.length > 1)
              .map((sub) => (
                <div key={sub.id} className="flex items-center justify-between gap-3">
                  <span className="text-sm text-ink">{sub.title}</span>
                  <div role="radiogroup" aria-label={`${sub.title} level`} className="flex rounded-lg bg-sunken p-1">
                    {(['SL', 'HL'] as Level[]).map((l) => (
                      <button
                        key={l}
                        type="button"
                        role="radio"
                        aria-checked={(levels[sub.id] ?? 'HL') === l}
                        onClick={() => setLevel(sub.id, l)}
                        className={`h-7 rounded-md px-3 text-sm font-medium ${(levels[sub.id] ?? 'HL') === l ? 'bg-card text-ink shadow-sm' : 'text-muted hover:text-ink'}`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
          </div>
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
          <p className="text-sm font-medium text-ink">Lesson text size</p>
          <div role="radiogroup" aria-label="Lesson text size" className="mt-3 grid grid-cols-3 gap-2">
            {(['sm', 'md', 'lg'] as TextSize[]).map((t, i) => (
              <button
                key={t}
                type="button"
                role="radio"
                aria-checked={textSize === t}
                onClick={() => setTextSize(t)}
                className={`flex h-14 items-center justify-center rounded-lg border ${
                  textSize === t ? 'border-accent bg-accent-soft text-ink' : 'border-line text-ink-2 hover:bg-sunken'
                }`}
              >
                <span style={{ fontSize: ['0.85rem', '1rem', '1.2rem'][i] }}>{['Small', 'Medium', 'Large'][i]}</span>
              </button>
            ))}
          </div>
          <button type="button" className="mt-4 text-sm text-accent hover:underline" onClick={() => setHelp(true)}>
            Keyboard shortcuts
          </button>
        </section>

        <section className="card p-5">
          <p className="text-sm font-medium text-ink">Your data</p>
          <p className="mt-1 text-sm text-muted">Lessons completed, answers, notes, bookmarks and flashcard schedule. Export a backup copy, or import one into this account.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" className="btn-secondary" onClick={download}>
              <Icon name="download" size={16} /> Export
            </button>
            <button type="button" className="btn-secondary" onClick={() => file.current?.click()}>
              <Icon name="upload" size={16} /> Import
            </button>
            <input ref={file} type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
            <button type="button" className="btn-ghost text-bad hover:text-bad" onClick={() => setConfirming(true)} disabled={confirming}>
              Reset progress
            </button>
          </div>
          {confirming && (
            <div className="mt-4 rounded-lg border border-bad/40 bg-bad/5 p-4" role="alertdialog" aria-labelledby="reset-title">
              <p id="reset-title" className="text-sm font-medium text-ink">
                Erase all progress in this account?
              </p>
              <p className="mt-1 text-sm text-ink-2">
                Completed lessons, answers, exam marks, notes, bookmarks and flashcard reviews are deleted on every device you use. Your name,
                display settings and exam details are kept. This cannot be undone, so download a backup first if you might want it back.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button type="button" className="btn-secondary" onClick={download}>
                  <Icon name="download" size={16} /> Download backup
                </button>
                <button
                  type="button"
                  className="btn-primary bg-bad hover:bg-bad/90"
                  onClick={() => {
                    reset();
                    void flushSync();
                    setConfirming(false);
                    setMessage('Progress erased on all your devices.');
                  }}
                >
                  Erase everything
                </button>
                <button type="button" className="btn-ghost" onClick={() => setConfirming(false)}>
                  Cancel
                </button>
              </div>
            </div>
          )}
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
