/*
 * Pure parsing core of the past-paper importer. It turns the extracted text of
 * an exam paper (and its markscheme) into question-bank rows. No file access
 * happens here, so everything is unit-tested on small invented fixtures.
 *
 * Imported rows are written to the git-ignored resources/question-bank/
 * folder by scripts/import-papers.ts; they are never committed.
 */
import type { ImportedExamQuestion } from '../src/content/schema';

export interface PaperMeta {
  subject: 'physics' | 'chemistry' | 'math-aa';
  paper: string;
  level: 'SL' | 'HL';
  timezone: string | null;
  markscheme: boolean;
}

const SUBJECT_NAMES: [RegExp, PaperMeta['subject']][] = [
  [/^physics/i, 'physics'],
  [/^chemistry/i, 'chemistry'],
  [/^math(ematics|s)?[_ ]+(analysis[_ ]+and[_ ]+approaches|aa)/i, 'math-aa'],
];

/**
 * Reads IB-style file names such as "Physics_paper_1A_TZ2_HL.pdf" or
 * "Mathematics_analysis_and_approaches_paper_2_TZ1_SL_markscheme.pdf".
 * Returns null for other subjects, translations and unrecognised names.
 */
export function parsePaperFilename(name: string): PaperMeta | null {
  const base = name.replace(/\\/g, '/').split('/').pop()!.replace(/\.pdf$/i, '');
  if (/_(spanish|french|german|chinese|japanese)$/i.test(base.replace(/_markscheme$/i, ''))) return null;
  const subject = SUBJECT_NAMES.find(([re]) => re.test(base))?.[1];
  if (!subject) return null;
  const paper = /paper[_ ]?(1A|1B|1|2|3)(?=[_ ]|$)/i.exec(base)?.[1]?.toUpperCase();
  const level = /(?:^|_)(HL|SL)(?:_|$)/i.exec(base)?.[1]?.toUpperCase() as 'SL' | 'HL' | undefined;
  if (!paper || !level) return null;
  return {
    subject,
    paper,
    level,
    timezone: /(?:^|_)(TZ\d)(?:_|$)/i.exec(base)?.[1]?.toUpperCase() ?? null,
    markscheme: /markscheme|mark[_ ]scheme/i.test(base),
  };
}

/** Removes running headers, page furniture and blank-answer lines from extracted text. */
export function cleanText(text: string): string {
  return text
    .split(/\r?\n/)
    .map((l) => l.replace(/\s+$/, ''))
    .filter(
      (l) =>
        !/^\s*[–-]\s*\d+\s*[–-]\s*$/.test(l) && // "– 3 –"
        !/^\s*[MN]\d{2}\/\d\/[A-Z]+\/[A-Z0-9]+\/[A-Z]+(\/[A-Z0-9]+)*\s*$/.test(l) && // "M24/4/PHYSI/HP2/ENG/TZ1/XX"
        !/^\s*(turn over|blank page|please do not write on this page\.?|answers written on this page will not be marked\.?)\s*$/i.test(l) &&
        !/^\s*\.{8,}\s*$/.test(l) && // answer lines
        !/international baccalaureate|©/i.test(l),
    )
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export interface RawQuestion {
  number: string;
  text: string;
  marks: number;
}

/**
 * Splits paper text into top-level questions. A question starts at a line
 * beginning "N." (or "N" alone) where N is the next expected number, which
 * stops stray numbers inside a question from splitting it.
 */
export function splitQuestions(text: string): RawQuestion[] {
  const lines = text.split('\n');
  const out: { number: number; lines: string[] }[] = [];
  let expected = 1;
  for (const line of lines) {
    const m = /^\s*(\d{1,2})\.?(?:\s+(.*))?$/.exec(line);
    if (m && Number(m[1]) === expected && (m[2] !== undefined || /^\s*\d{1,2}\.\s*$/.test(line) || /^\s*\d{1,2}\s*$/.test(line))) {
      out.push({ number: expected, lines: m[2] ? [m[2]] : [] });
      expected++;
      continue;
    }
    out[out.length - 1]?.lines.push(line);
  }
  return out.map((q) => {
    const body = q.lines.join('\n').trim();
    return { number: String(q.number), text: body, marks: sumMarks(body) };
  });
}

/** Sums "[2]" style mark allocations; "[Maximum mark: 9]" wins when present. */
export function sumMarks(text: string): number {
  const max = /\[\s*maximum mark:?\s*(\d+)\s*\]/i.exec(text);
  if (max) return Number(max[1]);
  return [...text.matchAll(/\[\s*(\d{1,2})\s*\]/g)].reduce((s, m) => s + Number(m[1]), 0);
}

/** Splits a multiple-choice question into its stem and options A–D. */
export function parseMcq(text: string): { stem: string; options: string[] } | null {
  const flat = text.replace(/\n+/g, '\n');
  const marks = [...flat.matchAll(/(?:^|\n|\s)([A-D])\.\s+/g)];
  // Need A, B, C, D in order.
  const seq: RegExpMatchArray[] = [];
  for (const m of marks) if (m[1] === 'ABCD'[seq.length]) seq.push(m);
  if (seq.length !== 4) return null;
  const stem = flat.slice(0, seq[0].index!).trim();
  const options = seq.map((m, i) => flat.slice(m.index! + m[0].length, i < 3 ? seq[i + 1].index! : undefined).replace(/\s+/g, ' ').trim());
  if (!stem || options.some((o) => !o)) return null;
  return { stem, options };
}

/** Reads a multiple-choice key ("1. B  2. D …" or a two-column table) into question → option index. */
export function parseMcqKey(text: string): Record<string, number> {
  const key: Record<string, number> = {};
  for (const m of text.matchAll(/(?:^|\s)(\d{1,2})\.?\s+([A-D])(?=\s|$)/g)) key[m[1]] = 'ABCD'.indexOf(m[2]);
  return key;
}

/** Splits a written markscheme by question number, like splitQuestions. */
export function splitMarkscheme(text: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const q of splitQuestions(text)) out[q.number] = q.text;
  return out;
}

