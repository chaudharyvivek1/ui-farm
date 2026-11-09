/**
 * button — JavaScript version.
 * Generated from the TypeScript source by scripts/build-snippets.mjs.
 */
const base = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50";
const variants = {
  primary: "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-blue-600 shadow-md shadow-[var(--primary)]/25",
  secondary: "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-sky-600 shadow-md",
  outline: "border-2 border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--surface-muted)] hover:border-[var(--primary)]/40",
  ghost: "text-[var(--foreground)] hover:bg-[var(--surface-muted)]",
  accent: "bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-teal-600 shadow-md",
  danger: "bg-[var(--danger)] text-white hover:opacity-90 shadow-md"
};
const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg font-bold"
};
function buttonStyles(variant = "primary", size = "md", className = "") {
  return [base, variants[variant], sizes[size], className].filter(Boolean).join(" ");
}
function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  children,
  disabled,
  ...props
}) {
  return <button
    className={buttonStyles(variant, size, className)}
    disabled={disabled || loading}
    aria-busy={loading || void 0}
    {...props}
  >
      {loading ? <span
    aria-hidden="true"
    className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
  /> : null}
      {children}
    </button>;
}
var stdin_default = Button;
export {
  Button,
  buttonStyles,
  stdin_default as default
};
