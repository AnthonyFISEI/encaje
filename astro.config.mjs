// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://app.encaje.ec',
  base: '/front',
  integrations: [sitemap()],
  image: {
    domains: ['encaje.ec', 'app.encaje.ec', 'encaje-wp.test']
  }
});