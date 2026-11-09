/**
 * table — JavaScript version.
 * Generated from the TypeScript source by scripts/build-snippets.mjs.
 */
function Table({
  className = "",
  ...props
}) {
  return <div className="w-full overflow-x-auto rounded-2xl border border-[var(--border)]">
      <table
    className={["w-full border-collapse text-left text-sm", className].filter(Boolean).join(" ")}
    {...props}
  />
    </div>;
}
function TableHeader({
  className = "",
  ...props
}) {
  return <thead
    className={["bg-[var(--surface-muted)]/60", className].filter(Boolean).join(" ")}
    {...props}
  />;
}
function TableBody({
  className = "",
  ...props
}) {
  return <tbody
    className={["divide-y divide-[var(--border)]", className].filter(Boolean).join(" ")}
    {...props}
  />;
}
function TableRow({
  className = "",
  ...props
}) {
  return <tr
    className={["transition-colors hover:bg-[var(--surface-muted)]/50", className].filter(Boolean).join(" ")}
    {...props}
  />;
}
function TableHead({
  className = "",
  ...props
}) {
  return <th
    className={[
      "whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]",
      className
    ].filter(Boolean).join(" ")}
    {...props}
  />;
}
function TableCell({
  className = "",
  ...props
}) {
  return <td
    className={["px-4 py-3.5 text-[var(--muted-foreground)]", className].filter(Boolean).join(" ")}
    {...props}
  />;
}
function TableCaption({
  className = "",
  ...props
}) {
  return <caption
    className={["px-4 py-3 text-left text-xs text-[var(--muted)]", className].filter(Boolean).join(" ")}
    {...props}
  />;
}
var stdin_default = Table;
export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  stdin_default as default
};
