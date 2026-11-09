'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { getComponentsByCategory } from '@/lib/registry';

const guides = [
  { label: 'Introduction', href: '/docs' },
  { label: 'Installation', href: '/docs/installation' },
  { label: 'Theming', href: '/docs/theming' },
];

export function Sidebar() {
  const pathname = usePathname();
  const groups = getComponentsByCategory();

  function itemClass(href: string) {
    const active = pathname === href;
    return [
      'block rounded-lg px-3 py-1.5 text-sm transition-colors',
      active
        ? 'bg-[var(--primary)]/12 font-medium text-[var(--primary)]'
        : 'text-[var(--muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]',
    ].join(' ');
  }

  return (
    <aside className="hidden w-60 shrink-0 lg:block">
      <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto py-10 pr-4">
        <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
          Getting started
        </p>
        <ul className="space-y-0.5">
          {guides.map((guide) => (
            <li key={guide.href}>
              <Link href={guide.href} className={itemClass(guide.href)}>
                {guide.label}
              </Link>
            </li>
          ))}
        </ul>

        {groups.map((group) => (
          <div key={group.category} className="mt-7">
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
              {group.category}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((component) => {
                const href = `/docs/components/${component.slug}`;
                return (
                  <li key={component.slug}>
                    <Link href={href} className={itemClass(href)}>
                      {component.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
