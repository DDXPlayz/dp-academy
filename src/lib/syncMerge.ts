import type { CardState } from './srs';

/*
 * Merging two copies of a student's progress (this device and the account),
 * used when both changed since they last agreed. Nothing that was done on
 * either device is lost: completions, attempts, bookmarks, notes and study
 * days are unions; per-item values keep the more advanced/newer copy.
 */

export interface SyncedProgress {
  name: string;
  theme: 'system' | 'light' | 'dark';
  completed: Record<string, string>;
  visited: Record<string, number>;
  lastLesson: string | null;
  attempts: { key: string; topicKey: string; concept: string; correct: boolean; ms: number; at: number }[];
  bookmarks: Record<string, { kind: 'lesson' | 'question' | 'flashcard'; at: number }>;
  notes: Record<string, string>;
  cards: Record<string, CardState>;
  studyDays: string[];
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
    completed: obj(d.completed),
    visited: obj(d.visited),
    lastLesson: typeof d.lastLesson === 'string' ? d.lastLesson : null,
    attempts: arr(d.attempts),
    bookmarks: obj(d.bookmarks),
    notes: obj(d.notes),
    cards: obj(d.cards),
    studyDays: arr(d.studyDays),
  };
}

function pickCard(a: CardState, b: CardState): CardState {
  if (a.reps !== b.reps) return a.reps > b.reps ? a : b;
  return a.due >= b.due ? a : b;
}

/** `mine` is this device; its name, theme, last lesson and notes win ties. */
export function mergeProgress(mineRaw: unknown, theirsRaw: unknown): SyncedProgress {
  const mine = normalise(mineRaw);
  const theirs = normalise(theirsRaw);

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

  const lastOf = (p: SyncedProgress) => (p.lastLesson ? p.visited[p.lastLesson] ?? 0 : 0);

  return {
    name: mine.name || theirs.name,
    theme: mine.theme,
    completed,
    visited,
    lastLesson: lastOf(mine) >= lastOf(theirs) ? mine.lastLesson ?? theirs.lastLesson : theirs.lastLesson,
    attempts,
    bookmarks,
    notes: { ...theirs.notes, ...mine.notes },
    cards,
    studyDays: [...new Set([...theirs.studyDays, ...mine.studyDays])].sort().slice(-400),
  };
}
