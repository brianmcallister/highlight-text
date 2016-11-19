const highlightNodeContent = require('./highlightNodeContent');
const highlightWordsInText = require('./highlightWordsInText');



module.exports = function(text, words) {
  var testDiv;
  if (words == null) {
    words = [];
  }
  if (words.length === 0) {
    return text;
  }

  if (typeof Element === 'undefined') {
    return highlightWordsInText(words, text);
  }

  testDiv = document.createElement('div');
  testDiv.innerHTML = text;
  highlightNodeContent(testDiv, words);
  // text = _.unescape(testDiv.innerHTML);
  return text;
};
