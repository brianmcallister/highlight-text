import { describe, expect, it } from 'vitest';

import highlightTextDefault, { highlightText } from '../index';

describe('highlightText', () => {
  it('is the default export', () => {
    expect(highlightTextDefault).toBe(highlightText);
  });

  it('wraps matches in mark elements', () => {
    expect(highlightText('some text', ['om', 'ex'])).toBe('s<mark>om</mark>e t<mark>ex</mark>t');
  });

  it('keeps the original case of the text', () => {
    expect(highlightText('Hello World', ['world'])).toBe('Hello <mark>World</mark>');
  });

  // Regression: the phrase lost its highlight when it contained other matching words.
  it('highlights a phrase that contains other matching words', () => {
    expect(highlightText('the quick brown fox', ['quick brown fox', 'quick', 'fox'])).toBe(
      'the <mark>quick brown fox</mark>',
    );
  });

  it('highlights matches at the start and end of the text', () => {
    expect(highlightText('abcabc', ['abc'])).toBe('<mark>abcabc</mark>');
    expect(highlightText('ab cd ab', ['ab'])).toBe('<mark>ab</mark> cd <mark>ab</mark>');
  });

  it('escapes HTML in the text', () => {
    expect(highlightText('<img src=x onerror="alert(1)"> & cats', ['cats'])).toBe(
      '&lt;img src=x onerror=&quot;alert(1)&quot;&gt; &amp; <mark>cats</mark>',
    );
  });

  it('can highlight characters that need escaping', () => {
    expect(highlightText('a < b', ['<'])).toBe('a <mark>&lt;</mark> b');
  });

  it('escapes the text even when there is nothing to highlight', () => {
    expect(highlightText('<b>', [])).toBe('&lt;b&gt;');
  });
});
