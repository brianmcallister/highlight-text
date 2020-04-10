import browser from '../index';

describe('browser api', () => {
  it('should return the subject if there are no words', () => {
    expect.assertions(1);

    expect(browser('test')).toStrictEqual('test');
  });

  it('should handle string inputs', () => {
    expect.assertions(1);

    expect(browser('something test something', ['test'])).toStrictEqual(
      'something <mark>test</mark> something',
    );
  });

  it('should handle html element inputs', () => {
    expect.assertions(1);

    const link = document.createElement('a');

    link.textContent = 'heres a link to http://google.com';
    link.href = 'http://google.com';

    const span = document.createElement('span');

    span.textContent = 'heres some text about something: ';

    const node = document.createElement('div');

    node.classList.add('node-google');
    node.appendChild(span);
    node.appendChild(link);

    const highlightedNode = browser(node, ['text', 'google']);

    expect(highlightedNode).toStrictEqual(
      '<div class="node-google"><span>heres some &lt;mark&gt;text&lt;/mark&gt; about something: </span><a href="http://google.com">heres a link to http://&lt;mark&gt;google&lt;/mark&gt;.com</a></div>',
    );
  });
});
