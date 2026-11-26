import fs from 'node:fs';
import path from 'node:path';
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

  it('has no stray control characters in exam-style questions (e.g. "\\t" from an unescaped \\times)', () => {
    const bad: string[] = [];
    for (const s of subjects)
      for (const t of s.topics)
        for (const q of t.exam) {
          const text = [q.prompt, q.markscheme, q.concept ?? '', ...(q.options ?? [])].join('\n');
          if (/[\u0000-\u0008\u000b-\u001f⁠]/.test(text)) bad.push(q.key);
        }
    expect(bad).toEqual([]);
  });

  it('only references private diagrams that exist (when the private folder is present)', () => {
    const notes = path.resolve('resources/extracted');
    const check = fs.existsSync(notes);
    const bad: string[] = [];
    for (const s of subjects)
      for (const t of s.topics)
        for (const l of t.lessons)
          for (const m of l.body.matchAll(/```figure\s*\n([\s\S]*?)```/g)) {
            const src = m[1].match(/^src:\s*(.+)$/m)?.[1]?.trim() ?? '';
            const okShape = /^(physics|chemistry|math-aa)\/_(sme|iitian|studyib)\/[^\s]+\.(png|jpe?g)$/.test(src) && !src.includes('..');
            if (!okShape || (check && !fs.existsSync(path.join(notes, src)))) bad.push(`${l.key}: ${src}`);
            if (!/^caption:\s*\S/m.test(m[1])) bad.push(`${l.key}: figure without caption`);
          }
    expect(bad).toEqual([]);
  });
});
