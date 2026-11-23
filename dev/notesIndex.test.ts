import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { addTopicPdfs, buildNotesIndex, parseCsv, resolveInside, shortTitle, sortNotes, subNumber, type NoteItem } from './notesIndex';

// Fixtures are invented names in the same shape as the private index; no real file names are committed.
const CSV = [
  'Subject,Syllabus version,Syllabus topic,Subtopic,Level (HL/SL),Resource title,Original URL,Local file,Status,Saved on',
  'Chemistry,Current,Structure 1,"S1.4 Counting particles by mass: the mole",HL,t,u,Chemistry\\S1\\S1.4 - x-chem-s1-4-10-tenth-idea-study-notes.pdf,saved,2026-01-01',
  'Chemistry,Current,Structure 1,"S1.4 Counting particles by mass: the mole",HL,t,u,Chemistry\\S1\\S1.4 - x-chem-s1-4-3-third-idea-study-notes.pdf,saved,2026-01-01',
  'Chemistry,Current,Structure 1,"S1.4 Counting particles by mass: the mole",SL,t,u,Chemistry\\S1\\S1.4 - x-chem-s1-4-3-third-idea-study-notes.pdf,saved,2026-01-01',
  'Chemistry,Current,Structure 1,"S1.4 Counting particles by mass: the mole",HL,t,u,Chemistry\\S1\\S1.4 - ib-dp-chemistry-counting-particles-by-mass-the-mole-study-notes.pdf,saved,2026-01-01',
  'Chemistry,Legacy (2016),Legacy Topic 8 - Acids and bases,8.1,HL,t,u,Chemistry\\Legacy\\8.1 - ib-dp-chemistry-topic-8-acids-and-bases-8-1-theories-of-acids-and-bases-study-notes.pdf,saved,2026-01-01',
  'Chemistry,Current,Structure 9,"S9.9 Not a topic",HL,t,u,Chemistry\\S9\\S9.9 - nowhere.pdf,saved,2026-01-01',
  'Physics,Current,Theme A,"A.1 Kinematics",HL,t,u,Physics\\A\\A.1 - ibdp-physics-2025-slhl-1-4-projectile-motion-study-notes.pdf,saved,2026-01-01',
  'Physics,Current,Theme A,"A.1 Kinematics",HL,t,u,Physics\\A\\A.1 - broken.pdf,failed,2026-01-01',
].join('\r\n');

const TOPICS = {
  chemistry: {
    'S1.4': { id: 's1-4-the-mole', title: 'Counting particles by mass: the mole' },
    'R3.1': { id: 'r3-1-proton-transfer', title: 'Proton transfer reactions' },
  },
  physics: { 'A.1': { id: 'a1-kinematics', title: 'Kinematics' } },
};

describe('parseCsv', () => {
  it('handles quotes, commas inside quotes, CRLF and a BOM', () => {
    const rows = parseCsv('\uFEFFa,b\r\n"x, y","he said ""hi"""\r\n');
    expect(rows).toEqual([{ a: 'x, y', b: 'he said "hi"' }]);
  });
});

describe('subNumber and shortTitle', () => {
  it('reads the sub-number after the topic code', () => {
    expect(subNumber('S1.4 - ib-dp-chemistry-s1-4-10-x.pdf', 'S1.4')).toBe(10);
    expect(subNumber('A.1 - ibdp-physics-2025-slhl-1-3-graphs.pdf', 'A.1')).toBe(3);
    expect(subNumber('A.1 - ibdp-physics-slhl-a-1-kinematics-notes.pdf', 'A.1')).toBeNull();
  });
  it('makes short titles and recognises overview pages', () => {
    expect(shortTitle('S1.4 - ib-dp-chemistry-s1-4-3-molar-mass-study-notes.pdf', 'S1.4')).toBe('Molar mass');
    expect(shortTitle('A.1 - ibdp-physics-slhl-a-1-kinematics-study-notes-first-assessment-2025.pdf', 'A.1', 'Kinematics')).toBe('Kinematics: overview');
    expect(shortTitle('B.5 - resistors-in-circuits-ib-dp-physics-study-notes.pdf', 'B.5')).toBe('Resistors in circuits');
    expect(shortTitle('2 - ib-physics-unit-2-mechanics-motion-notes.pdf', '2', '', ['Mechanics'])).toBe('Motion');
  });
});

