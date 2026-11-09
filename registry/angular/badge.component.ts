import { Component, computed, input } from '@angular/core';

type BadgeVariant =
  | 'default'
  | 'primary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'outline';

@Component({
  selector: 'uif-badge',
  standalone: true,
  template: `
    <span [class]="classes()">
      @if (dot()) {
        <span class="size-1.5 rounded-full bg-current" aria-hidden="true"></span>
      }
      <ng-content />
    </span>
  `,
})
export class BadgeComponent {
  readonly variant = input<BadgeVariant>('default');
  readonly dot = input(false);

  private readonly base =
    'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold leading-5';

  private readonly variants: Record<BadgeVariant, string> = {
    default: 'border-[var(--border)] bg-[var(--surface-muted)] text-[var(--foreground)]',
    primary: 'border-[var(--primary)]/25 bg-[var(--primary)]/12 text-[var(--primary)]',
    accent: 'border-[var(--accent)]/25 bg-[var(--accent)]/12 text-[var(--accent)]',
    success: 'border-[var(--success)]/25 bg-[var(--success)]/12 text-[var(--success)]',
    warning: 'border-[var(--warning)]/25 bg-[var(--warning)]/12 text-[var(--warning)]',
    danger: 'border-[var(--danger)]/25 bg-[var(--danger)]/12 text-[var(--danger)]',
    outline: 'border-[var(--border)] bg-transparent text-[var(--muted-foreground)]',
  };

  readonly classes = computed(() =>
    [this.base, this.variants[this.variant()]].join(' '),
  );
}
