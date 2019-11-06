import getBoundaries from '../getBoundaries';

describe('getBoundaries', () => {
  it('should throw an error when the arguments are incorrect', () => {
    expect(getBoundaries).toThrow();
    // @ts-ignore
    expect(() => getBoundaries('sadfasdfasf', [1])).toThrow();
    // @ts-ignore
    expect(() => getBoundaries(['a'])).toThrow();
  });

  it('should return arrays of word boundaries', () => {
    expect(getBoundaries('aaa', ['a'])).toEqual([[0, 3]]);
    expect(getBoundaries('abababab', ['b', 'a'])).toEqual([[0, 8]]);
    expect(getBoundaries('aaabbb', ['a', 'b'])).toEqual([[0, 6]]);
    expect(getBoundaries('aaa bbb', ['a', 'b'])).toEqual([[0, 3], [4, 7]]);
    expect(getBoundaries('asdf^ asdf % ^ blah $10 asdf$asdf', ['^', '$10']))
      .toEqual([[4, 5], [13, 14], [20, 23]]);

    expect(getBoundaries('aaa\\aaasdf', ['\\\\\\'])).toEqual([]);
    expect(getBoundaries('sadfasdfasf', [])).toEqual([]);
  });
});
