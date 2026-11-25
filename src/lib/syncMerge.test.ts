import { describe, expect, it } from 'vitest';
import { mergeProgress, normalise } from './syncMerge';

const card = (reps: number, due: string) => ({ ease: 2.5, interval: 1, reps, due, lapses: 0 });

describe('mergeProgress', () => {
  it('keeps work done on both devices', () => {
    const phone = {
      completed: { a: '2026-01-02' },
      visited: { a: 10 },
      attempts: [{ key: 'q1', topicKey: 't', concept: 'c', correct: true, ms: 1, at: 5 }],
      bookmarks: { x: { kind: 'lesson', at: 1 } },
      notes: { a: 'phone note' },
      cards: { f: card(1, '2026-01-03') },
      studyDays: ['2026-01-02'],
      lastLesson: 'a',
    };
    const laptop = {
      completed: { a: '2026-01-01', b: '2026-01-04' },
      visited: { a: 20, b: 30 },
      attempts: [
        { key: 'q1', topicKey: 't', concept: 'c', correct: true, ms: 1, at: 5 },
        { key: 'q2', topicKey: 't', concept: 'c', correct: false, ms: 1, at: 3 },
      ],
      bookmarks: { y: { kind: 'question', at: 2 } },
      notes: { a: 'laptop note', b: 'b note' },
      cards: { f: card(3, '2026-01-09') },
      studyDays: ['2026-01-04', '2026-01-01'],
      lastLesson: 'b',
    };
    const m = mergeProgress(phone, laptop);
    expect(m.completed).toEqual({ a: '2026-01-01', b: '2026-01-04' });
    expect(m.visited).toEqual({ a: 20, b: 30 });
    expect(m.attempts.map((a) => a.key)).toEqual(['q2', 'q1']);
    expect(Object.keys(m.bookmarks).sort()).toEqual(['x', 'y']);
    expect(m.notes).toEqual({ a: 'phone note', b: 'b note' });
    expect(m.cards.f.reps).toBe(3);
    expect(m.studyDays).toEqual(['2026-01-01', '2026-01-02', '2026-01-04']);
    expect(m.lastLesson).toBe('b');
  });

  it('copes with missing or malformed data', () => {
    expect(normalise(null).completed).toEqual({});
    expect(normalise({ attempts: 'x', theme: 'neon' })).toMatchObject({ attempts: [], theme: 'system' });
    expect(mergeProgress(undefined, { completed: { a: '1' } }).completed).toEqual({ a: '1' });
  });

  it('a reset wins over older progress from the account or another device', () => {
    const resetAt = Date.parse('2026-03-01T12:00:00Z');
    const fresh = { resetAt, completed: { new: '2026-03-02T00:00:00Z' }, visited: { new: resetAt + 10 } };
    const old = {
      completed: { a: '2026-01-01T00:00:00Z', late: '2026-03-05T00:00:00Z' },
      visited: { a: 5 },
      attempts: [
        { key: 'q1', topicKey: 't', concept: 'c', correct: true, ms: 1, at: 5 },
        { key: 'q2', topicKey: 't', concept: 'c', correct: true, ms: 1, at: resetAt + 1 },
      ],
      notes: { a: 'old note' },
      bookmarks: { x: { kind: 'lesson', at: 1 } },
      cards: { f: card(4, '2026-02-01') },
      studyDays: ['2026-01-01', '2026-03-03'],
      lastLesson: 'a',
    };
    for (const m of [mergeProgress(fresh, old), mergeProgress(old, fresh)]) {
      expect(m.completed).toEqual({ new: '2026-03-02T00:00:00Z', late: '2026-03-05T00:00:00Z' });
      expect(m.attempts.map((a) => a.key)).toEqual(['q2']);
      expect(m.notes).toEqual({});
      expect(m.bookmarks).toEqual({});
      expect(m.cards).toEqual({});
      expect(m.studyDays).toEqual(['2026-03-03']);
      expect(m.resetAt).toBe(resetAt);
    }
  });
});
