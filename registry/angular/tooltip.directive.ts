import { Directive, HostBinding, Input } from '@angular/core';

/**
 * CSS-only tooltip: shows on hover and on keyboard focus.
 * Usage: `<button [uifTooltip]="'Delete project'" uifTooltipSide="bottom">…</button>`
 */
@Directive({
  selector: '[uifTooltip]',
  standalone: true,
  host: {
    class: 'group relative inline-flex',
  },
})
export class TooltipDirective {
  @Input({ required: true }) uifTooltip = '';
  @Input() uifTooltipSide: 'top' | 'bottom' | 'left' | 'right' = 'top';

  @HostBinding('attr.aria-label')
  get ariaLabel(): string {
    return this.uifTooltip;
  }
}
