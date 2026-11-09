import { Component, computed, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const clamp = (value: number, min?: number, max?: number) => {
  let next = value;
  if (typeof min === 'number') next = Math.max(min, next);
  if (typeof max === 'number') next = Math.min(max, next);
  return next;
};

const formatIndian = (value: number, decimals: number) => {
  const fixed = Math.abs(value).toFixed(decimals);
  const [whole, fraction] = fixed.split('.');
  let grouped = whole;
  if (whole.length > 3) {
    const last3 = whole.slice(-3);
    const rest = whole.slice(0, -3);
    grouped = `${rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',')},${last3}`;
  }
  const sign = value < 0 ? '-' : '';
  return fraction ? `${sign}${grouped}.${fraction}` : `${sign}${grouped}`;
};

const sanitize = (value: string, decimals: number, allowNegative: boolean) => {
  let cleaned = value.replace(decimals > 0 ? /[^\d.-]/g : /[^\d-]/g, '');
  if (allowNegative) {
    const negative = cleaned.startsWith('-');
    cleaned = (negative ? '-' : '') + cleaned.replace(/-/g, '');
  } else {
    cleaned = cleaned.replace(/-/g, '');
  }
  if (decimals > 0) {
    const [whole, ...rest] = cleaned.split('.');
    if (rest.length === 0) return whole;
    return `${whole}.${rest.join('').slice(0, decimals)}`;
  }
  return cleaned;
};

@Component({
  selector: 'uif-number-input',
  standalone: true,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NumberInputComponent), multi: true },
  ],
  template: `
    <div class="space-y-2">
      @if (label()) {
        <label [attr.for]="inputId" class="text-sm font-medium text-[var(--foreground)]">{{ label() }}</label>
      }

      <div class="relative flex items-center">
        @if (prefix()) {
          <span class="pointer-events-none absolute left-3 text-sm text-[var(--muted)]">{{ prefix() }}</span>
        }

        <input
          [id]="inputId"
          [class]="classes()"
          [value]="display()"
          [attr.placeholder]="placeholder()"
          [disabled]="isDisabled()"
          inputmode="decimal"
          (focus)="focused.set(true)"
          (input)="onInput($event)"
          (blur)="onBlur()"
          (keydown)="onKeyDown($event)"
        />

        <div class="absolute right-2 flex items-center gap-1">
          @if (suffix()) { <span class="text-sm text-[var(--muted)]">{{ suffix() }}</span> }
          @if (stepper()) {
            <span class="flex flex-col gap-0.5">
              <button type="button" tabindex="-1" aria-label="Increase" class="flex size-7 items-center justify-center rounded-md text-[var(--muted)] hover:bg-[var(--surface-muted)]" (click)="bump(1)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" class="size-3.5" aria-hidden="true"><path d="m6 15 6-6 6 6" /></svg>
              </button>
              <button type="button" tabindex="-1" aria-label="Decrease" class="flex size-7 items-center justify-center rounded-md text-[var(--muted)] hover:bg-[var(--surface-muted)]" (click)="bump(-1)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" class="size-3.5" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
              </button>
            </span>
          }
        </div>
      </div>

      @if (error()) {
        <p class="text-xs text-[var(--danger)]" role="alert">{{ error() }}</p>
      } @else if (hint()) {
        <p class="text-xs text-[var(--muted)]">{{ hint() }}</p>
      }
    </div>
  `,
})
export class NumberInputComponent implements ControlValueAccessor {
  readonly label = input('');
  readonly hint = input('');
  readonly error = input('');
  readonly placeholder = input('');
  readonly prefix = input('');
  readonly suffix = input('');
  readonly min = input<number>();
  readonly max = input<number>();
  readonly step = input(1);
  readonly decimals = input(0);
  readonly allowNegative = input(false);
  readonly thousandSeparator = input(false);
  readonly stepper = input(false);

  readonly text = signal('');
  readonly focused = signal(false);
  readonly isDisabled = signal(false);
  readonly inputId = `uif-number-${Math.random().toString(36).slice(2, 9)}`;

  private onChange: (value: number | null) => void = () => {};
  onTouched: () => void = () => {};

  readonly display = computed(() => {
    const value = this.text();
    if (!value) return '';
    if (this.focused() || !this.thousandSeparator()) return value;
    const parsed = Number.parseFloat(value);
    return Number.isNaN(parsed) ? value : formatIndian(parsed, this.decimals());
  });

  readonly classes = computed(() =>
    [
      'w-full rounded-xl border bg-[var(--surface)] px-4 py-2.5 text-sm tabular-nums text-[var(--foreground)] placeholder:text-[var(--muted)]/70 transition-colors focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60',
      this.error()
        ? 'border-[var(--danger)]/60 focus:border-[var(--danger)] focus:ring-[var(--danger)]/30'
        : 'border-[var(--border)] focus:border-[var(--primary)] focus:ring-[var(--primary)]/30',
      this.prefix() ? 'pl-8' : '',
      this.suffix() || this.stepper() ? 'pr-20' : '',
    ].join(' '),
  );

  onInput(event: Event): void {
    const next = sanitize((event.target as HTMLInputElement).value, this.decimals(), this.allowNegative());
    this.text.set(next);
    this.emit();
  }

  onBlur(): void {
    this.focused.set(false);
    if (!this.text() || this.text() === '-') {
      this.text.set('');
      this.onChange(null);
      this.onTouched();
      return;
    }

    const parsed = Number.parseFloat(this.text()) || 0;
    const clamped = clamp(parsed, this.min(), this.max());
    const rounded = this.decimals() > 0 ? clamped.toFixed(this.decimals()) : String(Math.round(clamped));
    this.text.set(rounded);
    this.emit();
    this.onTouched();
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowUp') { event.preventDefault(); this.bump(1); }
    if (event.key === 'ArrowDown') { event.preventDefault(); this.bump(-1); }
  }

  bump(direction: 1 | -1): void {
    const base = Number.parseFloat(this.text()) || this.min() || 0;
    const next = clamp(base + direction * this.step(), this.min(), this.max());
    this.text.set(this.decimals() > 0 ? next.toFixed(this.decimals()) : String(Math.round(next)));
    this.emit();
  }

  private emit(): void {
    const value = this.text();
    const parsed = value === '' || value === '-' ? null : Number.parseFloat(value);
    this.onChange(parsed === null || Number.isNaN(parsed) ? null : parsed);
  }

  writeValue(value: number | null): void {
    this.text.set(value === null || value === undefined ? '' : String(value));
  }

  registerOnChange(fn: (value: number | null) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.isDisabled.set(isDisabled); }
}
