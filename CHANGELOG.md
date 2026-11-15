# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses
[semantic versioning](https://semver.org/).

## [Unreleased]

### Fixed

- Dialog: the panel no longer re-grabs focus on every parent render, which made a
  controlled input inside a dialog lose focus after one keystroke. Tab is now kept
  inside the panel, and focus returns to the trigger on close.
- Command palette: the `ui-farm:search` listener was added on every render and never
  removed; it is now registered once and cleaned up. Focus also returns to whatever
  opened the palette.
- TextInput, NumberInput, CurrencyInput, PhoneInput and PasswordInput: the error line
  has an id and `aria-describedby` points at it. TextInput used to reference an id that
  did not exist.
- Switch: a visible `label` is now the switch's accessible name via `aria-labelledby`;
  before, it was dropped and the control announced as an unnamed switch.
- PhoneInput: the caret stays where you type instead of jumping to the end, and
  backspace over the formatting space deletes the digit next to it instead of appearing
  to do nothing.
- PhoneInput and NumberInput: `name` now travels on a hidden input holding the raw digits
  or number, so a native form submit no longer posts `98765 43210` or `12,34,000`.
- Field components: `required` is passed to the label, so the asterisk appears.
- DataTable: row actions no longer also fire `onRowClick`; a clickable row is reachable
  by keyboard and activates on Enter or Space; number columns use Indian grouping like
  currency columns; sorting compares numbers numerically and strings case-insensitively,
  and keeps empty cells at the bottom.
- Tabs, CodeTabs and StylePanel: arrow keys (plus Home and End) move between tabs, so
  the inactive tabs are reachable by keyboard.
- DropdownMenu: ArrowUp from the trigger opens at the last item instead of the
  second-to-last, and Escape returns focus to the trigger.
- `onlyAlpha`, `onlyAlphaNumeric` and `addressSafe` keep letters and digits in any
  script, so names typed in Devanagari, Tamil or Bengali are no longer stripped.

## [0.2.0] — 2026-11-09

### Added

- Field components: TextInput (character filtering, casing transforms, counter,
  clear button), NumberInput (integer and float, min/max, decimals, steppers,
  grouped thousands), CurrencyInput, PhoneInput and PasswordInput, all sharing a
  Field wrapper for label, hint and error.
- `input-utils.ts`: onlyDigits, onlyAlpha, onlyAlphaNumeric, capitalizeWords,
  capitalizeFirst, sanitizeNumber, toNumber, toInt, toFloat, clampNumber,
  formatIndianNumber, formatNumber, formatCurrency, parseCurrency, formatPhoneIN
  and validators for email, GSTIN, PAN and Indian mobile numbers.
- DropdownMenu: sections, shortcuts, destructive items, keyboard navigation.
- DataTable: columns and data as props, per-column formatting, click-to-sort,
  client-side paging, skeleton rows, empty state, and an actions column that
  switches between inline buttons and a menu.
- Angular versions of all seven new components.
- Sixteen EJS partials for Express with a locals reference and a runnable example.
- Plain-CSS build (`registry/css/ui-farm.css`), a Bootstrap 5 bridge and a Material UI
  theme, all on the same tokens.
- Command palette (⌘K) for the docs site, and guides for templates and styling.
- Per-component styling switch: Tailwind, plain CSS, Bootstrap 5 and Material UI, with
  the exact class or component for each element and a copy button per row.

## [0.1.0] — 2026-11-09

### Added

- 19 components across five categories: Button, Badge, Card, Avatar, Separator,
  Input, Textarea, Select, Switch, Checkbox, Label, Alert, Dialog, Tooltip,
  Progress, Skeleton, Accordion, Tabs, Table.
- Three source variants per component: React + TypeScript, React + JavaScript
  and Angular + TypeScript.
- Documentation site built with Next.js App Router and Tailwind CSS v4, with a live
  preview, code tabs, copy buttons, props tables and accessibility notes per
  component.
- Design token file (`registry/theme.css`) with dark and light themes.
- Guides for installation, theming, architecture and adding a component.
- `npm run sync` — generates the JavaScript variants from the TypeScript source with
  esbuild, so the two can never drift.

[0.1.0]: https://github.com/chaudharyvivek1/ui-farm/releases/tag/v0.1.0
