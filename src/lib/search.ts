import MiniSearch from 'minisearch';
import { allFlashcards, allQuestions, getSubject, subjects, topicOf } from '../content';

/*
 * One full-text index over everything a student might look for. Built lazily
 * on first search so it costs nothing on page load.
 */

export type ResultKind = 'subject' | 'unit' | 'topic' | 'lesson' | 'formula' | 'definition' | 'question' | 'flashcard';

export interface SearchDoc {
  id: string;
  kind: ResultKind;
  title: string;
  text: string;
  subject: string;
  context: string;
  href: string;
}

/** Strips Markdown and LaTeX noise so the index holds readable words. */
export function plain(md: string): string {
  return md
    .replace(/```[a-z]*\n?/g, ' ')
    .replace(/\$\$?([^$]*)\$\$?/g, ' $1 ')
    .replace(/\\[a-zA-Z]+/g, ' ')
    .replace(/[#*_>`{}[\]()|^\\]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildDocs(): SearchDoc[] {
  const docs: SearchDoc[] = [];
  for (const s of subjects) {
    docs.push({ id: `s:${s.id}`, kind: 'subject', title: s.title, text: s.description, subject: s.short, context: s.group, href: s.href });
    for (const u of s.units) {
      docs.push({
        id: `u:${s.id}/${u.id}`,
        kind: 'unit',
        title: `${u.code} ${u.title}`,
        text: u.topics.map((t) => t.title).join(' '),
        subject: s.short,
        context: s.title,
        href: `${s.href}#${u.id}`,
      });
      for (const t of u.topics) {
        docs.push({ id: `t:${t.key}`, kind: 'topic', title: `${t.code} ${t.title}`, text: t.summary, subject: s.short, context: u.title, href: t.href });
        for (const l of t.lessons) {
          docs.push({
            id: `l:${l.key}`,
            kind: 'lesson',
            title: l.meta.title,
            text: `${l.meta.summary} ${l.meta.objectives.join(' ')} ${plain(l.body)}`,
            subject: s.short,
            context: t.title,
            href: l.href,
          });
          l.meta.formulas.forEach((f, i) =>
            docs.push({ id: `f:${l.key}:${i}`, kind: 'formula', title: f.name, text: `${f.where ?? ''} ${plain(f.latex)}`, subject: s.short, context: l.meta.title, href: `${l.href}#formulas` }),
          );
          l.meta.definitions.forEach((d, i) =>
            docs.push({ id: `d:${l.key}:${i}`, kind: 'definition', title: d.term, text: d.definition, subject: s.short, context: l.meta.title, href: `${l.href}#definitions` }),
          );
        }
      }
    }
  }
  for (const q of allQuestions()) {
    const t = topicOf(q);
    docs.push({
      id: `q:${q.key}`,
      kind: 'question',
      title: plain(q.prompt).slice(0, 90),
      text: `${plain(q.prompt)} ${q.concept}`,
      subject: getSubject(q.subjectId)!.short,
      context: t.title,
      href: `/practice?topic=${encodeURIComponent(t.key)}&q=${encodeURIComponent(q.id)}`,
    });
  }
  for (const c of allFlashcards()) {
    const t = topicOf(c);
    docs.push({
      id: `c:${c.key}`,
      kind: 'flashcard',
      title: plain(c.front),
      text: plain(c.back),
      subject: getSubject(c.subjectId)!.short,
      context: t.title,
      href: `/revise/flashcards?topic=${encodeURIComponent(t.key)}`,
    });
  }
  return docs;
}

let index: MiniSearch<SearchDoc> | null = null;

function getIndex() {
  if (!index) {
    index = new MiniSearch<SearchDoc>({
      fields: ['title', 'text', 'context'],
      storeFields: ['kind', 'title', 'subject', 'context', 'href'],
      searchOptions: { boost: { title: 4, context: 1.5 }, prefix: true, fuzzy: 0.2 },
    });
    index.addAll(buildDocs());
  }
  return index;
}

/** Adds documents to the index (used for lessons that only exist in local development). */
export function addDocs(docs: SearchDoc[]) {
  const idx = getIndex();
  idx.addAll(docs.filter((d) => !idx.has(d.id)));
}

export type SearchHit = Pick<SearchDoc, 'id' | 'kind' | 'title' | 'subject' | 'context' | 'href'>;

const KIND_RANK: Record<ResultKind, number> = {
  subject: 0, unit: 1, topic: 2, lesson: 3, definition: 4, formula: 5, flashcard: 6, question: 7,
};

/** Results grouped by subject, best group first. */
export function search(query: string, limit = 30): { subject: string; hits: SearchHit[] }[] {
  const q = query.trim();
  if (q.length < 2) return [];
  const raw = getIndex().search(q, { combineWith: 'AND' });
  const results = (raw.length ? raw : getIndex().search(q)).slice(0, limit) as unknown as (SearchHit & { score: number })[];
  const groups = new Map<string, (SearchHit & { score: number })[]>();
  for (const r of results) groups.set(r.subject, [...(groups.get(r.subject) ?? []), r]);
  return [...groups.entries()]
    .sort((a, b) => b[1][0].score - a[1][0].score)
    .map(([subject, hits]) => ({
      subject,
      hits: hits.sort((a, b) => KIND_RANK[a.kind] - KIND_RANK[b.kind] || b.score - a.score),
    }));
}
