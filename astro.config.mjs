// @ts-check
import { defineConfig } from 'astro/config';

import netlify from '@astrojs/netlify';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: "https://apis-cristian.netlify.app",
  adapter: netlify(),
  integrations: [tailwind()]
});