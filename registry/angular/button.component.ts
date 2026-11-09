import { Component, computed, input, output } from '@angular/core';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'danger';
type Size = 'sm' | 'md' | 'lg';

@Component({
  selector: 'uif-button',
  standalone: true,
  template: `
    <button
      type="button"
      [class]="classes()"
      [disabled]="disabled() || loading()"
      [attr.aria-busy]="loading() || null"
      (click)="pressed.emit($event)"
    >
      @if (loading()) {
        <span
          class="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        ></span>
      }
      <ng-content />
    </button>
  `,
})
export class ButtonComponent {
  readonly variant = input<Variant>('primary');
  readonly size = input<Size>('md');
  readonly loading = input(false);
  readonly disabled = input(false);
  /** Extra utility classes appended last, so they win. */
  readonly extraClass = input('');
  readonly pressed = output<MouseEvent>();

  private readonly base =
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50';

  private readonly variants: Record<Variant, string> = {
    primary:
      'bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-blue-600 shadow-md shadow-[var(--primary)]/25',
    secondary:
      'bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-sky-600 shadow-md',
    outline:
      'border-2 border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--surface-muted)] hover:border-[var(--primary)]/40',
    ghost: 'text-[var(--foreground)] hover:bg-[var(--surface-muted)]',
    accent:
      'bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-teal-600 shadow-md',
    danger: 'bg-[var(--danger)] text-white hover:opacity-90 shadow-md',
  };

  private readonly sizes: Record<Size, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg font-bold',
  };

  readonly classes = computed(() =>
    [this.base, this.variants[this.variant()], this.sizes[this.size()], this.extraClass()]
      .filter(Boolean)
      .join(' '),
  );
}
