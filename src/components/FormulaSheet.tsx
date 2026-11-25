import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { subjects } from '../content';
import { FormulaCard } from './FormulaCard';
import { Icon } from './Icon';

/** Every formula in a subject on one page, grouped by topic, searchable and printable. */
export function FormulaSheet() {
  const [params, setParams] = useSearchParams();
  const subject = subjects.find((s) => s.id === params.get('subject')) ?? subjects[0];
  const [query, setQuery] = useState('');
  const [hl, setHl] = useState(true);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return subject.topics
      .filter((t) => hl || !t.hl)
      .map((t) => ({
        topic: t,
        formulas: t.lessons
          .filter((l) => hl || !l.meta.hl)
          .flatMap((l) => l.meta.formulas.map((f) => ({ f, lesson: l })))
          .filter(({ f, lesson }) => !q || `${f.name} ${f.where ?? ''} ${lesson.meta.title} ${t.title}`.toLowerCase().includes(q)),
      }))
      .filter((g) => g.formulas.length);
  }, [subject, query, hl]);

  const count = groups.reduce((n, g) => n + g.formulas.length, 0);

  return (
    <div>
      <div className="no-print mb-6 flex flex-wrap items-center gap-3">
        <div role="tablist" aria-label="Subject" className="inline-flex rounded-lg border border-line bg-sunken p-1">
          {subjects.map((s) => (
            <button
              key={s.id}
              role="tab"
              type="button"
              aria-selected={s.id === subject.id}
              onClick={() => setParams({ subject: s.id }, { replace: true })}
              className={`h-8 rounded-md px-3 text-sm font-medium ${s.id === subject.id ? 'bg-card text-ink shadow-sm' : 'text-muted hover:text-ink'}`}
            >
              {s.short}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-ink-2">
          <input type="checkbox" checked={hl} onChange={(e) => setHl(e.target.checked)} className="size-4 accent-[var(--accent)]" />
          Include HL
        </label>
        <button type="button" className="btn-secondary ml-auto h-9" onClick={() => window.print()}>
          Print
        </button>
      </div>
      <div className="no-print relative mb-6">
        <Icon name="search" size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="search"
          className="input pl-9"
          placeholder={`Search ${subject.short} formulas — e.g. “energy”, “gradient”, “pH”`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <p className="mb-6 text-sm text-muted" aria-live="polite">
        {subject.title}: {count} formula{count === 1 ? '' : 's'}
      </p>

      <div className="space-y-10">
        {groups.map(({ topic, formulas }) => (
          <section key={topic.key} className="print-lesson">
            <h2 className="mb-3 flex items-baseline gap-2 font-semibold text-ink">
              <span className="text-muted">{topic.code}</span>
              <Link to={topic.href} className="hover:underline">
                {topic.title}
              </Link>
              {topic.hl && <span className="chip">HL</span>}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {formulas.map(({ f, lesson }) => (
                <FormulaCard key={`${lesson.key}-${f.name}`} formula={f} context={lesson.meta.title} />
              ))}
            </div>
          </section>
        ))}
        {!groups.length && <p className="card p-8 text-center text-ink-2">No formulas match “{query}”.</p>}
      </div>
    </div>
  );
}
