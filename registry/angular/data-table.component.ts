import { Component, computed, input, output, signal } from '@angular/core';
import { DropdownItem, DropdownMenuComponent } from './dropdown-menu.component';

export type ColumnType = 'text' | 'number' | 'currency' | 'date' | 'badge';

export interface DataTableColumn {
  key: string;
  header: string;
  align?: 'left' | 'center' | 'right';
  width?: string;
  sortable?: boolean;
  type?: ColumnType;
  badgeTones?: Record<string, string>;
  hideBelow?: 'sm' | 'md' | 'lg';
}

export interface DataTableAction {
  label: string;
  danger?: boolean;
  id?: string;
}

const formatIndian = (value: number, decimals: number) => {
  const fixed = Math.abs(value).toFixed(decimals);
  const [whole, fraction] = fixed.split('.');
  let grouped = whole;
  if (whole.length > 3) {
    grouped = `${whole.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',')},${whole.slice(-3)}`;
  }
  return fraction ? `${grouped}.${fraction}` : grouped;
};

const TONES: Record<string, string> = {
  success: 'border-[var(--success)]/25 bg-[var(--success)]/12 text-[var(--success)]',
  warning: 'border-[var(--warning)]/25 bg-[var(--warning)]/12 text-[var(--warning)]',
  danger: 'border-[var(--danger)]/25 bg-[var(--danger)]/12 text-[var(--danger)]',
  primary: 'border-[var(--primary)]/25 bg-[var(--primary)]/12 text-[var(--primary)]',
  default: 'border-[var(--border)] bg-[var(--surface-muted)] text-[var(--foreground)]',
};

@Component({
  selector: 'uif-data-table',
  standalone: true,
  imports: [DropdownMenuComponent],
  template: `
    <div class="w-full overflow-x-auto rounded-2xl border border-[var(--border)]">
      <table class="w-full border-collapse text-left text-sm">
        @if (caption()) {
          <caption class="border-b border-[var(--border)] px-4 py-2.5 text-left text-xs text-[var(--muted)]">{{ caption() }}</caption>
        }

        <thead>
          <tr class="bg-[var(--surface-muted)]/60">
            @for (column of columns(); track column.key) {
              <th
                scope="col"
                [style.width]="column.width || null"
                [attr.aria-sort]="ariaSort(column)"
                [class]="headClasses(column)"
              >
                @if (sortable() && column.sortable) {
                  <button type="button" class="inline-flex items-center gap-1.5 hover:text-[var(--foreground)]" (click)="toggleSort(column)">
                    {{ column.header }}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"
                      [class]="'size-3 ' + (sort()?.key === column.key ? 'text-[var(--primary)]' : 'opacity-40') + (sort()?.key === column.key && sort()?.direction === 'desc' ? ' rotate-180' : '')"
                      aria-hidden="true"><path d="m6 15 6-6 6 6" /></svg>
                  </button>
                } @else {
                  {{ column.header }}
                }
              </th>
            }
            @if (actions().length) {
              <th scope="col" class="whitespace-nowrap px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                {{ actionsHeader() }}
              </th>
            }
          </tr>
        </thead>

        <tbody class="divide-y divide-[var(--border)]">
          @if (loading()) {
            @for (row of skeletonRows(); track $index) {
              <tr>
                @for (column of columns(); track column.key) {
                  <td [class]="cellPadding()"><div class="h-3.5 w-3/4 animate-pulse rounded bg-[var(--surface-muted)]"></div></td>
                }
                @if (actions().length) { <td [class]="cellPadding()"></td> }
              </tr>
            }
          } @else if (sortedRows().length === 0) {
            <tr>
              <td [attr.colspan]="columns().length + (actions().length ? 1 : 0)" class="px-4 py-12 text-center text-sm text-[var(--muted)]">
                {{ empty() }}
              </td>
            </tr>
          } @else {
            @for (row of pagedRows(); track $index) {
              <tr class="transition-colors hover:bg-[var(--surface-muted)]/50">
                @for (column of columns(); track column.key) {
                  <td [class]="cellClasses(column)">
                    @switch (column.type) {
                      @case ('currency') { {{ asCurrency(row[column.key]) }} }
                      @case ('number') { {{ asNumber(row[column.key]) }} }
                      @case ('date') { {{ asDate(row[column.key]) }} }
                      @case ('badge') {
                        <span [class]="'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ' + badgeClass(column, row[column.key])">
                          <span class="size-1.5 rounded-full bg-current" aria-hidden="true"></span>
                          {{ row[column.key] }}
                        </span>
                      }
                      @default { {{ row[column.key] }} }
                    }
                  </td>
                }
                @if (actions().length) {
                  <td class="px-4 py-3.5 text-right">
                    @if (actions().length > 2) {
                      <uif-dropdown-menu [items]="menuItems()" (click)="$event.stopPropagation()" />
                    } @else {
                      @for (action of actions(); track action.label) {
                        <button
                          type="button"
                          [class]="'rounded-lg px-2.5 py-1.5 text-xs font-medium ' + (action.danger ? 'text-[var(--danger)] hover:bg-[var(--danger)]/10' : 'text-[var(--primary)] hover:bg-[var(--primary)]/10')"
                          (click)="actionClicked.emit({ action: action.label, row })"
                        >{{ action.label }}</button>
                      }
                    }
                  </td>
                }
              </tr>
            }
          }
        </tbody>
      </table>
    </div>

    @if (pageSize() && sortedRows().length > pageSize()) {
      <div class="mt-3 flex items-center justify-between text-xs text-[var(--muted)]">
        <span>Showing {{ page() * pageSize() + 1 }}–{{ min((page() + 1) * pageSize(), sortedRows().length) }} of {{ sortedRows().length }}</span>
        <span class="flex items-center gap-2">
          <button type="button" class="rounded-lg border border-[var(--border)] px-3 py-1.5 disabled:opacity-40" [disabled]="page() === 0" (click)="page.set(page() - 1)">Previous</button>
          <button type="button" class="rounded-lg border border-[var(--border)] px-3 py-1.5 disabled:opacity-40" [disabled]="(page() + 1) * pageSize() >= sortedRows().length" (click)="page.set(page() + 1)">Next</button>
        </span>
      </div>
    }
  `,
})
export class DataTableComponent {
  readonly columns = input<DataTableColumn[]>([]);
  readonly data = input<Record<string, unknown>[]>([]);
  readonly actions = input<DataTableAction[]>([]);
  readonly actionsHeader = input('Actions');
  readonly caption = input('');
  readonly loading = input(false);
  readonly empty = input('No records yet.');
  readonly sortable = input(false);
  readonly pageSize = input(0);
  readonly dense = input(false);

