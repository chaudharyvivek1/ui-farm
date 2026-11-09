/**
 * The four styling systems, and the exact class or component each UI Farm
 * element becomes in them.
 *
 * Tailwind ships as full component files. Plain CSS, Bootstrap and MUI are
 * class/component mappings on top of the shipped stylesheet or theme — the
 * markup shape stays the same, only the class names change.
 */

export type StyleSystem = 'tailwind' | 'css' | 'bootstrap' | 'mui';

export type StyleRow = {
  /** The part of the component this row describes. */
  element: string;
  tailwind: string;
  css: string;
  bootstrap: string;
  mui: string;
};

export const styleSystems: { id: StyleSystem; label: string; short: string; copy: string }[] = [
  {
    id: 'tailwind',
    label: 'Tailwind CSS',
    short: 'Tailwind',
    copy: 'Full component files — React (TS and JS) and Angular. Utilities read the CSS variables, so no config and no dark: variants.',
  },
  {
    id: 'css',
    label: 'Plain CSS',
    short: 'CSS',
    copy: 'registry/css/ui-farm.css — semantic uif-* classes on the same tokens. No build step, works in any server-rendered page.',
  },
  {
    id: 'bootstrap',
    label: 'Bootstrap 5',
    short: 'Bootstrap',
    copy: 'Load Bootstrap, then ui-farm.css, then registry/bootstrap/ui-farm-bootstrap.css. The bridge points the tokens at --bs-* variables.',
  },
  {
    id: 'mui',
    label: 'Material UI',
    short: 'MUI',
    copy: 'registry/mui/theme.ts — a createTheme built from the same palette, radii and button shape.',
  },
];

