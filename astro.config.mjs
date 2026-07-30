// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://encaje.ec',
  integrations: [sitemap()],
  image: {
    domains: ['encaje.ec', 'app.encaje.ec', 'encaje-wp.test']
  }
});