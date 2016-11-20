/* eslint-disable */

const jsdom = require('jsdom');
const node = require('./build/node').default;
const browser = require('./build/browser').default;

global.document = jsdom.jsdom();

console.log('---->', browser('test abc <a href="#">asdf</a> test', ['abc', 'asdf', 'href']));
console.log();
console.log('----> ', node('test abc test', ['abc']));
console.log('----> ', node('test abc test', ['test', 'mark']));
console.log('----> ', node('test abc something $10 test', ['test', '$10']));
