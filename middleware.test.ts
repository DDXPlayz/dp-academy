import { afterEach, describe, expect, it } from 'vitest';
import middleware from './middleware';

const req = (auth?: string) => new Request('https://example.test/s/physics', { headers: auth ? { authorization: auth } : {} });
const basic = (u: string, p: string) => `Basic ${btoa(`${u}:${p}`)}`;

describe('password middleware', () => {
  afterEach(() => {
    delete process.env.SITE_PASSWORD;
    delete process.env.SITE_USER;
  });

  it('fails closed when no password is configured', () => {
    const res = middleware(req(basic('student', 'anything')));
    expect(res.status).toBe(401);
  });

  it('asks for credentials, and rejects wrong ones', () => {
    process.env.SITE_PASSWORD = 'correct horse';
    expect(middleware(req()).status).toBe(401);
    expect(middleware(req()).headers.get('WWW-Authenticate')).toMatch(/^Basic/);
    expect(middleware(req(basic('student', 'wrong'))).status).toBe(401);
    expect(middleware(req(basic('someone', 'correct horse'))).status).toBe(401);
    expect(middleware(req('Basic !!!not-base64')).status).toBe(401);
  });

  it('lets the right user through, including passwords containing ":"', () => {
    process.env.SITE_PASSWORD = 'a:b:c';
    process.env.SITE_USER = 'me';
    const res = middleware(req(basic('me', 'a:b:c')));
    expect(res.headers.get('x-middleware-next')).toBe('1');
  });
});
