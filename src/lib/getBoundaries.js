// @flow

module.exports = (words: Words, text: Text) => {
  const textString = text.toLowerCase();

  // Create a RegExp that we'll use to escape RegExp metacharacters from the
  // search string.
  const metaCharacterRegExp = new RegExp(['\\\\', '\\^', '\\$', '\\.', '\\|',
    '\\?', '\\*', '\\+', '\\(', '\\)', '\\[', '\\{'].join('|'), 'g');

  // Reduce the words down into an array of Boundaries.
  const boundaries = words.reduce((acc, next) => {
    const word = next.toLowerCase();

    // Create a new regular expression with escaped RegExp metacharacters.
    const escaped = word.replace(metaCharacterRegExp, match => `\\${match}`);
    const regex = new RegExp(escaped, 'g');

    // Find all matches in the string without reseting the lastIndex.
    // See: http://mzl.la/1yi7TmE
    while (regex.exec(textString)) {
      acc.push([regex.lastIndex - word.length, regex.lastIndex]);
    }

    return acc;
  }, []);

  // Return now if there's one or less boundary.
  if (boundaries.length <= 1) {
    return boundaries;
  }

  // Sort the boundaries by the starting ranges. This makes detecting adjacent
  // boundaries much easier.
  boundaries.sort((a, b) => a[0] - b[0]);

  // Get all the numbers covered by every range in the boundaries. Make sure
  // they're unique.
  const flattened = boundaries.reduce((acc, next, index) => {
    // Push in a floating point number when the _start_ of a range is a unique
    // number. This floating point number allows us to indicate where adjacent
    // boundaries are, even after sorting the flattened array.
    if (index !== 0 && acc.indexOf(next[0]) === -1) {
      acc.push(acc[acc.length - 1] + 0.5);
    }

    // Push in the remaining numbers.
    acc.push(...next);

    return acc;
  }, []);

  // Sort the flat array of word boundaries.
  flattened.sort((a, b) => a - b);

  // Reduce the flat, sorted array of Bounds down into an array of Boundaries.
  return flattened.reduce((acc, next, index) => {
    // On the first iteration, push in a new Boundary.
    if (index === 0) {
      acc.push([next, -1]);

      return acc;
    }

    const last = acc[acc.length - 1];

    // On the last iteration, overwrite the 1st index with the next number.
    if (index === flattened.length - 1) {
      last[1] = next;

      return acc;
    }

    // If the last Boundary's 1st index is -1, push in a new Boundary with
    // the next number at the first index.
    if (last[1] !== -1) {
      acc.push([next, -1]);

      return acc;
    }

    // If the last Boundary's 1st index is -1, check if the current number is
    // a floating point (which indicates a new Boundary needs to be created).
    if (last[1] === -1) {
      if (next % 1 !== 0) {
        // Push in the previous number (we don't care about the floating point
        // numbers after this step, they're just temporary indicators).
        last[1] = flattened[index - 1];
      }
    }

    return acc;
  }, []);
};
