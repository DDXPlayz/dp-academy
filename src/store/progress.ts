import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import { review, type CardState, type Grade } from '../lib/srs';
import { today } from '../lib/dates';
import { MAX_ATTEMPTS, normalise, type ExamResult, type Highlight, type LessonHighlights, type Level, type RevisitMark, type TextSize } from '../lib/syncMerge';

export type { ExamResult, Highlight, Level, RevisitMark, TextSize };

/*
 * Everything a student does lives here. It is persisted to localStorage under
 * a key per account (set by src/lib/account.ts before hydration) and synced to
 * the account on the server by src/lib/sync.ts.
 */

export type Theme = 'system' | 'light' | 'dark';
export type BookmarkKind = 'lesson' | 'question' | 'flashcard';

export interface Attempt {
  key: string; // question key
  topicKey: string;
  concept: string;
  correct: boolean;
  ms: number;
  at: number;
}

interface ProgressState {
  name: string;
  theme: Theme;
  textSize: TextSize;
  examDate: string;
  levels: Record<string, Level>;
  dailyGoal: number;
  exam: Record<string, { r: ExamResult; at: number }>; // exam-bank question key → self-marked result
  completed: Record<string, string>; // lesson key → ISO date completed
  visited: Record<string, number>; // lesson key → last opened (epoch ms)
  revisit: Record<string, RevisitMark>; // lesson key → "needs revision" flag (un-flags kept so they sync)
  lastLesson: string | null;
  attempts: Attempt[];
  bookmarks: Record<string, { kind: BookmarkKind; at: number }>;
  notes: Record<string, string>;
  highlights: Record<string, LessonHighlights>;
  cards: Record<string, CardState>;
  studyDays: string[];
  resetAt: number;

  setName: (name: string) => void;
  setTheme: (theme: Theme) => void;
  setTextSize: (size: TextSize) => void;
  setExamDate: (date: string) => void;
  setLevel: (subjectId: string, level: Level) => void;
  setDailyGoal: (n: number) => void;
  markExam: (key: string, result: ExamResult | null) => void;
  visitLesson: (key: string) => void;
  setComplete: (key: string, done: boolean) => void;
  setRevisit: (key: string, on: boolean) => void;
  recordAttempt: (a: Omit<Attempt, 'at'>) => void;
  toggleBookmark: (key: string, kind: BookmarkKind) => void;
  setNote: (key: string, text: string) => void;
  addHighlight: (lessonKey: string, text: string) => void;
  removeHighlight: (lessonKey: string, id: string) => void;
  gradeCard: (key: string, grade: Grade) => void;
  importData: (data: unknown) => boolean;
  replaceData: (data: unknown) => void;
  reset: () => void;
}

const initial = {
  name: '',
  theme: 'system' as Theme,
  textSize: 'md' as TextSize,
  examDate: '',
  levels: {} as Record<string, Level>,
  dailyGoal: 10,
  exam: {} as Record<string, { r: ExamResult; at: number }>,
  completed: {},
  visited: {},
  revisit: {} as Record<string, RevisitMark>,
  lastLesson: null,
  attempts: [],
  bookmarks: {},
  notes: {},
  highlights: {} as Record<string, LessonHighlights>,
  cards: {},
  studyDays: [] as string[],
  resetAt: 0,
};

