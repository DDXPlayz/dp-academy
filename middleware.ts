/*
 * Vercel Routing Middleware: puts the whole deployed site behind a password.
 *
 * Set SITE_PASSWORD (and optionally SITE_USER, default "student") in the
 * Vercel project's Environment Variables. The browser asks once per session
 * and remembers it. If SITE_PASSWORD is not set, every request is refused, so
 * a misconfigured deployment fails closed instead of going public.
 */
export const config = { matcher: '/:path*' };

function unauthorized(message: string) {
  return new Response(message, {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="DP Academy", charset="UTF-8"', 'Cache-Control': 'no-store' },
  });
}

/** Constant-time comparison so the check does not leak how much of the password matched. */
function same(a: string, b: string) {
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}

export default function middleware(request: Request) {
  const password = process.env.SITE_PASSWORD;
  const user = process.env.SITE_USER || 'student';
  if (!password) return unauthorized('This site is locked: set SITE_PASSWORD in the Vercel project settings.');

  const header = request.headers.get('authorization') ?? '';
  if (header.startsWith('Basic ')) {
    try {
      const [u, ...rest] = atob(header.slice(6)).split(':');
      if (same(u, user) && same(rest.join(':'), password)) {
        // Continue to the requested file (equivalent to `next()` from @vercel/functions).
        return new Response(null, { headers: { 'x-middleware-next': '1' } });
      }
    } catch {
      /* malformed header: fall through */
    }
  }
  return unauthorized('Sign in to DP Academy.');
}
