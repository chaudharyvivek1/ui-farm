import { Component, ElementRef, HostListener, computed, input, signal, viewChild } from '@angular/core';

export interface DropdownItem {
  label: string;
  href?: string;
  danger?: boolean;
  disabled?: boolean;
  separatorBefore?: boolean;
}

@Component({
  selector: 'uif-dropdown-menu',
  standalone: true,
  template: `
    <div class="relative inline-flex">
      <button
        type="button"
        aria-haspopup="menu"
        [attr.aria-expanded]="open()"
        class="inline-flex size-8 items-center justify-center rounded-lg text-[var(--muted)] transition-colors hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
        (click)="toggle()"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" class="size-4" aria-hidden="true">
          <circle cx="12" cy="5" r="1.7" />
          <circle cx="12" cy="12" r="1.7" />
          <circle cx="12" cy="19" r="1.7" />
        </svg>
      </button>

      @if (open()) {
        <div
          #menu
          role="menu"
          [class]="'absolute top-full z-40 mt-2 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1.5 shadow-lg ' + width() + (align() === 'end' ? ' right-0' : ' left-0')"
        >
          @for (item of items(); track item.label) {
            @if (item.separatorBefore) {
              <div class="my-1 h-px bg-[var(--border)]" role="separator"></div>
            }
            @if (item.href && !item.disabled) {
              <a
                role="menuitem"
                [href]="item.href"
                [class]="itemClasses(item)"
                (click)="open.set(false)"
              >{{ item.label }}</a>
            } @else {
              <button
                type="button"
                role="menuitem"
                [disabled]="!!item.disabled"
                [class]="itemClasses(item)"
                (click)="choose(item)"
              >{{ item.label }}</button>
            }
          }
        </div>
      }
    </div>
  `,
})
export class DropdownMenuComponent {
  readonly items = input<DropdownItem[]>([]);
  readonly align = input<'start' | 'end'>('end');
  readonly width = input('w-44');
  readonly open = signal(false);

  readonly menu = viewChild<ElementRef<HTMLDivElement>>('menu');

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('uif-dropdown-menu')) this.open.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.open.set(false);
  }

  toggle(): void {
    this.open.set(!this.open());
    if (this.open()) {
      setTimeout(() => this.menu()?.nativeElement.querySelector<HTMLElement>('[role="menuitem"]')?.focus());
    }
  }

  choose(item: DropdownItem): void {
    if (item.disabled) return;
    this.open.set(false);
  }

  itemClasses(item: DropdownItem): string {
    return [
      'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors',
      item.disabled
        ? 'cursor-not-allowed text-[var(--muted)]/50'
        : item.danger
          ? 'text-[var(--danger)] hover:bg-[var(--danger)]/10'
          : 'text-[var(--foreground)] hover:bg-[var(--surface-muted)]',
    ].join(' ');
  }
}
