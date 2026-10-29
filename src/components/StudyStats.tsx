import { streak } from '../lib/dates';
import { overall, pct, type StudyState } from '../lib/stats';
import { Icon, type IconName } from './Icon';

function Stat({ icon, label, value, sub }: { icon: IconName; label: string; value: string; sub?: string }) {
  return (
    <div className="card p-4">
      <p className="flex items-center gap-1.5 text-xs font-medium text-muted">
        <Icon name={icon} size={14} />
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-ink">{value}</p>
      {sub && <p className="text-xs text-muted">{sub}</p>}
    </div>
  );
}

export function StudyStats({ state, studyDays }: { state: StudyState; studyDays: string[] }) {
  const o = overall(state);
  const s = streak(studyDays);
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <Stat icon="flame" label="Study streak" value={`${s} ${s === 1 ? 'day' : 'days'}`} sub={s ? 'Keep it going' : 'Study today to start one'} />
      <Stat icon="check" label="Lessons done" value={String(o.lessonsDone)} />
      <Stat icon="target" label="Accuracy" value={pct(o.accuracy)} sub={`${o.attempts} answers`} />
      <Stat icon="clock" label="Time per question" value={o.avgSeconds == null ? '—' : `${o.avgSeconds}s`} sub="average" />
    </div>
  );
}
