import * as React from 'react';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export function Textarea({
  invalid = false,
  className = '',
  rows = 4,
  ...props
}: TextareaProps) {
  const tone = invalid
    ? 'border-[var(--danger)]/60 focus:border-[var(--danger)] focus:ring-[var(--danger)]/30'
    : 'border-[var(--border)] focus:border-[var(--primary)] focus:ring-[var(--primary)]/30';

  return (
    <textarea
      rows={rows}
      aria-invalid={invalid || undefined}
      className={[
        'w-full resize-y rounded-xl border bg-[var(--surface)] px-4 py-3 text-sm leading-relaxed text-[var(--foreground)] placeholder:text-[var(--muted)]/70 transition-colors focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60',
        tone,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
}

export default Textarea;
