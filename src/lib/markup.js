// @flow

/**
 * Add markup to `text`, at the places indicated by `boundaries`.
 *
 * We're doing this with exact word boundaries and `String#slice`,
 * because if you were to do this with a regular expression and
 * `String#replace`, you could match against the start and end tags.
 *
 * So for example, this could happen:
 *
 *   markup('test abc test', ['abc', 'mark'], '<mark>', '</mark>');
 *   #=> 'test <<mark>mark</mark>>abc</<mark>mark</mark>> test'
 *
 * ...yeah, oops.
 *
 * @param {string} text - Text to mark up.
 * @param {Array<Array<number, number>>} boundaries - Array of boundary tuples.
 * @param {string} startTag - Optional start HTML tag.
 * @param {string} endTag - Optional end HTML tag.
 *
 * @returns {string} Marked up text.
 */
const markup = (
  text: Text,
  boundaries: Boundaries,
  startTag: Tag = '',
  endTag: Tag = '',
) => {
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
  }, text);
};

module.exports = markup;
