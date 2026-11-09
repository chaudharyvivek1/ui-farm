import { Component, computed, input } from '@angular/core';

type Variant = 'block' | 'text' | 'circle' | 'card';

@Component({
  selector: 'uif-skeleton',
  standalone: true,
  template: `<div [class]="classes()" aria-hidden="true"></div>`,
})
export class SkeletonComponent {
  readonly variant = input<Variant>('block');

  private readonly variants: Record<Variant, string> = {
    block: 'h-4 w-full rounded-md',
    text: 'h-3.5 w-3/4 rounded-md',
    circle: 'size-10 rounded-full',
    card: 'h-40 w-full rounded-2xl',
  };

  readonly classes = computed(() =>
    ['animate-pulse bg-[var(--surface-muted)]', this.variants[this.variant()]].join(' '),
  );
}
