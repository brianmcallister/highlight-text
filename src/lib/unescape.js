// @flow

/**
 * Map of escaped characters.
 * @private
 */
const unescapeMap = {
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
const unescapeText = (text: Text = '') => {
  const regex = new RegExp(`(?:${Object.keys(unescapeMap).join('|')})`, 'g');

  return text.replace(regex, match => unescapeMap[match]);
};

export default unescapeText;
