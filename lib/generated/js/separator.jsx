/**
 * separator — JavaScript version.
 * Generated from the TypeScript source by scripts/build-snippets.mjs.
 */
function Separator({
  orientation = "horizontal",
  label,
  className = "",
  ...props
}) {
  if (orientation === "vertical") {
    return <div
      role="separator"
      aria-orientation="vertical"
      className={["h-full w-px shrink-0 bg-[var(--border)]", className].filter(Boolean).join(" ")}
      {...props}
    />;
  }
  if (label) {
    return <div
      role="separator"
      className={["flex items-center gap-3 text-xs uppercase tracking-wider text-[var(--muted)]", className].filter(Boolean).join(" ")}
      {...props}
    >
        <span className="h-px flex-1 bg-[var(--border)]" />
        {label}
        <span className="h-px flex-1 bg-[var(--border)]" />
      </div>;
  }
  return <div
    role="separator"
    aria-orientation="horizontal"
    className={["h-px w-full bg-[var(--border)]", className].filter(Boolean).join(" ")}
    {...props}
  />;
}
var stdin_default = Separator;
export {
  Separator,
  stdin_default as default
};