export interface TopicKeywords {
  id: string;
  code: string;
  hl: boolean;
  keywords: string[];
}

const STOP = new Set(
  'the and of a an in on to for with by from as at or its their into using use is are be how what why model models reactions reaction energy change'.split(' '),
);

/** Builds keyword lists from topic titles and summaries in subject.json. */
export function topicKeywords(topics: { id: string; code: string; title: string; summary: string; hl?: boolean }[]): TopicKeywords[] {
  return topics.map((t) => ({
    id: t.id,
    code: t.code,
    hl: !!t.hl,
    keywords: [
      ...new Set(
        `${t.title} ${t.summary}`
          .toLowerCase()
          .replace(/[’']s\b/g, '')
          .split(/[^a-z0-9]+/)
          .filter((w) => w.length > 3 && !STOP.has(w))
          .map(stem),
      ),
    ],
  }));
}

const stem = (w: string) => w.replace(/(ies|es|s|ing|ed)$/, '');

/** Best-matching topic by keyword hits; null when the evidence is too thin. */
export function classifyTopic(text: string, topics: TopicKeywords[]): { id: string | null; confidence: number } {
  const words = text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean).map(stem);
  const bag = new Map<string, number>();
  for (const w of words) bag.set(w, (bag.get(w) ?? 0) + 1);
  const scored = topics
    .map((t) => ({ id: t.id, score: t.keywords.reduce((s, k) => s + Math.min(bag.get(k) ?? 0, 3), 0) }))
    .sort((a, b) => b.score - a.score);
  const [best, next] = scored;
  if (!best || best.score < 2) return { id: null, confidence: 0 };
  const confidence = best.score / (best.score + (next?.score ?? 0));
  return { id: confidence >= 0.6 ? best.id : null, confidence };
}

/**
 * Rough difficulty estimate: IB papers get harder towards the end, and
 * high-mark questions are usually harder. Imported questions are flagged
 * for review so the estimate can be corrected by hand.
 */
export function estimateDifficulty(marks: number, position: number, total: number, paper: string): 'easy' | 'medium' | 'hard' {
  const pos = total > 1 ? position / (total - 1) : 0;
  if (paper === '1A') return pos < 0.34 ? 'easy' : pos < 0.75 ? 'medium' : 'hard';
  const score = pos * 0.6 + Math.min(marks / 12, 1) * 0.4;
  return score < 0.33 ? 'easy' : score < 0.66 ? 'medium' : 'hard';
}

export interface BuildInput {
  meta: PaperMeta;
  session: string;
  paperText: string;
  markschemeText: string | null;
  topics: TopicKeywords[];
  idPrefix: string;
  sourceFile?: string;
}

export type ImportedRow = ImportedExamQuestion;

/** Turns one paper (and optional markscheme) into question-bank rows. */
export function buildQuestions({ meta, session, paperText, markschemeText, topics, idPrefix, sourceFile }: BuildInput): ImportedRow[] {
  const questions = splitQuestions(cleanText(paperText));
  const msClean = markschemeText ? cleanText(markschemeText) : '';
  const key = meta.paper === '1A' && msClean ? parseMcqKey(msClean) : {};
  const ms = meta.paper !== '1A' && msClean ? splitMarkscheme(msClean) : {};
  const eligible = topics.filter((t) => meta.level === 'HL' || !t.hl);

  return questions.map((raw, i) => {
    const mcq = meta.paper === '1A' ? parseMcq(raw.text) : null;
    const topic = classifyTopic(raw.text, eligible);
    const answer = mcq ? key[raw.number] : undefined;
    const marks = mcq ? 1 : raw.marks || 1;
    const markscheme = mcq
      ? answer !== undefined
        ? `Answer: **${'ABCD'[answer]}**`
        : 'Answer key not found in the markscheme.'
      : (ms[raw.number] ?? 'Markscheme not found for this question.');
    const row: ImportedRow = {
      id: `${idPrefix}-q${raw.number}`,
      subject: meta.subject,
      topic: topic.id,
      paper: meta.paper,
      level: meta.level,
      difficulty: estimateDifficulty(marks, i, questions.length, meta.paper),
      source: 'past-paper',
      session: [session, meta.timezone].filter(Boolean).join(' '),
      number: raw.number,
      marks,
      calculator: meta.subject === 'math-aa' ? meta.paper !== '1' : undefined,
      prompt: mcq ? mcq.stem : raw.text,
      markscheme,
      needsReview: !topic.id || (meta.paper === '1A' && (!mcq || answer === undefined)),
      sourceFile,
    };
    if (mcq && answer !== undefined) {
      row.options = mcq.options;
      row.answer = answer;
    }
    return row;
  });
}
