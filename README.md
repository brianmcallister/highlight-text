# @brianmcallister/highlight-text [![Coverage Status](https://coveralls.io/repos/github/brianmcallister/highlight-text/badge.svg?branch=master)](https://coveralls.io/github/brianmcallister/highlight-text?branch=bm-add-c) [![Build Status](https://travis-ci.org/brianmcallister/highlight-text.svg?branch=master)](https://travis-ci.org/brianmcallister/highlight-text) [![Dependencies](https://david-dm.org/brianmcallister/highlight-text.svg)](https://david-dm.org/brianmcallister/highlight-text)

Highlight `words` in some `text`.

## Installation.

`npm i @brianmcallister/highlight-text -SE`

## Browser API.

```js
const highlightText = require('@brianmcallister/highlight-text/browser');

const results = highlightText('some text', ['om', 'ex']);
```

## Node API.

```js
const highlightText = require('@brianmcallister/highlight-text/node');

const results = highlightText('some text', ['om', 'ex']);
```
