// @flow

import markup from './markup';

const getBoundaries = require('./getBoundaries');

/**
 * Highlight `words` in `text.
 *
 * @param {Text} text - Body of text to highlight.
 * @param {Words} words - Array of words to highlight in `text`.
 *
 * @returns {string} Highlighted text.
 */
const highlightWords = (text: Text, words: Words) => {
  const boundaries = getBoundaries(words, text);

  return markup(text, boundaries, '<mark>', '</mark>');
};

export default highlightWords;
