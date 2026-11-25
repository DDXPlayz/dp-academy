import type { ExamQuestion } from '../content';
import type { ExamDifficulty, ExamSource } from '../content/schema';

/*
 * Question-bank filtering. Questions are split into two collections:
 * "general" (original questions written for DP Academy) and "past" (past-paper
 * and mock questions, which exist only in a local copy). Every filter is
 * optional; an empty list means "any".
 */

export type BankCollection = 'general' | 'past';
/** Your own self-marked results: not tried yet, needs another go (partly/missed), or got it. */
export type BankStatus = 'all' | 'new' | 'review' | 'done';
export const STATUSES: BankStatus[] = ['all', 'new', 'review', 'done'];

export interface BankFilters {
  collection: BankCollection;
  subject: string | null;
  papers: string[];
  difficulties: ExamDifficulty[];
  topics: string[];
  /** One guide understanding (e.g. "A.1.4") inside the chosen topic, or null for all. */
  subtopic: string | null;
  sources: ExamSource[];
  level: 'SL' | 'HL';
  status: BankStatus;
}

export const DIFFICULTIES: ExamDifficulty[] = ['easy', 'medium', 'hard'];
export const COLLECTION_SOURCES: Record<BankCollection, ExamSource[]> = {
  general: ['original'],
  past: ['past-paper', 'mock'],
};

export const DEFAULT_FILTERS: BankFilters = {
  collection: 'general',
  subject: null,
  papers: [],
  difficulties: [],
  topics: [],
  subtopic: null,
  sources: [],
  level: 'HL',
  status: 'all',
};

export function collectionOf(q: Pick<ExamQuestion, 'source'>): BankCollection {
  return q.source === 'original' ? 'general' : 'past';
}

export function matches(q: ExamQuestion, f: BankFilters): boolean {
  if (collectionOf(q) !== f.collection) return false;
  if (f.subject && q.subjectId !== f.subject) return false;
  if (f.papers.length && !f.papers.includes(q.paper)) return false;
  if (f.difficulties.length && !f.difficulties.includes(q.difficulty)) return false;
  if (f.topics.length && (!q.topicKey || !f.topics.includes(q.topicKey))) return false;
  if (f.subtopic && q.subtopic !== f.subtopic) return false;
  if (f.sources.length && !f.sources.includes(q.source)) return false;
  // SL students don't see HL-only questions; HL students see everything.
  if (f.level === 'SL' && q.level === 'HL') return false;
  return true;
}

/** Applies the status filter using the student's self-marked results. */
export function byStatus<Q extends { key: string }>(questions: Q[], status: BankStatus, results: Record<string, { r: string }>): Q[] {
  if (status === 'all') return questions;
  return questions.filter((q) => {
    const r = results[q.key]?.r;
    if (status === 'new') return !r;
    if (status === 'done') return r === 'got';
    return r === 'partial' || r === 'missed';
  });
}

