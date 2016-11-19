const highlightNodeContent = require('../lib/highlightNodeContent');
const highlightWordsInText = require('../lib/highlightWordsInText');

module.exports = function(text, words) {
  var testDiv;
  if (words == null) {
    words = [];
  }
  if (words.length === 0) {
    return text;
  }

  testDiv = document.createElement('div');
  testDiv.innerHTML = text;
  highlightNodeContent(testDiv, words);
  // text = _.unescape(testDiv.innerHTML);
  return text;
};
