/**
 * A range of text, as `[start, end]` indexes. `end` is exclusive, like `String#slice`.
 */
export type Boundary = [start: number, end: number];

/**
 * Escape characters that have a special meaning in regular expressions.
 */
const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Find every place in `text` where one of `words` appears, ignoring case.
 *
 * Overlapping and touching matches are merged into a single boundary, and the
 * boundaries are returned in order.
 *
 *   getBoundaries('aaatestaaa', ['test']);
 *   // => [[3, 7]]
 *
 *   getBoundaries('aaa do dollar aaa', ['do', 'dollar']);
 *   // => [[4, 6], [7, 13]]
 */
export const getBoundaries = (text: string, words: readonly string[]): Boundary[] => {
  const matches: Boundary[] = [];

  for (const rawWord of words) {
    const word = rawWord.trim();

    if (!word) {
      continue;
    }

    // Match against the original text rather than a lowercased copy. Lowercasing can change the
    // length of a string (for example, 'İ' becomes two characters), which would shift every index
    // after it.
    for (const match of text.matchAll(new RegExp(escapeRegExp(word), 'gi'))) {
      matches.push([match.index, match.index + match[0].length]);
    }
  }

  matches.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

  const boundaries: Boundary[] = [];

  for (const [start, end] of matches) {
    const last = boundaries[boundaries.length - 1];

    if (last && start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      boundaries.push([start, end]);
    }
  }

  return boundaries;
};
