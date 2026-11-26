/*
 * The whole backend: accounts, sessions and synced progress.
 *
 *   POST   /api/auth/login        { username, password }  → sets the session cookie
 *   POST   /api/auth/logout
 *   GET    /api/auth/me                                   → { username, role } and renews the cookie
 *   POST   /api/auth/password     { current, next }       → change your own password
 *   GET    /api/progress                                  → { data, version }
 *   PUT    /api/progress          { data, baseVersion }   → { version } or 409 { data, version }
 *   GET    /api/users                          (admin)    → [{ username, created }]
 *   POST   /api/users             { username, password }  (admin) → create an account
 *   POST   /api/users/<name>/password { password } (admin) → reset someone's password
 *   DELETE /api/users/<name>                   (admin)    → remove an account and its progress
 *   GET    /api/personal                                  → personal touches for one account (see personal.ts), or 204
 *
 * The owner account comes from ADMIN_USER / ADMIN_PASSWORD; everyone else is
 * created by the owner in Settings → People. SESSION_SECRET signs cookies.
 */
import {
  MIN_PASSWORD,
  SESSION_COOKIE,
  USERNAME_RE,
  clearCookie,
  hashPassword,
  readCookie,
  safeEqual,
  sessionCookie,
  signSession,
  verifyPassword,
  verifySession,
  type Role,
  type Session,
} from './auth';
import { personalFor } from './personal';
import type { KV } from './store';

export interface Env {
  ADMIN_USER?: string;
  ADMIN_PASSWORD?: string;
  SESSION_SECRET?: string;
  /** Optional JSON for the personal touches (see server/personal.ts). Kept out of the repository. */
  PERSONAL_CONFIG?: string;
}

interface UserRecord {
  hash: string;
  created: string;
}

interface ProgressRecord {
  data: unknown;
  version: number;
  updatedAt: string;
}

const MAX_PROGRESS_BYTES = 900_000;
const MAX_FAILS = 10;
const LOCK_SECONDS = 15 * 60;

const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers },
  });
const error = (status: number, message: string, headers: Record<string, string> = {}) => json({ error: message }, status, headers);

async function body<T>(req: Request): Promise<T | null> {
  if (!(req.headers.get('content-type') ?? '').includes('application/json')) return null;
  try {
    return (await req.json()) as T;
  } catch {
    return null;
  }
}

async function readUsers(kv: KV): Promise<string[]> {
  const raw = await kv.get('users');
  return raw ? (JSON.parse(raw) as string[]) : [];
}

async function readUser(kv: KV, name: string): Promise<UserRecord | null> {
  const raw = await kv.get(`user:${name}`);
  return raw ? (JSON.parse(raw) as UserRecord) : null;
}

