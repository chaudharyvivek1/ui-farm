import { Component, computed, input, model } from '@angular/core';

export interface AccordionItem {
  title: string;
  subtitle?: string;
  content: string;
  disabled?: boolean;
}

@Component({
  selector: 'uif-accordion',
  standalone: true,
  template: `
    <div class="divide-y divide-[var(--border)] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      @for (item of items(); track item.title; let index = $index) {
        <div>
          <button
            type="button"
            class="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[var(--surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--primary)]/50 disabled:cursor-not-allowed disabled:opacity-50"
            [disabled]="!!item.disabled"
            [attr.aria-expanded]="isOpen(index)"
            [attr.aria-controls]="'panel-' + index"
            (click)="toggle(index)"
          >
            <span class="space-y-1">
              <span class="block font-semibold text-[var(--foreground)]">{{ item.title }}</span>
              @if (item.subtitle) {
                <span class="block text-sm text-[var(--muted)]">{{ item.subtitle }}</span>
              }
            </span>
            <svg
              class="size-5 shrink-0 text-[var(--muted)] transition-transform duration-200"
              [class.rotate-180]="isOpen(index)"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          @if (isOpen(index)) {
            <div
              [id]="'panel-' + index"
              role="region"
              class="border-t border-[var(--border)]/60 bg-[var(--surface-muted)]/30 px-6 py-5 text-sm leading-relaxed text-[var(--muted)]"
            >
              {{ item.content }}
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class AccordionComponent {
  readonly items = input<AccordionItem[]>([]);
  /** "single" closes the open panel when another opens. */
  readonly type = input<'single' | 'multiple'>('single');
  /** Indices that are open. Two-way bindable: [(openIndices)]="open". */
  readonly openIndices = model<number[]>([]);

  isOpen(index: number): boolean {
    return this.openIndices().includes(index);
  }

  toggle(index: number): void {
    const open = this.openIndices();
    if (open.includes(index)) {
      this.openIndices.set(open.filter((entry) => entry !== index));
      return;
    }
    this.openIndices.set(this.type() === 'single' ? [index] : [...open, index]);
  }
}
