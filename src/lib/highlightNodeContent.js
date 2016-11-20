import highlightWordsInText from './highlightWordsInText';

const highlightNodeContent = function(node, words) {
  var childNode, content, i, len, ref;
  if (node.childNodes.length) {
    ref = node.childNodes;
    for (i = 0, len = ref.length; i < len; i++) {
      childNode = ref[i];
      highlightNodeContent(childNode, words);
    }
  }
  if (node.nodeType !== 3) {
    return void 0;
  }
  // content = _.escape(node.textContent);
  content = node.textContent;

  if (content.trim() === '') {
    return void 0;
  }
  node.textContent = 'asdf'//highlightWordsInText(words, content);
  return void 0;
};

export default highlightNodeContent;
