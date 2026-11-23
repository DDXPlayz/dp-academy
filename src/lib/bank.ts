import type { ExamQuestion } from '../content';
import type { ExamDifficulty, ExamSource } from '../content/schema';

/*
 * Question-bank filtering. Questions are split into two collections:
 * "general" (original questions written for DP Academy) and "past" (past-paper
 * and mock questions, which exist only in a local copy). Every filter is
 * optional; an empty list means "any".
 */

export type BankCollection = 'general' | 'past';

export interface BankFilters {
  collection: BankCollection;
  subject: string | null;
  papers: string[];
  difficulties: ExamDifficulty[];
  topics: string[];
  sources: ExamSource[];
  level: 'SL' | 'HL';
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
  sources: [],
  level: 'HL',
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
  if (f.sources.length && !f.sources.includes(q.source)) return false;
  // SL students don't see HL-only questions; HL students see everything.
  if (f.level === 'SL' && q.level === 'HL') return false;
  return true;
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
    sources: list('src').filter((s): s is ExamSource => ['original', 'past-paper', 'mock'].includes(s)),
    level: p.get('l') === 'SL' ? 'SL' : 'HL',
  };
}

export function filtersToParams(f: BankFilters): URLSearchParams {
  const p = new URLSearchParams();
  if (f.collection !== 'general') p.set('c', f.collection);
  if (f.subject) p.set('s', f.subject);
  if (f.papers.length) p.set('p', f.papers.join(','));
  if (f.difficulties.length) p.set('d', f.difficulties.join(','));
  if (f.topics.length) p.set('t', f.topics.join(','));
  if (f.sources.length) p.set('src', f.sources.join(','));
  if (f.level !== 'HL') p.set('l', f.level);
  return p;
}

export const toggle = <T,>(list: T[], v: T): T[] => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
