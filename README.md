# UI Farm

A component library you own: source files for React, Next.js and Angular that you add to
your project instead of installing as a package.

UI Farm is not a package you install. It is a set of single-file components and a
documentation site: you open a component, take its source file, and add it to your own
project. From that moment the code is yours — edit it, extend it, delete the parts you
do not use. There is no runtime dependency, no version to keep in sync, and no breaking
release that can break your layout.

**26 components · 78 source files · 0 dependencies.**

Live docs: run the site locally with `npm run dev` and open
[http://localhost:3000](http://localhost:3000).

---

## What is in the box

Every component ships in three variants, shown as tabs on its documentation page:

| Variant | File | Notes |
| --- | --- | --- |
| React + TypeScript | `components/ui/<name>.tsx` | Source of truth. Typed props, no `any`. |
| React + JavaScript | `lib/generated/js/<name>.jsx` | Generated from the TS source by esbuild, so the two cannot drift. |
| Angular + TypeScript | `registry/angular/<name>.component.ts` | Standalone component, signals, `input()` / `model()`, `ControlValueAccessor` for form controls. |

Styling is Tailwind utility classes that reference CSS variables
(`--primary`, `--surface`, `--border`, …). That is what lets the same markup work in
React and in Angular, and what makes dark and light mode switch without a re-render.

---

## Four styling systems

| System | Use it with | Copy |
| --- | --- | --- |
| Tailwind CSS | React, Next.js, Angular components | nothing beyond `theme.css` |
| Plain CSS | EJS templates, plain HTML, any server-rendered app | `registry/css/ui-farm.css` |
| Bootstrap 5 | existing Bootstrap apps | `registry/bootstrap/ui-farm-bootstrap.css` |
| Material UI | React apps already on MUI | `registry/mui/theme.ts` |

All four read the same token names, so the colours match across a page that mixes them.

## Server-rendered templates (EJS)

`registry/ejs/` holds sixteen partials for Express: layout, nav, footer, page header,
breadcrumbs, button, badge, card, alert, field (text/number/currency/phone/password/
select/textarea), table, pagination, menu, modal, stats and empty state. Each takes
locals with defaults, so you include one partial instead of rewriting markup. They use
the plain-CSS build and need no client JavaScript — the menu is a `<details>` element
and the modal is a native `<dialog>`. See `registry/ejs/README.md` for the locals
reference and `registry/ejs/example/` for a runnable Express app.

## Components

| Category | Components |
| --- | --- |
| Foundation | Button, Badge, Card, Avatar, Separator |
| Forms | Input, Text Input, Number Input, Currency Input, Phone Input, Password Input, Textarea, Select, Switch, Checkbox, Label |
| Feedback | Alert, Dialog, Tooltip, Progress, Skeleton |
| Navigation | Accordion, Tabs, Dropdown Menu |
| Data | Table, Data Table |

Each documentation page contains a live preview, the three code variants with a copy
button, a props table, "when to use it" guidance and the accessibility behaviour.

---

## Quick start

```bash
# 1. install the docs site dependencies
npm install

# 2. generate the JavaScript variants from the TypeScript source
npm run sync

# 3. run the documentation site
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), pick a component, and copy the
variant you need into your project.

To use a component in your own app you need two things:

1. **The theme tokens** — copy `registry/theme.css` into your project and import it
   after Tailwind.
2. **The component file** — save it at `components/ui/<name>.tsx` (or the Angular
   equivalent under your `src/app/ui/` folder).

Interactive components (Avatar, Switch, Checkbox, Accordion, Tabs, Dialog) carry a
`'use client'` directive in their own file. Everything else is a pure function of its
props and works in Server Components.

---

## Requirements

- Node.js 18.18+ (Node 20+ recommended)
- React 19 or Next.js 15+ for the React variants
- Angular 18+ for the Angular variants
- Tailwind CSS v4, or v3.4+ — every class used is supported by both

---

## Repository structure

```
app/
  layout.tsx                     root layout, metadata, pre-paint theme script
  page.tsx                       landing page
  globals.css                    Tailwind import + design tokens + code-block themes
  docs/
    layout.tsx                   sidebar + content shell
    page.tsx                     introduction
    installation/page.tsx        install guide (React, Next.js, Angular)
    theming/page.tsx             token reference and dark-mode wiring
    components/page.tsx          component index
    components/[slug]/page.tsx   one page per component
components/
  ui/                            the library — TypeScript source of truth
  site/                          documentation chrome (header, sidebar, demos, code tabs)
lib/
  registry.ts                    metadata for every component: props, a11y, guidance
  snippets.ts                    loads and highlights the three code variants
  highlight.ts                   Shiki, dual light/dark theme
  usage.ts                       short usage example per component
  generated/js/                  JavaScript variants (generated — do not edit)
registry/
  angular/                       Angular standalone components
  ejs/                           Express + EJS partials, layout and example app
  css/ui-farm.css                plain-CSS build (semantic uif-* classes)
  bootstrap/ui-farm-bootstrap.css  maps the tokens onto Bootstrap 5 variables
  mui/theme.ts                   Material UI theme built from the same palette
  theme.css                      the token file consumers copy
scripts/
  build-snippets.mjs             TSX → JSX via esbuild
```

---

## How the JavaScript variants stay in sync

`components/ui/*.tsx` is the only source. `npm run sync` runs esbuild over each file
with the `tsx` loader and `jsx: preserve`, strips the types and writes the result to
`lib/generated/js/`. The docs site reads both files at build time, so what you see in
the JavaScript tab is exactly the TypeScript file minus its types.

`npm run build` runs `sync` first, so a stale JS snippet cannot be deployed.

**Do not edit files in `lib/generated/js/` by hand** — they are overwritten.

---

## Theming

Dark is the default; light is opt-in via `data-theme="light"` on `<html>`. All tokens
live in one block in `registry/theme.css`:

```css
:root {
  --background: #020817;
  --foreground: #f8fafc;
  --surface: #0f172a;
  --surface-muted: #1e293b;
  --border: rgba(148, 163, 184, 0.15);
  --primary: #3b82f6;
  --accent: #14b8a6;
  /* … */
}
```

Override `--primary` and `--primary-foreground` in your own stylesheet and every
button, link, focus ring, badge and progress bar follows — no component edits.

Because colours come from variables rather than `dark:` variants, you do **not** need
`darkMode: 'class'` in `tailwind.config`, and a component behaves the same in both
themes.

See [`docs/THEMING.md`](docs/THEMING.md) for the full token table.

---

## Adding a component

1. Create `components/ui/<name>.tsx` — plain function components, Tailwind classes,
   `...props` spread onto the root element.
2. Add an entry to `lib/registry.ts` (summary, props, accessibility notes, Angular
   file name).
3. Add the Angular version at `registry/angular/<name>.component.ts`.
4. Add a preview to `components/site/demos.tsx` and a short example to `lib/usage.ts`.
5. Run `npm run sync && npm run dev` and check both themes.

See [`docs/ADDING-A-COMPONENT.md`](docs/ADDING-A-COMPONENT.md) for the conventions
these files follow.

---

## Accessibility

The components are built on native elements wherever possible — real `<button>`,
`<input>`, `<select>`, `<table>` — so keyboard behaviour, form submission and screen
reader semantics come from the browser rather than from hand-written ARIA.

Concretely: visible `focus-visible` rings on every interactive element,
`aria-expanded` on accordions, `role="switch"` with `aria-checked` on switches,
`role="progressbar"` with the value range on progress bars, `role="dialog"` with
`aria-modal` and a labelled title on dialogs, and `prefers-reduced-motion` respected
globally. Each component page lists its own accessibility notes, including the known
limitations.

---

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the documentation site on port 3000 |
| `npm run sync` | Regenerate the JavaScript variants from the TypeScript source |
| `npm run build` | `sync`, then a production build of the docs site |
| `npm start` | Serve the production build |

---

## Deployment

The docs site is a standard Next.js App Router project and builds to static pages.
Vercel needs no configuration: import the repository and keep the default build
command (`npm run build`). Any Node host works the same way.

---

## License

MIT — see [LICENSE](LICENSE). Use the components in commercial work, modify them, ship
them. Attribution is appreciated but not required.

## Author

Vivek Chaudhary — [github.com/chaudharyvivek1](https://github.com/chaudharyvivek1)
