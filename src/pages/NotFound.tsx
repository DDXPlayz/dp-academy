import { Link } from 'react-router-dom';
import { Page } from '../components/AppShell';

export default function NotFound() {
  return (
    <Page>
      <div className="py-20 text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-2 text-2xl font-semibold text-ink">This page doesn’t exist</h1>
        <p className="mt-2 text-ink-2">It may have moved, or the link may be mistyped.</p>
        <Link to="/" className="btn-primary mt-6">
          Back to home
        </Link>
      </div>
    </Page>
  );
}
