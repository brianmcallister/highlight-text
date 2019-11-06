import markup from './markup';
import getBoundaries from './getBoundaries';

/**
 * Highlight `words` in `text.
 *
 * @param {Text} text - Body of text to highlight.
 * @param {Words} words - Array of words to highlight in `text`.
 *
 * @returns {string} Highlighted text.
 */
const highlightWords = (text: string, words: string[]) => {
  const boundaries = getBoundaries(text, words);

  return markup(text, boundaries, '<mark>', '</mark>');
};

export default highlightWords;
