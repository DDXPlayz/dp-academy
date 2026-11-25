import { exportableState, useProgress } from '../store/progress';
import { mergeProgress } from './syncMerge';
import { redirectToLogin, useAccount } from './account';

/*
 * Keeps this device’s progress and the account copy on the server in step.
 *
 * The server stores { data, version }. We remember the version we last
 * agreed on and whether we have unsent changes ("dirty"):
 *   - on start-up and when the tab regains focus we pull; if the server moved
 *     on and we have nothing unsent, we take its copy; if both changed we merge;
 *   - every change is pushed a couple of seconds later with the version it was
 *     based on; if another device got there first (409) we merge and retry.
 */

interface Meta {
  version: number;
  dirty: boolean;
}

const PUSH_DELAY = 2000;
const PULL_EVERY = 60_000;

let user: string | null = null;
let meta: Meta = { version: 0, dirty: false };
let applying = false;
let seq = 0;
let timer: ReturnType<typeof setTimeout> | null = null;
let pushing: Promise<void> | null = null;
let lastPull = 0;
let unsubscribe: (() => void) | null = null;

const metaKey = (u: string) => `dp-academy:sync:${u}`;

function loadMeta(u: string): Meta {
  try {
    const raw = localStorage.getItem(metaKey(u));
    if (raw) return { version: 0, dirty: false, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return { version: 0, dirty: false };
}

function saveMeta() {
  if (!user) return;
  try {
    localStorage.setItem(metaKey(user), JSON.stringify(meta));
  } catch {
    /* ignore */
  }
}

const status = (sync: ReturnType<typeof useAccount.getState>['sync'], synced = false) =>
  useAccount.setState(synced ? { sync, syncedAt: Date.now() } : { sync });

function apply(data: unknown) {
  applying = true;
  try {
    useProgress.getState().replaceData(data);
  } finally {
    applying = false;
  }
}

async function request(method: 'GET' | 'PUT', body?: unknown, keepalive = false) {
  const res = await fetch('/api/progress', {
    method,
    credentials: 'same-origin',
    keepalive,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (res.status === 401) {
    redirectToLogin();
    throw new Error('signed out');
  }
  return { status: res.status, body: (await res.json().catch(() => ({}))) as { data?: unknown; version?: number } };
}

async function push(keepalive = false): Promise<void> {
  if (!user || !meta.dirty) return;
  if (pushing) {
    await pushing;
    if (meta.dirty) return push(keepalive);
    return;
  }
  pushing = (async () => {
    status('saving');
    try {
      for (let attempt = 0; attempt < 3; attempt++) {
        const sent = seq;
        const res = await request('PUT', { data: exportableState(), baseVersion: meta.version }, keepalive);
        if (res.status === 200 && typeof res.body.version === 'number') {
          meta = { version: res.body.version, dirty: seq !== sent };
          saveMeta();
          status('saved', true);
          return;
        }
        if (res.status === 409 && typeof res.body.version === 'number') {
          apply(mergeProgress(exportableState(), res.body.data));
          meta = { version: res.body.version, dirty: true };
          saveMeta();
          continue;
        }
        status('error');
        return;
      }
      status('error');
    } catch {
      status('offline');
    }
  })();
  try {
    await pushing;
  } finally {
    pushing = null;
  }
  if (meta.dirty && useAccount.getState().sync === 'saved') schedule();
}

async function pull(): Promise<void> {
  if (!user) return;
  lastPull = Date.now();
  try {
    const res = await request('GET');
    if (res.status !== 200 || typeof res.body.version !== 'number') return status('error');
    const { data, version } = res.body as { data: unknown; version: number };
    if (version !== meta.version && data) {
      if (meta.dirty) apply(mergeProgress(exportableState(), data));
      else apply(data);
      meta = { version, dirty: meta.dirty };
      saveMeta();
    }
    if (meta.dirty) await push();
    else status('saved', true);
  } catch {
    status('offline');
  }
}

function schedule() {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    timer = null;
    void push();
  }, PUSH_DELAY);
}

const onFocus = () => {
  if (document.visibilityState === 'visible' && Date.now() - lastPull > 15_000) void pull();
};
const onHide = () => {
  if (document.visibilityState === 'hidden' && meta.dirty) {
    if (timer) clearTimeout(timer);
    void push(true);
  }
};
const onOnline = () => void pull();
let interval: ReturnType<typeof setInterval> | null = null;

export function startSync(username: string, localChangesPending: boolean) {
  stopSync();
  user = username;
  meta = loadMeta(username);
  if (localChangesPending) {
    meta.dirty = true;
    saveMeta();
  }
  unsubscribe = useProgress.subscribe(() => {
    if (applying) return;
    seq++;
    if (!meta.dirty) {
      meta.dirty = true;
      saveMeta();
    }
    schedule();
  });
  window.addEventListener('focus', onFocus);
  document.addEventListener('visibilitychange', onFocus);
  document.addEventListener('visibilitychange', onHide);
  window.addEventListener('online', onOnline);
  interval = setInterval(() => document.visibilityState === 'visible' && void pull(), PULL_EVERY);
  void pull();
}

export function stopSync() {
  unsubscribe?.();
  unsubscribe = null;
  if (timer) clearTimeout(timer);
  timer = null;
  if (interval) clearInterval(interval);
  interval = null;
  window.removeEventListener('focus', onFocus);
  document.removeEventListener('visibilitychange', onFocus);
  document.removeEventListener('visibilitychange', onHide);
  window.removeEventListener('online', onOnline);
  user = null;
}

/** Sends any unsaved changes now (used before signing out). */
export async function flushSync() {
  if (timer) clearTimeout(timer);
  timer = null;
  await push();
}

/** Pull now (the "Sync now" button). */
export const syncNow = async () => {
  await pull();
};
