# EJS templates

Server-rendered partials for Express + EJS. Every template takes locals (props)
with sensible defaults, so you can include one with a single value or with a
full set.

## Setup

```js
// app.js
import express from 'express';
import path from 'node:path';

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/invoices', (req, res) => {
  res.render('invoices', {
    title: 'Invoices',
    rows: invoices,
  });
});
```

Copy `registry/css/ui-farm.css` to `public/css/ui-farm.css`, then copy the
partials you need into `views/partials/`.

## Layout

```ejs
<%- include('layout', {
  title: 'Invoices',
  content: '<h1>Invoices</h1>',
  nav: include('partials/nav', { brand: 'Acme', links: [
    { label: 'Invoices', href: '/invoices', active: true },
    { label: 'Clients', href: '/clients' },
  ]}),
}) %>
```

Because `content` is a string, the common pattern is to build the body in a
separate partial and pass it in, or to use the layout as a wrapper with
`<%- include('partials/page-header', {...}) %>` inside your own `views/page.ejs`.

## Partials and their locals

| Partial | Locals |
| --- | --- |
| `layout.ejs` | `title`, `description`, `theme` (dark/light), `stylesheet`, `nav`, `content`, `footer` |
| `partials/nav.ejs` | `brand`, `home`, `links[{label,href,active}]`, `actions` (html) |
| `partials/footer.ejs` | `brand`, `year` |
| `partials/page-header.ejs` | `title`, `subtitle`, `actions` (html) |
| `partials/breadcrumbs.ejs` | `items[{label,href}]` |
| `partials/button.ejs` | `label`, `href`, `variant`, `size`, `type`, `name`, `value`, `disabled`, `icon` |
| `partials/badge.ejs` | `label`, `tone`, `dot` |
| `partials/card.ejs` | `title`, `description`, `body` (html), `footer` (html), `interactive` |
| `partials/alert.ejs` | `tone` (info/success/warning/danger), `title`, `message` (html) |
| `partials/field.ejs` | `name`, `label`, `type`, `value`, `placeholder`, `hint`, `error`, `required`, `prefix`, `suffix`, `options`, `rows`, `step`, `min`, `max`, `maxlength`, `showCounter` |
| `partials/table.ejs` | `columns[{key,label,align,type}]`, `rows`, `caption`, `empty`, `actions[{label,href,danger}]`, `striped`, `dense` |
| `partials/pagination.ejs` | `page`, `pageCount`, `total`, `pageSize`, `baseUrl` |
| `partials/menu.ejs` | `label`, `items[{label,href,danger,disabled}]` |
| `partials/modal.ejs` | `id`, `title`, `body` (html), `confirmLabel`, `cancelLabel` |
| `partials/stats.ejs` | `items[{label,value}]` |
| `partials/empty-state.ejs` | `title`, `text`, `actionLabel`, `actionHref` |

## Example: a table page

```ejs
<%- include('partials/page-header', {
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
}) %>
```

`type` controls formatting: `currency` renders ₹ with Indian grouping, `date`
renders `12 Oct 2026`, `badge` renders a status pill. `:id` in an action href is
replaced with `row.id`.

## Notes

- No client JavaScript is required. The menu uses `<details>`, the modal uses
  native `<dialog>`, and the table is plain markup.
- Number and currency fields are plain inputs with `inputmode` set. For live
  formatting, add a small script using the same helpers as the React build
  (`components/ui/input-utils.ts` is dependency-free and can be imported by a
  bundler, or copied into `public/js`).
- Every partial escapes output with `<%= %>`; use `<%- %>` only for the locals
  documented as HTML.