export const componentStyles: Record<string, StyleRow[]> = {
  button: [
    { element: 'Primary action', tailwind: 'bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full px-6 py-3', css: 'uif-btn uif-btn--primary', bootstrap: 'btn btn-primary', mui: '<Button variant="contained">' },
    { element: 'Outline action', tailwind: 'border-2 border-[var(--border)] text-[var(--foreground)] rounded-full', css: 'uif-btn uif-btn--outline', bootstrap: 'btn btn-outline-secondary', mui: '<Button variant="outlined">' },
    { element: 'Small / large', tailwind: 'px-4 py-2 text-sm / px-8 py-4 text-lg', css: 'uif-btn--sm / uif-btn--lg', bootstrap: 'btn-sm / btn-lg', mui: 'size="small" / size="large"' },
    { element: 'Destructive', tailwind: 'bg-[var(--danger)] text-white rounded-full', css: 'uif-btn uif-btn--danger', bootstrap: 'btn btn-danger', mui: '<Button color="error" variant="contained">' },
  ],
  badge: [
    { element: 'Neutral badge', tailwind: 'border border-[var(--border)] bg-[var(--surface-muted)] rounded-full px-2.5', css: 'uif-badge', bootstrap: 'badge text-bg-secondary', mui: '<Chip size="small" />' },
    { element: 'Status tone', tailwind: 'bg-[var(--success)]/12 text-[var(--success)] border-[var(--success)]/25', css: 'uif-badge uif-badge--success', bootstrap: 'badge text-bg-success', mui: '<Chip color="success" size="small" />' },
    { element: 'Status dot', tailwind: 'size-1.5 rounded-full bg-current', css: 'uif-badge__dot', bootstrap: 'rounded-circle d-inline-block', mui: '<Chip avatar={<Avatar />} />' },
  ],
  card: [
    { element: 'Container', tailwind: 'rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6', css: 'uif-card', bootstrap: 'card p-3', mui: '<Paper variant="outlined" sx={{ p: 3 }}>' },
    { element: 'Title', tailwind: 'text-xl font-bold tracking-tight', css: 'uif-card__title', bootstrap: 'card-title', mui: '<Typography variant="h6">' },
    { element: 'Description', tailwind: 'text-sm text-[var(--muted)]', css: 'uif-card__desc', bootstrap: 'card-text text-secondary', mui: '<Typography variant="body2" color="text.secondary">' },
    { element: 'Footer', tailwind: 'mt-6 pt-4 border-t border-[var(--border)] flex gap-3', css: 'uif-card__footer', bootstrap: 'card-footer d-flex gap-2', mui: '<CardActions>' },
  ],
  alert: [
    { element: 'Container', tailwind: 'rounded-xl border p-4 flex gap-3', css: 'uif-alert', bootstrap: 'alert alert-info d-flex gap-2', mui: '<Alert severity="info">' },
    { element: 'Success / warning / danger', tailwind: 'border-[var(--success)]/25 bg-[var(--success)]/10', css: 'uif-alert--success', bootstrap: 'alert-success', mui: 'severity="success"' },
    { element: 'Title', tailwind: 'font-semibold text-[var(--foreground)]', css: 'uif-alert__title', bootstrap: 'alert-heading fw-semibold', mui: '<AlertTitle>' },
  ],
  avatar: [
    { element: 'Container', tailwind: 'rounded-full border border-[var(--border)] size-10 grid place-items-center', css: 'uif-avatar', bootstrap: 'rounded-circle border d-inline-flex align-items-center justify-content-center', mui: '<Avatar>' },
    { element: 'Image', tailwind: 'size-full object-cover', css: 'uif-avatar__img', bootstrap: 'w-100 h-100 object-fit-cover', mui: 'src="…"' },
    { element: 'Initials fallback', tailwind: 'bg-[var(--primary)]/15 text-[var(--primary)] text-sm font-semibold', css: 'uif-avatar--primary', bootstrap: 'bg-primary-subtle text-primary', mui: '<Avatar sx={{ bgcolor: "primary.main" }}>' },
  ],
  separator: [
    { element: 'Horizontal rule', tailwind: 'h-px w-full bg-[var(--border)]', css: 'uif-separator', bootstrap: 'border-top', mui: '<Divider />' },
    { element: 'Vertical rule', tailwind: 'h-full w-px bg-[var(--border)]', css: 'uif-separator--vertical', bootstrap: 'vr', mui: '<Divider orientation="vertical" flexItem />' },
    { element: 'With label', tailwind: 'flex items-center gap-3 text-xs uppercase', css: 'uif-separator--label', bootstrap: 'd-flex align-items-center gap-2 small text-uppercase', mui: '<Divider>or</Divider>' },
  ],
  input: [
    { element: 'Field', tailwind: 'w-full rounded-xl border bg-[var(--surface)] px-4 py-2.5 text-sm', css: 'uif-input', bootstrap: 'form-control', mui: '<TextField size="small" fullWidth />' },
    { element: 'Invalid', tailwind: 'border-[var(--danger)]/60 focus:ring-[var(--danger)]/30', css: 'uif-input uif-input--invalid', bootstrap: 'form-control is-invalid', mui: '<TextField error helperText="…" />' },
    { element: 'Label', tailwind: 'text-sm font-medium text-[var(--foreground)]', css: 'uif-label', bootstrap: 'form-label', mui: '<InputLabel> / label="…"' },
    { element: 'Hint / error', tailwind: 'text-xs text-[var(--muted)] / text-[var(--danger)]', css: 'uif-hint / uif-error', bootstrap: 'form-text / invalid-feedback', mui: 'helperText="…"' },
  ],
  'text-input': [
    { element: 'Field', tailwind: 'rounded-xl border bg-[var(--surface)] px-4 py-2.5', css: 'uif-input', bootstrap: 'form-control', mui: '<TextField size="small" />' },
    { element: 'Counter', tailwind: 'text-right text-[11px] tabular-nums text-[var(--muted)]', css: 'uif-counter', bootstrap: 'form-text text-end', mui: 'helperText={`${value.length} / ${max}`}' },
    { element: 'Clear button', tailwind: 'absolute right-3 size-5 rounded-full text-[var(--muted)]', css: 'uif-input__clear', bootstrap: 'btn btn-sm btn-link position-absolute end-0', mui: '<IconButton size="small">' },
  ],
  'number-input': [
    { element: 'Field', tailwind: 'rounded-xl border px-4 py-2.5 tabular-nums', css: 'uif-input uif-input--number', bootstrap: 'form-control text-end', mui: '<TextField type="number" />' },
    { element: 'Stepper buttons', tailwind: 'flex size-7 items-center justify-center rounded-md hover:bg-[var(--surface-muted)]', css: 'uif-stepper__btn', bootstrap: 'btn btn-sm btn-outline-secondary', mui: '<IconButton size="small">' },
    { element: 'Grouped thousands', tailwind: 'formatIndianNumber(value, decimals)', css: '— (format in JS)', bootstrap: '— (format in JS)', mui: 'InputProps={{ inputComponent: NumericFormat }}' },
  ],
  'currency-input': [
    { element: 'Group', tailwind: 'flex items-stretch', css: 'uif-input-group', bootstrap: 'input-group', mui: '<InputAdornment position="start">' },
    { element: 'Symbol', tailwind: 'absolute left-3 text-sm text-[var(--muted)]', css: 'uif-input-group__prefix', bootstrap: 'input-group-text', mui: 'startAdornment="₹"' },
    { element: 'Field', tailwind: 'rounded-xl border px-4 py-2.5 tabular-nums pl-8', css: 'uif-input uif-input--number', bootstrap: 'form-control', mui: '<TextField inputMode="decimal" />' },
  ],
  'phone-input': [
    { element: 'Group', tailwind: 'flex items-stretch', css: 'uif-input-group', bootstrap: 'input-group', mui: '<InputAdornment position="start">' },
    { element: 'Country code', tailwind: 'rounded-l-xl border border-r-0 bg-[var(--surface-muted)] px-3', css: 'uif-input-group__prefix', bootstrap: 'input-group-text', mui: 'startAdornment="+91"' },
    { element: 'Field', tailwind: 'rounded-l-none tabular-nums', css: 'uif-input uif-input--number', bootstrap: 'form-control', mui: '<TextField type="tel" />' },
  ],
  'password-input': [
    { element: 'Field', tailwind: 'rounded-xl border px-4 py-2.5 pr-11', css: 'uif-input', bootstrap: 'form-control', mui: '<TextField type="password" />' },
    { element: 'Toggle', tailwind: 'absolute right-3 size-6 rounded-md text-[var(--muted)]', css: 'uif-input__toggle', bootstrap: 'btn btn-sm btn-link position-absolute end-0', mui: '<IconButton size="small">' },
    { element: 'Strength bar', tailwind: 'h-1 rounded-full bg-[var(--surface-muted)]', css: 'uif-meter', bootstrap: 'progress', mui: '<LinearProgress variant="determinate" />' },
  ],
  textarea: [
    { element: 'Field', tailwind: 'rounded-xl border px-4 py-3 resize-y', css: 'uif-textarea', bootstrap: 'form-control', mui: '<TextField multiline rows={4} />' },
  ],
  select: [
    { element: 'Control', tailwind: 'appearance-none rounded-xl border px-4 py-2.5 pr-10', css: 'uif-select', bootstrap: 'form-select', mui: '<Select size="small" />' },
    { element: 'Chevron', tailwind: 'absolute right-3 size-4 text-[var(--muted)]', css: 'uif-select__chevron', bootstrap: 'form-select (built in)', mui: '(built in)' },
  ],
  switch: [
    { element: 'Track — on', tailwind: 'h-6 w-11 rounded-full bg-[var(--primary)]', css: 'uif-switch uif-switch--on', bootstrap: 'form-check form-switch', mui: '<Switch checked />' },
    { element: 'Track — off', tailwind: 'h-6 w-11 rounded-full bg-[var(--surface-muted)] border', css: 'uif-switch', bootstrap: 'form-check form-switch', mui: '<Switch />' },
    { element: 'Knob', tailwind: 'size-4.5 rounded-full bg-white shadow-sm', css: 'uif-switch__knob', bootstrap: 'form-check-input', mui: '(built in)' },
  ],
  checkbox: [
    { element: 'Box', tailwind: 'size-4.5 appearance-none rounded-md border', css: 'uif-checkbox', bootstrap: 'form-check-input', mui: '<Checkbox />' },
    { element: 'Checked', tailwind: 'checked:bg-[var(--primary)] checked:border-[var(--primary)]', css: 'uif-checkbox:checked', bootstrap: 'form-check-input:checked', mui: '<Checkbox defaultChecked />' },
    { element: 'Indeterminate', tailwind: 'indeterminate:bg-[var(--primary)]', css: 'uif-checkbox:indeterminate', bootstrap: 'indeterminate', mui: '<Checkbox indeterminate />' },
  ],
  label: [
    { element: 'Label', tailwind: 'flex justify-between text-sm font-medium', css: 'uif-label', bootstrap: 'form-label d-flex justify-content-between', mui: '<InputLabel>' },
    { element: 'Required marker', tailwind: 'text-[var(--danger)]', css: 'uif-required', bootstrap: 'text-danger', mui: 'required' },
    { element: 'Hint', tailwind: 'text-xs font-normal text-[var(--muted)]', css: 'uif-label__hint', bootstrap: 'form-text', mui: 'helperText' },
  ],
  accordion: [
    { element: 'Container', tailwind: 'divide-y rounded-2xl border bg-[var(--surface)]', css: 'uif-accordion', bootstrap: 'accordion', mui: '<Accordion>' },
    { element: 'Trigger', tailwind: 'flex w-full justify-between px-6 py-5 font-semibold', css: 'uif-accordion__trigger', bootstrap: 'accordion-button', mui: '<AccordionSummary expandIcon>', },
    { element: 'Panel', tailwind: 'border-t bg-[var(--surface-muted)]/30 px-6 py-5 text-sm', css: 'uif-accordion__panel', bootstrap: 'accordion-body', mui: '<AccordionDetails>' },
  ],
  tabs: [
    { element: 'List', tailwind: 'inline-flex gap-1 rounded-full border p-1', css: 'uif-tabs', bootstrap: 'nav nav-pills', mui: '<Tabs value={0}>' },
    { element: 'Active trigger', tailwind: 'rounded-full bg-[var(--primary)] text-white px-4 py-1.5', css: 'uif-tabs__tab--active', bootstrap: 'nav-link active', mui: '<Tab label="…" />' },
    { element: 'Panel', tailwind: 'pt-4', css: 'uif-tabs__panel', bootstrap: 'tab-pane active', mui: '<TabPanel>' },
  ],
  dialog: [
    { element: 'Backdrop', tailwind: 'fixed inset-0 bg-black/60 backdrop-blur-sm', css: 'uif-modal::backdrop', bootstrap: 'modal-backdrop fade show', mui: '<Backdrop />' },
    { element: 'Panel', tailwind: 'rounded-2xl border bg-[var(--surface)] p-6 max-w-lg', css: 'uif-modal__panel', bootstrap: 'modal-dialog modal-dialog-centered', mui: '<Dialog maxWidth="sm">' },
    { element: 'Title', tailwind: 'text-xl font-bold tracking-tight', css: 'uif-modal__title', bootstrap: 'modal-title', mui: '<DialogTitle>' },
    { element: 'Footer', tailwind: 'mt-6 flex justify-end gap-3', css: 'uif-modal__footer', bootstrap: 'modal-footer', mui: '<DialogActions>' },
  ],
  'dropdown-menu': [
    { element: 'Trigger', tailwind: 'inline-flex size-8 rounded-lg text-[var(--muted)]', css: 'uif-menu > summary', bootstrap: 'dropdown-toggle', mui: '<IconButton>' },
    { element: 'Panel', tailwind: 'absolute mt-2 rounded-xl border bg-[var(--surface)] p-1.5 shadow-lg', css: 'uif-menu__panel', bootstrap: 'dropdown-menu show', mui: '<Menu> / <MenuItem>' },
    { element: 'Item', tailwind: 'flex gap-2.5 rounded-lg px-3 py-2 text-sm hover:bg-[var(--surface-muted)]', css: 'uif-menu__item', bootstrap: 'dropdown-item', mui: '<MenuItem>' },
    { element: 'Destructive item', tailwind: 'text-[var(--danger)] hover:bg-[var(--danger)]/10', css: 'uif-menu__item--danger', bootstrap: 'dropdown-item text-danger', mui: '<MenuItem sx={{ color: "error.main" }}>' },
  ],
  tooltip: [
    { element: 'Bubble', tailwind: 'absolute rounded-lg border bg-[var(--surface-muted)] px-2.5 py-1.5 text-xs', css: 'uif-tooltip', bootstrap: 'tooltip-inner', mui: '<Tooltip title="…">' },
  ],
  table: [
    { element: 'Wrapper', tailwind: 'overflow-x-auto rounded-2xl border', css: 'uif-table-wrap', bootstrap: 'table-responsive', mui: '<TableContainer component={Paper}>' },
    { element: 'Table', tailwind: 'w-full border-collapse text-sm', css: 'uif-table', bootstrap: 'table table-hover', mui: '<Table size="small">' },
    { element: 'Header cell', tailwind: 'px-4 py-3 text-xs uppercase text-[var(--muted)]', css: 'uif-table th', bootstrap: 'table-light', mui: '<TableCell sx={{ textTransform: "uppercase" }}>' },
    { element: 'Numeric cell', tailwind: 'text-right tabular-nums', css: 'uif-align-right uif-num', bootstrap: 'text-end font-monospace', mui: '<TableCell align="right">' },
  ],
  'data-table': [
    { element: 'Table', tailwind: 'w-full border-collapse text-sm', css: 'uif-table', bootstrap: 'table table-hover align-middle', mui: '<Table size="small">' },
    { element: 'Status badge', tailwind: 'bg-[var(--success)]/12 text-[var(--success)] rounded-full', css: 'uif-badge uif-badge--success', bootstrap: 'badge text-bg-success', mui: '<Chip color="success" size="small">' },
    { element: 'Row actions', tailwind: 'inline-flex size-8 rounded-lg (kebab menu)', css: 'uif-menu > summary', bootstrap: 'dropdown', mui: '<IconButton> + <Menu>' },
    { element: 'Pagination', tailwind: 'flex justify-between text-xs text-[var(--muted)]', css: 'uif-pagination', bootstrap: 'pagination pagination-sm', mui: '<TablePagination>' },
  ],
  progress: [
    { element: 'Track', tailwind: 'h-2.5 w-full rounded-full bg-[var(--surface-muted)]', css: 'uif-progress', bootstrap: 'progress', mui: '<LinearProgress variant="determinate" />' },
    { element: 'Bar', tailwind: 'h-full rounded-full bg-[var(--primary)]', css: 'uif-progress__bar', bootstrap: 'progress-bar', mui: 'value={68}' },
    { element: 'Value label', tailwind: 'flex justify-between text-xs text-[var(--muted)]', css: 'uif-progress__label', bootstrap: 'd-flex justify-content-between small', mui: '<Typography variant="caption">' },
  ],
  skeleton: [
    { element: 'Block', tailwind: 'animate-pulse rounded-md bg-[var(--surface-muted)] h-4 w-full', css: 'uif-skeleton', bootstrap: 'placeholder col-12', mui: '<Skeleton variant="rectangular" />' },
    { element: 'Circle', tailwind: 'size-10 rounded-full', css: 'uif-skeleton uif-skeleton--circle', bootstrap: 'placeholder rounded-circle', mui: '<Skeleton variant="circular" />' },
    { element: 'Card', tailwind: 'h-40 w-full rounded-2xl', css: 'uif-skeleton uif-skeleton--card', bootstrap: 'placeholder col-12', mui: '<Skeleton variant="rounded" height={160} />' },
  ],
};

export function getComponentStyles(slug: string): StyleRow[] {
  return componentStyles[slug] ?? [];
}
