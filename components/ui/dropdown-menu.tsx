'use client';

import * as React from 'react';

export type DropdownItem = {
  label: string;
  onClick?: () => void;
  href?: string;
  icon?: React.ReactNode;
  /** Red text, for delete and other irreversible actions. */
  danger?: boolean;
  disabled?: boolean;
  /** Renders a divider above this item. */
  separatorBefore?: boolean;
  /** Shortcut hint on the right, e.g. "⌘K". */
  shortcut?: string;
};

export type DropdownSection = {
  heading?: string;
  items: DropdownItem[];
};

export interface DropdownMenuProps {
  /** The element that opens the menu. Receives the click handler and ARIA. */
  trigger: React.ReactElement<{
    onClick?: React.MouseEventHandler;
    'aria-haspopup'?: string;
    'aria-expanded'?: boolean;
  }>;
  /** A flat list, or grouped sections with headings. */
  items?: DropdownItem[];
  sections?: DropdownSection[];
  align?: 'start' | 'end';
  /** Menu width, e.g. "w-56". */
  width?: string;
  className?: string;
}

/**
 * Action menu with keyboard support: Escape closes, arrow keys move between
 * items, and a click outside closes it. Items can be links, plain actions or
 * destructive actions.
 */
export function DropdownMenu({
  trigger,
  items = [],
  sections,
  align = 'end',
  width = 'w-52',
  className = '',
}: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const groups: DropdownSection[] = sections ?? [{ items }];

  React.useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
      event.preventDefault();
      const focusable = Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])') ?? [],
      );
      if (focusable.length === 0) return;
      const index = focusable.indexOf(document.activeElement as HTMLElement);
      const next =
        event.key === 'ArrowDown'
          ? focusable[(index + 1) % focusable.length]
          : focusable[(index - 1 + focusable.length) % focusable.length];
      next.focus();
    }

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const first = menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]');
    first?.focus();
  }, [open]);

  const triggerNode = React.cloneElement(trigger, {
    onClick: (event: React.MouseEvent) => {
      trigger.props.onClick?.(event);
      setOpen((state) => !state);
    },
    'aria-haspopup': 'menu',
    'aria-expanded': open,
  });

  const itemClass = (item: DropdownItem) =>
    [
      'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors',
      item.disabled
        ? 'cursor-not-allowed text-[var(--muted)]/50'
        : item.danger
          ? 'text-[var(--danger)] hover:bg-[var(--danger)]/10'
          : 'text-[var(--foreground)] hover:bg-[var(--surface-muted)]',
    ].join(' ');

  return (
    <div ref={rootRef} className={['relative inline-flex', className].filter(Boolean).join(' ')}>
      {triggerNode}

      {open ? (
        <div
          ref={menuRef}
          role="menu"
          className={[
            'absolute top-full z-40 mt-2 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1.5 shadow-lg',
            width,
            align === 'end' ? 'right-0' : 'left-0',
          ].join(' ')}
        >
          {groups.map((group, groupIndex) => (
            <div key={group.heading ?? groupIndex}>
              {group.heading ? (
                <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">
                  {group.heading}
                </p>
              ) : null}

              {group.items.map((item, index) => {
                const content = (
                  <>
                    {item.icon ? <span className="flex shrink-0">{item.icon}</span> : null}
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.shortcut ? (
                      <span className="font-mono text-[11px] text-[var(--muted)]">{item.shortcut}</span>
                    ) : null}
                  </>
                );

                const key = `${group.heading ?? groupIndex}-${item.label}-${index}`;

                return (
                  <React.Fragment key={key}>
                    {item.separatorBefore ? (
                      <div className="my-1 h-px bg-[var(--border)]" role="separator" />
                    ) : null}

                    {item.href && !item.disabled ? (
                      <a
                        role="menuitem"
                        href={item.href}
                        className={itemClass(item)}
                        onClick={() => setOpen(false)}
                      >
                        {content}
                      </a>
                    ) : (
                      <button
                        type="button"
                        role="menuitem"
                        disabled={item.disabled}
                        aria-disabled={item.disabled || undefined}
                        className={itemClass(item)}
                        onClick={() => {
                          if (item.disabled) return;
                          item.onClick?.();
                          setOpen(false);
                        }}
                      >
                        {content}
                      </button>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default DropdownMenu;
