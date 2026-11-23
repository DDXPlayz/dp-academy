/*
 * Development-only list of lessons converted from private notes, shown on a
 * topic page. Loaded lazily behind `import.meta.env.DEV`.
 */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { lessonKey, SOURCE_LABEL, topicLessons, type LocalLesson } from '../lib/localLessons';
import { useProgress } from '../store/progress';
import { Icon } from './Icon';

export default function LocalLessonList({ subjectId, topicId, onCount }: { subjectId: string; topicId: string; onCount?: (n: number) => void }) {
  const [lessons, setLessons] = useState<LocalLesson[] | null>(null);
  const completed = useProgress((s) => s.completed);

  useEffect(() => {
    let live = true;
    topicLessons(subjectId, topicId).then((l) => {
      if (!live) return;
      setLessons(l);
      onCount?.(l.length);
    });
    return () => {
      live = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectId, topicId]);

  if (!lessons?.length) return null;
  const groups = (['sme', 'iitian'] as const).map((src) => [src, lessons.filter((l) => l.source === src)] as const).filter(([, l]) => l.length);

  return (
    <div className="space-y-6">
      {groups.map(([src, list]) => (
        <section key={src} aria-label={SOURCE_LABEL[src]} className="card p-2">
          <header className="flex items-baseline justify-between gap-2 px-3 pb-1 pt-3">
            <h2 className="font-semibold text-ink">{SOURCE_LABEL[src]}</h2>
            <span className="text-xs text-muted">{list.length} lessons · local copy</span>
          </header>
          <ol className="divide-y divide-line">
            {list.map((l, i) => {
              const done = !!completed[lessonKey(subjectId, topicId, l.slug)];
              return (
                <li key={l.slug}>
                  <Link to={`/s/${subjectId}/${topicId}/notes/${l.slug}`} className="group flex items-center gap-4 rounded-lg px-3 py-3.5 hover:bg-sunken md:px-4">
                    <span
                      className={`flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                        done ? 'border-good bg-good text-card' : 'border-line-strong text-muted'
                      }`}
                    >
                      {done ? <Icon name="check" size={14} /> : i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium text-ink">{l.title}</span>
                      <span className="mt-0.5 block text-xs text-muted">~{Math.max(2, Math.round(l.chars / 1100))} min read</span>
                    </span>
                    <Icon name="chevronRight" size={16} className="shrink-0 text-muted" />
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}
