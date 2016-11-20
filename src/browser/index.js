// @flow

/* eslint-env browser */

import highlightNodeContent from '../lib/highlightNodeContent';
import unescape from '../lib/unescape';

/**
 * Highlight `words` in `text`.
 */
const browser = (text: Text, words: Words = []) => {
  if (words.length === 0) {
    return text;
  }

  // Create a DOM element here so we can detect and properly highlight HTML
  // inside the `text` argument.
  const el = document.createElement('div');

  el.innerHTML = text;

  // Highlight the content in the new node.
  const highlighted = highlightNodeContent(el, words);

  return unescape(highlighted.innerHTML);
};

export default browser;