function markStudied(days: string[]): string[] {
  const d = today();
  return days.includes(d) ? days : [...days, d].slice(-400);
}

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      ...initial,
      setName: (name) => set({ name: name.trim().slice(0, 40) }),
      setTheme: (theme) => set({ theme }),
      setTextSize: (textSize) => set({ textSize }),
      setExamDate: (examDate) => set({ examDate: /^\d{4}-\d{2}-\d{2}$/.test(examDate) ? examDate : '' }),
      setDailyGoal: (n) => set({ dailyGoal: Math.max(0, Math.min(200, Math.round(n) || 0)) }),
      setLevel: (subjectId, level) => set((s) => ({ levels: { ...s.levels, [subjectId]: level } })),
      markExam: (key, result) =>
        set((s) => {
          const exam = { ...s.exam };
          if (result) exam[key] = { r: result, at: Date.now() };
          else delete exam[key];
          return { exam, studyDays: markStudied(s.studyDays) };
        }),
      visitLesson: (key) =>
        set((s) => ({
          visited: { ...s.visited, [key]: Date.now() },
          lastLesson: key,
          studyDays: markStudied(s.studyDays),
        })),
      setComplete: (key, done) =>
        set((s) => {
          const completed = { ...s.completed };
          if (done) completed[key] = new Date().toISOString();
          else delete completed[key];
          return { completed, studyDays: markStudied(s.studyDays) };
        }),
      setRevisit: (key, on) =>
        set((s) => (!!s.revisit[key]?.on === on ? s : { revisit: { ...s.revisit, [key]: { on, at: Date.now() } } })),
      recordAttempt: (a) =>
        set((s) => ({
          attempts: [...s.attempts, { ...a, at: Date.now() }].slice(-MAX_ATTEMPTS),
          studyDays: markStudied(s.studyDays),
        })),
      toggleBookmark: (key, kind) =>
        set((s) => {
          const bookmarks = { ...s.bookmarks };
          if (bookmarks[key]) delete bookmarks[key];
          else bookmarks[key] = { kind, at: Date.now() };
          return { bookmarks };
        }),
      setNote: (key, text) =>
        set((s) => {
          const notes = { ...s.notes };
          if (text.trim()) notes[key] = text;
          else delete notes[key];
          return { notes };
        }),
      addHighlight: (lessonKey, text) =>
        set((s) => {
          const t = text.replace(/\s+/g, ' ').trim().slice(0, 600);
          const items = s.highlights[lessonKey]?.items ?? [];
          if (t.length < 2 || items.some((h) => h.text === t)) return {};
          const h = { id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`, text: t, at: Date.now() };
          return { highlights: { ...s.highlights, [lessonKey]: { at: Date.now(), items: [...items, h] } } };
        }),
      removeHighlight: (lessonKey, id) =>
        set((s) => {
          const items = (s.highlights[lessonKey]?.items ?? []).filter((h) => h.id !== id);
          return { highlights: { ...s.highlights, [lessonKey]: { at: Date.now(), items } } };
        }),
      gradeCard: (key, grade) =>
        set((s) => ({
          cards: { ...s.cards, [key]: review(s.cards[key], grade) },
          studyDays: markStudied(s.studyDays),
        })),
      importData: (data) => {
        if (!data || typeof data !== 'object') return false;
        const d = data as Partial<typeof initial>;
        if (!d.completed || !Array.isArray(d.attempts)) return false;
        // An imported backup replaces this account's progress everywhere (like a reset followed by a restore).
        set({ ...initial, ...d, resetAt: Date.now() });
        return true;
      },
      replaceData: (data) => set({ ...normalise(data) }),
      // Keeps the name and display preferences; everything else is cleared on every device (see resetAt in syncMerge).
      reset: () => set((s) => ({ ...initial, name: s.name, theme: s.theme, textSize: s.textSize, examDate: s.examDate, levels: s.levels, dailyGoal: s.dailyGoal, resetAt: Date.now() })),
    }),
    {
      name: 'dp-academy:v1',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      // Hydrated by src/lib/account.ts once we know whose progress to load.
      skipHydration: true,
    },
  ),
);

export const exportableState = () => {
  const { name, theme, textSize, examDate, levels, dailyGoal, exam, completed, visited, revisit, lastLesson, attempts, bookmarks, notes, highlights, cards, studyDays, resetAt } =
    useProgress.getState();
  return { name, theme, textSize, examDate, levels, dailyGoal, exam, completed, visited, revisit, lastLesson, attempts, bookmarks, notes, highlights, cards, studyDays, resetAt };
};

/** Whether a lesson is currently flagged for revision. Usable as `useProgress((s) => isRevisit(s, key))`. */
export const isRevisit = (state: { revisit: Record<string, RevisitMark> }, key: string): boolean => !!state.revisit?.[key]?.on;

/** The slice the statistics functions need, with shallow equality. */
export const useStudyState = () =>
  useProgress(useShallow((s) => ({ completed: s.completed, visited: s.visited, attempts: s.attempts })));
