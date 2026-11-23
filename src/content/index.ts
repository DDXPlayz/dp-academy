import { parse as parseYaml } from 'yaml';
import type { ZodType } from 'zod';
import {
  flashcardSchema,
  lessonMetaSchema,
  questionSchema,
  subjectSchema,
  type FlashcardFile,
  type LessonMeta,
  type Question,
  type SubjectFile,
  type TopicFile,
} from './schema';

/*
 * Loads every file under /content at build time (Vite inlines the globs) and
 * assembles the curriculum graph the app reads from. Layout on disk:
 *
 *   content/<subject>/subject.json
 *   content/<subject>/<topic>/lessons/<nn>-<slug>.md
 *   content/<subject>/<topic>/questions.json
 *   content/<subject>/<topic>/flashcards.json
 */

export interface Lesson {
  key: string;
  slug: string;
  order: number;
  subjectId: string;
  topicKey: string;
  href: string;
  meta: LessonMeta;
  body: string;
}

export type PracticeQuestion = Question & { key: string; topicKey: string; subjectId: string };
export type Flashcard = FlashcardFile & { key: string; topicKey: string; subjectId: string };

export interface Topic extends TopicFile {
  key: string;
  subjectId: string;
  unitId: string;
  unitCode: string;
  href: string;
  lessons: Lesson[];
  questions: PracticeQuestion[];
  flashcards: Flashcard[];
}

export interface Unit {
  id: string;
  code: string;
  title: string;
  subjectId: string;
  topics: Topic[];
}

export interface Subject extends Omit<SubjectFile, 'units'> {
  href: string;
  units: Unit[];
  topics: Topic[];
}

const subjectFiles = import.meta.glob<unknown>('/content/*/subject.json', { eager: true, import: 'default' });
const lessonFiles = import.meta.glob<string>('/content/*/*/lessons/*.md', { eager: true, query: '?raw', import: 'default' });
const questionFiles = import.meta.glob<unknown>('/content/*/*/questions.json', { eager: true, import: 'default' });
const cardFiles = import.meta.glob<unknown>('/content/*/*/flashcards.json', { eager: true, import: 'default' });

export const contentErrors: string[] = [];

function check<T>(schema: ZodType<T, any, any>, data: unknown, where: string): T | null {
  const result = schema.safeParse(data);
  if (result.success) return result.data;
  for (const issue of result.error.issues) {
    contentErrors.push(`${where}: ${issue.path.join('.') || '(root)'} — ${issue.message}`);
  }
  return null;
}

function splitFrontmatter(raw: string): { data: unknown; body: string } {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!m) return { data: null, body: raw };
  return { data: parseYaml(m[1]), body: m[2] };
}

/** Splits "/content/physics/a1-kinematics/lessons/01-motion.md" into its parts. */
function parts(path: string) {
  const seg = path.split('/');
  return { subjectId: seg[2], topicId: seg[3], file: seg[seg.length - 1] };
}

const subjects: Subject[] = [];
const topicByKey = new Map<string, Topic>();
const lessonByKey = new Map<string, Lesson>();
const questionByKey = new Map<string, PracticeQuestion>();
const cardByKey = new Map<string, Flashcard>();

for (const [path, data] of Object.entries(subjectFiles)) {
  const file = check(subjectSchema, data, path);
  if (!file) continue;
  if (file.id !== parts(path).subjectId) {
    contentErrors.push(`${path}: id "${file.id}" does not match its folder`);
  }
  const subject: Subject = { ...file, href: `/s/${file.id}`, units: [], topics: [] };
  for (const u of file.units) {
    const unit: Unit = { id: u.id, code: u.code, title: u.title, subjectId: file.id, topics: [] };
    for (const t of u.topics) {
      const key = `${file.id}/${t.id}`;
      if (topicByKey.has(key)) contentErrors.push(`${path}: duplicate topic id "${t.id}"`);
      const topic: Topic = {
        ...t,
        key,
        subjectId: file.id,
        unitId: u.id,
        unitCode: u.code,
        href: `/s/${file.id}/${t.id}`,
        lessons: [],
        questions: [],
        flashcards: [],
      };
      unit.topics.push(topic);
      subject.topics.push(topic);
      topicByKey.set(key, topic);
    }
    subject.units.push(unit);
  }
  subjects.push(subject);
}

const SUBJECT_ORDER = ['physics', 'chemistry', 'math-aa'];
subjects.sort((a, b) => {
  const ia = SUBJECT_ORDER.indexOf(a.id);
  const ib = SUBJECT_ORDER.indexOf(b.id);
  return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.title.localeCompare(b.title);
});

function topicFor(path: string): Topic | undefined {
  const { subjectId, topicId } = parts(path);
  const topic = topicByKey.get(`${subjectId}/${topicId}`);
  if (!topic) contentErrors.push(`${path}: folder "${topicId}" is not a topic in ${subjectId}/subject.json`);
  return topic;
}

