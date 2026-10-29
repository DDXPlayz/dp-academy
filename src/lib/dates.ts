/** Local calendar date as YYYY-MM-DD. */
export function today(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function addDays(date: string, n: number): string {
  const [y, m, d] = date.split('-').map(Number);
  return today(new Date(y, m - 1, d + n));
}

/** Consecutive study days ending today (or yesterday, so a streak survives until midnight). */
export function streak(days: string[]): number {
  const set = new Set(days);
  let cursor = today();
  if (!set.has(cursor)) cursor = addDays(cursor, -1);
  let n = 0;
  while (set.has(cursor)) {
    n++;
    cursor = addDays(cursor, -1);
  }
  return n;
}

export function relativeTime(ms: number): string {
  const diff = Date.now() - ms;
  const min = Math.round(diff / 60000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min} min ago`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h} h ago`;
  const d = Math.round(h / 24);
  if (d === 1) return 'yesterday';
  if (d < 7) return `${d} days ago`;
  return new Date(ms).toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
}

export function greeting(d = new Date()): string {
  const h = d.getHours();
  if (h < 5) return 'Studying late';
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}
