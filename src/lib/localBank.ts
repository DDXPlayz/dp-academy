/*
 * Development-only: loads past-paper and mock questions imported into the
 * git-ignored resources/question-bank/ folder (see scripts/import-papers.ts).
 * Only ever imported behind `import.meta.env.DEV`, so it is absent from
 * production builds.
 */
import { getTopic, type ExamQuestion } from '../content';
import { importedExamQuestionSchema } from '../content/schema';

export interface LocalBank {
  questions: ExamQuestion[];
  /** Rows that failed validation, reported in the UI so a bad import is visible. */
  rejected: number;
}

export async function loadLocalBank(): Promise<LocalBank> {
  const res = await fetch('/__local/bank/index.json').catch(() => null);
  if (!res || !res.ok) return { questions: [], rejected: 0 };
  const rows: unknown[] = await res.json();
  const questions: ExamQuestion[] = [];
  let rejected = 0;
  for (const row of rows) {
    const parsed = importedExamQuestionSchema.safeParse(row);
    if (!parsed.success) {
      rejected++;
      continue;
    }
    const { subject, topic, sourceFile, ...q } = parsed.data;
    const topicKey = topic && getTopic(`${subject}/${topic}`) ? `${subject}/${topic}` : null;
    const originalUrl = sourceFile ? `/__local/notes/file?src=papers&path=${encodeURIComponent(sourceFile)}` : undefined;
    questions.push({ ...q, key: `local/${subject}/${q.id}`, subjectId: subject, topicKey, needsReview: q.needsReview || !topicKey, originalUrl });
  }
  return { questions, rejected };
}
