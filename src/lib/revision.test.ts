import { describe, expect, it } from 'vitest';
import type { Flashcard, Lesson, Subject, Topic } from '../content';
import type { CardKind } from '../content/schema';
import { CARD_KINDS, CARD_KIND_IDS, flashcardSchema } from '../content/schema';
import {
  EXAM_SIZE,
  KIND_GROUPS,
  buildDeck,
  cardKind,
  filterByKind,
  isStruggling,
  kindCounts,
  kindGroupOf,
  lessonReviewCards,
  modeCounts,
  selectCards,
  sessionFromParams,
  sessionToParams,
  shuffled,
  topicsInScope,
  weightedSample,
  type SelectionContext,
} from './revision';
import type { CardState } from './srs';

const ON = '2026-11-25';

/** Deterministic RNG (mulberry32) so random selections are testable. */
function rng(seed = 1) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function card(topicKey: string, id: string, kind?: CardKind): Flashcard {
  return { id, key: `${topicKey}/${id}`, topicKey, subjectId: topicKey.split('/')[0], front: id, back: id, kind };
}

function lesson(topicKey: string, slug: string, meta: Partial<Lesson['meta']>): Lesson {
  return {
    key: `${topicKey}/${slug}`,
    slug,
    order: 1,
    subjectId: topicKey.split('/')[0],
    topicKey,
    href: '',
    body: '',
    meta: { title: slug, summary: '', minutes: 5, difficulty: 1, hl: false, objectives: ['x'], prerequisites: [], formulas: [], definitions: [], mistakes: [], tips: [], related: [], ...meta },
  };
}

function topic(subjectId: string, unitId: string, id: string, flashcards: Flashcard[], lessons: Lesson[] = []): Topic {
  return { id, code: id, title: id, summary: '', hl: false, cbse: [], key: `${subjectId}/${id}`, subjectId, unitId, unitCode: unitId, href: '', lessons, questions: [], flashcards, exam: [] };
}

const kin = topic('physics', 'a', 'kin', [card('physics/kin', 'velocity', 'definition'), card('physics/kin', 'suvat', 'formula'), card('physics/kin', 'vt-graph', 'graph'), card('physics/kin', 'inertia')], [
  lesson('physics/kin', 'motion', {
    definitions: [{ term: 'Displacement', definition: 'Change in position.' }],
    formulas: [{ name: 'Velocity', latex: 'v = \\frac{s}{t}', where: 's: displacement' }, { name: 'Velocity', latex: 'v = u + at' }],
  }),
]);
const forces = topic('physics', 'a', 'forces', [card('physics/forces', 'newton-1', 'misconception'), card('physics/forces', 'n-unit', 'unit')]);
const waves = topic('physics', 'c', 'waves', [card('physics/waves', 'wave-eq', 'formula')]);
const mole = topic('chemistry', 's1', 'mole', [card('chemistry/mole', 'avogadro', 'definition'), card('chemistry/mole', 'combustion', 'reaction'), card('chemistry/mole', 'ie-trend', 'trend')]);

const subjects = [
  { id: 'physics', topics: [kin, forces, waves], units: [{ id: 'a', topics: [kin, forces] }, { id: 'c', topics: [waves] }] },
  { id: 'chemistry', topics: [mole], units: [{ id: 's1', topics: [mole] }] },
] as unknown as Subject[];

const keys = (cs: Flashcard[]) => cs.map((c) => c.key);
const st = (p: Partial<CardState>): CardState => ({ ease: 2.5, interval: 6, reps: 2, due: '2026-12-01', lapses: 0, ...p });

function ctx(p: Partial<SelectionContext> = {}): SelectionContext {
  return { states: {}, weakTopics: new Set(), learntTopics: new Set(), level: 'all', on: ON, rng: rng(), ...p };
}

