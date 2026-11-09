import * as React from 'react';

const surface =
  'rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm';

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Adds a hover lift — use for cards that link somewhere. */
  interactive?: boolean;
};

export function Card({ interactive = false, className = '', ...props }: CardProps) {
  return (
    <div
      className={[
        surface,
        interactive
          ? 'transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)]/40 hover:shadow-md'
          : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
}

export function CardHeader({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['mb-4 space-y-1.5', className].join(' ')} {...props} />;
}

export function CardTitle({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={['text-xl font-bold tracking-tight text-[var(--foreground)]', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
}

export function CardDescription({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={['text-sm leading-relaxed text-[var(--muted)]', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
}

export function CardContent({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={className} {...props} />;
}

export function CardFooter({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={[
        'mt-6 flex items-center gap-3 border-t border-[var(--border)] pt-4',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
}

export default Card;
