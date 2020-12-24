import { getBoundaries } from '../getBoundaries';

describe('getBoundaries', () => {
  it('should throw an error when the arguments are incorrect', () => {
    expect.assertions(3);
    expect(getBoundaries).toThrow(
      "Cannot read property 'toLowerCase' of undefined",
    );
    // @ts-expect-error should throw
    expect(() => getBoundaries('sadfasdfasf', [1])).toThrow(
      'next.toLowerCase is not a function',
    );
    // @ts-expect-error should throw
    expect(() => getBoundaries(['a'])).toThrow(
      'text.toLowerCase is not a function',
    );
  });

  it('should return arrays of word boundaries', () => {
    expect.assertions(7);

    expect(getBoundaries('aaa', ['a'])).toStrictEqual([[0, 3]]);
    expect(getBoundaries('abababab', ['b', 'a'])).toStrictEqual([[0, 8]]);
    expect(getBoundaries('aaabbb', ['a', 'b'])).toStrictEqual([[0, 6]]);
    expect(getBoundaries('aaa bbb', ['a', 'b'])).toStrictEqual([
      [0, 3],
      [4, 7],
    ]);
    expect(
      getBoundaries('asdf^ asdf % ^ blah $10 asdf$asdf', ['^', '$10']),
    ).toStrictEqual([
      [4, 5],
      [13, 14],
      [20, 23],
    ]);

    expect(getBoundaries('aaa\\aaasdf', ['\\\\\\'])).toStrictEqual([]);
    expect(getBoundaries('sadfasdfasf', [])).toStrictEqual([]);
  });
});
