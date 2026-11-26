/*
 * Vercel Routing Middleware: only signed-in people can open the site.
 *
 * Every request except the login page, the app’s static code and the API
 * (which checks sessions itself) needs a valid session cookie, issued by
 * /api/auth/login. Page requests without one are redirected to /login;
 * other requests (e.g. the private past-paper files under /data) get 401.
 * If SESSION_SECRET is not set, nothing gets through — a misconfigured
 * deployment fails closed instead of going public.
 */
import { SESSION_COOKIE, readCookie, verifySession } from './server/auth.js';

export const config = { matcher: '/:path*' };

/** Paths anyone may load: the login screen and the (public-repo) app bundle. */
const PUBLIC = [
  /^\/login\/?$/,
  /^\/api(\/|$)/,
  /^\/assets\//,
  /^\/favicon\.svg$/,
  /^\/robots\.txt$/,
  /^\/manifest\.webmanifest$/,
  /^\/(apple-touch-icon|icon-[\w-]+)\.png$/,
];

export default async function middleware(request: Request): Promise<Response> {
  const url = new URL(request.url);
  if (PUBLIC.some((re) => re.test(url.pathname))) return next();

  const secret = process.env.SESSION_SECRET ?? '';
  const session = await verifySession(readCookie(request.headers.get('cookie'), SESSION_COOKIE), secret);
  if (session) return next();

  const wantsPage = request.method === 'GET' && (request.headers.get('accept') ?? '').includes('text/html');
  if (wantsPage) {
    const to = new URL('/login', url);
    if (url.pathname !== '/') to.searchParams.set('next', url.pathname + url.search);
    return new Response(null, { status: 302, headers: { Location: to.toString(), 'Cache-Control': 'no-store' } });
  }
  return new Response('Sign in to DP Academy.', { status: 401, headers: { 'Cache-Control': 'no-store' } });
}

/** Continue to the requested file (equivalent to `next()` from @vercel/functions). */
function next() {
  return new Response(null, { headers: { 'x-middleware-next': '1' } });
}
