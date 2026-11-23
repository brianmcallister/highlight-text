import { describe, expect, it, vi } from 'vitest';

import { highlightNode } from '../highlightNode';
import { highlightNode as fromIndex } from '../index';

describe('highlightNode', () => {
  it('is exported from the package entry point', () => {
    expect(fromIndex).toBe(highlightNode);
  });

  it('returns the subject untouched when there are no words', () => {
    expect(highlightNode('<p>unclosed')).toBe('<p>unclosed');
    expect(highlightNode('<p>unclosed', ['', ' '])).toBe('<p>unclosed');
  });

  it('highlights text in an HTML string', () => {
    expect(highlightNode('something test something', ['test'])).toBe(
      'something <mark>test</mark> something',
    );
  });

  it('highlights text inside nested elements, but not tags or attributes', () => {
    expect(
      highlightNode('<a href="/test" title="test">a <b>test</b> link</a>', ['test', 'link']),
    ).toBe('<a href="/test" title="test">a <b><mark>test</mark></b> <mark>link</mark></a>');
  });

  // Regression: escaped text used to be unescaped into live HTML.
  it('keeps escaped text escaped', () => {
    expect(highlightNode('&lt;img src=x onerror=alert(1)&gt; cats', ['cats'])).toBe(
      '&lt;img src=x onerror=alert(1)&gt; <mark>cats</mark>',
    );
  });

  // Regression: text that looked like a mark tag used to become one.
  it('does not turn text that looks like a tag into one', () => {
    expect(highlightNode('a &lt;mark&gt; b', ['b'])).toBe('a &lt;mark&gt; <mark>b</mark>');
  });

  it('does not run scripts or load images while parsing a string', () => {
    const onerror = vi.fn();
    // @ts-expect-error A global the injected handler would call.
    globalThis.onerrorSpy = onerror;

    highlightNode('<img src="x" onerror="onerrorSpy()"> cats', ['cats']);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(onerror).not.toHaveBeenCalled();
        resolve();
      }, 50);
    });
  });

  it('leaves script and style contents alone', () => {
    expect(highlightNode('<style>.test {}</style><p>test</p>', ['test'])).toBe(
      '<style>.test {}</style><p><mark>test</mark></p>',
    );
  });

  // Regression: element input used to return escaped &lt;mark&gt; tags.
  it('highlights an element and returns its outerHTML', () => {
    const link = document.createElement('a');
    link.href = 'http://google.com';
    link.textContent = 'heres a link to http://google.com';

    const span = document.createElement('span');
    span.textContent = 'heres some text about something: ';

    const node = document.createElement('div');
    node.classList.add('node-google');
    node.append(span, link);

    expect(highlightNode(node, ['text', 'google'])).toBe(
      '<div class="node-google"><span>heres some <mark>text</mark> about something: </span><a href="http://google.com">heres a link to http://<mark>google</mark>.com</a></div>',
    );
  });

  it('does not modify the element it is given', () => {
    const node = document.createElement('p');
    node.textContent = 'some text';

    highlightNode(node, ['text']);

    expect(node.outerHTML).toBe('<p>some text</p>');
  });
});
