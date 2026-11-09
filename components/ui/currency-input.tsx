'use client';

import * as React from 'react';

import { NumberInput, type NumberInputProps } from './number-input';

export interface CurrencyInputProps
  extends Omit<NumberInputProps, 'decimals' | 'prefix' | 'thousandSeparator' | 'step' | 'allowNegative'> {
  /** Symbol shown inside the field. */
  symbol?: string;
  /** Digits after the decimal point. */
  decimals?: number;
  /** Allow a leading minus for refunds and adjustments. */
  allowNegative?: boolean;
}

/**
 * Money field. A NumberInput with the settings that are almost always right
 * for currency: two decimals, grouped thousands, no negatives, ₹ prefix.
 */
export function CurrencyInput({
  symbol = '₹',
  decimals = 2,
  allowNegative = false,
  ...props
}: CurrencyInputProps) {
  return (
    <NumberInput
      {...props}
      decimals={decimals}
      allowNegative={allowNegative}
      thousandSeparator
      indianGrouping
      prefix={symbol}
      step={1}
    />
  );
}

export default CurrencyInput;
