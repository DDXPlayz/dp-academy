import type { CardState } from './srs';

/*
 * Merging two copies of a student's progress (this device and the account),
 * used when both changed since they last agreed. Nothing that was done on
 * either device is lost: completions, attempts, bookmarks, notes and study
 * days are unions; per-item values keep the more advanced/newer copy.
 */

export type ExamResult = 'got' | 'partial' | 'missed';
export type TextSize = 'sm' | 'md' | 'lg';
export type Level = 'SL' | 'HL';

export interface SyncedProgress {
  name: string;
  theme: 'system' | 'light' | 'dark';
  textSize: TextSize;
  /** Date of the student's first exam (YYYY-MM-DD), or '' if not set. */
  examDate: string;
  /** Level taken per subject id; subjects not listed are treated as HL. */
  levels: Record<string, Level>;
  /** Questions to answer per day (0 = no goal). */
  dailyGoal: number;
  exam: Record<string, { r: ExamResult; at: number }>;
  completed: Record<string, string>;
  visited: Record<string, number>;
  lastLesson: string | null;
  attempts: { key: string; topicKey: string; concept: string; correct: boolean; ms: number; at: number }[];
  bookmarks: Record<string, { kind: 'lesson' | 'question' | 'flashcard'; at: number }>;
  notes: Record<string, string>;
  cards: Record<string, CardState>;
  studyDays: string[];
  /** When this copy was last reset (epoch ms). A copy reset earlier than the other keeps only what happened after the later reset. */
  resetAt: number;
}

export const MAX_ATTEMPTS = 3000;

const obj = <T>(v: unknown): Record<string, T> => (v && typeof v === 'object' && !Array.isArray(v) ? (v as Record<string, T>) : {});
const arr = <T>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);

/** Fills in missing fields so data from older versions or other devices is safe to use. */
export function normalise(raw: unknown): SyncedProgress {
  const d = obj<unknown>(raw);
  const theme = d.theme === 'light' || d.theme === 'dark' ? d.theme : 'system';
  return {
    name: typeof d.name === 'string' ? d.name : '',
    theme,
    textSize: d.textSize === 'sm' || d.textSize === 'lg' ? d.textSize : 'md',
    examDate: typeof d.examDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d.examDate) ? d.examDate : '',
    dailyGoal: typeof d.dailyGoal === 'number' && d.dailyGoal >= 0 && d.dailyGoal <= 200 ? Math.round(d.dailyGoal) : 10,
    levels: Object.fromEntries(Object.entries(obj<unknown>(d.levels)).filter(([, v]) => v === 'SL' || v === 'HL')) as Record<string, Level>,
    exam: obj(d.exam),
    completed: obj(d.completed),
    visited: obj(d.visited),
    lastLesson: typeof d.lastLesson === 'string' ? d.lastLesson : null,
    attempts: arr(d.attempts),
    bookmarks: obj(d.bookmarks),
    notes: obj(d.notes),
    cards: obj(d.cards),
    studyDays: arr(d.studyDays),
    resetAt: typeof d.resetAt === 'number' ? d.resetAt : 0,
  };
}

/** Drops everything in `p` that happened before `epoch` (a reset made on another device). */
function since(p: SyncedProgress, epoch: number): SyncedProgress {
  const keep = <T>(o: Record<string, T>, at: (v: T) => number) => Object.fromEntries(Object.entries(o).filter(([, v]) => at(v) > epoch));
  const day = new Date(epoch).toISOString().slice(0, 10);
  return {
    ...p,
    exam: keep(p.exam, (v) => v.at),
    completed: keep(p.completed, (v) => Date.parse(v) || 0),
    visited: keep(p.visited, (v) => v),
    lastLesson: p.lastLesson && (p.visited[p.lastLesson] ?? 0) > epoch ? p.lastLesson : null,
    attempts: p.attempts.filter((a) => a.at > epoch),
    bookmarks: keep(p.bookmarks, (v) => v.at),
    notes: {}, // notes carry no timestamp, so a reset clears them
    cards: {}, // card states only make sense as a whole history
    studyDays: p.studyDays.filter((d) => d >= day),
    resetAt: epoch,
  };
}

function pickCard(a: CardState, b: CardState): CardState {
  if (a.reps !== b.reps) return a.reps > b.reps ? a : b;
  return a.due >= b.due ? a : b;
}

/** `mine` is this device; its name, theme, last lesson and notes win ties. */
export function mergeProgress(mineRaw: unknown, theirsRaw: unknown): SyncedProgress {
  let mine = normalise(mineRaw);
  let theirs = normalise(theirsRaw);
  if (mine.resetAt > theirs.resetAt) theirs = since(theirs, mine.resetAt);
  else if (theirs.resetAt > mine.resetAt) mine = since(mine, theirs.resetAt);

  const completed = { ...theirs.completed };
  for (const [k, v] of Object.entries(mine.completed)) completed[k] = completed[k] && completed[k] < v ? completed[k] : v;

  const visited = { ...theirs.visited };
  for (const [k, v] of Object.entries(mine.visited)) visited[k] = Math.max(visited[k] ?? 0, v);

  const seen = new Set<string>();
  const attempts = [...theirs.attempts, ...mine.attempts]
    .filter((a) => {
      const id = `${a.key}@${a.at}`;
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    })
    .sort((a, b) => a.at - b.at)
    .slice(-MAX_ATTEMPTS);

  const bookmarks = { ...theirs.bookmarks };
  for (const [k, v] of Object.entries(mine.bookmarks)) if (!bookmarks[k] || bookmarks[k].at < v.at) bookmarks[k] = v;

  const cards = { ...theirs.cards };
  for (const [k, v] of Object.entries(mine.cards)) cards[k] = cards[k] ? pickCard(v, cards[k]) : v;

  const exam = { ...theirs.exam };
  for (const [k, v] of Object.entries(mine.exam)) if (!exam[k] || exam[k].at <= v.at) exam[k] = v;

  const lastOf = (p: SyncedProgress) => (p.lastLesson ? p.visited[p.lastLesson] ?? 0 : 0);

  return {
    name: mine.name || theirs.name,
    theme: mine.theme,
    textSize: mine.textSize,
    examDate: mine.examDate || theirs.examDate,
    levels: { ...theirs.levels, ...mine.levels },
    dailyGoal: mine.dailyGoal,
    exam,
    completed,
    visited,
    lastLesson: lastOf(mine) >= lastOf(theirs) ? mine.lastLesson ?? theirs.lastLesson : theirs.lastLesson,
    attempts,
    bookmarks,
    notes: { ...theirs.notes, ...mine.notes },
    cards,
    studyDays: [...new Set([...theirs.studyDays, ...mine.studyDays])].sort().slice(-400),
    resetAt: Math.max(mine.resetAt, theirs.resetAt),
  };
}
