const highlightWordsInText = require('./highlightWordsInText');

module.exports = function(node, words) {
  var childNode, content, i, len, ref;
  if (node.childNodes.length) {
    ref = node.childNodes;
    for (i = 0, len = ref.length; i < len; i++) {
      childNode = ref[i];
      h.highlightNodeContent(childNode, words);
    }
  }
  if (node.nodeType !== 3) {
    return void 0;
  }
  content = _.escape(node.textContent);
  if (content.trim() === '') {
    return void 0;
  }
  node.textContent = highlightWordsInText(words, content);
  return void 0;
};
