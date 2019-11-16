import markup from '../markup';

describe('markup', () => {
  it('should throw an error if called with bad arguments', () => {
    expect.assertions(9);

    const badBoundaries = ['', 'asdf', [1], [[2, 1]], {}, null];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fn = (boundaries: any) => markup('test', boundaries);

    badBoundaries.forEach(bound => expect(() => fn(bound)).toThrow());

    // @ts-ignore
    expect(() => markup()).toThrow();
    // @ts-ignore
    expect(() => markup('')).toThrow();
    // @ts-ignore
    expect(() => markup('adsfasdf')).toThrow();
  });

  it('should return the original string, even if boundaries are passed, by default', () => {
    expect.assertions(1);

    expect(markup('test', [[1, 2]])).toStrictEqual('test');
  });

  it('should wrap found text with passed prepend and append strings', () => {
    expect.assertions(4);

    /* eslint-disable prettier/prettier */
    expect(markup('test', [[1, 2]], '+')).toStrictEqual('t+est');
    expect(markup('test', [[1, 2]], '+', '')).toStrictEqual('t+est');
    expect(markup('test', [[1, 2]], '', '+')).toStrictEqual('te+st');
    expect(markup('test', [[1, 2]], '+', '+')).toStrictEqual('t+e+st');
    /* eslint-enable prettier/prettier */
  });

  it('should correctly handle multiple and weird boundaries', () => {
    expect.assertions(4);

    /* eslint-disable prettier/prettier */
    expect(markup('test', [[0, 1], [2, 3]], '+', '+')).toStrictEqual('+t+e+s+t');
    expect(markup('test', [[0, 1], [2, 3], [15, 16]], '+', '+')).toStrictEqual('+t+e+s+t');
    expect(markup('test', [[-2, -1], [0, 1], [2, 3]], '+', '+')).toStrictEqual('+t+e+s+t');
    expect(markup('test', [[0, 1], [-2, -1], [2, 3]], '+', '+')).toStrictEqual('+t+e+s+t');
    /* eslint-enable prettier/prettier */
  });

  it('should not handle overlapping boundaries.', () => {
    expect.assertions(1);

    /* eslint-disable-next-line prettier/prettier */
    expect(markup('something aaaaa something', [[10, 12], [10, 15]], '-', '-')).toStrictEqual(
      'something -a-a-aaa- something',
    );
  });
});
