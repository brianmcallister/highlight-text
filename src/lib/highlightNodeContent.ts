import highlightWords from './highlightWords';

/**
 * Mutate a `node` by highlighting and setting its `textContent` property.
 * @private
 *
 * @param {Element} node - Node to highlight.
 * @param {Words} words - Words to highlight in the `node`s content.
 *
 * @returns {void}
 */
const mutateNode = (node, words) => {
  // We only want to highlight text nodes, so recursively find those nodes.
  if (node.childNodes.length) {
    Array.from(node.childNodes)
      .forEach(childNode => mutateNode(childNode, words));
  }

  if (node.nodeType === 3) {
    // eslint-disable-next-line no-param-reassign
    node.textContent = highlightWords(node.textContent, words);
  }
};

/**
 * Highlight content in a `node`.
 *
 * @param {Element} node - Node to highlight.
 * @param {Words} words - Words to highlight in the `node`s content.
 *
 * @returns {Element}
 */
const highlightNodeContent = (node: HTMLElement, words: string[]) => {
  const subject = node.cloneNode(true);

  // Highlight content in the node by mutating it.
  mutateNode(subject, words);

  return subject;
};

export default highlightNodeContent;
