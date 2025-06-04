// app/utils/theme.ts
export type Theme = 'light' | 'dark';

export function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  return (localStorage.getItem('theme') as Theme) || getSystemTheme();
}
