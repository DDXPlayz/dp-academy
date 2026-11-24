/*
 * Loads the past-paper collection from /data/bank.json. The file is produced
 * from the private, git-ignored resources/question-bank/ folder by the
 * dev/localResources.ts plugin; it is absent from builds made without that
 * folder, in which case the collection is simply empty.
 */
import { getTopic, type ExamQuestion } from '../content';
import { importedExamQuestionSchema } from '../content/schema';

export interface PastPaperBank {
  questions: ExamQuestion[];
  /** Rows that failed validation, reported in the UI so a bad import is visible. */
  rejected: number;
}

/** Images saved next to the imported questions ("img/…") are served from /data/bank/. */
const assets = (md: string) => md.replace(/\]\(img\/([^)\s]+)\)/g, (_m, p: string) => `](/data/bank/${p})`);

let cache: Promise<PastPaperBank> | null = null;

export function loadPastPapers(): Promise<PastPaperBank> {
  cache ??= (async () => {
    const res = await fetch('/data/bank.json').catch(() => null);
    if (!res || !res.ok || !res.headers.get('content-type')?.includes('json')) return { questions: [], rejected: 0 };
    const rows: unknown[] = await res.json();
    const questions: ExamQuestion[] = [];
    let rejected = 0;
    for (const row of rows) {
      const parsed = importedExamQuestionSchema.safeParse(row);
      if (!parsed.success) {
        rejected++;
        continue;
      }
      const { subject, topic, sourceFile, page, ...raw } = parsed.data;
      const q = { ...raw, prompt: assets(raw.prompt), markscheme: assets(raw.markscheme), options: raw.options?.map(assets) };
      const topicKey = topic && getTopic(`${subject}/${topic}`) ? `${subject}/${topic}` : null;
      const originalUrl = sourceFile ? `/data/papers/${sourceFile.split('/').map(encodeURIComponent).join('/')}${page ? `#page=${page}` : ''}` : undefined;
      questions.push({ ...q, key: `pp/${subject}/${q.id}`, subjectId: subject, topicKey, needsReview: q.needsReview || !topicKey, originalUrl });
    }
    return { questions, rejected };
  })();
  return cache;
}
