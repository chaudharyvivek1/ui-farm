'use client';

import * as React from 'react';

const sizes = {
  sm: 'size-8 text-xs',
  md: 'size-10 text-sm',
  lg: 'size-14 text-base',
} as const;

const tones = {
  primary: 'bg-[var(--primary)]/15 text-[var(--primary)]',
  accent: 'bg-[var(--accent)]/15 text-[var(--accent)]',
  muted: 'bg-[var(--surface-muted)] text-[var(--muted-foreground)]',
} as const;

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  /** Used for the initials fallback when the image is missing or fails. */
  name?: string;
  size?: keyof typeof sizes;
  tone?: keyof typeof tones;
  /** Shows a status ring around the avatar. */
  status?: 'online' | 'away' | 'offline';
}

function initials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

const statusTone = {
  online: 'bg-[var(--success)]',
  away: 'bg-[var(--warning)]',
  offline: 'bg-[var(--muted)]',
};

export function Avatar({
  src,
  alt,
  name = '',
  size = 'md',
  tone = 'primary',
  status,
  className = '',
  ...props
}: AvatarProps) {
  const [failed, setFailed] = React.useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <span
      className={[
        'relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full border border-[var(--border)] font-semibold',
        sizes[size],
        showImage ? 'bg-[var(--surface-muted)]' : tones[tone],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt ?? name}
          className="size-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <span aria-hidden={name ? undefined : true}>{initials(name)}</span>
      )}

      {status ? (
        <span
          aria-label={`Status: ${status}`}
          className={[
            'absolute bottom-0 right-0 size-2.5 rounded-full ring-2 ring-[var(--surface)]',
            statusTone[status],
          ].join(' ')}
        />
      ) : null}
    </span>
  );
}

export default Avatar;
