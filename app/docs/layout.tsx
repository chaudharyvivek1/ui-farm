import { Sidebar } from '@/components/site/sidebar';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-7xl gap-8 px-5 sm:px-6">
      <Sidebar />
      <div className="min-w-0 flex-1 py-10">{children}</div>
    </div>
  );
}
