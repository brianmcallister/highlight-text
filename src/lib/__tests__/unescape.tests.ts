import unescape from '../unescape';

describe('unescape', () => {
  it('should should not throw an error if called with no arguments', () => {
    expect.assertions(1);

    expect(unescape).not.toThrow();
  });

  it('should return a blank string when called with no arguments', () => {
    expect.assertions(1);

    expect(unescape()).toStrictEqual('');
  });

  it('should unescape characters', () => {
    expect.assertions(2);

    expect(unescape('&amp; &lt; &gt; &quot; &#x27; &#x60;')).toStrictEqual('& < > " \' `');
    expect(unescape('test&amp;test&lt;test&gt;test&quot;test&#x27;test&#x60;test')).toStrictEqual(
      'test&test<test>test"test\'test`test',
    );
  });
});
