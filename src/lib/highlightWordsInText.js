const getHighlightWordBoundaries = require('./getHighlightWordBoundaries');
const addHighlightWordsMarkup = require('./addHighlightWordsMarkup');

const highlightWordsInText = (text, words) => {
  const boundaries = getHighlightWordBoundaries(words, text);
  
  return addHighlightWordsMarkup(text, boundaries);
}

module.exports = highlightWordsInText;
