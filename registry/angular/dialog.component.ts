import { Component, HostListener, input, model } from '@angular/core';

@Component({
  selector: 'uif-dialog',
  standalone: true,
  template: `
    @if (open()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          class="absolute inset-0 bg-black/60 backdrop-blur-sm"
          aria-hidden="true"
          (click)="close()"
        ></div>

        <div
          role="dialog"
          aria-modal="true"
          [attr.aria-labelledby]="title() ? 'uif-dialog-title' : null"
          class="relative z-10 w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-lg"
        >
          <button
            type="button"
            aria-label="Close dialog"
            class="absolute right-4 top-4 rounded-full p-1.5 text-[var(--muted)] transition-colors hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
            (click)="close()"
          >
            <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          @if (title()) {
            <h2 id="uif-dialog-title" class="mb-1.5 pr-8 text-xl font-bold tracking-tight">{{ title() }}</h2>
          }
          @if (description()) {
            <p class="mb-4 text-sm leading-relaxed text-[var(--muted)]">{{ description() }}</p>
          }

          <ng-content />

          <div class="mt-6 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-full border-2 border-[var(--border)] px-6 py-3 text-base font-medium text-[var(--foreground)] transition-all hover:bg-[var(--surface-muted)]"
              (click)="close()"
            >
              Cancel
            </button>
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-6 py-3 text-base font-medium text-[var(--primary-foreground)] shadow-md transition-all hover:bg-blue-600"
              (click)="confirmed.emit(); close()"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class DialogComponent {
  /** Two-way bindable: [(open)]="isOpen". */
  readonly open = model(false);
  readonly title = input('');
  readonly description = input('');
  readonly confirmed = input<unknown>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open()) this.close();
  }

  close(): void {
    this.open.set(false);
  }
}
