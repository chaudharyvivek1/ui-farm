/**
 * select — JavaScript version.
 * Generated from the TypeScript source by scripts/build-snippets.mjs.
 */
function Select({
  options = [],
  invalid = false,
  placeholder,
  className = "",
  children,
  ...props
}) {
  const tone = invalid ? "border-[var(--danger)]/60 focus:border-[var(--danger)] focus:ring-[var(--danger)]/30" : "border-[var(--border)] focus:border-[var(--primary)] focus:ring-[var(--primary)]/30";
  return <div className="relative">
      <select
    aria-invalid={invalid || void 0}
    className={[
      "w-full appearance-none rounded-xl border bg-[var(--surface)] px-4 py-2.5 pr-10 text-sm text-[var(--foreground)] transition-colors focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60",
      tone,
      className
    ].filter(Boolean).join(" ")}
    {...props}
  >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => <option
    key={option.value}
    value={option.value}
    disabled={option.disabled}
  >
            {option.label}
          </option>)}
        {children}
      </select>

      <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[var(--muted)]"
  >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>;
}
var stdin_default = Select;
export {
  Select,
  stdin_default as default
};
