import type * as React from 'react';

/**
 * Arrow-key navigation for a `role="tablist"` whose tabs use a roving
 * tabindex: ArrowRight/ArrowLeft wrap around, Home/End jump to the ends, and
 * the tab that receives focus is also the one that opens. Without this, the
 * inactive tabs sit at `tabIndex={-1}` and cannot be reached at all.
 */
export function moveTabFocus(event: React.KeyboardEvent<HTMLElement>) {
  const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
  if (!keys.includes(event.key)) return;

  const tabs = Array.from(
    event.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]:not([disabled])'),
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
