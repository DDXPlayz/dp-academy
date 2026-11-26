import { create } from 'zustand';
import type { PersonalTouches, PoolName } from '../../server/personal';

/*
 * Small personal touches for one account (configured privately on the
 * server, see server/personal.ts). The server sends them only to that
 * account's verified session; for everyone else `usePersonal` stays null and
 * every component renders the normal app.
 *
 * Nothing personal is stored in the browser: the text lives in memory for the
 * current page, and localStorage keeps only counters (which messages were
 * shown recently, on which visit) under the signed-in user's own key.
 */

export const usePersonal = create<{ touches: PersonalTouches | null; user: string }>(() => ({ touches: null, user: '' }));

/** Asks the server for this account's touches. Called only after the session was verified by the server. */
export async function loadPersonal(username: string) {
  try {
    const res = await fetch('/api/personal', { credentials: 'same-origin', cache: 'no-store' });
    if (res.status !== 200) return;
    usePersonal.setState({ touches: (await res.json()) as PersonalTouches, user: username });
  } catch {
    /* offline: the normal app */
  }
}

// ---- rotation state ----------------------------------------------------------

interface Rotation {
  visit: number; // app visits (one per browser tab session)
  lastAffectionate: number; // visit on which the last affectionate note was shown
  recent: Partial<Record<string, number[]>>; // pool → recently shown indexes, newest last
  lastMoment: number; // epoch ms of the last in-study message
  milestones: string[]; // milestones already celebrated
}

const key = () => `dp-academy:touch:${usePersonal.getState().user}`;

function load(): Rotation {
  try {
    const raw = localStorage.getItem(key());
    if (raw) return { visit: 0, lastAffectionate: 0, recent: {}, lastMoment: 0, milestones: [], ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return { visit: 0, lastAffectionate: 0, recent: {}, lastMoment: 0, milestones: [] };
}
function save(r: Rotation) {
  try {
    localStorage.setItem(key(), JSON.stringify(r));
  } catch {
    /* ignore */
  }
}

const fill = (text: string, t: PersonalTouches) => text.replaceAll('{name}', t.nickname);

/** Picks a message from a pool, avoiding the last few shown from it (so no back-to-back repeats). */
function pick(r: Rotation, pool: string, list: string[]): string | null {
  if (!list.length) return null;
  const recent = r.recent[pool] ?? [];
  const avoid = new Set(recent.slice(-Math.min(3, list.length - 1)));
  const options = list.map((_, i) => i).filter((i) => !avoid.has(i));
  const i = options[Math.floor(Math.random() * options.length)] ?? 0;
  r.recent[pool] = [...recent, i].slice(-6);
  return list[i];
}

function timeOfDay(d: Date) {
  const h = d.getHours();
  return h < 5 ? 'late' : h < 12 ? 'morning' : h < 18 ? 'afternoon' : h >= 22 ? 'late' : 'evening';
}

export interface VisitNote {
  greeting: string;
  note: string | null;
  tone: 'plain' | 'sweet' | 'affectionate';
}

// One greeting and note per tab session, so they don't change as you move around the app.
let visitNote: VisitNote | null = null;

/**
 * The dashboard greeting and its small note for this visit.
 *  - plain welcome / encouragement most visits,
 *  - a sweet note now and then,
 *  - an affectionate one roughly every two to four visits (never on two visits in a row),
 *    with the most affectionate ones drawn less often but still regularly.
 */
export function visitGreeting(t: PersonalTouches, now = new Date()): VisitNote {
  if (visitNote) return visitNote;
  const r = load();
  let counted = false;
  try {
    counted = sessionStorage.getItem(key()) === '1';
    sessionStorage.setItem(key(), '1');
  } catch {
    /* ignore */
  }
  if (!counted) r.visit++;

  const time = timeOfDay(now);
  const greeting = fill(pick(r, `g-${time}`, t.greetings[time]) ?? `Hello, {name}`, t);

  const sinceAffectionate = r.visit - r.lastAffectionate;
  const roll = Math.random();
  let note: string | null = null;
  let tone: VisitNote['tone'] = 'plain';
  if (sinceAffectionate >= 2 && roll < (sinceAffectionate >= 4 ? 0.85 : 0.5)) {
    const special = t.pools.special.length && Math.random() < 0.25;
    note = special ? pick(r, 'special', t.pools.special) : pick(r, 'affectionate', t.pools.affectionate);
    if (note) {
      tone = 'affectionate';
      r.lastAffectionate = r.visit;
    }
  }
  if (!note && roll < 0.8) {
    const sweet = Math.random() < 0.45;
    note = sweet ? pick(r, 'sweet', t.pools.sweet) : pick(r, 'welcome', t.pools.welcome);
    if (note) tone = sweet ? 'sweet' : 'plain';
  }
  save(r);
  visitNote = { greeting, note: note ? fill(note, t) : null, tone };
  return visitNote;
}

/**
 * A short message for a moment that just happened (a lesson completed, a practice set or
 * review finished, a focus block ended). Rationed so it stays a surprise: about half the
 * time, and at most once every few minutes, except breaks.
 */
export function moment(kind: Extract<PoolName, 'study' | 'session' | 'break'>): string | null {
  const t = usePersonal.getState().touches;
  if (!t) return null;
  const r = load();
  const now = Date.now();
  if (kind !== 'break' && (now - r.lastMoment < 4 * 60_000 || Math.random() > 0.55)) return null;
  const text = pick(r, kind, t.pools[kind]);
  if (text) r.lastMoment = now;
  save(r);
  return text ? fill(text, t) : null;
}

/** Celebrates each milestone (e.g. "streak-7") once, ever. */
export function milestone(id: string | null): string | null {
  const t = usePersonal.getState().touches;
  if (!t || !id) return null;
  const r = load();
  if (r.milestones.includes(id)) return null;
  r.milestones = [...r.milestones, id].slice(-100);
  const text = pick(r, 'milestone', t.pools.milestone);
  save(r);
  return text ? fill(text, t) : null;
}

export const footerText = (t: PersonalTouches) => fill(t.footer, t);
