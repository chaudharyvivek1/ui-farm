import { Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const onlyDigits = (value: string) => value.replace(/\D+/g, '');

const formatPhoneIN = (value: string) => {
  const digits = onlyDigits(value).slice(0, 10);
  return digits.length <= 5 ? digits : `${digits.slice(0, 5)} ${digits.slice(5)}`;
};

@Component({
  selector: 'uif-phone-input',
  standalone: true,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PhoneInputComponent), multi: true },
  ],
  template: `
    <div class="space-y-2">
      @if (label()) {
        <label [attr.for]="inputId" class="text-sm font-medium text-[var(--foreground)]">{{ label() }}</label>
      }

      <div class="flex items-stretch">
        <span class="flex select-none items-center rounded-l-xl border border-r-0 border-[var(--border)] bg-[var(--surface-muted)] px-3 text-sm text-[var(--muted)]">
          {{ countryCode() }}
        </span>
        <input
          [id]="inputId"
          type="tel"
          inputmode="numeric"
          [value]="formatted()"
          [attr.placeholder]="placeholder()"
          [disabled]="isDisabled()"
          class="w-full rounded-r-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm tabular-nums text-[var(--foreground)] placeholder:text-[var(--muted)]/70 focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 disabled:opacity-60"
          (input)="onInput($event)"
          (blur)="onTouched()"
        />
      </div>

      @if (error()) {
        <p class="text-xs text-[var(--danger)]" role="alert">{{ error() }}</p>
      } @else if (hint()) {
        <p class="text-xs text-[var(--muted)]">{{ hint() }}</p>
      }
    </div>
  `,
})
export class PhoneInputComponent implements ControlValueAccessor {
  readonly label = input('');
  readonly hint = input('');
  readonly error = input('');
  readonly placeholder = input('98765 43210');
  readonly countryCode = input('+91');

  readonly digits = signal('');
  readonly isDisabled = signal(false);
  readonly inputId = `uif-phone-${Math.random().toString(36).slice(2, 9)}`;

  private onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  formatted(): string {
    return formatPhoneIN(this.digits());
  }

  onInput(event: Event): void {
    const next = onlyDigits((event.target as HTMLInputElement).value).slice(0, 10);
    this.digits.set(next);
    this.onChange(next);
  }

  writeValue(value: string | null): void { this.digits.set(onlyDigits(value ?? '').slice(0, 10)); }
  registerOnChange(fn: (value: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.isDisabled.set(isDisabled); }
}
