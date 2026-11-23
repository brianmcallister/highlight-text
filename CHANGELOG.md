# Changelog

## 3.0.0

### Breaking changes

- `highlightText` escapes HTML in the text it's given, so its output is safe to insert into a page. Use `highlightNode` to highlight HTML.
- The package has an `exports` map. Deep imports from `dist/` no longer work; import from the package root or from `@brianmcallister/highlight-text/highlightNode`.
- The UMD browser bundle has been removed. The package ships ES modules and CommonJS, with TypeScript types for both.

### Fixes

- A match that contained two or more shorter matches lost its highlight, and the merged ranges could end at fractional indexes, such as `10.5`.
- Text containing characters whose lowercase form is longer, such as `İ`, shifted every later highlight by a character.
- `highlightNode` unescaped the whole result, so escaped text like `&lt;img onerror=...&gt;` became live HTML, and text that looked like a tag became one.
- `highlightNode` with an element returned escaped `&lt;mark&gt;` text instead of `<mark>` elements.
- `highlightNode` parsed HTML strings into a live `<div>`, so images in the input would start loading and their event handlers could run. It now parses into an inert `<template>`.
- `highlightNode` no longer highlights the contents of `<script>`, `<style>` and `<textarea>` elements.
- 2.0.4 removed the `dist/browser` entry point in a patch release, which broke imports of `@brianmcallister/highlight-text/dist/browser`.

### Other changes

- `highlightNode` and `getBoundaries` are exported from the package root, alongside `highlightText`.
- `highlightNode` accepts any `Element`, not just `HTMLElement`.
- Built with tsup and tested with Vitest. CI runs on GitHub Actions, and releases are published from GitHub with npm provenance.
