import getBoundaries from '../../src/lib/getBoundaries';

describe('getBoundaries', () => {
  it('should throw an error when the arguments are incorrect', () => {
    expect(getBoundaries).to.throw();
    expect(() => getBoundaries('sadfasdfasf', [1])).to.throw();
    expect(() => getBoundaries(['a'])).to.throw();
  });

  it('should return arrays of word boundaries', () => {
    expect(getBoundaries('aaa', ['a'])).to.eql([[0, 3]]);
    expect(getBoundaries('abababab', ['b', 'a'])).to.eql([[0, 8]]);
    expect(getBoundaries('aaabbb', ['a', 'b'])).to.eql([[0, 6]]);
    expect(getBoundaries('aaa bbb', ['a', 'b'])).to.eql([[0, 3], [4, 7]]);
    expect(getBoundaries('asdf^ asdf % ^ blah $10 asdf$asdf', ['^', '$10']))
      .to.eql([[4, 5], [13, 14], [20, 23]]);

    expect(getBoundaries('aaa\\aaasdf', ['\\\\\\'])).to.eql([]);
    expect(getBoundaries('sadfasdfasf', [])).to.eql([]);
  });
});
