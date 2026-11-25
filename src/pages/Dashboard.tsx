import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFlashcard, getLesson, getQuestion, getSubject, getTopic, subjects } from '../content';
import { Page } from '../components/AppShell';
import { Icon } from '../components/Icon';
import { ProgressBar } from '../components/ProgressBar';
import { ActivityHeatmap, StudyStats, TodayGoal } from '../components/StudyStats';
import { SubjectCard } from '../components/SubjectCard';
import { greeting, relativeTime } from '../lib/dates';
import { continueLesson, revisitSuggestions, todaysFocus } from '../lib/recommend';
import { pct, subjectStats, topicStats, weakTopics } from '../lib/stats';
import { plain } from '../lib/search';
import { useProgress, useStudyState } from '../store/progress';

function Section({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-base font-semibold text-ink">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function NamePrompt() {
  const setName = useProgress((s) => s.setName);
  const [value, setValue] = useState('');
  return (
    <form
      className="mt-3 flex max-w-sm gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (value.trim()) setName(value);
      }}
    >
      <input className="input h-10" value={value} onChange={(e) => setValue(e.target.value)} placeholder="What should we call you?" aria-label="Your first name" />
      <button className="btn-secondary" type="submit">
        Save
      </button>
    </form>
  );
}

/** Days until the first exam, from the date set in Settings. */
function ExamCountdown({ date }: { date: string }) {
  if (!date) {
    return (
      <Link to="/settings" className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
        <Icon name="calendar" size={14} /> Set your exam date for a countdown
      </Link>
    );
  }
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const days = Math.round((new Date(`${date}T00:00:00`).getTime() - start.getTime()) / 86_400_000);
  if (days < 0) return null;
  const weeks = Math.floor(days / 7);
  return (
    <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-sm text-ink">
      <Icon name="calendar" size={14} />
      {days === 0 ? 'Exams start today. Good luck!' : `${days} day${days === 1 ? '' : 's'} until your exams${weeks >= 2 ? ` (${weeks} weeks)` : ''}`}
    </p>
  );
}

function EmptyNote({ children }: { children: React.ReactNode }) {
  return <p className="rounded-xl border border-dashed border-line px-4 py-5 text-sm text-muted">{children}</p>;
}

