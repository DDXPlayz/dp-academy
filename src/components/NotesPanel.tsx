import { useEffect, useState } from 'react';
import { useProgress } from '../store/progress';

/** Private notes for one lesson, saved as you type. */
export function NotesPanel({ lessonKey, autoFocus = false }: { lessonKey: string; autoFocus?: boolean }) {
  const saved = useProgress((s) => s.notes[lessonKey] ?? '');
  const setNote = useProgress((s) => s.setNote);
  const [text, setText] = useState(saved);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  useEffect(() => setText(saved), [lessonKey]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (text === saved) return;
    setStatus('saving');
    const t = setTimeout(() => {
      setNote(lessonKey, text);
      setStatus('saved');
    }, 400);
    return () => clearTimeout(t);
  }, [text, saved, lessonKey, setNote]);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor={`notes-${lessonKey}`} className="eyebrow">
          My notes
        </label>
        <span className="text-xs text-muted" aria-live="polite">
          {status === 'saving' ? 'Saving…' : status === 'saved' ? 'Saved' : ''}
        </span>
      </div>
      <textarea
        id={`notes-${lessonKey}`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus={autoFocus}
        rows={8}
        placeholder="Write what clicked, what didn’t, or a question to ask your teacher…"
        className="w-full resize-y rounded-lg border border-line bg-card p-3 text-sm leading-relaxed text-ink placeholder:text-muted focus:border-accent focus:outline-none"
      />
    </div>
  );
}
