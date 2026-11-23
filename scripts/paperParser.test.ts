import { describe, expect, it } from 'vitest';
import { importedExamQuestionSchema } from '../src/content/schema';
import {
  buildQuestions,
  classifyTopic,
  cleanText,
  estimateDifficulty,
  parseMcq,
  parseMcqKey,
  parsePaperFilename,
  splitMarkscheme,
  splitQuestions,
  sumMarks,
  topicKeywords,
} from './paperParser';

// Every fixture below is invented for these tests; no exam material is committed.
const TOPICS = topicKeywords([
  { id: 'a1-kinematics', code: 'A.1', title: 'Kinematics', summary: 'Displacement, velocity, acceleration, projectile motion and graphs of motion.' },
  { id: 'b3-gas-laws', code: 'B.3', title: 'Gas laws', summary: 'Pressure, volume, temperature and the ideal gas equation.' },
  { id: 'a5-relativity', code: 'A.5', title: 'Galilean and special relativity', summary: 'Reference frames, Lorentz transformations and time dilation.', hl: true },
]);

const MCQ_PAPER = `M99/4/PHYSI/HP1/ENG/TZ9/XX
– 2 –
1. A trolley's velocity rises steadily from rest to 6 m s–1 in 3 s. What is its acceleration?
A. 0.5 m s–2
B. 2 m s–2
C. 3 m s–2
D. 18 m s–2
2. The pressure of a fixed mass of gas doubles at constant volume. What happens to its kelvin temperature?
A. It halves. B. It stays the same. C. It doubles. D. It quadruples.
Turn over`;

const WRITTEN_PAPER = `1. A ball is thrown horizontally from a cliff with velocity 12 m s–1.
(a) Calculate the time for the ball to fall 20 m. [2]
(b) Determine the horizontal displacement of the ball after this time. [2]
........................................................................
2. A sealed container holds an ideal gas at a pressure of 100 kPa.
(a) The temperature is doubled. State the new pressure. [1]
(b) Explain, using the kinetic model, why the pressure changes. [3]`;

describe('parsePaperFilename', () => {
  it('reads subject, paper, level, time zone and markscheme flag', () => {
    expect(parsePaperFilename('x/Physics_paper_1A_TZ2_HL.pdf')).toEqual({ subject: 'physics', paper: '1A', level: 'HL', timezone: 'TZ2', markscheme: false });
    expect(parsePaperFilename('Chemistry_paper_2_TZ1_SL_markscheme.pdf')).toMatchObject({ subject: 'chemistry', paper: '2', level: 'SL', markscheme: true });
    expect(parsePaperFilename('Mathematics_analysis_and_approaches_paper_3_HL.pdf')).toMatchObject({ subject: 'math-aa', paper: '3', timezone: null });
  });
  it('skips translations, other subjects and unrecognised names', () => {
    expect(parsePaperFilename('Physics_paper_1A_TZ2_SL_Spanish.pdf')).toBeNull();
    expect(parsePaperFilename('Biology_paper_2_TZ1_HL.pdf')).toBeNull();
    expect(parsePaperFilename('notes.pdf')).toBeNull();
  });
});

describe('text handling', () => {
  it('strips headers, page numbers, answer lines and turn-over notes', () => {
    const t = cleanText(MCQ_PAPER + '\n' + WRITTEN_PAPER);
    expect(t).not.toMatch(/M99\/4|– 2 –|Turn over|\.{8}/);
    expect(t).toMatch(/^1\. A trolley/);
  });
  it('sums bracketed marks, preferring a stated maximum', () => {
    expect(sumMarks('(a) x [2]\n(b) y [3]')).toBe(5);
    expect(sumMarks('[Maximum mark: 9]\n(a) [2]')).toBe(9);
  });
  it('splits questions only at the next expected number', () => {
    const qs = splitQuestions(cleanText(WRITTEN_PAPER));
    expect(qs.map((q) => [q.number, q.marks])).toEqual([
      ['1', 4],
      ['2', 4],
    ]);
    expect(qs[0].text).toContain('20 m');
  });
});

