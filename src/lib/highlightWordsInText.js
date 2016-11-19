const getHighlightWordBoundaries = require('./getHighlightWordBoundaries');
const markup = require('./markup');

const highlightWordsInText = (text, words) => {
  const boundaries = getHighlightWordBoundaries(words, text);

  return markup(text, boundaries, '<mark>', '</mark>');
}

module.exports = highlightWordsInText;