describe('card kinds', () => {
  it('schema accepts the contract kinds and an absent kind, rejects others', () => {
    expect(CARD_KINDS.map((k) => k.id)).toEqual([...CARD_KIND_IDS]);
    expect(CARD_KIND_IDS).toHaveLength(14);
    for (const kind of CARD_KIND_IDS) expect(flashcardSchema.safeParse({ id: 'a', front: 'f', back: 'b', kind }).success).toBe(true);
    expect(flashcardSchema.safeParse({ id: 'a', front: 'f', back: 'b' }).success).toBe(true);
    expect(flashcardSchema.safeParse({ id: 'a', front: 'f', back: 'b', kind: 'trivia' }).success).toBe(false);
  });

  it('every kind belongs to exactly one group; no kind means concept', () => {
    for (const k of CARD_KIND_IDS) expect(KIND_GROUPS.filter((g) => g.kinds.includes(k))).toHaveLength(1);
    expect(cardKind({})).toBe('concept');
    expect(kindGroupOf('unit')).toBe('formula');
    expect(kindGroupOf('derivation')).toBe('method');
    expect(kindGroupOf('trend')).toBe('chemistry');
  });

  it('filters and counts by group', () => {
    const all = [...kin.flashcards, ...forces.flashcards];
    expect(keys(filterByKind(all, ['formula']))).toEqual(['physics/kin/suvat', 'physics/forces/n-unit']);
    expect(keys(filterByKind(all, ['concept']))).toEqual(['physics/kin/inertia']);
    expect(filterByKind(all, [])).toHaveLength(all.length);
    expect(kindCounts(all)).toMatchObject({ definition: 1, formula: 2, graph: 1, concept: 1, misconception: 1, method: 0, chemistry: 0 });
  });
});

describe('topicsInScope', () => {
  it('covers all subjects, a subject, a unit or a topic', () => {
    expect(topicsInScope(subjects, {}).map((t) => t.id)).toEqual(['kin', 'forces', 'waves', 'mole']);
    expect(topicsInScope(subjects, { subject: 'physics' }).map((t) => t.id)).toEqual(['kin', 'forces', 'waves']);
    expect(topicsInScope(subjects, { subject: 'physics', unit: 'a' }).map((t) => t.id)).toEqual(['kin', 'forces']);
    expect(topicsInScope(subjects, { subject: 'physics', unit: 'a', topic: 'forces' }).map((t) => t.id)).toEqual(['forces']);
    expect(topicsInScope(subjects, { subject: 'nope' })).toEqual([]);
  });
});

describe('isStruggling', () => {
  it('flags recent lapses and lowered ease, ignores old or healthy cards', () => {
    expect(isStruggling(undefined, ON)).toBe(false);
    expect(isStruggling(st({ ease: 2.5, interval: 6, due: '2026-11-28' }), ON)).toBe(false);
    expect(isStruggling(st({ ease: 2.3, lapses: 1, interval: 0, reps: 0, due: ON }), ON)).toBe(true); // "again" today
    expect(isStruggling(st({ ease: 2.35, interval: 1, reps: 1, due: '2026-11-21' }), ON)).toBe(true); // "hard" 5 days ago
    expect(isStruggling(st({ ease: 2.35, interval: 1, reps: 1, due: '2026-09-01' }), ON)).toBe(false); // too long ago
  });
});

describe('selectCards', () => {
  const pool = [...kin.flashcards, ...forces.flashcards, ...mole.flashcards];

  it('due: reviewed cards past due (oldest first), then unseen cards from learnt topics', () => {
    const states = {
      'physics/kin/velocity': st({ due: '2026-11-20' }),
      'physics/kin/suvat': st({ due: '2026-12-10' }),
      'physics/forces/newton-1': st({ due: '2026-11-01' }),
    };
    const c = ctx({ states, learntTopics: new Set(['chemistry/mole']) });
    expect(keys(selectCards(pool, 'due', c))).toEqual([
      'physics/forces/newton-1',
      'physics/kin/velocity',
      'chemistry/mole/avogadro',
      'chemistry/mole/combustion',
      'chemistry/mole/ie-trend',
    ]);
  });

  it('due: unseen cards always count when a single topic or unit is chosen', () => {
    expect(selectCards(kin.flashcards, 'due', ctx({ level: 'topic' }))).toHaveLength(4);
    expect(selectCards(kin.flashcards, 'due', ctx({ level: 'subject' }))).toHaveLength(0);
  });

  it('all: every card in order', () => {
    expect(keys(selectCards(pool, 'all', ctx()))).toEqual(keys(pool));
  });

  it('weak: struggling cards first (lowest ease), then cards from weak topics, no duplicates', () => {
    const states = {
      'physics/kin/suvat': st({ ease: 2.35, interval: 1, due: '2026-11-25' }),
      'chemistry/mole/avogadro': st({ ease: 1.9, lapses: 2, interval: 0, reps: 0, due: ON }),
      'physics/forces/n-unit': st({ ease: 2.1, interval: 1, due: '2026-11-25' }),
    };
    const c = ctx({ states, weakTopics: new Set(['physics/forces']) });
    expect(keys(selectCards(pool, 'weak', c))).toEqual(['chemistry/mole/avogadro', 'physics/forces/n-unit', 'physics/kin/suvat', 'physics/forces/newton-1']);
  });

  it('exam: capped random sample without duplicates, weighted to weak and unseen cards', () => {
    const big = Array.from({ length: 200 }, (_, i) => card(i < 100 ? 'physics/weak' : 'physics/known', `c${i}`));
    const states: Record<string, CardState> = {};
    for (const c of big.slice(100)) states[c.key] = st({ due: '2027-01-01' }); // seen, not due, not weak
    let weak = 0;
    for (let seed = 1; seed <= 20; seed++) {
      const deck = selectCards(big, 'exam', ctx({ states, weakTopics: new Set(['physics/weak']), rng: rng(seed) }));
      expect(deck).toHaveLength(EXAM_SIZE);
      expect(new Set(keys(deck)).size).toBe(EXAM_SIZE);
      weak += deck.filter((c) => c.topicKey === 'physics/weak').length;
    }
    expect(weak / (20 * EXAM_SIZE)).toBeGreaterThan(0.7);
    expect(selectCards(kin.flashcards, 'exam', ctx())).toHaveLength(4);
  });

  it('counts each mode for the builder', () => {
    const c = ctx({ learntTopics: new Set(['physics/kin']), weakTopics: new Set(['chemistry/mole']) });
    expect(modeCounts(pool, c)).toEqual({ due: 4, all: 9, weak: 3, exam: 9 });
  });
});

