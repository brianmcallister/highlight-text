import nodeAPI from '../../src/node';
import highlightWords from '../../src/lib/highlightWords';

describe('node api', () => {
  it('should be the same as the highlightWords function', () => {
    expect(nodeAPI).to.eql(highlightWords);
  });
});
