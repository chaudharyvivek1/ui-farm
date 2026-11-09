import { Component, computed, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type Allowed = 'any' | 'alpha' | 'alphanumeric' | 'digits';
type Transform = 'none' | 'upper' | 'lower' | 'capitalize-words' | 'trim';

const onlyDigits = (v: string) => v.replace(/\D+/g, '');
const onlyAlpha = (v: string, spaces: boolean) =>
  (spaces ? v.replace(/[^A-Za-z\s]+/g, '') : v.replace(/[^A-Za-z]+/g, '')).replace(/\s{2,}/g, ' ');
const onlyAlphaNumeric = (v: string) => v.replace(/[^A-Za-z0-9\s]+/g, '').replace(/\s{2,}/g, ' ');
const capitalizeWords = (v: string) =>
  v
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/(^|\s)([a-z])/g, (_m, s: string, l: string) => s + l.toUpperCase());

const applyTransform = (v: string, transform: Transform) => {
  switch (transform) {
    case 'upper': return v.toUpperCase();
    case 'lower': return v.toLowerCase();
    case 'capitalize-words': return capitalizeWords(v);
    case 'trim': return v.trimStart();
    default: return v;
  }
};

@Component({
  selector: 'uif-text-input',
  standalone: true,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextInputComponent), multi: true },
  ],
  template: `
    <div class="space-y-2">
      @if (label()) {
        <label [attr.for]="inputId" class="flex items-center justify-between gap-3 text-sm font-medium text-[var(--foreground)]">
          <span>
            {{ label() }}
            @if (required()) { <span class="ml-1 text-[var(--danger)]" aria-hidden="true">*</span> }
          </span>
          @if (hint()) { <span class="text-xs font-normal text-[var(--muted)]">{{ hint() }}</span> }
        </label>
      }

      <div class="relative flex items-center">
        <input
          [id]="inputId"
          [class]="classes()"
          [value]="value()"
          [attr.placeholder]="placeholder()"
          [attr.maxlength]="maxLength() || null"
          [disabled]="isDisabled()"
          [attr.aria-invalid]="error() ? true : null"
          (input)="onInput($event)"
          (blur)="onTouched()"
        />
        @if (clearable() && value() && !isDisabled()) {
          <button
            type="button"
            aria-label="Clear"
            class="absolute right-3 flex size-5 items-center justify-center rounded-full text-[var(--muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
            (click)="clear()"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="size-3.5" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        }
      </div>

      @if (error()) {
        <p class="text-xs text-[var(--danger)]" role="alert">{{ error() }}</p>
      } @else if (!label() && hint()) {
        <p class="text-xs text-[var(--muted)]">{{ hint() }}</p>
      }

      @if (showCount() && maxLength()) {
        <p class="text-right text-[11px] tabular-nums text-[var(--muted)]">{{ value().length }} / {{ maxLength() }}</p>
      }
    </div>
  `,
})
export class TextInputComponent implements ControlValueAccessor {
  readonly label = input('');
  readonly hint = input('');
  readonly error = input('');
  readonly placeholder = input('');
  readonly allowed = input<Allowed>('any');
  readonly allowSpaces = input(true);
  readonly transform = input<Transform>('none');
  readonly maxLength = input(0);
  readonly showCount = input(false);
  readonly clearable = input(false);
  readonly required = input(false);

  readonly value = signal('');
  readonly isDisabled = signal(false);
  readonly inputId = `uif-text-${Math.random().toString(36).slice(2, 9)}`;

  private onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  readonly classes = computed(() =>
    [
      'w-full rounded-xl border bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]/70 transition-colors focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60',
      this.error()
        ? 'border-[var(--danger)]/60 focus:border-[var(--danger)] focus:ring-[var(--danger)]/30'
        : 'border-[var(--border)] focus:border-[var(--primary)] focus:ring-[var(--primary)]/30',
      this.clearable() ? 'pr-10' : '',
    ].join(' '),
  );

  onInput(event: Event): void {
    let next = (event.target as HTMLInputElement).value;

    switch (this.allowed()) {
      case 'alpha': next = onlyAlpha(next, this.allowSpaces()); break;
      case 'alphanumeric': next = onlyAlphaNumeric(next); break;
      case 'digits': next = onlyDigits(next); break;
      default: break;
    }

    next = applyTransform(next, this.transform());
    if (this.maxLength()) next = next.slice(0, this.maxLength());

    (event.target as HTMLInputElement).value = next;
    this.value.set(next);
    this.onChange(next);
  }

  clear(): void {
    this.value.set('');
    this.onChange('');
  }

  writeValue(value: string | null): void { this.value.set(value ?? ''); }
  registerOnChange(fn: (value: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.isDisabled.set(isDisabled); }
}
