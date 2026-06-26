import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://historische-schuhe.de',
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
  },
});
