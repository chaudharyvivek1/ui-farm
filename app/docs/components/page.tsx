import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { getComponentsByCategory, stats } from '@/lib/registry';

export const metadata = {
  title: 'Components',
  description: 'Every UI Farm component, with live previews and copy-paste code.',
};

export default function ComponentsIndex() {
  const groups = getComponentsByCategory();

  return (
    <article>
      <Badge variant="primary">Library</Badge>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Components</h1>
      <p className="mt-3 max-w-2xl text-[var(--muted-foreground)]">
        {stats.components} components, each with a live preview, a props table, accessibility notes
        and three copy-paste variants — React + TypeScript, React + JavaScript and Angular.
      </p>

      <div className="mt-10 space-y-12">
        {groups.map((group) => (
          <section key={group.category}>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold tracking-tight">{group.category}</h2>
              <span className="text-xs text-[var(--muted)]">{group.items.length}</span>
              <span className="h-px flex-1 bg-[var(--border)]" aria-hidden="true" />
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {group.items.map((component) => (
                <Link
                  key={component.slug}
                  href={`/docs/components/${component.slug}`}
                  className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-all hover:-translate-y-0.5 hover:border-[var(--primary)]/40 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-semibold tracking-tight">{component.name}</span>
                    {component.client ? (
                      <Badge variant="outline" className="shrink-0">
                        client
                      </Badge>
                    ) : null}
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted)]">
                    {component.summary}
                  </p>
                  <p className="mt-3 font-mono text-[11px] text-[var(--muted)]/70">
                    {component.exports.join(' · ')}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
