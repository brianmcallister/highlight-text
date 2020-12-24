import nodeAPI from '..';
import { highlightText } from '../highlightText';

describe('node api', () => {
  it('should be the same as the highlightText function', () => {
    expect.assertions(1);
    expect(nodeAPI).toStrictEqual(highlightText);
  });
});
