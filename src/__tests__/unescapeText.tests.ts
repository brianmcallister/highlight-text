import { unescapeText } from '../unescapeText';

describe('unescape', () => {
  it('should should not throw an error if called with no arguments', () => {
    expect.assertions(1);

    expect(unescapeText).not.toThrow();
  });

  it('should return a blank string when called with no arguments', () => {
    expect.assertions(1);

    expect(unescapeText()).toStrictEqual('');
  });

  it('should unescape characters', () => {
    expect.assertions(2);

    expect(unescapeText('&amp; &lt; &gt; &quot; &#x27; &#x60;')).toStrictEqual(
      '& < > " \' `',
    );
    expect(
      unescapeText(
        'test&amp;test&lt;test&gt;test&quot;test&#x27;test&#x60;test',
      ),
    ).toStrictEqual('test&test<test>test"test\'test`test');
  });
});
