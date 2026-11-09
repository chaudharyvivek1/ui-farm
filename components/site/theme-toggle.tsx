'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'ui-farm-theme';

type Theme = 'dark' | 'light';

function readTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const initial = readTheme();
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="grid size-9 place-items-center rounded-full border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--foreground)] transition hover:-translate-y-0.5 hover:border-[var(--primary)]/40"
    >
      <span aria-hidden="true" className="text-sm">
        {theme === 'dark' ? '☀' : '◐'}
      </span>
    </button>
  );
}

export default ThemeToggle;
