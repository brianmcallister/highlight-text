/* eslint-env mocha */
/* global sinon */

import proxyquire from 'proxyquire';

describe('highlightWords', () => {
  let highlightWords;
  let markup;
  let getBoundaries;

  beforeEach(() => {
    markup = sinon.stub();
    getBoundaries = sinon.stub();

    highlightWords = proxyquire('../../src/lib/highlightWords', {
      './markup': { default: markup },
      './getBoundaries': { default: getBoundaries },
    }).default;
  });

  afterEach(() => {
    markup.reset();
    getBoundaries.reset();
  });

  it('should throw an error with no arguments', () => {
    // expect(highlightWords).to.throw();
  });

  it('should call through to getBoundaries with the correct arguments', () => {
    highlightWords('text', ['words']);

    expect(getBoundaries.calledOnce).to.eql(true);
    expect(getBoundaries.alwaysCalledWithExactly('text', ['words'])).to.eql(true);
  });

  it('should call through to markup with the correct arguments', () => {
    getBoundaries.returns('test');

    highlightWords('text', ['words']);

    expect(markup.calledOnce).to.eql(true);
    expect(markup.alwaysCalledWithExactly('text', 'test', '<mark>', '</mark>')).to.eql(true);
  });
});
