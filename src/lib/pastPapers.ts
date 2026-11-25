/*
 * Loads the past-paper collection from /data/bank.json. The file is produced
 * from the private, git-ignored resources/question-bank/ folder by the
 * dev/localResources.ts plugin; it is absent from builds made without that
 * folder, in which case the collection is simply empty.
 *
 * /data/bank-tags.json (resources/question-bank/tags.json, written by
 * scripts/tag_past_papers.py) proposes a topic for questions the import could
 * not place. It is optional: without it those questions stay untagged.
 */
import { getTopic, type ExamQuestion } from '../content';
import { importedExamQuestionSchema } from '../content/schema';

/** A past-paper question; `autoTagged` marks a topic proposed by scripts/tag_past_papers.py. */
export type PastPaperQuestion = ExamQuestion & { autoTagged?: boolean };

export interface PastPaperBank {
  questions: PastPaperQuestion[];
  /** Rows that failed validation, reported in the UI so a bad import is visible. */
  rejected: number;
  /** Exact duplicates (same subject, session, prompt and markscheme) that were dropped. */
  duplicates: number;
}

export interface TopicTag {
  topic: string;
  confidence: 'high' | 'medium';
}
/** `"<subject>/<question id>"` -> proposed topic. */
export type TopicTags = Record<string, TopicTag>;

/** Images saved next to the imported questions ("img/…") are served from /data/bank/. */
const assets = (md: string) => md.replace(/\]\(img\/([^)\s]+)\)/g, (_m, p: string) => `](/data/bank/${p})`);

/** Keeps only well-formed entries of a tags file; anything else yields an empty map. */
export function parseTopicTags(data: unknown): TopicTags {
  const out: TopicTags = {};
  if (!data || typeof data !== 'object' || Array.isArray(data)) return out;
  for (const [key, v] of Object.entries(data as Record<string, unknown>)) {
    if (!v || typeof v !== 'object') continue;
    const { topic, confidence } = v as Record<string, unknown>;
    if (typeof topic === 'string' && (confidence === 'high' || confidence === 'medium')) out[key] = { topic, confidence };
  }
  return out;
}

/**
 * Where a question belongs. Its own topic wins when that topic exists; otherwise
 * a proposed tag is used if it names an existing topic. A 'high' tag counts as
 * reviewed, a 'medium' one keeps the question flagged for review.
 */
export function resolveTopic(
  subject: string,
  id: string,
  topic: string | null,
  needsReview: boolean | undefined,
  tags: TopicTags,
  topicExists: (key: string) => boolean,
): { topicKey: string | null; needsReview: boolean; autoTagged: boolean } {
  if (topic && topicExists(`${subject}/${topic}`)) return { topicKey: `${subject}/${topic}`, needsReview: !!needsReview, autoTagged: false };
  const tag = tags[`${subject}/${id}`];
  if (tag && topicExists(`${subject}/${tag.topic}`)) {
    return { topicKey: `${subject}/${tag.topic}`, needsReview: tag.confidence !== 'high', autoTagged: true };
  }
  return { topicKey: null, needsReview: true, autoTagged: false };
}

/** Lower-case alphanumerics separated by single spaces: ignores markup, punctuation and layout. */
export function normalisePrompt(text: string | undefined): string {
  return (text ?? '')
    .toLowerCase()
    .replace(/[^0-9a-z]+/g, ' ')
    .trim();
}

/**
 * Drops exact duplicates: the same subject, session, prompt and markscheme
 * (the banks list a question shared by the SL and HL papers once per paper,
 * and some sub-parts twice). The first copy keeps its place; when a later copy
 * is visible at more levels (SL or both, versus HL only) or has a topic where
 * the first has none, it takes that place instead.
 */
export function dedupe<T extends Pick<ExamQuestion, 'subjectId' | 'session' | 'prompt' | 'markscheme' | 'level' | 'topicKey'>>(
  questions: T[],
): { questions: T[]; duplicates: number } {
  const slot = new Map<string, number>();
  const out: T[] = [];
  let duplicates = 0;
  const rank = (q: T) => (q.level === 'HL' ? 0 : 2) + (q.topicKey ? 1 : 0);
  for (const q of questions) {
    const prompt = normalisePrompt(q.prompt);
    if (!prompt) {
      out.push(q);
      continue;
    }
    const key = [q.subjectId, q.session ?? '', prompt, normalisePrompt(q.markscheme)].join('\u0000');
    const at = slot.get(key);
    if (at === undefined) {
      slot.set(key, out.length);
      out.push(q);
      continue;
    }
    duplicates++;
    if (rank(q) > rank(out[at])) out[at] = q;
  }
  return { questions: out, duplicates };
}

async function fetchJson(url: string): Promise<unknown> {
  const res = await fetch(url).catch(() => null);
  if (!res || !res.ok || !res.headers.get('content-type')?.includes('json')) return null;
  return res.json().catch(() => null);
}

let cache: Promise<PastPaperBank> | null = null;

export function loadPastPapers(): Promise<PastPaperBank> {
  cache ??= (async () => {
    const [rows, tagData] = await Promise.all([fetchJson('/data/bank.json'), fetchJson('/data/bank-tags.json')]);
    if (!Array.isArray(rows)) return { questions: [], rejected: 0, duplicates: 0 };
    const tags = parseTopicTags(tagData);
    const exists = (key: string) => !!getTopic(key);
    const questions: PastPaperQuestion[] = [];
    let rejected = 0;
    for (const row of rows) {
      const parsed = importedExamQuestionSchema.safeParse(row);
      if (!parsed.success) {
        rejected++;
        continue;
      }
      const { subject, topic, sourceFile, page, ...raw } = parsed.data;
      const q = { ...raw, prompt: assets(raw.prompt), markscheme: assets(raw.markscheme), options: raw.options?.map(assets) };
      const placed = resolveTopic(subject, q.id, topic, q.needsReview, tags, exists);
      const originalUrl = sourceFile ? `/data/papers/${sourceFile.split('/').map(encodeURIComponent).join('/')}${page ? `#page=${page}` : ''}` : undefined;
      questions.push({
        ...q,
        key: `pp/${subject}/${q.id}`,
        subjectId: subject,
        topicKey: placed.topicKey,
        needsReview: placed.needsReview,
        ...(placed.autoTagged ? { autoTagged: true } : {}),
        originalUrl,
      });
    }
    const unique = dedupe(questions);
    return { questions: unique.questions, rejected, duplicates: unique.duplicates };
  })();
  return cache;
}
