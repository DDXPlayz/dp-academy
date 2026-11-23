/*
 * Dev-server-only plugin that serves private study material from the
 * git-ignored resources/ folder. `apply: 'serve'` keeps it out of
 * `vite build`, so a production bundle never contains these files.
 *
 *   GET /__local/notes/index.json          per-topic listing of reference notes
 *   GET /__local/notes/file?src=&path=     one PDF, streamed
 *   GET /__local/bank/index.json           locally imported past-paper questions
 */
import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { addTopicPdfs, buildNotesIndex, parseCsv, resolveInside, type NoteSource, type TopicRef } from './notesIndex';

const IITIAN_DIR = 'resources/IITian Academy Notes';
const SME_DIR = 'resources/SaveMyExams - Notes/home/ptib/SaveMyExams - Notes';
/** Save My Exams folders whose topic files are named after 2025 topic titles. */
const SME_FOLDERS: Record<string, string> = { physics: 'Physics HL 2025', chemistry: 'Chemistry HL 2025' };
const BANK_DIR = 'resources/question-bank';

interface SubjectJson {
  units: { topics: { id: string; code: string; title: string }[] }[];
}

function readTopics(root: string): Record<string, Record<string, TopicRef>> {
  const out: Record<string, Record<string, TopicRef>> = {};
  const contentDir = path.join(root, 'content');
  for (const id of fs.readdirSync(contentDir)) {
    const file = path.join(contentDir, id, 'subject.json');
    if (!fs.existsSync(file)) continue;
    const s = JSON.parse(fs.readFileSync(file, 'utf8')) as SubjectJson;
    out[id] = {};
    for (const u of s.units) for (const t of u.topics) out[id][t.code] = { id: t.id, title: t.title };
  }
  return out;
}

function listPdfs(dir: string, rel = ''): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const r = rel ? `${rel}/${e.name}` : e.name;
    if (e.isDirectory()) return listPdfs(path.join(dir, e.name), r);
    return e.name.toLowerCase().endsWith('.pdf') ? [r] : [];
  });
}

export function buildIndex(root: string) {
  const csvPath = path.join(root, IITIAN_DIR, 'notes_index.csv');
  if (!fs.existsSync(csvPath)) return null;
  const topics = readTopics(root);
  const index = buildNotesIndex(parseCsv(fs.readFileSync(csvPath, 'utf8')), topics);
  const smeUnmatched: string[] = [];
  for (const [subjectId, folder] of Object.entries(SME_FOLDERS)) {
    const files = listPdfs(path.join(root, SME_DIR, folder)).map((f) => `${folder}/${f}`);
    smeUnmatched.push(...addTopicPdfs(index, subjectId, files, Object.values(topics[subjectId] ?? {}), 'sme'));
  }
  return { index, smeUnmatched };
}

function send(res: import('node:http').ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

export function localResources(): Plugin {
  let root = process.cwd();
  return {
    name: 'dp-academy:local-resources',
    apply: 'serve',
    configResolved(config) {
      root = config.root;
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith('/__local/')) return next();
        const url = new URL(req.url, 'http://localhost');
        try {
          if (url.pathname === '/__local/notes/index.json') {
            const built = buildIndex(root);
            return built ? send(res, 200, built.index) : send(res, 404, { error: 'notes folder not found' });
          }
          if (url.pathname === '/__local/notes/file') {
            const src = (url.searchParams.get('src') ?? 'iitian') as NoteSource;
            const base = path.join(root, src === 'sme' ? SME_DIR : IITIAN_DIR);
            const full = resolveInside(base, url.searchParams.get('path'));
            if (!full || !full.toLowerCase().endsWith('.pdf') || !fs.existsSync(full) || !fs.statSync(full).isFile()) {
              return send(res, 404, { error: 'not found' });
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'inline');
            res.setHeader('Cache-Control', 'no-store');
            fs.createReadStream(full).pipe(res);
            return;
          }
          if (url.pathname === '/__local/bank/index.json') {
            const dir = path.join(root, BANK_DIR);
            if (!fs.existsSync(dir)) return send(res, 404, { error: 'no local question bank' });
            const questions = fs
              .readdirSync(dir)
              .filter((f) => f.endsWith('.json'))
              .flatMap((f) => {
                const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
                return Array.isArray(data) ? data : [];
              });
            return send(res, 200, questions);
          }
          return send(res, 404, { error: 'unknown local route' });
        } catch (err) {
          return send(res, 500, { error: String(err) });
        }
      });
    },
  };
}
