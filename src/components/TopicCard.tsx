import { Link } from 'react-router-dom';
import type { Topic, Unit } from '../content';
import { relativeTime } from '../lib/dates';
import { pct, type TopicStats } from '../lib/stats';
import { Icon } from './Icon';
import { ProgressBar } from './ProgressBar';

const DIFFICULTY = ['', 'Foundation', 'Standard', 'Challenging'];

function topicDifficulty(topic: Topic): number {
  if (!topic.lessons.length) return 0;
  return Math.round(topic.lessons.reduce((s, l) => s + l.meta.difficulty, 0) / topic.lessons.length);
}

function minutes(topic: Topic) {
  const m = topic.lessons.reduce((s, l) => s + l.meta.minutes, 0);
  return m >= 60 ? `${Math.floor(m / 60)} h ${m % 60 ? `${m % 60} min` : ''}` : `${m} min`;
}

/** One row of the curriculum tree. */
export function TopicCard({ topic, stats }: { topic: Topic; stats: TopicStats }) {
  const empty = !topic.lessons.length && !topic.questions.length;
  const done = stats.progress !== null && stats.progress >= 0.999;
  return (
    <Link
      to={topic.href}
      className={`group flex items-center gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-sunken md:px-4 ${empty ? 'opacity-70' : ''}`}
    >
      <span
        className={`flex size-8 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold ${
          done ? 'border-good bg-good text-card' : 'border-line-strong text-muted'
        }`}
      >
        {done ? <Icon name="check" size={16} /> : topic.code}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate font-medium text-ink">{topic.title}</p>
          {topic.hl && <span className="chip h-5 px-1.5 text-[10px]">HL</span>}
        </div>
        {empty ? (
          <p className="text-sm text-muted">Curriculum outline · lessons coming soon</p>
        ) : (
          <p className="flex flex-wrap gap-x-3 text-sm text-muted">
            <span>{topic.lessons.length} lessons</span>
            <span>{minutes(topic)}</span>
            <span>{topic.questions.length} questions</span>
            {topicDifficulty(topic) > 0 && <span className="hidden sm:inline">{DIFFICULTY[topicDifficulty(topic)]}</span>}
            {stats.lastStudied && <span className="hidden sm:inline">Studied {relativeTime(stats.lastStudied)}</span>}
          </p>
        )}
      </div>
      {!empty && (
        <div className="hidden w-28 shrink-0 sm:block">
          <div className="mb-1 text-right text-xs font-medium text-ink-2">{pct(stats.progress)}</div>
          <ProgressBar value={stats.progress ?? 0} size="sm" label={`${topic.title} progress`} />
        </div>
      )}
      <Icon name="chevronRight" size={16} className="shrink-0 text-muted transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

/** A unit (theme) heading with its topics nested below. */
export function UnitCard({ unit, index, children }: { unit: Unit; index: number; children: React.ReactNode }) {
  return (
    <section id={unit.id} className="card scroll-mt-20 p-2 md:p-3">
      <header className="flex items-baseline gap-3 px-3 pb-2 pt-3 md:px-4">
        <span className="font-mono text-sm text-muted">{String(index + 1).padStart(2, '0')}</span>
        <h2 className="text-lg font-semibold tracking-tight text-ink">
          {unit.code !== String(index + 1) && <span className="text-muted">{unit.code} · </span>}
          {unit.title}
        </h2>
      </header>
      <div className="divide-y divide-line">{children}</div>
    </section>
  );
}
