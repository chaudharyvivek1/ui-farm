import * as React from 'react';

export function Preview({
  children,
  className = '',
  label = 'Preview',
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
          {label}
        </span>
        <span className="flex items-center gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-[var(--danger)]/50" />
          <span className="size-2 rounded-full bg-[var(--warning)]/50" />
          <span className="size-2 rounded-full bg-[var(--success)]/50" />
        </span>
      </div>
      <div
        className={[
          'bg-dot-pattern relative p-6 sm:p-8',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </div>
    </div>
  );
}

export function PropsTable({
  rows,
}: {
  rows: { name: string; type: string; defaultValue?: string; description: string }[];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="bg-[var(--surface-muted)]/60">
            <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Prop
            </th>
            <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Type
            </th>
            <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Default
            </th>
            <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]">
          {rows.map((row) => (
            <tr key={row.name}>
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-[var(--foreground)]">
                {row.name}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-[var(--primary)]">{row.type}</td>
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-[var(--muted)]">
                {row.defaultValue ?? '—'}
              </td>
              <td className="px-4 py-3 text-[var(--muted-foreground)]">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Preview;
