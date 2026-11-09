/**
 * progress — JavaScript version.
 * Generated from the TypeScript source by scripts/build-snippets.mjs.
 */
const tones = {
  primary: "bg-[var(--primary)]",
  accent: "bg-[var(--accent)]",
  success: "bg-[var(--success)]",
  warning: "bg-[var(--warning)]",
  danger: "bg-[var(--danger)]"
};
function Progress({
  value,
  max = 100,
  tone = "primary",
  showValue = false,
  label,
  size = "md",
  className = "",
  ...props
}) {
  const percent = Math.min(100, Math.max(0, value / max * 100));
  return <div className={className} {...props}>
      {showValue || label ? <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-[var(--muted)]">
          <span>{label}</span>
          {showValue ? <span>{Math.round(percent)}%</span> : null}
        </div> : null}

      <div
    role="progressbar"
    aria-valuenow={value}
    aria-valuemin={0}
    aria-valuemax={max}
    aria-label={label ?? "Progress"}
    className={[
      "w-full overflow-hidden rounded-full bg-[var(--surface-muted)]",
      size === "sm" ? "h-1.5" : "h-2.5"
    ].join(" ")}
  >
        <div
    className={["h-full rounded-full transition-[width] duration-500 ease-out", tones[tone]].join(" ")}
    style={{ width: `${percent}%` }}
  />
      </div>
    </div>;
}
var stdin_default = Progress;
export {
  Progress,
  stdin_default as default
};
