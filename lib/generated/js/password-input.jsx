/**
 * password-input — JavaScript version.
 * Generated from the TypeScript source by scripts/build-snippets.mjs.
 */
"use client";
import * as React from "react";
import { Field, fieldClasses } from "./field";
const levels = [
  { label: "Too short", tone: "bg-[var(--danger)]", width: "w-1/4" },
  { label: "Weak", tone: "bg-[var(--danger)]", width: "w-1/3" },
  { label: "Fair", tone: "bg-[var(--warning)]", width: "w-2/4" },
  { label: "Good", tone: "bg-[var(--primary)]", width: "w-3/4" },
  { label: "Strong", tone: "bg-[var(--success)]", width: "w-full" }
];
function score(value) {
  if (!value) return 0;
  let points = 0;
  if (value.length >= 8) points += 1;
  if (value.length >= 12) points += 1;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) points += 1;
  if (/\d/.test(value)) points += 1;
  if (/[^A-Za-z0-9]/.test(value)) points += 1;
  return Math.min(points, 4);
}
function PasswordInput({
  label,
  hint,
  error,
  invalid = false,
  value,
  defaultValue = "",
  onValueChange,
  showStrength = false,
  placeholder = "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
  size = "md",
  disabled = false,
  id,
  className = "",
  name,
  required,
  autoComplete = "current-password"
}) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const [visible, setVisible] = React.useState(false);
  const [internal, setInternal] = React.useState(defaultValue);
  const isControlled = value !== void 0;
  const current = isControlled ? value : internal;
  const hasError = Boolean(error) || invalid;
  const strength = levels[score(current)];
  function handleChange(event) {
    if (!isControlled) setInternal(event.target.value);
    onValueChange?.(event.target.value);
  }
  return <Field label={label} hint={hint} error={error} htmlFor={inputId}>
      <div className="relative flex items-center">
        <input
    id={inputId}
    name={name}
    required={required}
    type={visible ? "text" : "password"}
    autoComplete={autoComplete}
    value={current}
    onChange={handleChange}
    disabled={disabled}
    placeholder={placeholder}
    aria-invalid={hasError || void 0}
    className={fieldClasses(hasError, size, ["pr-11", className].join(" "))}
  />
        <button
    type="button"
    onClick={() => setVisible((state) => !state)}
    aria-label={visible ? "Hide password" : "Show password"}
    aria-pressed={visible}
    disabled={disabled}
    className="absolute right-3 flex size-6 items-center justify-center rounded-md text-[var(--muted)] transition-colors hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
  >
          {visible ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
              <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg> : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
              <path d="M3 3l18 18M10.6 10.6a3 3 0 0 0 4.2 4.2M9.4 5.3A9.9 9.9 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-2.4 3.4M6.3 6.9A17 17 0 0 0 2 12s3.6 7 10 7a9.6 9.6 0 0 0 3.7-.7" />
            </svg>}
        </button>
      </div>

      {showStrength && current ? <div className="space-y-1.5">
          <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--surface-muted)]">
            <div className={`h-full rounded-full transition-all ${strength.tone} ${strength.width}`} />
          </div>
          <p className="text-[11px] text-[var(--muted)]">{strength.label}</p>
        </div> : null}
    </Field>;
}
var stdin_default = PasswordInput;
export {
  PasswordInput,
  stdin_default as default
};
