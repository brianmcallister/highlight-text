// @flow

/* eslint-env browser */

import highlightNodeContent from '../lib/highlightNodeContent';
import unescape from '../lib/unescape';

/**
 * Highlight `words` in `subject`.
 *
 * @param {Subject} subject - Thing to highlight. Can be an HTML element or a string.
 * @param {Words} Words - Array of words to highlight in `subject`;
 *
 * @returns {string} Highlighted version of the Subject.
 */
const browser = (subject: Subject, words: Words = []) => {
  if (words.length === 0) {
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
    return unescape(highlighted.innerHTML);
  }

  return highlighted;
};

export default browser;
