/**
 * tooltip — JavaScript version.
 * Generated from the TypeScript source by scripts/build-snippets.mjs.
 */
const positions = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2"
};
function Tooltip({ label, side = "top", children, className = "" }) {
  return <span className={["group relative inline-flex", className].filter(Boolean).join(" ")}>
      {children}
      <span
    role="tooltip"
    className={[
      "pointer-events-none absolute z-40 w-max max-w-64 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] px-2.5 py-1.5 text-xs font-medium text-[var(--foreground)] opacity-0 shadow-md transition-opacity duration-150",
      "group-hover:opacity-100 group-focus-within:opacity-100",
      positions[side]
    ].join(" ")}
  >
        {label}
      </span>
    </span>;
}
var stdin_default = Tooltip;
export {
  Tooltip,
  stdin_default as default
};
