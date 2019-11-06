import nodeAPI from '../index';
import highlightWords from '../../lib/highlightWords';

describe('node api', () => {
  it('should be the same as the highlightWords function', () => {
    expect(nodeAPI).toEqual(highlightWords);
  });
});
