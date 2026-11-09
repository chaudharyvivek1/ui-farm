'use client';

import * as React from 'react';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  /** Renders an indeterminate dash instead of a tick. */
  indeterminate?: boolean;
}

export function Checkbox({
  label,
  description,
  indeterminate = false,
  className = '',
  id,
  ...props
}: CheckboxProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <div className={['flex items-start gap-3', className].filter(Boolean).join(' ')}>
      <span className="relative mt-0.5 inline-flex">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          className="peer size-4.5 cursor-pointer appearance-none rounded-md border border-[var(--border)] bg-[var(--surface)] transition-colors checked:border-[var(--primary)] checked:bg-[var(--primary)] indeterminate:border-[var(--primary)] indeterminate:bg-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:cursor-not-allowed disabled:opacity-50"
          {...props}
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-0"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-0.5 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 peer-indeterminate:opacity-100"
        />
      </span>

      {label || description ? (
        <label htmlFor={inputId} className="cursor-pointer space-y-0.5">
          {label ? (
            <span className="block text-sm font-medium text-[var(--foreground)]">
              {label}
            </span>
          ) : null}
          {description ? (
            <span className="block text-xs leading-relaxed text-[var(--muted)]">
              {description}
            </span>
          ) : null}
        </label>
      ) : null}
    </div>
  );
}

export default Checkbox;
