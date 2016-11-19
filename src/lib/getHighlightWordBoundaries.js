module.exports = function(words, textString) {
  var boundaries, collapsed, escaped, flattened, i, index, j, k, l, last, len, len1, len2, metaCharacterRegExp, num, range, ref, ref1, regex, result, word;
  regex = '';
  boundaries = [];
  textString = textString.toLowerCase();
  metaCharacterRegExp = new RegExp(['\\\\', '\\^', '\\$', '\\.', '\\|', '\\?', '\\*', '\\+', '\\(', '\\)', '\\[', '\\{'].join('|'), 'g');
  for (index = i = 0, len = words.length; i < len; index = ++i) {
    word = words[index];
    word = word.toLowerCase();
    escaped = word.replace(metaCharacterRegExp, function(match) {
      return "\\" + match;
    });
    regex = new RegExp(escaped, 'g');
    while (result = regex.exec(textString)) {
      boundaries.push([regex.lastIndex - word.length, regex.lastIndex]);
    }
  }
  if (boundaries.length <= 1) {
    return boundaries;
  }
  flattened = [];
  collapsed = [];
  boundaries.sort(function(a, b) {
    return a[0] - b[0];
  });
  for (index = j = 0, len1 = boundaries.length; j < len1; index = ++j) {
    range = boundaries[index];
    if (index !== 0 && flattened.indexOf(range[0]) === -1) {
      flattened.push(flattened[flattened.length - 1] + 0.5);
    }
    for (num = k = ref = range[0], ref1 = range[1]; ref <= ref1 ? k <= ref1 : k >= ref1; num = ref <= ref1 ? ++k : --k) {
      if (flattened.indexOf(num) === -1) {
        flattened.push(num);
      }
    }
  }
  flattened.sort(function(a, b) {
    return a - b;
  });
  for (index = l = 0, len2 = flattened.length; l < len2; index = ++l) {
    num = flattened[index];
    last = collapsed[collapsed.length - 1];
    if (index === 0) {
      collapsed.push([num]);
      continue;
    }
    if (index === flattened.length - 1) {
      last.push(num);
      continue;
    }
    if (!last || last.length === 2) {
      collapsed.push([num]);
      continue;
    }
    if (last.length === 1) {
      if (num % 1 !== 0) {
        last.push(flattened[index - 1]);
      }
    }
  }
  return collapsed;
};
