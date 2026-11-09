import * as React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Prebuilt shapes for common layouts. */
  variant?: 'block' | 'text' | 'circle' | 'card';
}

const variants = {
  block: 'h-4 w-full rounded-md',
  text: 'h-3.5 w-3/4 rounded-md',
  circle: 'size-10 rounded-full',
  card: 'h-40 w-full rounded-2xl',
} as const;

export function Skeleton({
  variant = 'block',
  className = '',
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={[
        'animate-pulse bg-[var(--surface-muted)]',
        variants[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
}

/** Convenience composition: avatar + two lines of text. */
export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2.5" aria-hidden="true">
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          className={index === lines - 1 ? 'w-1/2' : undefined}
        />
      ))}
    </div>
  );
}

export default Skeleton;
