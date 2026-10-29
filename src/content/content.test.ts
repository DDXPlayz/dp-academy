import { describe, expect, it } from 'vitest';
import { allQuestions, contentErrors, subjects } from './index';
import { checkAnswer, correctResponse } from '../lib/answers';

describe('content', () => {
  it('loads at least one subject', () => {
    expect(subjects.length).toBeGreaterThan(0);
  });

  it('has no schema or cross-reference errors', () => {
    expect(contentErrors).toEqual([]);
  });

  it('accepts the stored answer for every question', () => {
    for (const q of allQuestions()) {
      expect(checkAnswer(q, correctResponse(q)), q.key).toBe(true);
    }
  });
});
