import unescape from '../unescape';

describe('unescape', () => {
  it('should should not throw an error if called with no arguments', () => {
    expect(unescape).not.toThrow();
  });

  it('should return a blank string when called with no arguments', () => {
    expect(unescape()).toEqual('');
  });

  it('should unescape characters', () => {
    expect(unescape('&amp; &lt; &gt; &quot; &#x27; &#x60;')).toEqual('& < > " \' `');
    expect(unescape('test&amp;test&lt;test&gt;test&quot;test&#x27;test&#x60;test'))
      .toEqual('test&test<test>test"test\'test`test');
  });
});
