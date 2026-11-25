import type { Flashcard, Lesson, Subject, Topic } from '../content';
import { CARD_KIND_IDS, type CardKind } from '../content/schema';
import { addDays, today } from './dates';
import { isDue, type CardState } from './srs';

/*
 * Revision sessions: which cards a flashcard session shows. Everything here is
 * a pure function of the curriculum, the card states and a few sets derived
 * from the study history, so the selection rules can be unit-tested without
 * the store or the DOM. The Revise page reads and writes the builder's state
 * as URL query params (see `sessionFromParams` / `sessionToParams`).
 */

/* ---------- kinds ---------- */

export type KindGroupId = 'definition' | 'formula' | 'graph' | 'concept' | 'misconception' | 'method' | 'chemistry';

/** Card kinds bundled into the filters a student actually thinks in. */
export const KIND_GROUPS: readonly { id: KindGroupId; label: string; kinds: readonly CardKind[] }[] = [
  { id: 'definition', label: 'Definitions', kinds: ['definition'] },
  { id: 'formula', label: 'Formulas & units', kinds: ['formula', 'unit'] },
  { id: 'graph', label: 'Graphs', kinds: ['graph'] },
  { id: 'concept', label: 'Concepts & distinctions', kinds: ['concept', 'distinction', 'application'] },
  { id: 'misconception', label: 'Misconceptions', kinds: ['misconception'] },
  { id: 'method', label: 'Methods & derivations', kinds: ['method', 'derivation'] },
  { id: 'chemistry', label: 'Reactions & trends', kinds: ['reaction', 'trend', 'structure', 'condition'] },
];

/** A card without a kind counts as a concept card. */
export const cardKind = (c: Pick<Flashcard, 'kind'>): CardKind => c.kind ?? 'concept';

export function kindGroupOf(kind: CardKind): KindGroupId {
  return KIND_GROUPS.find((g) => g.kinds.includes(kind))?.id ?? 'concept';
}

/** Keeps cards in any of the given groups; an empty list means every kind. */
export function filterByKind<T extends Pick<Flashcard, 'kind'>>(cards: T[], groups: readonly KindGroupId[]): T[] {
  if (!groups.length) return cards;
  const set = new Set(groups);
  return cards.filter((c) => set.has(kindGroupOf(cardKind(c))));
}

export function kindCounts(cards: Pick<Flashcard, 'kind'>[]): Record<KindGroupId, number> {
  const out = Object.fromEntries(KIND_GROUPS.map((g) => [g.id, 0])) as Record<KindGroupId, number>;
  for (const c of cards) out[kindGroupOf(cardKind(c))]++;
  return out;
}

/* ---------- scope ---------- */

/** What part of the syllabus a session covers. Empty fields widen it. */
export interface Scope {
  subject?: string; // subject id; absent = all subjects (mixed)
  unit?: string; // unit id within the subject
  topic?: string; // topic id within the subject
}

export type ScopeLevel = 'all' | 'subject' | 'unit' | 'topic';

export const scopeLevel = (s: Scope): ScopeLevel => (!s.subject ? 'all' : s.topic ? 'topic' : s.unit ? 'unit' : 'subject');

/** Topics a scope covers, in curriculum order. Unknown ids select nothing. */
export function topicsInScope(subjects: Subject[], scope: Scope): Topic[] {
  if (!scope.subject) return subjects.flatMap((s) => s.topics);
  const subject = subjects.find((s) => s.id === scope.subject);
  if (!subject) return [];
  if (scope.topic) return subject.topics.filter((t) => t.id === scope.topic);
  if (scope.unit) return subject.units.find((u) => u.id === scope.unit)?.topics ?? [];
  return subject.topics;
}

/* ---------- card history ---------- */

/** The day a card was last graded, inferred from its due date and interval. */
export const lastReviewed = (s: CardState) => addDays(s.due, -s.interval);

/** How far back "recently" reaches for struggling cards. */
export const RECENT_DAYS = 14;

/**
 * A card the student has struggled with recently: it has lapsed ("again") or
 * its ease has dropped below the starting 2.5 (graded "hard"), and it was last
 * reviewed within the recent window.
 */
export function isStruggling(s: CardState | undefined, on = today(), days = RECENT_DAYS): boolean {
  if (!s) return false;
  if (!(s.lapses > 0 || s.ease < 2.5)) return false;
  return lastReviewed(s) >= addDays(on, -days);
}

/* ---------- selection ---------- */

export type CardMode = 'due' | 'all' | 'weak' | 'exam';
export type ReviewSource = 'definitions' | 'formulas';
export type SessionMode = CardMode | ReviewSource;

