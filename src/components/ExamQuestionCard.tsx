import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getTopic, type ExamQuestion } from '../content';
import { sourceLabel } from '../lib/bank';
import { Icon } from './Icon';
import { Inline, Markdown } from './Markdown';
import { useProgress, type ExamResult } from '../store/progress';

export const RESULT_LABEL: Record<ExamResult, string> = { got: 'Got it', partial: 'Partly', missed: 'Missed' };
const RESULT_STYLE: Record<ExamResult, string> = {
  got: 'border-good bg-good-soft text-good',
  partial: 'border-accent bg-accent-soft text-accent',
  missed: 'border-bad bg-bad-soft text-bad',
};

/** Self-marking after reading the markscheme; click the chosen result again to clear it. */
function SelfMark({ qKey }: { qKey: string }) {
  const result = useProgress((s) => s.exam[qKey]?.r);
  const markExam = useProgress((s) => s.markExam);
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted">How did you do?</span>
      {(Object.keys(RESULT_LABEL) as ExamResult[]).map((r) => (
        <button
          key={r}
          type="button"
          aria-pressed={result === r}
          onClick={() => markExam(qKey, result === r ? null : r)}
          className={`h-8 rounded-lg border px-3 text-sm font-medium transition-colors ${
            result === r ? RESULT_STYLE[r] : 'border-line text-ink-2 hover:bg-sunken'
          }`}
        >
          {RESULT_LABEL[r]}
        </button>
      ))}
    </div>
  );
}

const DIFF_STYLE = {
  easy: 'bg-good-soft text-good',
  medium: 'bg-accent-soft text-accent',
  hard: 'bg-bad-soft text-bad',
} as const;

export function ExamQuestionCard({ q, index }: { q: ExamQuestion; index: number }) {
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState<number | null>(null);
  const topic = q.topicKey ? getTopic(q.topicKey) : undefined;
  const isMcq = !!q.options && q.answer !== undefined;
  const revealed = open || (isMcq && choice !== null);
  const result = useProgress((s) => s.exam[q.key]?.r);
  const markExam = useProgress((s) => s.markExam);
  const choose = (i: number) => {
    setChoice(i);
    markExam(q.key, i === q.answer ? 'got' : 'missed');
  };

  return (
    <article className="card p-5 md:p-6">
      <header className="mb-4 flex flex-wrap items-center gap-2 text-xs">
        <span className="font-semibold text-muted">#{index + 1}</span>
        <span className={`chip ${q.source === 'original' ? '' : 'bg-accent-soft text-accent'}`}>{sourceLabel(q)}</span>
        {q.source === 'original' && <span className="chip">Paper {q.paper}</span>}
        <span className={`chip capitalize ${DIFF_STYLE[q.difficulty]}`}>{q.difficulty}</span>
        <span className="chip">
          {q.marks} mark{q.marks === 1 ? '' : 's'}
        </span>
        {q.level === 'HL' && <span className="chip">HL only</span>}
        {q.calculator === false && <span className="chip">No calculator</span>}
        {q.needsReview && <span className="chip bg-bad-soft text-bad">Topic needs review</span>}
        {result && <span className={`chip border ${RESULT_STYLE[result]}`}>{RESULT_LABEL[result]}</span>}
        {topic && (
          <Link to={topic.href} className="ml-auto text-muted hover:text-ink">
            {topic.code} {topic.title}
            {q.subtopic ? ` · ${q.subtopic}` : ''}
          </Link>
        )}
      </header>

      <div className="prose-lesson !text-base">
        <Markdown>{q.prompt}</Markdown>
      </div>

      {isMcq && (
        <ol className="mt-4 space-y-2">
          {q.options!.map((opt, i) => {
            const state = choice === null ? null : i === q.answer ? 'correct' : i === choice ? 'wrong' : null;
            return (
              <li key={i}>
                <button
                  type="button"
                  disabled={choice !== null}
                  onClick={() => choose(i)}
                  className={`flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left transition-colors ${
                    state === 'correct'
                      ? 'border-good bg-good-soft'
                      : state === 'wrong'
                        ? 'border-bad bg-bad-soft'
                        : 'border-line hover:border-line-strong hover:bg-sunken/50'
                  }`}
                >
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md border border-line-strong text-xs font-semibold text-muted">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="min-w-0 flex-1 pt-0.5 text-ink">
                    <Inline>{opt}</Inline>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      )}

      <div className="mt-5 border-t border-line pt-4">
        {!isMcq && (
          <button type="button" className="btn-secondary" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
            <Icon name={open ? 'chevronDown' : 'chevronRight'} size={16} />
            {open ? 'Hide' : 'Show'} markscheme
          </button>
        )}
        {q.originalUrl && (
          <a href={q.originalUrl} target="_blank" rel="noreferrer" className="btn-ghost ml-2">
            <Icon name="external" size={16} /> Original paper
          </a>
        )}
        {revealed && (
          <div className="mt-4 rounded-lg bg-sunken/60 p-4">
            <p className="eyebrow mb-2">Markscheme</p>
            <div className="prose-lesson !text-[0.95rem]">
              <Markdown>{q.markscheme}</Markdown>
            </div>
          </div>
        )}
        {revealed && !isMcq && <SelfMark qKey={q.key} />}
      </div>
    </article>
  );
}
