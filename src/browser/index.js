// @flow

/* eslint-env browser */

import highlightNodeContent from '../lib/highlightNodeContent';
import unescape from '../lib/unescape';

const browser = (text: Text, words: Words = []) => {
  if (words.length === 0) {
    return text;
  }

  const el = document.createElement('div');

  el.innerHTML = text;

  const highlighted = highlightNodeContent(el, words);

  return unescape(highlighted.innerHTML);
};

export default browser;
