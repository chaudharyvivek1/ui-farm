/**
 * label — JavaScript version.
 * Generated from the TypeScript source by scripts/build-snippets.mjs.
 */
function Label({
  required = false,
  hint,
  className = "",
  children,
  ...props
}) {
  return <label
    className={[
      "flex items-center justify-between gap-3 text-sm font-medium text-[var(--foreground)]",
      className
    ].filter(Boolean).join(" ")}
    {...props}
  >
      <span>
        {children}
        {required ? <span aria-hidden="true" className="ml-1 text-[var(--danger)]">
            *
          </span> : null}
      </span>
      {hint ? <span className="text-xs font-normal text-[var(--muted)]">{hint}</span> : null}
    </label>;
}
var stdin_default = Label;
export {
  Label,
  stdin_default as default
};
