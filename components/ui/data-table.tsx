'use client';

import * as React from 'react';

import { Badge, type BadgeVariant } from './badge';
import { DropdownMenu, type DropdownItem } from './dropdown-menu';
import { Skeleton } from './skeleton';
import { formatCurrency, formatNumber } from './input-utils';

export type ColumnType = 'text' | 'number' | 'currency' | 'date' | 'badge';

export type DataTableColumn<T> = {
  /** Property name on the row object. */
  key: Extract<keyof T, string> | string;
  header: string;
  align?: 'left' | 'center' | 'right';
  /** CSS width, e.g. "180px" or "20%". */
  width?: string;
  sortable?: boolean;
  /** Formats the raw value before display. Ignored when `render` is set. */
  type?: ColumnType;
  /** Full control over the cell. */
  render?: (row: T, index: number) => React.ReactNode;
  /** Maps a badge value to a tone, e.g. { Paid: 'success' }. */
  badgeTones?: Record<string, BadgeVariant>;
  /** Hides the column below this breakpoint. */
  hideBelow?: 'sm' | 'md' | 'lg';
  className?: string;
};

export type DataTableAction<T> = {
  label: string;
  onClick: (row: T) => void;
  icon?: React.ReactNode;
  danger?: boolean;
  disabled?: (row: T) => boolean;
  hidden?: (row: T) => boolean;
};

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  /** Property name or function that returns a stable key per row. */
  rowKey?: Extract<keyof T, string> | ((row: T) => string | number);

  /** Row actions — rendered as buttons, or in a menu when there are more than two. */
  actions?: DataTableAction<T>[];
  actionsHeader?: string;
  /** "auto" shows buttons for 1–2 actions and a menu beyond that. */
  actionsVariant?: 'auto' | 'inline' | 'menu';
  /** Replaces the whole actions cell. */
  renderActions?: (row: T) => React.ReactNode;

  caption?: string;
  loading?: boolean;
  loadingRows?: number;
  empty?: React.ReactNode;
  striped?: boolean;
  dense?: boolean;
  hoverable?: boolean;
  stickyHeader?: boolean;

  /** Enables click-to-sort on sortable columns. */
  sortable?: boolean;
  defaultSort?: { key: string; direction: 'asc' | 'desc' };
  /** Client-side pagination. Omit to render every row. */
  pageSize?: number;
  onRowClick?: (row: T) => void;
  footer?: React.ReactNode;
  className?: string;
}

const alignClass = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const;

const hideClass = {
  sm: 'hidden sm:table-cell',
  md: 'hidden md:table-cell',
  lg: 'hidden lg:table-cell',
} as const;

function valueOf<T>(row: T, key: string): unknown {
  return (row as Record<string, unknown>)[key];
}

function cellText<T>(row: T, column: DataTableColumn<T>): React.ReactNode {
  const value = valueOf(row, column.key);
  if (value === null || value === undefined || value === '') return '—';

  switch (column.type) {
    case 'number':
      return formatNumber(value as number);
    case 'currency':
      return formatCurrency(value as number | string);
    case 'date':
      return new Date(value as string).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    case 'badge': {
      const label = String(value);
      const tone = column.badgeTones?.[label] ?? 'default';
      return (
        <Badge variant={tone} dot>
          {label}
        </Badge>
      );
    }
    default:
      return String(value);
  }
}

/**
 * Data-driven table. Pass `columns` and `data`, and optionally `actions` for
 * the last column; sorting, pagination, loading rows, empty states and the
 * actions menu are handled for you. For fully custom markup, use the Table
 * primitives instead.
 */
