import { describe, expect, it } from 'vitest';

import { getBoundaries } from '../getBoundaries';

describe('getBoundaries', () => {
  it('finds a single match', () => {
    expect(getBoundaries('aaatestaaa', ['test'])).toStrictEqual([[3, 7]]);
  });

  it('finds every occurrence of a word', () => {
    expect(getBoundaries('aaazaaazaaa', ['z'])).toStrictEqual([
      [3, 4],
      [7, 8],
    ]);
  });

  it('returns boundaries in order, whatever the order of the words', () => {
    expect(getBoundaries('one two three', ['three', 'one'])).toStrictEqual([
      [0, 3],
      [8, 13],
    ]);
  });

  it('ignores case', () => {
    expect(getBoundaries('Test TEST test', ['tEsT'])).toStrictEqual([
      [0, 4],
      [5, 9],
      [10, 14],
    ]);
  });

  it('merges a word with a longer word that contains it', () => {
    expect(getBoundaries('aaa do dollar aaa', ['do', 'dollar'])).toStrictEqual([
      [4, 6],
      [7, 13],
    ]);
  });

  it('merges overlapping matches', () => {
    expect(getBoundaries('abc', ['ab', 'bc'])).toStrictEqual([[0, 3]]);
  });

  it('merges touching matches', () => {
    expect(getBoundaries('abcd', ['ab', 'cd'])).toStrictEqual([[0, 4]]);
  });

  // Regression: the old merge produced [[0, 3], [5, 10.5]] here.
  it('merges a long match that contains several shorter ones', () => {
    expect(getBoundaries('abcdefghij', ['abcdefghij', 'c', 'f'])).toStrictEqual([[0, 10]]);
  });

  // Regression: matching against a lowercased copy shifted every index after the 'İ' by one.
  it('keeps indexes right when lowercasing would change the length of the text', () => {
    expect(getBoundaries('İstanbul and Ankara', ['ankara'])).toStrictEqual([[13, 19]]);
  });

  it('treats regular expression characters literally', () => {
    expect(
      getBoundaries('costs $5.00 (or [less]) {ok}', ['$5.00', '(or', '[less]', '{ok}']),
    ).toStrictEqual([
      [6, 11],
      [12, 15],
      [16, 22],
      [24, 28],
    ]);
  });

  it('trims words and skips empty ones', () => {
    expect(getBoundaries('a test', ['  test ', '', '   '])).toStrictEqual([[2, 6]]);
  });

  it('returns no boundaries when nothing matches', () => {
    expect(getBoundaries('abc', ['z'])).toStrictEqual([]);
    expect(getBoundaries('', ['z'])).toStrictEqual([]);
    expect(getBoundaries('abc', [])).toStrictEqual([]);
  });
});
