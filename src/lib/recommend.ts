import { allFlashcards, allLessons, getLesson, getTopic, type Lesson, type Topic } from '../content';
import type { Attempt } from '../store/progress';
import { isDue, type CardState } from './srs';
import { today } from './dates';
import { weakTopics, type StudyState } from './stats';

/*
 * Answers "what should I study right now?" from the student's history.
 */

/** The lesson to resume: the last one opened if unfinished, else the next unfinished one after it. */
export function continueLesson(s: StudyState & { lastLesson: string | null }): Lesson | undefined {
  const last = s.lastLesson ? getLesson(s.lastLesson) : undefined;
  if (last && !s.completed[last.key]) return last;
  const start = last ? allLessons.findIndex((l) => l.key === last.key) : -1;
  const sameSubject = allLessons.filter((l, i) => i > start && (!last || l.subjectId === last.subjectId));
  return sameSubject.find((l) => !s.completed[l.key]) ?? allLessons.find((l) => !s.completed[l.key]);
}

/** Topics the student has touched — the pool for revision suggestions. */
export function studiedTopics(s: StudyState, cards: Record<string, CardState>): Topic[] {
  const keys = new Set<string>();
  for (const k of Object.keys(s.visited)) keys.add(getLesson(k)?.topicKey ?? '');
  for (const a of s.attempts) keys.add(a.topicKey);
  for (const k of Object.keys(cards)) keys.add(k.split('/').slice(0, 2).join('/'));
  return [...keys].map((k) => getTopic(k)).filter((t): t is Topic => !!t);
}

/**
 * Cards due today: reviewed cards whose interval has elapsed, plus unseen
 * cards from topics where the student has completed at least one lesson.
 */
export function dueCards(s: StudyState, cards: Record<string, CardState>) {
  const learnt = new Set(Object.keys(s.completed).map((k) => getLesson(k)?.topicKey));
  return allFlashcards().filter((c) => (cards[c.key] ? isDue(cards[c.key]) : learnt.has(c.topicKey)));
}

export interface FocusItem {
  id: string;
  label: string;
  detail: string;
  href: string;
  done: boolean;
}

const attemptsToday = (attempts: Attempt[]) => {
  const d = today();
  return attempts.filter((a) => today(new Date(a.at)) === d);
};

export function todaysFocus(
  s: StudyState & { lastLesson: string | null },
  cards: Record<string, CardState>,
): FocusItem[] {
  const items: FocusItem[] = [];
  const d = today();
  const lesson = continueLesson(s);
  const completedToday = Object.entries(s.completed).find(([, iso]) => today(new Date(iso)) === d);

  if (lesson) {
    const topic = getTopic(lesson.topicKey)!;
    items.push({
      id: 'lesson',
      label: completedToday ? `Next: ${lesson.meta.title}` : `Study ${lesson.meta.title}`,
      detail: `${topic.title} · ${lesson.meta.minutes} min`,
      href: lesson.href,
      done: false,
    });
  }
  if (completedToday) {
    const l = getLesson(completedToday[0]);
    if (l) items.unshift({ id: 'done', label: `Completed ${l.meta.title}`, detail: 'Nice work', href: l.href, done: true });
  }

  const weak = weakTopics(s)[0];
  const practiceTopic = weak?.topic ?? (lesson ? getTopic(lesson.topicKey) : undefined);
  const answered = attemptsToday(s.attempts).length;
  if (practiceTopic && practiceTopic.questions.length) {
    items.push({
      id: 'practice',
      label: weak ? `Strengthen ${weak.topic.title}` : 'Answer 10 practice questions',
      detail: weak ? `${Math.round(weak.accuracy * 100)}% accuracy recently` : `${Math.min(answered, 10)}/10 today · ${practiceTopic.title}`,
      href: `/practice?topic=${encodeURIComponent(practiceTopic.key)}`,
      done: answered >= 10,
    });
  }

  const due = dueCards(s, cards).length;
  const reviewedToday = Object.values(cards).some((c) => c.due > d && c.interval > 0);
  if (due || reviewedToday) {
    items.push({
      id: 'cards',
      label: due ? `Review ${due} flashcard${due === 1 ? '' : 's'}` : 'Flashcards reviewed',
      detail: due ? 'Spaced repetition keeps them fresh' : 'All caught up for today',
      href: '/revise/flashcards',
      done: due === 0,
    });
  }

  if (lesson) {
    items.push({
      id: 'formulas',
      label: 'Revise key formulas',
      detail: getTopic(lesson.topicKey)!.title,
      href: `/revise?topic=${encodeURIComponent(lesson.topicKey)}`,
      done: false,
    });
  }
  return items.slice(0, 4);
}

/** Started topics not touched for a while — good candidates for a recap. */
export function revisitSuggestions(s: StudyState, cards: Record<string, CardState>, days = 3) {
  const cutoff = Date.now() - days * 86400000;
  return studiedTopics(s, cards)
    .map((t) => {
      const times = [...t.lessons.map((l) => s.visited[l.key] ?? 0), ...s.attempts.filter((a) => a.topicKey === t.key).map((a) => a.at)];
      return { topic: t, last: Math.max(0, ...times) };
    })
    .filter((x) => x.last > 0 && x.last < cutoff)
    .sort((a, b) => a.last - b.last)
    .slice(0, 4);
}