export const CARD_MODES: readonly { id: CardMode; label: string; hint: string }[] = [
  { id: 'due', label: 'Due', hint: 'Spaced repetition: cards whose review date has come' },
  { id: 'all', label: 'All cards', hint: 'Cram every card in the selection' },
  { id: 'weak', label: 'Weak areas', hint: 'Low-accuracy topics and cards you found hard' },
  { id: 'exam', label: 'Quick pre-exam', hint: 'A short random mix, weighted to weak and unseen cards' },
];

export const REVIEW_SOURCES: readonly { id: ReviewSource; label: string; hint: string }[] = [
  { id: 'definitions', label: 'Definitions', hint: 'Term → definition, from the lessons' },
  { id: 'formulas', label: 'Formulas', hint: 'Formula name → equation, from the lessons' },
];

export const isReviewSource = (m: SessionMode): m is ReviewSource => m === 'definitions' || m === 'formulas';

/** Pre-exam session length bounds. */
export const EXAM_MIN = 20;
export const EXAM_MAX = 30;
export const EXAM_SIZE = 25;

export interface SelectionContext {
  states: Record<string, CardState>;
  /** Topics where weakTopics() reports low accuracy. */
  weakTopics: ReadonlySet<string>;
  /** Topics with at least one completed lesson: their unseen cards count as due in wide scopes. */
  learntTopics: ReadonlySet<string>;
  /** Scope level; unseen cards always count as due when a topic or unit is chosen. */
  level: ScopeLevel;
  on?: string;
  rng?: () => number;
}

export function isDueIn(c: Flashcard, ctx: SelectionContext): boolean {
  const s = ctx.states[c.key];
  if (s) return isDue(s, ctx.on ?? today());
  return ctx.level === 'topic' || ctx.level === 'unit' || ctx.learntTopics.has(c.topicKey);
}

export function isWeakCard(c: Flashcard, ctx: SelectionContext): boolean {
  return ctx.weakTopics.has(c.topicKey) || isStruggling(ctx.states[c.key], ctx.on ?? today());
}

/** Due cards: overdue reviews first (oldest due date first), then new cards in curriculum order. */
export function selectDue(cards: Flashcard[], ctx: SelectionContext): Flashcard[] {
  const due = cards.filter((c) => isDueIn(c, ctx));
  const seen = due.filter((c) => ctx.states[c.key]).sort((a, b) => ctx.states[a.key].due.localeCompare(ctx.states[b.key].due));
  return [...seen, ...due.filter((c) => !ctx.states[c.key])];
}

/** Weak-area cards: recently struggled cards first (lowest ease first), then cards from weak topics. */
export function selectWeak(cards: Flashcard[], ctx: SelectionContext): Flashcard[] {
  const on = ctx.on ?? today();
  const struggling = cards
    .filter((c) => isStruggling(ctx.states[c.key], on))
    .sort((a, b) => ctx.states[a.key].ease - ctx.states[b.key].ease || ctx.states[b.key].lapses - ctx.states[a.key].lapses);
  const picked = new Set(struggling.map((c) => c.key));
  return [...struggling, ...cards.filter((c) => !picked.has(c.key) && ctx.weakTopics.has(c.topicKey))];
}

/** Sampling weight for the pre-exam mix. */
export function examWeight(c: Flashcard, ctx: SelectionContext): number {
  const s = ctx.states[c.key];
  if (isWeakCard(c, ctx)) return 4;
  if (!s) return 3;
  if (isDue(s, ctx.on ?? today())) return 2;
  return 1;
}

/** Weighted random sample without replacement (Efraimidis–Spirakis). */
export function weightedSample<T>(items: T[], weight: (x: T) => number, n: number, rng: () => number = Math.random): T[] {
  return items
    .map((x) => ({ x, k: Math.pow(rng() || Number.MIN_VALUE, 1 / Math.max(weight(x), 1e-9)) }))
    .sort((a, b) => b.k - a.k)
    .slice(0, n)
    .map((e) => e.x);
}

export function shuffled<T>(items: T[], rng: () => number = Math.random): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** The deck for a card mode, before shuffling. The pre-exam mix is always random and capped. */
export function selectCards(cards: Flashcard[], mode: CardMode, ctx: SelectionContext, size = EXAM_SIZE): Flashcard[] {
  switch (mode) {
    case 'due':
      return selectDue(cards, ctx);
    case 'weak':
      return selectWeak(cards, ctx);
    case 'exam':
      return weightedSample(cards, (c) => examWeight(c, ctx), Math.min(Math.max(size, EXAM_MIN), EXAM_MAX), ctx.rng);
    default:
      return cards;
  }
}

export function modeCounts(cards: Flashcard[], ctx: SelectionContext): Record<CardMode, number> {
  return {
    due: selectDue(cards, ctx).length,
    all: cards.length,
    weak: selectWeak(cards, ctx).length,
    exam: Math.min(cards.length, EXAM_SIZE),
  };
}

