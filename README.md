<h1>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/brianmcallister/highlight-text/main/.github/assets/logo-dark.svg">
    <img alt="@brianmcallister/highlight-text" src="https://raw.githubusercontent.com/brianmcallister/highlight-text/main/.github/assets/logo-light.svg" height="48">
  </picture>
</h1>

[![CI](https://github.com/brianmcallister/highlight-text/actions/workflows/ci.yml/badge.svg)](https://github.com/brianmcallister/highlight-text/actions/workflows/ci.yml) [![npm version](https://img.shields.io/npm/v/@brianmcallister/highlight-text?label=version&color=%2354C536&logo=npm)](https://www.npmjs.com/package/@brianmcallister/highlight-text)

> Highlight `words` in some `text`

`highlight-text` makes highlighting words and characters in a string quick and easy. This library is primarily used for adding a visual indicator to any text in a web page, much like the default search feature in your browser.

This is a great way to highlight search results collected from an input field within your application, or a range of possible use cases:

- User configured search terms in a chat application
- Administrator configured announcements
- Visual design elements

By default, the library will accept a string and some sub strings to search for. It will return all of the found strings surrounded by [`<mark>` tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark), which can then be styled to match your branding. This is configurable, in case you want to use any arbitrary string or HTML tag.

## Table of contents

- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [`highlightText`](#highlighttext)

## Demo

Hosted demo: [https://brianmcallister.github.io/highlight-text/](https://brianmcallister.github.io/highlight-text/)

You can also run the demo locally. To get started:

```sh
git clone git@github.com:brianmcallister/highlight-text.git
cd highlight-text/demo
npm i
npm start
```

###### [⇡ Top](#table-of-contents)

## Installation

```sh
npm install @brianmcallister/highlight-text
```

###### [⇡ Top](#table-of-contents)

## Usage

```js
import highlightText from '@brianmcallister/highlight-text';

highlightText('some text', ['om', 'ex']);
// => 's<mark>om</mark>e t<mark>ex</mark>t'
```

Matching ignores case, and overlapping matches are combined into a single `<mark>`. The result is an HTML string, so insert it with `innerHTML` (or `dangerouslySetInnerHTML` in React).

To highlight text inside existing HTML, use `highlightNode`:

```js
import { highlightNode } from '@brianmcallister/highlight-text';

highlightNode('<p>some <b>text</b></p>', ['text']);
// => '<p>some <b><mark>text</mark></b></p>'
```

###### [⇡ Top](#table-of-contents)

## API

### `highlightText`

The default export. Highlights `words` in plain `text`, wrapping each match in `<mark>`.

```ts
highlightText(text: string, words: readonly string[]): string;
```

The rest of the text is HTML-escaped, so the result is safe to insert into a page even when `text` comes from a user. Works anywhere, including on a server.

### `highlightNode`

Highlights `words` in HTML. `subject` can be an HTML string or a DOM element.

```ts
highlightNode(subject: string | Element, words?: readonly string[]): string;
```

Only text is highlighted. Tags, attributes and the contents of `<script>` and `<style>` elements are left alone. An element is never modified: it's cloned, and the highlighted copy's `outerHTML` is returned. HTML strings are parsed into an inert `<template>`, so scripts don't run and images don't load while highlighting.

`highlightNode` needs a DOM, so use it in a browser or with something like [jsdom](https://github.com/jsdom/jsdom). It's also available as `@brianmcallister/highlight-text/highlightNode`.

### `getBoundaries`

Returns where `words` appear in `text`, as `[start, end]` index pairs, with overlapping and touching matches merged. `highlightText` and `highlightNode` use it, and it's handy if you want to build your own markup.

```ts
getBoundaries(text: string, words: readonly string[]): [start: number, end: number][];

getBoundaries('aaa do dollar aaa', ['do', 'dollar']);
// => [[4, 6], [7, 13]]
```

###### [⇡ Top](#table-of-contents)

## Upgrading from 2.x

Version 3 fixes several bugs, and two of the fixes change output:

- `highlightText` now escapes HTML in the text. `highlightText('a <b> c', ['c'])` returns `'a &lt;b&gt; <mark>c</mark>'`. If you were passing HTML to `highlightText`, use `highlightNode` instead.
- `highlightNode` with an element now returns real `<mark>` elements instead of escaped `&lt;mark&gt;` text.

Imports changed too:

- The package has an `exports` map, so imports from `@brianmcallister/highlight-text/dist/...` no longer work. Import `highlightNode` from the package root, or from `@brianmcallister/highlight-text/highlightNode`.
- The UMD bundle is gone. The package ships ES modules and CommonJS.

See the [changelog](CHANGELOG.md) for everything else.

###### [⇡ Top](#table-of-contents)
