'use client';

import * as React from 'react';

import { Field, fieldClasses, type FieldSize } from './field';
import {
  applyTransform,
  onlyAlpha,
  onlyAlphaNumeric,
  onlyDigits,
  type InputTransform,
} from './input-utils';

export type AllowedCharacters = 'any' | 'alpha' | 'alphanumeric' | 'digits';

export interface TextInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value' | 'defaultValue' | 'size'
  > {
  label?: string;
  hint?: string;
  error?: string;
  /** Shows the error styling and sets aria-invalid without a message. */
  invalid?: boolean;

  value?: string;
  defaultValue?: string;
  /** Receives the cleaned, transformed value on every keystroke. */
  onValueChange?: (value: string) => void;

  /** Drops characters that are not allowed as the user types. */
  allowed?: AllowedCharacters;
  /** Keeps spaces when `allowed` is "alpha" or "alphanumeric". */
  allowSpaces?: boolean;
  /** Casing applied on every keystroke, e.g. "capitalize-words" for names. */
  transform?: InputTransform;

  maxLength?: number;
  /** Shows "12 / 60" under the field when `maxLength` is set. */
  showCount?: boolean;
  /** Adds a clear button once there is a value. */
  clearable?: boolean;

  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  size?: FieldSize;
}

/**
 * Text field with character filtering, casing transforms, a counter and a
 * clear button. Filtering happens on input, so the value a consumer receives
 * is always clean — no separate validation step for the obvious cases.
 */
export function TextInput({
  label,
  hint,
  error,
  invalid = false,
  value,
  defaultValue = '',
  onValueChange,
  allowed = 'any',
  allowSpaces = true,
  transform = 'none',
  maxLength,
  showCount = false,
  clearable = false,
  startIcon,
  endIcon,
  size = 'md',
  className = '',
  id,
  disabled,
  ...props
}: TextInputProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  function clean(raw: string): string {
    let next = raw;

    switch (allowed) {
      case 'alpha':
        next = onlyAlpha(next, allowSpaces);
        break;
      case 'alphanumeric':
        next = onlyAlphaNumeric(next);
        break;
      case 'digits':
        next = onlyDigits(next);
        break;
      default:
        break;
    }

    next = applyTransform(next, transform);
    if (typeof maxLength === 'number') next = next.slice(0, maxLength);
    return next;
  }

  // A defaultValue is cleaned once on mount, so a prefilled "vivek chaudhary"
  // shows as "Vivek Chaudhary" instead of contradicting the transform.
  const [internal, setInternal] = React.useState(() => clean(defaultValue));
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const next = clean(event.target.value);
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  }

  const hasError = Boolean(error) || invalid;
  const isDisabled = Boolean(disabled);

  return (
    <Field label={label} hint={hint} error={error} htmlFor={inputId}>
      <div className="relative flex items-center">
        {startIcon ? (
          <span className="pointer-events-none absolute left-3 flex text-[var(--muted)]">
            {startIcon}
          </span>
        ) : null}

        <input
          id={inputId}
          value={current}
          onChange={handleChange}
          disabled={isDisabled}
          aria-invalid={hasError || undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          maxLength={maxLength}
          className={fieldClasses(hasError, size, [
            startIcon ? 'pl-10' : '',
            endIcon || clearable ? 'pr-10' : '',
            className,
          ].join(' '))}
          {...props}
        />

        {clearable && current && !isDisabled ? (
          <button
            type="button"
            aria-label="Clear"
            onClick={() => {
              if (!isControlled) setInternal('');
              onValueChange?.('');
            }}
            className="absolute right-3 flex size-5 items-center justify-center rounded-full text-[var(--muted)] transition-colors hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="size-3.5" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        ) : endIcon ? (
          <span className="absolute right-3 flex text-[var(--muted)]">{endIcon}</span>
        ) : null}
      </div>

      {showCount && typeof maxLength === 'number' ? (
        <p className="text-right text-[11px] tabular-nums text-[var(--muted)]">
          {current.length} / {maxLength}
        </p>
      ) : null}
    </Field>
  );
}

export default TextInput;