describe('buildDeck', () => {
  it('applies scope, kind and mode, and shuffles on request', () => {
    const topics = topicsInScope(subjects, { subject: 'physics' });
    const deck = buildDeck(topics, { mode: 'all', kinds: ['formula'], shuffle: false }, ctx());
    expect(keys(deck)).toEqual(['physics/kin/suvat', 'physics/forces/n-unit', 'physics/waves/wave-eq']);
    const mixed = buildDeck(topics, { mode: 'all', kinds: [], shuffle: true }, ctx({ rng: rng(3) }));
    expect([...keys(mixed)].sort()).toEqual(keys(topics.flatMap((t) => t.flashcards)).sort());
  });

  it('shuffled and weightedSample keep every item once', () => {
    const xs = Array.from({ length: 30 }, (_, i) => i);
    expect([...shuffled(xs, rng(9))].sort((a, b) => a - b)).toEqual(xs);
    expect(new Set(weightedSample(xs, () => 1, 10, rng(2))).size).toBe(10);
  });
});

describe('lessonReviewCards', () => {
  it('turns lesson definitions and formulas into ungraded flip cards with unique keys', () => {
    const defs = lessonReviewCards([kin], 'definitions');
    expect(defs).toHaveLength(1);
    expect(defs[0]).toMatchObject({ front: '**Displacement**', back: 'Change in position.', topicKey: 'physics/kin', kind: 'definition' });
    expect(defs[0].key.startsWith('review:definitions:')).toBe(true);
    const fs = lessonReviewCards([kin], 'formulas');
    expect(fs.map((f) => f.back)).toEqual(['$$v = \\frac{s}{t}$$\n\ns: displacement', '$$v = u + at$$']);
    expect(new Set(fs.map((f) => f.key)).size).toBe(2);
  });
});

describe('URL state', () => {
  it('round-trips the builder through query params', () => {
    const p = new URLSearchParams('s=physics&u=a&t=kin&kind=formula,graph&mode=weak&shuffle=1');
    const s = sessionFromParams(p);
    expect(s).toEqual({ scope: { subject: 'physics', unit: 'a', topic: 'kin' }, mode: 'weak', kinds: ['formula', 'graph'], shuffle: true, start: false });
    expect(sessionToParams(s)).toEqual({ s: 'physics', u: 'a', t: 'kin', kind: 'formula,graph', mode: 'weak', shuffle: '1' });
  });

  it('maps raw kinds to groups, drops unknown values and defaults to due', () => {
    const s = sessionFromParams(new URLSearchParams('s=all&kind=unit,derivation,bogus&mode=zzz'));
    expect(s).toMatchObject({ scope: {}, mode: 'due', kinds: ['formula', 'method'] });
    expect(sessionToParams({ ...s, mode: 'definitions' })).toEqual({ mode: 'definitions' });
  });

  it('opens legacy ?topic= links straight into that topic', () => {
    expect(sessionFromParams(new URLSearchParams('topic=physics/kin'))).toMatchObject({ scope: { subject: 'physics', topic: 'kin' }, mode: 'due', start: true });
  });
});
