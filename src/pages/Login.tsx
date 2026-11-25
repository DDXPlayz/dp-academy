import { useState } from 'react';
import { api } from '../lib/account';
import { useApplyTheme } from '../components/ThemeToggle';

/** Where to go after signing in: only same-site paths are allowed. */
function nextPath(): string {
  const next = new URLSearchParams(window.location.search).get('next') ?? '/';
  return next.startsWith('/') && !next.startsWith('//') && !next.startsWith('/login') ? next : '/';
}

export default function Login() {
  useApplyTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await api<{ error?: string }>('auth/login', { method: 'POST', json: { username, password } });
      if (res.status === 200) {
        window.location.assign(nextPath());
        return;
      }
      setError(res.body.error ?? 'Could not sign in.');
    } catch {
      setError('Could not reach the server. Check your connection.');
    }
    setBusy(false);
  };

  return (
    <main className="flex min-h-dvh items-center justify-center bg-canvas px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center justify-center gap-2.5 font-semibold tracking-tight text-ink">
          <img src="/favicon.svg" alt="" className="size-8" />
          <span className="text-lg">DP Academy</span>
        </div>
        <form onSubmit={submit} className="card space-y-4 p-6">
          <div>
            <h1 className="text-lg font-semibold text-ink">Sign in</h1>
            <p className="mt-1 text-sm text-muted">Your progress is saved to your account and syncs across devices.</p>
          </div>
          <div>
            <label htmlFor="username" className="text-sm font-medium text-ink">
              Username
            </label>
            <input
              id="username"
              className="input mt-1.5"
              autoComplete="username"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-ink">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="input mt-1.5"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <p className="text-sm text-bad" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="btn-primary w-full" disabled={busy}>
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
          <p className="text-center text-xs text-muted">No account? Ask the person who shared this site with you.</p>
        </form>
      </div>
    </main>
  );
}
