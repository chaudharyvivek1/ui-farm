import * as React from 'react';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'outline';

const base =
  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold leading-5';

const variants: Record<BadgeVariant, string> = {
  default:
    'border-[var(--border)] bg-[var(--surface-muted)] text-[var(--foreground)]',
  primary:
    'border-[var(--primary)]/25 bg-[var(--primary)]/12 text-[var(--primary)]',
  accent:
    'border-[var(--accent)]/25 bg-[var(--accent)]/12 text-[var(--accent)]',
  success: 'border-[var(--success)]/25 bg-[var(--success)]/12 text-[var(--success)]',
  warning: 'border-[var(--warning)]/25 bg-[var(--warning)]/12 text-[var(--warning)]',
  danger: 'border-[var(--danger)]/25 bg-[var(--danger)]/12 text-[var(--danger)]',
  outline: 'border-[var(--border)] bg-transparent text-[var(--muted-foreground)]',
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  /** Renders a small dot before the label. */
  dot?: boolean;
}

export function Badge({
  variant = 'default',
  dot = false,
  className = '',
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={[base, variants[variant], className].filter(Boolean).join(' ')}
      {...props}
    >
      {dot ? (
        <span
          aria-hidden="true"
          className="size-1.5 rounded-full bg-current"
        />
      ) : null}
      {children}
    </span>
  );
}

export default Badge;
