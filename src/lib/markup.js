const markup = (text, boundaries, startTag = '', endTag = '') => {
  const tagLength = startTag.length + endTag.length;

  return boundaries.reduce((acc, next, index) => {
    // The only time we don't need to account for tag length is when we're
    // marking up the first matched word.
    const first = index === 0;
    const offset = first ? 0 : tagLength * index;
    const startIndex = first ? next[0] : next[0] + offset;
    const endIndex = first ? next[1] : next[1] + offset;

    // Assemble the pieces.
    const start = acc.slice(0, startIndex);
    const word = acc.slice(startIndex, endIndex);
    const end = acc.slice(endIndex);

    return `${start}${startTag}${word}${endTag}${end}`;
  }, text)
};

module.exports = markup;
