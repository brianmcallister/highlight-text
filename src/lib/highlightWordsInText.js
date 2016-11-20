// @flow

const getHighlightWordBoundaries = require('./getHighlightWordBoundaries');
const markup = require('./markup');

/**
 * Highlight `words` in `text.
 *
 * @param {Text} text - Body of text to highlight.
 * @param {Words} words - Array of words to highlight in `text`.
 *
 * @returns {string} Highlighted text.
 */
const highlightWordsInText = (text: Text, words: Words) => {
  const boundaries = getHighlightWordBoundaries(words, text);

  return markup(text, boundaries, '<mark>', '</mark>');
}

module.exports = highlightWordsInText;