export async function handleApi(req: Request, path: string, env: Env, kv: KV): Promise<Response> {
  const secret = env.SESSION_SECRET ?? '';
  const admin = (env.ADMIN_USER ?? '').trim().toLowerCase();
  if (!secret || !admin || !env.ADMIN_PASSWORD) {
    return error(503, 'Accounts are not configured: set ADMIN_USER, ADMIN_PASSWORD and SESSION_SECRET.');
  }
  const secure = new URL(req.url).protocol === 'https:';
  const method = req.method.toUpperCase();
  const route = path.replace(/^\/?(api\/)?/, '').replace(/\/+$/, '');

  const issue = async (username: string, role: Role, extra: Record<string, unknown> = {}) =>
    json({ username, role, ...extra }, 200, { 'Set-Cookie': sessionCookie(await signSession({ u: username, r: role }, secret), secure) });

  // ---- login (no session needed) -------------------------------------------
  if (route === 'auth/login' && method === 'POST') {
    const b = await body<{ username?: string; password?: string }>(req);
    const username = (b?.username ?? '').trim().toLowerCase();
    const password = b?.password ?? '';
    if (!username || !password) return error(400, 'Enter your username and password.');
    const failKey = `fail:${username}`;
    const fails = Number((await kv.get(failKey)) ?? 0);
    if (fails >= MAX_FAILS) return error(429, 'Too many attempts. Try again in 15 minutes.');

    let role: Role | null = null;
    if (safeEqual(username, admin)) {
      if (safeEqual(password, env.ADMIN_PASSWORD)) role = 'admin';
    } else {
      const user = await readUser(kv, username);
      if (user && (await verifyPassword(password, user.hash))) role = 'member';
    }
    if (!role) {
      await kv.set(failKey, String(fails + 1), LOCK_SECONDS);
      return error(401, 'Wrong username or password.');
    }
    await kv.del(failKey);
    return issue(username, role);
  }

  if (route === 'auth/logout' && method === 'POST') {
    return json({ ok: true }, 200, { 'Set-Cookie': clearCookie(secure) });
  }

  // ---- everything else needs a valid session -------------------------------
  const session: Session | null = await verifySession(readCookie(req.headers.get('cookie'), SESSION_COOKIE), secret);
  const signedOut = () => error(401, 'Please sign in.', { 'Set-Cookie': clearCookie(secure) });
  if (!session) return signedOut();
  // A removed account loses API access immediately.
  if (session.r === 'member' && !(await readUser(kv, session.u))) return signedOut();
  if (session.r === 'admin' && session.u !== admin) return signedOut();

  if (route === 'auth/me' && method === 'GET') return issue(session.u, session.r);

  // Decided here from the signed session only, never from anything the browser sends.
  if (route === 'personal' && method === 'GET') {
    const touches = personalFor(env.PERSONAL_CONFIG, session.u);
    return touches ? json(touches, 200, { 'Cache-Control': 'no-store, private' }) : new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store, private' } });
  }

  if (route === 'auth/password' && method === 'POST') {
    if (session.r === 'admin') return error(400, 'The owner password is set in the Vercel environment variables.');
    const b = await body<{ current?: string; next?: string }>(req);
    const user = await readUser(kv, session.u);
    if (!user || !b?.current || !(await verifyPassword(b.current, user.hash))) return error(400, 'Your current password is wrong.');
    if (!b.next || b.next.length < MIN_PASSWORD) return error(400, `Use at least ${MIN_PASSWORD} characters.`);
    await kv.set(`user:${session.u}`, JSON.stringify({ ...user, hash: await hashPassword(b.next) }));
    return json({ ok: true });
  }

  // ---- progress -------------------------------------------------------------
  if (route === 'progress') {
    const key = `progress:${session.u}`;
    const raw = await kv.get(key);
    const stored: ProgressRecord | null = raw ? JSON.parse(raw) : null;
    if (method === 'GET') return json({ data: stored?.data ?? null, version: stored?.version ?? 0, updatedAt: stored?.updatedAt ?? null });
    if (method === 'PUT') {
      const b = await body<{ data?: unknown; baseVersion?: number }>(req);
      if (!b || typeof b.data !== 'object' || b.data === null || typeof b.baseVersion !== 'number') return error(400, 'Bad progress payload.');
      const current = stored?.version ?? 0;
      if (b.baseVersion !== current) return json({ data: stored?.data ?? null, version: current }, 409);
      const record: ProgressRecord = { data: b.data, version: current + 1, updatedAt: new Date().toISOString() };
      const text = JSON.stringify(record);
      if (text.length > MAX_PROGRESS_BYTES) return error(413, 'Progress is too large to sync.');
      await kv.set(key, text);
      return json({ version: record.version, updatedAt: record.updatedAt });
    }
  }

  // ---- account management (owner only) -------------------------------------
  if (route === 'users' || route.startsWith('users/')) {
    if (session.r !== 'admin') return error(403, 'Only the owner can manage accounts.');
    const users = await readUsers(kv);

    if (route === 'users' && method === 'GET') {
      const list = await Promise.all(users.map(async (u) => ({ username: u, created: (await readUser(kv, u))?.created ?? null })));
      return json(list);
    }

    if (route === 'users' && method === 'POST') {
      const b = await body<{ username?: string; password?: string }>(req);
      const username = (b?.username ?? '').trim().toLowerCase();
      if (!USERNAME_RE.test(username)) return error(400, 'Usernames are 2–32 characters: letters, numbers, dot, dash or underscore.');
      if (username === admin || users.includes(username)) return error(409, 'That username is taken.');
      if (!b?.password || b.password.length < MIN_PASSWORD) return error(400, `Use a password of at least ${MIN_PASSWORD} characters.`);
      const record: UserRecord = { hash: await hashPassword(b.password), created: new Date().toISOString() };
      await kv.set(`user:${username}`, JSON.stringify(record));
      await kv.set('users', JSON.stringify([...users, username].sort()));
      return json({ username, created: record.created }, 201);
    }

    const m = route.match(/^users\/([^/]+)(\/password)?$/);
    const target = m ? decodeURIComponent(m[1]) : '';
    if (m && users.includes(target)) {
      if (m[2] && method === 'POST') {
        const b = await body<{ password?: string }>(req);
        if (!b?.password || b.password.length < MIN_PASSWORD) return error(400, `Use a password of at least ${MIN_PASSWORD} characters.`);
        const user = await readUser(kv, target);
        await kv.set(`user:${target}`, JSON.stringify({ ...user, hash: await hashPassword(b.password) }));
        await kv.del(`fail:${target}`);
        return json({ ok: true });
      }
      if (!m[2] && method === 'DELETE') {
        await kv.del(`user:${target}`);
        await kv.del(`progress:${target}`);
        await kv.set('users', JSON.stringify(users.filter((u) => u !== target)));
        return json({ ok: true });
      }
    }
    if (m) return error(404, 'No such account.');
  }

  return error(404, 'Not found.');
}
