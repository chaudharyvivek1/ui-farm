# Theming

UI Farm reads every colour, radius and shadow from CSS variables. Nothing is
hard-coded inside a component, which is why the same markup works in React and in
Angular and why both themes work without duplicating classes.

## Setup

Copy `registry/theme.css` into your project and import it **after** Tailwind:

```css
/* globals.css */
@import "tailwindcss";   /* Tailwind v4 */
@import "./theme.css";   /* UI Farm tokens */
```

With Tailwind v3, add the same import to your existing entry stylesheet, after
`@tailwind base`.

## Token reference

| Token | Dark | Light | Used for |
| --- | --- | --- | --- |
| `--background` | `#020817` | `#ffffff` | Page background |
| `--foreground` | `#f8fafc` | `#0f172a` | Primary text |
| `--surface` | `#0f172a` | `#f8fafc` | Cards, panels, fields |
| `--surface-muted` | `#1e293b` | `#f1f5f9` | Hover states, chips, table headers |
| `--border` | `rgba(148,163,184,.15)` | `rgba(15,23,42,.1)` | Every hairline |
| `--primary` | `#3b82f6` | `#2563eb` | Primary actions, links, focus rings |
| `--primary-foreground` | `#ffffff` | `#ffffff` | Text on primary |
| `--secondary` | `#0ea5e9` | `#0284c7` | Secondary actions |
| `--accent` | `#14b8a6` | `#0d9488` | Highlights, confirmations |
| `--muted` | `#94a3b8` | `#64748b` | Secondary text, icons |
| `--muted-foreground` | `#cbd5e1` | `#475569` | Body copy on a surface |
| `--danger` | `#ef4444` | `#dc2626` | Errors, destructive actions |
| `--success` | `#22c55e` | `#16a34a` | Success states |
| `--warning` | `#f59e0b` | `#d97706` | Cautions |

Radii: `--radius-sm` 0.5rem, `--radius-md` 0.75rem, `--radius-lg` 1rem,
`--radius-xl` 1.5rem. Shadows: `--shadow-sm`, `--shadow-md`, `--shadow-lg`.

## Dark and light

Dark is the default (`:root`). Light is applied with `data-theme="light"` on the
`<html>` element. Set it before the first paint so there is no flash:

```tsx
// app/layout.tsx
const themeScript = `(function(){try{
  var t = localStorage.getItem('ui-farm-theme');
  if (t === 'light' || (!t && window.matchMedia('(prefers-color-scheme: light)').matches)) {
    document.documentElement.dataset.theme = 'light';
  } else {
    document.documentElement.dataset.theme = 'dark';
  }
}catch(e){document.documentElement.dataset.theme='dark';}})();`;

<html lang="en" data-theme="dark" suppressHydrationWarning>
  <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
  <body>{children}</body>
</html>
```

Toggling at runtime:

```ts
const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
document.documentElement.dataset.theme = next;
localStorage.setItem('ui-farm-theme', next);
```

## Changing the brand colour

Override the variables after the token import — no component edits:

```css
:root {
  --primary: #7c3aed;
  --primary-foreground: #ffffff;
}

[data-theme="light"] {
  --primary: #6d28d9;
}
```

## Tailwind notes

- **Tailwind v4** — expose the tokens as utilities with `@theme inline` if you want
  `bg-surface` / `text-muted` shorthand. Optional: the components use arbitrary
  values (`bg-[var(--surface)]`) and need no config.
- **Tailwind v3.4+** — works unchanged, no `tailwind.config` changes.
- Do **not** add `darkMode: 'class'` expecting the components to need it; they switch
  through variables, not `dark:` variants.
