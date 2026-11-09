import * as React from 'react';

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Appends a red asterisk for required fields. */
  required?: boolean;
  /** Muted hint shown to the right of the label. */
  hint?: string;
}

export function Label({
  required = false,
  hint,
  className = '',
  children,
  ...props
}: LabelProps) {
  return (
    <label
      className={[
        'flex items-center justify-between gap-3 text-sm font-medium text-[var(--foreground)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <span>
        {children}
        {required ? (
          <span aria-hidden="true" className="ml-1 text-[var(--danger)]">
            *
          </span>
        ) : null}
      </span>
      {hint ? (
        <span className="text-xs font-normal text-[var(--muted)]">{hint}</span>
      ) : null}
    </label>
  );
}

export default Label;
