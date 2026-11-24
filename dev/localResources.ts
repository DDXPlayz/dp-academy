/*
 * Private question-bank data (past papers, imported banks) lives in the
 * git-ignored resources/ folder, never in the repository. This plugin makes it
 * available under /data/:
 *
 *   /data/bank.json        every imported question (merged from resources/question-bank/*.json)
 *   /data/bank/<file>      diagrams referenced by those questions
 *   /data/papers/<path>    original paper PDFs, so a question can open its source page
 *
 * `vite` serves these from disk; `vite build` copies them into dist/ only when
 * the private folders exist on the machine running the build. The deployed
 * site is password protected (middleware.ts), and builds made from a fresh
 * clone of the repository simply contain no past papers.
 */
import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';

const BANK_DIR = 'resources/question-bank';
const PAPERS_DIR = 'resources/past-papers';
const TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
};

/** Resolves a client-supplied relative path inside `base`, or null if it escapes. */
export function resolveInside(base: string, rel: string | null): string | null {
  if (!rel || rel.includes('\0')) return null;
  const clean = rel.replace(/\\/g, '/');
  if (clean.startsWith('/') || /^[a-zA-Z]:/.test(clean) || clean.split('/').includes('..')) return null;
  const root = path.resolve(base);
  const full = path.resolve(root, clean);
  return full === root || full.startsWith(root + path.sep) ? full : null;
}

export function mergedBank(root: string): unknown[] {
  const dir = path.join(root, BANK_DIR);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .flatMap((f) => {
      const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
      return Array.isArray(data) ? data : [];
    });
}

function copyDir(src: string, dst: string, filter: (f: string) => boolean) {
  if (!fs.existsSync(src)) return 0;
  let n = 0;
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name);
    const d = path.join(dst, e.name);
    if (e.isDirectory()) n += copyDir(s, d, filter);
    else if (filter(e.name)) {
      fs.mkdirSync(dst, { recursive: true });
      fs.copyFileSync(s, d);
      n++;
    }
  }
  return n;
}

export function localResources(): Plugin {
  let root = process.cwd();
  let outDir = 'dist';
  let isBuild = false;
  return {
    name: 'dp-academy:private-data',
    configResolved(config) {
      root = config.root;
      outDir = path.resolve(config.root, config.build.outDir);
      // Only real `vite build` runs copy private data (vitest also loads this config).
      isBuild = config.command === 'build' && !process.env.VITEST;
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith('/data/')) return next();
        const url = new URL(req.url, 'http://localhost');
        const file = decodeURIComponent(url.pathname);
        if (file === '/data/bank.json') {
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.setHeader('Cache-Control', 'no-store');
          res.end(JSON.stringify(mergedBank(root)));
          return;
        }
        const [base, rel] = file.startsWith('/data/bank/')
          ? [path.join(root, BANK_DIR, 'img'), file.slice('/data/bank/'.length)]
          : file.startsWith('/data/papers/')
            ? [path.join(root, PAPERS_DIR), file.slice('/data/papers/'.length)]
            : [null, null];
        const full = base ? resolveInside(base, rel) : null;
        const type = full ? TYPES[path.extname(full).toLowerCase()] : undefined;
        if (!full || !type || !fs.existsSync(full) || !fs.statSync(full).isFile()) {
          res.statusCode = 404;
          res.end('Not found');
          return;
        }
        res.setHeader('Content-Type', type);
        res.setHeader('Cache-Control', 'max-age=3600');
        fs.createReadStream(full).pipe(res);
      });
    },
    closeBundle() {
      if (!isBuild) return;
      const bank = mergedBank(root);
      if (!bank.length) return; // building from a clean clone: no private data
      const data = path.join(outDir, 'data');
      fs.mkdirSync(data, { recursive: true });
      fs.writeFileSync(path.join(data, 'bank.json'), JSON.stringify(bank));
      const imgs = copyDir(path.join(root, BANK_DIR, 'img'), path.join(data, 'bank'), (f) => !!TYPES[path.extname(f).toLowerCase()]);
      const papers = copyDir(path.join(root, PAPERS_DIR), path.join(data, 'papers'), (f) => f.toLowerCase().endsWith('.pdf'));
      this.info?.(`private data: ${bank.length} questions, ${imgs} images, ${papers} papers`);
    },
  };
}
