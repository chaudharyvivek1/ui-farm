import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { CodeTabs } from '@/components/site/code-tabs';
import { highlight } from '@/lib/highlight';

const tokens = [
  { name: '--background', dark: '#020817', light: '#ffffff', role: 'Page background' },
  { name: '--foreground', dark: '#f8fafc', light: '#0f172a', role: 'Primary text' },
  { name: '--surface', dark: '#0f172a', light: '#f8fafc', role: 'Cards, panels, fields' },
  { name: '--surface-muted', dark: '#1e293b', light: '#f1f5f9', role: 'Hover, chips, table header' },
  { name: '--border', dark: 'rgba(148,163,184,.15)', light: 'rgba(15,23,42,.1)', role: 'All hairlines' },
  { name: '--primary', dark: '#3b82f6', light: '#2563eb', role: 'Primary actions, links' },
  { name: '--secondary', dark: '#0ea5e9', light: '#0284c7', role: 'Secondary actions' },
  { name: '--accent', dark: '#14b8a6', light: '#0d9488', role: 'Highlights, success-adjacent' },
  { name: '--muted', dark: '#94a3b8', light: '#64748b', role: 'Secondary text' },
  { name: '--muted-foreground', dark: '#cbd5e1', light: '#475569', role: 'Body copy on surface' },
  { name: '--danger', dark: '#ef4444', light: '#dc2626', role: 'Errors, destructive actions' },
  { name: '--success', dark: '#22c55e', light: '#16a34a', role: 'Confirmations' },
  { name: '--warning', dark: '#f59e0b', light: '#d97706', role: 'Cautions' },
];

const themeScript = `// app/layout.tsx — set the theme before first paint, no flash
const themeScript = \`(function(){try{
  var t = localStorage.getItem('ui-farm-theme');
  if (t === 'light' || (!t && window.matchMedia('(prefers-color-scheme: light)').matches)) {
    document.documentElement.dataset.theme = 'light';
  } else {
    document.documentElement.dataset.theme = 'dark';
  }
}catch(e){document.documentElement.dataset.theme='dark';}})();\`;

<html lang="en" data-theme="dark" suppressHydrationWarning>
  <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
  <body>{children}</body>
</html>`;

const toggleUsage = `'use client';

const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
document.documentElement.dataset.theme = next;
localStorage.setItem('ui-farm-theme', next);`;

export default async function ThemingPage() {
  const [scriptHtml, toggleHtml] = await Promise.all([
    highlight(themeScript, 'tsx'),
    highlight(toggleUsage, 'tsx'),
  ]);

  return (
    <article className="max-w-3xl">
      <Badge variant="primary">Getting started</Badge>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Theming</h1>

      <div className="prose-docs mt-5 space-y-4">
        <p>
          Theming is one CSS variable block and one attribute on{' '}
          <code>&lt;html&gt;</code>. Components never hard-code a colour — they read{' '}
          <code>var(--primary)</code>, <code>var(--surface)</code> and so on. Switch the attribute
          and every component re-themes with no re-render and no duplicated dark: variants.
        </p>
      </div>

      <h2 className="mt-10 text-xl font-bold tracking-tight">Token reference</h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-[var(--border)]">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-[var(--surface-muted)]/60">
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Token</th>
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Dark</th>
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Light</th>
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Used for</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {tokens.map((token) => (
              <tr key={token.name}>
                <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs text-[var(--foreground)]">
                  {token.name}
                </td>
                <td className="whitespace-nowrap px-4 py-2.5">
                  <span className="flex items-center gap-2 font-mono text-xs text-[var(--muted)]">
                    <span
                      className="size-3.5 shrink-0 rounded border border-[var(--border)]"
                      style={{ background: token.dark }}
                      aria-hidden="true"
                    />
                    {token.dark}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-2.5">
                  <span className="flex items-center gap-2 font-mono text-xs text-[var(--muted)]">
                    <span
                      className="size-3.5 shrink-0 rounded border border-[var(--border)]"
                      style={{ background: token.light }}
                      aria-hidden="true"
                    />
                    {token.light}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-[var(--muted-foreground)]">{token.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-xl font-bold tracking-tight">Dark by default, light on demand</h2>
      <div className="prose-docs mt-3 space-y-3">
        <p>
          <code>data-theme=&quot;dark&quot;</code> is the default in <code>:root</code>; light is
          applied with <code>data-theme=&quot;light&quot;</code>. The snippet below sets the
          attribute before the first paint so there is no flash of the wrong theme.
        </p>
      </div>
      <div className="mt-4">
        <CodeTabs
          variants={[
            {
              id: 'tsx',
              label: 'TypeScript',
              framework: 'Next.js',
              filename: 'app/layout.tsx',
              html: scriptHtml,
              plain: themeScript,
            },
          ]}
        />
      </div>

      <h3 className="mt-8 text-base font-bold tracking-tight">Toggling it</h3>
      <div className="mt-3">
        <CodeTabs
          variants={[
            {
              id: 'tsx',
              label: 'TypeScript',
              framework: 'React',
              filename: 'theme-toggle.tsx',
              html: toggleHtml,
              plain: toggleUsage,
            },
          ]}
        />
      </div>

      <h2 className="mt-10 text-xl font-bold tracking-tight">Tailwind notes</h2>
      <div className="prose-docs mt-3 space-y-3">
        <p>
          In Tailwind v4, expose the tokens as utilities with a <code>@theme inline</code> block so
          you can write <code>bg-surface</code> and <code>text-muted</code>. In v3, the components
          work unchanged because they use arbitrary values —
          <code>bg-[var(--surface)]</code> — which need no config at all.
        </p>
        <p>
          Because colours come from variables rather than <code>dark:</code> variants, you do not
          need <code>darkMode: &apos;class&apos;</code> in <code>tailwind.config</code>, and a
          component copied from these docs behaves the same in both themes.
        </p>
      </div>

      <h2 className="mt-10 text-xl font-bold tracking-tight">Changing the brand colour</h2>
      <div className="prose-docs mt-3">
        <p>
          Override <code>--primary</code> (and <code>--primary-foreground</code>) in your own
          stylesheet after importing the tokens. Every button, link, focus ring, badge and
          progress bar follows — no component edits.
        </p>
      </div>

      <div className="mt-10">
        <Link href="/docs/components" className="text-sm font-medium text-[var(--primary)] hover:underline">
          Browse components →
        </Link>
      </div>
    </article>
  );
}
