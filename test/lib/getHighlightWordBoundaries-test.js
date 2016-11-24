import getHighlightWordBoundaries from '../../src/lib/getHighlightWordBoundaries';

describe('getHighlightWordBoundaries', () => {
  it('should work', () => {
    expect(getHighlightWordBoundaries).to.throw();
    expect(() => getHighlightWordBoundaries([1], 'sadfasdfasf')).to.throw();
    expect(() => getHighlightWordBoundaries(['a'])).to.throw();

    expect(getHighlightWordBoundaries(['a'], 'aaa')).to.eql([[0, 3]]);
    expect(getHighlightWordBoundaries(['a', 'b'], 'aaabbb')).to.eql([[0, 6]]);
    expect(getHighlightWordBoundaries(['a', 'b'], 'aaa bbb')).to.eql([[0, 3], [4, 7]]);
    expect(getHighlightWordBoundaries(['^', '$10'], 'asdf^ asdf % ^ blah $10 asdf$asdf'))
      .to.eql([[4, 5], [13, 14], [20, 23]]);

    expect(getHighlightWordBoundaries(['\\\\\\'], 'aaa\\aaasdf')).to.eql([]);
    expect(getHighlightWordBoundaries([], 'sadfasdfasf')).to.eql([]);
  });
});
