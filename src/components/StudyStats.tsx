import { addDays, streak, today } from "../lib/dates";
import { overall, pct, type StudyState } from "../lib/stats";
import { Icon, type IconName } from "./Icon";

function Stat({
  icon,
  label,
  value,
  sub,
}: {
  icon: IconName;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="card p-4">
      <p className="flex items-center gap-1.5 text-xs font-medium text-muted">
        <Icon name={icon} size={14} />
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-ink">
        {value}
      </p>
      {sub && <p className="text-xs text-muted">{sub}</p>}
    </div>
  );
}

export function StudyStats({
  state,
  studyDays,
}: {
  state: StudyState;
  studyDays: string[];
}) {
  const o = overall(state);
  const s = streak(studyDays);
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <Stat
        icon="flame"
        label="Study streak"
        value={`${s} ${s === 1 ? "day" : "days"}`}
        sub={s ? "Keep it going" : "Study today to start one"}
      />
      <Stat icon="check" label="Lessons done" value={String(o.lessonsDone)} />
      <Stat
        icon="target"
        label="Accuracy"
        value={pct(o.accuracy)}
        sub={`${o.attempts} answers`}
      />
      <Stat
        icon="clock"
        label="Time per question"
        value={o.avgSeconds == null ? "—" : `${o.avgSeconds}s`}
        sub="average"
      />
    </div>
  );
}

/** Answers given on each local calendar day. */
function answersByDay(state: StudyState): Map<string, number> {
  const m = new Map<string, number>();
  for (const a of state.attempts) {
    const d = today(new Date(a.at));
    m.set(d, (m.get(d) ?? 0) + 1);
  }
  return m;
}

/** Today's answers against the daily goal set in Settings. */
export function TodayGoal({
  state,
  goal,
}: {
  state: StudyState;
  goal: number;
}) {
  const done = answersByDay(state).get(today()) ?? 0;
  const lessons = Object.values(state.completed).filter(
    (iso) => today(new Date(iso)) === today(),
  ).length;
  const frac = goal ? Math.min(1, done / goal) : 0;
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className="card flex items-center gap-5 p-5">
      {goal > 0 && (
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          aria-hidden="true"
          className="shrink-0 -rotate-90"
        >
          <circle
            cx="32"
            cy="32"
            r={r}
            fill="none"
            stroke="var(--line)"
            strokeWidth="7"
          />
          {frac > 0 && (
            <circle
              cx="32"
              cy="32"
              r={r}
              fill="none"
              stroke={frac >= 1 ? "var(--good)" : "var(--accent)"}
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={`${c * frac} ${c}`}
            />
          )}
        </svg>
      )}
      <div className="min-w-0">
        <p className="eyebrow">Today</p>
        <p className="mt-1 text-lg font-semibold text-ink">
          {goal > 0
            ? `${done} / ${goal} questions`
            : `${done} question${done === 1 ? "" : "s"} answered`}
        </p>
        <p className="text-sm text-muted">
          {goal > 0 && done >= goal
            ? "Daily goal reached. Nice work."
            : goal > 0
              ? `${goal - done} more to reach your daily goal`
              : "Set a daily goal in Settings"}
          {lessons > 0 &&
            ` · ${lessons} lesson${lessons === 1 ? "" : "s"} completed`}
        </p>
      </div>
    </div>
  );
}

const WEEKS = 16;

/** A GitHub-style grid of the last 16 weeks: darker squares mean more questions answered and lessons completed. */
export function ActivityHeatmap({
  state,
  studyDays,
}: {
  state: StudyState;
  studyDays: string[];
}) {
  const counts = answersByDay(state);
  for (const iso of Object.values(state.completed)) {
    const d = today(new Date(iso));
    counts.set(d, (counts.get(d) ?? 0) + 3);
  }
  const studied = new Set(studyDays);
  const end = today();
  const endDow = (new Date().getDay() + 6) % 7; // Monday = 0
  const start = addDays(end, -(WEEKS * 7 - 1) + (6 - endDow));
  const days = Array.from({ length: WEEKS * 7 }, (_, i) => addDays(start, i));
  const level = (d: string) => {
    const n = counts.get(d) ?? 0;
    if (!n) return studied.has(d) ? 1 : 0;
    return n < 5 ? 1 : n < 15 ? 2 : n < 30 ? 3 : 4;
  };
  const active = days.filter((d) => d <= end && level(d) > 0).length;
  return (
    <div className="card p-5">
      <div className="mb-3 flex items-baseline justify-between">
        <p className="eyebrow">Activity</p>
        <p className="text-xs text-muted">
          {active} study days in the last {WEEKS} weeks
        </p>
      </div>
      <div className="overflow-x-auto">
        <div
          className="grid w-max grid-flow-col grid-rows-7 gap-[3px]"
          role="img"
          aria-label={`Study activity: ${active} days in the last ${WEEKS} weeks`}
        >
          {days.map((d) => (
            <span
              key={d}
              title={
                d > end
                  ? ""
                  : `${new Date(`${d}T00:00:00`).toLocaleDateString(undefined, { day: "numeric", month: "short" })}: ${level(d) ? "studied" : "no activity"}`
              }
              className="size-3 rounded-[3px]"
              style={{
                background:
                  d > end
                    ? "transparent"
                    : level(d)
                      ? "var(--accent)"
                      : "var(--sunken)",
                opacity:
                  d > end
                    ? 0
                    : level(d)
                      ? [0, 0.35, 0.55, 0.78, 1][level(d)]
                      : 1,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