describe('multiple choice', () => {
  it('parses stems and options, including options on one line', () => {
    const [q1, q2] = splitQuestions(cleanText(MCQ_PAPER));
    expect(parseMcq(q1.text)).toEqual({ stem: expect.stringContaining('acceleration?'), options: ['0.5 m s–2', '2 m s–2', '3 m s–2', '18 m s–2'] });
    expect(parseMcq(q2.text)?.options).toEqual(['It halves.', 'It stays the same.', 'It doubles.', 'It quadruples.']);
    expect(parseMcq('No options here')).toBeNull();
  });
  it('reads an answer key', () => {
    expect(parseMcqKey('Question Answer\n1. B\n2 C\n')).toEqual({ '1': 1, '2': 2 });
  });
});

describe('classification and difficulty', () => {
  it('picks the clearly best topic and declines when unsure', () => {
    expect(classifyTopic('projectile velocity acceleration displacement', TOPICS).id).toBe('a1-kinematics');
    expect(classifyTopic('pressure temperature ideal gas volume', TOPICS).id).toBe('b3-gas-laws');
    expect(classifyTopic('a question about nothing in particular', TOPICS).id).toBeNull();
  });
  it('rises with position and marks', () => {
    expect(estimateDifficulty(1, 0, 30, '1A')).toBe('easy');
    expect(estimateDifficulty(1, 29, 30, '1A')).toBe('hard');
    expect(estimateDifficulty(2, 0, 8, '2')).toBe('easy');
    expect(estimateDifficulty(12, 7, 8, '2')).toBe('hard');
  });
});

describe('buildQuestions', () => {
  const meta = { subject: 'physics' as const, level: 'SL' as const, timezone: 'TZ9', markscheme: false };

  it('builds valid multiple-choice rows with answers from the key', () => {
    const rows = buildQuestions({ meta: { ...meta, paper: '1A' }, session: 'Specimen', paperText: MCQ_PAPER, markschemeText: '1. B\n2. C', topics: TOPICS, idPrefix: 'p1a' });
    expect(rows).toHaveLength(2);
    expect(rows[0]).toMatchObject({ id: 'p1a-q1', answer: 1, marks: 1, source: 'past-paper', session: 'Specimen TZ9', topic: 'a1-kinematics', needsReview: false });
    expect(rows[1]).toMatchObject({ answer: 2, topic: 'b3-gas-laws' });
    for (const r of rows) expect(importedExamQuestionSchema.safeParse(r).success).toBe(true);
  });

  it('attaches written markschemes by question number and flags missing ones', () => {
    const rows = buildQuestions({
      meta: { ...meta, paper: '2' },
      session: 'Specimen',
      paperText: WRITTEN_PAPER,
      markschemeText: '1. (a) t = √(2h/g) ✓ = 2.0 s ✓\n(b) 24 m ✓✓',
      topics: TOPICS,
      idPrefix: 'p2',
    });
    expect(rows[0].markscheme).toContain('2.0 s');
    expect(rows[1].markscheme).toMatch(/not found/);
    expect(rows.map((r) => r.marks)).toEqual([4, 4]);
  });

  it('does not offer HL-only topics for SL papers', () => {
    const rows = buildQuestions({ meta: { ...meta, paper: '2' }, session: 'S', paperText: '1. Lorentz transformations and time dilation in reference frames [3]', markschemeText: null, topics: TOPICS, idPrefix: 'x' });
    expect(rows[0].topic).toBeNull();
    expect(rows[0].needsReview).toBe(true);
  });

  it('splits markschemes like papers', () => {
    expect(splitMarkscheme('1. first\n2. second')).toEqual({ '1': 'first', '2': 'second' });
  });
});
