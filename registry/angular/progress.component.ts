import { Component, computed, input } from '@angular/core';

type Tone = 'primary' | 'accent' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'uif-progress',
  standalone: true,
  template: `
    @if (showValue() || label()) {
      <div class="mb-1.5 flex items-center justify-between text-xs font-medium text-[var(--muted)]">
        <span>{{ label() }}</span>
        @if (showValue()) {
          <span>{{ percent() }}%</span>
        }
      </div>
    }

    <div
      role="progressbar"
      [attr.aria-valuenow]="value()"
      [attr.aria-valuemin]="0"
      [attr.aria-valuemax]="max()"
      [attr.aria-label]="label() || 'Progress'"
      [class]="trackClasses()"
    >
      <div [class]="barClasses()" [style.width.%]="percent()"></div>
    </div>
  `,
})
export class ProgressComponent {
  readonly value = input.required<number>();
  readonly max = input(100);
  readonly tone = input<Tone>('primary');
  readonly showValue = input(false);
  readonly label = input('');
  readonly size = input<'sm' | 'md'>('md');

  private readonly tones: Record<Tone, string> = {
    primary: 'bg-[var(--primary)]',
    accent: 'bg-[var(--accent)]',
    success: 'bg-[var(--success)]',
    warning: 'bg-[var(--warning)]',
    danger: 'bg-[var(--danger)]',
  };

  readonly percent = computed(() =>
    Math.round(Math.min(100, Math.max(0, (this.value() / this.max()) * 100))),
  );

  readonly trackClasses = computed(
    () =>
      `w-full overflow-hidden rounded-full bg-[var(--surface-muted)] ${this.size() === 'sm' ? 'h-1.5' : 'h-2.5'}`,
  );

  readonly barClasses = computed(
    () => `h-full rounded-full transition-[width] duration-500 ease-out ${this.tones[this.tone()]}`,
  );
}
