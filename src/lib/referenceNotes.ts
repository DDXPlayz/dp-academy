import { useEffect, useState } from 'react';

/*
 * Reference notes: the Save My Exams and IITian Academy notes for each topic,
 * cleaned up by scripts/build_reference_notes.py. They are private (never in
 * the repository): the dev server serves them from resources/extracted/_site,
 * and `vite build` copies them into dist/data/notes/_site. On a build without
 * them every loader here resolves to null and the UI simply hides the links.
 */

export type NoteSource = 'sme' | 'iitian';

export const NOTE_SOURCES: { id: NoteSource; name: string; short: string }[] = [
  { id: 'sme', name: 'Save My Exams', short: 'SME' },
  { id: 'iitian', name: 'IITian Academy', short: 'IITian' },
];

export const sourceName = (s: NoteSource) => NOTE_SOURCES.find((x) => x.id === s)?.name ?? s;

export type NoteEntry = { id: string; title: string };
export type ReferenceNote = NoteEntry & { body: string };

type TopicSources = Partial<Record<NoteSource, NoteEntry[]>>;
export type NotesIndex = {
  topics: Record<string, TopicSources>; // "physics/a1-kinematics" -> sources
  lessons: Record<string, Partial<Record<NoteSource, string[]>>>; // lesson key -> best matching note ids
};

const BASE = '/data/notes/_site';

async function getJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url);
    if (!res.ok || !res.headers.get('content-type')?.includes('json')) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

let indexPromise: Promise<NotesIndex | null> | null = null;

export function loadNotesIndex(): Promise<NotesIndex | null> {
  indexPromise ??= getJson<Record<string, unknown>>(`${BASE}/index.json`).then((raw) => {
    if (!raw) return null;
    const topics: NotesIndex['topics'] = {};
    for (const [subject, value] of Object.entries(raw)) {
      if (subject === '_lessons') continue;
      for (const [topic, sources] of Object.entries(value as Record<string, TopicSources>)) topics[`${subject}/${topic}`] = sources;
    }
    return { topics, lessons: (raw._lessons as NotesIndex['lessons']) ?? {} };
  });
  return indexPromise;
}

const noteCache = new Map<string, Promise<ReferenceNote[] | null>>();

/** All notes of one source for a topic ("physics/a1-kinematics"), in reading order. */
export function loadTopicNotes(topicKey: string, source: NoteSource): Promise<ReferenceNote[] | null> {
  const key = `${topicKey}/${source}`;
  let p = noteCache.get(key);
  if (!p) {
    p = getJson<ReferenceNote[]>(`${BASE}/${topicKey}/${source}.json`);
    noteCache.set(key, p);
  }
  return p;
}

export function useNotesIndex(): NotesIndex | null | undefined {
  const [index, setIndex] = useState<NotesIndex | null | undefined>(undefined);
  useEffect(() => {
    let live = true;
    loadNotesIndex().then((i) => live && setIndex(i));
    return () => {
      live = false;
    };
  }, []);
  return index;
}

/** undefined while loading, null when unavailable. */
export function useTopicNotes(topicKey: string, source: NoteSource): ReferenceNote[] | null | undefined {
  const [state, setState] = useState<{ key: string; notes: ReferenceNote[] | null } | null>(null);
  const key = `${topicKey}/${source}`;
  useEffect(() => {
    let live = true;
    loadTopicNotes(topicKey, source).then((notes) => live && setState({ key, notes }));
    return () => {
      live = false;
    };
  }, [topicKey, source, key]);
  return state?.key === key ? state.notes : undefined;
}
