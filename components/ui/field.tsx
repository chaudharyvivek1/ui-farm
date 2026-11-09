import * as React from 'react';

import { Label } from './label';

export type FieldSize = 'sm' | 'md' | 'lg';

const sizes: Record<FieldSize, string> = {
  sm: 'px-3 py-1.5 text-[13px]',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
};

/**
 * Shared control styling for every field component, so a form built from
 * TextInput, NumberInput and Select lines up to the pixel.
 */
export function fieldClasses(
  invalid = false,
  size: FieldSize = 'md',
  extra = '',
): string {
  return [
    'w-full rounded-xl border bg-[var(--surface)] text-[var(--foreground)] placeholder:text-[var(--muted)]/70 transition-colors focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60',
    sizes[size],
    invalid
      ? 'border-[var(--danger)]/60 focus:border-[var(--danger)] focus:ring-[var(--danger)]/30'
      : 'border-[var(--border)] focus:border-[var(--primary)] focus:ring-[var(--primary)]/30',
    extra,
  ]
    .filter(Boolean)
    .join(' ');
}

export interface FieldProps {
  label?: string;
  /** Muted helper line under the control. Hidden when `error` is set. */
  hint?: string;
  /** Error message; also switches the control to its invalid styling. */
  error?: string;
  required?: boolean;
  /** Id of the control, used to tie the label to it. */
  htmlFor?: string;
  /** Extra classes for the wrapper. */
  className?: string;
  children: React.ReactNode;
}

/**
 * Label + control + message. Every field component uses it, so spacing and
 * error placement are identical everywhere.
 */
export function Field({
  label,
  hint,
  error,
  required = false,
  htmlFor,
  className = '',
  children,
}: FieldProps) {
  const hasHeader = Boolean(label);
  const message = error ?? (hasHeader ? undefined : hint);

  return (
    <div className={['space-y-2', className].filter(Boolean).join(' ')}>
      {label ? (
        <Label htmlFor={htmlFor} required={required} hint={hasHeader ? hint : undefined}>
          {label}
        </Label>
      ) : null}

      {children}

      {message ? (
        <p
          className={[
            'text-xs leading-relaxed',
            error ? 'text-[var(--danger)]' : 'text-[var(--muted)]',
          ].join(' ')}
          role={error ? 'alert' : undefined}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}

export default Field;
