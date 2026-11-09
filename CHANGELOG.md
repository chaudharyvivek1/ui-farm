# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses
[semantic versioning](https://semver.org/).

## [0.1.0] — 2026-11-09

### Added

- 19 components across five categories: Button, Badge, Card, Avatar, Separator,
  Input, Textarea, Select, Switch, Checkbox, Label, Alert, Dialog, Tooltip,
  Progress, Skeleton, Accordion, Tabs, Table.
- Three source variants per component: React + TypeScript, React + JavaScript
  and Angular + TypeScript.
- Documentation site built with Next.js App Router and Tailwind CSS v4, with a live
  preview, code tabs, copy buttons, props tables and accessibility notes per
  component.
- Design token file (`registry/theme.css`) with dark and light themes.
- Guides for installation, theming, architecture and adding a component.
- `npm run sync` — generates the JavaScript variants from the TypeScript source with
  esbuild, so the two can never drift.

[0.1.0]: https://github.com/chaudharyvivek1/ui-farm/releases/tag/v0.1.0
