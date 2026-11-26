/*
 * Runs the real API (server/api.ts) inside `vite` dev and `vite preview`, so
 * accounts and sync work locally too. Data goes to the git-ignored .data/dev-db.json, or to
 * Upstash if KV_REST_API_URL / KV_REST_API_TOKEN are set in your shell.
 *
 * Without ADMIN_USER / ADMIN_PASSWORD / SESSION_SECRET in the environment,
 * dev uses admin / admin-dev-pass and a fixed dev-only secret.
 */
import fs from 'node:fs';
import path from 'node:path';
import type { Connect, Logger, Plugin } from 'vite';
import { handleApi, type Env } from '../server/api';
import { memoryKV, redisFromEnv, type KV } from '../server/store';

function fileKV(file: string): KV {
  let initial = {};
  try {
    initial = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    /* first run */
  }
  return memoryKV(initial, (data) => {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(data, null, 1));
  });
}

/** The private personal-touches config (git-ignored), read fresh so edits apply without a restart. */
function readPersonal(root: string): string | undefined {
  try {
    return fs.readFileSync(path.join(root, 'resources', 'personal.json'), 'utf8');
  } catch {
    return undefined;
  }
}

function apiMiddleware(root: string, logger: Logger): Connect.NextHandleFunction {
  const env: Env = {
    ADMIN_USER: process.env.ADMIN_USER || 'admin',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin-dev-pass',
    SESSION_SECRET: process.env.SESSION_SECRET || 'dev-only-secret-not-for-production',
  };
  const kv = redisFromEnv(process.env) ?? fileKV(path.join(root, '.data', 'dev-db.json'));
  if (!process.env.ADMIN_USER) logger.info(`
  DP Academy local login: ${env.ADMIN_USER} / ${env.ADMIN_PASSWORD}
`);

  return async (req, res, next) => {
    if (!req.url?.startsWith('/api/')) return next();
    try {
      const chunks: Buffer[] = [];
      for await (const c of req) chunks.push(c as Buffer);
      const headers = new Headers();
      for (const [k, v] of Object.entries(req.headers)) if (typeof v === 'string') headers.set(k, v);
      const url = new URL(req.url, `http://${req.headers.host ?? 'localhost'}`);
      const request = new Request(url, {
        method: req.method,
        headers,
        body: req.method === 'GET' || req.method === 'HEAD' ? undefined : Buffer.concat(chunks),
      });
      const response = await handleApi(request, url.pathname, { ...env, PERSONAL_CONFIG: process.env.PERSONAL_CONFIG || readPersonal(root) }, kv);
      res.statusCode = response.status;
      response.headers.forEach((value, key) => res.setHeader(key, value));
      res.end(await response.text());
    } catch (e) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: String(e) }));
    }
  };
}

/** Runs the API in `vite` (dev) and `vite preview` (local test of the production build). */
export function devApi(): Plugin {
  return {
    name: 'dp-academy:dev-api',
    configureServer(server) {
      server.middlewares.use(apiMiddleware(server.config.root, server.config.logger));
    },
    configurePreviewServer(server) {
      server.middlewares.use(apiMiddleware(server.config.root, server.config.logger));
    },
  };
}
