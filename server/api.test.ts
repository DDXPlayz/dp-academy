import { describe, expect, it } from 'vitest';
import { handleApi, type Env } from './api';
import { memoryKV, type KV } from './store';
import { verifyPassword, hashPassword } from './auth';

const env: Env = { ADMIN_USER: 'owner', ADMIN_PASSWORD: 'owner-pass-123', SESSION_SECRET: 'test-secret' };

/** A browser with its own cookie jar, talking to a shared database. */
function browser(kv: KV, e: Env = env) {
  let cookie = '';
  return async (method: string, path: string, body?: unknown) => {
    const req = new Request(`https://site.test/api/${path}`, {
      method,
      headers: { ...(body ? { 'content-type': 'application/json' } : {}), ...(cookie ? { cookie } : {}) },
      body: body ? JSON.stringify(body) : undefined,
    });
    const res = await handleApi(req, `/api/${path}`, e, kv);
    const set = res.headers.get('set-cookie');
    if (set) cookie = set.split(';')[0];
    return { status: res.status, body: await res.json() };
  };
}

describe('accounts API', () => {
  it('hashes and verifies passwords', async () => {
    const h = await hashPassword('hunter22');
    expect(await verifyPassword('hunter22', h)).toBe(true);
    expect(await verifyPassword('hunter23', h)).toBe(false);
  });

  it('refuses to run unconfigured', async () => {
    const call = browser(memoryKV(), {});
    expect((await call('POST', 'auth/login', { username: 'a', password: 'b' })).status).toBe(503);
  });

  it('lets the owner create a friend, keeps progress separate, and removes access', async () => {
    const kv = memoryKV();
    const owner = browser(kv);
    const friend = browser(kv);

    expect((await owner('GET', 'auth/me')).status).toBe(401);
    expect((await owner('POST', 'auth/login', { username: 'owner', password: 'nope' })).status).toBe(401);
    expect((await owner('POST', 'auth/login', { username: 'Owner', password: 'owner-pass-123' })).body).toEqual({ username: 'owner', role: 'admin' });
    expect((await owner('GET', 'auth/me')).body.role).toBe('admin');

    expect((await owner('POST', 'users', { username: 'maya', password: 'short' })).status).toBe(400);
    expect((await owner('POST', 'users', { username: 'bad name', password: 'long-enough' })).status).toBe(400);
    expect((await owner('POST', 'users', { username: 'maya', password: 'maya-pass-1' })).status).toBe(201);
    expect((await owner('POST', 'users', { username: 'maya', password: 'maya-pass-1' })).status).toBe(409);
    expect((await owner('GET', 'users')).body).toMatchObject([{ username: 'maya' }]);

    expect((await friend('POST', 'auth/login', { username: 'maya', password: 'maya-pass-1' })).body.role).toBe('member');
    expect((await friend('GET', 'users')).status).toBe(403);

    // Progress is per account and versioned (optimistic concurrency).
    expect((await friend('GET', 'progress')).body).toMatchObject({ data: null, version: 0 });
    expect((await friend('PUT', 'progress', { data: { completed: { a: '1' } }, baseVersion: 0 })).body.version).toBe(1);
    const stale = await friend('PUT', 'progress', { data: { completed: {} }, baseVersion: 0 });
    expect(stale.status).toBe(409);
    expect(stale.body).toMatchObject({ version: 1, data: { completed: { a: '1' } } });
    expect((await owner('GET', 'progress')).body.data).toBeNull();

    // Own password change; owner reset; removal ends API access at once.
    expect((await friend('POST', 'auth/password', { current: 'wrong-pass', next: 'maya-pass-2' })).status).toBe(400);
    expect((await friend('POST', 'auth/password', { current: 'maya-pass-1', next: 'maya-pass-2' })).status).toBe(200);
    expect((await owner('POST', 'users/maya/password', { password: 'maya-pass-3' })).status).toBe(200);
    expect((await browser(kv)('POST', 'auth/login', { username: 'maya', password: 'maya-pass-3' })).status).toBe(200);
    expect((await owner('DELETE', 'users/maya')).status).toBe(200);
    expect((await friend('GET', 'progress')).status).toBe(401);
    expect((await owner('GET', 'users')).body).toEqual([]);
  });

  it('locks an account after repeated wrong passwords', async () => {
    const call = browser(memoryKV());
    for (let i = 0; i < 10; i++) await call('POST', 'auth/login', { username: 'owner', password: 'wrong' });
    expect((await call('POST', 'auth/login', { username: 'owner', password: 'owner-pass-123' })).status).toBe(429);
  });
});
