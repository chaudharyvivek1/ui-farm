import { Component, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NumberInputComponent } from './number-input.component';

@Component({
  selector: 'uif-currency-input',
  standalone: true,
  imports: [NumberInputComponent],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CurrencyInputComponent), multi: true },
  ],
  template: `
    <uif-number-input
      [label]="label()"
      [hint]="hint()"
      [error]="error()"
      [placeholder]="placeholder()"
      [prefix]="symbol()"
      [decimals]="2"
      [step]="1"
      [thousandSeparator]="true"
      [stepper]="stepper()"
    />
  `,
})
export class CurrencyInputComponent {
  readonly label = input('');
  readonly hint = input('');
  readonly error = input('');
  readonly placeholder = input('');
  readonly symbol = input('₹');
  readonly stepper = input(false);
}
