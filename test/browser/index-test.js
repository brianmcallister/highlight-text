import browserAPI from '../../src/browser';

describe('browser api', () => {
  it('should return the subject if there are no words', () => {
    expect(browserAPI('test')).to.eql('test');
  });

  it('should handle string inputs', () => {
    expect(browserAPI('something test something', ['test'])).to.eql('something <mark>test</mark> something');
  });

  it('should handle html element inputs', () => {
    const link = document.createElement('a');
    link.textContent = 'heres a link to http://google.com';
    link.href = 'http://google.com';

    const span = document.createElement('span');
    span.textContent = 'heres some text about something: ';

    const node = document.createElement('div');
    node.classList.add('node-google');
    node.appendChild(span);
    node.appendChild(link);

    const highlightedNode = browserAPI(node, ['text', 'google']);

    expect(highlightedNode.outerHTML).to.eql('<div class="node-google"><span>heres some &lt;mark&gt;text&lt;/mark&gt; about something: </span><a href="http://google.com">heres a link to http://&lt;mark&gt;google&lt;/mark&gt;.com</a></div>');
    expect(highlightedNode.textContent).to.eql('heres some <mark>text</mark> about something: heres a link to http://<mark>google</mark>.com');
  });
});
