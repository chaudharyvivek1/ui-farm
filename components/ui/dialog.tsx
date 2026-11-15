'use client';

import * as React from 'react';

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

type DialogContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  titleId: string;
};

const DialogContext = React.createContext<DialogContextValue | null>(null);

export function Dialog({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: DialogProps) {
  const [internal, setInternal] = React.useState(defaultOpen);
  const titleId = React.useId();
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internal;

  // Stable identity: consumers put setOpen in effect dependencies, and a new
  // function on every render would re-run their effects (and steal focus).
  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setInternal(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const contextValue = React.useMemo(
    () => ({ open: isOpen, setOpen, titleId }),
    [isOpen, setOpen, titleId],
  );

  React.useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({
  className = '',
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(DialogContext);
  return (
    <button
      type="button"
      onClick={() => context?.setOpen(true)}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}

export interface DialogContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Clicking the backdrop closes the dialog (default true). */
  dismissOnBackdrop?: boolean;
}

export function DialogContent({
  dismissOnBackdrop = true,
  className = '',
  children,
  ...props
}: DialogContentProps) {
  const context = React.useContext(DialogContext);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const open = context?.open ?? false;
  const setOpen = context?.setOpen;

  // Escape closes, and Tab cycles inside the panel so focus cannot leave it.
  React.useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen?.(false);
        return;
      }

      if (event.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null || element === panel);

      if (focusable.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && (activeElement === first || activeElement === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, setOpen]);

  // Focus moves into the panel once, on open, and returns to the trigger on
  // close. It must not run on every render, or typing in a dialog field would
  // pull focus back to the panel after a single keystroke.
  React.useEffect(() => {
    if (!open) return;

    const previous = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();

    return () => {
      if (previous && typeof previous.focus === 'function') previous.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
          'relative z-10 w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-lg focus:outline-none',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
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
    </div>
  );
}

export function DialogHeader({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['mb-4 space-y-1.5 pr-8', className].join(' ')} {...props} />;
}

export function DialogTitle({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  const context = React.useContext(DialogContext);
  return (
    <h2
      id={context?.titleId}
      className={['text-xl font-bold tracking-tight', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
}

export function DialogDescription({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={['text-sm leading-relaxed text-[var(--muted)]', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
}

export function DialogFooter({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={['mt-6 flex flex-wrap justify-end gap-3', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
}

export function DialogClose({
  className = '',
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(DialogContext);
  return (
    <button
      type="button"
      onClick={() => context?.setOpen(false)}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}

export default Dialog;
