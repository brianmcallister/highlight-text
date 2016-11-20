const highlightWords = require('./src/node');

console.log('----> ', highlightWords('test abc test', ['abc']));
console.log('----> ', highlightWords('test abc test', ['test', 'mark']));
console.log('----> ', highlightWords('test abc something $10 test', ['test', '$10']));
