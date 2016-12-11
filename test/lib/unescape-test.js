import unescape from '../../src/lib/unescape';

describe('unescape', () => {
  it('should should not throw an error if called with no arguments', () => {
    expect(unescape).to.not.throw();
  });

  it('should return a blank string when called with no arguments', () => {
    expect(unescape()).to.eql('');
  });

  it('should unescape characters', () => {
    expect(unescape('&amp; &lt; &gt; &quot; &#x27; &#x60;')).to.eql('& < > " \' `');
    expect(unescape('test&amp;test&lt;test&gt;test&quot;test&#x27;test&#x60;test'))
      .to.eql('test&test<test>test"test\'test`test');
  });
});
