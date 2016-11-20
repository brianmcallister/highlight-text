// @flow

const unescapeMap = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#x27;': "'",
  '&#x60;': '`',
};

const unescapeText = (text: Text) => {
  const regex = new RegExp(`(?:${Object.keys(unescapeMap).join('|')})`, 'g');

  return text.replace(regex, match => unescapeMap[match]);
};

export default unescapeText;
