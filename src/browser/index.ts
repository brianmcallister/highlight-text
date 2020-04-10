import { highlightNodeContent } from '../highlightNodeContent';
import { unescapeText } from '../unescapeText';

/**
 * Highlight `words` in `subject`.
 */
export const browser = (subject: string | HTMLElement, words: string[] = []) => {
  if (words.length === 0) {
    if (subject instanceof HTMLElement) {
      return subject.outerHTML;
    }

    return subject;
  }

  let el;

  if (subject instanceof HTMLElement) {
    el = subject;
  } else {
    // Create a DOM element here so we can detect and properly highlight HTML
    // inside the `subject` argument.
    el = document.createElement('div');
    el.innerHTML = subject;
  }

  // Highlight the content in the new node.
  const highlighted = highlightNodeContent(el, words);

  if (typeof subject === 'string') {
    return unescapeText(highlighted.innerHTML);
  }

  return highlighted.outerHTML;
};
