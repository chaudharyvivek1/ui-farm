import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'uif-card',
  standalone: true,
  template: `<div [class]="classes()"><ng-content /></div>`,
})
export class CardComponent {
  /** Adds a hover lift — use for cards that link somewhere. */
  readonly interactive = input(false);

  readonly classes = computed(() =>
    [
      'rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm p-6',
      this.interactive()
        ? 'transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)]/40 hover:shadow-md'
        : '',
    ]
      .filter(Boolean)
      .join(' '),
  );
}

@Component({
  selector: 'uif-card-header',
  standalone: true,
  template: `<div class="mb-4 space-y-1.5"><ng-content /></div>`,
})
export class CardHeaderComponent {}

@Component({
  selector: 'uif-card-title',
  standalone: true,
  template: `<h3 class="text-xl font-bold tracking-tight text-[var(--foreground)]"><ng-content /></h3>`,
})
export class CardTitleComponent {}

@Component({
  selector: 'uif-card-description',
  standalone: true,
  template: `<p class="text-sm leading-relaxed text-[var(--muted)]"><ng-content /></p>`,
})
export class CardDescriptionComponent {}

@Component({
  selector: 'uif-card-footer',
  standalone: true,
  template: `<div class="mt-6 flex items-center gap-3 border-t border-[var(--border)] pt-4"><ng-content /></div>`,
})
export class CardFooterComponent {}
