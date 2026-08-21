// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';

const env = loadEnv('production', process.cwd(), '');

export default defineConfig({
  env: {
    schema: {
      SITE_URL: envField.string({ context: 'server', access: 'secret' }),
    },
  },
  site: env.SITE_URL,
  vite: {
    plugins: [tailwindcss()],
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
