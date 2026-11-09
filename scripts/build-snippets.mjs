/**
 * Generates the JavaScript copy-paste snippets from the TypeScript source.
 *
 * The TypeScript components in `components/ui/*.tsx` are the single source of
 * truth. This script strips the types with esbuild so the JS snippet shown on
 * every docs page can never drift from the TS one.
 *
 *   npm run sync
 */
import { transform } from 'esbuild';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const sourceDir = path.join(root, 'components', 'ui');
const outDir = path.join(root, 'lib', 'generated', 'js');

async function main() {
  await mkdir(outDir, { recursive: true });

  const entries = (await readdir(sourceDir)).filter((file) => file.endsWith('.tsx'));
  let count = 0;

  for (const entry of entries) {
    const source = await readFile(path.join(sourceDir, entry), 'utf8');

    const result = await transform(source, {
      loader: 'tsx',
      jsx: 'preserve',
      format: 'esm',
      target: 'es2022',
      legalComments: 'none',
    });

    const header = [
      '/**',
      ` * ${entry.replace('.tsx', '')} — JavaScript version.`,
      ' * Generated from the TypeScript source by scripts/build-snippets.mjs.',
      ' */',
      '',
    ].join('\n');

    await writeFile(
      path.join(outDir, entry.replace(/\.tsx$/, '.jsx')),
      header + result.code,
      'utf8',
    );
    count += 1;
  }

  console.log(`[ui-farm] generated ${count} JavaScript snippets in lib/generated/js`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
