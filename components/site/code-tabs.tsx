'use client';

import { useState } from 'react';

export type CodeVariantView = {
  id: string;
  label: string;
  framework: string;
  filename: string;
  html: string;
  plain: string;
};

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

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
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={[
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
        copied
          ? 'border-[var(--success)]/40 bg-[var(--success)]/10 text-[var(--success)]'
          : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--primary)]/40 hover:text-[var(--foreground)]',
      ].join(' ')}
      aria-live="polite"
    >
      {copied ? (
        <>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
            <rect x="9" y="9" width="12" height="12" rx="2" />
            <path d="M5 15V5a2 2 0 0 1 2-2h10" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

export function CodeTabs({ variants }: { variants: CodeVariantView[] }) {
  const [active, setActive] = useState(variants[0]?.id ?? '');
  const current = variants.find((variant) => variant.id === active) ?? variants[0];

  if (!current) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] px-3 py-2">
        <div role="tablist" aria-label="Code language" className="flex flex-wrap items-center gap-1">
          {variants.map((variant) => {
            const selected = variant.id === active;
            return (
              <button
                key={variant.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(variant.id)}
                className={[
                  'rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
                  selected
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                    : 'text-[var(--muted)] hover:text-[var(--foreground)]',
                ].join(' ')}
              >
                {variant.framework} · {variant.label}
              </button>
            );
          })}
        </div>
        <CopyButton value={current.plain} />
      </div>

      <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--surface-muted)]/40 px-4 py-2">
        <span className="font-mono text-[11px] text-[var(--muted)]">{current.filename}</span>
        <span className="text-[11px] text-[var(--muted)]">{current.plain.split('\n').length} lines</span>
      </div>

      <div
        className="max-h-[32rem] overflow-auto"
        // Shiki output is generated at build time from local files.
        dangerouslySetInnerHTML={{ __html: current.html }}
      />
    </div>
  );
}

export default CodeTabs;
