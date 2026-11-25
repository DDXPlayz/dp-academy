import { z } from 'zod';

/*
 * The content schema. Everything under /content is validated against these
 * shapes at load time and by `npm run content:check`, so a malformed file
 * fails loudly instead of rendering a broken page.
 */

const slug = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'use lowercase-kebab-case');

/** A CBSE (NCERT) chapter that covers the same ground, with an optional video link. */
export const cbseSchema = z.object({
  class: z.union([z.literal(11), z.literal(12)]),
  chapter: z.string(),
  video: z.string().url().optional(),
  note: z.string().optional(),
});

export const topicSchema = z.object({
  id: slug,
  code: z.string(),
  title: z.string(),
  summary: z.string(),
  /** Teaching hours from the guide; omitted where the guide only gives hours per unit (Math AA). */
  hours: z.number().positive().optional(),
  hl: z.boolean().default(false),
  cbse: z.array(cbseSchema).default([]),
});

export const unitSchema = z.object({
  id: slug,
  code: z.string(),
  title: z.string(),
  cbse: z.array(cbseSchema).default([]),
  topics: z.array(topicSchema).min(1),
});

export const subjectSchema = z.object({
  id: slug,
  title: z.string(),
  short: z.string(),
  group: z.string(),
  levels: z.array(z.enum(['SL', 'HL'])).min(1),
  description: z.string(),
  colour: z.string().regex(/^#[0-9a-f]{6}$/i),
  units: z.array(unitSchema).min(1),
});

export const formulaSchema = z.object({
  name: z.string(),
  latex: z.string(),
  where: z.string().optional(),
});

export const definitionSchema = z.object({
  term: z.string(),
  definition: z.string(),
});

export const lessonMetaSchema = z.object({
  /** Syllabus sub-idea code, e.g. "A.1.3". */
  code: z.string().optional(),
  title: z.string(),
  summary: z.string(),
  minutes: z.number().int().positive(),
  difficulty: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  hl: z.boolean().default(false),
  objectives: z.array(z.string()).min(1),
  prerequisites: z.array(z.string()).default([]),
  formulas: z.array(formulaSchema).default([]),
  definitions: z.array(definitionSchema).default([]),
  mistakes: z.array(z.string()).default([]),
  tips: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
});

const questionBase = z.object({
  id: slug,
  prompt: z.string(),
  explanation: z.string(),
  concept: z.string(),
  difficulty: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  lesson: z.string().optional(),
});

export const questionSchema = z.discriminatedUnion('type', [
  questionBase.extend({
    type: z.literal('mcq'),
    options: z.array(z.string()).min(2),
    answer: z.number().int().nonnegative(),
  }),
  questionBase.extend({
    type: z.literal('multi'),
    options: z.array(z.string()).min(2),
    answers: z.array(z.number().int().nonnegative()).min(1),
  }),
  questionBase.extend({
    type: z.literal('tf'),
    answer: z.boolean(),
  }),
  questionBase.extend({
    type: z.literal('numeric'),
    answer: z.number(),
    /** Accepted relative error, e.g. 0.02 for ±2 %. */
    tolerance: z.number().nonnegative().default(0.02),
    unit: z.string().optional(),
  }),
  questionBase.extend({
    type: z.literal('short'),
    accept: z.array(z.string()).min(1),
  }),
  questionBase.extend({
    type: z.literal('expression'),
    variables: z.array(z.string()).min(1),
    answer: z.string(),
  }),
]);

export const flashcardSchema = z.object({
  id: slug,
  front: z.string(),
  back: z.string(),
  concept: z.string().optional(),
});

/** Papers per subject: 2025 sciences (1A multiple choice, 1B data-based, 2) and Math AA 2021 (1, 2, 3). */
export const PAPERS: Record<string, readonly string[]> = {
  physics: ['1A', '1B', '2'],
  chemistry: ['1A', '1B', '2'],
  'math-aa': ['1', '2', '3'],
};

export const examDifficulty = z.enum(['easy', 'medium', 'hard']);
export const examSource = z.enum(['original', 'past-paper', 'mock']);

/**
 * An exam-style question for the question bank. Committed files under
 * content/ may only hold `original` questions; past-paper and mock questions
 * live in the git-ignored resources/question-bank/ folder and are loaded in
 * local development only.
 */
export const examQuestionSchema = z
  .object({
    id: slug,
    paper: z.string(),
    level: z.enum(['SL', 'HL']).optional(), // omitted = both levels
    difficulty: examDifficulty,
    source: examSource,
    /** Exam session for past papers, e.g. "May 2024 TZ2" or "Specimen 2025". */
    session: z.string().optional(),
    /** Question number in the original paper, e.g. "3(b)". */
    number: z.string().optional(),
    marks: z.number().int().positive(),
    /** Guide subtopic or understanding this targets, e.g. "A.1.3" or "5.12". */
    subtopic: z.string().optional(),
    /** The single idea a general-bank question tests, in a few words, e.g. "Distance vs displacement". */
    concept: z.string().optional(),
    calculator: z.boolean().optional(),
    prompt: z.string().min(1),
    /** Multiple-choice options (paper 1A); `answer` is the correct index. */
    options: z.array(z.string()).min(2).optional(),
    answer: z.number().int().nonnegative().optional(),
    markscheme: z.string().min(1),
  })
  .refine((q) => !q.options || (q.answer !== undefined && q.answer < q.options.length), {
    message: 'multiple-choice questions need an answer index within the options',
    path: ['answer'],
  });

/** Locally imported questions also say which subject and topic they belong to. */
export const importedExamQuestionSchema = examQuestionSchema.and(
  z.object({
    subject: z.string(),
    topic: z.string().nullable(),
    needsReview: z.boolean().optional(),
    /** Original PDF, relative to resources/past-papers/, so the page with its diagrams can be opened. */
    sourceFile: z.string().optional(),
    /** Page of the original PDF where the question starts. */
    page: z.number().int().positive().optional(),
  }),
);

export type ExamQuestionFile = z.infer<typeof examQuestionSchema>;
export type ImportedExamQuestion = z.infer<typeof importedExamQuestionSchema>;
export type ExamDifficulty = z.infer<typeof examDifficulty>;
export type ExamSource = z.infer<typeof examSource>;

export type CbseLink = z.infer<typeof cbseSchema>;
export type SubjectFile = z.infer<typeof subjectSchema>;
export type TopicFile = z.infer<typeof topicSchema>;
export type LessonMeta = z.infer<typeof lessonMetaSchema>;
export type Formula = z.infer<typeof formulaSchema>;
export type Definition = z.infer<typeof definitionSchema>;
export type Question = z.infer<typeof questionSchema>;
export type QuestionType = Question['type'];
export type FlashcardFile = z.infer<typeof flashcardSchema>;
