import { Component, computed, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const score = (value: string) => {
  if (!value) return 0;
  let points = 0;
  if (value.length >= 8) points += 1;
  if (value.length >= 12) points += 1;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) points += 1;
  if (/\d/.test(value)) points += 1;
  if (/[^A-Za-z0-9]/.test(value)) points += 1;
  return Math.min(points, 4);
};

const LEVELS = [
  { label: 'Too short', tone: 'bg-[var(--danger)]', width: 'w-1/4' },
  { label: 'Weak', tone: 'bg-[var(--danger)]', width: 'w-1/3' },
  { label: 'Fair', tone: 'bg-[var(--warning)]', width: 'w-2/4' },
  { label: 'Good', tone: 'bg-[var(--primary)]', width: 'w-3/4' },
  { label: 'Strong', tone: 'bg-[var(--success)]', width: 'w-full' },
];

@Component({
  selector: 'uif-password-input',
  standalone: true,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PasswordInputComponent), multi: true },
  ],
  template: `
    <div class="space-y-2">
      @if (label()) {
        <label [attr.for]="inputId" class="text-sm font-medium text-[var(--foreground)]">{{ label() }}</label>
      }

      <div class="relative flex items-center">
        <input
          [id]="inputId"
          [type]="visible() ? 'text' : 'password'"
          [value]="value()"
          [attr.placeholder]="placeholder()"
          [disabled]="isDisabled()"
          autocomplete="current-password"
          class="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 pr-11 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]/70 focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 disabled:opacity-60"
          (input)="onInput($event)"
          (blur)="onTouched()"
        />
        <button
          type="button"
          [attr.aria-label]="visible() ? 'Hide password' : 'Show password'"
          [attr.aria-pressed]="visible()"
          class="absolute right-3 flex size-6 items-center justify-center rounded-md text-[var(--muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
          (click)="visible.set(!visible())"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4" aria-hidden="true">
            <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>
      </div>

      @if (showStrength() && value()) {
        <div class="space-y-1.5">
          <div class="h-1 w-full overflow-hidden rounded-full bg-[var(--surface-muted)]">
            <div [class]="strength().tone + ' h-full rounded-full transition-all ' + strength().width"></div>
          </div>
          <p class="text-[11px] text-[var(--muted)]">{{ strength().label }}</p>
        </div>
      }

      @if (error()) {
        <p class="text-xs text-[var(--danger)]" role="alert">{{ error() }}</p>
      } @else if (hint()) {
        <p class="text-xs text-[var(--muted)]">{{ hint() }}</p>
      }
    </div>
  `,
})
export class PasswordInputComponent implements ControlValueAccessor {
  readonly label = input('');
  readonly hint = input('');
  readonly error = input('');
  readonly placeholder = input('••••••••');
  readonly showStrength = input(false);

  readonly value = signal('');
  readonly visible = signal(false);
  readonly isDisabled = signal(false);
  readonly inputId = `uif-password-${Math.random().toString(36).slice(2, 9)}`;
  readonly strength = computed(() => LEVELS[score(this.value())]);

  private onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  onInput(event: Event): void {
    const next = (event.target as HTMLInputElement).value;
    this.value.set(next);
    this.onChange(next);
  }

  writeValue(value: string | null): void { this.value.set(value ?? ''); }
  registerOnChange(fn: (value: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.isDisabled.set(isDisabled); }
}
