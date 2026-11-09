/**
 * field — JavaScript version.
 * Generated from the TypeScript source by scripts/build-snippets.mjs.
 */
import { Label } from "./label";
const sizes = {
  sm: "px-3 py-1.5 text-[13px]",
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-base"
};
function fieldClasses(invalid = false, size = "md", extra = "") {
  return [
    "w-full rounded-xl border bg-[var(--surface)] text-[var(--foreground)] placeholder:text-[var(--muted)]/70 transition-colors focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60",
    sizes[size],
    invalid ? "border-[var(--danger)]/60 focus:border-[var(--danger)] focus:ring-[var(--danger)]/30" : "border-[var(--border)] focus:border-[var(--primary)] focus:ring-[var(--primary)]/30",
    extra
  ].filter(Boolean).join(" ");
}
function Field({
  label,
  hint,
  error,
  required = false,
  htmlFor,
  className = "",
  children
}) {
  const hasHeader = Boolean(label);
  const message = error ?? (hasHeader ? void 0 : hint);
  return <div className={["space-y-2", className].filter(Boolean).join(" ")}>
      {label ? <Label htmlFor={htmlFor} required={required} hint={hasHeader ? hint : void 0}>
          {label}
        </Label> : null}

      {children}

      {message ? <p
    className={[
      "text-xs leading-relaxed",
      error ? "text-[var(--danger)]" : "text-[var(--muted)]"
    ].join(" ")}
    role={error ? "alert" : void 0}
  >
          {message}
        </p> : null}
    </div>;
}
var stdin_default = Field;
export {
  Field,
  stdin_default as default,
  fieldClasses
};
