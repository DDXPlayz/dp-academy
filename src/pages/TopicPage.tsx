import { lazy, Suspense } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getSubject, getTopic } from '../content';
import { Page } from '../components/AppShell';
import { Icon } from '../components/Icon';
import { ProgressBar } from '../components/ProgressBar';
import { relativeTime } from '../lib/dates';
import { pct, topicStats } from '../lib/stats';
import { useProgress, useStudyState } from '../store/progress';
import NotFound from './NotFound';

const DIFFICULTY = ['', 'Foundation', 'Standard', 'Challenging'];

// Private reference notes exist only in local development; production builds drop this branch entirely.
const ReferenceNotes = import.meta.env.DEV ? lazy(() => import('../components/ReferenceNotes')) : null;

export default function TopicPage() {
  const { subjectId = '', topicId = '' } = useParams();
  const subject = getSubject(subjectId);
  const topic = getTopic(`${subjectId}/${topicId}`);
  const state = useStudyState();
  const notes = useProgress((s) => s.notes);
  if (!subject || !topic) return <NotFound />;

  const st = topicStats(topic, state);
  const firstOpen = topic.lessons.find((l) => !state.completed[l.key]) ?? topic.lessons[0];
  const unit = subject.units.find((u) => u.id === topic.unitId)!;

  return (
    <Page>
      <nav className="mb-4 flex items-center gap-1 text-sm text-muted">
        <Link to={subject.href} className="inline-flex items-center gap-1 hover:text-ink">
          <Icon name="arrowLeft" size={14} /> {subject.title}
        </Link>
      </nav>

      <header className="mb-8">
        <p className="eyebrow mb-2">
          {unit.code} · {unit.title}
        </p>
        <h1 className="flex flex-wrap items-center gap-3 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          <span className="text-muted">{topic.code}</span> {topic.title}
          {topic.hl && <span className="chip">HL only</span>}
        </h1>
        <p className="mt-2 max-w-2xl text-ink-2">{topic.summary}</p>
        <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
          {topic.hours && <span>{topic.hours} teaching hours</span>}
          <span>{topic.lessons.length} lessons</span>
          <span>{topic.questions.length} practice questions</span>
          <span>{topic.flashcards.length} flashcards</span>
          {st.lastStudied && <span>Last studied {relativeTime(st.lastStudied)}</span>}
        </p>
      </header>

      {topic.lessons.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="font-medium text-ink">Lessons for this topic are being written.</p>
          <p className="mt-1 text-sm text-muted">The curriculum outline is in place; original lessons and questions will be added here.</p>
          <Link to={subject.href} className="btn-secondary mt-5">
            Back to {subject.short}
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <section aria-label="Lessons" className="card p-2">
            <ol className="divide-y divide-line">
              {topic.lessons.map((l, i) => {
                const done = !!state.completed[l.key];
                return (
                  <li key={l.key}>
                    <Link to={l.href} className="group flex items-start gap-4 rounded-lg px-3 py-4 hover:bg-sunken md:px-4">
                      <span
                        className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                          done ? 'border-good bg-good text-card' : 'border-line-strong text-muted'
                        }`}
                      >
                        {done ? <Icon name="check" size={14} /> : i + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="font-medium text-ink">{l.meta.title}</span>
                          {l.meta.hl && <span className="chip h-5 px-1.5 text-[10px]">HL</span>}
                          {notes[l.key] && <Icon name="note" size={14} className="text-muted" aria-label="Has notes" />}
                        </span>
                        <span className="mt-0.5 block text-sm text-ink-2">{l.meta.summary}</span>
                        <span className="mt-1 block text-xs text-muted">
                          {l.meta.minutes} min · {DIFFICULTY[l.meta.difficulty]}
                          {state.visited[l.key] ? ` · opened ${relativeTime(state.visited[l.key])}` : ''}
                        </span>
                      </span>
                      <Icon name="chevronRight" size={16} className="mt-1 shrink-0 text-muted" />
                    </Link>
                  </li>
                );
              })}
            </ol>
          </section>

          <aside className="space-y-4">
            <div className="card p-5">
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-muted">Progress</span>
                <span className="font-medium text-ink">{pct(st.progress)}</span>
              </div>
              <ProgressBar value={st.progress ?? 0} label="Topic progress" />
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-muted">Lessons</dt>
                  <dd className="font-medium text-ink">
                    {st.lessonsDone}/{st.lessonsTotal}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">Accuracy</dt>
                  <dd className="font-medium text-ink">{pct(st.accuracy)}</dd>
                </div>
              </dl>
              {firstOpen && (
                <Link to={firstOpen.href} className="btn-primary mt-5 w-full">
                  {st.lessonsDone ? 'Continue' : 'Start'} lessons
                </Link>
              )}
            </div>
            <div className="card divide-y divide-line">
              {topic.questions.length > 0 && (
                <Link to={`/practice?topic=${encodeURIComponent(topic.key)}`} className="flex items-center gap-3 p-4 hover:bg-sunken/60">
                  <Icon name="target" className="text-accent" />
                  <span className="flex-1 text-sm font-medium text-ink">Practice questions</span>
                  <span className="text-sm text-muted">{topic.questions.length}</span>
                </Link>
              )}
              {topic.flashcards.length > 0 && (
                <Link to={`/revise/flashcards?topic=${encodeURIComponent(topic.key)}`} className="flex items-center gap-3 p-4 hover:bg-sunken/60">
                  <Icon name="cards" className="text-accent" />
                  <span className="flex-1 text-sm font-medium text-ink">Flashcards</span>
                  <span className="text-sm text-muted">{topic.flashcards.length}</span>
                </Link>
              )}
              <Link to={`/revise?topic=${encodeURIComponent(topic.key)}`} className="flex items-center gap-3 p-4 hover:bg-sunken/60">
                <Icon name="formula" className="text-accent" />
                <span className="flex-1 text-sm font-medium text-ink">Quick revision</span>
                <Icon name="chevronRight" size={16} className="text-muted" />
              </Link>
            </div>
          </aside>
        </div>
      )}

      {ReferenceNotes && (
        <Suspense fallback={null}>
          <ReferenceNotes subjectId={subject.id} topicId={topic.id} />
        </Suspense>
      )}
    </Page>
  );
}
