/*
 * Development-only: adds lessons converted from private notes to global search.
 * Imported only behind `import.meta.env.DEV`.
 */
import { getSubject, getTopic } from '../content';
import { addDocs, type SearchDoc } from './search';

interface Entry {
  subject: string;
  topic: string;
  slug: string;
  title: string;
  text: string;
}

let loaded: Promise<number> | null = null;

/** Resolves to the number of documents added (0 if none or already loaded). */
export function loadLocalSearch(): Promise<number> {
  if (loaded) return loaded.then(() => 0);
  loaded = fetch('/__local/lessons/search.json')
    .then((r) => (r.ok ? (r.json() as Promise<Entry[]>) : []))
    .then((entries) => {
      const docs: SearchDoc[] = [];
      for (const e of entries) {
        const subject = getSubject(e.subject);
        const topic = getTopic(`${e.subject}/${e.topic}`);
        if (!subject || !topic) continue;
        docs.push({
          id: `local:${e.subject}/${e.topic}/${e.slug}`,
          kind: 'lesson',
          title: e.title,
          text: e.text,
          subject: subject.short,
          context: `${topic.code} ${topic.title}`,
          href: `/s/${e.subject}/${e.topic}/notes/${e.slug}`,
        });
      }
      addDocs(docs);
      return docs.length;
    })
    .catch(() => 0);
  return loaded;
}
