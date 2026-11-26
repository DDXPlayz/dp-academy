/*
 * Optional personal touches for exactly one account: a nickname, greetings and
 * a few small messages. The whole configuration, including which account it
 * is for, lives outside the repository: in the PERSONAL_CONFIG environment
 * variable on Vercel, and in the git-ignored resources/personal.json locally.
 *
 * The server only returns it to a request whose signed session belongs to
 * that account, so nobody else ever receives the text, and other users simply
 * see the normal app.
 */

export type PoolName = 'welcome' | 'study' | 'session' | 'milestone' | 'break' | 'sweet' | 'affectionate' | 'special';
export const POOLS: PoolName[] = ['welcome', 'study', 'session', 'milestone', 'break', 'sweet', 'affectionate', 'special'];
export const TIMES = ['morning', 'afternoon', 'evening', 'late'] as const;

export interface PersonalTouches {
  nickname: string;
  greetings: Record<(typeof TIMES)[number], string[]>;
  pools: Record<PoolName, string[]>;
  footer: string;
}

const strings = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string' && x.trim().length > 0 && x.length <= 200).slice(0, 60) : [];

/** The touches for `username`, or null if they aren't configured for this account. */
export function personalFor(raw: string | undefined, username: string): PersonalTouches | null {
  if (!raw) return null;
  let cfg: Record<string, unknown>;
  try {
    cfg = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
  const target = typeof cfg.username === 'string' ? cfg.username.trim().toLowerCase() : '';
  if (!target || target !== username.trim().toLowerCase()) return null;
  const g = (cfg.greetings ?? {}) as Record<string, unknown>;
  const pools = (cfg.pools ?? {}) as Record<string, unknown>;
  return {
    nickname: typeof cfg.nickname === 'string' ? cfg.nickname.slice(0, 40) : '',
    greetings: Object.fromEntries(TIMES.map((t) => [t, strings(g[t])])) as PersonalTouches['greetings'],
    pools: Object.fromEntries(POOLS.map((p) => [p, strings(pools[p])])) as PersonalTouches['pools'],
    footer: typeof cfg.footer === 'string' ? cfg.footer.slice(0, 120) : '',
  };
}
