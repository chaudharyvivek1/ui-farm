/**
 * Minimal Express + EJS example for the UI Farm templates.
 *
 *   cd registry/ejs/example
 *   npm install express ejs
 *   node server.js        → http://localhost:3000/invoices
 */
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(here, 'views'));
app.use(express.static(path.join(here, 'public')));

const invoices = [
  { id: 'INV-2041', client: 'Meridian Retail', amount: 124000, due: '2026-10-12', status: 'Paid' },
  { id: 'INV-2042', client: 'Kavya Textiles', amount: 86500, due: '2026-10-18', status: 'Pending' },
  { id: 'INV-2043', client: 'Orbit Logistics', amount: 210000, due: '2026-10-21', status: 'Paid' },
  { id: 'INV-2044', client: 'Sunrise Foods', amount: 42000, due: '2026-09-30', status: 'Overdue' },
];

app.get('/invoices', (req, res) => {
  res.render('invoices', {
    title: 'Invoices',
    invoices,
    total: invoices.length,
    page: 1,
    pageCount: 1,
    pageSize: 10,
  });
});

app.listen(3000, () => console.log('http://localhost:3000/invoices'));
