# Contributing

Thanks for taking the time to improve UI Farm.

## Before you start

- Open an issue for anything larger than a bug fix, so the approach can be agreed
  first.
- One component per pull request. Reviewing a diff that touches twenty files is not
  realistic.

## Ground rules

1. **No new runtime dependencies.** The library's value is that a copied file has no
   dependencies beyond React (or Angular). If a component needs a library, it does
   not belong here.
2. **No brand colours or hard-coded values.** Everything comes from a token in
   `registry/theme.css`.
3. **Both themes, always.** Check the component in dark and light before opening the
   PR.
4. **Keyboard first.** Every interactive element must be reachable with Tab, operable
   with Enter or Space, and show a visible focus ring.
5. **Keep the variants in sync.** If you change a React component, run
   `npm run sync`, and update the Angular file if the behaviour changed.

## Workflow

```bash
git clone https://github.com/chaudharyvivek1/ui-farm.git
cd ui-farm
npm install
npm run sync
npm run dev
```

Make your change, then:

```bash
npm run build   # must pass: type check + static generation
```

## Commit messages

Short, imperative, scoped by area:

```
feat(button): add loading state
fix(dialog): restore body scroll on unmount
docs(theming): correct token table
```

## Pull request checklist

- [ ] `npm run build` passes
- [ ] Component page renders in dark and light
- [ ] Props table updated in `lib/registry.ts` if the API changed
- [ ] Angular variant updated if behaviour changed
- [ ] Accessibility notes are still accurate
