import { Component } from '@angular/core';

@Component({
  selector: 'uif-table',
  standalone: true,
  template: `
    <div class="w-full overflow-x-auto rounded-2xl border border-[var(--border)]">
      <table class="w-full border-collapse text-left text-sm">
        <ng-content />
      </table>
    </div>
  `,
})
export class TableComponent {}

@Component({
  selector: 'uif-th',
  standalone: true,
  template: `
    <th class="whitespace-nowrap bg-[var(--surface-muted)]/60 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
      <ng-content />
    </th>
  `,
})
export class TableHeadComponent {}

@Component({
  selector: 'uif-td',
  standalone: true,
  template: `
    <td class="border-t border-[var(--border)] px-4 py-3.5 text-[var(--muted-foreground)]">
      <ng-content />
    </td>
  `,
})
export class TableCellComponent {}
