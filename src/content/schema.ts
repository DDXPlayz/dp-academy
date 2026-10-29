import { z } from 'zod';

/*
 * The content schema. Everything under /content is validated against these
 * shapes at load time and by `npm run content:check`, so a malformed file
 * fails loudly instead of rendering a broken page.
 */

const slug = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'use lowercase-kebab-case');

export const topicSchema = z.object({
  id: slug,
  code: z.string(),
  title: z.string(),
  summary: z.string(),
  hours: z.number().positive(),
  hl: z.boolean().default(false),
});

export const unitSchema = z.object({
  id: slug,
  code: z.string(),
  title: z.string(),
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

export type SubjectFile = z.infer<typeof subjectSchema>;
export type TopicFile = z.infer<typeof topicSchema>;
export type LessonMeta = z.infer<typeof lessonMetaSchema>;
export type Formula = z.infer<typeof formulaSchema>;
export type Definition = z.infer<typeof definitionSchema>;
export type Question = z.infer<typeof questionSchema>;
export type QuestionType = Question['type'];
export type FlashcardFile = z.infer<typeof flashcardSchema>;
