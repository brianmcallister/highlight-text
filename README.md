# @brianmcallister/highlight-text

[![codecov](https://codecov.io/gh/brianmcallister/highlight-text/branch/master/graph/badge.svg)](https://codecov.io/gh/brianmcallister/highlight-text) [![CircleCI](https://circleci.com/gh/brianmcallister/highlight-text.svg?style=svg)](https://circleci.com/gh/brianmcallister/highlight-text) [![npm version](https://badge.fury.io/js/%40brianmcallister%2Fhighlight-text.svg)](https://badge.fury.io/js/%40brianmcallister%2Fhighlight-text)

> Highlight `words` in some `text`

`highlight-text` makes highlighting words and characters in a string quick and easy. This library is primarily used for adding a visual indicator to any text in a web page, much like the default search feature in your browser.

This is a great way to highlight search results collected from an input field within your application, or a range of possible use cases:

- User configured search terms in a chat application
- Administrator configured announcements
- Visual design elements

By default, the library will accept a string and some sub strings to search for. It will return all of the found strings surrounded by [`<mark>` tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark), which can then be styled to match your branding. This is configurable, in case you want to use any arbitrary string.

## Table of contents

- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
	- [`highlightText`](#highlighttext)

## Demo

Hosted demo: [https://highlight-text.netlify.com/](https://highlight-text.netlify.com/)

You can also run the demo locally. To get started:

```sh
git clone git@github.com:brianmcallister/highlight-text.git
cd highlight-text/demo
npm i
npm start
```

###### [⇡ Top](#tableofcontents)

## Installation

```sh
npm install @brianmcallister/highlight-text
```

###### [⇡ Top](#tableofcontents)

## Usage

```js
import highlightText from '@brianmcallister/highlight-text';

highlightText('some text', ['om', 'ex']);
// #=> 's<mark>om</mark>e t<mark>ex</mark>t'
```

###### [⇡ Top](#tableofcontents)

## API

### `highlightText`

This is the default export. Use this function to highlight words in text.

```js
highlightText(text: string, words: string[]): string;
```

###### [⇡ Top](#tableofcontents)
