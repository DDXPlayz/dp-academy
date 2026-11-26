/*
 * Vercel Function serving every /api/* route (vercel.json rewrites
 * /api/<path> to /api?path=<path>). The logic lives in server/api.ts so the
 * Vite dev server can run exactly the same code.
 */
import { handleApi } from '../server/api.js';
import { redisFromEnv } from '../server/store.js';

async function handle(request: Request): Promise<Response> {
  const kv = redisFromEnv(process.env);
  if (!kv) {
    return Response.json(
      { error: 'Storage is not configured: add Upstash for Redis to the Vercel project.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }
  const url = new URL(request.url);
  const path = url.searchParams.get('path') ?? url.pathname;
  try {
    return await handleApi(request, path, process.env, kv);
  } catch {
    return Response.json({ error: 'Server error. Please try again.' }, { status: 500, headers: { 'Cache-Control': 'no-store' } });
  }
}

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const DELETE = handle;
