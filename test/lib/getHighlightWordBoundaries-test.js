import getBoundaries from '../../src/lib/getBoundaries';

describe('getBoundaries', () => {
  it('should work', () => {
    expect(getBoundaries).to.throw();
    expect(() => getBoundaries([1], 'sadfasdfasf')).to.throw();
    expect(() => getBoundaries(['a'])).to.throw();

    expect(getBoundaries(['a'], 'aaa')).to.eql([[0, 3]]);
    expect(getBoundaries(['a', 'b'], 'aaabbb')).to.eql([[0, 6]]);
    expect(getBoundaries(['a', 'b'], 'aaa bbb')).to.eql([[0, 3], [4, 7]]);
    expect(getBoundaries(['^', '$10'], 'asdf^ asdf % ^ blah $10 asdf$asdf'))
      .to.eql([[4, 5], [13, 14], [20, 23]]);

    expect(getBoundaries(['\\\\\\'], 'aaa\\aaasdf')).to.eql([]);
    expect(getBoundaries([], 'sadfasdfasf')).to.eql([]);
  });
});
