import { useCallback, useEffect, useState } from 'react';
import { useProgress } from '../store/progress';
import { Icon } from './Icon';

/*
 * Select text in a lesson to highlight it. Highlights are stored as text (per
 * lesson, synced) and painted with the CSS Custom Highlight API, which colours
 * ranges without touching the DOM React renders. Browsers without the API
 * still keep and list the highlights; they just aren't painted in the lesson.
 */

const NAME = 'dpa-highlight';
const EMPTY: { id: string; text: string }[] = [];

const norm = (s: string) => s.replace(/\s+/g, ' ').trim();

/** Ranges in `root` whose text (whitespace collapsed) equals `target`. */
function findRanges(root: HTMLElement, target: string): Range[] {
  const want = norm(target);
  if (!want) return [];
  const chars: string[] = [];
  const map: [Text, number][] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let lastSpace = true;
  for (let n = walker.nextNode() as Text | null; n; n = walker.nextNode() as Text | null) {
    if (n.parentElement?.closest('.katex-mathml, button, script, style')) continue;
    const t = n.data;
    for (let i = 0; i < t.length; i++) {
      const space = /\s/.test(t[i]);
      if (space && lastSpace) continue;
      chars.push(space ? ' ' : t[i]);
      map.push([n, i]);
      lastSpace = space;
    }
  }
  const hay = chars.join('');
  const out: Range[] = [];
  for (let at = hay.indexOf(want); at >= 0 && out.length < 3; at = hay.indexOf(want, at + want.length)) {
    const [sn, so] = map[at];
    const [en, eo] = map[at + want.length - 1];
    const r = document.createRange();
    r.setStart(sn, so);
    r.setEnd(en, eo + 1);
    out.push(r);
  }
  return out;
}

/** Text of the current selection inside `root`, skipping KaTeX's hidden MathML copy. */
function selectedText(root: HTMLElement): { text: string; rect: DOMRect } | null {
  const sel = window.getSelection();
  if (!sel || sel.isCollapsed || !sel.rangeCount) return null;
  const range = sel.getRangeAt(0);
  if (!root.contains(range.commonAncestorContainer)) return null;
  const frag = range.cloneContents();
  frag.querySelectorAll('.katex-mathml, button').forEach((e) => e.remove());
  const text = norm(frag.textContent ?? '');
  if (text.length < 2 || text.length > 600) return null;
  return { text, rect: range.getBoundingClientRect() };
}

export function useLessonHighlights(lessonKey: string) {
  return useProgress((s) => s.highlights[lessonKey]?.items ?? EMPTY);
}

export function Highlighter({ lessonKey, root }: { lessonKey: string; root: React.RefObject<HTMLElement | null> }) {
  const items = useLessonHighlights(lessonKey);
  const add = useProgress((s) => s.addHighlight);
  const remove = useProgress((s) => s.removeHighlight);
  const [pick, setPick] = useState<{ text: string; x: number; y: number; existing: string | null } | null>(null);

  // Paint the saved highlights (again after the lesson body renders or changes).
  useEffect(() => {
    const el = root.current;
    const api = (CSS as unknown as { highlights?: Map<string, unknown> }).highlights;
    const HighlightCtor = (window as unknown as { Highlight?: new (...r: Range[]) => unknown }).Highlight;
    if (!el || !api || !HighlightCtor) return;
    const paint = () => api.set(NAME, new HighlightCtor(...items.flatMap((h) => findRanges(el, h.text))));
    paint();
    // Diagrams, maths and embedded questions render a moment later.
    const t = setTimeout(paint, 600);
    return () => {
      clearTimeout(t);
      api.delete(NAME);
    };
  }, [items, root, lessonKey]);

  // Offer a button next to a fresh selection.
  useEffect(() => {
    const onUp = () =>
      requestAnimationFrame(() => {
        const el = root.current;
        const s = el ? selectedText(el) : null;
        if (!s) return setPick(null);
        const existing = items.find((h) => h.text.includes(s.text) || s.text.includes(h.text))?.id ?? null;
        setPick({ text: s.text, x: s.rect.left + s.rect.width / 2, y: s.rect.top, existing });
      });
    const onScroll = () => setPick(null);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('touchend', onUp);
    document.addEventListener('keyup', onUp);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('touchend', onUp);
      document.removeEventListener('keyup', onUp);
      window.removeEventListener('scroll', onScroll);
    };
  }, [items, root]);

  const apply = useCallback(() => {
    if (!pick) return;
    if (pick.existing) remove(lessonKey, pick.existing);
    else add(lessonKey, pick.text);
    window.getSelection()?.removeAllRanges();
    setPick(null);
  }, [pick, add, remove, lessonKey]);

  // H highlights the current selection.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === 'h' || e.key === 'H') && pick && !e.metaKey && !e.ctrlKey && !(e.target as HTMLElement)?.closest('input, textarea')) {
        e.preventDefault();
        apply();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [pick, apply]);

  if (!pick) return null;
  return (
    <button
      type="button"
      // Keep the selection when the button is pressed.
      onMouseDown={(e) => e.preventDefault()}
      onClick={apply}
      className="fixed z-40 inline-flex -translate-x-1/2 -translate-y-full items-center gap-1.5 rounded-lg bg-ink px-3 py-1.5 text-sm font-medium text-canvas shadow-lg"
      style={{ left: Math.max(60, Math.min(window.innerWidth - 60, pick.x)), top: Math.max(8, pick.y - 8) }}
    >
      <Icon name="highlight" size={14} />
      {pick.existing ? 'Remove highlight' : 'Highlight'}
    </button>
  );
}

/** The lesson's highlights in a list: click one to jump to it, × to remove it. */
export function HighlightsList({ lessonKey, root }: { lessonKey: string; root: React.RefObject<HTMLElement | null> }) {
  const items = useLessonHighlights(lessonKey);
  const remove = useProgress((s) => s.removeHighlight);
  if (!items.length) {
    return <p className="px-3 text-xs text-muted">Select text in the lesson and press Highlight (or H) to save it here and on your Saved page.</p>;
  }
  const jump = (text: string) => {
    const r = root.current ? findRanges(root.current, text)[0] : undefined;
    if (r) window.scrollBy({ top: r.getBoundingClientRect().top - window.innerHeight / 3, behavior: 'smooth' });
  };
  return (
    <ul className="space-y-1">
      {items.map((h) => (
        <li key={h.id} className="group flex items-start gap-1 rounded-lg px-3 py-1.5 hover:bg-sunken">
          <button type="button" onClick={() => jump(h.text)} className="line-clamp-3 min-w-0 flex-1 border-l-2 border-warn pl-2 text-left text-xs text-ink-2">
            {h.text}
          </button>
          <button
            type="button"
            onClick={() => remove(lessonKey, h.id)}
            className="shrink-0 text-muted opacity-0 hover:text-bad group-hover:opacity-100 focus:opacity-100"
            aria-label="Remove highlight"
          >
            <Icon name="x" size={14} />
          </button>
        </li>
      ))}
    </ul>
  );
}
