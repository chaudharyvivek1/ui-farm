/**
 * Input helpers — pure functions, no React and no dependencies.
 *
 * Copy this file next to the field components. Every helper takes a string and
 * returns a string (or a number), so the same functions can be used in an
 * `onChange` handler, in a form validator, or on the server before saving.
 */

export type InputTransform = 'none' | 'upper' | 'lower' | 'capitalize-words' | 'trim';

/** Keeps digits only. Useful for PIN, OTP, quantity and account numbers. */
export function onlyDigits(value: string): string {
  return value.replace(/\D+/g, '');
}

/** Keeps letters only. `allowSpaces` keeps single spaces between words. */
export function onlyAlpha(value: string, allowSpaces = true): string {
  const pattern = allowSpaces ? /[^A-Za-z\s]+/g : /[^A-Za-z]+/g;
  const cleaned = value.replace(pattern, '');
  return allowSpaces ? cleaned.replace(/\s{2,}/g, ' ') : cleaned;
}

/** Keeps letters, digits and single spaces. */
export function onlyAlphaNumeric(value: string): string {
  return value.replace(/[^A-Za-z0-9\s]+/g, '').replace(/\s{2,}/g, ' ');
}

/** Letters, digits, spaces and the characters commonly used in addresses. */
export function addressSafe(value: string): string {
  return value.replace(/[^A-Za-z0-9\s.,\-/#()&']+/g, '');
}

/** "vivek chaudhary" → "Vivek Chaudhary". Collapses extra whitespace. */
export function capitalizeWords(value: string): string {
  return value
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/(^|\s)([a-z])/g, (_match, space: string, letter: string) => space + letter.toUpperCase());
}

/** "vivek" → "Vivek"; leaves the rest of the string alone. */
export function capitalizeFirst(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/** Applies one of the transforms above. */
export function applyTransform(value: string, transform: InputTransform = 'none'): string {
  switch (transform) {
    case 'upper':
      return value.toUpperCase();
    case 'lower':
      return value.toLowerCase();
    case 'capitalize-words':
      return capitalizeWords(value);
    case 'trim':
      return value.trimStart();
    default:
      return value;
  }
}

/**
 * Cleans a numeric string for a field with `decimals` digits after the point.
 * Keeps a single leading minus when `allowNegative`, drops every other
 * non-digit, and trims extra decimals instead of rejecting the keystroke.
 */
export function sanitizeNumber(value: string, decimals = 0, allowNegative = false): string {
  let cleaned = value.replace(decimals > 0 ? /[^\d.-]/g : /[^\d-]/g, '');

  if (allowNegative) {
    const negative = cleaned.startsWith('-');
    cleaned = cleaned.replace(/-/g, '');
    cleaned = negative ? `-${cleaned}` : cleaned;
  } else {
    cleaned = cleaned.replace(/-/g, '');
  }

  if (decimals > 0) {
    const [whole, ...rest] = cleaned.split('.');
    if (rest.length === 0) return whole;
    return `${whole}.${rest.join('').slice(0, decimals)}`;
  }

  return cleaned;
}

/** Parses a cleaned string to a number, or null when it is not a number. */
export function toNumber(value: string, decimals = 0): number | null {
  if (value === '' || value === '-' || value === '.') return null;
  const parsed = Number.parseFloat(value);
  if (Number.isNaN(parsed)) return null;
  const factor = 10 ** decimals;
  return Math.round(parsed * factor) / factor;
}

export function toInt(value: string, fallback = 0): number {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

export function toFloat(value: string, fallback = 0, decimals = 2): number {
  const parsed = Number.parseFloat(value);
  if (Number.isNaN(parsed)) return fallback;
  const factor = 10 ** decimals;
  return Math.round(parsed * factor) / factor;
}

/** Keeps a number inside the given bounds. */
export function clampNumber(value: number, min?: number, max?: number): number {
  let next = value;
  if (typeof min === 'number') next = Math.max(min, next);
  if (typeof max === 'number') next = Math.min(max, next);
  return next;
}

/**
 * Groups a number the Indian way: 12,34,567.89
 * (last three digits, then pairs).
 */
export function formatIndianNumber(value: number | string, decimals = 0): string {
  const numeric = typeof value === 'string' ? Number.parseFloat(value) : value;
  if (Number.isNaN(numeric)) return '';

  const negative = numeric < 0;
  const fixed = Math.abs(numeric).toFixed(decimals);
  const [whole, fraction] = fixed.split('.');

  let grouped = whole;
  if (whole.length > 3) {
    const last3 = whole.slice(-3);
    const rest = whole.slice(0, -3);
    grouped = `${rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',')},${last3}`;
  }

  const sign = negative ? '-' : '';
  return fraction ? `${sign}${grouped}.${fraction}` : `${sign}${grouped}`;
}

/** Groups a number the Western way: 1,234,567.89 */
export function formatNumber(value: number | string, decimals = 0): string {
  const numeric = typeof value === 'string' ? Number.parseFloat(value) : value;
  if (Number.isNaN(numeric)) return '';
  return numeric.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export type CurrencyOptions = {
  symbol?: string;
  decimals?: number;
  indian?: boolean;
  space?: boolean;
};

/** 124000 → "₹1,24,000.00" */
export function formatCurrency(value: number | string, options: CurrencyOptions = {}): string {
  const { symbol = '₹', decimals = 2, indian = true, space = false } = options;
  const numeric = typeof value === 'string' ? Number.parseFloat(value) : value;
  if (Number.isNaN(numeric)) return '';

  const body = indian ? formatIndianNumber(numeric, decimals) : formatNumber(numeric, decimals);
  return `${symbol}${space ? ' ' : ''}${body}`;
}

/** Strips a currency string back to a number: "₹1,24,000.00" → 124000 */
export function parseCurrency(value: string): number | null {
  const cleaned = value.replace(/[^\d.-]/g, '');
  return toNumber(cleaned, 2);
}

/**
 * Formats an Indian mobile number as 98765 43210 while typing.
 * Anything beyond ten digits is dropped.
 */
export function formatPhoneIN(value: string): string {
  const digits = onlyDigits(value).slice(0, 10);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)} ${digits.slice(5)}`;
}

/** 9876543210 → "+91 98765 43210" */
export function formatPhoneINWithPrefix(value: string, prefix = '+91'): string {
  const formatted = formatPhoneIN(value);
  return formatted ? `${prefix} ${formatted}` : '';
}

/** True for a 10-digit Indian mobile number starting with 6-9. */
export function isValidPhoneIN(value: string): boolean {
  return /^[6-9]\d{9}$/.test(onlyDigits(value));
}

/** Basic email shape check — the server still has the final say. */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

/** 15-character Indian GSTIN. */
export function isValidGSTIN(value: string): boolean {
  return /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/.test(value.trim().toUpperCase());
}

/** 10-character PAN. */
export function isValidPAN(value: string): boolean {
  return /^[A-Z]{5}\d{4}[A-Z]$/.test(value.trim().toUpperCase());
}