  readonly actionClicked = output<{ action: string; row: Record<string, unknown> }>();

  readonly sort = signal<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  readonly page = signal(0);

  readonly skeletonRows = computed(() => Array.from({ length: 4 }));

  readonly cellPadding = computed(() => (this.dense() ? 'px-4 py-2' : 'px-4 py-3.5'));

  readonly sortedRows = computed(() => {
    const current = this.sort();
    if (!current) return this.data();
    return [...this.data()].sort((a, b) => {
      const left = a[current.key] as never;
      const right = b[current.key] as never;
      if (left === right) return 0;
      const result = left > right ? 1 : -1;
      return current.direction === 'asc' ? result : -result;
    });
  });

  readonly pagedRows = computed(() => {
    const size = this.pageSize();
    if (!size) return this.sortedRows();
    const start = this.page() * size;
    return this.sortedRows().slice(start, start + size);
  });

  readonly menuItems = computed<DropdownItem[]>(() =>
    this.actions().map((action, index) => ({
      label: action.label,
      danger: action.danger,
      separatorBefore: action.danger && index > 0,
    })),
  );

  toggleSort(column: DataTableColumn): void {
    const current = this.sort();
    this.page.set(0);
    if (current?.key !== column.key) {
      this.sort.set({ key: column.key, direction: 'asc' });
      return;
    }
    this.sort.set({ key: column.key, direction: current.direction === 'asc' ? 'desc' : 'asc' });
  }

  ariaSort(column: DataTableColumn): string | null {
    if (this.sort()?.key !== column.key) return null;
    return this.sort()?.direction === 'asc' ? 'ascending' : 'descending';
  }

  headClasses(column: DataTableColumn): string {
    return [
      'whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]',
      column.align === 'right' ? 'text-right' : column.align === 'center' ? 'text-center' : 'text-left',
      column.hideBelow === 'sm' ? 'hidden sm:table-cell' : column.hideBelow === 'md' ? 'hidden md:table-cell' : '',
    ].join(' ');
  }

  cellClasses(column: DataTableColumn): string {
    return [
      this.cellPadding(),
      'text-[var(--muted-foreground)]',
      column.align === 'right' ? 'text-right' : column.align === 'center' ? 'text-center' : 'text-left',
      column.type === 'number' || column.type === 'currency' ? 'tabular-nums' : '',
      column.type === 'text' ? 'text-[var(--foreground)]' : '',
    ].join(' ');
  }

  badgeClass(column: DataTableColumn, value: unknown): string {
    const tone = column.badgeTones?.[String(value)] ?? 'default';
    return TONES[tone] ?? TONES.default;
  }

  asCurrency(value: unknown): string {
    const numeric = Number(value);
    return Number.isNaN(numeric) ? '—' : `₹${formatIndian(numeric, 2)}`;
  }

  asNumber(value: unknown): string {
    const numeric = Number(value);
    return Number.isNaN(numeric) ? '—' : formatIndian(numeric, 0);
  }

  asDate(value: unknown): string {
    const date = new Date(String(value));
    return Number.isNaN(date.getTime())
      ? '—'
      : date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  min(a: number, b: number): number {
    return Math.min(a, b);
  }
}
