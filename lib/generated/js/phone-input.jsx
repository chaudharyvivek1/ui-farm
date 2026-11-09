/**
 * phone-input — JavaScript version.
 * Generated from the TypeScript source by scripts/build-snippets.mjs.
 */
"use client";
import * as React from "react";
import { Field, fieldClasses } from "./field";
import { formatPhoneIN, onlyDigits } from "./input-utils";
function PhoneInput({
  label,
  hint,
  error,
  invalid = false,
  value,
  defaultValue = "",
  onValueChange,
  countryCode = "+91",
  length = 10,
  placeholder = "98765 43210",
  size = "md",
  disabled = false,
  id,
  className = "",
  name,
  required
}) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const [internal, setInternal] = React.useState(defaultValue);
  const isControlled = value !== void 0;
  const digits = onlyDigits(isControlled ? value : internal).slice(0, length);
  const hasError = Boolean(error) || invalid;
  function handleChange(event) {
    const next = onlyDigits(event.target.value).slice(0, length);
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  }
  return <Field label={label} hint={hint} error={error} htmlFor={inputId}>
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
    aria-invalid={hasError || void 0}
    className={fieldClasses(hasError, size, ["rounded-l-none tabular-nums", className].join(" "))}
  />
      </div>
    </Field>;
}
var stdin_default = PhoneInput;
export {
  PhoneInput,
  stdin_default as default
};
