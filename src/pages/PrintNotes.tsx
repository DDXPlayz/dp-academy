import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getQuestion, subjects, type Lesson, type Topic } from '../content';
import { Page, PageHeader } from '../components/AppShell';
import { Icon } from '../components/Icon';
import { Inline, Markdown } from '../components/Markdown';

/*
 * Print notes: pick topics, then print every lesson in them in a clean
 * layout (worked examples expanded, app chrome hidden, one lesson per page).
 */

function PrintedLesson({ lesson, topic }: { lesson: Lesson; topic: Topic }) {
  const m = lesson.meta;
  const embed = (id: string) => {
    const q = getQuestion(`${topic.key}/${id}`);
    return q ? (
      <div className="rounded-lg border border-line p-3 text-sm">
        <p className="eyebrow mb-1">Check your understanding</p>
        <Markdown>{q.prompt}</Markdown>
      </div>
    ) : null;
  };
  return (
    <article className="print-lesson mb-12">
      <p className="eyebrow">
        {topic.code} {topic.title}
        {m.code ? ` · ${m.code}` : ''}
        {m.hl ? ' · HL' : ''}
      </p>
      <h2 className="mt-1 text-2xl font-semibold text-ink">{m.title}</h2>
      <p className="mt-1 text-ink-2">{m.summary}</p>
      <div className="prose-lesson mt-4">
        <h3>Learning objectives</h3>
        <ul>
          {m.objectives.map((o) => (
            <li key={o}>
              <Inline>{o}</Inline>
            </li>
          ))}
        </ul>
        <Markdown embedQuestion={embed}>{lesson.body}</Markdown>
        {m.formulas.length > 0 && (
          <>
            <h3>Formulas</h3>
            <ul>
              {m.formulas.map((f) => (
                <li key={f.name}>
                  <strong>{f.name}:</strong> <Inline>{`$${f.latex}$`}</Inline>
                  {f.where ? <> — {f.where}</> : null}
                </li>
              ))}
            </ul>
          </>
        )}
        {m.definitions.length > 0 && (
          <>
            <h3>Definitions</h3>
            <ul>
              {m.definitions.map((d) => (
                <li key={d.term}>
                  <strong>{d.term}:</strong> <Inline>{d.definition}</Inline>
                </li>
              ))}
            </ul>
          </>
        )}
        {m.mistakes.length > 0 && (
          <>
            <h3>Common mistakes</h3>
            <ul>
              {m.mistakes.map((x) => (
                <li key={x}>
                  <Inline>{x}</Inline>
                </li>
              ))}
            </ul>
          </>
        )}
        {m.tips.length > 0 && (
          <>
            <h3>Exam tips</h3>
            <ul>
              {m.tips.map((x) => (
                <li key={x}>
                  <Inline>{x}</Inline>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </article>
  );
}

export default function PrintNotes() {
  const [params, setParams] = useSearchParams();
  const subject = subjects.find((s) => s.id === params.get('s')) ?? subjects[0];
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [hl, setHl] = useState(true);

  const chosen = useMemo(() => subject.topics.filter((t) => picked.has(t.key) && (hl || !t.hl)), [subject, picked, hl]);
  const lessonCount = chosen.reduce((n, t) => n + t.lessons.filter((l) => hl || !l.meta.hl).length, 0);

  const toggle = (keys: string[], on: boolean) =>
    setPicked((p) => {
      const n = new Set(p);
      for (const k of keys) (on ? n.add(k) : n.delete(k));
      return n;
    });

  const print = () => {
    // Worked examples are collapsed <details>; open them for printing, then restore.
    const closed = [...document.querySelectorAll<HTMLDetailsElement>('.print-area details:not([open])')];
    closed.forEach((d) => (d.open = true));
    const restore = () => {
      closed.forEach((d) => (d.open = false));
      window.removeEventListener('afterprint', restore);
    };
    window.addEventListener('afterprint', restore);
    setTimeout(() => window.print(), 50);
  };

  return (
    <Page>
      <div className="no-print">
        <PageHeader eyebrow="Notes" title="Print notes">
          Choose topics, preview them below, then print or save as PDF. Each lesson starts on a new page.
        </PageHeader>

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div role="tablist" aria-label="Subject" className="inline-flex rounded-lg border border-line bg-sunken p-1">
            {subjects.map((s) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={s.id === subject.id}
                onClick={() => {
                  setParams({ s: s.id }, { replace: true });
                  setPicked(new Set());
                }}
                className={`h-9 rounded-md px-4 text-sm font-medium ${s.id === subject.id ? 'bg-card text-ink shadow-sm' : 'text-muted hover:text-ink'}`}
              >
                {s.short}
              </button>
            ))}
          </div>
          <label className="inline-flex items-center gap-2 text-sm text-ink-2">
            <input type="checkbox" checked={hl} onChange={(e) => setHl(e.target.checked)} /> Include HL-only content
          </label>
          <button type="button" className="btn-primary ml-auto" disabled={!lessonCount} onClick={print}>
            <Icon name="download" size={16} /> Print {lessonCount ? `${lessonCount} lesson${lessonCount === 1 ? '' : 's'}` : ''}
          </button>
        </div>

        <div className="card mb-8 space-y-4 p-4">
          {subject.units.map((u) => {
            const keys = u.topics.filter((t) => hl || !t.hl).map((t) => t.key);
            if (!keys.length) return null;
            const all = keys.every((k) => picked.has(k));
            return (
              <fieldset key={u.id}>
                <legend className="mb-2 flex items-center gap-2">
                  <label className="inline-flex items-center gap-2 font-medium text-ink">
                    <input type="checkbox" checked={all} onChange={() => toggle(keys, !all)} />
                    {u.code} {u.title}
                  </label>
                </legend>
                <div className="grid gap-1.5 pl-6 sm:grid-cols-2">
                  {u.topics
                    .filter((t) => hl || !t.hl)
                    .map((t) => (
                      <label key={t.key} className="inline-flex items-center gap-2 text-sm text-ink-2">
                        <input type="checkbox" checked={picked.has(t.key)} onChange={() => toggle([t.key], !picked.has(t.key))} />
                        <span className="tabular-nums text-muted">{t.code}</span> {t.title}
                        <span className="text-xs text-muted">({t.lessons.length})</span>
                      </label>
                    ))}
                </div>
              </fieldset>
            );
          })}
        </div>
      </div>

      <div className="print-area">
        {chosen.length === 0 ? (
          <p className="no-print text-center text-muted">Pick at least one topic to preview its notes here.</p>
        ) : (
          <>
            <header className="mb-8">
              <h1 className="text-3xl font-semibold text-ink">{subject.title}</h1>
              <p className="text-ink-2">{chosen.map((t) => `${t.code} ${t.title}`).join(' · ')}</p>
            </header>
            {chosen.flatMap((t) => t.lessons.filter((l) => hl || !l.meta.hl).map((l) => <PrintedLesson key={l.key} lesson={l} topic={t} />))}
          </>
        )}
      </div>
    </Page>
  );
}
