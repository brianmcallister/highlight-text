/* eslint-env browser */

const highlightNodeContent = require('../lib/highlightNodeContent');

module.exports = function browser(text, words = []) {
  if (words.length === 0) {
    return text;
  }

  const testDiv = document.createElement('div');

  testDiv.innerHTML = text;
  highlightNodeContent(testDiv, words);
  // text = _.unescape(testDiv.innerHTML);
  return text;
};
