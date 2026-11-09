/**
 * data-table — JavaScript version.
 * Generated from the TypeScript source by scripts/build-snippets.mjs.
 */
"use client";
import * as React from "react";
import { Badge } from "./badge";
import { DropdownMenu } from "./dropdown-menu";
import { Skeleton } from "./skeleton";
import { formatCurrency, formatNumber } from "./input-utils";
const alignClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right"
};
const hideClass = {
  sm: "hidden sm:table-cell",
  md: "hidden md:table-cell",
  lg: "hidden lg:table-cell"
};
function valueOf(row, key) {
  return row[key];
}
function cellText(row, column) {
  const value = valueOf(row, column.key);
  if (value === null || value === void 0 || value === "") return "\u2014";
  switch (column.type) {
    case "number":
      return formatNumber(value);
    case "currency":
      return formatCurrency(value);
    case "date":
      return new Date(value).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });
    case "badge": {
      const label = String(value);
      const tone = column.badgeTones?.[label] ?? "default";
      return <Badge variant={tone} dot>
          {label}
        </Badge>;
    }
    default:
      return String(value);
  }
}
function DataTable({
  columns,
  data,
  rowKey,
  actions = [],
  actionsHeader = "Actions",
  actionsVariant = "auto",
  renderActions,
  caption,
  loading = false,
  loadingRows = 5,
  empty = "No records yet.",
  striped = false,
  dense = false,
  hoverable = true,
  stickyHeader = false,
  sortable = false,
  defaultSort,
  pageSize,
  onRowClick,
  footer,
  className = ""
}) {
  const [sort, setSort] = React.useState(defaultSort ?? null);
  const [page, setPage] = React.useState(0);
  const sorted = React.useMemo(() => {
    if (!sort) return data;
    const copy = [...data];
    copy.sort((a, b) => {
      const left = valueOf(a, sort.key);
      const right = valueOf(b, sort.key);
      if (left === right) return 0;
      const result = left > right ? 1 : -1;
      return sort.direction === "asc" ? result : -result;
    });
    return copy;
  }, [data, sort]);
  const pageCount = pageSize ? Math.max(1, Math.ceil(sorted.length / pageSize)) : 1;
  const currentPage = Math.min(page, pageCount - 1);
  const rows = pageSize ? sorted.slice(currentPage * pageSize, currentPage * pageSize + pageSize) : sorted;
  function toggleSort(column) {
    if (!sortable || !column.sortable) return;
    setPage(0);
    setSort((current) => {
      if (current?.key !== column.key) return { key: column.key, direction: "asc" };
      return { key: column.key, direction: current.direction === "asc" ? "desc" : "asc" };
    });
  }
  function keyFor(row, index) {
    if (typeof rowKey === "function") return rowKey(row);
    if (typeof rowKey === "string") return String(valueOf(row, rowKey));
    return index;
  }
  const hasActions = Boolean(renderActions) || actions.length > 0;
  const showMenu = actionsVariant === "menu" || actionsVariant === "auto" && actions.length > 2;
  const rowPadding = dense ? "px-4 py-2" : "px-4 py-3.5";
  const headPadding = dense ? "px-4 py-2" : "px-4 py-3";
  return <div className={["w-full", className].filter(Boolean).join(" ")}>
      <div className="w-full overflow-x-auto rounded-2xl border border-[var(--border)]">
        <table className="w-full border-collapse text-left text-sm">
          {caption ? <caption className="border-b border-[var(--border)] px-4 py-2.5 text-left text-xs text-[var(--muted)]">
              {caption}
            </caption> : null}

          <thead className={stickyHeader ? "sticky top-0 z-10" : void 0}>
            <tr className="bg-[var(--surface-muted)]/60">
              {columns.map((column) => {
    const isSorted = sort?.key === column.key;
    const canSort = sortable && column.sortable;
    return <th
      key={column.key}
      scope="col"
      style={column.width ? { width: column.width } : void 0}
      aria-sort={isSorted ? sort?.direction === "asc" ? "ascending" : "descending" : void 0}
      className={[
        headPadding,
        "whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-[var(--muted)]",
        alignClass[column.align ?? "left"],
        column.hideBelow ? hideClass[column.hideBelow] : ""
      ].filter(Boolean).join(" ")}
    >
                    {canSort ? <button
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
        "size-3 transition-transform",
        isSorted ? "text-[var(--primary)]" : "opacity-40",
        isSorted && sort?.direction === "desc" ? "rotate-180" : ""
      ].join(" ")}
      aria-hidden="true"
    >
                          <path d="m6 15 6-6 6 6" />
                        </svg>
                      </button> : column.header}
                  </th>;
  })}

              {hasActions ? <th
    scope="col"
    className={[
      headPadding,
      "whitespace-nowrap text-right text-xs font-semibold uppercase tracking-wider text-[var(--muted)]"
    ].join(" ")}
  >
                  {actionsHeader}
                </th> : null}
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--border)]">
            {loading ? Array.from({ length: loadingRows }).map((_, rowIndex) => <tr key={`skeleton-${rowIndex}`}>
                    {columns.map((column) => <td
    key={column.key}
    className={[rowPadding, column.hideBelow ? hideClass[column.hideBelow] : ""].filter(Boolean).join(" ")}
  >
                        <Skeleton className="h-3.5 w-3/4" />
                      </td>)}
                    {hasActions ? <td className={rowPadding}>
                        <Skeleton className="ml-auto h-3.5 w-10" />
                      </td> : null}
                  </tr>) : null}

            {!loading && rows.length === 0 ? <tr>
                <td
    colSpan={columns.length + (hasActions ? 1 : 0)}
    className="px-4 py-12 text-center text-sm text-[var(--muted)]"
  >
                  {empty}
                </td>
              </tr> : null}

            {!loading ? rows.map((row, rowIndex) => {
    const visibleActions = actions.filter((action) => !action.hidden?.(row));
    const menuItems = visibleActions.map((action, index) => ({
      label: action.label,
      icon: action.icon,
      danger: action.danger,
      disabled: action.disabled?.(row),
      separatorBefore: action.danger && index > 0,
      onClick: () => action.onClick(row)
    }));
    return <tr
      key={keyFor(row, rowIndex)}
      onClick={onRowClick ? () => onRowClick(row) : void 0}
      className={[
        hoverable ? "transition-colors hover:bg-[var(--surface-muted)]/50" : "",
        striped && rowIndex % 2 === 1 ? "bg-[var(--surface-muted)]/25" : "",
        onRowClick ? "cursor-pointer" : ""
      ].filter(Boolean).join(" ")}
    >
                      {columns.map((column) => <td
      key={column.key}
      className={[
        rowPadding,
        "text-[var(--muted-foreground)]",
        alignClass[column.align ?? "left"],
        column.type === "number" || column.type === "currency" ? "tabular-nums" : "",
        column.type === "text" && column.align !== "right" ? "text-[var(--foreground)]" : "",
        column.hideBelow ? hideClass[column.hideBelow] : "",
        column.className ?? ""
      ].filter(Boolean).join(" ")}
    >
                          {column.render ? column.render(row, rowIndex) : cellText(row, column)}
                        </td>)}

                      {hasActions ? <td className={[rowPadding, "text-right"].join(" ")}>
                          {renderActions ? renderActions(row) : showMenu ? <DropdownMenu
      align="end"
      width="w-44"
      items={menuItems}
      trigger={<button
        type="button"
        aria-label="Row actions"
        className="inline-flex size-8 items-center justify-center rounded-lg text-[var(--muted)] transition-colors hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
      >
                                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
                                    <circle cx="12" cy="5" r="1.7" />
                                    <circle cx="12" cy="12" r="1.7" />
                                    <circle cx="12" cy="19" r="1.7" />
                                  </svg>
                                </button>}
    /> : <span className="inline-flex items-center gap-1">
                              {visibleActions.map((action) => <button
      key={action.label}
      type="button"
      disabled={action.disabled?.(row)}
      onClick={() => action.onClick(row)}
      className={[
        "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors disabled:opacity-40",
        action.danger ? "text-[var(--danger)] hover:bg-[var(--danger)]/10" : "text-[var(--primary)] hover:bg-[var(--primary)]/10"
      ].join(" ")}
    >
                                  {action.icon}
                                  {action.label}
                                </button>)}
                            </span>}
                        </td> : null}
                    </tr>;
  }) : null}
          </tbody>
        </table>
      </div>

      {pageSize && !loading && sorted.length > pageSize ? <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--muted)]">
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
        </div> : null}

      {footer ? <div className="mt-3 text-xs text-[var(--muted)]">{footer}</div> : null}
    </div>;
}
var stdin_default = DataTable;
export {
  DataTable,
  stdin_default as default
};
