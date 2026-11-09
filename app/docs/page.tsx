import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { stats } from '@/lib/registry';

const principles = [
  {
    title: 'You own the code',
    body: 'A component is one file in your repo. Change the padding, add a variant, delete the parts you do not use. Nothing breaks on the next release, because there is no release.',
  },
  {
    title: 'One set of tokens',
    body: 'Colours and radii come from one small set of CSS variables, so every component matches the rest of your product in both themes without configuration.',
  },
  {
    title: 'Three variants per component',
    body: 'React + TypeScript, React + JavaScript (generated from the TS source, so they cannot drift) and Angular as a standalone component.',
  },
  {
    title: 'Accessible defaults',
    body: 'Real buttons, real inputs, aria-expanded, role="switch", visible focus rings, and reduced-motion respected. Fixing accessibility later is far more expensive.',
  },
];

const frameworkRows = [
  { framework: 'Next.js (App Router)', variant: 'TypeScript or JavaScript', note: "Add 'use client' to interactive components when importing into a Server Component." },
  { framework: 'React (Vite / CRA)', variant: 'TypeScript or JavaScript', note: 'Works as-is. Tailwind is the only styling requirement.' },
  { framework: 'Angular 18+', variant: 'TypeScript', note: 'Standalone components with signals; form controls implement ControlValueAccessor.' },
];

export default function DocsIntroduction() {
  return (
    <article className="max-w-3xl">
      <Badge variant="primary">Documentation</Badge>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Introduction</h1>

      <div className="prose-docs mt-5 space-y-4">
        <p>
          UI Farm is a component library you own: source files for React, Next.js and Angular. It is not published to
          npm — you copy a component file into your project and own it from that moment. The
          result is {stats.components} components, {stats.variants} source files and{' '}
          {stats.dependencies} runtime dependencies.
        </p>
        <p>
          Everything is styled with Tailwind utility classes that reference CSS variables
          (<code>--primary</code>, <code>--surface</code>, <code>--border</code>). That is what
          makes the same markup work in React and in Angular, and what lets the dark and light
          themes switch without a re-render.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {principles.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle className="text-base">{item.title}</CardTitle>
              <CardDescription>{item.body}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <h2 className="mt-12 text-xl font-bold tracking-tight">What you get per framework</h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-[var(--border)]">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-[var(--surface-muted)]/60">
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Framework</th>
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Variant</th>
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {frameworkRows.map((row) => (
              <tr key={row.framework}>
                <td className="px-4 py-3 font-medium text-[var(--foreground)]">{row.framework}</td>
                <td className="px-4 py-3 text-[var(--muted-foreground)]">{row.variant}</td>
                <td className="px-4 py-3 text-[var(--muted)]">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 text-xl font-bold tracking-tight">Next steps</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Link
          href="/docs/installation"
          className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition hover:border-[var(--primary)]/40"
        >
          <p className="font-semibold">Installation</p>
          <p className="mt-1 text-sm text-[var(--muted)]">Add the tokens and copy your first component.</p>
        </Link>
        <Link
          href="/docs/theming"
          className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition hover:border-[var(--primary)]/40"
        >
          <p className="font-semibold">Theming</p>
          <p className="mt-1 text-sm text-[var(--muted)]">Every token, and how dark mode is wired.</p>
        </Link>
        <Link
          href="/docs/components"
          className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition hover:border-[var(--primary)]/40"
        >
          <p className="font-semibold">Components</p>
          <p className="mt-1 text-sm text-[var(--muted)]">Browse all {stats.components} with live previews.</p>
        </Link>
        <Link
          href="/docs/components/button"
          className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition hover:border-[var(--primary)]/40"
        >
          <p className="font-semibold">Start with Button</p>
          <p className="mt-1 text-sm text-[var(--muted)]">The smallest file, and the most used.</p>
        </Link>
      </div>
    </article>
  );
}
