import { getBoundaries } from './getBoundaries';

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/**
 * Escape `text` so it can be used as HTML.
 */
const escapeHtml = (text: string) => text.replace(/[&<>"']/g, (char) => ESCAPES[char] ?? char);

/**
 * Highlight `words` in plain `text`, wrapping each match in a `<mark>` element.
 *
 * Returns an HTML string. The rest of the text is escaped, so it's safe to insert into a page even
 * when `text` comes from a user.
 *
 *   highlightText('some text', ['om', 'ex']);
 *   // => 's<mark>om</mark>e t<mark>ex</mark>t'
 */
export const highlightText = (text: string, words: readonly string[]): string => {
  let html = '';
  let cursor = 0;

  for (const [start, end] of getBoundaries(text, words)) {
    html += `${escapeHtml(text.slice(cursor, start))}<mark>${escapeHtml(text.slice(start, end))}</mark>`;
    cursor = end;
  }

  return html + escapeHtml(text.slice(cursor));
};
