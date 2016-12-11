import markup from '../../src/lib/markup';

describe('markup', () => {
  it('should return an empty string if called with no arguments', () => {
    expect(markup()).to.eql('');
  });

  it('should return the original string if called with no words', () => {
    expect(markup('')).to.eql('');
    expect(markup('adsfasdf')).to.eql('adsfasdf');
  });

  it('should throw an error if called with incorrect boundaries', () => {
    const badBoundaries = ['', 'asdf', [1], [[2, 1]], {}, null];
    const fn = boundaries => markup('test', boundaries);

    badBoundaries.forEach(bound => expect(fn.bind(null, bound)).to.throw());
  });

  it('should return the original string, even if boundaries are passed, by default', () => {
    expect(markup('test', [[1, 2]])).to.eql('test');
  });

  it('should wrap found text with passed prepend and append strings', () => {
    expect(markup('test', [[1, 2]], '+')).to.eql('t+est');
    expect(markup('test', [[1, 2]], '+', '')).to.eql('t+est');
    expect(markup('test', [[1, 2]], '', '+')).to.eql('te+st');
    expect(markup('test', [[1, 2]], '+', '+')).to.eql('t+e+st');
  });

  it('should correctly handle multiple and weird boundaries', () => {
    expect(markup('test', [[0, 1], [2, 3]], '+', '+')).to.eql('+t+e+s+t');
    expect(markup('test', [[0, 1], [2, 3], [15, 16]], '+', '+')).to.eql('+t+e+s+t');
    expect(markup('test', [[-2, -1], [0, 1], [2, 3]], '+', '+')).to.eql('+t+e+s+t');
    expect(markup('test', [[0, 1], [-2, -1], [2, 3]], '+', '+')).to.eql('+t+e+s+t');
  });

  it('should not handle overlapping boundaries.', () => {
    expect(markup('something aaaaa something', [[10, 12], [10, 15]], '-', '-')).to.eql('something -a-a-aaa- something');
  });
});
