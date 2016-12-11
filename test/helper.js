import chai from 'chai';
import jsdom from 'jsdom';
import sinon from 'sinon';

global.sinon = sinon;
global.expect = chai.expect;
chai.config.includeStack = true;

// Create a browser-like environment.
global.document = jsdom.jsdom();
global.window = global.document.defaultView;
global.navigator = global.window.navigator;
global.HTMLElement = global.window.HTMLElement;
