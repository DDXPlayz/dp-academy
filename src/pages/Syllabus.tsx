import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { subjects, type Subject, type Topic } from '../content';
import { Page, PageHeader } from '../components/AppShell';
import { Icon } from '../components/Icon';
import { ProgressBar } from '../components/ProgressBar';
import { isRevisit, useProgress, type Level } from '../store/progress';

/*
 * Syllabus checklist: every unit, topic and sub-idea lesson with a tick box.
 * Ticking a lesson marks it complete everywhere in the app; ticking a topic
 * marks all of its lessons. Lessons can also be flagged to revisit.
 */

type Filter = 'all' | 'todo' | 'revisit';

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'todo', label: 'Not complete' },
  { id: 'revisit', label: 'Revisit' },
];

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

const visibleAt = (level: Level) => (t: Topic) => level === 'HL' || !t.hl;
const lessonsAt = (level: Level) => (t: Topic) => t.lessons.filter((l) => level === 'HL' || !l.meta.hl);
const pct = (done: number, total: number) => (total ? Math.round((done / total) * 100) : 0);

export default function Syllabus() {
  const [params, setParams] = useSearchParams();
  const subject = subjects.find((s) => s.id === params.get('s')) ?? subjects[0];
  const savedLevels = useProgress((s) => s.levels);
  // Starts at the student's saved level for each subject; toggling here is local to this page.
  const [levelChoice, setLevelChoice] = useState<Record<string, Level>>({});
  const levelOf = (s: Subject): Level => levelChoice[s.id] ?? savedLevels[s.id] ?? 'HL';
  const level = levelOf(subject);
  const completed = useProgress((s) => s.completed);
  const setComplete = useProgress((s) => s.setComplete);
  const revisitMap = useProgress((s) => s.revisit);
  const setRevisit = useProgress((s) => s.setRevisit);
  const flagged = (key: string) => isRevisit({ revisit: revisitMap }, key);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState<Filter>('all');

  const visible = visibleAt(level);
  const lessonsOf = lessonsAt(level);
  const count = (topics: Topic[], lv: Level = level) => {
    const all = topics.flatMap(lessonsAt(lv));
    return { done: all.filter((l) => completed[l.key]).length, total: all.length };
  };
  const flaggedIn = (t: Topic) => lessonsOf(t).filter((l) => flagged(l.key)).length;
  const toggleTopic = (t: Topic) => {
    const ls = lessonsOf(t);
    const allDone = ls.every((l) => completed[l.key]);
    for (const l of ls) setComplete(l.key, !allDone);
  };
  const passes = (t: Topic) => {
    if (filter === 'todo') {
      const c = count([t]);
      return c.done < c.total;
    }
    if (filter === 'revisit') return flaggedIn(t) > 0;
    return true;
  };

  const whole = count(subject.topics.filter(visible));
  const shownTopics = subject.topics.filter((t) => visible(t) && passes(t));
  const defaultOpen = filter === 'revisit';
  const setAllOpen = (value: boolean) => setOpen((o) => ({ ...o, ...Object.fromEntries(shownTopics.map((t) => [t.key, value])) }));
  const allOpen = shownTopics.length > 0 && shownTopics.every((t) => open[t.key] ?? defaultOpen);

  return (
    <Page>
      <PageHeader eyebrow="Progress" title="Syllabus checklist">
        Tick off each sub-topic as you finish it. Ticks here and “Mark complete” in a lesson are the same thing.
      </PageHeader>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div role="tablist" aria-label="Subject" className="inline-flex rounded-lg border border-line bg-sunken p-1">
          {subjects.map((s) => {
            const lv = levelOf(s);
            const c = count(s.topics.filter(visibleAt(lv)), lv);
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={s.id === subject.id}
                onClick={() => setParams({ s: s.id }, { replace: true })}
                className={`h-9 rounded-md px-3 text-sm font-medium transition-colors sm:px-4 ${s.id === subject.id ? 'bg-card text-ink shadow-sm' : 'text-muted hover:text-ink'}`}
              >
                {s.short}
                <span className="ml-1.5 text-xs font-normal tabular-nums text-muted" aria-label={`${pct(c.done, c.total)} percent complete`}>
                  {pct(c.done, c.total)}%
                </span>
              </button>
            );
          })}
        </div>
        <div role="radiogroup" aria-label="Level" className="inline-flex rounded-lg border border-line bg-sunken p-1">
          {(['SL', 'HL'] as Level[]).map((l) => (
            <button
              key={l}
              type="button"
              role="radio"
              aria-checked={level === l}
              onClick={() => setLevelChoice((c) => ({ ...c, [subject.id]: l }))}
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
          <span className="font-medium text-ink">{pct(whole.done, whole.total)}%</span>
        </div>
        <ProgressBar value={whole.total ? whole.done / whole.total : 0} label={`${subject.title} syllabus progress`} />
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div role="radiogroup" aria-label="Show" className="inline-flex rounded-lg border border-line bg-sunken p-1">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="radio"
              aria-checked={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`h-8 rounded-md px-3 text-sm font-medium ${filter === f.id ? 'bg-card text-ink shadow-sm' : 'text-muted hover:text-ink'}`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button type="button" className="btn-ghost ml-auto text-sm" onClick={() => setAllOpen(!allOpen)} disabled={!shownTopics.length}>
          <Icon name="chevronDown" size={16} className={`transition-transform ${allOpen ? 'rotate-180' : ''}`} />
          {allOpen ? 'Collapse all' : 'Expand all'}
        </button>
      </div>

      {!shownTopics.length && (
        <div className="card p-8 text-center text-sm text-muted">
          {filter === 'revisit' ? (
            <>
              No lessons flagged to revisit in {subject.short} yet. Use the <Icon name="rotate" size={14} className="inline align-[-2px]" /> button on a
              lesson to flag it.
            </>
          ) : filter === 'todo' ? (
            <>Everything in {subject.short} {level} is complete. Nice work.</>
          ) : (
            <>No topics here yet.</>
          )}
        </div>
      )}

      <div className="space-y-4">
        {subject.units.map((u) => {
          const unitTopics = u.topics.filter(visible);
          const topics = unitTopics.filter(passes);
          if (!topics.length) return null;
          const uc = count(unitTopics);
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
                  const nFlagged = flaggedIn(t);
                  const isOpen = open[t.key] ?? defaultOpen;
                  const complete = !!tc.total && tc.done === tc.total;
                  const started = tc.done > 0;
                  return (
                    <li key={t.key}>
                      <div className="flex items-center gap-3 px-3 py-2.5">
                        <Check
                          checked={complete}
                          partial={started && !complete}
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
                          <span className={`min-w-0 flex-1 truncate ${started || complete ? 'text-ink' : 'text-ink-2'}`}>{t.title}</span>
                          {t.hl && <span className="chip h-5 px-1.5 text-[10px]">HL</span>}
                          {nFlagged > 0 && (
                            <span
                              className="chip h-5 gap-1 bg-warn-soft px-1.5 text-[10px] text-warn"
                              title={`${nFlagged} lesson${nFlagged === 1 ? '' : 's'} to revisit`}
                              aria-label={`${nFlagged} to revisit`}
                            >
                              <Icon name="rotate" size={10} />
                              {nFlagged}
                            </span>
                          )}
                          <span
                            className={`text-xs tabular-nums ${complete ? 'text-good' : started ? 'font-medium text-ink-2' : 'text-muted'}`}
                            title={complete ? 'Complete' : started ? 'In progress' : 'Not started'}
                          >
                            {tc.done}/{tc.total}
                          </span>
                          <Icon name="chevronDown" size={16} className={`shrink-0 text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                      {isOpen && (
                        <ul className="pb-2 pl-11 pr-3">
                          {ls.map((l) => {
                            const f = flagged(l.key);
                            return (
                              <li key={l.key} className="flex items-center gap-3 py-1.5">
                                <Check checked={!!completed[l.key]} onChange={() => setComplete(l.key, !completed[l.key])} label={`Mark ${l.meta.title} complete`} />
                                <Link to={l.href} className="flex min-w-0 flex-1 items-baseline gap-2 text-sm hover:text-accent">
                                  {l.meta.code && <span className="w-14 shrink-0 tabular-nums text-muted">{l.meta.code}</span>}
                                  <span className="truncate text-ink-2">{l.meta.title}</span>
                                </Link>
                                <button
                                  type="button"
                                  onClick={() => setRevisit(l.key, !f)}
                                  aria-pressed={f}
                                  aria-label={`Revisit ${l.meta.title}`}
                                  title={f ? 'Flagged to revisit' : 'Flag to revisit'}
                                  className={`flex size-7 shrink-0 items-center justify-center rounded-md transition-colors ${
                                    f ? 'bg-warn-soft text-warn' : 'text-muted/60 hover:bg-sunken hover:text-ink'
                                  }`}
                                >
                                  <Icon name="rotate" size={14} />
                                </button>
                              </li>
                            );
                          })}
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
