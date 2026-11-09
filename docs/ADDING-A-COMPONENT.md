# Adding a component

The library follows the same five steps for every component. Keeping them in order
means the docs page, the props table and the Angular variant stay consistent.

## 1. Write the React source

Create `components/ui/<name>.tsx`. Conventions:

- Plain function components. No classes, no `forwardRef` — React 19 passes `ref`
  through props, so `{...props}` on the root element is enough.
- Named exports for the component and any sub-parts; a default export as well.
- Spread `...props` onto the root element so `id`, `aria-*` and data attributes work.
- Build class strings by joining arrays — no `clsx` or `tailwind-merge` dependency:

  ```tsx
  className={[base, variants[variant], sizes[size], className].filter(Boolean).join(' ')}
  ```

- Read colours from tokens: `bg-[var(--surface)]`, `text-[var(--muted)]`. Never a raw
  hex value.
- Add `'use client'` only if the component uses state, effects or event handlers.
- Keep the file self-contained: imports from `react` and sibling UI files only.

## 2. Register it

Add an entry to `components` in `lib/registry.ts`:

```ts
{
  slug: 'toast',
  name: 'Toast',
  category: 'Feedback',
  summary: 'One line shown in the corner after an action.',
  overview: 'Two or three sentences on the component and its trade-offs.',
  whenToUse: ['After a save or delete.', 'When the result matters but the page should not move.'],
  client: true,                       // omit if no 'use client'
  angularFile: 'toast.component.ts',
  exports: ['Toast'],
  props: [{ name: 'tone', type: "'info' | 'danger'", defaultValue: "'info'", description: 'Colour of the toast.' }],
  accessibility: ['role="status" so it is announced politely.'],
}
```

The entry drives the sidebar, the component index, the props table, the
`'use client'` badge and the previous/next links. Nothing else needs editing.

## 3. Add the Angular variant

Create `registry/angular/<name>.component.ts`:

- `standalone: true`, `selector: 'uif-<name>'`.
- Signals: `input()` for props, `model()` for two-way bindings.
- `@if` / `@for` control flow, not `*ngIf` / `*ngFor`.
- Form controls implement `ControlValueAccessor` and provide `NG_VALUE_ACCESSOR`
  with `forwardRef`.
- Same Tailwind classes as the React version, so the two look identical.

## 4. Add the preview and the example

- `components/site/demos.tsx` — a `Demo<Name>` function and an entry in the `demos`
  map. Cover the variants a developer is most likely to need.
- `lib/usage.ts` — a short, realistic example (10–15 lines) shown under **Usage**.

## 5. Regenerate and check

```bash
npm run sync     # TypeScript → JavaScript snippets
npm run dev      # check the page in both themes
npm run build    # catches type errors and broken imports
```

## Definition of done

- [ ] Component page renders with a live preview
- [ ] All three tabs show code and copy works
- [ ] Props table matches the implementation
- [ ] Accessibility notes are true — verify with keyboard only
- [ ] Works in dark and light
- [ ] `npm run build` passes
