import { Badge } from '@/components/ui/badge';
import { CodeTabs } from '@/components/site/code-tabs';
import { highlight } from '@/lib/highlight';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();

async function read(relative: string) {
  return readFile(path.join(/* turbopackIgnore: true */ root, relative), 'utf8');
}

const setup = `// app.js — Express + EJS
import express from 'express';
import path from 'node:path';

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));
app.use(express.static('public'));        // public/css/ui-farm.css lives here
app.use(express.urlencoded({ extended: true }));

app.get('/invoices', (req, res) => {
  res.render('invoices', {
    title: 'Invoices',
    invoices: rows,
    total: rows.length,
    page: 1,
    pageCount: 1,
    pageSize: 10,
  });
});

app.listen(3000);`;

const usage = `<%- include('partials/page-header', {
  title: 'Invoices',
  subtitle: 'October 2026',
  actions: include('partials/button', { label: 'New invoice', href: '/invoices/new' }),
}) %>

<%- include('partials/table', {
  caption: 'Invoices raised in October 2026.',
  columns: [
    { key: 'id', label: 'Invoice', type: 'text' },
    { key: 'client', label: 'Client', type: 'text' },
    { key: 'amount', label: 'Amount', type: 'currency', align: 'right' },
    { key: 'due', label: 'Due', type: 'date' },
    { key: 'status', label: 'Status', type: 'badge' },
  ],
  rows: invoices,
  actions: [
    { label: 'View', href: '/invoices/:id' },
    { label: 'Delete', href: '/invoices/:id/delete', danger: true },
  ],
}) %>`;

const locals = [
  { partial: 'layout.ejs', accepts: 'title, description, theme, stylesheet, nav, content, footer' },
  { partial: 'nav.ejs', accepts: 'brand, home, links[{label,href,active}], actions' },
  { partial: 'page-header.ejs', accepts: 'title, subtitle, actions' },
  { partial: 'breadcrumbs.ejs', accepts: 'items[{label,href}]' },
  { partial: 'button.ejs', accepts: 'label, href, variant, size, type, disabled, icon' },
  { partial: 'badge.ejs', accepts: 'label, tone, dot' },
  { partial: 'card.ejs', accepts: 'title, description, body, footer, interactive' },
  { partial: 'alert.ejs', accepts: 'tone, title, message' },
  { partial: 'field.ejs', accepts: 'name, label, type, value, hint, error, prefix, suffix, options, rows, maxlength, showCounter' },
  { partial: 'table.ejs', accepts: 'columns[{key,label,align,type}], rows, caption, empty, actions, striped, dense' },
  { partial: 'pagination.ejs', accepts: 'page, pageCount, total, pageSize, baseUrl' },
  { partial: 'menu.ejs', accepts: 'label, items[{label,href,danger,disabled}]' },
  { partial: 'modal.ejs', accepts: 'id, title, body, confirmLabel, cancelLabel' },
  { partial: 'stats.ejs', accepts: 'items[{label,value}]' },
  { partial: 'empty-state.ejs', accepts: 'title, text, actionLabel, actionHref' },
];

export const metadata = {
  title: 'Templates (EJS)',
  description: 'Server-rendered partials for Express and EJS.',
};

export default async function EjsGuide() {
  const [setupHtml, usageHtml, tableHtml, fieldHtml] = await Promise.all([
    highlight(setup, 'ts'),
    highlight(usage, 'html'),
    read('registry/ejs/partials/table.ejs').then((source) => highlight(source, 'html')),
    read('registry/ejs/partials/field.ejs').then((source) => highlight(source, 'html')),
  ]);

  const tableSource = await read('registry/ejs/partials/table.ejs');
  const fieldSource = await read('registry/ejs/partials/field.ejs');

  return (
    <article className="max-w-4xl">
      <Badge variant="accent">Templates</Badge>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">EJS templates</h1>
      <p className="mt-3 text-[var(--muted-foreground)]">
        Sixteen partials for Express + EJS, each taking locals instead of being copied and
        rewritten. They use the plain-CSS build, so they need no Tailwind and no client
        JavaScript — the menu is a {'<details>'} element and the modal is a native {'<dialog>'}.
      </p>

      <h2 className="mt-10 text-xl font-bold tracking-tight">1. Set up Express</h2>
      <div className="mt-4">
        <CodeTabs
          variants={[
            { id: 'js', label: 'JavaScript', framework: 'Express', filename: 'app.js', html: setupHtml, plain: setup },
          ]}
        />
      </div>

      <h2 className="mt-10 text-xl font-bold tracking-tight">2. Copy the stylesheet</h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
        Copy <code className="rounded bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-xs">registry/css/ui-farm.css</code>{' '}
        to <code className="rounded bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-xs">public/css/ui-farm.css</code>,
        and the partials you need to <code className="rounded bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-xs">views/partials/</code>.
      </p>

      <h2 className="mt-10 text-xl font-bold tracking-tight">3. Compose a page</h2>
      <div className="mt-4">
        <CodeTabs
          variants={[
            { id: 'ejs', label: 'EJS', framework: 'Express', filename: 'views/invoices.ejs', html: usageHtml, plain: usage },
          ]}
        />
      </div>

      <h2 className="mt-10 text-xl font-bold tracking-tight">Partials and their locals</h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-[var(--border)]">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-[var(--surface-muted)]/60">
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Partial</th>
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Locals</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {locals.map((row) => (
              <tr key={row.partial}>
                <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs text-[var(--foreground)]">{row.partial}</td>
                <td className="px-4 py-2.5 text-[var(--muted-foreground)]">{row.accepts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-xl font-bold tracking-tight">The table partial</h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
        Same idea as the React DataTable, in EJS: columns and rows in, formatted cells out.
        <code className="mx-1 rounded bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-xs">type</code>
        handles currency (₹ with Indian grouping), dates and status badges; actions become a
        trailing column, with <code className="rounded bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-xs">:id</code>{' '}
        replaced from the row.
      </p>
      <div className="mt-4">
        <CodeTabs
          variants={[
            { id: 'ejs', label: 'EJS', framework: 'Partial', filename: 'partials/table.ejs', html: tableHtml, plain: tableSource },
          ]}
        />
      </div>

      <h2 className="mt-10 text-xl font-bold tracking-tight">The field partial</h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
        One partial covers text, number, currency, phone, password, select and textarea — the
        type picks the markup, and the label, hint, error and counter come along.
      </p>
      <div className="mt-4">
        <CodeTabs
          variants={[
            { id: 'ejs', label: 'EJS', framework: 'Partial', filename: 'partials/field.ejs', html: fieldHtml, plain: fieldSource },
          ]}
        />
      </div>

      <h2 className="mt-10 text-xl font-bold tracking-tight">Live formatting on the server side</h2>
      <div className="prose-docs mt-3 space-y-3">
        <p>
          The partials format on render, so a table is readable with JavaScript disabled. If you
          also want live grouping while typing, copy{' '}
          <code>components/ui/input-utils.ts</code> into your project — it has no React imports and
          runs in the browser or in Node.
        </p>
      </div>
    </article>
  );
}
