import { useEffect } from 'react';
import { useProgress, type Theme } from '../store/progress';
import { Icon, type IconName } from './Icon';

const NEXT: Record<Theme, Theme> = { system: 'light', light: 'dark', dark: 'system' };
const ICON: Record<Theme, IconName> = { system: 'monitor', light: 'sun', dark: 'moon' };
const LABEL: Record<Theme, string> = { system: 'Match system', light: 'Light', dark: 'Dark' };

/** Applies the chosen theme to <html> and follows the OS while set to "system". */
export function useApplyTheme() {
  const theme = useProgress((s) => s.theme);
  useEffect(() => {
    const mq = matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      const dark = theme === 'dark' || (theme === 'system' && mq.matches);
      document.documentElement.classList.toggle('dark', dark);
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0c0c0e' : '#f7f7f5');
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [theme]);
}

export function ThemeToggle() {
  const theme = useProgress((s) => s.theme);
  const setTheme = useProgress((s) => s.setTheme);
  return (
    <button
      type="button"
      className="icon-btn"
      onClick={() => setTheme(NEXT[theme])}
      aria-label={`Theme: ${LABEL[theme]}. Switch to ${LABEL[NEXT[theme]]}`}
      title={`Theme: ${LABEL[theme]}`}
    >
      <Icon name={ICON[theme]} />
    </button>
  );
}
