import { Component, input, model } from '@angular/core';

export interface TabItem {
  label: string;
  value: string;
}

@Component({
  selector: 'uif-tabs',
  standalone: true,
  template: `
    <div role="tablist" class="inline-flex flex-wrap items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] p-1">
      @for (tab of tabs(); track tab.value) {
        <button
          type="button"
          role="tab"
          [id]="'tab-' + tab.value"
          [attr.aria-selected]="active() === tab.value"
          [attr.aria-controls]="'panel-' + tab.value"
          [attr.tabindex]="active() === tab.value ? 0 : -1"
          (click)="active.set(tab.value)"
          [class]="triggerClasses(tab.value)"
        >
          {{ tab.label }}
        </button>
      }
    </div>

    <div
      role="tabpanel"
      [id]="'panel-' + active()"
      [attr.aria-labelledby]="'tab-' + active()"
      class="mt-4"
    >
      <ng-content />
    </div>
  `,
})
export class TabsComponent {
  readonly tabs = input<TabItem[]>([]);
  /** Two-way bindable: [(active)]="selectedTab". */
  readonly active = model('');

  triggerClasses(value: string): string {
    return [
      'rounded-full px-4 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/50',
      this.active() === value
        ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm'
        : 'text-[var(--muted)] hover:text-[var(--foreground)]',
    ].join(' ');
  }
}
