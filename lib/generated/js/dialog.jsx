/**
 * dialog — JavaScript version.
 * Generated from the TypeScript source by scripts/build-snippets.mjs.
 */
"use client";
import * as React from "react";
const DialogContext = React.createContext(null);
function Dialog({
  open,
  defaultOpen = false,
  onOpenChange,
  children
}) {
  const [internal, setInternal] = React.useState(defaultOpen);
  const titleId = React.useId();
  const isControlled = open !== void 0;
  const isOpen = isControlled ? open : internal;
  function setOpen(next) {
    if (!isControlled) setInternal(next);
    onOpenChange?.(next);
  }
  React.useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);
  return <DialogContext.Provider value={{ open: isOpen, setOpen, titleId }}>
      {children}
    </DialogContext.Provider>;
}
function DialogTrigger({
  className = "",
  children,
  ...props
}) {
  const context = React.useContext(DialogContext);
  return <button
    type="button"
    onClick={() => context?.setOpen(true)}
    className={className}
    {...props}
  >
      {children}
    </button>;
}
function DialogContent({
  dismissOnBackdrop = true,
  className = "",
  children,
  ...props
}) {
  const context = React.useContext(DialogContext);
  const panelRef = React.useRef(null);
  const open = context?.open ?? false;
  React.useEffect(() => {
    if (!open) return;
    function onKeyDown(event) {
      if (event.key === "Escape") context?.setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, context]);
  if (!open) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
    aria-hidden="true"
    onClick={() => dismissOnBackdrop && context?.setOpen(false)}
    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
  />
      <div
    ref={panelRef}
    role="dialog"
    aria-modal="true"
    aria-labelledby={context?.titleId}
    tabIndex={-1}
    className={[
      "relative z-10 w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-lg focus:outline-none",
      className
    ].filter(Boolean).join(" ")}
    {...props}
  >
        <button
    type="button"
    onClick={() => context?.setOpen(false)}
    aria-label="Close dialog"
    className="absolute right-4 top-4 rounded-full p-1.5 text-[var(--muted)] transition-colors hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/50"
  >
          <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    className="size-4"
  >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>;
}
function DialogHeader({
  className = "",
  ...props
}) {
  return <div className={["mb-4 space-y-1.5 pr-8", className].join(" ")} {...props} />;
}
function DialogTitle({
  className = "",
  ...props
}) {
  const context = React.useContext(DialogContext);
  return <h2
    id={context?.titleId}
    className={["text-xl font-bold tracking-tight", className].filter(Boolean).join(" ")}
    {...props}
  />;
}
function DialogDescription({
  className = "",
  ...props
}) {
  return <p
    className={["text-sm leading-relaxed text-[var(--muted)]", className].filter(Boolean).join(" ")}
    {...props}
  />;
}
function DialogFooter({
  className = "",
  ...props
}) {
  return <div
    className={["mt-6 flex flex-wrap justify-end gap-3", className].filter(Boolean).join(" ")}
    {...props}
  />;
}
function DialogClose({
  className = "",
  children,
  ...props
}) {
  const context = React.useContext(DialogContext);
  return <button
    type="button"
    onClick={() => context?.setOpen(false)}
    className={className}
    {...props}
  >
      {children}
    </button>;
}
var stdin_default = Dialog;
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  stdin_default as default
};
