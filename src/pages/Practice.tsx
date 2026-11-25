import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { allQuestions, getSubject, getTopic, subjects, type PracticeQuestion } from '../content';
import { Page, PageHeader } from '../components/AppShell';
import { Icon } from '../components/Icon';
import { ProgressBar } from '../components/ProgressBar';
import { Quiz } from '../components/Quiz';
import { latestAttempts, pct, topicStats, weakConcepts, weakTopics } from '../lib/stats';
import { useStudyState } from '../store/progress';

function shuffle<T>(list: T[]): T[] {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Practice() {
  const [params, setParams] = useSearchParams();
  const state = useStudyState();
  const topicKey = params.get('topic');
  const mode = params.get('mode');
  const focusId = params.get('q');

  // Questions are chosen once per URL so answering doesn't reshuffle the set.
  const session = useMemo((): { title: string; questions: PracticeQuestion[]; start: number } | null => {
    if (topicKey) {
      const t = getTopic(topicKey);
      if (!t) return null;
      const start = focusId ? Math.max(0, t.questions.findIndex((q) => q.id === focusId)) : 0;
      return { title: `${t.code} ${t.title}`, questions: t.questions, start };
    }
    if (mode === 'weak') {
      const topics = new Set(weakTopics(state).map((w) => w.topic.key));
      const concepts = new Set(weakConcepts(state).map((c) => `${c.topic.key}::${c.concept}`));
      const pool = allQuestions().filter((q) => topics.has(q.topicKey) || concepts.has(`${q.topicKey}::${q.concept}`));
      return { title: 'Weak areas', questions: shuffle(pool).slice(0, 12), start: 0 };
    }
    if (mode === 'mistakes') {
      // Questions whose most recent answer was wrong, newest mistakes first.
      const wrong = [...latestAttempts(state.attempts).values()].filter((a) => !a.correct).sort((a, b) => b.at - a.at);
      const byKey = new Map(allQuestions().map((q) => [q.key, q]));
      const pool = wrong.map((a) => byKey.get(a.key)).filter((q): q is PracticeQuestion => !!q);
      return { title: 'Retry mistakes', questions: pool.slice(0, 15), start: 0 };
    }
    if (mode === 'mixed') {
      const studied = new Set(state.attempts.map((a) => a.topicKey));
      const pool = allQuestions().filter((q) => !studied.size || studied.has(q.topicKey));
      return { title: 'Mixed practice', questions: shuffle(pool).slice(0, 10), start: 0 };
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicKey, mode, focusId]);

  if (session) {
    const t = topicKey ? getTopic(topicKey) : undefined;
    return (
      <Page>
        <nav className="mb-6 text-sm">
          <button type="button" onClick={() => setParams({})} className="inline-flex items-center gap-1 text-muted hover:text-ink">
            <Icon name="arrowLeft" size={14} /> Practice
          </button>
          {t && (
            <Link to={t.href} className="ml-4 text-muted hover:text-ink">
              Topic overview
            </Link>
          )}
        </nav>
        <div className="mx-auto max-w-3xl">
          {session.questions.length ? (
            <Quiz key={`${topicKey}-${mode}`} questions={session.questions} startAt={session.start} title={session.title} onExit={() => setParams({})} />
          ) : (
            <div className="card p-8 text-center text-ink-2">
              {mode === 'mistakes' ? 'No mistakes to retry. Every question you have answered, your latest answer was right.' : mode === 'weak' ? 'No weak areas yet — answer more questions and they will be identified automatically.' : 'No questions here yet.'}
            </div>
          )}
        </div>
      </Page>
    );
  }

  const latest = latestAttempts(state.attempts);
  const weak = weakTopics(state);
  const mistakes = [...latest.values()].filter((a) => !a.correct).length;

  return (
    <Page>
      <PageHeader title="Practice">
        Original exam-style questions with full explanations. Your accuracy feeds the weak-topic tracker.
      </PageHeader>

      <div className="mb-10 grid gap-3 sm:grid-cols-3">
        <button type="button" onClick={() => setParams({ mode: 'mixed' })} className="card card-hover flex items-center gap-4 p-5 text-left">
          <Icon name="shuffle" size={22} className="text-accent" />
          <span className="flex-1">
            <span className="block font-medium text-ink">Mixed set</span>
            <span className="block text-sm text-muted">10 random questions from topics you’ve practised</span>
          </span>
        </button>
        <button
          type="button"
          onClick={() => setParams({ mode: 'weak' })}
          disabled={!weak.length}
          className="card card-hover flex items-center gap-4 p-5 text-left disabled:opacity-60"
        >
          <Icon name="alert" size={22} className="text-bad" />
          <span className="flex-1">
            <span className="block font-medium text-ink">Weak areas</span>
            <span className="block text-sm text-muted">
              {weak.length ? `${weak.length} topic${weak.length > 1 ? 's' : ''} below 60%` : 'Nothing flagged yet'}
            </span>
          </span>
        </button>
        <button
          type="button"
          onClick={() => setParams({ mode: 'mistakes' })}
          disabled={!mistakes}
          className="card card-hover flex items-center gap-4 p-5 text-left disabled:opacity-60"
        >
          <Icon name="rotate" size={22} className="text-accent" />
          <span className="flex-1">
            <span className="block font-medium text-ink">Retry mistakes</span>
            <span className="block text-sm text-muted">
              {mistakes ? `${mistakes} question${mistakes > 1 ? 's' : ''} you last got wrong` : 'No mistakes to retry'}
            </span>
          </span>
        </button>
      </div>

      <div className="space-y-8">
        {subjects.map((s) => {
          const topics = s.topics.filter((t) => t.questions.length);
          if (!topics.length) return null;
          return (
            <section key={s.id}>
              <h2 className="mb-3 flex items-center gap-2 font-semibold text-ink">
                <span className="size-2.5 rounded-full" style={{ background: s.colour }} />
                {getSubject(s.id)!.title}
              </h2>
              <div className="card divide-y divide-line">
                {topics.map((t) => {
                  const st = topicStats(t, state, latest);
                  return (
                    <Link key={t.key} to={`?topic=${encodeURIComponent(t.key)}`} className="flex items-center gap-4 px-4 py-3.5 hover:bg-sunken/60">
                      <span className="w-10 font-mono text-sm text-muted">{t.code}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium text-ink">{t.title}</span>
                        <span className="block text-xs text-muted">
                          {st.questionsCorrect}/{t.questions.length} mastered · {st.attempts} attempts
                        </span>
                      </span>
                      <span className="hidden w-28 sm:block">
                        <span className="mb-1 block text-right text-xs text-muted">accuracy {pct(st.accuracy)}</span>
                        <ProgressBar
                          value={st.accuracy ?? 0}
                          size="sm"
                          tone={st.accuracy === null ? 'accent' : st.accuracy < 0.6 ? 'bad' : 'good'}
                          label={`${t.title} accuracy`}
                        />
                      </span>
                      <Icon name="chevronRight" size={16} className="text-muted" />
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </Page>
  );
}
