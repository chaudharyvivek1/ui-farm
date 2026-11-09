/**
 * tabs — JavaScript version.
 * Generated from the TypeScript source by scripts/build-snippets.mjs.
 */
"use client";
import * as React from "react";
const TabsContext = React.createContext(null);
function Tabs({
  defaultValue,
  value,
  onValueChange,
  className = "",
  children,
  ...props
}) {
  const [internal, setInternal] = React.useState(defaultValue);
  const baseId = React.useId();
  const isControlled = value !== void 0;
  const active = isControlled ? value : internal;
  function setValue(next) {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  }
  return <TabsContext.Provider value={{ value: active, setValue, baseId }}>
      <div className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>;
}
function TabsList({
  className = "",
  ...props
}) {
  return <div
    role="tablist"
    className={[
      "inline-flex flex-wrap items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] p-1",
      className
    ].filter(Boolean).join(" ")}
    {...props}
  />;
}
function TabsTrigger({
  value,
  className = "",
  children,
  ...props
}) {
  const context = React.useContext(TabsContext);
  const isActive = context?.value === value;
  return <button
    type="button"
    role="tab"
    id={`tab-${context?.baseId}-${value}`}
    aria-selected={isActive}
    aria-controls={`panel-${context?.baseId}-${value}`}
    tabIndex={isActive ? 0 : -1}
    onClick={() => context?.setValue(value)}
    className={[
      "rounded-full px-4 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/50",
      isActive ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm" : "text-[var(--muted)] hover:text-[var(--foreground)]",
      className
    ].filter(Boolean).join(" ")}
    {...props}
  >
      {children}
    </button>;
}
function TabsContent({
  value,
  className = "",
  children,
  ...props
}) {
  const context = React.useContext(TabsContext);
  if (context?.value !== value) return null;
  return <div
    role="tabpanel"
    id={`panel-${context?.baseId}-${value}`}
    aria-labelledby={`tab-${context?.baseId}-${value}`}
    tabIndex={0}
    className={["focus-visible:outline-none", className].filter(Boolean).join(" ")}
    {...props}
  >
      {children}
    </div>;
}
var stdin_default = Tabs;
export {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  stdin_default as default
};
