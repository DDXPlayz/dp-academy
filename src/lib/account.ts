import { create } from 'zustand';
import { exportableState, useProgress } from '../store/progress';
import { startSync, stopSync, flushSync } from './sync';
import { loadPersonal } from './personal';

/*
 * Who is signed in, and which local copy of progress belongs to them.
 * Each account keeps its own localStorage key so friends sharing a device
 * never see each other’s progress; the server copy is the source of truth
 * across devices (see sync.ts).
 */

export type Role = 'admin' | 'member';
export type AccountStatus = 'loading' | 'ready' | 'unconfigured' | 'unreachable';
export type SyncState = 'idle' | 'saving' | 'saved' | 'offline' | 'error';

interface AccountState {
  status: AccountStatus;
  username: string;
  role: Role;
  message: string;
  sync: SyncState;
  syncedAt: number | null;
}

export const useAccount = create<AccountState>(() => ({
  status: 'loading',
  username: '',
  role: 'member',
  message: '',
  sync: 'idle',
  syncedAt: null,
}));

const LEGACY_KEY = 'dp-academy:v1';
const LAST_USER_KEY = 'dp-academy:last-user';
export const progressKey = (username: string) => `dp-academy:v1:u:${username}`;

function storageGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function storageSet(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    /* private mode: work from memory */
  }
}

/** Points the progress store at this account’s local copy and loads it. */
async function loadLocalProgress(username: string, role: Role): Promise<boolean> {
  const key = progressKey(username);
  let migrated = false;
  // Progress saved before accounts existed belongs to the owner.
  if (role === 'admin' && !storageGet(key) && storageGet(LEGACY_KEY)) {
    storageSet(key, storageGet(LEGACY_KEY));
    storageSet(LEGACY_KEY, null);
    migrated = true;
  }
  useProgress.persist.setOptions({ name: key });
  if (storageGet(key)) await useProgress.persist.rehydrate();
  else useProgress.getState().reset();
  return migrated;
}

export function redirectToLogin() {
  const here = window.location.pathname + window.location.search;
  const next = here === '/' || here.startsWith('/login') ? '' : `?next=${encodeURIComponent(here)}`;
  window.location.assign(`/login${next}`);
}

export async function api<T>(path: string, init: RequestInit & { json?: unknown } = {}): Promise<{ status: number; body: T }> {
  const { json, ...rest } = init;
  const res = await fetch(`/api/${path}`, {
    credentials: 'same-origin',
    ...rest,
    headers: { ...(json !== undefined ? { 'Content-Type': 'application/json' } : {}), ...rest.headers },
    body: json !== undefined ? JSON.stringify(json) : rest.body,
  });
  const type = res.headers.get('content-type') ?? '';
  const body = (type.includes('application/json') ? await res.json() : {}) as T;
  return { status: res.status, body };
}

let initialised = false;

/** Called once at start-up: find out who is signed in and start syncing. */
export async function initAccount() {
  if (initialised) return;
  initialised = true;
  let res: { status: number; body: { username?: string; role?: Role; error?: string } };
  try {
    res = await api('auth/me');
  } catch {
    res = { status: 0, body: {} };
  }

  if (res.status === 200 && res.body.username) {
    const username = res.body.username;
    const role = res.body.role ?? 'member';
    storageSet(LAST_USER_KEY, JSON.stringify({ username, role }));
    const migrated = await loadLocalProgress(username, role);
    useAccount.setState({ status: 'ready', username, role });
    startSync(username, migrated);
    // Only here, after the server confirmed who is signed in (not in the offline fallback below).
    void loadPersonal(username);
    return;
  }
  if (res.status === 401) return redirectToLogin();
  if (res.status === 503) return useAccount.setState({ status: 'unconfigured', message: res.body.error ?? '' });

  // Server unreachable (offline): keep studying with the last account’s local copy.
  const last = storageGet(LAST_USER_KEY);
  if (last) {
    const { username, role } = JSON.parse(last) as { username: string; role: Role };
    await loadLocalProgress(username, role);
    useAccount.setState({ status: 'ready', username, role, sync: 'offline' });
    startSync(username, false);
    return;
  }
  useAccount.setState({ status: 'unreachable' });
}

export async function signOut() {
  await flushSync();
  stopSync();
  try {
    await api('auth/logout', { method: 'POST' });
  } catch {
    /* offline: the cookie expires on its own */
  }
  storageSet(LAST_USER_KEY, null);
  window.location.assign('/login');
}

/** For the export button: the current account’s data. */
export const currentData = () => exportableState();
