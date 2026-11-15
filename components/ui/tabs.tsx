'use client';

import * as React from 'react';

type TabsContextValue = {
  value: string;
  setValue: (value: string) => void;
  baseId: string;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function Tabs({
  defaultValue,
  value,
  onValueChange,
  className = '',
  children,
  ...props
}: TabsProps) {
  const [internal, setInternal] = React.useState(defaultValue);
  const baseId = React.useId();
  const isControlled = value !== undefined;
  const active = isControlled ? value : internal;

  function setValue(next: string) {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  }

  return (
    <TabsContext.Provider value={{ value: active, setValue, baseId }}>
      <div className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({
  className = '',
  onKeyDown,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const listRef = React.useRef<HTMLDivElement>(null);

  // Triggers use a roving tabindex, so arrow keys are the only way to reach
  // the inactive tabs. Without this they were unreachable by keyboard.
  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
    if (!keys.includes(event.key)) return;

    const tabs = Array.from(
      listRef.current?.querySelectorAll<HTMLElement>('[role="tab"]:not([disabled])') ?? [],
    );
    if (tabs.length === 0) return;

    const index = tabs.indexOf(document.activeElement as HTMLElement);
    const from = index < 0 ? 0 : index;
    let next = from;

    if (event.key === 'ArrowRight') next = (from + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (from - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;

    event.preventDefault();
    tabs[next].focus();
    tabs[next].click();
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-orientation="horizontal"
      onKeyDown={handleKeyDown}
      className={[
        'inline-flex flex-wrap items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] p-1',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
}

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export function TabsTrigger({
  value,
  className = '',
  children,
  ...props
}: TabsTriggerProps) {
  const context = React.useContext(TabsContext);
  const isActive = context?.value === value;

  return (
    <button
      type="button"
      role="tab"
      id={`tab-${context?.baseId}-${value}`}
      aria-selected={isActive}
      aria-controls={`panel-${context?.baseId}-${value}`}
      tabIndex={isActive ? 0 : -1}
      onClick={() => context?.setValue(value)}
      className={[
        'rounded-full px-4 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/50',
        isActive
          ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm'
          : 'text-[var(--muted)] hover:text-[var(--foreground)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabsContent({
  value,
  className = '',
  children,
  ...props
}: TabsContentProps) {
  const context = React.useContext(TabsContext);
  if (context?.value !== value) return null;

  return (
    <div
      role="tabpanel"
      id={`panel-${context?.baseId}-${value}`}
      aria-labelledby={`tab-${context?.baseId}-${value}`}
      tabIndex={0}
      className={['focus-visible:outline-none', className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}

export default Tabs;
