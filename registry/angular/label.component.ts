import { Component, input } from '@angular/core';

@Component({
  selector: 'uif-label',
  standalone: true,
  template: `
    <label
      [attr.for]="for() || null"
      class="flex items-center justify-between gap-3 text-sm font-medium text-[var(--foreground)]"
    >
      <span>
        <ng-content />
        @if (required()) {
          <span class="ml-1 text-[var(--danger)]" aria-hidden="true">*</span>
        }
      </span>
      @if (hint()) {
        <span class="text-xs font-normal text-[var(--muted)]">{{ hint() }}</span>
      }
    </label>
  `,
})
export class LabelComponent {
  readonly for = input('');
  readonly required = input(false);
  readonly hint = input('');
}
