import * as React from 'react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

const base =
  'relative flex gap-3 rounded-xl border p-4 text-sm leading-relaxed';

const variants: Record<AlertVariant, string> = {
  info: 'border-[var(--primary)]/25 bg-[var(--primary)]/10 text-[var(--muted-foreground)]',
  success:
    'border-[var(--success)]/25 bg-[var(--success)]/10 text-[var(--muted-foreground)]',
  warning:
    'border-[var(--warning)]/25 bg-[var(--warning)]/10 text-[var(--muted-foreground)]',
  danger:
    'border-[var(--danger)]/25 bg-[var(--danger)]/10 text-[var(--muted-foreground)]',
};

const titleTone: Record<AlertVariant, string> = {
  info: 'text-[var(--primary)]',
  success: 'text-[var(--success)]',
  warning: 'text-[var(--warning)]',
  danger: 'text-[var(--danger)]',
};

const icons: Record<AlertVariant, React.ReactNode> = {
  info: (
    <path d="M12 16v-4M12 8h.01M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />
  ),
  success: <path d="M20 6 9 17l-5-5" />,
  warning: (
    <path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
  ),
  danger: (
    <path d="M12 9v4M12 17h.01M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />
  ),
};

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  /** Set to false to hide the leading status icon. */
  icon?: boolean;
}

export function Alert({
  variant = 'info',
  icon = true,
  className = '',
  children,
  ...props
}: AlertProps) {
  return (
    <div
      role={variant === 'danger' ? 'alert' : 'status'}
      className={[base, variants[variant], className].filter(Boolean).join(' ')}
      {...props}
    >
      {icon ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={['mt-0.5 size-5 shrink-0', titleTone[variant]].join(' ')}
        >
          {icons[variant]}
        </svg>
      ) : null}
      <div className="space-y-1">{children}</div>
    </div>
  );
}

export function AlertTitle({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={['font-semibold text-[var(--foreground)]', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
}

export function AlertDescription({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={['text-[var(--muted)]', className].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

export default Alert;