/** Deterministic shuffle so "Show more" pages stay stable for one seed. */
export function shuffled<T>(items: T[], seed: number): T[] {
  const out = [...items];
  let x = seed || 1;
  const rand = () => {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return (x >>> 0) / 4294967296;
  };
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const PAPER_ORDER = ['1', '1A', '1B', '2', '3'];
const DIFF_ORDER: Record<ExamDifficulty, number> = { easy: 0, medium: 1, hard: 2 };

/** Filters, then orders by paper, then difficulty (easy first), keeping curriculum order otherwise. */
export function filterBank(questions: ExamQuestion[], f: BankFilters): ExamQuestion[] {
  return questions
    .map((q, i) => ({ q, i }))
    .filter(({ q }) => matches(q, f))
    .sort(
      (a, b) =>
        PAPER_ORDER.indexOf(a.q.paper) - PAPER_ORDER.indexOf(b.q.paper) ||
        DIFF_ORDER[a.q.difficulty] - DIFF_ORDER[b.q.difficulty] ||
        a.i - b.i,
    )
    .map(({ q }) => q);
}

/** The guide understandings tested in a topic (by subtopic code, in guide order), with how many questions each has and how many you marked for review. */
export function conceptsIn(questions: ExamQuestion[], topicKey: string, results: Record<string, { r: string }>) {
  const out = new Map<string, { code: string; concept: string; total: number; review: number }>();
  for (const q of questions) {
    if (q.topicKey !== topicKey || !q.subtopic || q.subtopic.split('.').length < 3) continue;
    const c = out.get(q.subtopic) ?? { code: q.subtopic, concept: q.concept ?? '', total: 0, review: 0 };
    c.total++;
    if (!c.concept && q.concept) c.concept = q.concept;
    const r = results[q.key]?.r;
    if (r === 'partial' || r === 'missed') c.review++;
    out.set(q.subtopic, c);
  }
  const num = (code: string) => code.split('.').map((x) => parseInt(x.replace(/\D/g, ''), 10) || 0);
  return [...out.values()].sort((a, b) => {
    const x = num(a.code), y = num(b.code);
    for (let i = 0; i < Math.max(x.length, y.length); i++) if ((x[i] ?? 0) !== (y[i] ?? 0)) return (x[i] ?? 0) - (y[i] ?? 0);
    return a.code.localeCompare(b.code);
  });
}

/** Counts per value of one facet under the other filters, for the "(n)" next to each chip. */
export function facetCounts<K extends 'paper' | 'difficulty' | 'source'>(
  questions: ExamQuestion[],
  f: BankFilters,
  facet: K,
): Record<string, number> {
  const relaxed: BankFilters = {
    ...f,
    papers: facet === 'paper' ? [] : f.papers,
    difficulties: facet === 'difficulty' ? [] : f.difficulties,
    sources: facet === 'source' ? [] : f.sources,
  };
  const out: Record<string, number> = {};
  for (const q of questions) if (matches(q, relaxed)) out[q[facet]] = (out[q[facet]] ?? 0) + 1;
  return out;
}

/** "Past paper · May 2024 TZ2 · Paper 2 · Q3(b)" or "Original · DP Academy". */
export function sourceLabel(q: Pick<ExamQuestion, 'source' | 'session' | 'paper' | 'number'>): string {
  if (q.source === 'original') return 'Original · DP Academy';
  const parts = [q.source === 'mock' ? 'Mock' : 'Past paper'];
  if (q.session) parts.push(q.session);
  parts.push(`Paper ${q.paper}`);
  if (q.number) parts.push(`Q${q.number}`);
  return parts.join(' · ');
}

/** Filters <-> URL search params, so a filtered view can be bookmarked or shared. */
export function filtersFromParams(p: URLSearchParams): BankFilters {
  const list = (k: string) => (p.get(k) ?? '').split(',').filter(Boolean);
  return {
    collection: p.get('c') === 'past' ? 'past' : 'general',
    subject: p.get('s') || null,
    papers: list('p'),
    difficulties: list('d').filter((d): d is ExamDifficulty => (DIFFICULTIES as string[]).includes(d)),
    topics: list('t'),
    subtopic: p.get('u') || null,
    sources: list('src').filter((s): s is ExamSource => ['original', 'past-paper', 'mock'].includes(s)),
    level: p.get('l') === 'SL' ? 'SL' : 'HL',
    status: (STATUSES as string[]).includes(p.get('st') ?? '') ? (p.get('st') as BankStatus) : 'all',
  };
}

export function filtersToParams(f: BankFilters): URLSearchParams {
  const p = new URLSearchParams();
  if (f.collection !== 'general') p.set('c', f.collection);
  if (f.subject) p.set('s', f.subject);
  if (f.papers.length) p.set('p', f.papers.join(','));
  if (f.difficulties.length) p.set('d', f.difficulties.join(','));
  if (f.topics.length) p.set('t', f.topics.join(','));
  if (f.subtopic) p.set('u', f.subtopic);
  if (f.sources.length) p.set('src', f.sources.join(','));
  if (f.level !== 'HL') p.set('l', f.level);
  if (f.status !== 'all') p.set('st', f.status);
  return p;
}

export const toggle = <T,>(list: T[], v: T): T[] => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
