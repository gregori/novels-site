export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

/**
 * BR-7: resolve the theme to apply when no explicit choice has been made yet
 * for this call — falls back to the OS/browser preference.
 */
export function resolveInitialTheme(stored: string | null, prefersDark: boolean): Theme {
  if (stored === 'light' || stored === 'dark') return stored;
  return prefersDark ? 'dark' : 'light';
}

export function getStoredTheme(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
}

/**
 * BR-7: applies and persists an explicit reader choice, taking precedence
 * over the OS preference on future visits.
 */
export function setTheme(theme: Theme): void {
  applyTheme(theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* localStorage unavailable (e.g. private mode) — preference just won't persist */
  }
}

export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export function initThemeToggle(button: HTMLElement): void {
  button.addEventListener('click', () => {
    setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  });
}
