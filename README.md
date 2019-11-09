# @brianmcallister/highlight-text [![codecov](https://codecov.io/gh/brianmcallister/highlight-text/branch/master/graph/badge.svg)](https://codecov.io/gh/brianmcallister/highlight-text) [![CircleCI](https://circleci.com/gh/brianmcallister/highlight-text.svg?style=svg)](https://circleci.com/gh/brianmcallister/highlight-text) [![Netlify Status](https://api.netlify.com/api/v1/badges/2b1ad5fe-39ec-4437-a76c-08669e6cef54/deploy-status)](https://app.netlify.com/sites/competent-bose-28432a/deploys)

`highlight-text` makes highlighting words and characters in a string quick and easy. This library is primarily used for adding a visual indicator to any text in a web page, much like the default search feature in your browser.

This is a great way to highlight search results collected from an input field within your application, or a range of possible use cases:

- User configured search terms in a chat application
- Administrator configured announcements
- Visual design elements

By default, the library will accept a string and some sub strings to search for. It will return all of the found strings surrounded by [`<mark>` tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark). This is configurable, in case you want to use any arbitrary string.

## Installation

```sh
npm install @brianmcallister/highlight-text
```

## API

### `highlightText`

This is the default export. Use this function to highlight words in text.

```js
highlightText(text: string, words: string[]): string;
```

#### Example

```js
import highlightText from '@brianmcallister/highlight-text';

highlightText('some text', ['om', 'ex']);
// #=> 's<mark>om</mark>e t<mark>ex</mark>t'
```
