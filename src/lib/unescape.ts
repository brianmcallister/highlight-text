/**
 * Map of escaped characters.
 * @private
 */
const unescapeMap: { [key: string]: string } = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#x27;': "'",
  '&#x60;': '`',
};

/**
 * Unescape some `text`.
 *
 * @returns {string} Unescaped text.
 */
const unescapeText = (text: string = '') => {
  const regex = new RegExp(`(?:${Object.keys(unescapeMap).join('|')})`, 'g');

  return text.replace(regex, match => unescapeMap[match]);
};

export default unescapeText;
