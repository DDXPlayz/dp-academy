import { useProgress, type BookmarkKind } from '../store/progress';
import { Icon } from './Icon';

export function BookmarkButton({ id, kind, withLabel = false }: { id: string; kind: BookmarkKind; withLabel?: boolean }) {
  const saved = useProgress((s) => !!s.bookmarks[id]);
  const toggle = useProgress((s) => s.toggleBookmark);
  return (
    <button
      type="button"
      onClick={() => toggle(id, kind)}
      aria-pressed={saved}
      aria-label={saved ? 'Remove bookmark' : 'Bookmark'}
      title={saved ? 'Remove bookmark' : 'Bookmark'}
      className={withLabel ? 'btn-ghost h-9 px-3' : 'icon-btn'}
    >
      <Icon name="bookmark" fill={saved ? 'currentColor' : 'none'} className={saved ? 'text-accent' : ''} />
      {withLabel && <span>{saved ? 'Saved' : 'Save'}</span>}
    </button>
  );
}
