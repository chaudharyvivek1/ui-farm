import { Component, computed, input, signal } from '@angular/core';

type Size = 'sm' | 'md' | 'lg';
type Tone = 'primary' | 'accent' | 'muted';

@Component({
  selector: 'uif-avatar',
  standalone: true,
  template: `
    <span [class]="classes()">
      @if (src() && !failed()) {
        <img
          [src]="src()"
          [alt]="alt() || name()"
          class="size-full object-cover"
          (error)="failed.set(true)"
        />
      } @else {
        <span aria-hidden="true">{{ initials() }}</span>
      }

      @if (status()) {
        <span
          [class]="statusClasses()"
          [attr.aria-label]="'Status: ' + status()"
        ></span>
      }
    </span>
  `,
})
export class AvatarComponent {
  readonly src = input<string>();
  readonly alt = input('');
  readonly name = input('');
  readonly size = input<Size>('md');
  readonly tone = input<Tone>('primary');
  readonly status = input<'online' | 'away' | 'offline'>();

  readonly failed = signal(false);

  private readonly sizes: Record<Size, string> = {
    sm: 'size-8 text-xs',
    md: 'size-10 text-sm',
    lg: 'size-14 text-base',
  };

  private readonly tones: Record<Tone, string> = {
    primary: 'bg-[var(--primary)]/15 text-[var(--primary)]',
    accent: 'bg-[var(--accent)]/15 text-[var(--accent)]',
    muted: 'bg-[var(--surface-muted)] text-[var(--muted-foreground)]',
  };

  private readonly statusTones: Record<string, string> = {
    online: 'bg-[var(--success)]',
    away: 'bg-[var(--warning)]',
    offline: 'bg-[var(--muted)]',
  };

  readonly initials = computed(() =>
    this.name()
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join(''),
  );

  readonly classes = computed(() =>
    [
      'relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full border border-[var(--border)] font-semibold',
      this.sizes[this.size()],
      this.src() && !this.failed() ? 'bg-[var(--surface-muted)]' : this.tones[this.tone()],
    ].join(' '),
  );

  readonly statusClasses = computed(() =>
    [
      'absolute bottom-0 right-0 size-2.5 rounded-full ring-2 ring-[var(--surface)]',
      this.statusTones[this.status() ?? 'offline'],
    ].join(' '),
  );
}
