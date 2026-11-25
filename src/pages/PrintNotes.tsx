import './print.css';
import { Fragment, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getLesson, getQuestion, getTopic, subjects, type Lesson, type Subject, type Topic } from '../content';
import { Page, PageHeader } from '../components/AppShell';
import { Icon } from '../components/Icon';
import { Inline, Markdown } from '../components/Markdown';
import { blocksOf, sectionOf, stripChecks } from '../lib/printText';
import { NOTE_SOURCES, loadTopicNotes, sourceName, useNotesIndex, type NotesIndex, type NoteSource, type ReferenceNote } from '../lib/referenceNotes';

/*
 * Print notes: a revision-pack generator.
 *
 * 1. Pick what to print from the syllabus tree (subject → unit → topic → lesson),
 *    across any number of subjects; the review panel lists the selection.
 * 2. Pick the sources (the app's lessons, Save My Exams notes, IITian Academy notes),
 *    each independent, and whether they print together by topic or as one pack per source.
 * 3. Pick the layout: compact (dense revision notes, see print.css) or standard
 *    (the original one-lesson-per-page layout).
 *
 * Reference notes follow the selection: a whole topic prints all of its notes; a
 * few lessons print only the notes matched to those lessons (each note once).
 *
 * /print?s=<subject>&t=<topic key>,…&l=<lesson key>,…&src=lessons,sme,iitian preselects.
 */

