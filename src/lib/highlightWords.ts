import markup from './markup';
import getBoundaries from './getBoundaries';

/**
 * Highlight `words` in `text.
 */
export default (text: string, words: string[]) => {
  if (words.length === 0) {
    return text;
  }

  const boundaries = getBoundaries(text, words);

  return markup(text, boundaries, '<mark>', '</mark>');
};
