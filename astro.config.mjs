// @ts-check
import { defineConfig, envField } from 'astro/config';
import { loadEnv } from 'vite';

const env = loadEnv('production', process.cwd(), '');

export default defineConfig({
  // Astro 7 defaults to `compressHTML: 'jsx'`, which strips whitespace between
  // inline elements. This site is typography-led, so keep the HTML-aware
  // compression from Astro 5/6 to preserve inter-word spacing exactly.
  compressHTML: true,
  env: {
    schema: {
      SITE_URL: envField.string({ context: 'server', access: 'secret' }),
    },
  },
  site: env.SITE_URL,
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/gsap')) return 'gsap';
            if (id.includes('node_modules/lenis')) return 'lenis';
          },
        },
      },
    },
  },
});
