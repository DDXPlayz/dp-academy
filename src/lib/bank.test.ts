import { describe, expect, it } from 'vitest';
import type { ExamQuestion } from '../content';
import { DEFAULT_FILTERS, facetCounts, filterBank, filtersFromParams, filtersToParams, sourceLabel, type BankFilters } from './bank';

let n = 0;
function q(p: Partial<ExamQuestion>): ExamQuestion {
  n++;
  return {
    id: `q${n}`,
    key: `k${n}`,
    subjectId: 'physics',
    topicKey: 'physics/a1-kinematics',
    paper: '2',
    difficulty: 'medium',
    source: 'original',
    marks: 3,
    prompt: 'p',
    markscheme: 'm',
    ...p,
  } as ExamQuestion;
}

const POOL = [
  q({ id: 'easy-2', difficulty: 'easy' }),
  q({ id: 'hard-1a', paper: '1A', difficulty: 'hard' }),
  q({ id: 'med-1b', paper: '1B' }),
  q({ id: 'hl-hard', difficulty: 'hard', level: 'HL', topicKey: 'physics/a5-relativity' }),
  q({ id: 'chem', subjectId: 'chemistry', topicKey: 'chemistry/s1-4-the-mole', paper: '1A', difficulty: 'easy' }),
  q({ id: 'math-3', subjectId: 'math-aa', topicKey: 'math-aa/5-18-differential-equations', paper: '3', difficulty: 'hard', level: 'HL' }),
  q({ id: 'pp', source: 'past-paper', session: 'May 2024 TZ1', number: '3(b)', difficulty: 'hard' }),
  q({ id: 'mock', source: 'mock', difficulty: 'easy', topicKey: null }),
];

const F = (patch: Partial<BankFilters>): BankFilters => ({ ...DEFAULT_FILTERS, ...patch });
const ids = (list: ExamQuestion[]) => list.map((x) => x.id);

describe('filterBank', () => {
  it('splits general (original) from past papers (past-paper + mock)', () => {
    expect(ids(filterBank(POOL, F({})))).not.toContain('pp');
    expect(ids(filterBank(POOL, F({ collection: 'past' })))).toEqual(['mock', 'pp']);
  });

  it('combines several difficulties (medium + hard) with OR, and other facets with AND', () => {
    const out = filterBank(POOL, F({ subject: 'physics', difficulties: ['medium', 'hard'] }));
    expect(ids(out).sort()).toEqual(['hard-1a', 'hl-hard', 'med-1b']);
    expect(ids(filterBank(POOL, F({ subject: 'physics', difficulties: ['hard'], papers: ['2'] })))).toEqual(['hl-hard']);
  });

  it('filters by paper, topic and source', () => {
    expect(ids(filterBank(POOL, F({ papers: ['1A'] })))).toEqual(['chem', 'hard-1a']);
    expect(ids(filterBank(POOL, F({ topics: ['physics/a5-relativity'] })))).toEqual(['hl-hard']);
    expect(ids(filterBank(POOL, F({ collection: 'past', sources: ['mock'] })))).toEqual(['mock']);
  });

  it('excludes unplaced questions when a topic filter is set', () => {
    expect(ids(filterBank(POOL, F({ collection: 'past', topics: ['physics/a1-kinematics'] })))).toEqual(['pp']);
  });

  it('hides HL-only questions at SL and shows them at HL (the default)', () => {
    expect(ids(filterBank(POOL, F({ level: 'SL' })))).not.toContain('hl-hard');
    expect(ids(filterBank(POOL, F({})))).toContain('hl-hard');
  });

  it('orders by paper, then easy → hard', () => {
    const out = filterBank(POOL, F({ subject: 'physics' }));
    expect(ids(out)).toEqual(['hard-1a', 'med-1b', 'easy-2', 'hl-hard']);
  });
});

describe('facetCounts', () => {
  it('counts each value while ignoring that facet’s own selection', () => {
    const counts = facetCounts(POOL, F({ subject: 'physics', difficulties: ['hard'] }), 'difficulty');
    expect(counts).toEqual({ easy: 1, hard: 2, medium: 1 });
    expect(facetCounts(POOL, F({ subject: 'physics', difficulties: ['hard'] }), 'paper')).toEqual({ '1A': 1, '2': 1 });
  });
});

describe('labels and URL round-trip', () => {
  it('labels every source', () => {
    expect(sourceLabel(POOL[0])).toBe('Original · DP Academy');
    expect(sourceLabel(POOL[6])).toBe('Past paper · May 2024 TZ1 · Paper 2 · Q3(b)');
    expect(sourceLabel(POOL[7])).toBe('Mock · Paper 2');
  });

  it('round-trips filters through URL params and ignores junk values', () => {
    const f = F({ collection: 'past', subject: 'chemistry', papers: ['1A', '2'], difficulties: ['medium', 'hard'], sources: ['mock'], level: 'SL' });
    expect(filtersFromParams(filtersToParams(f))).toEqual(f);
    expect(filtersFromParams(new URLSearchParams('d=hard,nonsense&src=pirated'))).toEqual(F({ difficulties: ['hard'] }));
    expect(filtersToParams(DEFAULT_FILTERS).toString()).toBe('');
  });
});
