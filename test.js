const highlightWords = require('./src/node');

console.log(highlightWords('test abc test', ['abc']));
console.log(highlightWords('test abc test', ['test']));
