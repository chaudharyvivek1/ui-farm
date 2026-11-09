import * as React from 'react';

export type ProgressTone = 'primary' | 'accent' | 'success' | 'warning' | 'danger';

const tones: Record<ProgressTone, string> = {
  primary: 'bg-[var(--primary)]',
  accent: 'bg-[var(--accent)]',
  success: 'bg-[var(--success)]',
  warning: 'bg-[var(--warning)]',
  danger: 'bg-[var(--danger)]',
};

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current value, clamped between 0 and max. */
  value: number;
  max?: number;
  tone?: ProgressTone;
  /** Shows "value%" on the right. */
  showValue?: boolean;
  /** Accessible label; falls back to the value. */
  label?: string;
  size?: 'sm' | 'md';
}

export function Progress({
  value,
  max = 100,
  tone = 'primary',
  showValue = false,
  label,
  size = 'md',
  className = '',
  ...props
}: ProgressProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={className} {...props}>
      {showValue || label ? (
        <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-[var(--muted)]">
          <span>{label}</span>
          {showValue ? <span>{Math.round(percent)}%</span> : null}
        </div>
      ) : null}

      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label ?? 'Progress'}
        className={[
          'w-full overflow-hidden rounded-full bg-[var(--surface-muted)]',
          size === 'sm' ? 'h-1.5' : 'h-2.5',
        ].join(' ')}
      >
        <div
          className={['h-full rounded-full transition-[width] duration-500 ease-out', tones[tone]].join(' ')}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default Progress;
