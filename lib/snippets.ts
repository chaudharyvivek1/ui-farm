import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { highlight } from './highlight';
import { getComponent } from './registry';

const root = process.cwd();

async function read(relativePath: string) {
  return readFile(path.join(/* turbopackIgnore: true */ root, relativePath), 'utf8');
}

export type CodeVariant = {
  id: 'ts' | 'js' | 'angular';
  label: string;
  framework: string;
  language: 'tsx' | 'jsx' | 'ts';
  filename: string;
  html: string;
  plain: string;
};

/**
 * Builds the three source variants for a component:
 * React + TypeScript, React + JavaScript, Angular + TypeScript.
 */
export async function getCodeVariants(slug: string): Promise<CodeVariant[]> {
  const meta = getComponent(slug);
  if (!meta) return [];

  const [tsSource, jsSource, angularSource] = await Promise.all([
    read(`components/ui/${meta.slug}.tsx`).catch(() => ''),
    read(`lib/generated/js/${meta.slug}.jsx`).catch(
      () => '/* Run `npm run sync` to generate the JavaScript version. */',
    ),
    read(`registry/angular/${meta.angularFile}`).catch(() => ''),
  ]);

  const [tsHtml, jsHtml, angularHtml] = await Promise.all([
    highlight(tsSource, 'tsx'),
    highlight(jsSource, 'jsx'),
    highlight(angularSource, 'ts'),
  ]);

  return [
    {
      id: 'ts',
      label: 'TypeScript',
      framework: 'React',
      language: 'tsx',
      filename: `${meta.slug}.tsx`,
      html: tsHtml,
      plain: tsSource,
    },
    {
      id: 'js',
      label: 'JavaScript',
      framework: 'React',
      language: 'jsx',
      filename: `${meta.slug}.jsx`,
      html: jsHtml,
      plain: jsSource,
    },
    {
      id: 'angular',
      label: 'TypeScript',
      framework: 'Angular',
      language: 'ts',
      filename: meta.angularFile,
      html: angularHtml,
      plain: angularSource,
    },
  ];
}

/** Highlighted source for a plain file, used by the guides. */
export async function getSnippet(relativePath: string, language: 'tsx' | 'ts' | 'css' | 'bash' | 'json') {
  const source = await read(relativePath).catch(() => '');
  const html = await highlight(source, language);
  return { html, plain: source };
}
