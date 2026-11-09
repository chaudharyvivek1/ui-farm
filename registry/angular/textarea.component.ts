import { Component, computed, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'uif-textarea',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
  template: `
    <textarea
      [class]="classes()"
      [rows]="rows()"
      [value]="value()"
      [disabled]="isDisabled()"
      [attr.placeholder]="placeholder()"
      [attr.aria-invalid]="invalid() || null"
      (input)="onInput($event)"
      (blur)="onTouched()"
    ></textarea>
  `,
})
export class TextareaComponent implements ControlValueAccessor {
  readonly placeholder = input('');
  readonly rows = input(4);
  readonly invalid = input(false);

  readonly value = signal('');
  readonly isDisabled = signal(false);

  private onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  readonly classes = computed(() =>
    [
      'w-full resize-y rounded-xl border bg-[var(--surface)] px-4 py-3 text-sm leading-relaxed text-[var(--foreground)] placeholder:text-[var(--muted)]/70 transition-colors focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60',
      this.invalid()
        ? 'border-[var(--danger)]/60 focus:border-[var(--danger)] focus:ring-[var(--danger)]/30'
        : 'border-[var(--border)] focus:border-[var(--primary)] focus:ring-[var(--primary)]/30',
    ].join(' '),
  );

  onInput(event: Event): void {
    const next = (event.target as HTMLTextAreaElement).value;
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
