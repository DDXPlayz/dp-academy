import { afterEach, describe, expect, it } from 'vitest';
import middleware from './middleware';
import { SESSION_COOKIE, signSession } from './server/auth';

const page = (path: string, cookie?: string) =>
  new Request(`https://example.test${path}`, { headers: { accept: 'text/html', ...(cookie ? { cookie } : {}) } });

describe('session middleware', () => {
  afterEach(() => {
    delete process.env.SESSION_SECRET;
  });

  it('fails closed when no secret is configured', async () => {
    const token = await signSession({ u: 'me', r: 'admin' }, 'whatever');
    const res = await middleware(page('/s/physics', `${SESSION_COOKIE}=${token}`));
    expect(res.status).toBe(302);
  });

  it('redirects signed-out page requests to /login, keeping the destination', async () => {
    process.env.SESSION_SECRET = 'secret';
    const res = await middleware(page('/s/physics?x=1'));
    expect(res.status).toBe(302);
    const loc = new URL(res.headers.get('location')!);
    expect(loc.pathname).toBe('/login');
    expect(loc.searchParams.get('next')).toBe('/s/physics?x=1');
  });

  it('blocks private files without a session', async () => {
    process.env.SESSION_SECRET = 'secret';
    const res = await middleware(new Request('https://example.test/data/bank.json'));
    expect(res.status).toBe(401);
  });

  it('lets the login page, the app bundle and the API through', async () => {
    for (const p of ['/login', '/assets/index-abc.js', '/api/auth/login', '/favicon.svg']) {
      expect((await middleware(page(p))).headers.get('x-middleware-next')).toBe('1');
    }
  });

  it('accepts a valid session and rejects a forged or expired one', async () => {
    process.env.SESSION_SECRET = 'secret';
    const good = await signSession({ u: 'me', r: 'member' }, 'secret');
    expect((await middleware(page('/', `${SESSION_COOKIE}=${good}`))).headers.get('x-middleware-next')).toBe('1');
    const forged = await signSession({ u: 'me', r: 'admin' }, 'other-secret');
    expect((await middleware(page('/', `${SESSION_COOKIE}=${forged}`))).status).toBe(302);
    const old = await signSession({ u: 'me', r: 'member' }, 'secret', Date.now() - 30 * 86400_000);
    expect((await middleware(page('/', `${SESSION_COOKIE}=${old}`))).status).toBe(302);
  });
});
