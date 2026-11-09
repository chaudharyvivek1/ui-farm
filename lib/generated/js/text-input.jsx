/**
 * text-input — JavaScript version.
 * Generated from the TypeScript source by scripts/build-snippets.mjs.
 */
"use client";
import * as React from "react";
import { Field, fieldClasses } from "./field";
import {
  applyTransform,
  onlyAlpha,
  onlyAlphaNumeric,
  onlyDigits
} from "./input-utils";
function TextInput({
  label,
  hint,
  error,
  invalid = false,
  value,
  defaultValue = "",
  onValueChange,
  allowed = "any",
  allowSpaces = true,
  transform = "none",
  maxLength,
  showCount = false,
  clearable = false,
  startIcon,
  endIcon,
  size = "md",
  className = "",
  id,
  disabled,
  ...props
}) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  function clean(raw) {
    let next = raw;
    switch (allowed) {
      case "alpha":
        next = onlyAlpha(next, allowSpaces);
        break;
      case "alphanumeric":
        next = onlyAlphaNumeric(next);
        break;
      case "digits":
        next = onlyDigits(next);
        break;
      default:
        break;
    }
    next = applyTransform(next, transform);
    if (typeof maxLength === "number") next = next.slice(0, maxLength);
    return next;
  }
  const [internal, setInternal] = React.useState(() => clean(defaultValue));
  const isControlled = value !== void 0;
  const current = isControlled ? value : internal;
  function handleChange(event) {
    const next = clean(event.target.value);
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  }
  const hasError = Boolean(error) || invalid;
  const isDisabled = Boolean(disabled);
  return <Field label={label} hint={hint} error={error} htmlFor={inputId}>
      <div className="relative flex items-center">
        {startIcon ? <span className="pointer-events-none absolute left-3 flex text-[var(--muted)]">
            {startIcon}
          </span> : null}

        <input
    id={inputId}
    value={current}
    onChange={handleChange}
    disabled={isDisabled}
    aria-invalid={hasError || void 0}
    aria-describedby={error ? `${inputId}-error` : void 0}
    maxLength={maxLength}
    className={fieldClasses(hasError, size, [
      startIcon ? "pl-10" : "",
      endIcon || clearable ? "pr-10" : "",
      className
    ].join(" "))}
    {...props}
  />

        {clearable && current && !isDisabled ? <button
    type="button"
    aria-label="Clear"
    onClick={() => {
      if (!isControlled) setInternal("");
      onValueChange?.("");
    }}
    className="absolute right-3 flex size-5 items-center justify-center rounded-full text-[var(--muted)] transition-colors hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
  >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="size-3.5" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button> : endIcon ? <span className="absolute right-3 flex text-[var(--muted)]">{endIcon}</span> : null}
      </div>

      {showCount && typeof maxLength === "number" ? <p className="text-right text-[11px] tabular-nums text-[var(--muted)]">
          {current.length} / {maxLength}
        </p> : null}
    </Field>;
}
var stdin_default = TextInput;
export {
  TextInput,
  stdin_default as default
};
