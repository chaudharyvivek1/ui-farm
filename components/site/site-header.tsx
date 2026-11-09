'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ThemeToggle } from './theme-toggle';

const links = [
  { label: 'Docs', href: '/docs' },
  { label: 'Components', href: '/docs/components' },
  { label: 'Install', href: '/docs/installation' },
  { label: 'Theming', href: '/docs/theming' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={[
        'sticky top-0 z-50 border-b transition-all duration-300',
        scrolled
          ? 'border-[var(--border)] bg-[var(--background)]/85 backdrop-blur-lg'
          : 'border-transparent bg-transparent',
      ].join(' ')}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-[var(--primary)] text-[13px] font-bold text-white shadow-md shadow-[var(--primary)]/30">
            V
          </span>
          <span className="text-base font-bold tracking-tight">UI Farm</span>
          <span className="hidden rounded-full border border-[var(--border)] px-2 py-0.5 text-[11px] font-medium text-[var(--muted)] sm:inline">
            v0.1
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm md:flex">
          {links.map((link) => {
            const active =
              link.href === '/docs'
                ? pathname === '/docs'
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  'transition-colors',
                  active
                    ? 'text-[var(--foreground)]'
                    : 'text-[var(--muted)] hover:text-[var(--primary)]',
                ].join(' ')}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <a
            href="https://github.com/chaudharyvivek1/ui-farm"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--muted)] transition hover:border-[var(--primary)]/40 hover:text-[var(--foreground)] sm:inline-flex"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
              <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55v-2.1c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .3.2.66.8.55A11.5 11.5 0 0 0 23.5 12A11.5 11.5 0 0 0 12 .5z" />
            </svg>
            GitHub
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label="Toggle navigation"
            className="grid size-9 place-items-center rounded-full border border-[var(--border)] text-[var(--foreground)] md:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="size-4" aria-hidden="true">
              {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[var(--border)] bg-[var(--background)] px-5 py-4 md:hidden">
          <ul className="space-y-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-sm font-medium text-[var(--muted)] hover:text-[var(--primary)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}

export default SiteHeader;
