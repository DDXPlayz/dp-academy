import { useEffect, useState } from 'react';
import type { Flashcard as Card } from '../content';
import type { Grade } from '../lib/srs';
import { BookmarkButton } from './BookmarkButton';
import { Markdown } from './Markdown';

const GRADES: { grade: Grade; label: string; hint: string; key: string }[] = [
  { grade: 'again', label: 'Again', hint: 'Forgot', key: '1' },
  { grade: 'hard', label: 'Hard', hint: 'Struggled', key: '2' },
  { grade: 'good', label: 'Good', hint: 'Recalled', key: '3' },
  { grade: 'easy', label: 'Easy', hint: 'Instant', key: '4' },
];

/** A flip card. Space flips it; 1–4 grade it once revealed. */
export function Flashcard({ card, context, onGrade }: { card: Card; context?: string; onGrade?: (g: Grade) => void }) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => setFlipped(false), [card.key]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.closest('input, textarea')) return;
      if (e.key === ' ' || e.key === 'Enter') {
        if ((e.target as HTMLElement)?.closest('button') && e.key === 'Enter') return;
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (flipped && onGrade) {
        const g = GRADES.find((g) => g.key === e.key);
        if (g) onGrade(g.grade);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [flipped, onGrade]);

  const face = 'flip-face absolute inset-0 flex flex-col rounded-2xl border border-line bg-card p-6 md:p-8';
  return (
    <div>
      <div className="flip-card">
        <div
          className={`flip-inner relative min-h-[260px] cursor-pointer md:min-h-[300px] ${flipped ? 'flipped' : ''}`}
          onClick={(e) => !(e.target as HTMLElement).closest('button, a') && setFlipped((f) => !f)}
        >
          <section className={face} aria-hidden={flipped}>
            <div className="flex items-center justify-between">
              <span className="eyebrow">{context ?? 'Question'}</span>
              {/* Definition/formula review cards ("review:…") come from lessons and have nothing to bookmark. */}
              {!card.key.startsWith('review:') && <BookmarkButton id={card.key} kind="flashcard" />}
            </div>
            <div className="prose-lesson flex flex-1 items-center justify-center text-center text-xl font-medium text-ink md:text-2xl">
              <div>
                <Markdown>{card.front}</Markdown>
              </div>
            </div>
            <p className="text-center text-xs text-muted">Tap or press space to reveal</p>
          </section>
          <section className={`${face} flip-back`} aria-hidden={!flipped}>
            <span className="eyebrow">Answer</span>
            <div className="prose-lesson flex flex-1 items-center justify-center text-center text-ink">
              <div>
                <Markdown>{card.back}</Markdown>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="mt-4 min-h-12" aria-live="polite">
        {!flipped ? (
          <button type="button" className="btn-primary w-full" onClick={() => setFlipped(true)}>
            Reveal answer
          </button>
        ) : onGrade ? (
          <div className="animate-fade grid grid-cols-4 gap-2">
            {GRADES.map((g) => (
              <button key={g.grade} type="button" className="btn-secondary h-auto flex-col gap-0 py-2" onClick={() => onGrade(g.grade)}>
                <span>{g.label}</span>
                <span className="text-[11px] font-normal text-muted">
                  {g.hint} · {g.key}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <button type="button" className="btn-secondary w-full" onClick={() => setFlipped(false)}>
            Show question
          </button>
        )}
      </div>
    </div>
  );
}
