import type { Metadata } from 'next';

import { SiteHeader } from '@/components/site/site-header';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'UI Farm — copy-paste components for React, Next.js and Angular',
    template: '%s · UI Farm',
  },
  description:
    'A component library you copy into your project instead of installing. Every component ships as React + TypeScript, React + JavaScript and Angular, with no runtime dependencies.',
  authors: [{ name: 'Vivek Chaudhary' }],
  openGraph: {
    title: 'UI Farm',
    description:
      'Copy-paste UI components for React, Next.js and Angular — no dependencies, fully documented.',
    type: 'website',
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem('ui-farm-theme');if(t==='light'||(!t&&window.matchMedia('(prefers-color-scheme: light)').matches)){document.documentElement.dataset.theme='light';}else{document.documentElement.dataset.theme='dark';}}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen antialiased">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
