/*
 * Pure helpers behind the local-only "Reference notes" feature. They turn the
 * private notes index (a CSV kept in the git-ignored resources/ folder) into a
 * per-topic listing. Nothing here ships in the production bundle: it is only
 * imported by the dev-server plugin in vite.config.ts and by tests.
 */
import path from 'node:path';

export type NoteSource = 'iitian' | 'sme';

export interface NoteItem {
  /** Short readable title derived from the file name. */
  title: string;
  /** Path relative to the source folder, always with forward slashes. */
  file: string;
  source: NoteSource;
  /** IB guide code of the topic the file was filed under, e.g. "S1.4". */
  code: string;
  /** Sub-number within the topic (s1-4-3 → 3), or null for an overview page. */
  sub: number | null;
  legacy: boolean;
}

export interface TopicNotes {
  current: NoteItem[];
  legacy: NoteItem[];
}

export interface SubjectNotes {
  topics: Record<string, TopicNotes>;
  /** Files that could not be placed under an app topic, kept for reporting. */
  unmapped: NoteItem[];
}

export type NotesIndex = Record<string, SubjectNotes>;

/** RFC 4180 CSV parser: quoted fields, doubled quotes, CRLF or LF. */
export function parseCsv(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;
  const src = text.replace(/^﻿/, '');
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (quoted) {
      if (c === '"' && src[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && src[i + 1] === '\n') i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else field += c;
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  const [header, ...body] = rows.filter((r) => r.some((f) => f.trim()));
  if (!header) return [];
  return body.map((r) => Object.fromEntries(header.map((h, i) => [h.trim(), (r[i] ?? '').trim()])));
}

export const SUBJECT_IDS: Record<string, string> = {
  physics: 'physics',
  chemistry: 'chemistry',
  'mathematics aa': 'math-aa',
  'math aa': 'math-aa',
};

/** "S1.4" → "s1-4", "A.1" → "a-1", "1.12" → "1-12". */
export const codeSlug = (code: string) => code.toLowerCase().replace(/\./g, '-');

/** Sub-number of a file within its topic, or null for an overview page. */
export function subNumber(fileName: string, code: string): number | null {
  const base = path.posix.basename(fileName.replace(/\\/g, '/')).replace(/\.pdf$/i, '');
  const name = base.replace(/^[^ ]+ - /, '').toLowerCase();
  const slug = codeSlug(code);
  // Chemistry and new Physics: "...-s1-4-3-molar-mass..." / "...-a-1-2-..."
  const direct = new RegExp(`(?:^|-)${slug}-(\\d+)(?=-|$)`).exec(name);
  if (direct) return Number(direct[1]);
  // Physics 2025: "ibdp-physics-2025-slhl-1-3-graphs-of-motion"
  const physics = /slhl-(\d+)-(\d+)(?=-)/.exec(name);
  if (physics) return Number(physics[2]);
  return null;
}

const NOISE = new Set([
  'ib', 'dp', 'ibdp', 'chemistry', 'physics', 'math', 'maths', 'mathematics', 'aa', 'hl', 'sl', 'slhl', 'ahl',
  'topic', 'unit', 'and', 'the', 'new', 'syllabus', 'study', 'notes', 'note', 'first', 'assessment', '2025',
]);
const LEADING_NOISE = new Set([...NOISE].filter((w) => w !== 'and' && w !== 'the'));

const TRAILING_NOISE = new Set(['study', 'notes', 'note', 'new', 'syllabus', 'first', 'assessment', '2025', '2021']);
const SUBJECT_WORDS = new Set(['physics', 'chemistry', 'math', 'maths', 'mathematics']);

/**
 * Short readable title from a notes file name.
 * @param strip phrases to remove, e.g. the old-syllabus topic name ("Mechanics")
 */
export function shortTitle(fileName: string, code: string, topicTitle = '', strip: string[] = []): string {
  const base = path.posix.basename(fileName.replace(/\\/g, '/')).replace(/\.pdf$/i, '');
  const joined = base
    .replace(/^[^ ]+ - /, '')
    .toLowerCase()
    .replace(/([a-z]{3,})(\d)/g, '$1 $2')
    .replace(/[-_/ ]+/g, ' ');
  let words = joined.split(' ').filter(Boolean);
  // Old-syllabus names carry their own numbering ("…-topic-1-…-1-2-the-mole-concept"): keep what follows it.
  let cut = false;
  for (let i = words.length - 2; i >= 0; i--) {
    if (/^\d+$/.test(words[i]) && /^\d+$/.test(words[i + 1]) && i + 2 < words.length) {
      words = words.slice(i + 2);
      cut = true;
      break;
    }
  }
  if (!cut) {
    let rest = ` ${words.join(' ')} `;
    for (const phrase of strip) {
      const p = phrase.toLowerCase().replace(/\(.*?\)/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
      if (p && rest.replace(` ${p} `, ' ').trim()) rest = rest.replace(` ${p} `, ' ');
    }
    words = rest.split(' ').filter(Boolean);
  }
  const slugWords = codeSlug(code).split('-');
  // Drop leading noise and code tokens ("ib-dp-chemistry-s1-4-3-…").
  while (words.length && (LEADING_NOISE.has(words[0]) || /^\d+$/.test(words[0]) || slugWords.includes(words[0]) || /^[a-z]\d?$/.test(words[0]))) {
    words.shift();
  }
  // Drop trailing noise ("…-study-notes-first-assessment-2025", "…-ib-dp-physics-study-notes").
  while (words.length && TRAILING_NOISE.has(words[words.length - 1])) words.pop();
  if (words.length && SUBJECT_WORDS.has(words[words.length - 1])) {
    const before = words.slice(0, -1);
    if (['ib', 'dp', 'ibdp'].includes(before[before.length - 1])) {
      words = before;
      while (words.length && ['ib', 'dp', 'ibdp'].includes(words[words.length - 1])) words.pop();
    }
  }
  while (words.length && /^\d+$/.test(words[words.length - 1])) words.pop();
  const text = words.join(' ').replace(/\s+/g, ' ').trim();
  if (!text || text === codeSlug(code).replace(/-/g, ' ')) return topicTitle ? `${topicTitle}: overview` : 'Overview';
  // A file that just names the topic is the overview page.
  if (topicTitle && text.replace(/[^a-z0-9]/g, '') === topicTitle.toLowerCase().replace(/[^a-z0-9]/g, '')) {
    return `${topicTitle}: overview`;
  }
  return text[0].toUpperCase() + text.slice(1);
}

/** Overview pages first, then by sub-number, then by title. */
export function sortNotes(items: NoteItem[]): NoteItem[] {
  return [...items].sort(
    (a, b) =>
      (a.sub === null ? -1 : a.sub) - (b.sub === null ? -1 : b.sub) ||
      Number(b.title.endsWith('overview')) - Number(a.title.endsWith('overview')) ||
      a.title.localeCompare(b.title),
  );
}

/*
 * Old-syllabus (2016 science) notes are placed under the 2025 topic that now
 * covers the idea. Rules are matched against the file slug, first match wins.
 */
export const LEGACY_RULES: Record<string, [RegExp, string[]][]> = {
  chemistry: [
    [/particulate-nature/, ['S1.1']],
    [/mole-concept|unit-1-stoichiometric/, ['S1.4']],
    [/reacting-masses/, ['R2.1']],
    [/fundamentals-of-organic|stereoisomerism|spectroscopic/, ['S3.2']],
    [/functional-group-chemistry|types-of-organic-reactions|synthetic-routes/, ['R3.4']],
    [/transition-metals|coloured-complexes|periodic-table|periodic-trends/, ['S3.1']],
    [/ahl-topic-12-atomic-structure/, ['S1.3']],
    [/electron-domain|hybridization|covalent-bonding|covalent-structures|intermolecular/, ['S2.2']],
    [/ionic-bonding/, ['S2.1']],
    [/metallic-bonding/, ['S2.3']],
    [/measuring-energy/, ['R1.1']],
    [/energy-cycles|hesss-law|bond-enthalpies/, ['R1.2']],
    [/entropy/, ['R1.4']],
    [/rate-expression|activation-energy|collision-theory/, ['R2.2']],
    [/equilibrium/, ['R2.3']],
    [/lewis-acids/, ['R3.4']],
    [/acids-and-bases|ph-scale|ph-curves|acid-deposition|acids-and-bases/, ['R3.1']],
    [/electrochemical-cells|oxidation-and-reduction/, ['R3.2']],
  ],
  physics: [
    [/forces-dynamics|momentum-and-impulse|circular-motion/, ['A.2']],
    [/mechanics-motion/, ['A.1']],
    [/work-energy-and-power/, ['A.3']],
    [/modelling-a-gas/, ['B.3']],
    [/thermal-concepts/, ['B.1']],
    [/thermal-energy-transfer/, ['B.2']],
    [/electric-fields|heating-effect|electric-cells/, ['B.5']],
    [/simple-harmonic|oscillations/, ['C.1']],
    [/wave-motion/, ['C.2']],
    [/wave-characteristics|wave-behavior|diffraction-interference|interference|resolution/, ['C.3']],
    [/standing-waves/, ['C.4']],
    [/doppler/, ['C.5']],
    [/newtons-law-of-gravitation/, ['D.1']],
    [/magnetic-effects/, ['D.2']],
    [/electromagnetic-induction/, ['D.4']],
    [/structure-of-matter|discrete-energy/, ['E.1']],
    [/interaction-of-matter-with-radiation/, ['E.2']],
    [/nuclear-physics|nuclear-reactions/, ['E.3']],
    [/energy-sources/, ['E.4']],
  ],
};

export function legacyTargets(subjectId: string, fileName: string): string[] {
  const name = path.posix.basename(fileName.replace(/\\/g, '/')).toLowerCase();
  for (const [re, codes] of LEGACY_RULES[subjectId] ?? []) if (re.test(name)) return codes;
  return [];
}

export interface TopicRef {
  id: string;
  title: string;
}

/**
 * Builds the per-topic index.
 * @param topicsByCode subject id → (topic code → app topic), from content/<subject>/subject.json
 * @param codeMap optional per-subject map from a guide code to an app topic code
 *                (used for Math AA, whose app topics group several IB subtopics)
 */
export function buildNotesIndex(
  rows: Record<string, string>[],
  topicsByCode: Record<string, Record<string, TopicRef>>,
  codeMap: Record<string, Record<string, string>> = {},
): NotesIndex {
  const index: NotesIndex = {};
  const seen = new Set<string>();
  for (const row of rows) {
    const subjectId = SUBJECT_IDS[(row['Subject'] ?? '').toLowerCase()];
    const file = (row['Local file'] ?? '').replace(/\\/g, '/');
    if (!subjectId || !file || seen.has(file)) continue;
    if (row['Status'] && row['Status'] !== 'saved') continue;
    seen.add(file);
    const subject = (index[subjectId] ??= { topics: {}, unmapped: [] });
    const legacy = /legacy/i.test(row['Syllabus version'] ?? '');
    const code = (row['Subtopic'] ?? '').split(/\s+/)[0] ?? '';
    const topics = topicsByCode[subjectId] ?? {};

    let targets: string[];
    if (legacy) targets = legacyTargets(subjectId, file);
    else {
      const mapped = codeMap[subjectId] ? codeMap[subjectId][code] : code;
      targets = mapped ? [mapped] : [];
    }
    const placed = targets.map((c) => topics[c]).filter(Boolean);
    const oldTopic = legacy ? [(row['Syllabus topic'] ?? '').replace(/^legacy topic \d+\s*-\s*/i, '')] : [];
    const make = (title: string): NoteItem => ({
      title: shortTitle(file, code, legacy ? '' : title, oldTopic),
      file,
      source: 'iitian',
      code,
      sub: legacy ? null : subNumber(file, code),
      legacy,
    });
    if (!placed.length) {
      subject.unmapped.push(make(''));
      continue;
    }
    for (const t of placed) {
      const bucket = (subject.topics[t.id] ??= { current: [], legacy: [] });
      (legacy ? bucket.legacy : bucket.current).push(make(t.title));
    }
  }
  for (const s of Object.values(index)) {
    for (const t of Object.values(s.topics)) {
      t.current = sortNotes(t.current);
      t.legacy = sortNotes(t.legacy);
    }
  }
  return index;
}

/** Topic-file names that differ from the app's topic titles (normalised name → app title). */
const TITLE_ALIASES: Record<string, string> = {
  motioninelectromagneticfields: 'Motion in electric and magnetic fields',
  structureoftheatom: 'Atomic physics',
  electronicconfigurations: 'Electron configurations',
};

/** Folds one-PDF-per-topic Save My Exams notes into the index by matching topic titles. */
export function addTopicPdfs(
  index: NotesIndex,
  subjectId: string,
  files: string[],
  topics: TopicRef[],
  source: NoteSource,
): string[] {
  const norm = (s: string) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]/g, '');
  const unmatched: string[] = [];
  const subject = (index[subjectId] ??= { topics: {}, unmapped: [] });
  for (const file of files) {
    let stem = norm(path.posix.basename(file).replace(/\.pdf$/i, ''));
    stem = TITLE_ALIASES[stem] ? norm(TITLE_ALIASES[stem]) : stem;
    const topic = topics.find((t) => norm(t.title) === stem) ?? topics.find((t) => stem.includes(norm(t.title)) || norm(t.title).includes(stem));
    if (!topic) {
      unmatched.push(file);
      continue;
    }
    const bucket = (subject.topics[topic.id] ??= { current: [], legacy: [] });
    bucket.current.push({ title: `${topic.title}: full topic summary`, file, source, code: '', sub: null, legacy: false });
  }
  return unmatched;
}

/**
 * Resolves a client-supplied relative path inside `base`. Returns null for
 * absolute paths, drive letters, "..", NUL bytes, or anything that escapes.
 */
export function resolveInside(base: string, rel: string | null): string | null {
  if (!rel || rel.includes('\0')) return null;
  const clean = rel.replace(/\\/g, '/');
  if (clean.startsWith('/') || /^[a-zA-Z]:/.test(clean) || clean.split('/').includes('..')) return null;
  const root = path.resolve(base);
  const full = path.resolve(root, clean);
  if (full !== root && !full.startsWith(root + path.sep)) return null;
  return full;
}
