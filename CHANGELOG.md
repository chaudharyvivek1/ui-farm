# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses
[semantic versioning](https://semver.org/).

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
