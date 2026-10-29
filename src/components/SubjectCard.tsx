import { Link } from 'react-router-dom';
import type { Subject } from '../content';
import { pct, type SubjectStats } from '../lib/stats';
import { ProgressRing } from './ProgressBar';

export function SubjectCard({ subject, stats }: { subject: Subject; stats: SubjectStats }) {
  return (
    <Link to={subject.href} className="card card-hover group flex items-center gap-4 p-4">
      <div className="relative">
        <ProgressRing value={stats.progress} size={48} colour={subject.colour} />
        <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold text-ink">
          {Math.round(stats.progress * 100)}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-ink">{subject.title}</p>
        <p className="truncate text-sm text-muted">
          {stats.lessonsDone}/{stats.lessonsTotal} lessons · accuracy {pct(stats.accuracy)}
        </p>
      </div>
    </Link>
  );
}
