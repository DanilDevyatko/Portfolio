import { useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'portfolio-theme';
const SYSTEM_THEME_QUERY = '(prefers-color-scheme: dark)';
const THEME_COLOR = {
  dark: '#06080d',
  light: '#f4f2ec',
} satisfies Record<Theme, string>;

const isTheme = (value: string | null | undefined): value is Theme =>
  value === 'dark' || value === 'light';

const getStoredTheme = (): Theme | null => {
  try {
    const theme = window.localStorage.getItem(STORAGE_KEY);
    return isTheme(theme) ? theme : null;
  } catch {
    return null;
  }
};

const getSystemTheme = (): Theme =>
  window.matchMedia(SYSTEM_THEME_QUERY).matches ? 'dark' : 'light';

const syncThemeOnDocument = (theme: Theme): void => {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;

  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    document.head.append(meta);
  }

  meta.setAttribute('content', THEME_COLOR[theme]);
};

const getInitialTheme = (): Theme => {
  const documentTheme = document.documentElement.dataset.theme;
  if (isTheme(documentTheme)) {
    return documentTheme;
  }

  return getStoredTheme() ?? getSystemTheme();
};

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    syncThemeOnDocument(theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(SYSTEM_THEME_QUERY);

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      if (getStoredTheme()) {
        return;
      }

      setTheme(event.matches ? 'dark' : 'light');
    };

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) {
        return;
      }

      setTheme(isTheme(event.newValue) ? event.newValue : getSystemTheme());
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

      try {
        window.localStorage.setItem(STORAGE_KEY, nextTheme);
      } catch {
        // Ignore storage failures and keep the in-memory theme.
      }

      return nextTheme;
    });
  };

  return { theme, toggleTheme };
}
