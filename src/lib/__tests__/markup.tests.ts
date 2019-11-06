import markup from '../markup';

describe('markup', () => {
  it('should throw an error if called with bad arguments', () => {
    const badBoundaries = ['', 'asdf', [1], [[2, 1]], {}, null];
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
    expect(markup('test', [[1, 2]])).toEqual('test');
  });

  it('should wrap found text with passed prepend and append strings', () => {
    expect(markup('test', [[1, 2]], '+')).toEqual('t+est');
    expect(markup('test', [[1, 2]], '+', '')).toEqual('t+est');
    expect(markup('test', [[1, 2]], '', '+')).toEqual('te+st');
    expect(markup('test', [[1, 2]], '+', '+')).toEqual('t+e+st');
  });

  it('should correctly handle multiple and weird boundaries', () => {
    expect(markup('test', [[0, 1], [2, 3]], '+', '+')).toEqual('+t+e+s+t');
    expect(markup('test', [[0, 1], [2, 3], [15, 16]], '+', '+')).toEqual('+t+e+s+t');
    expect(markup('test', [[-2, -1], [0, 1], [2, 3]], '+', '+')).toEqual('+t+e+s+t');
    expect(markup('test', [[0, 1], [-2, -1], [2, 3]], '+', '+')).toEqual('+t+e+s+t');
  });

  it('should not handle overlapping boundaries.', () => {
    expect(markup('something aaaaa something', [[10, 12], [10, 15]], '-', '-')).toEqual('something -a-a-aaa- something');
  });
});
