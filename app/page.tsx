import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { buttonStyles } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { highlight } from '@/lib/highlight';
import { components, getComponentsByCategory, stats } from '@/lib/registry';

const quickStart = `# 1. copy a component file into your project
components/ui/button.tsx

# 2. make sure the tokens are in your global stylesheet
#    (see /docs/theming)

# 3. import it
import { Button } from '@/components/ui/button';`;

const pillars = [
  {
    title: 'Copy, do not install',
    body: 'Every component is a single file you own. No runtime dependency, no version conflict, no library upgrade that breaks your layout. Edit it freely once it is in your repo.',
  },
  {
    title: 'Same tokens as your app',
    body: 'Colours, radii and shadows are CSS variables defined once in your global stylesheet. Drop a component in and it inherits your dark and light themes immediately.',
  },
  {
    title: 'React, Next.js and Angular',
    body: 'Every page ships three variants: React with TypeScript, React with plain JavaScript, and an Angular standalone component with signals and ControlValueAccessor.',
  },
  {
    title: 'Documented like an API',
    body: 'Props tables, when-to-use notes, accessibility behaviour and the exact file name — so a teammate can pick a component up without reading its source.',
  },
];

export default async function HomePage() {
  const installHtml = await highlight(quickStart, 'bash');
  const groups = getComponentsByCategory();

  return (
    <main>
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="bg-grid-pattern pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 50% at 50% 0%, color-mix(in srgb, var(--primary) 18%, transparent) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-5 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
          <div>
            <Badge variant="primary" dot>
              v0.1 · {stats.components} components
            </Badge>

            <h1 className="mt-6 text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
              UI components you{' '}
              <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
                copy
              </span>
              , not install.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--muted-foreground)]">
              A copy-paste component library for React, Next.js and Angular. One file per component, built on
              the same design tokens, with React, Next.js and Angular versions of everything —
              documented prop by prop.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/docs/components" className={buttonStyles('primary', 'md')}>
                Browse components
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link href="/docs/installation" className={buttonStyles('outline', 'md')}>
                Installation
              </Link>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4">
              {[
                { label: 'Components', value: stats.components },
                { label: 'Code variants', value: stats.variants },
                { label: 'Dependencies', value: stats.dependencies },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-[var(--border)] bg-[var(--surface)]/60 p-4">
                  <dd className="text-2xl font-bold tracking-tight">{item.value}</dd>
                  <dt className="mt-1 text-[11px] font-medium uppercase tracking-wider text-[var(--muted)]">
                    {item.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-lg">
            <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-[var(--danger)]/60" aria-hidden="true" />
              <span className="size-2.5 rounded-full bg-[var(--warning)]/60" aria-hidden="true" />
              <span className="size-2.5 rounded-full bg-[var(--success)]/60" aria-hidden="true" />
              <span className="ml-2 font-mono text-[11px] text-[var(--muted)]">quick-start.sh</span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: installHtml }} />

            <div className="border-t border-[var(--border)] p-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="accent">React</Badge>
                <Badge variant="primary">Next.js</Badge>
                <Badge variant="warning">Angular</Badge>
                <Badge variant="outline">Tailwind CSS</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
            Why this library
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            Built for the way a product team actually ships.
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <Card key={pillar.title} interactive>
                <CardHeader>
                  <CardTitle className="text-lg">{pillar.title}</CardTitle>
                  <CardDescription>{pillar.body}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
                Library
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                {stats.components} components, {stats.variants} copy-paste files.
              </h2>
            </div>
            <Link href="/docs/components" className="text-sm font-medium text-[var(--primary)] hover:underline">
              See the full index
            </Link>
          </div>

          <div className="mt-10 space-y-10">
            {groups.map((group) => (
              <div key={group.category}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                  {group.category}
                </p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((component) => (
                    <Link
                      key={component.slug}
                      href={`/docs/components/${component.slug}`}
                      className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-all hover:-translate-y-0.5 hover:border-[var(--primary)]/40 hover:shadow-md"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-semibold tracking-tight">{component.name}</span>
                        <span className="text-[var(--muted)] transition-transform group-hover:translate-x-0.5">
                          →
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted)]">
                        {component.summary}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto w-full max-w-3xl px-5 text-center sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Start with one component.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--muted-foreground)]">
            Copy <code className="rounded bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-sm">button.tsx</code>{' '}
            into your project, add the tokens, and you are done. The rest can follow as you need it.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/docs/installation" className={buttonStyles('primary', 'md')}>
              Read the install guide
            </Link>
            <a
              href="https://github.com/chaudharyvivek1/ui-farm"
              target="_blank"
              rel="noreferrer"
              className={buttonStyles('outline', 'md')}
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--border)] py-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-5 text-sm text-[var(--muted)] sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} Vivek Chaudhary. Built with Next.js and Tailwind CSS.</p>
          <p>
            {components.length} components · MIT licensed
          </p>
        </div>
      </footer>
    </main>
  );
}
