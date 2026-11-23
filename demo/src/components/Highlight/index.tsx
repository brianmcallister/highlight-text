import { highlightNode, highlightText } from '@brianmcallister/highlight-text';

interface Props {
  /** Treat `text` as HTML and highlight only its text content. */
  html?: boolean;
  text: string;
  words: string[];
}

/**
 * Render `text` with `words` highlighted.
 */
export const Highlight = ({ html = false, text, words }: Props) => (
  <div
    className="highlight-text"
    style={{ whiteSpace: 'pre-wrap' }}
    dangerouslySetInnerHTML={{
      __html: html ? highlightNode(text, words) : highlightText(text, words),
    }}
  />
);
