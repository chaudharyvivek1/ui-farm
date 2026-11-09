'use client';

import * as React from 'react';

import { styleSystems, type StyleRow, type StyleSystem } from '@/lib/style-systems';

function CopyCell({ value }: { value: string }) {
  const [copied, setCopied] = React.useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const area = document.createElement('textarea');
      area.value = value;
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${value}`}
      className={[
        'ml-2 inline-flex shrink-0 items-center rounded-md border px-1.5 py-0.5 text-[10px] font-medium transition-colors',
        copied
          ? 'border-[var(--success)]/40 text-[var(--success)]'
          : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--primary)]/40 hover:text-[var(--foreground)]',
      ].join(' ')}
    >
      {copied ? 'copied' : 'copy'}
    </button>
  );
}

const fileFor: Record<StyleSystem, string> = {
  tailwind: 'components/ui/<name>.tsx',
  css: 'registry/css/ui-farm.css',
  bootstrap: 'registry/bootstrap/ui-farm-bootstrap.css',
  mui: 'registry/mui/theme.ts',
};

export function StylePanel({
  rows,
  name,
  code,
}: {
  rows: StyleRow[];
  name: string;
  /** The Tailwind code tabs, rendered by the server component. */
  code: React.ReactNode;
}) {
  const [system, setSystem] = React.useState<StyleSystem>('tailwind');
  const active = styleSystems.find((entry) => entry.id === system) ?? styleSystems[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          role="tablist"
          aria-label="Styling system"
          className="inline-flex flex-wrap items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] p-1"
        >
          {styleSystems.map((entry) => {
            const selected = entry.id === system;
            return (
              <button
                key={entry.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setSystem(entry.id)}
                className={[
                  'rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors',
                  selected
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                    : 'text-[var(--muted)] hover:text-[var(--foreground)]',
                ].join(' ')}
              >
                {entry.label}
              </button>
            );
          })}
        </div>

        <span className="font-mono text-[11px] text-[var(--muted)]">
          {fileFor[system].replace('<name>', name.toLowerCase().replace(/\s+/g, '-'))}
        </span>
      </div>

      <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">{active.copy}</p>

      {system === 'tailwind' ? (
        code
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-muted)]/40 px-4 py-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
              {active.label} classes for {name}
            </span>
            <span className="text-[11px] text-[var(--muted)]">{rows.length} elements</span>
          </div>

          <ul className="divide-y divide-[var(--border)]">
            {rows.map((row) => (
              <li
                key={`${row.element}-${system}`}
                className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
              >
                <span className="min-w-0 text-sm text-[var(--muted-foreground)]">{row.element}</span>
                <span className="flex items-center font-mono text-xs text-[var(--primary)]">
                  <code className="break-all">{row[system]}</code>
                  <CopyCell value={row[system]} />
                </span>
              </li>
            ))}
          </ul>

          <div className="border-t border-[var(--border)] px-4 py-3 text-[11px] leading-relaxed text-[var(--muted)]">
            The markup shape is the same in every system — only the class names change. Copy the
            stylesheet once, then use these classes on the elements.
          </div>
        </div>
      )}
    </div>
  );
}

export default StylePanel;
