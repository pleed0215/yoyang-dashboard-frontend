// app/utils/theme.ts
import { safeStorage } from './safe-storage';

export type Theme = 'light' | 'dark';

export function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function getStoredTheme(): Theme {
  const storedTheme = safeStorage.getItem('theme') as Theme;
  return storedTheme || getSystemTheme();
}
