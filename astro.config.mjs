import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import outboundGate from './integrations/outbound-gate.mjs';
// Canonical = www (siehe public/.htaccess: non-www -> www, HTTP -> HTTPS).
export default defineConfig({
  site: 'https://www.historische-schuhe.de',
  trailingSlash: 'always',
  integrations: [outboundGate(), sitemap({
      // noindex-Seiten gehoeren nicht in die Sitemap (GSC meldet sie sonst
      // als "Durch noindex-Tag ausgeschlossen").
      filter: (page) =>
        !page.includes("/datenschutz") &&
        !page.includes("/impressum") &&
        !page.includes("/stile"),
    })],
  vite: {
    plugins: [tailwindcss()],
  },
});
