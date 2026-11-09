'use client';

import * as React from 'react';

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Visible text next to the control; also becomes its accessible name. */
  label?: string;
  description?: string;
  size?: 'sm' | 'md';
}

export function Switch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  label,
  description,
  size = 'md',
  disabled = false,
  className = '',
  ...props
}: SwitchProps) {
  const [internal, setInternal] = React.useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isOn = isControlled ? checked : internal;

  function toggle() {
    const next = !isOn;
    if (!isControlled) setInternal(next);
    onCheckedChange?.(next);
  }

  const track = size === 'sm' ? 'h-5 w-9' : 'h-6 w-11';
  const knob = size === 'sm' ? 'size-3.5' : 'size-4.5';
  const travel = size === 'sm' ? 'translate-x-4' : 'translate-x-5';

  return (
    <div className={['flex items-start gap-3', className].filter(Boolean).join(' ')}>
      <button
        type="button"
        role="switch"
        aria-checked={isOn}
        aria-label={label ? undefined : props['aria-label']}
        disabled={disabled}
        onClick={toggle}
        className={[
          'relative inline-flex shrink-0 items-center rounded-full border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:cursor-not-allowed disabled:opacity-50',
          track,
          isOn
            ? 'border-[var(--primary)] bg-[var(--primary)]'
            : 'border-[var(--border)] bg-[var(--surface-muted)]',
        ].join(' ')}
        {...props}
      >
        <span
          aria-hidden="true"
          className={[
            'pointer-events-none ml-0.5 block rounded-full bg-white shadow-sm transition-transform duration-200',
            knob,
            isOn ? travel : 'translate-x-0',
          ].join(' ')}
        />
      </button>

      {label || description ? (
        <div className="space-y-0.5">
          {label ? (
            <p className="text-sm font-medium text-[var(--foreground)]">{label}</p>
          ) : null}
          {description ? (
            <p className="text-xs leading-relaxed text-[var(--muted)]">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default Switch;
