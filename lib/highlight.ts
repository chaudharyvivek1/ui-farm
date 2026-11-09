import 'server-only';

import { createHighlighter, type Highlighter } from 'shiki';

export type CodeLanguage =
  | 'tsx'
  | 'ts'
  | 'jsx'
  | 'js'
  | 'html'
  | 'css'
  | 'bash'
  | 'json';

const languages: CodeLanguage[] = ['tsx', 'ts', 'jsx', 'js', 'html', 'css', 'bash', 'json'];

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-dark-default', 'github-light'],
      langs: languages,
    });
  }
  return highlighterPromise;
}

/**
 * Returns highlighted HTML for a code block. Both themes are emitted, and
 * app/globals.css switches between them with [data-theme] — so toggling the
 * theme needs no re-render and no client JavaScript.
 */
export async function highlight(code: string, lang: CodeLanguage = 'tsx') {
  const highlighter = await getHighlighter();

  return highlighter.codeToHtml(code.trim(), {
    lang,
    themes: { light: 'github-light', dark: 'github-dark-default' },
  });
}
