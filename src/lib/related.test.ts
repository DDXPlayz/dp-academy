import { describe, expect, it } from 'vitest';
import { allQuestions, getLesson, topicOf } from '../content';
import { headingsOf } from '../components/Markdown';
import { lessonLinkFor, similarQuestion } from './related';

describe('related links after a wrong answer', () => {
  const qs = allQuestions().filter((q) => q.lesson);

  it('points every linked question at a real lesson heading', () => {
    let withSection = 0;
    for (const q of qs) {
      const link = lessonLinkFor(q);
      expect(link, q.key).not.toBeNull();
      const lesson = getLesson(`${topicOf(q).key}/${q.lesson}`)!;
      const [, anchor] = link!.href.split('#');
      if (anchor) {
        withSection++;
        expect(headingsOf(lesson.body).map((h) => h.id), q.key).toContain(anchor);
      }
    }
    // Most questions should land on a specific section, not just the top of the lesson.
    expect(withSection / qs.length).toBeGreaterThan(0.6);
  });

  it('suggests a different question from the same topic', () => {
    for (const q of qs.slice(0, 200)) {
      const s = similarQuestion(q, []);
      if (!s) continue;
      expect(s.key).not.toBe(q.key);
      expect(s.topicKey).toBe(q.topicKey);
    }
  });
});
