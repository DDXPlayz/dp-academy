/*
 * Development-only: lessons converted from private revision notes
 * (scripts/extract_notes.py → resources/extracted/). Imported only behind
 * `import.meta.env.DEV`, so production builds contain none of this.
 */

export interface LocalLesson {
  file: string; // "<topicId>/<slug>.md", relative to the subject folder
  slug: string;
  title: string;
  source: 'sme' | 'iitian';
  order: number;
  group: string;
  chars: number;
}

type LocalIndex = Record<string, Record<string, LocalLesson[]>>;

let index: Promise<LocalIndex> | null = null;
export function loadIndex(): Promise<LocalIndex> {
  index ??= fetch('/__local/lessons/index.json')
    .then((r) => (r.ok ? (r.json() as Promise<LocalIndex>) : {}))
    .catch(() => ({}));
  return index;
}

export async function topicLessons(subjectId: string, topicId: string): Promise<LocalLesson[]> {
  return (await loadIndex())[subjectId]?.[topicId] ?? [];
}

/** Resolves "a/b/../c" without touching the network. */
function joinPath(base: string, rel: string): string {
  const parts = base.split('/').slice(0, -1);
  for (const seg of rel.split('/')) {
    if (seg === '..') parts.pop();
    else if (seg && seg !== '.') parts.push(seg);
  }
  return parts.join('/');
}

/** Loads a lesson's Markdown and points its images at the dev server. */
export async function loadLessonMarkdown(subjectId: string, lesson: LocalLesson): Promise<string> {
  const filePath = `${subjectId}/${lesson.file}`;
  const res = await fetch(`/__local/lessons/md?path=${encodeURIComponent(filePath)}`);
  if (!res.ok) throw new Error(`Could not load ${lesson.title}`);
  const md = await res.text();
  return md.replace(/\]\(((?:\.\.\/|\.\/)?[^)\s#]+\.(?:png|jpe?g|svg))(#[^)]*)?\)/g, (_m, rel: string, frag = '') => {
    const p = joinPath(filePath, rel);
    return `](/__local/lessons/asset?path=${encodeURIComponent(p)}${frag})`;
  });
}

export const SOURCE_LABEL: Record<LocalLesson['source'], string> = { sme: 'Revision notes', iitian: 'Study notes' };

export const lessonKey = (subjectId: string, topicId: string, slug: string) => `local/${subjectId}/${topicId}/${slug}`;
