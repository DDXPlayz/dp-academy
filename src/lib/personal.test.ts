import { describe, expect, it } from 'vitest';
import { personalFor } from '../../server/personal';
import { handleApi } from '../../server/api';
import { memoryKV } from '../../server/store';

// A made-up account: the real configuration lives outside the repository.
const config = JSON.stringify({
  username: 'Sample.User',
  nickname: 'Sam',
  greetings: { morning: ['Morning, {name}'] },
  pools: { sweet: ['Hi'], affectionate: ['x'.repeat(500), 'ok'] },
  footer: 'for {name}',
});

describe('personal touches', () => {
  it('are only returned for the configured account, whatever the case', () => {
    for (const u of ['sample.user', 'Sample.User', 'SAMPLE.USER', ' sample.user ']) expect(personalFor(config, u)?.nickname).toBe('Sam');
    for (const u of ['admin', 'sample', 'sample.user2', '']) expect(personalFor(config, u)).toBeNull();
  });

  it('are off without a valid configuration', () => {
    expect(personalFor(undefined, 'sample.user')).toBeNull();
    expect(personalFor('not json', 'sample.user')).toBeNull();
    expect(personalFor(JSON.stringify({ nickname: 'x' }), 'sample.user')).toBeNull();
  });

  it('keeps only sensible strings and never sends the username back', () => {
    const t = personalFor(config, 'sample.user')!;
    expect(t.pools.affectionate).toEqual(['ok']);
    expect(t.pools.special).toEqual([]);
    expect(t.greetings.evening).toEqual([]);
    expect(JSON.stringify(t)).not.toContain('Sample.User');
  });

  it("the API sends them only to that account's signed-in session", async () => {
    const env = { ADMIN_USER: 'owner', ADMIN_PASSWORD: 'owner-pass-123', SESSION_SECRET: 'test-secret', PERSONAL_CONFIG: config };
    const kv = memoryKV();
    const call = (path: string, method = 'GET', body?: unknown, cookie = '') =>
      handleApi(
        new Request(`http://localhost/api/${path}`, {
          method,
          headers: { ...(body ? { 'Content-Type': 'application/json' } : {}), ...(cookie ? { cookie } : {}) },
          body: body ? JSON.stringify(body) : undefined,
        }),
        `/api/${path}`,
        env,
        kv,
      );
    const login = async (username: string, password: string) =>
      ((await call('auth/login', 'POST', { username, password })).headers.get('set-cookie') ?? '').split(';')[0];

    const owner = await login('owner', 'owner-pass-123');
    for (const username of ['sample.user', 'friend']) expect((await call('users', 'POST', { username, password: 'password-123' }, owner)).status).toBe(201);

    for (const typed of ['sample.user', 'Sample.User', 'SAMPLE.USER']) {
      const res = await call('personal', 'GET', undefined, await login(typed, 'password-123'));
      expect(res.status).toBe(200);
      expect(res.headers.get('cache-control')).toContain('no-store');
      expect(((await res.json()) as { nickname: string }).nickname).toBe('Sam');
    }
    expect((await call('personal', 'GET', undefined, await login('friend', 'password-123'))).status).toBe(204);
    expect((await call('personal', 'GET', undefined, owner)).status).toBe(204);
    expect((await call('personal')).status).toBe(401); // signed out
    expect((await call('personal', 'GET', undefined, 'dpa_session=forged.value')).status).toBe(401);
  });
});
