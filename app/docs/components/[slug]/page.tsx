import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CodeTabs } from '@/components/site/code-tabs';
import { Demo } from '@/components/site/demos';
import { Preview, PropsTable } from '@/components/site/preview';
import { StylePanel } from '@/components/site/style-panel';
import { highlight } from '@/lib/highlight';
import { components, getComponent } from '@/lib/registry';
import { getCodeVariants } from '@/lib/snippets';
import { getComponentStyles } from '@/lib/style-systems';
import { getUsage } from '@/lib/usage';

export function generateStaticParams() {
  return components.map((component) => ({ slug: component.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getComponent(slug);
  if (!meta) return { title: 'Not found' };
  return {
    title: meta.name,
    description: meta.summary,
  };
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getComponent(slug);
  if (!meta) notFound();

  const variants = await getCodeVariants(slug);
  const styleRows = getComponentStyles(slug);
  const usageSource = getUsage(slug);
  const usageHtml = usageSource ? await highlight(usageSource, 'tsx') : '';

  const index = components.findIndex((component) => component.slug === slug);
  const previous = components[index - 1];
  const next = components[index + 1];

  return (
    <article className="max-w-4xl">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[var(--muted)]">
        <Link href="/docs" className="hover:text-[var(--primary)]">Docs</Link>
        <span aria-hidden="true">/</span>
        <Link href="/docs/components" className="hover:text-[var(--primary)]">Components</Link>
        <span aria-hidden="true">/</span>
        <span className="text-[var(--foreground)]">{meta.name}</span>
      </nav>

      <header className="mt-5 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{meta.name}</h1>
        <Badge variant="outline">{meta.category}</Badge>
        {meta.client ? <Badge variant="warning">&apos;use client&apos;</Badge> : null}
      </header>

      <p className="mt-3 max-w-2xl text-[var(--muted-foreground)]">{meta.summary}</p>

      <div className="prose-docs mt-4 max-w-2xl">
        <p>{meta.overview}</p>
      </div>

      <section className="mt-8">
        <Preview>
          <Demo slug={meta.slug} />
        </Preview>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-xl font-bold tracking-tight">Code</h2>
        {styleRows.length ? (
          <StylePanel
            name={meta.name}
            rows={styleRows}
            code={<CodeTabs variants={variants} />}
          />
        ) : (
          <CodeTabs variants={variants} />
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold tracking-tight">When to use it</h2>
        <ul className="mt-3 space-y-2 text-sm text-[var(--muted-foreground)]">
          {meta.whenToUse.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--primary)]" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {usageHtml ? (
        <section className="mt-10">
          <h2 className="text-xl font-bold tracking-tight">Usage</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            <div className="border-b border-[var(--border)] bg-[var(--surface-muted)]/40 px-4 py-2 font-mono text-[11px] text-[var(--muted)]">
              example.tsx
            </div>
            <div dangerouslySetInnerHTML={{ __html: usageHtml }} />
          </div>
        </section>
      ) : null}

      <section className="mt-10">
        <h2 className="text-xl font-bold tracking-tight">API</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Import with{' '}
          <code className="rounded bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-xs">
            import {'{'} {meta.exports.join(', ')} {'}'} from &apos;@/components/ui/{meta.slug}&apos;
          </code>
        </p>
        <div className="mt-4">
          <PropsTable rows={meta.props} />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold tracking-tight">Accessibility</h2>
        <ul className="mt-3 space-y-2 text-sm text-[var(--muted-foreground)]">
          {meta.accessibility.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {meta.notes?.length ? (
        <section className="mt-8 space-y-3">
          {meta.notes.map((note) => (
            <Alert key={note} variant="warning">
              <AlertTitle>Known limitation</AlertTitle>
              <AlertDescription>{note}</AlertDescription>
            </Alert>
          ))}
        </section>
      ) : null}

      <nav className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] pt-6 text-sm">
        {previous ? (
          <Link href={`/docs/components/${previous.slug}`} className="text-[var(--muted)] hover:text-[var(--primary)]">
            ← {previous.name}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/docs/components/${next.slug}`} className="ml-auto text-[var(--muted)] hover:text-[var(--primary)]">
            {next.name} →
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