/** Builds a session deck: scope → kind filter → mode → optional shuffle. */
export function buildDeck(
  topics: Topic[],
  opts: { mode: CardMode; kinds: readonly KindGroupId[]; shuffle: boolean },
  ctx: SelectionContext,
): Flashcard[] {
  const pool = filterByKind(
    topics.flatMap((t) => t.flashcards),
    opts.kinds,
  );
  const deck = selectCards(pool, opts.mode, ctx);
  return opts.shuffle && opts.mode !== 'exam' ? shuffled(deck, ctx.rng) : deck;
}

/* ---------- lesson frontmatter as flip cards ---------- */

const slugPart = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'x';

/**
 * Definitions or formulas from lesson frontmatter, shaped as flashcards so the
 * Flashcard component can show them. Their keys start with "review:" and are
 * never graded, so nothing is written to the SRS state.
 */
export function lessonReviewCards(topics: Topic[], source: ReviewSource): Flashcard[] {
  const out: Flashcard[] = [];
  const seen = new Set<string>();
  const push = (lesson: Lesson, id: string, front: string, back: string, concept: string) => {
    let key = `review:${source}:${lesson.key}/${id}`;
    for (let n = 2; seen.has(key); n++) key = `review:${source}:${lesson.key}/${id}-${n}`;
    seen.add(key);
    out.push({ id, key, topicKey: lesson.topicKey, subjectId: lesson.subjectId, front, back, concept, kind: source === 'definitions' ? 'definition' : 'formula' });
  };
  for (const t of topics) {
    for (const l of t.lessons) {
      if (source === 'definitions') {
        for (const d of l.meta.definitions) push(l, slugPart(d.term), `**${d.term}**`, d.definition, l.meta.title);
      } else {
        for (const f of l.meta.formulas) {
          const back = `$$${f.latex}$$` + (f.where ? `\n\n${f.where}` : '');
          push(l, slugPart(f.name), `**${f.name}**`, back, l.meta.title);
        }
      }
    }
  }
  return out;
}

export const isReviewCard = (key: string) => key.startsWith('review:');

/* ---------- URL state ---------- */

export interface SessionParams {
  scope: Scope;
  mode: SessionMode;
  kinds: KindGroupId[];
  shuffle: boolean;
  /** A session is running (otherwise the builder shows). */
  start: boolean;
}

export const DEFAULT_SESSION: SessionParams = { scope: {}, mode: 'due', kinds: [], shuffle: false, start: false };

const MODES: readonly SessionMode[] = ['due', 'all', 'weak', 'exam', 'definitions', 'formulas'];
const GROUP_IDS = new Set<string>(KIND_GROUPS.map((g) => g.id));

/**
 * Reads the builder from query params:
 *   s=physics  u=<unit id>  t=<topic id>  kind=formula,graph  mode=due  shuffle=1  start=1
 * `kind` accepts group ids or raw card kinds (mapped to their group). The legacy
 * `topic=<subject>/<topic>` link opens that topic's due cards straight away.
 */
export function sessionFromParams(p: URLSearchParams): SessionParams {
  const legacy = p.get('topic');
  if (legacy && legacy.includes('/')) {
    const [subject, topic] = legacy.split('/');
    return { ...DEFAULT_SESSION, scope: { subject, topic }, start: true };
  }
  const subject = p.get('s') || undefined;
  const scope: Scope = subject && subject !== 'all' ? { subject, unit: p.get('u') || undefined, topic: p.get('t') || undefined } : {};
  const mode = MODES.find((m) => m === p.get('mode')) ?? 'due';
  const kinds: KindGroupId[] = [];
  for (const raw of (p.get('kind') ?? '').split(',')) {
    const k = raw.trim();
    const group = GROUP_IDS.has(k) ? (k as KindGroupId) : (CARD_KIND_IDS as readonly string[]).includes(k) ? kindGroupOf(k as CardKind) : null;
    if (group && !kinds.includes(group)) kinds.push(group);
  }
  return { scope, mode, kinds, shuffle: p.get('shuffle') === '1', start: p.get('start') === '1' };
}

export function sessionToParams(s: SessionParams): Record<string, string> {
  const out: Record<string, string> = {};
  if (s.scope.subject) {
    out.s = s.scope.subject;
    if (s.scope.unit) out.u = s.scope.unit;
    if (s.scope.topic) out.t = s.scope.topic;
  }
  if (s.mode !== 'due') out.mode = s.mode;
  if (s.kinds.length && !isReviewSource(s.mode)) out.kind = s.kinds.join(',');
  if (s.shuffle) out.shuffle = '1';
  if (s.start) out.start = '1';
  return out;
}