describe('buildNotesIndex', () => {
  const index = buildNotesIndex(parseCsv(CSV), TOPICS);

  it('orders a topic overview first, then by sub-number (3 before 10), with duplicates removed', () => {
    const items = index.chemistry.topics['s1-4-the-mole'].current;
    expect(items.map((i) => i.sub)).toEqual([null, 3, 10]);
    expect(items[0].title).toMatch(/overview/);
  });

  it('places old-syllabus notes under the 2025 topic that covers them', () => {
    const legacy = index.chemistry.topics['r3-1-proton-transfer'].legacy;
    expect(legacy).toHaveLength(1);
    expect(legacy[0].title).toBe('Theories of acids and bases');
  });

  it('reports codes with no app topic and skips rows that were not saved', () => {
    expect(index.chemistry.unmapped.map((i) => i.code)).toEqual(['S9.9']);
    expect(index.physics.topics['a1-kinematics'].current).toHaveLength(1);
  });

  it('uses forward slashes in file paths', () => {
    expect(index.physics.topics['a1-kinematics'].current[0].file).toBe('Physics/A/A.1 - ibdp-physics-2025-slhl-1-4-projectile-motion-study-notes.pdf');
  });

  it('moves known misfiled notes to the right topic', () => {
    const rows = parseCsv(
      'Subject,Syllabus version,Subtopic,Local file,Status\n' +
        'Mathematics AA,Current,5.1 Limits,Math\\5\\5.1 - x-operations-with-numbers-in-the-form-a-x-10k-study-notes.pdf,saved',
    );
    const idx = buildNotesIndex(rows, { 'math-aa': { '1.1': { id: '1-1-scientific-notation', title: 'Scientific notation' }, '5.1': { id: '5-1-limits', title: 'Limits' } } });
    expect(Object.keys(idx['math-aa'].topics)).toEqual(['1-1-scientific-notation']);
  });

  it('applies an explicit code map when given one', () => {
    const mapped = buildNotesIndex(parseCsv(CSV), { chemistry: { 'X.1': { id: 'x', title: 'X' } } }, { chemistry: { 'S1.4': 'X.1' } });
    expect(mapped.chemistry.topics.x.current.length).toBe(3);
  });
});

describe('addTopicPdfs', () => {
  it('matches one-file-per-topic notes by title and reports the rest', () => {
    const index = buildNotesIndex([], {});
    const left = addTopicPdfs(index, 'physics', ['P/Space/kinematics.pdf', 'P/Tools/measurements.pdf'], [{ id: 'a1-kinematics', title: 'Kinematics' }], 'sme');
    expect(left).toEqual(['P/Tools/measurements.pdf']);
    expect(index.physics.topics['a1-kinematics'].current[0].source).toBe('sme');
  });
});

describe('sortNotes', () => {
  it('is stable for equal sub-numbers by title', () => {
    const mk = (title: string, sub: number | null): NoteItem => ({ title, sub, file: title, source: 'iitian', code: 'A.1', legacy: false });
    expect(sortNotes([mk('b', 2), mk('a', 2), mk('z', null)]).map((i) => i.title)).toEqual(['z', 'a', 'b']);
  });
});

describe('resolveInside', () => {
  const base = path.resolve('/tmp/notes');
  it('accepts paths inside the folder', () => {
    expect(resolveInside(base, 'Physics/A/x.pdf')).toBe(path.join(base, 'Physics', 'A', 'x.pdf'));
    expect(resolveInside(base, 'Physics\\A\\x.pdf')).toBe(path.join(base, 'Physics', 'A', 'x.pdf'));
  });
  it('rejects traversal, absolute paths, drive letters, NUL and empty input', () => {
    for (const bad of ['../secret.pdf', 'Physics/../../x.pdf', '/etc/passwd', '\\\\server\\x.pdf', 'C:/x.pdf', 'c:x.pdf', 'a\0b.pdf', '', null]) {
      expect(resolveInside(base, bad)).toBeNull();
    }
  });
});
