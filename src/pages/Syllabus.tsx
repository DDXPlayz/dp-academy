import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { subjects, type Topic } from '../content';
import { Page, PageHeader } from '../components/AppShell';
import { Icon } from '../components/Icon';
import { ProgressBar } from '../components/ProgressBar';
import { useProgress } from '../store/progress';

/*
 * Syllabus checklist: every unit, topic and sub-idea lesson with a tick box.
 * Ticking a lesson marks it complete everywhere in the app; ticking a topic
 * marks all of its lessons.
 */

type Level = 'SL' | 'HL';

function Check({ checked, onChange, label, partial = false }: { checked: boolean; onChange: () => void; label: string; partial?: boolean }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={partial ? 'mixed' : checked}
      aria-label={label}
      onClick={onChange}
      className={`flex size-5 shrink-0 items-center justify-center rounded border transition-colors ${
        checked ? 'border-good bg-good text-card' : partial ? 'border-good bg-good-soft text-good' : 'border-line-strong hover:border-ink-2'
      }`}
    >
      {checked ? <Icon name="check" size={13} /> : partial ? <span className="h-0.5 w-2.5 rounded bg-good" /> : null}
    </button>
  );
}

export default function Syllabus() {
  const [params, setParams] = useSearchParams();
  const subject = subjects.find((s) => s.id === params.get('s')) ?? subjects[0];
  const [level, setLevel] = useState<Level>('HL');
  const completed = useProgress((s) => s.completed);
  const setComplete = useProgress((s) => s.setComplete);
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const visible = (t: Topic) => level === 'HL' || !t.hl;
  const lessonsOf = (t: Topic) => t.lessons.filter((l) => level === 'HL' || !l.meta.hl);
  const count = (topics: Topic[]) => {
    const all = topics.flatMap(lessonsOf);
    return { done: all.filter((l) => completed[l.key]).length, total: all.length };
  };
  const toggleTopic = (t: Topic) => {
    const ls = lessonsOf(t);
    const allDone = ls.every((l) => completed[l.key]);
    for (const l of ls) setComplete(l.key, !allDone);
  };
  const whole = count(subject.topics.filter(visible));

  return (
    <Page>
      <PageHeader eyebrow="Progress" title="Syllabus checklist">
        Tick off each sub-topic as you finish it. Ticks here and “Mark complete” in a lesson are the same thing.
      </PageHeader>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div role="tablist" aria-label="Subject" className="inline-flex rounded-lg border border-line bg-sunken p-1">
          {subjects.map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={s.id === subject.id}
              onClick={() => setParams({ s: s.id }, { replace: true })}
              className={`h-9 rounded-md px-4 text-sm font-medium transition-colors ${s.id === subject.id ? 'bg-card text-ink shadow-sm' : 'text-muted hover:text-ink'}`}
            >
              {s.short}
            </button>
          ))}
        </div>
        <div role="radiogroup" aria-label="Level" className="inline-flex rounded-lg border border-line bg-sunken p-1">
          {(['SL', 'HL'] as Level[]).map((l) => (
            <button
              key={l}
              type="button"
              role="radio"
              aria-checked={level === l}
              onClick={() => setLevel(l)}
              className={`h-9 rounded-md px-4 text-sm font-medium ${level === l ? 'bg-card text-ink shadow-sm' : 'text-muted hover:text-ink'}`}
            >
              {l}
            </button>
          ))}
        </div>
        <Link to={`/print?s=${subject.id}`} className="btn-secondary ml-auto">
          <Icon name="download" size={16} /> Print notes
        </Link>
      </div>

      <div className="card mb-6 p-5">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-muted">
            {whole.done} of {whole.total} sub-topics complete
          </span>
          <span className="font-medium text-ink">{whole.total ? Math.round((whole.done / whole.total) * 100) : 0}%</span>
        </div>
        <ProgressBar value={whole.total ? whole.done / whole.total : 0} label={`${subject.title} syllabus progress`} />
      </div>

      <div className="space-y-4">
        {subject.units.map((u) => {
          const topics = u.topics.filter(visible);
          if (!topics.length) return null;
          const uc = count(topics);
          return (
            <section key={u.id} className="card p-2" aria-label={`${u.code} ${u.title}`}>
              <header className="flex items-center gap-3 px-3 py-3">
                <h2 className="flex-1 font-semibold text-ink">
                  <span className="text-muted">{u.code}</span> {u.title}
                </h2>
                <span className="text-sm tabular-nums text-muted">
                  {uc.done}/{uc.total}
                </span>
                <div className="w-24">
                  <ProgressBar value={uc.total ? uc.done / uc.total : 0} label={`${u.title} progress`} />
                </div>
              </header>
              <ul className="divide-y divide-line">
                {topics.map((t) => {
                  const ls = lessonsOf(t);
                  const tc = count([t]);
                  const isOpen = open[t.key] ?? false;
                  return (
                    <li key={t.key}>
                      <div className="flex items-center gap-3 px-3 py-2.5">
                        <Check
                          checked={!!tc.total && tc.done === tc.total}
                          partial={tc.done > 0 && tc.done < tc.total}
                          onChange={() => toggleTopic(t)}
                          label={`Mark all of ${t.code} ${t.title} complete`}
                        />
                        <button
                          type="button"
                          className="flex min-w-0 flex-1 items-center gap-2 text-left"
                          onClick={() => setOpen((o) => ({ ...o, [t.key]: !isOpen }))}
                          aria-expanded={isOpen}
                        >
                          <span className="w-12 shrink-0 text-sm tabular-nums text-muted">{t.code}</span>
                          <span className="min-w-0 flex-1 truncate text-ink">{t.title}</span>
                          {t.hl && <span className="chip h-5 px-1.5 text-[10px]">HL</span>}
                          <span className="text-xs tabular-nums text-muted">
                            {tc.done}/{tc.total}
                          </span>
                          <Icon name="chevronDown" size={16} className={`shrink-0 text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                      {isOpen && (
                        <ul className="pb-2 pl-11 pr-3">
                          {ls.map((l) => (
                            <li key={l.key} className="flex items-center gap-3 py-1.5">
                              <Check checked={!!completed[l.key]} onChange={() => setComplete(l.key, !completed[l.key])} label={`Mark ${l.meta.title} complete`} />
                              <Link to={l.href} className="flex min-w-0 flex-1 items-baseline gap-2 text-sm hover:text-accent">
                                {l.meta.code && <span className="w-14 shrink-0 tabular-nums text-muted">{l.meta.code}</span>}
                                <span className="truncate text-ink-2">{l.meta.title}</span>
                              </Link>
                            </li>
                          ))}
                          {!ls.length && <li className="py-1.5 text-sm text-muted">No lessons yet.</li>}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </Page>
  );
}
