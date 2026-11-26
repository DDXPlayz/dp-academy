import { getLesson, topicOf, type Lesson, type PracticeQuestion } from '../content';
import { headingsOf } from '../components/Markdown';
import { latestAttempts } from './stats';
import type { Attempt } from '../store/progress';

/*
 * After a wrong answer: the lesson section that explains the question, and
 * another question on the same idea to try straight away.
 */

const SKIP = /^(summary|try it yourself|introduction)$/i;
const STOP = new Set('the and for with from that this what which when then than into your have will are its use using a an of to in on is be by as at or how why'.split(' '));

const words = (s: string) =>
  new Set(
    s
      .toLowerCase()
      .replace(/\$[^$]*\$/g, ' ')
      .split(/[^a-z]+/)
      .filter((w) => w.length > 2 && !STOP.has(w))
      .map((w) => w.replace(/(ing|ies|es|s)$/, '')),
  );

/** The lesson heading (id + text) that best covers this question, if any. */
export function sectionFor(q: PracticeQuestion, lesson: Lesson): { id: string; text: string } | null {
  const heads = headingsOf(lesson.body).filter((h) => !SKIP.test(h.text));
  if (!heads.length) return null;
  // Strongest signal: the lesson embeds this very question under one of its headings.
  const lines = lesson.body.split('\n');
  const at = lines.findIndex((l, i) => l.startsWith('```question') && lines[i + 1]?.trim() === q.id);
  if (at >= 0) {
    for (let i = at; i >= 0; i--) {
      const m = /^(##|###)\s+(.+)$/.exec(lines[i]);
      if (m) {
        const h = heads.find((x) => lines[i].includes(x.text.slice(0, 20)));
        if (h) return h;
        break;
      }
    }
  }
  // Otherwise: the heading sharing the most words with the concept (counted twice) and the prompt.
  const concept = words(q.concept);
  const prompt = words(q.prompt);
  let best: { id: string; text: string } | null = null;
  let score = 0;
  for (const h of heads) {
    let s = 0;
    for (const w of words(h.text)) s += (concept.has(w) ? 2 : 0) + (prompt.has(w) ? 1 : 0);
    if (s > score) {
      score = s;
      best = h;
    }
  }
  return best;
}

/** The lesson link for a question: its lesson, scrolled to the best section when one is found. */
export function lessonLinkFor(q: PracticeQuestion): { href: string; title: string; section: string | null } | null {
  if (!q.lesson) return null;
  const lesson = getLesson(`${topicOf(q).key}/${q.lesson}`);
  if (!lesson) return null;
  const sec = sectionFor(q, lesson);
  return { href: sec ? `${lesson.href}#${sec.id}` : lesson.href, title: lesson.meta.title, section: sec?.text ?? null };
}

/** Another question on the same concept (or lesson) in the topic, preferring ones not yet answered correctly. */
export function similarQuestion(q: PracticeQuestion, attempts: Attempt[]): PracticeQuestion | null {
  const topic = topicOf(q);
  const latest = latestAttempts(attempts);
  const others = topic.questions.filter((x) => x.key !== q.key);
  const pools = [others.filter((x) => x.concept === q.concept), q.lesson ? others.filter((x) => x.lesson === q.lesson) : [], others];
  for (const pool of pools) {
    if (!pool.length) continue;
    const fresh = pool.filter((x) => !latest.get(x.key)?.correct);
    const pick = fresh.length ? fresh : pool;
    return pick[Math.floor(Math.random() * pick.length)];
  }
  return null;
}
