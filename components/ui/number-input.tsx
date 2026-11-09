'use client';

import * as React from 'react';

import { Field, fieldClasses, type FieldSize } from './field';
import { clampNumber, formatIndianNumber, formatNumber, sanitizeNumber, toNumber } from './input-utils';

export interface NumberInputProps {
  label?: string;
  hint?: string;
  error?: string;
  invalid?: boolean;

  value?: number | null;
  defaultValue?: number | null;
  /** Fires with a number (or null when the field is empty). */
  onValueChange?: (value: number | null) => void;

  min?: number;
  max?: number;
  /** Amount added or removed by the stepper buttons and arrow keys. */
  step?: number;
  /** Digits after the decimal point. 0 makes it an integer field. */
  decimals?: number;
  allowNegative?: boolean;
  /** Groups thousands while the field is not focused: 1,24,000. */
  thousandSeparator?: boolean;
  /** Indian grouping (1,24,000) instead of Western (124,000). */
  indianGrouping?: boolean;
  /** Shows − and + buttons. */
  stepper?: boolean;

  prefix?: string;
  suffix?: string;
  placeholder?: string;
  size?: FieldSize;
  disabled?: boolean;
  id?: string;
  className?: string;
  name?: string;
  required?: boolean;
  onBlur?: () => void;
}

/**
 * Numeric field that keeps the raw string while the user types (so "12." and
 * "-" are typeable) and normalises on blur: clamping to min/max, rounding to
 * `decimals`, and re-grouping thousands. `decimals={0}` gives an integer
 * field, `decimals={2}` a float field.
 */
export function NumberInput({
  label,
  hint,
  error,
  invalid = false,
  value,
  defaultValue = null,
  onValueChange,
  min,
  max,
  step = 1,
  decimals = 0,
  allowNegative = false,
  thousandSeparator = false,
  indianGrouping = true,
  stepper = false,
  prefix,
  suffix,
  placeholder,
  size = 'md',
  disabled = false,
  id,
  className = '',
  name,
  required,
  onBlur,
}: NumberInputProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  const [text, setText] = React.useState(() =>
    defaultValue === null || defaultValue === undefined ? '' : String(defaultValue),
  );
  const [focused, setFocused] = React.useState(false);
  const isControlled = value !== undefined;

  // Keep the display in step when a parent changes the value from outside.
  React.useEffect(() => {
    if (!isControlled || focused) return;
    setText(value === null || value === undefined ? '' : String(value));
  }, [value, isControlled, focused]);

  const numeric = toNumber(text, decimals);
  const hasError = Boolean(error) || invalid;

  function commit(next: string) {
    setText(next);
    onValueChange?.(toNumber(next, decimals));
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    commit(sanitizeNumber(event.target.value, decimals, allowNegative));
  }

  function handleBlur() {
    setFocused(false);
    if (text === '' || text === '-') {
      setText('');
      onValueChange?.(null);
      onBlur?.();
      return;
    }

    const parsed = toNumber(text, decimals) ?? 0;
    const clamped = clampNumber(parsed, min, max);
    const rounded = decimals > 0 ? clamped.toFixed(decimals) : String(Math.round(clamped));
    setText(rounded);
    onValueChange?.(toNumber(rounded, decimals));
    onBlur?.();
  }

  function bump(direction: 1 | -1) {
    if (disabled) return;
    const base = numeric ?? min ?? 0;
    const next = clampNumber(base + direction * step, min, max);
    const rounded = decimals > 0 ? next.toFixed(decimals) : String(Math.round(next));
    setText(rounded);
    onValueChange?.(toNumber(rounded, decimals));
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      bump(1);
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      bump(-1);
    }
  }

  const display = (() => {
    if (text === '') return '';
    if (focused || !thousandSeparator) return text;
    return indianGrouping ? formatIndianNumber(text, decimals) : formatNumber(text, decimals);
  })();

  const stepperButton =
    'flex size-7 items-center justify-center rounded-md text-[var(--muted)] transition-colors hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)] disabled:pointer-events-none disabled:opacity-40';

  return (
    <Field label={label} hint={hint} error={error} htmlFor={inputId}>
      <div className="relative flex items-center">
        {prefix ? (
          <span className="pointer-events-none absolute left-3 text-sm text-[var(--muted)]">
            {prefix}
          </span>
        ) : null}

        <input
          id={inputId}
          name={name}
          required={required}
          inputMode={decimals > 0 ? 'decimal' : 'numeric'}
          autoComplete="off"
          value={display}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          aria-invalid={hasError || undefined}
          className={fieldClasses(hasError, size, [
            prefix ? 'pl-8' : '',
            suffix || stepper ? 'pr-20' : '',
            'tabular-nums',
            className,
          ].join(' '))}
        />

        <div className="absolute right-2 flex items-center gap-1">
          {suffix ? <span className="text-sm text-[var(--muted)]">{suffix}</span> : null}

          {stepper ? (
            <span className="flex flex-col gap-0.5">
              <button
                type="button"
                tabIndex={-1}
                aria-label="Increase"
                className={stepperButton}
                disabled={disabled || (typeof max === 'number' && (numeric ?? 0) >= max)}
                onClick={() => bump(1)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" className="size-3.5" aria-hidden="true">
                  <path d="m6 15 6-6 6 6" />
                </svg>
              </button>
              <button
                type="button"
                tabIndex={-1}
                aria-label="Decrease"
                className={stepperButton}
                disabled={disabled || (typeof min === 'number' && (numeric ?? 0) <= min)}
                onClick={() => bump(-1)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" className="size-3.5" aria-hidden="true">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </span>
          ) : null}
        </div>
      </div>
    </Field>
  );
}

export default NumberInput;
