const getHighlightWordBoundaries = require('./getHighlightWordBoundaries');
const markup = require('./markup');

/**
 * Highlight `words` in `text.
 *
 * @param {string} text - Body of text to highlight.
 * @param {Array<string>} words - Array of words to highlight in `text`.
 *
 * @returns {string} Highlighted text.
 */
const highlightWordsInText = (text, words) => {
  const boundaries = getHighlightWordBoundaries(words, text);

  return markup(text, boundaries, '<mark>', '</mark>');
}

module.exports = highlightWordsInText;
