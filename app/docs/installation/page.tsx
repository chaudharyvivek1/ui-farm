import Link from 'next/link';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CodeTabs } from '@/components/site/code-tabs';
import { highlight } from '@/lib/highlight';

const nextClient = `// app/demo/page.tsx  (a Server Component)
'use client';

import { Button } from '@/components/ui/button';

export default function Page() {
  return <Button onClick={() => console.log('clicked')}>Click me</Button>;
}`;

const angularUsage = `// standalone component — no NgModule needed
import { Component } from '@angular/core';
import { ButtonComponent } from './ui/button.component';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [ButtonComponent],
  template: \`
    <uif-button variant="primary" (pressed)="save()">Save changes</uif-button>
    <uif-button variant="outline" size="sm">Cancel</uif-button>
  \`,
})
export class DemoComponent {
  save() {
    console.log('saved');
  }
}`;

export default async function InstallationPage() {
  const [themeHtml, nextHtml, angularHtml] = await Promise.all([
    highlight(
      `/* globals.css */
@import "tailwindcss";      /* Tailwind v4 */
@import "./theme.css";      /* the tokens from registry/theme.css */`,
      'css',
    ),
    highlight(nextClient, 'tsx'),
    highlight(angularUsage, 'ts'),
  ]);

  return (
    <article className="max-w-3xl">
      <Badge variant="primary">Getting started</Badge>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Installation</h1>

      <div className="prose-docs mt-5">
        <p>
          There is no package to install. You add the design tokens once, then copy the component
          files you need. Ten minutes for the first component, seconds for the rest.
        </p>
      </div>

      <h2 className="mt-10 text-xl font-bold tracking-tight">1. Requirements</h2>
      <ul className="mt-3 space-y-2 text-sm text-[var(--muted-foreground)]">
        <li className="flex gap-2">
          <span className="text-[var(--primary)]">·</span>
          React 19 (or 18 with a <code className="font-mono text-xs">forwardRef</code> wrapper) / Next.js 15+
        </li>
        <li className="flex gap-2">
          <span className="text-[var(--primary)]">·</span>
          Angular 18+ for the Angular variants
        </li>
        <li className="flex gap-2">
          <span className="text-[var(--primary)]">·</span>
          Tailwind CSS v4 (or v3.4+ — the classes used are all supported in both)
        </li>
      </ul>

      <h2 className="mt-10 text-xl font-bold tracking-tight">2. Add the theme tokens</h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
        Copy <code className="rounded bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-xs">registry/theme.css</code>{' '}
        into your project and import it after Tailwind. Every component reads its colours from these variables, so nothing is hard-coded.
      </p>
      <div className="mt-4">
        <CodeTabs
          variants={[
            {
              id: 'css',
              label: 'CSS',
              framework: 'Tailwind v4',
              filename: 'globals.css',
              html: themeHtml,
              plain: `@import "tailwindcss";\n@import "./theme.css";`,
            },
          ]}
        />
      </div>

      <h2 className="mt-10 text-xl font-bold tracking-tight">3. Copy a component</h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
        Pick a component, open its page, choose the language tab and press Copy. Save it at{' '}
        <code className="rounded bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-xs">components/ui/&lt;name&gt;.tsx</code>.
        Compound components (Card, Alert, Table, Dialog) live in one file each — keep the whole file.
      </p>

      <pre className="mt-4 overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-xs leading-relaxed text-[var(--muted-foreground)]">{`your-app/
├── app/
├── components/
│   └── ui/
│       ├── button.tsx      ← copied
│       ├── card.tsx        ← copied
│       └── input.tsx       ← copied
└── registry/
    └── theme.css           ← tokens, imported in globals.css`}</pre>

      <h2 className="mt-10 text-xl font-bold tracking-tight">4a. Next.js / React</h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
        Components are plain function components with no <code className="rounded bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-xs">&apos;use client&apos;</code> directive
        unless the page says otherwise — so they work in Server and Client Components. Add the
        directive to your own file when you pass event handlers.
      </p>
      <div className="mt-4">
        <CodeTabs
          variants={[
            {
              id: 'tsx',
              label: 'TypeScript',
              framework: 'Next.js',
              filename: 'app/demo/page.tsx',
              html: nextHtml,
              plain: nextClient,
            },
          ]}
        />
      </div>

      <div className="mt-4">
        <Alert>
          <AlertTitle>Which components need &apos;use client&apos;?</AlertTitle>
          <AlertDescription>
            Avatar, Switch, Checkbox, Accordion, Tabs and Dialog carry the directive in their own
            file. Everything else is a pure function of its props.
          </AlertDescription>
        </Alert>
      </div>

      <h2 className="mt-10 text-xl font-bold tracking-tight">4b. Angular</h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
        Angular files live in <code className="rounded bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-xs">registry/angular/</code>.
        They are standalone components (and one directive, for the tooltip) using signals, the
        new <code className="rounded bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-xs">input()</code> /{' '}
        <code className="rounded bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-xs">model()</code> APIs and{' '}
        <code className="rounded bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-xs">@if</code> /{' '}
        <code className="rounded bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-xs">@for</code> control flow.
        Form controls implement <code className="rounded bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-xs">ControlValueAccessor</code>, so{' '}
        <code className="rounded bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-xs">ngModel</code> and reactive forms work without extra wiring.
      </p>
      <div className="mt-4">
        <CodeTabs
          variants={[
            {
              id: 'ts',
              label: 'TypeScript',
              framework: 'Angular',
              filename: 'demo.component.ts',
              html: angularHtml,
              plain: angularUsage,
            },
          ]}
        />
      </div>

      <h2 className="mt-10 text-xl font-bold tracking-tight">5. Check it works</h2>
      <div className="prose-docs mt-3 space-y-3">
        <p>
          Render a Button and toggle the theme. If the button is blue on dark and darker blue on
          light, the tokens are wired correctly. If it is unstyled, the theme file is missing or
          imported before Tailwind.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/docs/theming" className="text-sm font-medium text-[var(--primary)] hover:underline">
          Next: theming →
        </Link>
        <Link href="/docs/components" className="text-sm font-medium text-[var(--primary)] hover:underline">
          Browse components →
        </Link>
      </div>
    </article>
  );
}
