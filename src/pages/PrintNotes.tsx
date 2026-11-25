import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getQuestion, subjects, type Lesson, type Topic } from '../content';
import { Page, PageHeader } from '../components/AppShell';
import { Icon } from '../components/Icon';
import { Inline, Markdown } from '../components/Markdown';
import { NOTE_SOURCES, loadTopicNotes, sourceName, useNotesIndex, type NoteSource, type ReferenceNote } from '../lib/referenceNotes';

/*
 * Print notes: pick topics and what to include (the app's lessons, the Save My
 * Exams notes, the IITian Academy notes), then print them in a clean layout
 * (worked examples and answers expanded, app chrome hidden, each lesson and each
 * set of reference notes starting on a new page).
 *
 * /print?s=<subject>&t=<topic key>,<topic key>&src=lessons,sme,iitian preselects.
 */

type Part = 'lessons' | NoteSource;
const isHl = (title: string) => /\((A?HL)( only)?\)/i.test(title);

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
  const [picked, setPicked] = useState<Set<string>>(() => new Set((params.get('t') ?? '').split(',').filter(Boolean)));
  const [parts, setParts] = useState<Set<Part>>(() => {
    const src = (params.get('src') ?? 'lessons').split(',').filter((p): p is Part => p === 'lessons' || p === 'sme' || p === 'iitian');
    return new Set<Part>(src.length ? src : ['lessons']);
  });
  const [hl, setHl] = useState(true);
  const [preparing, setPreparing] = useState(false);
  const index = useNotesIndex();

  const chosen = useMemo(() => subject.topics.filter((t) => picked.has(t.key) && (hl || !t.hl)), [subject, picked, hl]);
  const sources = index ? NOTE_SOURCES.map((s) => s.id).filter((s) => parts.has(s)) : [];
  const { notes, loading } = useReferenceNotes(chosen, sources);
  const notesFor = (t: Topic, s: NoteSource) => (notes[`${t.key}|${s}`] ?? []).filter((n) => hl || !isHl(n.title));

  const lessonCount = parts.has('lessons') ? chosen.reduce((n, t) => n + t.lessons.filter((l) => hl || !l.meta.hl).length, 0) : 0;
  const noteCount = chosen.reduce((n, t) => n + sources.reduce((m, s) => m + notesFor(t, s).length, 0), 0);
  const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? '' : 's'}`;
  const summary = [lessonCount ? plural(lessonCount, 'lesson') : '', noteCount ? plural(noteCount, 'note') : ''].filter(Boolean).join(' + ');
  const togglePart = (p: Part) =>
    setParts((prev) => {
      const n = new Set(prev);
      if (n.has(p)) n.delete(p);
      else n.add(p);
      return n;
    });
  const partOptions: { id: Part; label: string; hint: string }[] = [
    { id: 'lessons', label: 'DP Academy lessons', hint: 'the app’s own lessons' },
    ...(index ? NOTE_SOURCES.map((s) => ({ id: s.id as Part, label: `${s.name} notes`, hint: 'original notes and diagrams' })) : []),
  ];

  const toggle = (keys: string[], on: boolean) =>
    setPicked((p) => {
      const n = new Set(p);
      for (const k of keys) (on ? n.add(k) : n.delete(k));
      return n;
    });

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
    setPreparing(false);
    setTimeout(() => window.print(), 50);
  };

  return (
    <Page>
      <div className="no-print">
        <PageHeader eyebrow="Notes" title="Print notes">
          Choose topics and which notes to include, preview them below, then print or save as PDF. Each lesson and each set of notes starts on a
          new page.
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
          <button type="button" className="btn-primary ml-auto" disabled={!summary || loading || preparing} onClick={print}>
            <Icon name="download" size={16} /> {preparing ? 'Loading diagrams…' : loading ? 'Loading notes…' : `Print ${summary}`}
          </button>
        </div>

        <fieldset className="card mb-4 flex flex-wrap items-center gap-x-6 gap-y-2 p-4">
          <legend className="sr-only">Include</legend>
          <span className="text-sm font-medium text-ink">Include</span>
          {partOptions.map((o) => (
            <label key={o.id} className="inline-flex items-center gap-2 text-sm text-ink-2">
              <input type="checkbox" checked={parts.has(o.id)} onChange={() => togglePart(o.id)} />
              <span>
                {o.label} <span className="text-xs text-muted">({o.hint})</span>
              </span>
            </label>
          ))}
        </fieldset>

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
                    .map((t) => {
                      const extra = NOTE_SOURCES.filter((s) => index?.topics[t.key]?.[s.id]?.length).map((s) => s.short);
                      return (
                        <label key={t.key} className="inline-flex items-center gap-2 text-sm text-ink-2">
                          <input type="checkbox" checked={picked.has(t.key)} onChange={() => toggle([t.key], !picked.has(t.key))} />
                          <span className="tabular-nums text-muted">{t.code}</span> {t.title}
                          <span className="text-xs text-muted">
                            ({t.lessons.length}
                            {extra.length ? ` · ${extra.join(', ')}` : ''})
                          </span>
                        </label>
                      );
                    })}
                </div>
              </fieldset>
            );
          })}
        </div>
      </div>

      <div className="print-area">
        {chosen.length === 0 || parts.size === 0 ? (
          <p className="no-print text-center text-muted">Pick at least one topic and one kind of notes to preview them here.</p>
        ) : (
          <>
            <header className="mb-8">
              <h1 className="text-3xl font-semibold text-ink">{subject.title}</h1>
              <p className="text-ink-2">{chosen.map((t) => `${t.code} ${t.title}`).join(' · ')}</p>
            </header>
            {chosen.flatMap((t) => [
              ...(parts.has('lessons') ? t.lessons.filter((l) => hl || !l.meta.hl).map((l) => <PrintedLesson key={l.key} lesson={l} topic={t} />) : []),
              ...sources.map((s) => {
                const list = notesFor(t, s);
                return list.length ? <PrintedReference key={`${t.key}|${s}`} topic={t} source={s} notes={list} /> : null;
              }),
            ])}
            {loading && <p className="no-print text-center text-muted">Loading notes…</p>}
          </>
        )}
      </div>
    </Page>
  );
}
