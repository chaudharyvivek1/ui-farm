import * as React from 'react';

export function Table({
  className = '',
  ...props
}: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-[var(--border)]">
      <table
        className={['w-full border-collapse text-left text-sm', className]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
    </div>
  );
}

export function TableHeader({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={['bg-[var(--surface-muted)]/60', className].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

export function TableBody({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      className={['divide-y divide-[var(--border)]', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
}

export function TableRow({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={['transition-colors hover:bg-[var(--surface-muted)]/50', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
}

export function TableHead({
  className = '',
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={[
        'whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
}

export function TableCell({
  className = '',
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={['px-4 py-3.5 text-[var(--muted-foreground)]', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
}

export function TableCaption({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLTableCaptionElement>) {
  return (
    <caption
      className={['px-4 py-3 text-left text-xs text-[var(--muted)]', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
}

export default Table;
