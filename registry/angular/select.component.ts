import { Component, computed, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

@Component({
  selector: 'uif-select',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  template: `
    <div class="relative">
      <select
        [class]="classes()"
        [value]="value()"
        [disabled]="isDisabled()"
        [attr.aria-invalid]="invalid() || null"
        (change)="onSelect($event)"
        (blur)="onTouched()"
      >
        @if (placeholder()) {
          <option value="">{{ placeholder() }}</option>
        }
        @for (option of options(); track option.value) {
          <option [value]="option.value" [disabled]="!!option.disabled">
            {{ option.label }}
          </option>
        }
      </select>

      <svg
        class="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[var(--muted)]"
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
    </div>
  `,
})
export class SelectComponent implements ControlValueAccessor {
  readonly options = input<SelectOption[]>([]);
  readonly placeholder = input('');
  readonly invalid = input(false);

  readonly value = signal('');
  readonly isDisabled = signal(false);

  private onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  readonly classes = computed(() =>
    [
      'w-full appearance-none rounded-xl border bg-[var(--surface)] px-4 py-2.5 pr-10 text-sm text-[var(--foreground)] transition-colors focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60',
      this.invalid()
        ? 'border-[var(--danger)]/60 focus:border-[var(--danger)] focus:ring-[var(--danger)]/30'
        : 'border-[var(--border)] focus:border-[var(--primary)] focus:ring-[var(--primary)]/30',
    ].join(' '),
  );

  onSelect(event: Event): void {
    const next = (event.target as HTMLSelectElement).value;
    this.value.set(next);
    this.onChange(next);
  }

  writeValue(value: string | null): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }
}