export default function Dashboard() {
  const name = useProgress((s) => s.name);
  const lastLesson = useProgress((s) => s.lastLesson);
  const cards = useProgress((s) => s.cards);
  const bookmarks = useProgress((s) => s.bookmarks);
  const studyDays = useProgress((s) => s.studyDays);
  const examDate = useProgress((s) => s.examDate);
  const dailyGoal = useProgress((s) => s.dailyGoal);
  const state = useStudyState();
  const levels = useProgress((s) => s.levels);

  const lesson = useMemo(() => continueLesson({ ...state, lastLesson }), [state, lastLesson]);
  const focus = useMemo(() => todaysFocus({ ...state, lastLesson }, cards), [state, lastLesson, cards]);
  const weak = useMemo(() => weakTopics(state).slice(0, 5), [state]);
  const revisit = useMemo(() => revisitSuggestions(state, cards), [state, cards]);
  const recent = Object.entries(state.visited)
    .sort((a, b) => b[1] - a[1])
    .map(([k, at]) => ({ lesson: getLesson(k), at }))
    .filter((x) => x.lesson)
    .slice(0, 4);
  const saved = Object.entries(bookmarks)
    .sort((a, b) => b[1].at - a[1].at)
    .slice(0, 4);

  const topic = lesson ? getTopic(lesson.topicKey)! : undefined;
  const tStats = topic ? topicStats(topic, state) : undefined;
  const isNew = !lastLesson;

  return (
    <Page wide>
      <header className="mb-8">
        <p className="text-sm text-muted">{new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          {greeting()}
          {name ? `, ${name}` : ''}
        </h1>
        {!name && <NamePrompt />}
        <ExamCountdown date={examDate} />
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {lesson && topic && (
          <section className="card flex flex-col p-6" aria-label="Continue studying">
            <p className="eyebrow">{isNew ? 'Start here' : 'Continue studying'}</p>
            <p className="mt-3 text-sm text-muted">
              {getSubject(lesson.subjectId)!.title} · {topic.code} {topic.title}
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-ink md:text-2xl">{lesson.meta.title}</h2>
            <p className="mt-2 text-ink-2">{lesson.meta.summary}</p>
            <div className="mt-auto pt-6">
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-muted">Topic progress</span>
                <span className="font-medium text-ink">{pct(tStats?.progress ?? 0)}</span>
              </div>
              <ProgressBar value={tStats?.progress ?? 0} label="Topic progress" />
              <Link to={lesson.href} className="btn-primary mt-5">
                {isNew ? 'Begin' : 'Continue'} <Icon name="arrowRight" size={16} />
              </Link>
            </div>
          </section>
        )}

        <section className="card p-6" aria-label="Today's focus">
          <p className="eyebrow mb-4">Today’s focus</p>
          <ul className="space-y-1">
            {focus.map((f) => (
              <li key={f.id}>
                <Link to={f.href} className="-mx-2 flex items-start gap-3 rounded-lg px-2 py-2.5 hover:bg-sunken">
                  <span
                    className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border ${
                      f.done ? 'border-good bg-good text-card' : 'border-line-strong'
                    }`}
                  >
                    {f.done && <Icon name="check" size={12} strokeWidth={3} />}
                  </span>
                  <span className="min-w-0">
                    <span className={`block text-sm font-medium ${f.done ? 'text-muted line-through' : 'text-ink'}`}>{f.label}</span>
                    <span className="block truncate text-xs text-muted">{f.detail}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-8 space-y-3">
        <StudyStats state={state} studyDays={studyDays} />
        <div className="grid gap-3 lg:grid-cols-[1fr_1.6fr]">
          <TodayGoal state={state} goal={dailyGoal} />
          <ActivityHeatmap state={state} studyDays={studyDays} />
        </div>
      </div>

      <div className="mt-10">
        <Section
          title="Your subjects"
          action={
            <Link to="/subjects" className="text-sm text-accent hover:underline">
              All subjects
            </Link>
          }
        >
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {subjects.map((s) => (
              <SubjectCard key={s.id} subject={s} stats={subjectStats(s, state, levels[s.id])} />
            ))}
          </div>
        </Section>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <Section title="Recent lessons">
          {recent.length ? (
            <ul className="card divide-y divide-line">
              {recent.map(({ lesson: l, at }) => (
                <li key={l!.key}>
                  <Link to={l!.href} className="flex items-center gap-3 px-4 py-3 hover:bg-sunken/60">
                    <Icon name={state.completed[l!.key] ? 'check' : 'note'} className={state.completed[l!.key] ? 'text-good' : 'text-muted'} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-ink">{l!.meta.title}</span>
                      <span className="block truncate text-xs text-muted">{getTopic(l!.topicKey)!.title}</span>
                    </span>
                    <span className="shrink-0 text-xs text-muted">{relativeTime(at)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyNote>Lessons you open will appear here.</EmptyNote>
          )}
        </Section>

        <Section
          title="Needs attention"
          action={
            weak.length ? (
              <Link to="/practice?mode=weak" className="text-sm text-accent hover:underline">
                Practise these
              </Link>
            ) : undefined
          }
        >
          {weak.length ? (
            <ul className="card divide-y divide-line">
              {weak.map((w) => (
                <li key={w.topic.key}>
                  <Link to={`/practice?topic=${encodeURIComponent(w.topic.key)}`} className="flex items-center gap-3 px-4 py-3 hover:bg-sunken/60">
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-ink">{w.topic.title}</span>
                      <span className="block text-xs text-muted">{getSubject(w.topic.subjectId)!.short}</span>
                    </span>
                    <span className="w-24">
                      <span className="mb-1 block text-right text-xs font-medium text-bad">{pct(w.accuracy)}</span>
                      <ProgressBar value={w.accuracy} size="sm" tone="bad" label={`${w.topic.title} accuracy`} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyNote>Topics where your recent accuracy drops below 60% will show up here once you’ve answered a few questions.</EmptyNote>
          )}
        </Section>

        <Section title="Recommended revision">
          {revisit.length ? (
            <ul className="card divide-y divide-line">
              {revisit.map(({ topic: t, last }) => (
                <li key={t.key}>
                  <Link to={`/revise?topic=${encodeURIComponent(t.key)}`} className="flex items-center gap-3 px-4 py-3 hover:bg-sunken/60">
                    <Icon name="rotate" className="text-muted" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-ink">{t.title}</span>
                      <span className="block text-xs text-muted">Last studied {relativeTime(last)}</span>
                    </span>
                    <Icon name="chevronRight" size={16} className="text-muted" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyNote>Topics you haven’t looked at for a few days will be suggested here, so nothing fades.</EmptyNote>
          )}
        </Section>

        <Section
          title="Bookmarks"
          action={
            saved.length ? (
              <Link to="/bookmarks" className="text-sm text-accent hover:underline">
                All saved
              </Link>
            ) : undefined
          }
        >
          {saved.length ? (
            <ul className="card divide-y divide-line">
              {saved.map(([key, b]) => {
                const item =
                  b.kind === 'lesson'
                    ? { title: getLesson(key)?.meta.title, href: getLesson(key)?.href, icon: 'note' as const }
                    : b.kind === 'question'
                      ? { title: plain(getQuestion(key)?.prompt ?? ''), href: '/bookmarks', icon: 'target' as const }
                      : { title: plain(getFlashcard(key)?.front ?? ''), href: '/bookmarks', icon: 'cards' as const };
                if (!item.title || !item.href) return null;
                return (
                  <li key={key}>
                    <Link to={item.href} className="flex items-center gap-3 px-4 py-3 hover:bg-sunken/60">
                      <Icon name={item.icon} className="shrink-0 text-muted" />
                      <span className="truncate text-sm text-ink">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <EmptyNote>Bookmark lessons, questions and flashcards to find them quickly.</EmptyNote>
          )}
        </Section>
      </div>
    </Page>
  );
}
