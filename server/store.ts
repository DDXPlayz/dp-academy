/*
 * A tiny key–value store. In production it talks to Upstash Redis over its
 * REST API (add "Upstash for Redis" from the Vercel Marketplace; it sets
 * KV_REST_API_URL and KV_REST_API_TOKEN). In development it uses a JSON file
 * in the git-ignored .data/ folder, or memory in tests.
 */

export interface KV {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ttlSeconds?: number): Promise<void>;
  del(key: string): Promise<void>;
}

export function redisFromEnv(env: Record<string, string | undefined>): KV | null {
  const url = env.KV_REST_API_URL || env.UPSTASH_REDIS_REST_URL;
  const token = env.KV_REST_API_TOKEN || env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  const call = async (cmd: (string | number)[]) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(cmd),
    });
    if (!res.ok) throw new Error(`storage error ${res.status}`);
    return ((await res.json()) as { result: unknown }).result;
  };
  return {
    get: async (key) => {
      const r = await call(['GET', key]);
      return typeof r === 'string' ? r : null;
    },
    set: async (key, value, ttl) => {
      await call(ttl ? ['SET', key, value, 'EX', ttl] : ['SET', key, value]);
    },
    del: async (key) => {
      await call(['DEL', key]);
    },
  };
}

type Entry = { v: string; exp?: number };

/** In-memory store with optional persistence hooks (used by the dev file store and tests). */
export function memoryKV(initial: Record<string, Entry> = {}, onChange?: (data: Record<string, Entry>) => void): KV {
  const data = { ...initial };
  const live = (key: string) => {
    const e = data[key];
    if (e?.exp && e.exp < Date.now()) {
      delete data[key];
      return undefined;
    }
    return e;
  };
  return {
    get: async (key) => live(key)?.v ?? null,
    set: async (key, value, ttl) => {
      data[key] = ttl ? { v: value, exp: Date.now() + ttl * 1000 } : { v: value };
      onChange?.(data);
    },
    del: async (key) => {
      delete data[key];
      onChange?.(data);
    },
  };
}
