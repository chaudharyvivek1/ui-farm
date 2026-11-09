/**
 * currency-input — JavaScript version.
 * Generated from the TypeScript source by scripts/build-snippets.mjs.
 */
"use client";
import { NumberInput } from "./number-input";
function CurrencyInput({
  symbol = "\u20B9",
  decimals = 2,
  allowNegative = false,
  ...props
}) {
  return <NumberInput
    {...props}
    decimals={decimals}
    allowNegative={allowNegative}
    thousandSeparator
    indianGrouping
    prefix={symbol}
    step={1}
  />;
}
var stdin_default = CurrencyInput;
export {
  CurrencyInput,
  stdin_default as default
};
