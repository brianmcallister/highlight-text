import highlightNodeContent from '../../src/lib/highlightNodeContent';

describe('highlightNodeContent', () => {
  it('should throw an error if called with no arguments', () => {
    expect(highlightNodeContent).to.throw();
  });

  it('should clone the passed in node', () => {
    const node = document.createElement('div');

    sinon.spy(node, 'cloneNode');

    highlightNodeContent(node);

    expect(node.cloneNode.withArgs(true).callCount).to.eql(1);
  });

  it('should highlight text in a node', () => {
    const node = document.createElement('div');

    node.textContent = 'something test something';

    const highlightedNode = highlightNodeContent(node, ['test']);

    expect(node.textContent).to.eql('something test something');
    expect(highlightedNode.textContent).to.eql('something <mark>test</mark> something');
  });

  it('should handle complex nodes', () => {
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

    expect(highlightedNode.outerHTML).to.eql('<div class="node-google"><span>heres some &lt;mark&gt;text&lt;/mark&gt; about something: </span><a href="http://google.com">heres a link to http://&lt;mark&gt;google&lt;/mark&gt;.com</a></div>');
    expect(highlightedNode.textContent).to.eql('heres some <mark>text</mark> about something: heres a link to http://<mark>google</mark>.com');
  });
});