type Part = 'lessons' | NoteSource;
type Layout = 'compact' | 'standard';
type Arrange = 'topic' | 'source';
const PARTS: Part[] = ['lessons', 'sme', 'iitian'];
const isPart = (p: string): p is Part => (PARTS as string[]).includes(p);
const isHl = (title: string) => /\((A?HL)( only)?\)/i.test(title);
const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? '' : 's'}`;

const STORE = 'dpa-print';
type Detail = 'full' | 'condensed';
type Saved = { picked: string[]; parts: Part[]; layout: Layout; arrange: Arrange; columns: 1 | 2; detail: Detail; examples: boolean; checks: boolean; hl: boolean };
function readSaved(): Partial<Saved> {
  try {
    return JSON.parse(sessionStorage.getItem(STORE) ?? '{}') as Partial<Saved>;
  } catch {
    return {};
  }
}

const visibleTopics = (s: Subject, hl: boolean) => s.topics.filter((t) => hl || !t.hl);
const visibleLessons = (t: Topic, hl: boolean) => t.lessons.filter((l) => hl || !l.meta.hl);

type Tri = boolean | 'mixed';
const triState = (keys: string[], picked: Set<string>): Tri => {
  const n = keys.filter((k) => picked.has(k)).length;
  return n === 0 ? false : n === keys.length ? true : 'mixed';
};

function TriCheck({ state, onChange, label }: { state: Tri; onChange: () => void; label?: string }) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = state === 'mixed';
  }, [state]);
  return <input ref={ref} type="checkbox" aria-label={label} checked={state === true} onChange={onChange} />;
}

/** The notes of one source for a topic, limited to the chosen lessons when only some are chosen. */
function selectNotes(all: ReferenceNote[], index: NotesIndex, source: NoteSource, lessons: Lesson[], whole: boolean, hl: boolean) {
  let list = all.filter((n) => hl || !isHl(n.title));
  if (!whole) {
    const ids = new Set(lessons.flatMap((l) => index.lessons[l.key]?.[source] ?? []));
    // A lesson without matched notes falls back to the topic's notes rather than printing nothing.
    if (ids.size) list = list.filter((n) => ids.has(n.id));
  }
  return list;
}

/** Loads the reference notes for every chosen topic and source. */
function useReferenceNotes(topics: Topic[], sources: NoteSource[]) {
  const [notes, setNotes] = useState<Record<string, ReferenceNote[] | null>>({});
  const wanted = topics.flatMap((t) => sources.map((s) => `${t.key}|${s}`));
  const key = wanted.join(',');
  useEffect(() => {
    let live = true;
    for (const w of key ? key.split(',') : []) {
      const [topicKey, source] = w.split('|') as [string, NoteSource];
      loadTopicNotes(topicKey, source).then((n) => {
        if (live) setNotes((prev) => (w in prev ? prev : { ...prev, [w]: n }));
      });
    }
    return () => {
      live = false;
    };
  }, [key]);
  const loading = wanted.some((w) => !(w in notes));
  return { notes, loading };
}

/** Waits until every image in the print area has loaded (they are lazy on screen). */
function imagesLoaded(root: Element, timeout = 20000): Promise<void> {
  const imgs = [...root.querySelectorAll('img')];
  imgs.forEach((img) => (img.loading = 'eager'));
  const pending = imgs.filter((img) => !img.complete);
  const all = Promise.all(
    pending.map(
      (img) =>
        new Promise<void>((resolve) => {
          img.addEventListener('load', () => resolve(), { once: true });
          img.addEventListener('error', () => resolve(), { once: true });
        }),
    ),
  ).then(() => undefined);
  return Promise.race([all, new Promise<void>((resolve) => setTimeout(resolve, timeout))]);
}

/**
 * Shrinks display equations wider than the printed text column (A4 minus margins,
 * one or two columns) so they are never clipped on paper.
 */
function fitEquations(root: Element, columnPx: number) {
  const range = document.createRange();
  root.querySelectorAll<HTMLElement>('.katex-display > .katex').forEach((k) => {
    k.style.fontSize = '';
    // Measure only the visible rendering (.katex-html), not the hidden MathML copy.
    range.selectNodeContents(k.querySelector('.katex-html') ?? k);
    const w = range.getBoundingClientRect().width;
    if (w > columnPx) k.style.fontSize = `${Math.max(0.6, columnPx / w) * 100}%`;
  });
}

/* ---------- Standard layout (unchanged from before: one lesson / note set per page) ---------- */

function PrintedReference({ topic, source, notes }: { topic: Topic; source: NoteSource; notes: ReferenceNote[] }) {
  return (
    <article className="print-lesson mb-12">
      <p className="eyebrow">
        {topic.code} {topic.title} · {sourceName(source)} notes
      </p>
      {notes.map((n, i) => (
        <section key={n.id} className={i ? 'mt-10' : 'mt-1'}>
          <h2 className="text-2xl font-semibold text-ink">{n.title}</h2>
          <div className="prose-lesson mt-3">
            <Markdown>{n.body}</Markdown>
          </div>
        </section>
      ))}
      <p className="mt-6 text-xs text-muted">Notes © {sourceName(source)}, for personal revision.</p>
    </article>
  );
}

function PrintedLesson({ lesson, topic, checks }: { lesson: Lesson; topic: Topic; checks: boolean }) {
  const m = lesson.meta;
  const embed = (id: string) => {
    const q = checks ? getQuestion(`${topic.key}/${id}`) : undefined;
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

/* ---------- Compact layout: dense revision notes (styles in print.css) ---------- */


/** Condensed lesson: its key ideas and summary only (formulas, definitions etc. follow as usual). */
function CondensedBody({ body }: { body: string }) {
  const ideas = [...new Set(blocksOf(body, 'keyidea'))];
  const summary = stripChecks(sectionOf(body, 'Summary'));
  return (
    <>
      {ideas.length > 0 && (
        <>
          <div className="pc-label">Key ideas</div>
          <div className="prose-lesson">
            <ul>
              {ideas.map((i) => (
                <li key={i}>
                  <Markdown>{i}</Markdown>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      {summary && (
        <>
          <div className="pc-label">Summary</div>
          <div className="prose-lesson">
            <Markdown>{summary}</Markdown>
          </div>
        </>
      )}
    </>
  );
}

function CompactLesson({ lesson, topic, checks, condensed }: { lesson: Lesson; topic: Topic; checks: boolean; condensed: boolean }) {
  const m = lesson.meta;
  const embed = (id: string) => {
    const q = checks ? getQuestion(`${topic.key}/${id}`) : undefined;
    return q ? (
      <div className="pc-check">
        <div className="pc-label">Check</div>
        <Markdown>{q.prompt}</Markdown>
      </div>
    ) : null;
  };
  return (
    <section>
      <h3 className="pc-item">
        {m.code ? `${m.code} ` : ''}
        {m.title}
        {m.hl && <small>HL</small>}
      </h3>
      {condensed ? (
        <CondensedBody body={lesson.body} />
      ) : (
        <div className="prose-lesson">
          <Markdown embedQuestion={embed}>{checks ? lesson.body : stripChecks(lesson.body)}</Markdown>
        </div>
      )}
      {m.formulas.length > 0 && (
        <>
          <div className="pc-label">Formulas</div>
          <table className="pc-table">
            <tbody>
              {m.formulas.map((f) => (
                <tr key={f.name}>
                  <td>
                    <Inline>{f.name}</Inline>
                  </td>
                  <td>
                    <Inline>{`$${f.latex}$`}</Inline>
                    {f.where ? (
                      <span className="text-muted">
                        {' '}
                        — <Inline>{f.where}</Inline>
                      </span>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {m.definitions.length > 0 && (
        <>
          <div className="pc-label">Definitions</div>
          <table className="pc-table">
            <tbody>
              {m.definitions.map((d) => (
                <tr key={d.term}>
                  <td>
                    <Inline>{d.term}</Inline>
                  </td>
                  <td>
                    <Inline>{d.definition}</Inline>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {m.mistakes.length > 0 && (
        <>
          <div className="pc-label">Common mistakes</div>
          <ul className="pc-list">
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
          <div className="pc-label">Exam tips</div>
          <ul className="pc-list">
            {m.tips.map((x) => (
              <li key={x}>
                <Inline>{x}</Inline>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

function CompactNotes({ source, notes, label }: { source: NoteSource; notes: ReferenceNote[]; label: boolean }) {
  return (
    <section>
      {label && <p className="pc-source">{sourceName(source)}</p>}
      {notes.map((n) => (
        <div key={n.id}>
          <h3 className="pc-item">{n.title}</h3>
          <div className="prose-lesson reference-note">
            <Markdown>{n.body}</Markdown>
          </div>
        </div>
      ))}
      <p className="pc-copy">Notes © {sourceName(source)}, for personal revision.</p>
    </section>
  );
}

/* ---------- Page ---------- */

type Chosen = { topic: Topic; lessons: Lesson[]; whole: boolean };

export default function PrintNotes() {
  const [params, setParams] = useSearchParams();
  const subject = subjects.find((s) => s.id === params.get('s')) ?? subjects[0];
  const saved = useMemo(readSaved, []);

  const [picked, setPicked] = useState<Set<string>>(() => {
    const t = (params.get('t') ?? '').split(',').filter(Boolean);
    const l = (params.get('l') ?? '').split(',').filter(Boolean);
    if (!t.length && !l.length) return new Set((saved.picked ?? []).filter((k) => getLesson(k)));
    const s = new Set<string>();
    for (const k of t) getTopic(k)?.lessons.forEach((x) => s.add(x.key));
    for (const k of l) if (getLesson(k)) s.add(k);
    return s;
  });
  const [parts, setParts] = useState<Set<Part>>(() => {
    const src = params.get('src')?.split(',').filter(isPart) ?? saved.parts?.filter(isPart) ?? [];
    return new Set<Part>(src.length ? src : ['lessons']);
  });
  const [layout, setLayout] = useState<Layout>(saved.layout === 'standard' ? 'standard' : 'compact');
  const [arrange, setArrange] = useState<Arrange>(saved.arrange === 'source' ? 'source' : 'topic');
  const [columns, setColumns] = useState<1 | 2>(saved.columns === 1 ? 1 : 2);
  const [detail, setDetail] = useState<Detail>(saved.detail === 'condensed' ? 'condensed' : 'full');
  const [examples, setExamples] = useState(saved.examples ?? true);
  const [checks, setChecks] = useState(saved.checks ?? false);
  const [hl, setHl] = useState(saved.hl ?? true);
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());
  const [preparing, setPreparing] = useState(false);
  const index = useNotesIndex();

  useEffect(() => {
    try {
      const s: Saved = { picked: [...picked], parts: [...parts], layout, arrange, columns, detail, examples, checks, hl };
      sessionStorage.setItem(STORE, JSON.stringify(s));
    } catch {
      /* private mode: the selection just isn't remembered */
    }
  }, [picked, parts, layout, arrange, columns, detail, examples, checks, hl]);

  // Selection resolved against the syllabus, in syllabus order, grouped by subject.
  const plan = useMemo(
    () =>
      subjects
        .map((s) => ({
          subject: s,
          topics: visibleTopics(s, hl)
            .map((t): Chosen => {
              const all = visibleLessons(t, hl);
              const lessons = all.filter((l) => picked.has(l.key));
              return { topic: t, lessons, whole: lessons.length === all.length };
            })
            .filter((c) => c.lessons.length > 0),
        }))
        .filter((g) => g.topics.length > 0),
    [picked, hl],
  );
  const chosenTopics = plan.flatMap((g) => g.topics.map((c) => c.topic));

  const sources = index ? NOTE_SOURCES.map((s) => s.id).filter((s) => parts.has(s)) : [];
  const order = PARTS.filter((p) => (p === 'lessons' ? parts.has('lessons') : sources.includes(p)));
  const { notes, loading } = useReferenceNotes(chosenTopics, sources);
  const notesFor = (c: Chosen, s: NoteSource) => (index ? selectNotes(notes[`${c.topic.key}|${s}`] ?? [], index, s, c.lessons, c.whole, hl) : []);

  const lessonCount = parts.has('lessons') ? plan.reduce((n, g) => n + g.topics.reduce((m, c) => m + c.lessons.length, 0), 0) : 0;
  const noteCounts = sources.map((s) => ({ s, n: plan.reduce((n, g) => n + g.topics.reduce((m, c) => m + notesFor(c, s).length, 0), 0) }));
  const noteCount = noteCounts.reduce((n, x) => n + x.n, 0);
  const summary = [lessonCount ? plural(lessonCount, 'lesson') : '', noteCount ? plural(noteCount, 'note') : ''].filter(Boolean).join(' + ');

  const toggleSet = <T,>(set: (f: (p: Set<T>) => Set<T>) => void, keys: T[], on: boolean) =>
    set((p) => {
      const n = new Set(p);
      for (const k of keys) (on ? n.add(k) : n.delete(k));
      return n;
    });
  const pick = (keys: string[], on: boolean) => toggleSet(setPicked, keys, on);
  const togglePart = (p: Part) => toggleSet(setParts, [p], !parts.has(p));
  const toggleExpanded = (k: string) => toggleSet(setExpanded, [k], !expanded.has(k));

  const subjectKeys = (s: Subject) => visibleTopics(s, hl).flatMap((t) => visibleLessons(t, hl).map((l) => l.key));
  const subjectPicked = (s: Subject) => subjectKeys(s).filter((k) => picked.has(k)).length;

  const print = async () => {
    // Worked examples and answers are collapsed <details>; open them for printing, then restore.
    const area = document.querySelector('.print-area');
    if (!area) return;
    const closed = [...area.querySelectorAll<HTMLDetailsElement>('details:not([open])')];
    closed.forEach((d) => (d.open = true));
    const restore = () => {
      closed.forEach((d) => (d.open = false));
      window.removeEventListener('afterprint', restore);
    };
    window.addEventListener('afterprint', restore);
    setPreparing(true);
    await imagesLoaded(area); // diagrams load lazily on screen; all of them must be there on paper
    // A4 is 210mm; 13mm side margins; 6mm column gap. 1mm ≈ 3.78px.
    if (layout === 'compact') fitEquations(area, (columns === 2 ? 89 : 182) * 3.78 - 8);
    setPreparing(false);
    setTimeout(() => window.print(), 50);
  };

  /* ----- the document ----- */

  const compact = layout === 'compact';
  const multi = order.length > 1;

  /** One topic's material for the given parts; null when it has nothing to print. */
  const topicBlock = (c: Chosen, which: Part[], key: string): ReactNode => {
    const items = which
      .map((p) => {
        if (p === 'lessons') {
          return c.lessons.length ? (
            <Fragment key="lessons">
              {compact && multi && arrange === 'topic' && <p className="pc-source">DP Academy</p>}
              {c.lessons.map((l) =>
                compact ? <CompactLesson key={l.key} lesson={l} topic={c.topic} checks={checks} condensed={detail === 'condensed'} /> : <PrintedLesson key={l.key} lesson={l} topic={c.topic} checks={checks} />,
              )}
            </Fragment>
          ) : null;
        }
        const list = notesFor(c, p);
        if (!list.length) return null;
        return compact ? (
          <CompactNotes key={p} source={p} notes={list} label={multi && arrange === 'topic'} />
        ) : (
          <PrintedReference key={p} topic={c.topic} source={p} notes={list} />
        );
      })
      .filter(Boolean);
    if (!items.length) return null;
    return (
      <div key={key}>
        {compact && (
          <h2 className="pc-topic">
            {c.topic.code} {c.topic.title}
          </h2>
        )}
        {items}
      </div>
    );
  };

  // Sections start on a new page in the compact layout: one per subject, or per source and subject.
  const sections: { key: string; label: string | null; body: ReactNode[] }[] = [];
  if (arrange === 'source' && multi) {
    for (const p of order)
      for (const g of plan) {
        const body = g.topics.map((c) => topicBlock(c, [p], `${p}|${c.topic.key}`)).filter(Boolean);
        if (body.length) sections.push({ key: `${p}|${g.subject.id}`, label: `${g.subject.title} · ${p === 'lessons' ? 'DP Academy notes' : `${sourceName(p)} notes`}`, body });
      }
  } else {
    for (const g of plan) {
      const body = g.topics.map((c) => topicBlock(c, order, c.topic.key)).filter(Boolean);
      if (body.length) sections.push({ key: g.subject.id, label: plan.length > 1 ? g.subject.title : null, body });
    }
  }

  const title = plan.length === 1 ? plan[0].subject.title : plan.map((g) => g.subject.short).join(' · ');
  const sourceLine = order.map((p) => (p === 'lessons' ? 'DP Academy' : sourceName(p))).join(' + ');
  const today = new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <Page wide>
      <div className="no-print">
        <PageHeader eyebrow="Notes" title="Print notes">
          Pick topics or single lessons from any subject, choose the sources, review the selection, then print or save as PDF. Compact layout
          fits the most onto each page.
        </PageHeader>

        <div className="mb-8 gap-6 xl:grid xl:grid-cols-[minmax(0,1fr)_20rem] xl:items-start">
          {/* Syllabus tree */}
          <div className="mb-6 xl:mb-0">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <div role="tablist" aria-label="Subject" className="inline-flex rounded-lg border border-line bg-sunken p-1">
                {subjects.map((s) => {
                  const n = subjectPicked(s);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      role="tab"
                      aria-selected={s.id === subject.id}
                      onClick={() => setParams({ s: s.id }, { replace: true })}
                      className={`h-9 rounded-md px-4 text-sm font-medium ${s.id === subject.id ? 'bg-card text-ink shadow-sm' : 'text-muted hover:text-ink'}`}
                    >
                      {s.short}
                      {n > 0 && <span className="ml-1.5 text-xs tabular-nums text-accent">{n}</span>}
                    </button>
                  );
                })}
              </div>
              <button type="button" className="btn-ghost text-sm" onClick={() => pick(subjectKeys(subject), true)}>
                Select all {subject.short}
              </button>
              {subjectPicked(subject) > 0 && (
                <button type="button" className="btn-ghost text-sm" onClick={() => pick(subjectKeys(subject), false)}>
                  Clear {subject.short}
                </button>
              )}
            </div>

            <div className="card space-y-4 p-4">
              {subject.units.map((u) => {
                const topics = u.topics.filter((t) => hl || !t.hl);
                const keys = topics.flatMap((t) => visibleLessons(t, hl).map((l) => l.key));
                if (!keys.length) return null;
                const st = triState(keys, picked);
                return (
                  <fieldset key={u.id}>
                    <legend className="flex items-center gap-2">
                      <label className="inline-flex items-center gap-2 font-medium text-ink">
                        <TriCheck state={st} onChange={() => pick(keys, st !== true)} />
                        {u.code} {u.title}
                      </label>
                    </legend>
                    <ul className="mt-1.5 space-y-0.5 pl-3">
                      {topics.map((t) => {
                        const lessons = visibleLessons(t, hl);
                        const lk = lessons.map((l) => l.key);
                        const ts = triState(lk, picked);
                        const n = lk.filter((k) => picked.has(k)).length;
                        const open = expanded.has(t.key);
                        const extra = NOTE_SOURCES.filter((s) => index?.topics[t.key]?.[s.id]?.length).map((s) => s.short);
                        return (
                          <li key={t.key}>
                            <div className="flex items-center gap-1.5 text-sm">
                              <button
                                type="button"
                                aria-expanded={open}
                                aria-label={`${open ? 'Hide' : 'Show'} lessons in ${t.code}`}
                                onClick={() => toggleExpanded(t.key)}
                                className="grid h-6 w-6 shrink-0 place-items-center rounded text-muted hover:bg-sunken hover:text-ink"
                              >
                                <Icon name="chevronRight" size={14} className={`transition-transform ${open ? 'rotate-90' : ''}`} />
                              </button>
                              <label className="inline-flex min-w-0 flex-1 items-center gap-2 text-ink-2">
                                <TriCheck state={ts} onChange={() => pick(lk, ts !== true)} />
                                <span className="tabular-nums text-muted">{t.code}</span>
                                <span className="truncate">{t.title}</span>
                              </label>
                              <span className="shrink-0 text-xs tabular-nums text-muted">
                                {ts === 'mixed' ? `${n}/${lk.length}` : plural(lk.length, 'lesson')}
                                {extra.length ? ` · ${extra.join(', ')}` : ''}
                              </span>
                            </div>
                            {open && (
                              <ul className="mb-1 ml-[3.25rem] space-y-0.5">
                                {lessons.map((l) => (
                                  <li key={l.key}>
                                    <label className="inline-flex items-center gap-2 text-sm text-ink-2">
                                      <input type="checkbox" checked={picked.has(l.key)} onChange={() => pick([l.key], !picked.has(l.key))} />
                                      {l.meta.code && <span className="tabular-nums text-muted">{l.meta.code}</span>}
                                      {l.meta.title}
                                      {l.meta.hl && <span className="chip text-[10px]">HL</span>}
                                    </label>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </fieldset>
                );
              })}
            </div>
          </div>

          {/* Review and options */}
          <aside className="grid gap-4 sm:grid-cols-2 xl:sticky xl:top-6 xl:grid-cols-1">
            <section className="card p-4" aria-label="Selection">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="font-medium text-ink">Selected</h2>
                {picked.size > 0 && (
                  <button type="button" className="text-xs text-muted hover:text-ink" onClick={() => setPicked(new Set())}>
                    Clear all
                  </button>
                )}
              </div>
              {plan.length === 0 ? (
                <p className="text-sm text-muted">Nothing yet. Tick a unit, topic or lesson.</p>
              ) : (
                <div className="max-h-72 space-y-3 overflow-y-auto pr-1">
                  {plan.map((g) => (
                    <div key={g.subject.id}>
                      <p className="eyebrow mb-1">{g.subject.title}</p>
                      <ul className="space-y-0.5">
                        {g.topics.map((c) => (
                          <li key={c.topic.key} className="flex items-center gap-2 text-sm text-ink-2">
                            <span className="tabular-nums text-muted">{c.topic.code}</span>
                            <span className="min-w-0 flex-1 truncate">{c.topic.title}</span>
                            {!c.whole && <span className="text-xs tabular-nums text-muted">{c.lessons.length}/{visibleLessons(c.topic, hl).length}</span>}
                            <button
                              type="button"
                              aria-label={`Remove ${c.topic.code}`}
                              onClick={() => pick(c.topic.lessons.map((l) => l.key), false)}
                              className="grid h-5 w-5 place-items-center rounded text-muted hover:bg-sunken hover:text-ink"
                            >
                              <Icon name="x" size={12} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
              {plan.length > 0 && (
                <p className="mt-3 border-t border-line pt-2 text-xs text-muted">
                  {[
                    parts.has('lessons') ? plural(lessonCount, 'lesson') : '',
                    ...noteCounts.map(({ s, n }) => `${n} ${sourceName(s)}`),
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                  {loading ? ' · loading notes…' : ''}
                </p>
              )}
            </section>

            <section className="card space-y-3 p-4 text-sm text-ink-2" aria-label="Options">
              <fieldset>
                <legend className="mb-1 font-medium text-ink">Sources</legend>
                {PARTS.map((p) => {
                  const unavailable = p !== 'lessons' && !index;
                  return (
                    <label key={p} className={`flex items-center gap-2 ${unavailable ? 'opacity-50' : ''}`}>
                      <input type="checkbox" disabled={unavailable} checked={parts.has(p) && !unavailable} onChange={() => togglePart(p)} />
                      {p === 'lessons' ? 'DP Academy lessons' : `${sourceName(p)} notes`}
                      {unavailable && <span className="text-xs text-muted">{index === undefined ? '(checking…)' : '(not on this device)'}</span>}
                    </label>
                  );
                })}
              </fieldset>
              {multi && (
                <fieldset>
                  <legend className="mb-1 font-medium text-ink">Arrange</legend>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="arrange" checked={arrange === 'topic'} onChange={() => setArrange('topic')} /> Together, topic by topic
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="arrange" checked={arrange === 'source'} onChange={() => setArrange('source')} /> One pack per source
                  </label>
                </fieldset>
              )}
              <fieldset>
                <legend className="mb-1 font-medium text-ink">Layout</legend>
                <label className="flex items-center gap-2">
                  <input type="radio" name="layout" checked={compact} onChange={() => setLayout('compact')} /> Compact revision notes
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="layout" checked={!compact} onChange={() => setLayout('standard')} /> Standard (one lesson per page)
                </label>
                {compact && (
                  <div className="mt-1 flex items-center gap-4 pl-6">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="columns" checked={columns === 2} onChange={() => setColumns(2)} /> 2 columns
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="columns" checked={columns === 1} onChange={() => setColumns(1)} /> 1 column
                    </label>
                  </div>
                )}
              </fieldset>
              {compact && parts.has('lessons') && (
                <fieldset>
                  <legend className="mb-1 font-medium text-ink">DP Academy lessons</legend>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="detail" checked={detail === 'full'} onChange={() => setDetail('full')} /> Full notes
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="detail" checked={detail === 'condensed'} onChange={() => setDetail('condensed')} /> Condensed: key ideas, summary,
                    formulas, definitions
                  </label>
                </fieldset>
              )}
              <fieldset>
                <legend className="mb-1 font-medium text-ink">Include</legend>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={hl} onChange={(e) => setHl(e.target.checked)} /> HL-only content
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={examples} onChange={(e) => setExamples(e.target.checked)} /> Worked examples
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={checks} onChange={(e) => setChecks(e.target.checked)} /> Check-your-understanding questions
                </label>
              </fieldset>
              <button type="button" className="btn-primary w-full justify-center" disabled={!summary || loading || preparing} onClick={print}>
                <Icon name="download" size={16} /> {preparing ? 'Loading diagrams…' : loading ? 'Loading notes…' : summary ? `Print ${summary}` : 'Print'}
              </button>
            </section>
          </aside>
        </div>
      </div>

      <div className={`print-area${compact ? ` print-compact${columns === 2 ? ' pc-cols-2' : ''}` : ''}${examples ? '' : ' no-examples'}`}>
        {sections.length === 0 ? (
          <p className="no-print text-center text-muted">
            {plan.length ? 'Nothing to print from the chosen sources for this selection.' : 'Pick at least one topic or lesson to preview it here.'}
          </p>
        ) : compact ? (
          <>
            <header className="pc-head">
              <h1>{title} — revision notes</h1>
              <p>
                {sourceLine} · {plan.flatMap((g) => g.topics.map((c) => c.topic.code)).join(', ')} · {today}
              </p>
            </header>
            {sections.map((s) => (
              <div key={s.key} className="pc-section">
                {s.label && <p className="pc-pack">{s.label}</p>}
                {s.body}
              </div>
            ))}
          </>
        ) : (
          <>
            <header className="mb-8">
              <h1 className="text-3xl font-semibold text-ink">{title}</h1>
              <p className="text-ink-2">{plan.flatMap((g) => g.topics.map((c) => `${c.topic.code} ${c.topic.title}`)).join(' · ')}</p>
            </header>
            {sections.map((s) => (
              <Fragment key={s.key}>{s.body}</Fragment>
            ))}
          </>
        )}
        {loading && sections.length > 0 && <p className="no-print text-center text-muted">Loading notes…</p>}
      </div>
    </Page>
  );
}
