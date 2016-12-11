/* eslint-disable */

const jsdom = require('jsdom');
const node = require('./build/node').default;
const browser = require('./build/browser').default;

global.document = jsdom.jsdom();
global.window = global.document.defaultView;
global.HTMLElement = global.window.HTMLElement;

console.log('---->', browser('test abc <a href="#">asdf</a> test', ['abc', 'asdf', 'href']));

const div = document.createElement('div');
div.textContent = 'test test abc test';

console.log('---->', browser(div, ['abc', 'asdf', 'href']).textContent);
console.log();
console.log('----> ', node('test abc test', ['abc']));
console.log('----> ', node('test abc test', ['test', 'mark']));
console.log('----> ', node('test abc something $10 test', ['test', '$10']));
