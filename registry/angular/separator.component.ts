import { Component, input } from '@angular/core';

@Component({
  selector: 'uif-separator',
  standalone: true,
  template: `
    @if (orientation() === 'vertical') {
      <div role="separator" aria-orientation="vertical" class="h-full w-px shrink-0 bg-[var(--border)]"></div>
    } @else if (label()) {
      <div role="separator" class="flex items-center gap-3 text-xs uppercase tracking-wider text-[var(--muted)]">
        <span class="h-px flex-1 bg-[var(--border)]"></span>
        {{ label() }}
        <span class="h-px flex-1 bg-[var(--border)]"></span>
      </div>
    } @else {
      <div role="separator" aria-orientation="horizontal" class="h-px w-full bg-[var(--border)]"></div>
    }
  `,
})
export class SeparatorComponent {
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  /** Centred label, e.g. "or". */
  readonly label = input('');
}
