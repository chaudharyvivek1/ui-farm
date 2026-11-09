'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

import { components } from '@/lib/registry';

const EVENT = 'ui-farm:search';

/** Opens the palette from anywhere — header, hero, or your own button. */
export function openSearch() {
  window.dispatchEvent(new Event(EVENT));
}

export function SearchTrigger({ className = '', label = 'Search components' }: { className?: string; label?: string }) {
  return (
    <button
      type="button"
      onClick={openSearch}
      className={[
        'inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3.5 py-2 text-sm text-[var(--muted)] transition-colors hover:border-[var(--primary)]/40 hover:text-[var(--foreground)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="size-4" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <span>{label}</span>
      <kbd className="ml-1 hidden rounded border border-[var(--border)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--muted)] sm:inline">
        ⌘K
      </kbd>
    </button>
  );
}

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return components.slice(0, 8);
    return components
      .filter((component) =>
        [component.name, component.category, component.summary, ...component.exports]
          .join(' ')
          .toLowerCase()
          .includes(term),
      )
      .slice(0, 8);
  }, [query]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((state) => !state);
        return;
      }
      if (event.key === 'Escape') setOpen(false);
      if (!open) return;

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActive((index) => Math.min(index + 1, results.length - 1));
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActive((index) => Math.max(index - 1, 0));
      }
      if (event.key === 'Enter' && results[active]) {
        event.preventDefault();
        setOpen(false);
        router.push(`/docs/components/${results[active].slug}`);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener(EVENT, () => setOpen(true));
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, results, active, router]);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setActive(0);
    const timer = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center p-4 pt-[12vh]">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search components"
        className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-lg"
      >
        <div className="flex items-center gap-3 border-b border-[var(--border)] px-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="size-4 shrink-0 text-[var(--muted)]" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search components, props, categories…"
            aria-label="Search components"
            className="w-full bg-transparent py-4 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]/70 focus:outline-none"
          />
          <kbd className="shrink-0 rounded border border-[var(--border)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--muted)]">
            esc
          </kbd>
        </div>

        <ul className="max-h-80 overflow-y-auto p-2" role="listbox">
          {results.length === 0 ? (
            <li className="px-3 py-8 text-center text-sm text-[var(--muted)]">
              Nothing matches “{query}”.
            </li>
          ) : null}

          {results.map((component, index) => (
            <li key={component.slug}>
              <button
                type="button"
                role="option"
                aria-selected={index === active}
                onMouseEnter={() => setActive(index)}
                onClick={() => {
                  setOpen(false);
                  router.push(`/docs/components/${component.slug}`);
                }}
                className={[
                  'flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition-colors',
                  index === active ? 'bg-[var(--surface-muted)]' : '',
                ].join(' ')}
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-[var(--foreground)]">
                    {component.name}
                  </span>
                  <span className="block truncate text-xs text-[var(--muted)]">{component.summary}</span>
                </span>
                <span className="shrink-0 rounded-full border border-[var(--border)] px-2 py-0.5 text-[10px] uppercase tracking-wider text-[var(--muted)]">
                  {component.category}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between border-t border-[var(--border)] px-4 py-2 text-[11px] text-[var(--muted)]">
          <span>{results.length} of {components.length} components</span>
          <span className="flex items-center gap-3">
            <span>↑↓ to move</span>
            <span>↵ to open</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default CommandPalette;
