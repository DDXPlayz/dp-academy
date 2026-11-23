import { allTopics, subjects, type Subject, type Topic } from '../content';
import type { Attempt } from '../store/progress';

/*
 * Derived study statistics. All pure functions of the persisted state, so
 * they are cheap to test and never go stale.
 */

export interface StudyState {
  completed: Record<string, string>;
  visited: Record<string, number>;
  attempts: Attempt[];
}

/** How many of a topic's most recent attempts count towards its accuracy. */
const RECENT = 12;
/** Below this accuracy (with enough attempts) a topic or concept needs attention. */
export const WEAK_THRESHOLD = 0.6;
const MIN_ATTEMPTS = 3;

export interface TopicStats {
  lessonsDone: number;
  lessonsTotal: number;
  questionsTotal: number;
  questionsCorrect: number;
  attempts: number;
  accuracy: number | null;
  progress: number | null;
  lastStudied: number | null;
}

export function latestAttempts(attempts: Attempt[]): Map<string, Attempt> {
  const m = new Map<string, Attempt>();
  for (const a of attempts) m.set(a.key, a);
  return m;
}

function accuracyOf(list: Attempt[]): number | null {
  if (list.length < 1) return null;
  const recent = list.slice(-RECENT);
  return recent.filter((a) => a.correct).length / recent.length;
}

export function topicStats(topic: Topic, s: StudyState, latest = latestAttempts(s.attempts)): TopicStats {
  const lessonsDone = topic.lessons.filter((l) => s.completed[l.key]).length;
  const questionsCorrect = topic.questions.filter((q) => latest.get(q.key)?.correct).length;
  const mine = s.attempts.filter((a) => a.topicKey === topic.key);
  const lessonsTotal = topic.lessons.length;
  const questionsTotal = topic.questions.length;

  let progress: number | null = null;
  if (lessonsTotal && questionsTotal) progress = 0.6 * (lessonsDone / lessonsTotal) + 0.4 * (questionsCorrect / questionsTotal);
  else if (lessonsTotal) progress = lessonsDone / lessonsTotal;
  else if (questionsTotal) progress = questionsCorrect / questionsTotal;

  const times = [...topic.lessons.map((l) => s.visited[l.key] ?? 0), ...mine.map((a) => a.at)];
  const last = Math.max(0, ...times);

  return {
    lessonsDone,
    lessonsTotal,
    questionsTotal,
    questionsCorrect,
    attempts: mine.length,
    accuracy: accuracyOf(mine),
    progress,
    lastStudied: last || null,
  };
}

export interface SubjectStats {
  progress: number;
  lessonsDone: number;
  lessonsTotal: number;
  questionsTotal: number;
  accuracy: number | null;
  started: boolean;
}

export function subjectStats(subject: Subject, s: StudyState): SubjectStats {
  const latest = latestAttempts(s.attempts);
  let weight = 0;
  let sum = 0;
  let lessonsDone = 0;
  let lessonsTotal = 0;
  let questionsTotal = 0;
  for (const t of subject.topics) {
    const st = topicStats(t, s, latest);
    lessonsDone += st.lessonsDone;
    lessonsTotal += st.lessonsTotal;
    questionsTotal += st.questionsTotal;
    if (st.progress !== null) {
      // Weight by teaching hours so a 2-hour topic counts less than a 9-hour one
      // (topics without guide hours count equally).
      const w = t.hours ?? 1;
      weight += w;
      sum += st.progress * w;
    }
  }
  const mine = s.attempts.filter((a) => a.topicKey.startsWith(subject.id + '/'));
  return {
    progress: weight ? sum / weight : 0,
    lessonsDone,
    lessonsTotal,
    questionsTotal,
    accuracy: accuracyOf(mine),
    started: lessonsDone > 0 || mine.length > 0,
  };
}

export interface Weakness {
  topic: Topic;
  accuracy: number;
  attempts: number;
}

export function weakTopics(s: StudyState): Weakness[] {
  const out: Weakness[] = [];
  for (const topic of allTopics()) {
    const mine = s.attempts.filter((a) => a.topicKey === topic.key);
    const acc = accuracyOf(mine);
    if (acc !== null && mine.length >= MIN_ATTEMPTS && acc < WEAK_THRESHOLD) {
      out.push({ topic, accuracy: acc, attempts: mine.length });
    }
  }
  return out.sort((a, b) => a.accuracy - b.accuracy);
}

export interface ConceptWeakness {
  concept: string;
  topic: Topic;
  accuracy: number;
  attempts: number;
}

export function weakConcepts(s: StudyState): ConceptWeakness[] {
  const groups = new Map<string, Attempt[]>();
  for (const a of s.attempts) {
    const k = `${a.topicKey}::${a.concept}`;
    groups.set(k, [...(groups.get(k) ?? []), a]);
  }
  const out: ConceptWeakness[] = [];
  for (const [k, list] of groups) {
    const acc = accuracyOf(list);
    const topic = allTopics().find((t) => t.key === k.split('::')[0]);
    if (topic && acc !== null && list.length >= 2 && acc < WEAK_THRESHOLD) {
      out.push({ concept: k.split('::')[1], topic, accuracy: acc, attempts: list.length });
    }
  }
  return out.sort((a, b) => a.accuracy - b.accuracy);
}

export function overall(s: StudyState) {
  const n = s.attempts.length;
  const correct = s.attempts.filter((a) => a.correct).length;
  const ms = s.attempts.reduce((t, a) => t + a.ms, 0);
  return {
    attempts: n,
    accuracy: n ? correct / n : null,
    avgSeconds: n ? Math.round(ms / n / 1000) : null,
    lessonsDone: Object.keys(s.completed).length,
    subjectsStarted: subjects.filter((sub) => subjectStats(sub, s).started).length,
  };
}

export const pct = (x: number | null | undefined) => (x == null ? '—' : `${Math.round(x * 100)}%`);
