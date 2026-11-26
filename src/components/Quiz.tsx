import { useMemo, useState } from 'react';
import { showMoment } from './PersonalTouches';
import { Link } from 'react-router-dom';
import { getTopic, type PracticeQuestion } from '../content';
import { pct } from '../lib/stats';
import { Icon } from './Icon';
import { ProgressBar } from './ProgressBar';
import { QuestionCard } from './QuestionCard';

interface Result {
  key: string;
  correct: boolean;
}

/** Runs a set of questions one at a time and summarises the session at the end. */
export function Quiz({ questions, startAt = 0, title, onExit }: { questions: PracticeQuestion[]; startAt?: number; title: string; onExit?: () => void }) {
  const [set, setSet] = useState(questions);
  const [i, setI] = useState(Math.min(startAt, questions.length - 1));
  const [results, setResults] = useState<Record<string, Result>>({});
  const [started] = useState(Date.now());
  const [finished, setFinished] = useState(false);

  const q = set[i];
  const answered = q ? results[q.key] : undefined;
  const count = Object.keys(results).length;

  const summary = useMemo(() => {
    const list = Object.values(results);
    const right = list.filter((r) => r.correct).length;
    const byConcept = new Map<string, { right: number; total: number; topicKey: string }>();
    for (const r of list) {
      const question = set.find((x) => x.key === r.key)!;
      const c = byConcept.get(question.concept) ?? { right: 0, total: 0, topicKey: question.topicKey };
      c.total++;
      if (r.correct) c.right++;
      byConcept.set(question.concept, c);
    }
    return { right, total: list.length, byConcept: [...byConcept.entries()].sort((a, b) => a[1].right / a[1].total - b[1].right / b[1].total) };
  }, [results, set]);

  if (!set.length) return null;

  if (finished) {
    const wrong = set.filter((x) => results[x.key] && !results[x.key].correct);
    const minutes = Math.max(1, Math.round((Date.now() - started) / 60000));
    return (
      <div className="animate-rise card p-6 md:p-8">
        <p className="eyebrow">Session complete</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink">
          {summary.right} of {summary.total} correct
        </h2>
        <p className="mt-1 text-ink-2">
          {pct(summary.total ? summary.right / summary.total : 0)} accuracy · about {minutes} min
        </p>
        <ProgressBar value={summary.total ? summary.right / summary.total : 0} tone={summary.right / summary.total >= 0.6 ? 'good' : 'bad'} className="mt-5" />

        <h3 className="mt-8 text-sm font-semibold text-ink">By concept</h3>
        <ul className="mt-3 divide-y divide-line">
          {summary.byConcept.map(([concept, c]) => (
            <li key={concept} className="flex items-center gap-3 py-2.5 text-sm">
              <span className="flex-1 text-ink-2">{concept}</span>
              <span className="text-muted">{getTopic(c.topicKey)?.code}</span>
              <span className={`w-12 text-right font-medium ${c.right / c.total >= 0.6 ? 'text-good' : 'text-bad'}`}>
                {c.right}/{c.total}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          {wrong.length > 0 && (
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                setSet(wrong);
                setI(0);
                setResults({});
                setFinished(false);
              }}
            >
              <Icon name="rotate" size={16} /> Retry {wrong.length} missed
            </button>
          )}
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              setSet(questions);
              setI(0);
              setResults({});
              setFinished(false);
            }}
          >
            Start over
          </button>
          {onExit ? (
            <button type="button" className="btn-ghost" onClick={onExit}>
              Choose another topic
            </button>
          ) : (
            <Link to="/practice" className="btn-ghost">
              Choose another topic
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-ink">{title}</p>
          <p className="text-xs text-muted">
            Question {i + 1} of {set.length} · {summary.right}/{count} correct
          </p>
        </div>
        <div className="flex gap-1">
          <button type="button" className="icon-btn" disabled={i === 0} onClick={() => setI(i - 1)} aria-label="Previous question">
            <Icon name="chevronLeft" />
          </button>
          <button type="button" className="icon-btn" disabled={i === set.length - 1} onClick={() => setI(i + 1)} aria-label="Next question">
            <Icon name="chevronRight" />
          </button>
        </div>
      </div>
      <div className="mb-5 flex gap-1" aria-hidden="true">
        {set.map((x, n) => (
          <button
            key={x.key}
            type="button"
            tabIndex={-1}
            onClick={() => setI(n)}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              results[x.key] ? (results[x.key].correct ? 'bg-good' : 'bg-bad') : n === i ? 'bg-accent' : 'bg-sunken'
            }`}
          />
        ))}
      </div>

      <QuestionCard
        key={q.key}
        question={q}
        index={i + 1}
        onResult={(correct) => setResults((r) => ({ ...r, [q.key]: { key: q.key, correct } }))}
      />

      <div className="mt-5 flex justify-end gap-3">
        {i < set.length - 1 ? (
          <button type="button" className={answered ? 'btn-primary' : 'btn-ghost'} onClick={() => setI(i + 1)}>
            {answered ? 'Next question' : 'Skip'} <Icon name="arrowRight" size={16} />
          </button>
        ) : (
          <button type="button" className="btn-primary" disabled={!count} onClick={() => {
            setFinished(true);
            showMoment('session');
          }}>
            Finish session
          </button>
        )}
      </div>
    </div>
  );
}
