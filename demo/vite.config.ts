import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  // Relative asset paths, so the build works under the /highlight-text/ subpath on GitHub Pages.
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      // Use the library source from this repository, so the demo always shows the current code.
      '@brianmcallister/highlight-text': fileURLToPath(new URL('../src/index.ts', import.meta.url)),
    },
  },
});
