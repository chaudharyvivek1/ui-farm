/**
 * card — JavaScript version.
 * Generated from the TypeScript source by scripts/build-snippets.mjs.
 */
const surface = "rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm";
function Card({ interactive = false, className = "", ...props }) {
  return <div
    className={[
      surface,
      interactive ? "transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)]/40 hover:shadow-md" : "",
      className
    ].filter(Boolean).join(" ")}
    {...props}
  />;
}
function CardHeader({
  className = "",
  ...props
}) {
  return <div className={["mb-4 space-y-1.5", className].join(" ")} {...props} />;
}
function CardTitle({
  className = "",
  ...props
}) {
  return <h3
    className={["text-xl font-bold tracking-tight text-[var(--foreground)]", className].filter(Boolean).join(" ")}
    {...props}
  />;
}
function CardDescription({
  className = "",
  ...props
}) {
  return <p
    className={["text-sm leading-relaxed text-[var(--muted)]", className].filter(Boolean).join(" ")}
    {...props}
  />;
}
function CardContent({
  className = "",
  ...props
}) {
  return <div className={className} {...props} />;
}
function CardFooter({
  className = "",
  ...props
}) {
  return <div
    className={[
      "mt-6 flex items-center gap-3 border-t border-[var(--border)] pt-4",
      className
    ].filter(Boolean).join(" ")}
    {...props}
  />;
}
var stdin_default = Card;
export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  stdin_default as default
};
