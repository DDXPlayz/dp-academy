import { addDays, today } from './dates';

/*
 * Spaced repetition, after SM-2. Each card carries an ease factor and an
 * interval in days; a grade moves both and sets the next due date.
 */

export type Grade = 'again' | 'hard' | 'good' | 'easy';

export interface CardState {
  ease: number;
  interval: number;
  reps: number;
  due: string; // YYYY-MM-DD
  lapses: number;
}

export function review(prev: CardState | undefined, grade: Grade, on = today()): CardState {
  const s: CardState = prev ?? { ease: 2.5, interval: 0, reps: 0, due: on, lapses: 0 };
  if (grade === 'again') {
    return { ease: Math.max(1.3, s.ease - 0.2), interval: 0, reps: 0, due: on, lapses: s.lapses + 1 };
  }
  const ease = Math.max(1.3, s.ease + (grade === 'hard' ? -0.15 : grade === 'easy' ? 0.15 : 0));
  let interval: number;
  if (s.reps === 0) interval = grade === 'easy' ? 3 : 1;
  else if (s.reps === 1) interval = grade === 'hard' ? 3 : grade === 'easy' ? 8 : 6;
  else interval = Math.round(s.interval * (grade === 'hard' ? 1.2 : grade === 'easy' ? ease * 1.3 : ease));
  interval = Math.max(1, interval);
  return { ease, interval, reps: s.reps + 1, due: addDays(on, interval), lapses: s.lapses };
}

export const isDue = (s: CardState | undefined, on = today()) => !s || s.due <= on;

/** Cards are "learned" once they have survived a review with an interval of a week or more. */
export const isLearned = (s: CardState | undefined) => !!s && s.interval >= 7;
