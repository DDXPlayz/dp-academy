import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { allExamQuestions, getSubject, subjects, type ExamQuestion } from '../content';
import { PAPERS, type ExamSource } from '../content/schema';
import { Page, PageHeader } from '../components/AppShell';
import { ExamQuestionCard } from '../components/ExamQuestionCard';
import { Icon } from '../components/Icon';
import {
  COLLECTION_SOURCES,
  DEFAULT_FILTERS,
  DIFFICULTIES,
  byStatus,
  facetCounts,
  filterBank,
  shuffled,
  filtersFromParams,
  filtersToParams,
  toggle,
  type BankCollection,
  type BankFilters,
  type BankStatus,
} from '../lib/bank';
import { useProgress } from '../store/progress';

import { loadPastPapers } from '../lib/pastPapers';

const SOURCE_NAME: Record<ExamSource, string> = { original: 'Original', 'past-paper': 'Past paper', mock: 'Mock' };
const PAGE = 20;

function Chip({ on, onClick, children, count }: { on: boolean; onClick: () => void; children: React.ReactNode; count?: number }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-sm transition-colors ${
        on ? 'border-accent bg-accent-soft font-medium text-accent' : 'border-line text-ink-2 hover:border-line-strong hover:text-ink'
      }`}
    >
      {on && <Icon name="check" size={13} />}
      {children}
      {count !== undefined && <span className="text-xs text-muted">{count}</span>}
    </button>
  );
}

function Facet({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
      <span className="w-24 shrink-0 pt-1.5 text-xs font-medium uppercase tracking-wider text-muted">{label}</span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

export default function QuestionBank() {
  const [params, setParams] = useSearchParams();
  const f = useMemo(() => filtersFromParams(params), [params]);
  const set = (patch: Partial<BankFilters>) => setParams(filtersToParams({ ...f, ...patch }), { replace: true });
  const [local, setLocal] = useState<{ questions: ExamQuestion[]; rejected: number } | null>(null);
  const [shown, setShown] = useState(PAGE);
  const [seed, setSeed] = useState(0);
  const examResults = useProgress((s) => s.exam);

  useEffect(() => {
    loadPastPapers().then(setLocal);
  }, []);
  useEffect(() => setShown(PAGE), [params]);

  const pool = useMemo(() => [...allExamQuestions(), ...(local?.questions ?? [])], [local]);
  const matching = useMemo(() => filterBank(pool, f), [pool, f]);
  // Status counts use the other filters; the status itself is applied afterwards.
  const statusCounts = useMemo(() => {
    const c: Record<BankStatus, number> = { all: matching.length, new: 0, review: 0, done: 0 };
    for (const q of matching) {
      const r = examResults[q.key]?.r;
      if (!r) c.new++;
      else if (r === 'got') c.done++;
      else c.review++;
    }
    return c;
  }, [matching, examResults]);
  // Freeze the status filter while answering, so a question doesn't vanish the moment you mark it.
  const [frozen, setFrozen] = useState(examResults);
  useEffect(() => setFrozen(useProgress.getState().exam), [params]);
  const results = useMemo(() => {
    const list = byStatus(matching, f.status, frozen);
    return seed ? shuffled(list, seed) : list;
  }, [matching, f.status, frozen, seed]);
  const paperCounts = facetCounts(pool, f, 'paper');
  const diffCounts = facetCounts(pool, f, 'difficulty');
  const sourceCounts = facetCounts(pool, f, 'source');
  const subject = f.subject ? getSubject(f.subject) : undefined;
  const papers = subject ? PAPERS[subject.id] ?? [] : [...new Set(Object.values(PAPERS).flat())].sort();
  const pastTotal = pool.filter((q) => q.source !== 'original').length;

  const switchCollection = (collection: BankCollection) => setParams(filtersToParams({ ...DEFAULT_FILTERS, subject: f.subject, level: f.level, collection }), { replace: true });
  const STATUS_LABEL: Record<BankStatus, string> = { all: 'All', new: 'Not tried', review: 'To review', done: 'Got it' };

  return (
    <Page wide>
      <PageHeader eyebrow="Practice" title="Question bank">
        Exam-style questions by paper, topic and difficulty. Each one shows where it comes from.
      </PageHeader>

      <div role="tablist" aria-label="Collection" className="mb-6 inline-flex rounded-lg border border-line bg-sunken p-1">
        {(['general', 'past'] as BankCollection[]).map((c) => (
          <button
            key={c}
            role="tab"
            type="button"
            aria-selected={f.collection === c}
            onClick={() => switchCollection(c)}
            className={`h-9 rounded-md px-4 text-sm font-medium transition-colors ${f.collection === c ? 'bg-card text-ink shadow-sm' : 'text-muted hover:text-ink'}`}
          >
            {c === 'general' ? 'General' : 'Past papers'}
          </button>
        ))}
      </div>

      <section aria-label="Filters" className="card mb-6 space-y-4 p-4 md:p-5">
        <Facet label="Subject">
          <Chip on={!f.subject} onClick={() => set({ subject: null, papers: [], topics: [] })}>
            All
          </Chip>
          {subjects.map((s) => (
            <Chip key={s.id} on={f.subject === s.id} onClick={() => set({ subject: s.id, papers: [], topics: [] })}>
              {s.short}
            </Chip>
          ))}
        </Facet>
        <Facet label="Paper">
          {papers.map((p) => (
            <Chip key={p} on={f.papers.includes(p)} onClick={() => set({ papers: toggle(f.papers, p) })} count={paperCounts[p] ?? 0}>
              Paper {p}
            </Chip>
          ))}
        </Facet>
        <Facet label="Difficulty">
          {DIFFICULTIES.map((d) => (
            <Chip key={d} on={f.difficulties.includes(d)} onClick={() => set({ difficulties: toggle(f.difficulties, d) })} count={diffCounts[d] ?? 0}>
              <span className="capitalize">{d}</span>
            </Chip>
          ))}
        </Facet>
        <Facet label="Progress">
          {(['all', 'new', 'review', 'done'] as BankStatus[]).map((st) => (
            <Chip key={st} on={f.status === st} onClick={() => set({ status: st })} count={statusCounts[st]}>
              {STATUS_LABEL[st]}
            </Chip>
          ))}
        </Facet>
        {f.collection === 'past' && (
          <Facet label="Source">
            {COLLECTION_SOURCES.past.map((s) => (
              <Chip key={s} on={f.sources.includes(s)} onClick={() => set({ sources: toggle(f.sources, s) })} count={sourceCounts[s] ?? 0}>
                {SOURCE_NAME[s]}
              </Chip>
            ))}
          </Facet>
        )}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="bank-topic" className="w-24 shrink-0 text-xs font-medium uppercase tracking-wider text-muted">
            Topic
          </label>
          <select
            id="bank-topic"
            className="input h-10 max-w-md"
            value={f.topics[0] ?? ''}
            onChange={(e) => set({ topics: e.target.value ? [e.target.value] : [] })}
          >
            <option value="">All topics{subject ? ` in ${subject.short}` : ''}</option>
            {(subject ? [subject] : subjects).map((s) => (
              <optgroup key={s.id} label={s.title}>
                {s.topics
                  .filter((t) => f.level === 'HL' || !t.hl)
                  .map((t) => (
                    <option key={t.key} value={t.key}>
                      {t.code} {t.title}
                      {t.hl ? ' (HL)' : ''}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
          <div role="radiogroup" aria-label="Level" className="inline-flex rounded-lg border border-line bg-sunken p-1 sm:ml-auto">
            {(['SL', 'HL'] as const).map((l) => (
              <button
                key={l}
                type="button"
                role="radio"
                aria-checked={f.level === l}
                onClick={() => set({ level: l })}
                className={`h-8 rounded-md px-4 text-sm font-medium ${f.level === l ? 'bg-card text-ink shadow-sm' : 'text-muted hover:text-ink'}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </section>

      <p className="mb-4 flex flex-wrap items-center gap-x-3 text-sm text-muted" aria-live="polite">
        <span>
          {results.length} question{results.length === 1 ? '' : 's'}
        </span>
        {(f.papers.length > 0 || f.difficulties.length > 0 || f.topics.length > 0 || f.sources.length > 0 || f.status !== 'all') && (
          <button type="button" className="text-accent hover:underline" onClick={() => set({ papers: [], difficulties: [], topics: [], sources: [], status: 'all' })}>
            Clear filters
          </button>
        )}
        {results.length > 1 && (
          <button
            type="button"
            className="ml-auto inline-flex items-center gap-1.5 text-ink-2 hover:text-ink"
            onClick={() => {
              setSeed(seed ? 0 : Math.floor(Math.random() * 2 ** 31) + 1);
              setShown(PAGE);
            }}
            aria-pressed={!!seed}
          >
            <Icon name="shuffle" size={15} /> {seed ? 'Original order' : 'Shuffle'}
          </button>
        )}
        {local && local.rejected > 0 && <span className="text-bad">{local.rejected} imported rows failed validation</span>}
      </p>

      {f.collection === 'past' && pastTotal === 0 ? (
        <div className="card p-8 text-center">
          <p className="font-medium text-ink">No past-paper questions here.</p>
          <p className="mx-auto mt-1 max-w-lg text-sm text-muted">
            This copy of the app was built without the private past-paper collection. The General tab has exam-style questions for every paper.
          </p>
        </div>
      ) : results.length === 0 ? (
        <div className="card p-8 text-center text-ink-2">No questions match these filters.</div>
      ) : (
        <div className="space-y-4">
          {results.slice(0, shown).map((q, i) => (
            <ExamQuestionCard key={q.key} q={q} index={i} />
          ))}
          {shown < results.length && (
            <div className="text-center">
              <button type="button" className="btn-secondary" onClick={() => setShown((n) => n + PAGE)}>
                Show more ({results.length - shown} left)
              </button>
            </div>
          )}
        </div>
      )}
    </Page>
  );
}
