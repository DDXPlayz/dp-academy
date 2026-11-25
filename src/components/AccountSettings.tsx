import { useEffect, useState } from 'react';
import { api, signOut, useAccount } from '../lib/account';
import { syncNow } from '../lib/sync';
import { Icon } from './Icon';

const SYNC_TEXT = {
  idle: 'Not synced yet',
  saving: 'Saving…',
  saved: 'Synced',
  offline: 'Offline — changes are kept on this device and will sync when you reconnect',
  error: 'Sync problem — your changes are safe on this device; try “Sync now”',
} as const;

function ago(t: number | null) {
  if (!t) return '';
  const s = Math.round((Date.now() - t) / 1000);
  if (s < 60) return ' just now';
  if (s < 3600) return ` ${Math.round(s / 60)} min ago`;
  return ` at ${new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}

export function AccountCard() {
  const { username, role, sync, syncedAt } = useAccount();
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await api<{ error?: string }>('auth/password', { method: 'POST', json: { current, next } });
    setMessage(res.status === 200 ? 'Password changed.' : res.body.error ?? 'Could not change password.');
    if (res.status === 200) {
      setCurrent('');
      setNext('');
      setOpen(false);
    }
  };

  return (
    <section className="card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-ink">Account</p>
          <p className="mt-1 text-sm text-ink-2">
            Signed in as <span className="font-medium text-ink">{username}</span>
            {role === 'admin' && <span className="chip ml-2">Owner</span>}
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted" role="status">
            <Icon name="cloud" size={16} />
            {SYNC_TEXT[sync]}
            {sync === 'saved' && ago(syncedAt)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-secondary" onClick={() => void syncNow()}>
            <Icon name="rotate" size={16} /> Sync now
          </button>
          <button type="button" className="btn-secondary" onClick={() => void signOut()}>
            <Icon name="logout" size={16} /> Sign out
          </button>
        </div>
      </div>

      {role === 'member' && (
        <div className="mt-4 border-t border-line pt-4">
          {!open ? (
            <button type="button" className="btn-ghost -ml-3" onClick={() => setOpen(true)}>
              Change password
            </button>
          ) : (
            <form onSubmit={changePassword} className="grid gap-3 sm:grid-cols-2">
              <input className="input" type="password" placeholder="Current password" autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} required />
              <input className="input" type="password" placeholder="New password (8+ characters)" autoComplete="new-password" minLength={8} value={next} onChange={(e) => setNext(e.target.value)} required />
              <div className="flex gap-2 sm:col-span-2">
                <button type="submit" className="btn-primary">
                  Save password
                </button>
                <button type="button" className="btn-ghost" onClick={() => setOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}
      {message && <p className="mt-3 text-sm text-ink-2">{message}</p>}
    </section>
  );
}

interface Person {
  username: string;
  created: string | null;
}

/** Owner only: create accounts for friends, reset passwords, remove access. */
export function PeopleCard() {
  const role = useAccount((s) => s.role);
  const [people, setPeople] = useState<Person[] | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const load = async () => {
    const res = await api<Person[]>('users');
    if (res.status === 200) setPeople(res.body);
    else setMessage('Could not load accounts.');
  };

  useEffect(() => {
    if (role === 'admin') void load();
  }, [role]);

  if (role !== 'admin') return null;

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await api<{ error?: string; username?: string }>('users', { method: 'POST', json: { username, password } });
    if (res.status === 201) {
      setMessage(`Account “${res.body.username}” created. Send them the site link, their username and this password; they can change it in Settings.`);
      setUsername('');
      setPassword('');
      void load();
    } else setMessage(res.body.error ?? 'Could not create the account.');
  };

  const reset = async (name: string) => {
    const pw = prompt(`New password for ${name} (at least 8 characters):`);
    if (!pw) return;
    const res = await api<{ error?: string }>(`users/${encodeURIComponent(name)}/password`, { method: 'POST', json: { password: pw } });
    setMessage(res.status === 200 ? `Password for ${name} reset.` : res.body.error ?? 'Could not reset the password.');
  };

  const remove = async (name: string) => {
    if (!confirm(`Remove ${name}’s account? Their saved progress will be deleted and they will be signed out within a few days at most. This cannot be undone.`)) return;
    const res = await api('users/' + encodeURIComponent(name), { method: 'DELETE' });
    setMessage(res.status === 200 ? `${name} removed.` : 'Could not remove the account.');
    void load();
  };

  const suggest = () => {
    const words = 'amber cedar delta ember fjord glade harbor indigo juniper kestrel lumen maple'.split(' ');
    const pick = () => words[crypto.getRandomValues(new Uint32Array(1))[0] % words.length];
    setPassword(`${pick()}-${pick()}-${crypto.getRandomValues(new Uint32Array(1))[0] % 900 + 100}`);
  };

  return (
    <section className="card p-5">
      <p className="flex items-center gap-2 text-sm font-medium text-ink">
        <Icon name="users" size={16} /> People
      </p>
      <p className="mt-1 text-sm text-muted">Give friends their own login. Each account has its own progress, synced across their devices.</p>

      <form onSubmit={create} className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <input
          className="input"
          placeholder="Username (e.g. maya)"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          value={username}
          onChange={(e) => setUsername(e.target.value.toLowerCase())}
          required
        />
        <div className="flex gap-2">
          <input className="input" placeholder="Password (8+ characters)" value={password} minLength={8} onChange={(e) => setPassword(e.target.value)} required />
          <button type="button" className="btn-ghost shrink-0 px-2" onClick={suggest} title="Suggest a password">
            <Icon name="shuffle" size={16} />
          </button>
        </div>
        <button type="submit" className="btn-primary">
          Add
        </button>
      </form>

      {message && (
        <p className="mt-3 text-sm text-ink-2" role="status">
          {message}
        </p>
      )}

      <ul className="mt-4 divide-y divide-line">
        {people?.length === 0 && <li className="py-3 text-sm text-muted">No other accounts yet.</li>}
        {people?.map((p) => (
          <li key={p.username} className="flex flex-wrap items-center justify-between gap-2 py-3">
            <div className="flex items-center gap-2 text-sm">
              <Icon name="user" size={16} />
              <span className="font-medium text-ink">{p.username}</span>
              {p.created && <span className="text-muted">· added {new Date(p.created).toLocaleDateString()}</span>}
            </div>
            <div className="flex gap-1">
              <button type="button" className="btn-ghost h-8 px-3" onClick={() => void reset(p.username)}>
                Reset password
              </button>
              <button type="button" className="btn-ghost h-8 px-3 text-bad hover:text-bad" onClick={() => void remove(p.username)}>
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
