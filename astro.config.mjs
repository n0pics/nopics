// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  devToolbar: { enabled: false },
  site: 'https://n0pics.com',
  integrations: [
    // Une page de projet pas encore révélée se met en noindex et s'exclut
    // aussi du sitemap, via un filtre sur son URL :
    // sitemap({ filter: (page) => !['https://n0pics.com/projets/xxx/'].includes(page) })
    sitemap(),
    react(),
  ],
  adapter: vercel(),
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
    // Autorise l'accès au serveur de dev via un tunnel (ex: aperçu sur téléphone
    // avec Cloudflare Tunnel — *.trycloudflare.com).
    server: {
      allowedHosts: ['.trycloudflare.com'],
    },
  },
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});