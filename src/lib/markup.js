const markup = function(text, boundaries, startTag = '', endTag = '') {
  return boundaries.reduce((acc, next, index) => {
    let offset;
    let startIndex;
    let endIndex;

    if (index === 0) {
      startIndex = next[0];
      endIndex = next[1];
    } else {
      offset = (startTag.length + endTag.length) * index;
      startIndex = next[0] + offset;
      endIndex = next[1] + offset;
    }

    const start = acc.slice(0, startIndex);
    const word = acc.slice(startIndex, endIndex);
    const end = acc.slice(endIndex);

    return `${start}${startTag}${word}${endTag}${end}`;
  }, text);
};

module.exports = markup;