export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
  actions = [],
  actionsHeader = 'Actions',
  actionsVariant = 'auto',
  renderActions,
  caption,
  loading = false,
  loadingRows = 5,
  empty = 'No records yet.',
  striped = false,
  dense = false,
  hoverable = true,
  stickyHeader = false,
  sortable = false,
  defaultSort,
  pageSize,
  onRowClick,
  footer,
  className = '',
}: DataTableProps<T>) {
  const [sort, setSort] = React.useState(defaultSort ?? null);
  const [page, setPage] = React.useState(0);

  const sorted = React.useMemo(() => {
    if (!sort) return data;
    const copy = [...data];
    copy.sort((a, b) => {
      const left = valueOf(a, sort.key);
      const right = valueOf(b, sort.key);
      if (left === right) return 0;
      const result = (left as never) > (right as never) ? 1 : -1;
      return sort.direction === 'asc' ? result : -result;
    });
    return copy;
  }, [data, sort]);

  const pageCount = pageSize ? Math.max(1, Math.ceil(sorted.length / pageSize)) : 1;
  const currentPage = Math.min(page, pageCount - 1);
  const rows = pageSize
    ? sorted.slice(currentPage * pageSize, currentPage * pageSize + pageSize)
    : sorted;

  function toggleSort(column: DataTableColumn<T>) {
    if (!sortable || !column.sortable) return;
    setPage(0);
    setSort((current) => {
      if (current?.key !== column.key) return { key: column.key as string, direction: 'asc' };
      return { key: column.key as string, direction: current.direction === 'asc' ? 'desc' : 'asc' };
    });
  }

  function keyFor(row: T, index: number): string | number {
    if (typeof rowKey === 'function') return rowKey(row);
    if (typeof rowKey === 'string') return String(valueOf(row, rowKey));
    return index;
  }

  const hasActions = Boolean(renderActions) || actions.length > 0;
  const showMenu = actionsVariant === 'menu' || (actionsVariant === 'auto' && actions.length > 2);

  const rowPadding = dense ? 'px-4 py-2' : 'px-4 py-3.5';
  const headPadding = dense ? 'px-4 py-2' : 'px-4 py-3';

  return (
    <div className={['w-full', className].filter(Boolean).join(' ')}>
      <div className="w-full overflow-x-auto rounded-2xl border border-[var(--border)]">
        <table className="w-full border-collapse text-left text-sm">
          {caption ? (
            <caption className="border-b border-[var(--border)] px-4 py-2.5 text-left text-xs text-[var(--muted)]">
              {caption}
            </caption>
          ) : null}

          <thead className={stickyHeader ? 'sticky top-0 z-10' : undefined}>
            <tr className="bg-[var(--surface-muted)]/60">
              {columns.map((column) => {
                const isSorted = sort?.key === column.key;
                const canSort = sortable && column.sortable;

                return (
                  <th
                    key={column.key as string}
                    scope="col"
                    style={column.width ? { width: column.width } : undefined}
                    aria-sort={
                      isSorted ? (sort?.direction === 'asc' ? 'ascending' : 'descending') : undefined
                    }
                    className={[
                      headPadding,
                      'whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-[var(--muted)]',
                      alignClass[column.align ?? 'left'],
                      column.hideBelow ? hideClass[column.hideBelow] : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {canSort ? (
                      <button
                        type="button"
                        onClick={() => toggleSort(column)}
                        className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--foreground)]"
                      >
                        {column.header}
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.4}
                          strokeLinecap="round"
                          className={[
                            'size-3 transition-transform',
                            isSorted ? 'text-[var(--primary)]' : 'opacity-40',
                            isSorted && sort?.direction === 'desc' ? 'rotate-180' : '',
                          ].join(' ')}
                          aria-hidden="true"
                        >
                          <path d="m6 15 6-6 6 6" />
                        </svg>
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                );
              })}

              {hasActions ? (
                <th
                  scope="col"
                  className={[
                    headPadding,
                    'whitespace-nowrap text-right text-xs font-semibold uppercase tracking-wider text-[var(--muted)]',
                  ].join(' ')}
                >
                  {actionsHeader}
                </th>
              ) : null}
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--border)]">
            {loading
              ? Array.from({ length: loadingRows }).map((_, rowIndex) => (
                  <tr key={`skeleton-${rowIndex}`}>
                    {columns.map((column) => (
                      <td
                        key={column.key as string}
                        className={[rowPadding, column.hideBelow ? hideClass[column.hideBelow] : '']
                          .filter(Boolean)
                          .join(' ')}
                      >
                        <Skeleton className="h-3.5 w-3/4" />
                      </td>
                    ))}
                    {hasActions ? (
                      <td className={rowPadding}>
                        <Skeleton className="ml-auto h-3.5 w-10" />
                      </td>
                    ) : null}
                  </tr>
                ))
              : null}

            {!loading && rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (hasActions ? 1 : 0)}
                  className="px-4 py-12 text-center text-sm text-[var(--muted)]"
                >
                  {empty}
                </td>
              </tr>
            ) : null}

            {!loading
              ? rows.map((row, rowIndex) => {
                  const visibleActions = actions.filter((action) => !action.hidden?.(row));
                  const menuItems: DropdownItem[] = visibleActions.map((action, index) => ({
                    label: action.label,
                    icon: action.icon,
                    danger: action.danger,
                    disabled: action.disabled?.(row),
                    separatorBefore: action.danger && index > 0,
                    onClick: () => action.onClick(row),
                  }));

                  return (
                    <tr
                      key={keyFor(row, rowIndex)}
                      onClick={onRowClick ? () => onRowClick(row) : undefined}
                      className={[
                        hoverable ? 'transition-colors hover:bg-[var(--surface-muted)]/50' : '',
                        striped && rowIndex % 2 === 1 ? 'bg-[var(--surface-muted)]/25' : '',
                        onRowClick ? 'cursor-pointer' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {columns.map((column) => (
                        <td
                          key={column.key as string}
                          className={[
                            rowPadding,
                            'text-[var(--muted-foreground)]',
                            alignClass[column.align ?? 'left'],
                            column.type === 'number' || column.type === 'currency'
                              ? 'tabular-nums'
                              : '',
                            column.type === 'text' && column.align !== 'right'
                              ? 'text-[var(--foreground)]'
                              : '',
                            column.hideBelow ? hideClass[column.hideBelow] : '',
                            column.className ?? '',
                          ]
                            .filter(Boolean)
                            .join(' ')}
                        >
                          {column.render ? column.render(row, rowIndex) : cellText(row, column)}
                        </td>
                      ))}

                      {hasActions ? (
                        <td className={[rowPadding, 'text-right'].join(' ')}>
                          {renderActions ? (
                            renderActions(row)
                          ) : showMenu ? (
                            <DropdownMenu
                              align="end"
                              width="w-44"
                              items={menuItems}
                              trigger={
                                <button
                                  type="button"
                                  aria-label="Row actions"
                                  className="inline-flex size-8 items-center justify-center rounded-lg text-[var(--muted)] transition-colors hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
                                >
                                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
                                    <circle cx="12" cy="5" r="1.7" />
                                    <circle cx="12" cy="12" r="1.7" />
                                    <circle cx="12" cy="19" r="1.7" />
                                  </svg>
                                </button>
                              }
                            />
                          ) : (
                            <span className="inline-flex items-center gap-1">
                              {visibleActions.map((action) => (
                                <button
                                  key={action.label}
                                  type="button"
                                  disabled={action.disabled?.(row)}
                                  onClick={() => action.onClick(row)}
                                  className={[
                                    'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors disabled:opacity-40',
                                    action.danger
                                      ? 'text-[var(--danger)] hover:bg-[var(--danger)]/10'
                                      : 'text-[var(--primary)] hover:bg-[var(--primary)]/10',
                                  ].join(' ')}
                                >
                                  {action.icon}
                                  {action.label}
                                </button>
                              ))}
                            </span>
                          )}
                        </td>
                      ) : null}
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>

      {pageSize && !loading && sorted.length > pageSize ? (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--muted)]">
          <span>
            Showing {currentPage * pageSize + 1}–
            {Math.min((currentPage + 1) * pageSize, sorted.length)} of {sorted.length}
          </span>
          <span className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((value) => Math.max(0, value - 1))}
              disabled={currentPage === 0}
              className="rounded-lg border border-[var(--border)] px-3 py-1.5 font-medium transition-colors hover:border-[var(--primary)]/40 disabled:opacity-40"
            >
              Previous
            </button>
            <span className="tabular-nums">
              {currentPage + 1} / {pageCount}
            </span>
            <button
              type="button"
              onClick={() => setPage((value) => Math.min(pageCount - 1, value + 1))}
              disabled={currentPage >= pageCount - 1}
              className="rounded-lg border border-[var(--border)] px-3 py-1.5 font-medium transition-colors hover:border-[var(--primary)]/40 disabled:opacity-40"
            >
              Next
            </button>
          </span>
        </div>
      ) : null}

      {footer ? <div className="mt-3 text-xs text-[var(--muted)]">{footer}</div> : null}
    </div>
  );
}

export default DataTable;
