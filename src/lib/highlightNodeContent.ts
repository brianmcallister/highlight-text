import highlightWords from './highlightWords';

/**
 * Mutate a `node` by highlighting and setting its `textContent` property.
 * @private
 */
const mutateNode = (node: Node, words: string[]) => {
  // We only want to highlight text nodes, so recursively find those nodes.
  if (node.childNodes.length) {
    Array.from(node.childNodes).forEach(childNode => mutateNode(childNode, words));
  }

  if (node.nodeType === 3) {
    // eslint-disable-next-line no-param-reassign
    node.textContent = highlightWords(node.textContent || '', words);
  }
};

/**
 * Highlight content in a `node`.
 */
const highlightNodeContent = (node: HTMLElement, words: string[]) => {
  const subject = node.cloneNode(true);

  // Highlight content in the node by mutating it.
  mutateNode(subject, words);

  return subject as HTMLElement;
};

export default highlightNodeContent;
