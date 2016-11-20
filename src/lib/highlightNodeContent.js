// @flow

import highlightWordsInText from './highlightWordsInText';

const mutateNode = (node, words) => {
  if (node.childNodes.length) {
    Array.from(node.childNodes)
      .forEach(childNode => mutateNode(childNode, words));
  }

  if (node.nodeType === 3) {
    // eslint-disable-next-line no-param-reassign
    node.textContent = highlightWordsInText(node.textContent, words);
  }
};

const highlightNodeContent = (node: Element, words: Words) => {
  const subject = node.cloneNode(true);

  mutateNode(subject, words);

  return subject;
};

export default highlightNodeContent;
