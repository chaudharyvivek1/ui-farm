import { Badge } from '@/components/ui/badge';
import { CodeTabs } from '@/components/site/code-tabs';
import { highlight } from '@/lib/highlight';

const tailwind = `/* globals.css — Tailwind v4 */
@import "tailwindcss";
@import "./theme.css";   /* the tokens */

/* the components use arbitrary values, so nothing else is needed:
   <Button variant="primary" />  →  bg-[var(--primary)] text-[var(--primary-foreground)] */`;

const rawCss = `<!-- plain HTML, no framework -->
<link rel="stylesheet" href="/css/ui-farm.css" />

<button class="uif-btn uif-btn--primary">Start a project</button>
<span class="uif-badge uif-badge--success"><span class="uif-badge__dot"></span>Active</span>
<div class="uif-card">
  <h3 class="uif-card__title">Orbit ERP</h3>
  <p class="uif-card__desc">Inventory, payroll and reporting.</p>
</div>`;

const bootstrap = `<!-- Bootstrap 5, then the two UI Farm files -->
<link rel="stylesheet" href="/css/bootstrap.min.css" />
<link rel="stylesheet" href="/css/ui-farm.css" />
<link rel="stylesheet" href="/css/ui-farm-bootstrap.css" />

<!-- the same markup, now inheriting your Bootstrap theme -->
<button class="uif-btn uif-btn--primary">Start a project</button>

<!-- or mix: use Bootstrap where it is enough -->
<button class="btn btn-primary">Bootstrap button</button>`;

const mui = `// theme.ts
import { createTheme } from '@mui/material/styles';
export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#3b82f6' },
    background: { default: '#020817', paper: '#0f172a' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 999, textTransform: 'none' } } },
  },
});

// App.tsx
<ThemeProvider theme={theme}>
  <CssBaseline />
  <Button variant="contained">Start a project</Button>
</ThemeProvider>`;

const rows = [
  { name: 'Tailwind CSS v4 / v3.4', where: 'React, Next.js and Angular components', what: 'The default. Utilities read CSS variables, so no config and no dark: variants.' },
  { name: 'Plain CSS', where: 'EJS templates, plain HTML, any server-rendered app', what: 'registry/css/ui-farm.css — semantic uif-* classes on the same tokens.' },
  { name: 'Bootstrap 5', where: 'Existing Bootstrap apps', what: 'registry/bootstrap/ui-farm-bootstrap.css maps the tokens onto --bs-* variables.' },
  { name: 'Material UI', where: 'React apps already on MUI', what: 'registry/mui/theme.ts — a createTheme that matches the palette and radii.' },
];

export const metadata = {
  title: 'Styling options',
  description: 'Use the same components with Tailwind, plain CSS, Bootstrap or Material UI.',
};

export default async function StylingGuide() {
  const [tailwindHtml, rawHtml, bootstrapHtml, muiHtml] = await Promise.all([
    highlight(tailwind, 'css'),
    highlight(rawCss, 'html'),
    highlight(bootstrap, 'html'),
    highlight(mui, 'tsx'),
  ]);

  return (
    <article className="max-w-4xl">
      <Badge variant="accent">Guides</Badge>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Styling options</h1>
      <p className="mt-3 text-[var(--muted-foreground)]">
        The components are markup plus tokens; the styling system is a choice. Pick the one your
        project already uses — the colours, radii and spacing come out the same.
      </p>

      <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm leading-relaxed text-[var(--muted-foreground)]">
        Every component page carries the same four-way switch. Pick a system and it lists the
        exact class — or MUI component — for each element of that component, with a copy button on
        every row, so you never have to guess which class a variant becomes.
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-[var(--border)]">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-[var(--surface-muted)]/60">
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">System</th>
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Use it with</th>
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">What you copy</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {rows.map((row) => (
              <tr key={row.name}>
                <td className="whitespace-nowrap px-4 py-3 font-medium text-[var(--foreground)]">{row.name}</td>
                <td className="px-4 py-3 text-[var(--muted-foreground)]">{row.where}</td>
                <td className="px-4 py-3 text-[var(--muted)]">{row.what}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-xl font-bold tracking-tight">Tailwind</h2>
      <div className="mt-4">
        <CodeTabs
          variants={[{ id: 'css', label: 'CSS', framework: 'Tailwind', filename: 'globals.css', html: tailwindHtml, plain: tailwind }]}
        />
      </div>

      <h2 className="mt-10 text-xl font-bold tracking-tight">Plain CSS</h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
        One stylesheet, semantic classes, no build step. This is what the EJS templates use, and it
        works in any server-rendered page.
      </p>
      <div className="mt-4">
        <CodeTabs
          variants={[{ id: 'html', label: 'HTML', framework: 'Plain CSS', filename: 'index.html', html: rawHtml, plain: rawCss }]}
        />
      </div>

      <h2 className="mt-10 text-xl font-bold tracking-tight">Bootstrap 5</h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
        Load Bootstrap first, then the UI Farm stylesheet, then the bridge. The bridge points the
        tokens at Bootstrap&apos;s own variables, so the components follow your Bootstrap theme —
        including <code className="rounded bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-xs">data-bs-theme=&quot;dark&quot;</code>.
        Mix <code className="rounded bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-xs">.btn</code> and{' '}
        <code className="rounded bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-xs">.uif-btn</code> freely.
      </p>
      <div className="mt-4">
        <CodeTabs
          variants={[{ id: 'html', label: 'HTML', framework: 'Bootstrap', filename: 'index.html', html: bootstrapHtml, plain: bootstrap }]}
        />
      </div>

      <h2 className="mt-10 text-xl font-bold tracking-tight">Material UI</h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
        For React apps already on MUI. The theme maps the palette and radii so MUI components and
        copied UI Farm components look like one system. A ready-made{' '}
        <code className="rounded bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-xs">uiFarmTheme</code> and{' '}
        <code className="rounded bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-xs">uiFarmLightTheme</code>{' '}
        live in <code className="rounded bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-xs">registry/mui/theme.ts</code>.
      </p>
      <div className="mt-4">
        <CodeTabs
          variants={[{ id: 'tsx', label: 'TypeScript', framework: 'MUI', filename: 'theme.ts', html: muiHtml, plain: mui }]}
        />
      </div>

      <h2 className="mt-10 text-xl font-bold tracking-tight">Mixing them</h2>
      <div className="prose-docs mt-3 space-y-3">
        <p>
          Because every system reads the same token names, a page can hold a Bootstrap navbar, a
          MUI dialog and a UI Farm data table without three different greys. Override{' '}
          <code>--primary</code> once and all three follow.
        </p>
        <p>
          The one rule: do not load Tailwind&apos;s preflight and Bootstrap&apos;s reboot on the same
          page. Pick one reset — that is the only genuine conflict between these systems.
        </p>
      </div>
    </article>
  );
}
