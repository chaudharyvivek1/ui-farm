/**
 * accordion — JavaScript version.
 * Generated from the TypeScript source by scripts/build-snippets.mjs.
 */
"use client";
import * as React from "react";
const AccordionContext = React.createContext(null);
function Accordion({
  type = "single",
  defaultValue,
  value,
  onValueChange,
  className = "",
  children,
  ...props
}) {
  const toArray = (input) => input === void 0 ? [] : Array.isArray(input) ? input : [input];
  const [internal, setInternal] = React.useState(toArray(defaultValue));
  const isControlled = value !== void 0;
  const openItems = isControlled ? toArray(value) : internal;
  function toggle(itemValue) {
    const isOpen = openItems.includes(itemValue);
    let next;
    if (isOpen) {
      next = openItems.filter((entry) => entry !== itemValue);
    } else {
      next = type === "single" ? [itemValue] : [...openItems, itemValue];
    }
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  }
  return <AccordionContext.Provider value={{ openItems, toggle }}>
      <div
    className={[
      "divide-y divide-[var(--border)] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]",
      className
    ].filter(Boolean).join(" ")}
    {...props}
  >
        {children}
      </div>
    </AccordionContext.Provider>;
}
function AccordionItem({
  value,
  title,
  subtitle,
  disabled = false,
  className = "",
  children,
  ...props
}) {
  const context = React.useContext(AccordionContext);
  const panelId = React.useId();
  const itemValue = value ?? panelId;
  const isOpen = context?.openItems.includes(itemValue) ?? false;
  return <div className={className} {...props}>
      <button
    type="button"
    disabled={disabled}
    aria-expanded={isOpen}
    aria-controls={`panel-${panelId}`}
    onClick={() => context?.toggle(itemValue)}
    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[var(--surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--primary)]/50 disabled:cursor-not-allowed disabled:opacity-50"
  >
        <span className="space-y-1">
          <span className="block font-semibold text-[var(--foreground)]">
            {title}
          </span>
          {subtitle ? <span className="block text-sm text-[var(--muted)]">{subtitle}</span> : null}
        </span>
        <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={[
      "size-5 shrink-0 text-[var(--muted)] transition-transform duration-200",
      isOpen ? "rotate-180" : ""
    ].join(" ")}
  >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
    id={`panel-${panelId}`}
    role="region"
    hidden={!isOpen}
    className="border-t border-[var(--border)]/60 bg-[var(--surface-muted)]/30 px-6 py-5 text-sm leading-relaxed text-[var(--muted)]"
  >
        {children}
      </div>
    </div>;
}
var stdin_default = Accordion;
export {
  Accordion,
  AccordionItem,
  stdin_default as default
};
