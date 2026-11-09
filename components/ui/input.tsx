import * as React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Paints the field in the error state and sets aria-invalid. */
  invalid?: boolean;
  /** Icon or text rendered inside the field, before the text. */
  startIcon?: React.ReactNode;
  /** Icon or text rendered inside the field, after the text. */
  endIcon?: React.ReactNode;
}

const field =
  'w-full rounded-xl border bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]/70 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-60';

export function Input({
  invalid = false,
  startIcon,
  endIcon,
  className = '',
  ...props
}: InputProps) {
  const tone = invalid
    ? 'border-[var(--danger)]/60 focus:border-[var(--danger)] focus:ring-[var(--danger)]/30'
    : 'border-[var(--border)] focus:border-[var(--primary)] focus:ring-[var(--primary)]/30';

  const input = (
    <input
      aria-invalid={invalid || undefined}
      className={[
        field,
        tone,
        startIcon ? 'pl-10' : '',
        endIcon ? 'pr-10' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );

  if (!startIcon && !endIcon) return input;

  return (
    <div className="relative flex items-center">
      {startIcon ? (
        <span className="pointer-events-none absolute left-3 flex text-[var(--muted)]">
          {startIcon}
        </span>
      ) : null}
      {input}
      {endIcon ? (
        <span className="absolute right-3 flex text-[var(--muted)]">
          {endIcon}
        </span>
      ) : null}
    </div>
  );
}

export default Input;
