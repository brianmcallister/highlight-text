import { highlightText as nodeAPI } from '..';
import { highlightText } from '../../lib/highlightText';

describe('node api', () => {
  it('should be the same as the highlightText function', () => {
    expect.assertions(1);
    expect(nodeAPI).toStrictEqual(highlightText);
  });
});
