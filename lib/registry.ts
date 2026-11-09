export type Category = 'Foundation' | 'Forms' | 'Feedback' | 'Navigation' | 'Data';

export type PropRow = {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
};

export type ComponentMeta = {
  slug: string;
  name: string;
  category: Category;
  /** One line, shown in the index and the sidebar. */
  summary: string;
  /** Short paragraph on the component page. */
  overview: string;
  /** Bullet list: when this component is the right choice. */
  whenToUse: string[];
  /** Set when the component needs 'use client' in the App Router. */
  client?: boolean;
  /** Angular file name inside registry/angular. */
  angularFile: string;
  /** Exported names to import. */
  exports: string[];
  props: PropRow[];
  accessibility: string[];
  notes?: string[];
};

export const components: ComponentMeta[] = [
  {
    slug: 'button',
    name: 'Button',
    category: 'Foundation',
    summary: 'Six variants, three sizes, a loading state and a link-safe class helper.',
    overview:
      'The primary action element. Every variant is built from the design tokens, so it follows the theme without extra work. Use `buttonStyles()` when the action is a link and you want the same look on an <a> or Next.js <Link>.',
    whenToUse: [
      'One primary action per view; everything else is outline or ghost.',
      'Form submits, dialog confirmations and navigation that must look like a button.',
    ],
    angularFile: 'button.component.ts',
    exports: ['Button', 'buttonStyles'],
    props: [
      { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'danger'", defaultValue: "'primary'", description: 'Visual style.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Padding and text size.' },
      { name: 'loading', type: 'boolean', defaultValue: 'false', description: 'Shows a spinner and blocks clicks.' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Native disabled state, dimmed to 50%.' },
      { name: '...props', type: 'ButtonHTMLAttributes', description: 'Everything else goes to the underlying <button> — onClick, type, aria-*.' },
    ],
    accessibility: [
      'Renders a real <button>, so Enter and Space work by default.',
      'focus-visible ring is 2px with an offset, visible on both themes.',
      'aria-busy is set while loading; the spinner is aria-hidden so it is not announced.',
    ],
  },
  {
    slug: 'badge',
    name: 'Badge',
    category: 'Foundation',
    summary: 'Small status label with seven tones and an optional dot.',
    overview:
      'Use a badge for state that belongs to an item — plan, status, category, count. It is not a button and should never be the only way to see important information.',
    whenToUse: [
      'Status next to a heading: "Active", "Draft", "Paid".',
      'Category or plan labels on cards and table rows.',
    ],
    angularFile: 'badge.component.ts',
    exports: ['Badge'],
    props: [
      { name: 'variant', type: "'default' | 'primary' | 'accent' | 'success' | 'warning' | 'danger' | 'outline'", defaultValue: "'default'", description: 'Tone of the badge.' },
      { name: 'dot', type: 'boolean', defaultValue: 'false', description: 'Adds a leading status dot in the current colour.' },
    ],
    accessibility: [
      'Text carries the meaning; colour is decorative reinforcement only.',
      'Do not rely on the dot alone — pair it with a word.',
    ],
  },
  {
    slug: 'card',
    name: 'Card',
    category: 'Foundation',
    summary: 'Surface with header, title, description, content and footer parts.',
    overview:
      'The container used across the site for features, pricing and project tiles. `interactive` adds the hover lift for cards that link somewhere; leave it off for static content so the page does not suggest a click that does nothing.',
    whenToUse: [
      'Grouping related content that can be scanned as one unit.',
      'Grids of features, plans, products or projects.',
    ],
    angularFile: 'card.component.ts',
    exports: ['Card', 'CardHeader', 'CardTitle', 'CardDescription', 'CardContent', 'CardFooter'],
    props: [
      { name: 'interactive', type: 'boolean', defaultValue: 'false', description: 'Hover lift and border highlight.' },
      { name: '...props', type: 'HTMLAttributes<HTMLDivElement>', description: 'Passed to the outer div.' },
    ],
    accessibility: [
      'Card is a plain div — keep the heading inside it a real heading (h2/h3) to preserve the outline.',
      'If the whole card is a link, wrap the title in the anchor rather than making the div clickable.',
    ],
  },
  {
    slug: 'alert',
    name: 'Alert',
    category: 'Feedback',
    summary: 'Inline message with info, success, warning and danger tones.',
    overview:
      'For messages that belong in the flow of the page: form-level errors, billing warnings, empty-state explanations. For anything that interrupts, use Dialog instead.',
    whenToUse: [
      'Validation summary at the top of a form.',
      'A short, persistent note next to the thing it is about.',
    ],
    angularFile: 'alert.component.ts',
    exports: ['Alert', 'AlertTitle', 'AlertDescription'],
    props: [
      { name: 'variant', type: "'info' | 'success' | 'warning' | 'danger'", defaultValue: "'info'", description: 'Tone and icon.' },
      { name: 'icon', type: 'boolean', defaultValue: 'true', description: 'Set to false to hide the leading icon.' },
    ],
    accessibility: [
      'Danger alerts get role="alert" and are announced immediately; the other tones use role="status" (polite).',
      'The icon is aria-hidden — the title text must say what happened.',
    ],
  },
  {
    slug: 'avatar',
    name: 'Avatar',
    category: 'Foundation',
    summary: 'Image with an initials fallback and an optional status dot.',
    overview:
      'Falls back to initials when no image is set or the image fails to load, so a broken URL never leaves a hole in the layout. Sizes are fixed so rows of avatars stay aligned.',
    whenToUse: [
      'Account menus, comments, assignee columns, team lists.',
      'Anything where a person is identified repeatedly.',
    ],
    client: true,
    angularFile: 'avatar.component.ts',
    exports: ['Avatar'],
    props: [
      { name: 'src', type: 'string', description: 'Image URL. Falls back to initials when empty or on error.' },
      { name: 'name', type: 'string', description: 'Full name; the first two words become the initials.' },
      { name: 'alt', type: 'string', description: 'Alt text. Defaults to the name.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: '32px, 40px or 56px.' },
      { name: 'tone', type: "'primary' | 'accent' | 'muted'", defaultValue: "'primary'", description: 'Background tone of the initials fallback.' },
      { name: 'status', type: "'online' | 'away' | 'offline'", description: 'Adds a status dot with a surface ring.' },
    ],
    accessibility: [
      'The image gets an alt attribute from `alt` or `name`.',
      'The initials are hidden from screen readers when a name is provided, so the name is not read twice.',
      'The status dot carries an aria-label — do not use it as the only status indicator.',
    ],
  },
  {
    slug: 'separator',
    name: 'Separator',
    category: 'Foundation',
    summary: 'Horizontal or vertical rule, optionally with a centred label.',
    overview:
      'A hairline in the border colour. The labelled form is for splitting two groups of actions or two sign-in options ("or").',
    whenToUse: [
      'Between groups of fields in a long form.',
      'Between "continue with email" and OAuth buttons.',
    ],
    angularFile: 'separator.component.ts',
    exports: ['Separator'],
    props: [
      { name: 'orientation', type: "'horizontal' | 'vertical'", defaultValue: "'horizontal'", description: 'Direction of the rule.' },
      { name: 'label', type: 'string', description: 'Centred label; only used for horizontal separators.' },
    ],
    accessibility: ['Renders role="separator" with the matching aria-orientation.'],
  },
  {
    slug: 'input',
    name: 'Input',
    category: 'Forms',
    summary: 'Text field with focus ring, error state and optional inline icons.',
    overview:
      'A styled native input — no wrapper state, no custom keyboard handling. Pair it with Label and a helper line, and use `invalid` to paint the error state and set aria-invalid together.',
    whenToUse: [
      'Single-line text, email, password, search and tel fields.',
      'Anywhere a native input is enough — which is most of the time.',
    ],
    angularFile: 'input.component.ts',
    exports: ['Input'],
    props: [
      { name: 'invalid', type: 'boolean', defaultValue: 'false', description: 'Error border and ring; sets aria-invalid.' },
      { name: 'startIcon', type: 'ReactNode', description: 'Rendered inside the field, left of the text.' },
      { name: 'endIcon', type: 'ReactNode', description: 'Rendered inside the field, right of the text.' },
      { name: '...props', type: 'InputHTMLAttributes', description: 'type, placeholder, value, onChange and so on.' },
    ],
    accessibility: [
      'Always connect a <Label htmlFor> and, for errors, a line with aria-describedby.',
      'aria-invalid is set automatically when `invalid` is true.',
      'The focus ring is 2px and never removed.',
    ],
  },
  {
    slug: 'textarea',
    name: 'Textarea',
    category: 'Forms',
    summary: 'Multi-line field that resizes vertically but not horizontally.',
    overview:
      'Same visual language as Input, with `resize-y` so a long message cannot break the layout by dragging sideways.',
    whenToUse: ['Messages, notes, descriptions, anything longer than one line.'],
    angularFile: 'textarea.component.ts',
    exports: ['Textarea'],
    props: [
      { name: 'rows', type: 'number', defaultValue: '4', description: 'Initial visible height.' },
      { name: 'invalid', type: 'boolean', defaultValue: 'false', description: 'Error border and ring.' },
      { name: '...props', type: 'TextareaHTMLAttributes', description: 'Passed to the textarea.' },
    ],
    accessibility: [
      'Pair with a Label and describe limits in visible text, not only in maxlength.',
      'aria-invalid is set when `invalid` is true.',
    ],
  },
  {
    slug: 'select',
    name: 'Select',
    category: 'Forms',
    summary: 'Styled native select — mobile pickers and keyboard support included.',
    overview:
      'Deliberately a native <select>. It submits with forms, opens the OS picker on mobile and needs no focus trap. For filtering with search, use a command palette pattern instead.',
    whenToUse: [
      'Five or more mutually exclusive options.',
      'Country, plan, category, sort order.',
    ],
    angularFile: 'select.component.ts',
    exports: ['Select'],
    props: [
      { name: 'options', type: 'SelectOption[]', description: 'label / value / disabled objects.' },
      { name: 'placeholder', type: 'string', description: 'Rendered as an empty first option.' },
      { name: 'invalid', type: 'boolean', defaultValue: 'false', description: 'Error border and ring.' },
      { name: '...props', type: 'SelectHTMLAttributes', description: 'value, onChange, name, required.' },
    ],
    accessibility: [
      'Native select: arrow keys, type-ahead and screen reader support come from the browser.',
      'The chevron is aria-hidden and pointer-events-none so it never blocks the click.',
    ],
  },
  {
    slug: 'switch',
    name: 'Switch',
    category: 'Forms',
    summary: 'On/off toggle that applies immediately, with label and description.',
    overview:
      'Use a switch for settings that take effect as soon as they are flipped. If the change needs a Save button, use a checkbox instead — the control should match the behaviour.',
    whenToUse: [
      'Preferences: notifications, dark mode, auto-renew.',
      'Admin toggles where the change is applied instantly.',
    ],
    client: true,
    angularFile: 'switch.component.ts',
    exports: ['Switch'],
    props: [
      { name: 'checked', type: 'boolean', description: 'Controlled value.' },
      { name: 'defaultChecked', type: 'boolean', defaultValue: 'false', description: 'Uncontrolled initial value.' },
      { name: 'onCheckedChange', type: '(checked: boolean) => void', description: 'Fires with the next value.' },
      { name: 'label', type: 'string', description: 'Visible label next to the control.' },
      { name: 'description', type: 'string', description: 'Muted second line.' },
      { name: 'size', type: "'sm' | 'md'", defaultValue: "'md'", description: 'Track and knob size.' },
    ],
    accessibility: [
      'role="switch" with aria-checked, so screen readers announce on/off rather than pressed.',
      'Reachable and operable with Space and Enter; the focus ring is visible.',
      'The label is rendered outside the button — pass aria-label if you use the control without a visible label.',
    ],
  },
  {
    slug: 'checkbox',
    name: 'Checkbox',
    category: 'Forms',
    summary: 'Custom-painted checkbox with label, description and indeterminate state.',
    overview:
      'A real <input type="checkbox"> with `appearance-none` and a painted tick, so forms, labels and keyboard behaviour keep working while the look matches the theme. `indeterminate` is for "select all" headers.',
    whenToUse: [
      'Multi-select lists and filters.',
      'Consent and "remember me" rows where nothing happens until submit.',
    ],
    client: true,
    angularFile: 'checkbox.component.ts',
    exports: ['Checkbox'],
    props: [
      { name: 'label', type: 'string', description: 'Clickable label text.' },
      { name: 'description', type: 'string', description: 'Muted second line.' },
      { name: 'indeterminate', type: 'boolean', defaultValue: 'false', description: 'Shows a dash instead of a tick.' },
      { name: '...props', type: 'InputHTMLAttributes', description: 'checked, defaultChecked, onChange, name, value.' },
    ],
    accessibility: [
      'Native checkbox semantics are preserved — no ARIA to get wrong.',
      'The label is tied to the input with htmlFor/id generated by useId.',
      'The tick SVG is aria-hidden; state is exposed by the input itself.',
    ],
  },
  {
    slug: 'label',
    name: 'Label',
    category: 'Forms',
    summary: 'Form label with a required marker and an optional right-side hint.',
    overview:
      'A small component that keeps every field label consistent: same size, same weight, required asterisk in the danger colour, and a muted hint aligned to the right.',
    whenToUse: ['Every form field.', 'Section labels inside long forms.'],
    angularFile: 'label.component.ts',
    exports: ['Label'],
    props: [
      { name: 'required', type: 'boolean', defaultValue: 'false', description: 'Appends a red asterisk.' },
      { name: 'hint', type: 'string', description: 'Muted text aligned to the right.' },
      { name: 'htmlFor', type: 'string', description: 'Id of the field it labels.' },
    ],
    accessibility: [
      'Always point htmlFor at the field id.',
      'The asterisk is aria-hidden — also set `required` on the input so assistive tech knows.',
    ],
  },
  {
    slug: 'accordion',
    name: 'Accordion',
    category: 'Navigation',
    summary: 'Collapsible panels, single or multiple open, with proper ARIA wiring.',
    overview:
      'Each trigger is a real button with aria-expanded and aria-controls pointing at the panel. Panels use the `hidden` attribute rather than max-height animation, so collapsed content is genuinely removed from the accessibility tree and from find-in-page.',
    whenToUse: [
      'FAQ sections and long policy pages.',
      'Progressive disclosure of secondary detail inside a form.',
    ],
    client: true,
    angularFile: 'accordion.component.ts',
    exports: ['Accordion', 'AccordionItem'],
    props: [
      { name: 'type', type: "'single' | 'multiple'", defaultValue: "'single'", description: 'Whether several panels can stay open.' },
      { name: 'defaultValue', type: 'string | string[]', description: 'Panel value(s) open on first render.' },
      { name: 'value / onValueChange', type: 'string | string[] / (value: string[]) => void', description: 'Controlled mode.' },
      { name: 'title', type: 'ReactNode', description: 'AccordionItem: trigger text.' },
      { name: 'subtitle', type: 'string', description: 'AccordionItem: muted second line in the trigger.' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'AccordionItem: blocks the trigger.' },
    ],
    accessibility: [
      'Trigger is a <button> with aria-expanded; panel has role="region" and a generated id.',
      'Collapsed panels are hidden, so they are skipped by screen readers and page search.',
      'The chevron rotates but is decorative — state is conveyed by aria-expanded.',
    ],
  },
  {
    slug: 'tabs',
    name: 'Tabs',
    category: 'Navigation',
    summary: 'Segmented control that swaps one panel of content for another.',
    overview:
      'Built on the tablist / tab / tabpanel pattern with roving tabindex: only the active tab is in the tab order, and inactive panels are not rendered at all.',
    whenToUse: [
      'Two to five views of the same object (Overview, Billing, Team).',
      'Switching code samples by language.',
    ],
    client: true,
    angularFile: 'tabs.component.ts',
    exports: ['Tabs', 'TabsList', 'TabsTrigger', 'TabsContent'],
    props: [
      { name: 'defaultValue', type: 'string', description: 'Active tab on first render.' },
      { name: 'value / onValueChange', type: 'string / (value: string) => void', description: 'Controlled mode.' },
      { name: 'value', type: 'string', description: 'TabsTrigger / TabsContent: the tab this element belongs to.' },
    ],
    accessibility: [
      'role="tablist" / "tab" / "tabpanel" with aria-selected and aria-controls.',
      'Roving tabindex keeps Tab moving between groups, not between tabs.',
      'Add arrow-key handling if your tabs are the main navigation of a page.',
    ],
  },
  {
    slug: 'dialog',
    name: 'Dialog',
    category: 'Feedback',
    summary: 'Modal with backdrop, Escape to close and scroll lock.',
    overview:
      'A focused interruption: confirmations, short forms, destructive actions. It locks body scroll while open, closes on Escape or backdrop click, and moves focus into the panel. For side panels use a Sheet pattern instead.',
    whenToUse: [
      'Destructive confirmations.',
      'Short forms that should not lose the page context.',
    ],
    client: true,
    angularFile: 'dialog.component.ts',
    exports: ['Dialog', 'DialogTrigger', 'DialogContent', 'DialogHeader', 'DialogTitle', 'DialogDescription', 'DialogFooter', 'DialogClose'],
    props: [
      { name: 'open / defaultOpen / onOpenChange', type: 'boolean / boolean / (open: boolean) => void', description: 'Controlled or uncontrolled visibility.' },
      { name: 'dismissOnBackdrop', type: 'boolean', defaultValue: 'true', description: 'DialogContent: close when the backdrop is clicked.' },
      { name: 'className', type: 'string', description: 'Width and padding of the panel.' },
    ],
    notes: [
      'This implementation focuses the panel but does not trap Tab inside it. If your dialog has many focusable elements, add a focus trap (or use <dialog> with showModal) before shipping.',
    ],
    accessibility: [
      'role="dialog" and aria-modal="true", labelled by DialogTitle through a generated id.',
      'Escape closes it; the close button has an aria-label.',
      'Body scroll is restored on unmount.',
    ],
  },
  {
    slug: 'tooltip',
    name: 'Tooltip',
    category: 'Feedback',
    summary: 'CSS-only hint on hover and keyboard focus — no JavaScript state.',
    overview:
      'A span with a group-hover and group-focus-within reveal. Because it is CSS only, it costs nothing at runtime and works inside server components. It is a hint, never the only place information exists.',
    whenToUse: [
      'Naming an icon-only button.',
      'Explaining a truncated value or a disabled action.',
    ],
    angularFile: 'tooltip.directive.ts',
    exports: ['Tooltip'],
    props: [
      { name: 'label', type: 'string', description: 'Tooltip text. Keep it to one line.' },
      { name: 'side', type: "'top' | 'bottom' | 'left' | 'right'", defaultValue: "'top'", description: 'Placement relative to the child.' },
      { name: 'children', type: 'ReactElement', description: 'A single focusable element.' },
    ],
    accessibility: [
      'Shows on :focus-within, so keyboard users get it too.',
      'role="tooltip" on the bubble.',
      'Never put essential information only in a tooltip — touch devices cannot hover.',
    ],
  },
  {
    slug: 'table',
    name: 'Table',
    category: 'Data',
    summary: 'Semantic table with sticky-looking header, row hover and horizontal scroll.',
    overview:
      'Thin wrappers over the real table elements so headers, captions and row semantics survive. The outer div scrolls horizontally on small screens instead of squashing the columns.',
    whenToUse: [
      'Comparable records: invoices, users, plans, runs.',
      'Anything with more than three columns of the same type.',
    ],
    angularFile: 'table.component.ts',
    exports: ['Table', 'TableHeader', 'TableBody', 'TableRow', 'TableHead', 'TableCell', 'TableCaption'],
    props: [
      { name: 'className', type: 'string', description: 'Merged onto the element for column widths and alignment.' },
      { name: '...props', type: 'HTMLAttributes', description: 'Standard table attributes.' },
    ],
    accessibility: [
      'Real <table>/<thead>/<th> structure — use TableHead for header cells, never styled divs.',
      'Add TableCaption or an aria-label so the table has a name.',
      'Horizontal scrolling keeps the DOM order intact for screen readers.',
    ],
  },
  {
    slug: 'progress',
    name: 'Progress',
    category: 'Feedback',
    summary: 'Determinate bar with five tones and an optional value label.',
    overview:
      'Shows how far along a known-length task is: uploads, onboarding, quota usage. For unknown duration, use Skeleton or a spinner instead.',
    whenToUse: ['File uploads and multi-step wizards.', 'Quota and usage meters.'],
    angularFile: 'progress.component.ts',
    exports: ['Progress'],
    props: [
      { name: 'value', type: 'number', description: 'Current value, clamped to 0…max.' },
      { name: 'max', type: 'number', defaultValue: '100', description: 'Upper bound.' },
      { name: 'tone', type: "'primary' | 'accent' | 'success' | 'warning' | 'danger'", defaultValue: "'primary'", description: 'Bar colour.' },
      { name: 'showValue', type: 'boolean', defaultValue: 'false', description: 'Shows the percentage on the right.' },
      { name: 'label', type: 'string', description: 'Visible label and accessible name.' },
      { name: 'size', type: "'sm' | 'md'", defaultValue: "'md'", description: 'Bar height.' },
    ],
    accessibility: [
      'role="progressbar" with aria-valuenow / valuemin / valuemax.',
      'Give it a label — a bare bar tells a screen reader user nothing.',
    ],
  },
  {
    slug: 'skeleton',
    name: 'Skeleton',
    category: 'Feedback',
    summary: 'Loading placeholder with block, text, circle and card shapes.',
    overview:
      'Match the skeleton to the shape of the content that is coming, so the layout does not jump when data arrives. Prefer a skeleton over a spinner when the final layout is known.',
    whenToUse: [
      'First load of a card, table or profile block.',
      'Anywhere layout shift would be visible.',
    ],
    angularFile: 'skeleton.component.ts',
    exports: ['Skeleton', 'SkeletonText'],
    props: [
      { name: 'variant', type: "'block' | 'text' | 'circle' | 'card'", defaultValue: "'block'", description: 'Preset shape.' },
      { name: 'lines', type: 'number', description: 'SkeletonText: number of text lines.' },
      { name: 'className', type: 'string', description: 'Override width and height.' },
    ],
    accessibility: [
      'aria-hidden on every placeholder, so screen readers skip the noise.',
      'Announce loading state in text once per region, e.g. aria-live="polite" "Loading invoices…".',
    ],
  },
  {
    slug: 'text-input',
    name: 'Text Input',
    category: 'Forms',
    summary: 'Text field with character filtering, casing transforms, a counter and a clear button.',
    overview:
      'The field you reach for most often. `allowed` drops characters that should never reach your state (letters only for a name, digits only for a PIN), and `transform` fixes casing as the user types — so "vivek chaudhary" becomes "Vivek Chaudhary" without a separate cleanup pass. Everything else is the same visual language as Input, with label, hint and error built in.',
    whenToUse: [
      'Names and places: allowed="alpha" with transform="capitalize-words".',
      'Codes, PINs and OTPs: allowed="digits" with maxLength and showCount.',
      'Any text field that also needs a label, a helper line and an error message in one component.',
    ],
    client: true,
    angularFile: 'text-input.component.ts',
    exports: ['TextInput'],
    props: [
      { name: 'label / hint / error', type: 'string', description: 'Built-in field chrome. Error also switches the control to its invalid style.' },
      { name: 'allowed', type: "'any' | 'alpha' | 'alphanumeric' | 'digits'", defaultValue: "'any'", description: 'Characters kept while typing.' },
      { name: 'transform', type: "'none' | 'upper' | 'lower' | 'capitalize-words' | 'trim'", defaultValue: "'none'", description: 'Casing applied on every keystroke.' },
      { name: 'value / defaultValue / onValueChange', type: 'string / string / (value: string) => void', description: 'Controlled or uncontrolled. The callback always receives the cleaned value.' },
      { name: 'maxLength / showCount', type: 'number / boolean', description: 'Hard limit, and an optional "12 / 60" counter.' },
      { name: 'clearable', type: 'boolean', defaultValue: 'false', description: 'Adds a clear button once there is a value.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Control height and text size.' },
    ],
    accessibility: [
      'The label is tied to the input with a generated id; the error line is announced with role="alert".',
      'aria-invalid is set from `error` or `invalid` — no need to remember it separately.',
      'Filtering happens on input, so the value never briefly contains characters you would have to reject later.',
    ],
  },
  {
    slug: 'number-input',
    name: 'Number Input',
    category: 'Forms',
    summary: 'Integer or float field with min/max clamping, decimals, steppers and grouped thousands.',
    overview:
      'Keeps the raw string while you type — so "12.", "-" and "0.5" are all typeable — then normalises on blur: clamps to min/max, rounds to the number of decimals you asked for, and re-groups thousands. `decimals={0}` is an integer field, `decimals={2}` a float field. Arrow keys and the optional stepper buttons move by `step`.',
    whenToUse: [
      'Quantities and counts: decimals={0}, min={0}, stepper.',
      'Rates, weights and measurements: decimals={2} or {3}.',
      'Large figures where grouping helps: thousandSeparator with Indian grouping.',
    ],
    client: true,
    angularFile: 'number-input.component.ts',
    exports: ['NumberInput'],
    props: [
      { name: 'decimals', type: 'number', defaultValue: '0', description: 'Digits after the point. 0 makes it an integer field.' },
      { name: 'min / max', type: 'number', description: 'Bounds applied on blur and to the stepper.' },
      { name: 'step', type: 'number', defaultValue: '1', description: 'Amount added by the stepper buttons and arrow keys.' },
      { name: 'allowNegative', type: 'boolean', defaultValue: 'false', description: 'Allows a leading minus.' },
      { name: 'thousandSeparator / indianGrouping', type: 'boolean / boolean', defaultValue: 'false / true', description: 'Groups digits while the field is not focused.' },
      { name: 'stepper', type: 'boolean', defaultValue: 'false', description: 'Shows − and + buttons.' },
      { name: 'prefix / suffix', type: 'string', description: 'Unit shown inside the field, e.g. "kg" or "%".' },
      { name: 'onValueChange', type: '(value: number | null) => void', description: 'Receives a number, or null when the field is empty.' },
    ],
    accessibility: [
      'inputMode="numeric" or "decimal" opens the right keypad on mobile.',
      'Arrow Up and Arrow Down step the value, matching native number inputs.',
      'Stepper buttons are tabindex="-1" so they do not add two stops to the tab order.',
    ],
    notes: [
      'The value is only clamped on blur, so typing "150" into a max-100 field is not fought keystroke by keystroke.',
    ],
  },
  {
    slug: 'currency-input',
    name: 'Currency Input',
    category: 'Forms',
    summary: 'Money field — two decimals, grouped thousands and a currency symbol.',
    overview:
      'A NumberInput with the settings that are almost always right for money: two decimals, Indian grouping, no negatives, and the symbol rendered inside the field. Pass `symbol` for a different currency and `allowNegative` for refunds or adjustments.',
    whenToUse: [
      'Invoice amounts, salaries, budgets and expense lines.',
      'Anywhere a plain number field would let someone type three decimals or a stray letter.',
    ],
    client: true,
    angularFile: 'currency-input.component.ts',
    exports: ['CurrencyInput'],
    props: [
      { name: 'symbol', type: 'string', defaultValue: "'₹'", description: 'Currency symbol shown inside the field.' },
      { name: 'decimals', type: 'number', defaultValue: '2', description: 'Digits after the decimal point.' },
      { name: 'allowNegative', type: 'boolean', defaultValue: 'false', description: 'Allows a minus for refunds and adjustments.' },
      { name: 'label / hint / error', type: 'string', description: 'Inherited from NumberInput.' },
      { name: 'onValueChange', type: '(value: number | null) => void', description: 'Receives the parsed amount.' },
    ],
    accessibility: [
      'The symbol is decorative; the accessible name comes from the label.',
      'Grouped thousands are only shown while the field is blurred, so the caret never jumps mid-typing.',
    ],
  },
  {
    slug: 'phone-input',
    name: 'Phone Input',
    category: 'Forms',
    summary: 'Ten-digit mobile field with a country code and live grouping.',
    overview:
      'Digits only, capped at ten, shown as 98765 43210 while typing, with the country code as a fixed prefix. The value handed back is the raw ten digits — what a backend usually stores — while the display stays readable.',
    whenToUse: [
      'Sign-up, OTP and enquiry forms for Indian numbers.',
      'Anywhere a phone number is captured and later used for SMS.',
    ],
    client: true,
    angularFile: 'phone-input.component.ts',
    exports: ['PhoneInput'],
    props: [
      { name: 'countryCode', type: 'string', defaultValue: "'+91'", description: 'Prefix shown on the left.' },
      { name: 'length', type: 'number', defaultValue: '10', description: 'Digits accepted after the prefix.' },
      { name: 'value / defaultValue / onValueChange', type: 'string / string / (digits: string) => void', description: 'The callback receives ten raw digits.' },
      { name: 'label / hint / error', type: 'string', description: 'Built-in field chrome.' },
    ],
    accessibility: [
      'type="tel" and inputMode="numeric" give the phone keypad and the right autofill.',
      'The country code is plain text next to the field, so screen readers read it once.',
    ],
  },
  {
    slug: 'password-input',
    name: 'Password Input',
    category: 'Forms',
    summary: 'Password field with a show/hide toggle and an optional strength meter.',
    overview:
      'A password field that lets people check what they typed, which is the single biggest cause of failed sign-ups. The strength meter is a hint computed from length and character variety — it is not a policy, and the real rules belong on the server.',
    whenToUse: [
      'Sign-in and sign-up forms.',
      'Password reset, where a visible toggle matters most.',
    ],
    client: true,
    angularFile: 'password-input.component.ts',
    exports: ['PasswordInput'],
    props: [
      { name: 'showStrength', type: 'boolean', defaultValue: 'false', description: 'Shows a five-step strength meter under the field.' },
      { name: 'autoComplete', type: 'string', defaultValue: "'current-password'", description: 'Use "new-password" on sign-up so managers offer a generated password.' },
      { name: 'value / defaultValue / onValueChange', type: 'string / string / (value: string) => void', description: 'Controlled or uncontrolled.' },
      { name: 'label / hint / error', type: 'string', description: 'Built-in field chrome.' },
    ],
    accessibility: [
      'The toggle is a button with aria-pressed and a label that changes between Show and Hide.',
      'The strength meter is decorative; the text label carries the meaning.',
    ],
    notes: [
      'The meter is a heuristic. Enforce length, breach checks and reuse rules on the server.',
    ],
  },
  {
    slug: 'dropdown-menu',
    name: 'Dropdown Menu',
    category: 'Navigation',
    summary: 'Action menu with sections, shortcuts, destructive items and keyboard support.',
    overview:
      'A small menu anchored to a trigger: row actions in a table, an account menu, a "more" button. Items can be plain actions, links or destructive actions, and can be grouped under headings with dividers. Escape closes it, arrow keys move between items, and a click outside dismisses it.',
    whenToUse: [
      'Row actions in a table when there are more than two.',
      'Account and settings menus in a header.',
      'Any "More" button that would otherwise become a row of links.',
    ],
    client: true,
    angularFile: 'dropdown-menu.component.ts',
    exports: ['DropdownMenu'],
    props: [
      { name: 'trigger', type: 'ReactElement', description: 'The element that opens the menu. Receives the click handler and ARIA attributes.' },
      { name: 'items', type: 'DropdownItem[]', description: 'Flat list: label, onClick, href, icon, danger, disabled, separatorBefore, shortcut.' },
      { name: 'sections', type: 'DropdownSection[]', description: 'Grouped items with an optional heading.' },
      { name: 'align', type: "'start' | 'end'", defaultValue: "'end'", description: 'Which edge of the trigger the menu lines up with.' },
      { name: 'width', type: 'string', defaultValue: "'w-52'", description: 'Tailwind width class for the panel.' },
    ],
    accessibility: [
      'role="menu" / role="menuitem" with aria-haspopup and aria-expanded on the trigger.',
      'Escape closes the menu; Arrow Up and Arrow Down cycle through the enabled items.',
      'Disabled items stay in the DOM with aria-disabled so the menu does not reflow.',
    ],
  },
  {
    slug: 'data-table',
    name: 'Data Table',
    category: 'Data',
    summary: 'Table driven by columns and rows, with sorting, paging, loading rows and a row-action menu.',
    overview:
      'Pass `columns` and `data` and you get a table: headers, alignment, currency and date formatting, badges, click-to-sort, client-side paging, skeleton rows while loading and an empty state. Add `actions` and the last column is built for you — inline buttons for one or two actions, a dropdown menu for more. When you need markup the props cannot express, `render` per column or the plain Table primitives are still there.',
    whenToUse: [
      'Any list of records with more than three comparable fields.',
      'Admin screens where rows need edit, view and delete actions.',
      'Screens that load data, where skeleton rows avoid a layout jump.',
    ],
    client: true,
    angularFile: 'data-table.component.ts',
    exports: ['DataTable'],
    props: [
      { name: 'columns', type: 'DataTableColumn[]', description: 'key, header, align, width, sortable, type (text | number | currency | date | badge), render, badgeTones, hideBelow.' },
      { name: 'data', type: 'T[]', description: 'Row objects. Keys in `columns` are read from these.' },
      { name: 'rowKey', type: 'string | (row: T) => string | number', description: 'Stable key per row; falls back to the index.' },
      { name: 'actions', type: 'DataTableAction[]', description: 'label, onClick(row), icon, danger, disabled(row), hidden(row).' },
      { name: 'actionsVariant', type: "'auto' | 'inline' | 'menu'", defaultValue: "'auto'", description: 'Buttons for 1–2 actions, a menu beyond that.' },
      { name: 'renderActions', type: '(row: T) => ReactNode', description: 'Replaces the whole actions cell.' },
      { name: 'sortable / defaultSort', type: 'boolean / { key, direction }', description: 'Enables click-to-sort on columns marked sortable.' },
      { name: 'pageSize', type: 'number', description: 'Client-side paging with a "showing x–y of n" footer.' },
      { name: 'loading / loadingRows / empty', type: 'boolean / number / ReactNode', description: 'Skeleton rows, and what to show when there are no records.' },
      { name: 'striped / dense / hoverable / stickyHeader', type: 'boolean', description: 'Density and emphasis options.' },
      { name: 'onRowClick', type: '(row: T) => void', description: 'Makes the whole row clickable.' },
      { name: 'caption / footer', type: 'string / ReactNode', description: 'Table caption and a line under the table.' },
    ],
    accessibility: [
      'Real table semantics: <th scope="col">, aria-sort on the sorted column, and a caption.',
      'Sorting is a real button inside the header cell, so it is keyboard operable.',
      'Loading rows are skeletons marked aria-hidden, so a screen reader is not read a table of empty cells.',
    ],
    notes: [
      'Paging and sorting are client-side — correct for a few thousand rows. For larger datasets, sort and page on the server and pass the page of rows in.',
    ],
  },
];

export const categories: Category[] = [
  'Foundation',
  'Forms',
  'Feedback',
  'Navigation',
  'Data',
];

export function getComponent(slug: string) {
  return components.find((component) => component.slug === slug);
}

export function getComponentsByCategory() {
  return categories
    .map((category) => ({
      category,
      items: components.filter((component) => component.category === category),
    }))
    .filter((group) => group.items.length > 0);
}

export const stats = {
  components: components.length,
  variants: components.length * 3,
  frameworks: 2,
  dependencies: 0,
};
