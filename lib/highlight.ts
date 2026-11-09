import 'server-only';

import { createHighlighter, type Highlighter } from 'shiki';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

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
      // The default Oniguruma engine is a WebAssembly build that needs far more
      // memory than a small CI box has. The JavaScript engine produces the same
      // tokens and keeps `next build` inside ~1 GB.
      engine: createJavaScriptRegexEngine(),
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
    // Without this, Shiki writes inline `color`/`background-color` for the
    // light theme and the code block stays light inside a dark page.
    defaultColor: false,
  });
}
