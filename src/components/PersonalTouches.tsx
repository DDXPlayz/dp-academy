import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { getLesson, getTopic } from '../content';
import { footerText, milestone, moment, usePersonal, visitGreeting, type VisitNote } from '../lib/personal';
import { useProgress } from '../store/progress';

/*
 * The visible side of the personal touches (src/lib/personal.ts). Every
 * component here renders nothing, or its normal fallback, unless the
 * signed-in account has touches configured on the server.
 */

const ROSE = 'var(--rose)';
/** Messages that already carry a heart don't get another one in front. */
const hasHeart = (t: string) => /[♡❤💗]/u.test(t);

/** Three tiny hearts that float up once (skipped with reduced motion). */
export function HeartBurst() {
  return (
    <span className="heart-burst" aria-hidden="true">
      <span>♡</span>
      <span>♡</span>
      <span>♡</span>
    </span>
  );
}

const MILESTONES = { streak: [3, 7, 14, 30, 50, 100], lessons: [1, 5, 10, 25, 50, 100, 150] };
const celebrated = new Map<string, string | null>();

/** The highest milestone reached that hasn't been celebrated yet (once per id, ever). */
function milestoneNote(streak: number, lessons: number): string | null {
  const s = MILESTONES.streak.filter((n) => streak >= n).pop();
  const l = MILESTONES.lessons.filter((n) => lessons >= n).pop();
  const id = s && s >= 7 ? `streak-${s}` : l ? `lessons-${l}` : s ? `streak-${s}` : null;
  if (!id) return null;
  if (!celebrated.has(id)) celebrated.set(id, milestone(id));
  return celebrated.get(id) ?? null;
}

/** Dashboard heading: the personal greeting and one small note for this visit, or the normal heading. */
export function DashboardGreeting({ fallback, streak, lessons }: { fallback: React.ReactNode; streak: number; lessons: number }) {
  const touches = usePersonal((s) => s.touches);
  const [visit, setVisit] = useState<VisitNote | null>(null);
  const [mile, setMile] = useState<string | null>(null);
  useEffect(() => {
    if (!touches) return;
    setVisit(visitGreeting(touches));
    setMile(milestoneNote(streak, lessons));
  }, [touches, streak, lessons]);

  if (!touches || !visit) return <>{fallback}</>;
  const note = mile ?? visit.note;
  return (
    <>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink md:text-3xl">{visit.greeting}</h1>
      {note && (
        <p className="relative mt-2 flex w-fit items-center gap-1.5 text-sm text-ink-2 animate-rise">
          {!hasHeart(note) && (
            <span style={{ color: ROSE }} aria-hidden="true">
              ♡
            </span>
          )}
          {note}
          {(mile || visit.tone === 'affectionate') && <HeartBurst />}
        </p>
      )}
    </>
  );
}

/** A quiet line at the very bottom of the dashboard. */
export function PersonalFooter() {
  const touches = usePersonal((s) => s.touches);
  if (!touches?.footer) return null;
  return (
    <p className="mt-12 text-center text-xs text-muted">
      {footerText(touches).split('♡').map((part, i, all) => (
        <span key={i}>
          {part}
          {i < all.length - 1 && <span style={{ color: ROSE }}>♡</span>}
        </span>
      ))}
    </p>
  );
}

// ---- small toast for moments ---------------------------------------------------

const useToast = create<{ text: string; hearts: boolean; id: number }>(() => ({ text: '', hearts: false, id: 0 }));

/** Shows a short note after something finished (e.g. a practice set). Does nothing for other accounts. */
export function showMoment(kind: 'study' | 'session' | 'break', hearts = false): string | null {
  const text = moment(kind);
  if (text) useToast.setState((s) => ({ text, hearts, id: s.id + 1 }));
  return text;
}

/**
 * Mounted once in the app shell. Listens for completed lessons (and whole topics) and shows a
 * small, non-blocking note in the corner that fades away by itself. Never steals focus.
 */
export function PersonalToast() {
  const touches = usePersonal((s) => s.touches);
  const { text, hearts, id } = useToast();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!touches) return;
    let before = useProgress.getState().completed;
    return useProgress.subscribe((s) => {
      const added = Object.keys(s.completed).filter((k) => !before[k]);
      before = s.completed;
      if (added.length !== 1) return; // ignore sync merges and imports
      const lesson = getLesson(added[0]);
      const topic = lesson ? getTopic(lesson.topicKey) : undefined;
      const topicDone = topic && topic.lessons.every((l) => s.completed[l.key]);
      const topicNote = topicDone ? milestone(`topic-${topic.key}`) : null;
      if (topicNote) useToast.setState((t) => ({ text: topicNote, hearts: true, id: t.id + 1 }));
      else showMoment('study');
    });
  }, [touches]);

  useEffect(() => {
    if (!id) return;
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 4500);
    return () => clearTimeout(t);
  }, [id]);

  if (!touches || !text) return null;
  return (
    <div className="app-chrome pointer-events-none fixed bottom-20 right-4 z-30 md:bottom-6" aria-live="polite">
      <button
        type="button"
        onClick={() => setVisible(false)}
        className={`card pointer-events-auto relative flex max-w-xs items-center gap-2 px-4 py-2.5 text-sm text-ink shadow-lg transition-all duration-500 ${
          visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
        }`}
        tabIndex={-1}
      >
        {!hasHeart(text) && (
          <span style={{ color: ROSE }} aria-hidden="true">
            ♡
          </span>
        )}
        {text}
        {hearts && visible && <HeartBurst />}
      </button>
    </div>
  );
}
