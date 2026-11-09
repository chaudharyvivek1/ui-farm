/**
 * number-input — JavaScript version.
 * Generated from the TypeScript source by scripts/build-snippets.mjs.
 */
"use client";
import * as React from "react";
import { Field, fieldClasses } from "./field";
import { clampNumber, formatIndianNumber, formatNumber, sanitizeNumber, toNumber } from "./input-utils";
function NumberInput({
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
  size = "md",
  disabled = false,
  id,
  className = "",
  name,
  required,
  onBlur
}) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const [text, setText] = React.useState(
    () => defaultValue === null || defaultValue === void 0 ? "" : String(defaultValue)
  );
  const [focused, setFocused] = React.useState(false);
  const isControlled = value !== void 0;
  React.useEffect(() => {
    if (!isControlled || focused) return;
    setText(value === null || value === void 0 ? "" : String(value));
  }, [value, isControlled, focused]);
  const numeric = toNumber(text, decimals);
  const hasError = Boolean(error) || invalid;
  function commit(next) {
    setText(next);
    onValueChange?.(toNumber(next, decimals));
  }
  function handleChange(event) {
    commit(sanitizeNumber(event.target.value, decimals, allowNegative));
  }
  function handleBlur() {
    setFocused(false);
    if (text === "" || text === "-") {
      setText("");
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
  function bump(direction) {
    if (disabled) return;
    const base = numeric ?? min ?? 0;
    const next = clampNumber(base + direction * step, min, max);
    const rounded = decimals > 0 ? next.toFixed(decimals) : String(Math.round(next));
    setText(rounded);
    onValueChange?.(toNumber(rounded, decimals));
  }
  function handleKeyDown(event) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      bump(1);
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      bump(-1);
    }
  }
  const display = (() => {
    if (text === "") return "";
    if (focused || !thousandSeparator) return text;
    return indianGrouping ? formatIndianNumber(text, decimals) : formatNumber(text, decimals);
  })();
  const stepperButton = "flex size-7 items-center justify-center rounded-md text-[var(--muted)] transition-colors hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)] disabled:pointer-events-none disabled:opacity-40";
  return <Field label={label} hint={hint} error={error} htmlFor={inputId}>
      <div className="relative flex items-center">
        {prefix ? <span className="pointer-events-none absolute left-3 text-sm text-[var(--muted)]">
            {prefix}
          </span> : null}

        <input
    id={inputId}
    name={name}
    required={required}
    inputMode={decimals > 0 ? "decimal" : "numeric"}
    autoComplete="off"
    value={display}
    onChange={handleChange}
    onFocus={() => setFocused(true)}
    onBlur={handleBlur}
    onKeyDown={handleKeyDown}
    disabled={disabled}
    placeholder={placeholder}
    aria-invalid={hasError || void 0}
    className={fieldClasses(hasError, size, [
      prefix ? "pl-8" : "",
      suffix || stepper ? "pr-20" : "",
      "tabular-nums",
      className
    ].join(" "))}
  />

        <div className="absolute right-2 flex items-center gap-1">
          {suffix ? <span className="text-sm text-[var(--muted)]">{suffix}</span> : null}

          {stepper ? <span className="flex flex-col gap-0.5">
              <button
    type="button"
    tabIndex={-1}
    aria-label="Increase"
    className={stepperButton}
    disabled={disabled || typeof max === "number" && (numeric ?? 0) >= max}
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
    disabled={disabled || typeof min === "number" && (numeric ?? 0) <= min}
    onClick={() => bump(-1)}
  >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" className="size-3.5" aria-hidden="true">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </span> : null}
        </div>
      </div>
    </Field>;
}
var stdin_default = NumberInput;
export {
  NumberInput,
  stdin_default as default
};
