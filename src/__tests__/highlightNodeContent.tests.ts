import { highlightNodeContent } from '../highlightNodeContent';

describe('highlightNodeContent', () => {
  it('should throw an error if called with no arguments', () => {
    expect.assertions(1);

    expect(highlightNodeContent).toThrow();
  });

  it('should clone the passed in node', () => {
    expect.assertions(1);

    const node = document.createElement('div');
    const spy = jest.spyOn(node, 'cloneNode');

    highlightNodeContent(node, ['something']);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should highlight text in a node', () => {
    expect.assertions(2);

    const node = document.createElement('div');

    node.textContent = 'something test something';

    const highlightedNode = highlightNodeContent(node, ['test']);

    expect(node.textContent).toStrictEqual('something test something');
    expect(highlightedNode.textContent).toStrictEqual(
      'something <mark>test</mark> something',
    );
  });

  it('should handle complex nodes', () => {
    expect.assertions(2);

    const link = document.createElement('a');

    link.textContent = 'heres a link to http://google.com';
    link.href = 'http://google.com';

    const span = document.createElement('span');

    span.textContent = 'heres some text about something: ';

    const node = document.createElement('div');

    node.classList.add('node-google');
    node.appendChild(span);
    node.appendChild(link);

    const highlightedNode = highlightNodeContent(node, ['text', 'google']);

    expect(highlightedNode.outerHTML).toStrictEqual(
      '<div class="node-google"><span>heres some &lt;mark&gt;text&lt;/mark&gt; about something: </span><a href="http://google.com">heres a link to http://&lt;mark&gt;google&lt;/mark&gt;.com</a></div>',
    );
    expect(highlightedNode.textContent).toStrictEqual(
      'heres some <mark>text</mark> about something: heres a link to http://<mark>google</mark>.com',
    );
  });
});
