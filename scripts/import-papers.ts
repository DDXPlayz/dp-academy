/*
 * Past-paper importer.
 *
 *   npm run import:papers -- --session "May 2024" [--in resources/past-papers/May-2024]
 *
 * Reads IB-named PDFs ("Physics_paper_2_TZ1_HL.pdf" plus "…_markscheme.pdf")
 * from a folder under resources/past-papers/, parses them with
 * scripts/paperParser.ts and writes one JSON file per paper to
 * resources/question-bank/. Both folders are git-ignored; nothing imported is
 * ever committed; imported questions appear only in local development.
 *
 * --legacy  the papers follow the 2016 science guides: paper 1 becomes 1A,
 *           paper 3 (options) is skipped, and sessions are labelled as such.
 */
import fs from 'node:fs';
import path from 'node:path';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { buildQuestions, parsePaperFilename, topicKeywords, type PaperMeta } from './paperParser';

const ROOT = process.cwd(); // npm scripts run from the project root
const PAPERS_ROOT = path.join(ROOT, 'resources', 'past-papers');
const OUT = path.join(ROOT, 'resources', 'question-bank');

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i > 0 ? process.argv[i + 1] : undefined;
}

/** Text of a PDF, one line per text run with a y-position change, pages separated by blank lines. */
async function pdfText(file: string): Promise<{ text: string; pages: string[] }> {
  const doc = await getDocument({ data: new Uint8Array(fs.readFileSync(file)), useSystemFonts: true, isEvalSupported: false }).promise;
  const pages: string[] = [];
  for (let p = 1; p <= doc.numPages; p++) {
    const content = await (await doc.getPage(p)).getTextContent();
    let line = '';
    let lastY: number | null = null;
    const lines: string[] = [];
    for (const item of content.items) {
      if (!('str' in item)) continue;
      const y = Math.round(item.transform[5]);
      if (lastY !== null && Math.abs(y - lastY) > 2) {
        lines.push(line);
        line = '';
      }
      line += item.str;
      if (item.hasEOL) {
        lines.push(line);
        line = '';
      }
      lastY = y;
    }
    if (line) lines.push(line);
    pages.push(lines.join('\n'));
  }
  await doc.destroy();
  return { text: pages.join('\n\n'), pages };
}

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
}

function readTopics(subject: string) {
  const s = JSON.parse(fs.readFileSync(path.join(ROOT, 'content', subject, 'subject.json'), 'utf8'));
  return topicKeywords(s.units.flatMap((u: { topics: unknown[] }) => u.topics));
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

async function main() {
  const session = arg('session');
  const input = path.resolve(ROOT, arg('in') ?? PAPERS_ROOT);
  if (!session) throw new Error('Pass --session, e.g. --session "May 2024" or --session "Specimen 2025".');
  if (!(input === PAPERS_ROOT || input.startsWith(PAPERS_ROOT + path.sep))) {
    throw new Error(`Input must be inside ${path.relative(ROOT, PAPERS_ROOT)}/ so the source of every paper is known.`);
  }
  if (/revision[ -]?town|revision[ -]?village/i.test(input)) throw new Error('Refusing to import from a copied commercial question bank.');
  if (!fs.existsSync(input)) throw new Error(`No such folder: ${input}`);
  fs.mkdirSync(OUT, { recursive: true });

  const legacy = process.argv.includes('--legacy');
  const files = walk(input).filter((f) => f.toLowerCase().endsWith('.pdf'));
  const byKey = new Map<string, { meta: PaperMeta; paper?: string; ms?: string }>();
  for (const f of files) {
    const meta = parsePaperFilename(f);
    if (!meta) continue;
    if (legacy && meta.subject !== 'math-aa') {
      if (meta.paper === '3') continue;
      if (meta.paper === '1') meta.paper = '1A';
    }
    const k = `${meta.subject}|${meta.paper}|${meta.level}|${meta.timezone ?? ''}`;
    const entry = byKey.get(k) ?? { meta: { ...meta, markscheme: false } };
    if (meta.markscheme) entry.ms = f;
    else entry.paper = f;
    byKey.set(k, entry);
  }

  let total = 0;
  for (const { meta, paper, ms } of byKey.values()) {
    if (!paper) {
      console.warn(`skip: markscheme without paper (${path.relative(ROOT, ms!)})`);
      continue;
    }
    const idPrefix = slug(`${meta.subject}-${session}-${meta.timezone ?? ''}-${meta.level}-p${meta.paper}`);
    const paperPdf = await pdfText(paper);
    const rows = buildQuestions({
      meta,
      session: legacy && meta.subject !== 'math-aa' ? `${session} · 2016 syllabus` : session,
      paperText: paperPdf.text,
      markschemeText: ms ? (await pdfText(ms)).text : null,
      topics: readTopics(meta.subject),
      idPrefix,
      sourceFile: path.relative(PAPERS_ROOT, paper).replace(/\\/g, '/'),
    });
    // Page each question starts on, so the original can be opened at the right place.
    const flat = paperPdf.pages.map((t) => t.replace(/\s+/g, ''));
    for (const r of rows) {
      const probe = r.prompt.replace(/\s+/g, '').slice(0, 40);
      const i = probe ? flat.findIndex((t) => t.includes(probe)) : -1;
      if (i >= 0) r.page = i + 1;
    }
    const out = path.join(OUT, `pdf-${idPrefix}.json`);
    fs.writeFileSync(out, JSON.stringify(rows, null, 2));
    const review = rows.filter((r) => r.needsReview).length;
    console.log(`${path.relative(ROOT, out)}: ${rows.length} questions${ms ? '' : ' (no markscheme)'}, ${review} need review`);
    total += rows.length;
  }
  console.log(`Imported ${total} questions into ${path.relative(ROOT, OUT)}/ (git-ignored).`);
}

main().catch((err) => {
  console.error(String(err instanceof Error ? err.message : err));
  process.exit(1);
});
