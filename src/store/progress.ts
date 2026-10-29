import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import { review, type CardState, type Grade } from '../lib/srs';
import { today } from '../lib/dates';

/*
 * Everything a student does lives here and is persisted to localStorage.
 * Components read through hooks; nothing else touches storage, so moving to
 * a hosted backend later means replacing the `storage` option only.
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
  completed: Record<string, string>; // lesson key → ISO date completed
  visited: Record<string, number>; // lesson key → last opened (epoch ms)
  lastLesson: string | null;
  attempts: Attempt[];
  bookmarks: Record<string, { kind: BookmarkKind; at: number }>;
  notes: Record<string, string>;
  cards: Record<string, CardState>;
  studyDays: string[];

  setName: (name: string) => void;
  setTheme: (theme: Theme) => void;
  visitLesson: (key: string) => void;
  setComplete: (key: string, done: boolean) => void;
  recordAttempt: (a: Omit<Attempt, 'at'>) => void;
  toggleBookmark: (key: string, kind: BookmarkKind) => void;
  setNote: (key: string, text: string) => void;
  gradeCard: (key: string, grade: Grade) => void;
  importData: (data: unknown) => boolean;
  reset: () => void;
}

const initial = {
  name: '',
  theme: 'system' as Theme,
  completed: {},
  visited: {},
  lastLesson: null,
  attempts: [],
  bookmarks: {},
  notes: {},
  cards: {},
  studyDays: [],
};

const MAX_ATTEMPTS = 5000;

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
      gradeCard: (key, grade) =>
        set((s) => ({
          cards: { ...s.cards, [key]: review(s.cards[key], grade) },
          studyDays: markStudied(s.studyDays),
        })),
      importData: (data) => {
        if (!data || typeof data !== 'object') return false;
        const d = data as Partial<typeof initial>;
        if (!d.completed || !Array.isArray(d.attempts)) return false;
        set({ ...initial, ...d });
        return true;
      },
      reset: () => set({ ...initial }),
    }),
    {
      name: 'dp-academy:v1',
      version: 1,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const exportableState = () => {
  const { name, theme, completed, visited, lastLesson, attempts, bookmarks, notes, cards, studyDays } =
    useProgress.getState();
  return { name, theme, completed, visited, lastLesson, attempts, bookmarks, notes, cards, studyDays };
};

/** The slice the statistics functions need, with shallow equality. */
export const useStudyState = () =>
  useProgress(useShallow((s) => ({ completed: s.completed, visited: s.visited, attempts: s.attempts })));
