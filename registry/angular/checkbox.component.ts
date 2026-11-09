import { Component, forwardRef, input, model, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'uif-checkbox',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
  template: `
    <div class="flex items-start gap-3">
      <span class="relative mt-0.5 inline-flex">
        <input
          type="checkbox"
          [id]="inputId"
          [checked]="checked()"
          [disabled]="isDisabled()"
          (change)="onChangeEvent($event)"
          class="size-4.5 cursor-pointer appearance-none rounded-md border border-[var(--border)] bg-[var(--surface)] transition-colors checked:border-[var(--primary)] checked:bg-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/50 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <svg
          class="pointer-events-none absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 opacity-0"
          [style.opacity]="checked() ? 1 : 0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>

      @if (label() || description()) {
        <label [for]="inputId" class="cursor-pointer space-y-0.5">
          @if (label()) {
            <span class="block text-sm font-medium text-[var(--foreground)]">{{ label() }}</span>
          }
          @if (description()) {
            <span class="block text-xs leading-relaxed text-[var(--muted)]">{{ description() }}</span>
          }
        </label>
      }
    </div>
  `,
})
export class CheckboxComponent implements ControlValueAccessor {
  readonly label = input('');
  readonly description = input('');
  readonly checked = model(false);

  readonly isDisabled = signal(false);
  readonly inputId = `uif-checkbox-${Math.random().toString(36).slice(2, 9)}`;

  private onChange: (value: boolean) => void = () => {};
  onTouched: () => void = () => {};

  onChangeEvent(event: Event): void {
    const next = (event.target as HTMLInputElement).checked;
    this.checked.set(next);
    this.onChange(next);
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
