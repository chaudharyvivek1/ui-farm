import { Component, computed, input } from '@angular/core';

type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'uif-alert',
  standalone: true,
  template: `
    <div [class]="classes()" [attr.role]="variant() === 'danger' ? 'alert' : 'status'">
      @if (showIcon()) {
        <svg
          [class]="iconClasses()"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          @switch (variant()) {
            @case ('success') { <path d="M20 6 9 17l-5-5" /> }
            @case ('warning') { <path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" /> }
            @default { <path d="M12 16v-4M12 8h.01M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" /> }
          }
        </svg>
      }
      <div class="space-y-1"><ng-content /></div>
    </div>
  `,
})
export class AlertComponent {
  readonly variant = input<AlertVariant>('info');
  readonly showIcon = input(true);

  private readonly variants: Record<AlertVariant, string> = {
    info: 'border-[var(--primary)]/25 bg-[var(--primary)]/10 text-[var(--muted-foreground)]',
    success: 'border-[var(--success)]/25 bg-[var(--success)]/10 text-[var(--muted-foreground)]',
    warning: 'border-[var(--warning)]/25 bg-[var(--warning)]/10 text-[var(--muted-foreground)]',
    danger: 'border-[var(--danger)]/25 bg-[var(--danger)]/10 text-[var(--muted-foreground)]',
  };

  private readonly titleTone: Record<AlertVariant, string> = {
    info: 'text-[var(--primary)]',
    success: 'text-[var(--success)]',
    warning: 'text-[var(--warning)]',
    danger: 'text-[var(--danger)]',
  };

  readonly classes = computed(() =>
    ['relative flex gap-3 rounded-xl border p-4 text-sm leading-relaxed', this.variants[this.variant()]].join(' '),
  );

  readonly iconClasses = computed(() =>
    ['mt-0.5 size-5 shrink-0', this.titleTone[this.variant()]].join(' '),
  );
}

@Component({
  selector: 'uif-alert-title',
  standalone: true,
  template: `<p class="font-semibold text-[var(--foreground)]"><ng-content /></p>`,
})
export class AlertTitleComponent {}

@Component({
  selector: 'uif-alert-description',
  standalone: true,
  template: `<p class="text-[var(--muted)]"><ng-content /></p>`,
})
export class AlertDescriptionComponent {}
