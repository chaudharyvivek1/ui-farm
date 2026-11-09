/**
 * skeleton — JavaScript version.
 * Generated from the TypeScript source by scripts/build-snippets.mjs.
 */
const variants = {
  block: "h-4 w-full rounded-md",
  text: "h-3.5 w-3/4 rounded-md",
  circle: "size-10 rounded-full",
  card: "h-40 w-full rounded-2xl"
};
function Skeleton({
  variant = "block",
  className = "",
  ...props
}) {
  return <div
    aria-hidden="true"
    className={[
      "animate-pulse bg-[var(--surface-muted)]",
      variants[variant],
      className
    ].filter(Boolean).join(" ")}
    {...props}
  />;
}
function SkeletonText({ lines = 3 }) {
  return <div className="space-y-2.5" aria-hidden="true">
      {Array.from({ length: lines }).map((_, index) => <Skeleton
    key={index}
    variant="text"
    className={index === lines - 1 ? "w-1/2" : void 0}
  />)}
    </div>;
}
var stdin_default = Skeleton;
export {
  Skeleton,
  SkeletonText,
  stdin_default as default
};
