/**
 * alert — JavaScript version.
 * Generated from the TypeScript source by scripts/build-snippets.mjs.
 */
const base = "relative flex gap-3 rounded-xl border p-4 text-sm leading-relaxed";
const variants = {
  info: "border-[var(--primary)]/25 bg-[var(--primary)]/10 text-[var(--muted-foreground)]",
  success: "border-[var(--success)]/25 bg-[var(--success)]/10 text-[var(--muted-foreground)]",
  warning: "border-[var(--warning)]/25 bg-[var(--warning)]/10 text-[var(--muted-foreground)]",
  danger: "border-[var(--danger)]/25 bg-[var(--danger)]/10 text-[var(--muted-foreground)]"
};
const titleTone = {
  info: "text-[var(--primary)]",
  success: "text-[var(--success)]",
  warning: "text-[var(--warning)]",
  danger: "text-[var(--danger)]"
};
const icons = {
  info: <path d="M12 16v-4M12 8h.01M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />,
  success: <path d="M20 6 9 17l-5-5" />,
  warning: <path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />,
  danger: <path d="M12 9v4M12 17h.01M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />
};
function Alert({
  variant = "info",
  icon = true,
  className = "",
  children,
  ...props
}) {
  return <div
    role={variant === "danger" ? "alert" : "status"}
    className={[base, variants[variant], className].filter(Boolean).join(" ")}
    {...props}
  >
      {icon ? <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={["mt-0.5 size-5 shrink-0", titleTone[variant]].join(" ")}
  >
          {icons[variant]}
        </svg> : null}
      <div className="space-y-1">{children}</div>
    </div>;
}
function AlertTitle({
  className = "",
  ...props
}) {
  return <p
    className={["font-semibold text-[var(--foreground)]", className].filter(Boolean).join(" ")}
    {...props}
  />;
}
function AlertDescription({
  className = "",
  ...props
}) {
  return <p
    className={["text-[var(--muted)]", className].filter(Boolean).join(" ")}
    {...props}
  />;
}
var stdin_default = Alert;
export {
  Alert,
  AlertDescription,
  AlertTitle,
  stdin_default as default
};
