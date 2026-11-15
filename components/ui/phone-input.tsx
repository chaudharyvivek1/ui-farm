'use client';

import * as React from 'react';

import { Field, fieldClasses, type FieldSize } from './field';
import { formatPhoneIN, onlyDigits } from './input-utils';

export interface PhoneInputProps {
  label?: string;
  hint?: string;
  error?: string;
  invalid?: boolean;

  value?: string;
  defaultValue?: string;
  /** Receives the ten digits without spaces or the country code. */
  onValueChange?: (digits: string) => void;

  /** Country code shown as a fixed prefix. */
  countryCode?: string;
  /** Digits allowed after the country code. */
  length?: number;
  placeholder?: string;
  size?: FieldSize;
  disabled?: boolean;
  id?: string;
  className?: string;
  name?: string;
  required?: boolean;
}

/**
 * Indian mobile field: digits only, capped at ten, grouped as 98765 43210
 * while typing. The value handed back is the raw ten digits, which is what a
 * backend usually wants to store.
 */
export function PhoneInput({
  label,
  hint,
  error,
  invalid = false,
  value,
  defaultValue = '',
  onValueChange,
  countryCode = '+91',
  length = 10,
  placeholder = '98765 43210',
  size = 'md',
  disabled = false,
  id,
  className = '',
  name,
  required,
}: PhoneInputProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const inputRef = React.useRef<HTMLInputElement>(null);
  // Digits to the left of the caret. The value is re-formatted on every
  // keystroke, so the caret has to be put back afterwards or it jumps to the
  // end of the field.
  const caretDigits = React.useRef<number | null>(null);

  const [internal, setInternal] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const digits = onlyDigits(isControlled ? value : internal).slice(0, length);
  const hasError = Boolean(error) || invalid;
  const formatted = formatPhoneIN(digits);

  function commit(next: string, digitsBeforeCaret: number) {
    caretDigits.current = Math.min(digitsBeforeCaret, next.length);
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value: raw, selectionStart } = event.target;
    const caret = selectionStart ?? raw.length;
    const next = onlyDigits(raw).slice(0, length);
    commit(next, onlyDigits(raw.slice(0, caret)).length);
  }

  // Backspace over a formatting space deletes the space, which the formatter
  // puts straight back — the keystroke looks swallowed. Delete the digit next
  // to it instead, which is what the user meant.
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== 'Backspace' && event.key !== 'Delete') return;

    const element = event.currentTarget;
    const start = element.selectionStart ?? 0;
    const end = element.selectionEnd ?? 0;
    if (start !== end) return;

    const target = event.key === 'Backspace' ? start - 1 : start;
    if (formatted[target] !== ' ') return;

    const digitsBeforeSpace = onlyDigits(formatted.slice(0, target)).length;
    const removeAt = event.key === 'Backspace' ? digitsBeforeSpace - 1 : digitsBeforeSpace;
    if (removeAt < 0 || removeAt >= digits.length) return;

    event.preventDefault();
    commit(digits.slice(0, removeAt) + digits.slice(removeAt + 1), removeAt);
  }

  React.useLayoutEffect(() => {
    const element = inputRef.current;
    const target = caretDigits.current;
    if (!element || target === null) return;

    caretDigits.current = null;
    if (document.activeElement !== element) return;

    let seen = 0;
    let position = formatted.length;
    for (let index = 0; index < formatted.length; index += 1) {
      if (/\d/.test(formatted[index])) seen += 1;
      if (seen === target) {
        position = index + 1;
        break;
      }
    }
    element.setSelectionRange(position, position);
  }, [formatted, digits]);

  return (
    <Field
      label={label}
      hint={hint}
      error={error}
      htmlFor={inputId}
      required={required}
      messageId={`${inputId}-message`}
    >
      {/* The visible field shows "98765 43210"; a native form submit should
          still post the ten raw digits, so they travel in a hidden input. */}
      {name ? <input type="hidden" name={name} value={digits} /> : null}

      <div className="flex items-stretch">
        <span className="flex select-none items-center rounded-l-xl border border-r-0 border-[var(--border)] bg-[var(--surface-muted)] px-3 text-sm text-[var(--muted)]">
          {countryCode}
        </span>
        <input
          ref={inputRef}
          id={inputId}
          required={required}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          value={formatted}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          aria-invalid={hasError || undefined}
          aria-describedby={error || (!label && hint) ? `${inputId}-message` : undefined}
          className={fieldClasses(hasError, size, ['rounded-l-none tabular-nums', className].join(' '))}
        />
      </div>
    </Field>
  );
}

export default PhoneInput;
