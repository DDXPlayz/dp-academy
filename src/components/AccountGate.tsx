import { useEffect } from 'react';
import { initAccount, useAccount } from '../lib/account';

/** Shows the app only once we know whose progress to load. */
export function AccountGate({ children }: { children: React.ReactNode }) {
  const status = useAccount((s) => s.status);
  const message = useAccount((s) => s.message);

  useEffect(() => {
    void initAccount();
  }, []);

  if (status === 'ready') return <>{children}</>;
  if (status === 'loading') return <div className="min-h-dvh bg-canvas" aria-busy="true" />;

  return (
    <main className="flex min-h-dvh items-center justify-center bg-canvas px-4">
      <div className="card max-w-md space-y-3 p-6 text-sm text-ink-2">
        <h1 className="text-lg font-semibold text-ink">{status === 'unconfigured' ? 'Accounts are not set up yet' : 'Can’t reach DP Academy'}</h1>
        {status === 'unconfigured' ? (
          <p>{message || 'The server is missing its account settings.'} See “Going online” in the README.</p>
        ) : (
          <p>Check your internet connection and try again.</p>
        )}
        <button type="button" className="btn-secondary" onClick={() => window.location.reload()}>
          Try again
        </button>
      </div>
    </main>
  );
}