for (const [path, raw] of Object.entries(lessonFiles)) {
  const topic = topicFor(path);
  if (!topic) continue;
  const m = /^(\d+)-([a-z0-9-]+)\.md$/.exec(parts(path).file);
  if (!m) {
    contentErrors.push(`${path}: lesson files are named "<nn>-<slug>.md"`);
    continue;
  }
  const { data, body } = splitFrontmatter(raw);
  const meta = check(lessonMetaSchema, data, path);
  if (!meta) continue;
  const slug = m[2];
  const lesson: Lesson = {
    key: `${topic.key}/${slug}`,
    slug,
    order: Number(m[1]),
    subjectId: topic.subjectId,
    topicKey: topic.key,
    href: `${topic.href}/${slug}`,
    meta,
    body,
  };
  topic.lessons.push(lesson);
  lessonByKey.set(lesson.key, lesson);
}

for (const [path, data] of Object.entries(questionFiles)) {
  const topic = topicFor(path);
  if (!topic || !Array.isArray(data)) {
    if (topic) contentErrors.push(`${path}: expected an array of questions`);
    continue;
  }
  data.forEach((item, i) => {
    const q = check(questionSchema, item, `${path}[${i}]`);
    if (!q) return;
    const key = `${topic.key}/${q.id}`;
    if (questionByKey.has(key)) contentErrors.push(`${path}: duplicate question id "${q.id}"`);
    if ((q.type === 'mcq' && q.answer >= q.options.length) ||
        (q.type === 'multi' && q.answers.some((a) => a >= q.options.length))) {
      contentErrors.push(`${path}: "${q.id}" answer index is out of range`);
    }
    const pq: PracticeQuestion = { ...q, key, topicKey: topic.key, subjectId: topic.subjectId };
    topic.questions.push(pq);
    questionByKey.set(key, pq);
  });
}

for (const [path, data] of Object.entries(cardFiles)) {
  const topic = topicFor(path);
  if (!topic || !Array.isArray(data)) {
    if (topic) contentErrors.push(`${path}: expected an array of flashcards`);
    continue;
  }
  data.forEach((item, i) => {
    const c = check(flashcardSchema, item, `${path}[${i}]`);
    if (!c) return;
    const key = `${topic.key}/${c.id}`;
    if (cardByKey.has(key)) contentErrors.push(`${path}: duplicate flashcard id "${c.id}"`);
    const card: Flashcard = { ...c, key, topicKey: topic.key, subjectId: topic.subjectId };
    topic.flashcards.push(card);
    cardByKey.set(key, card);
  });
}

// Cross-references, checked once everything is loaded.
for (const topic of topicByKey.values()) {
  topic.lessons.sort((a, b) => a.order - b.order);
  for (const lesson of topic.lessons) {
    for (const rel of lesson.meta.related) {
      if (!topicByKey.has(rel)) contentErrors.push(`${lesson.key}: related topic "${rel}" does not exist`);
    }
    for (const m of lesson.body.matchAll(/```question\s*\n\s*([a-z0-9-]+)\s*\n```/g)) {
      if (!questionByKey.has(`${topic.key}/${m[1]}`)) {
        contentErrors.push(`${lesson.key}: embedded question "${m[1]}" does not exist`);
      }
    }
  }
  for (const q of topic.questions) {
    if (q.lesson && !lessonByKey.has(`${topic.key}/${q.lesson}`)) {
      contentErrors.push(`${q.key}: lesson "${q.lesson}" does not exist`);
    }
  }
}

if (import.meta.env.DEV && contentErrors.length) {
  console.error(`[content] ${contentErrors.length} problem(s):\n` + contentErrors.join('\n'));
}

/** Every lesson in curriculum order, used for "next lesson" suggestions. */
export const allLessons: Lesson[] = subjects.flatMap((s) => s.topics.flatMap((t) => t.lessons));

export { subjects };
export const getSubject = (id: string) => subjects.find((s) => s.id === id);
export const getTopic = (key: string) => topicByKey.get(key);
export const getLesson = (key: string) => lessonByKey.get(key);
export const getQuestion = (key: string) => questionByKey.get(key);
export const getFlashcard = (key: string) => cardByKey.get(key);
export const allTopics = () => [...topicByKey.values()];
export const allQuestions = () => [...questionByKey.values()];
export const allFlashcards = () => [...cardByKey.values()];

/** Neighbouring lessons within the same subject, crossing topic boundaries. */
export function lessonNeighbours(lesson: Lesson) {
  const list = allLessons.filter((l) => l.subjectId === lesson.subjectId);
  const i = list.findIndex((l) => l.key === lesson.key);
  return { prev: list[i - 1], next: list[i + 1] };
}

export function topicOf(item: { topicKey: string }) {
  return topicByKey.get(item.topicKey)!;
}
