import { getBoundaries } from './getBoundaries';

/**
 * Elements whose text isn't visible content, so it's never highlighted.
 */
const SKIPPED_ELEMENTS = new Set(['SCRIPT', 'STYLE', 'TEMPLATE', 'TEXTAREA']);

/**
 * Wrap matches of `words` in every text node under `root` with `<mark>` elements.
 */
const highlightTextNodes = (root: Node, words: readonly string[]) => {
  const document = root.ownerDocument ?? (root as Document);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];

  // Collect the nodes first, because replacing them while walking would confuse the walker.
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (!SKIPPED_ELEMENTS.has(node.parentElement?.tagName ?? '')) {
      textNodes.push(node as Text);
    }
  }

  for (const node of textNodes) {
    const text = node.data;
    const boundaries = getBoundaries(text, words);

    if (boundaries.length === 0) {
      continue;
    }

    const fragment = document.createDocumentFragment();
    let cursor = 0;

    for (const [start, end] of boundaries) {
      if (start > cursor) {
        fragment.append(text.slice(cursor, start));
      }

      const mark = document.createElement('mark');
      mark.textContent = text.slice(start, end);
      fragment.append(mark);
      cursor = end;
    }

    if (cursor < text.length) {
      fragment.append(text.slice(cursor));
    }

    node.replaceWith(fragment);
  }
};

/**
 * Highlight `words` in some HTML, wrapping each match in a `<mark>` element.
 *
 * `subject` can be an HTML string or an element. Only text is highlighted: tags, attributes and the
 * contents of `<script>` and `<style>` elements are left alone. An element is never modified; it's
 * cloned first, and its highlighted `outerHTML` is returned.
 *
 * Needs a DOM, so it works in browsers and in environments like jsdom.
 *
 *   highlightNode('<p>some <b>text</b></p>', ['text']);
 *   // => '<p>some <b><mark>text</mark></b></p>'
 */
export const highlightNode = (subject: string | Element, words: readonly string[] = []): string => {
  // With nothing to highlight, return the input as is rather than re-serializing it.
  if (!words.some((word) => word.trim())) {
    return typeof subject === 'string' ? subject : subject.outerHTML;
  }

  if (typeof subject === 'string') {
    // Parse into a <template>, whose contents are inert: scripts don't run and images don't load
    // while the HTML is being highlighted.
    const template = document.createElement('template');
    template.innerHTML = subject;
    highlightTextNodes(template.content, words);

    return template.innerHTML;
  }

  const clone = subject.cloneNode(true) as Element;
  highlightTextNodes(clone, words);

  return clone.outerHTML;
};

export default highlightNode;
