import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { type PracticeQuestion } from '../content';
import { checkAnswer, isAnswered, type Response } from '../lib/answers';
import { lessonLinkFor, similarQuestion } from '../lib/related';
import { useProgress } from '../store/progress';
import { BookmarkButton } from './BookmarkButton';
import { Icon } from './Icon';
import { Inline, Markdown } from './Markdown';

const TYPE_LABEL: Record<PracticeQuestion['type'], string> = {
  mcq: 'Multiple choice',
  multi: 'Select all that apply',
  tf: 'True or false',
  numeric: 'Numerical',
  short: 'Short answer',
  expression: 'Formula',
};

const DIFFICULTY = ['', 'Foundation', 'Standard', 'Challenging'];

function Choice({
  type,
  name,
  checked,
  disabled,
  state,
  onChange,
  children,
  letter,
}: {
  type: 'radio' | 'checkbox';
  name: string;
  checked: boolean;
  disabled: boolean;
  state: 'correct' | 'wrong' | 'missed' | null;
  onChange: () => void;
  children: React.ReactNode;
  letter: string;
}) {
  const ring =
    state === 'correct'
      ? 'border-good bg-good-soft'
      : state === 'wrong'
        ? 'border-bad bg-bad-soft'
        : state === 'missed'
          ? 'border-good border-dashed'
          : checked
            ? 'border-accent bg-accent-soft'
            : 'border-line hover:border-line-strong hover:bg-sunken/50';
  return (
    <label className={`flex items-start gap-3 rounded-lg border px-4 py-3 transition-colors ${disabled ? '' : 'cursor-pointer'} ${ring}`}>
      <input type={type} name={name} checked={checked} disabled={disabled} onChange={onChange} className="peer sr-only" />
      <span
        className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md border text-xs font-semibold peer-focus-visible:outline-2 peer-focus-visible:outline-accent ${
          checked ? 'border-accent bg-accent text-on-accent' : 'border-line-strong text-muted'
        }`}
      >
        {letter}
      </span>
      <span className="min-w-0 flex-1 pt-0.5 text-ink">{children}</span>
      {state === 'correct' && <Icon name="check" className="mt-0.5 text-good" />}
      {state === 'wrong' && <Icon name="x" className="mt-0.5 text-bad" />}
    </label>
  );
}

export function QuestionCard({
  question: q,
  index,
  onResult,
  showLessonLink = true,
}: {
  question: PracticeQuestion;
  index?: number;
  onResult?: (correct: boolean) => void;
  showLessonLink?: boolean;
}) {
  const [response, setResponse] = useState<Response | undefined>(undefined);
  const [result, setResult] = useState<boolean | null>(null);
  const [revealed, setRevealed] = useState(false);
  const started = useRef(Date.now());
  const record = useProgress((s) => s.recordAttempt);
  const name = useId();
  const feedback = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setResponse(undefined);
    setResult(null);
    setRevealed(false);
    started.current = Date.now();
  }, [q.key]);

  const submitted = result !== null;
  const lesson = useMemo(() => lessonLinkFor(q), [q]);
  // Picked once per wrong answer, so it doesn't change while you read.
  const similar = useMemo(() => (result === false ? similarQuestion(q, useProgress.getState().attempts) : null), [q, result]);

  const submit = () => {
    if (!isAnswered(q, response) || submitted) return;
    const correct = checkAnswer(q, response!);
    setResult(correct);
    record({ key: q.key, topicKey: q.topicKey, concept: q.concept, correct, ms: Date.now() - started.current });
    onResult?.(correct);
    requestAnimationFrame(() => feedback.current?.focus());
  };

  const retry = () => {
    setResponse(undefined);
    setResult(null);
    setRevealed(false);
    started.current = Date.now();
  };

  const choiceState = (i: number): 'correct' | 'wrong' | 'missed' | null => {
    if (!submitted) return null;
    const right = q.type === 'mcq' ? q.answer === i : q.type === 'multi' ? q.answers.includes(i) : false;
    const picked = q.type === 'multi' ? (response as number[]).includes(i) : response === i;
    if (picked && right) return 'correct';
    if (picked && !right) return 'wrong';
    if (!picked && right && (result || revealed)) return 'missed';
    return null;
  };

  const modelAnswer = () => {
    switch (q.type) {
      case 'numeric':
        return `${q.answer}${q.unit ? ' ' + q.unit : ''}`;
      case 'short':
        return q.accept[0];
      case 'expression':
        return q.answer;
      case 'tf':
        return q.answer ? 'True' : 'False';
      default:
        return null;
    }
  };

  return (
    <article className="card overflow-hidden" aria-label={index ? `Question ${index}` : 'Question'}>
      <div className="p-5 md:p-6">
        <div className="mb-4 flex items-center gap-2">
          {index !== undefined && <span className="text-sm font-semibold text-ink">Q{index}</span>}
          <span className="chip">{TYPE_LABEL[q.type]}</span>
          <span className="chip">{DIFFICULTY[q.difficulty]}</span>
          <span className="ml-auto -my-2 -mr-2">
            <BookmarkButton id={q.key} kind="question" />
          </span>
        </div>

        <div className="prose-lesson prose-tight mb-5 text-ink">
          <Markdown>{q.prompt}</Markdown>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          {(q.type === 'mcq' || q.type === 'multi') && (
            <fieldset className="space-y-2">
              <legend className="sr-only">{q.type === 'multi' ? 'Select all that apply' : 'Choose one answer'}</legend>
              {q.options.map((opt, i) => {
                const multi = q.type === 'multi';
                const picked = multi ? Array.isArray(response) && response.includes(i) : response === i;
                return (
                  <Choice
                    key={i}
                    type={multi ? 'checkbox' : 'radio'}
                    name={name}
                    letter={String.fromCharCode(65 + i)}
                    checked={picked}
                    disabled={submitted}
                    state={choiceState(i)}
                    onChange={() => {
                      if (!multi) return setResponse(i);
                      const cur = Array.isArray(response) ? response : [];
                      setResponse(cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i]);
                    }}
                  >
                    <Inline>{opt}</Inline>
                  </Choice>
                );
              })}
            </fieldset>
          )}

          {q.type === 'tf' && (
            <fieldset className="grid grid-cols-2 gap-2">
              <legend className="sr-only">True or false</legend>
              {[true, false].map((v, i) => (
                <Choice
                  key={String(v)}
                  type="radio"
                  name={name}
                  letter={v ? 'T' : 'F'}
                  checked={response === v}
                  disabled={submitted}
                  state={submitted ? (response === v ? (v === q.answer ? 'correct' : 'wrong') : v === q.answer && (result || revealed) ? 'missed' : null) : null}
                  onChange={() => setResponse(v)}
                >
                  {i === 0 ? 'True' : 'False'}
                </Choice>
              ))}
            </fieldset>
          )}

          {(q.type === 'numeric' || q.type === 'short' || q.type === 'expression') && (
            <div className="flex items-center gap-3">
              <input
                className={`input max-w-sm font-mono ${submitted ? (result ? 'border-good' : 'border-bad') : ''}`}
                value={typeof response === 'string' ? response : ''}
                onChange={(e) => setResponse(e.target.value)}
                disabled={submitted}
                inputMode={q.type === 'numeric' ? 'decimal' : 'text'}
                autoComplete="off"
                spellCheck={false}
                aria-label="Your answer"
                placeholder={q.type === 'numeric' ? 'e.g. 12.5' : q.type === 'expression' ? `in terms of ${q.variables.join(', ')}` : 'Your answer'}
              />
              {q.type === 'numeric' && q.unit && <span className="text-sm text-muted">{q.unit}</span>}
            </div>
          )}
          {q.type === 'expression' && !submitted && (
            <p className="mt-2 text-xs text-muted">Use * or juxtaposition for multiplication, ^ for powers, sqrt( ) for roots.</p>
          )}
          {q.type === 'numeric' && !submitted && (
            <p className="mt-2 text-xs text-muted">Answers within {Math.round(q.tolerance * 100)}% are accepted. Scientific notation like 3.2e4 or 3.2 x 10^4 works.</p>
          )}

          {!submitted && (
            <div className="mt-5 flex items-center gap-3">
              <button type="submit" className="btn-primary" disabled={!isAnswered(q, response)}>
                Check answer
              </button>
            </div>
          )}
        </form>
      </div>

      {submitted && (
        <div
          ref={feedback}
          tabIndex={-1}
          role="status"
          className={`animate-rise border-t px-5 py-5 focus:outline-none md:px-6 ${result ? 'border-good/30 bg-good-soft' : 'border-bad/30 bg-bad-soft'}`}
        >
          <p className={`flex items-center gap-2 font-semibold ${result ? 'text-good' : 'text-bad'}`}>
            <Icon name={result ? 'check' : 'x'} />
            {result ? 'Correct' : 'Not quite'}
          </p>
          {!result && (lesson || similar) && (
            <div className="mt-3 flex flex-col gap-1.5 rounded-lg border border-bad/20 bg-card/60 px-3 py-2.5 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
              {showLessonLink && lesson && (
                <Link to={lesson.href} className="inline-flex items-center gap-1.5 text-accent hover:underline">
                  <Icon name="book" size={14} />
                  Review: {lesson.section ?? lesson.title}
                </Link>
              )}
              {similar && (
                <Link to={`/practice?topic=${encodeURIComponent(similar.topicKey)}&q=${encodeURIComponent(similar.id)}`} className="inline-flex items-center gap-1.5 text-accent hover:underline">
                  <Icon name="shuffle" size={14} />
                  Try a similar question
                </Link>
              )}
            </div>
          )}
          {!result && !revealed && (
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" className="btn-secondary h-9" onClick={retry}>
                <Icon name="rotate" size={16} /> Try again
              </button>
              <button type="button" className="btn-ghost h-9" onClick={() => setRevealed(true)}>
                Show explanation
              </button>
            </div>
          )}
          {(result || revealed) && (
            <div className="mt-3 space-y-3">
              {!result && modelAnswer() && (
                <p className="text-sm text-ink">
                  Answer: <span className="font-mono font-semibold">{modelAnswer()}</span>
                </p>
              )}
              <div>
                <p className="eyebrow mb-1">Why</p>
                <div className="prose-lesson prose-tight text-[0.975rem] text-ink">
                  <Markdown>{q.explanation}</Markdown>
                </div>
              </div>
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-2">
                <span className="eyebrow">Related concept</span>
                <span>{q.concept}</span>
                {showLessonLink && lesson && (
                  <Link to={lesson.href} className="inline-flex items-center gap-1 text-accent hover:underline">
                    {lesson.title}
                    {lesson.section ? ` › ${lesson.section}` : ''} <Icon name="arrowRight" size={14} />
                  </Link>
                )}
              </p>
              {!result && (
                <button type="button" className="btn-secondary h-9" onClick={retry}>
                  <Icon name="rotate" size={16} /> Try again
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
