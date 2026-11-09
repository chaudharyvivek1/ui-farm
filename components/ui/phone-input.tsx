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

  const [internal, setInternal] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const digits = onlyDigits(isControlled ? value : internal).slice(0, length);
  const hasError = Boolean(error) || invalid;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const next = onlyDigits(event.target.value).slice(0, length);
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  }

  return (
    <Field label={label} hint={hint} error={error} htmlFor={inputId}>
      <div className="flex items-stretch">
        <span className="flex select-none items-center rounded-l-xl border border-r-0 border-[var(--border)] bg-[var(--surface-muted)] px-3 text-sm text-[var(--muted)]">
          {countryCode}
        </span>
        <input
          id={inputId}
          name={name}
          required={required}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          value={formatPhoneIN(digits)}
          onChange={handleChange}
          disabled={disabled}
          placeholder={placeholder}
          aria-invalid={hasError || undefined}
          className={fieldClasses(hasError, size, ['rounded-l-none tabular-nums', className].join(' '))}
        />
      </div>
    </Field>
  );
}

export default PhoneInput;
