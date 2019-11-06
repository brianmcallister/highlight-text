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
 * @param {Text} text - Text to mark up.
 * @param {Boundaries} boundaries - Array of boundary tuples.
 * @param {Tag} startTag - Optional start HTML tag.
 * @param {Tag} endTag - Optional end HTML tag.
 *
 * @returns {string} Marked up text.
 */
const markup = (
  text: string,
  boundaries: [number, number],
  startTag: string,
  endTag: string,
) => {
  // Keep track of successful 'markups', instead of the using the index of the
  // reduce iterations, since the reducer will bail out if the boundaries are
  // incorrect or unworkable.
  let markups = 0;
  const tagLength = startTag.length + endTag.length;
  const toString = ((typeof global !== 'undefined' && global) ||
    (typeof window !== 'undefined' && window)).toString;

  return boundaries.reduce((acc, next) => {
    if (toString.call(next) !== '[object Array]') {
      throw new Error('Incorrect boundary. `boundaries` must be Array<number, number>');
    }

    if (next[1] < next[0]) {
      throw new Error('Incorrect boundary. boundary[1] must be greater than boundary[0].');
    }

    // The only time we don't need to account for tag length is when we're
    // marking up the first matched word.
    const first = markups === 0;

    // Don't do anything if the boundaries are outside the length of the `text`.
    if (next[1] < 0 || next[0] > text.length) {
      return acc;
    }

    const offset = first ? 0 : tagLength * markups;
    const startIndex = first ? next[0] : next[0] + offset;
    const endIndex = first ? next[1] : next[1] + offset;

    // Assemble the pieces.
    const start = acc.slice(0, startIndex);
    const word = acc.slice(startIndex, endIndex);
    const end = acc.slice(endIndex);

    markups += 1;

    return `${start}${startTag}${word}${endTag}${end}`;
  }, text);
};

export default markup;
