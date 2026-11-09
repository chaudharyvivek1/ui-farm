import { Component, computed, forwardRef, input, model, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'uif-switch',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true,
    },
  ],
  template: `
    <div class="flex items-start gap-3">
      <button
        type="button"
        role="switch"
        [attr.aria-checked]="checked()"
        [attr.aria-label]="label() || null"
        [disabled]="isDisabled()"
        (click)="toggle()"
        [class]="trackClasses()"
      >
        <span aria-hidden="true" [class]="knobClasses()"></span>
      </button>

      @if (label() || description()) {
        <div class="space-y-0.5">
          @if (label()) {
            <p class="text-sm font-medium text-[var(--foreground)]">{{ label() }}</p>
          }
          @if (description()) {
            <p class="text-xs leading-relaxed text-[var(--muted)]">{{ description() }}</p>
          }
        </div>
      }
    </div>
  `,
})
export class SwitchComponent implements ControlValueAccessor {
  readonly label = input('');
  readonly description = input('');
  readonly size = input<'sm' | 'md'>('md');
  readonly checked = model(false);

  readonly isDisabled = signal(false);

  private onChange: (value: boolean) => void = () => {};
  onTouched: () => void = () => {};

  readonly trackClasses = computed(() =>
    [
      'relative inline-flex shrink-0 items-center rounded-full border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:cursor-not-allowed disabled:opacity-50',
      this.size() === 'sm' ? 'h-5 w-9' : 'h-6 w-11',
      this.checked()
        ? 'border-[var(--primary)] bg-[var(--primary)]'
        : 'border-[var(--border)] bg-[var(--surface-muted)]',
    ].join(' '),
  );

  readonly knobClasses = computed(() =>
    [
      'pointer-events-none ml-0.5 block rounded-full bg-white shadow-sm transition-transform duration-200',
      this.size() === 'sm' ? 'size-3.5' : 'size-4.5',
      this.checked() ? (this.size() === 'sm' ? 'translate-x-4' : 'translate-x-5') : 'translate-x-0',
    ].join(' '),
  );

  toggle(): void {
    const next = !this.checked();
    this.checked.set(next);
    this.onChange(next);
    this.onTouched();
  }

  writeValue(value: boolean | null): void {
    this.checked.set(Boolean(value));
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }
}
