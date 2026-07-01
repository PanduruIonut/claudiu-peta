// @ts-check
import { defineConfig } from 'astro/config';

// Project page on GitHub Pages → served under /claudiu-peta/.
// Flat file output (pictura.html, not pictura/index.html) keeps every
// relative asset path working exactly as it did in the hand-written site.
export default defineConfig({
  site: 'https://panduruionut.github.io',
  base: '/claudiu-peta',
  trailingSlash: 'never',
  build: { format: 'file' },
});
