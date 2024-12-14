// @ts-nocheck
import { defineConfig } from "astro/config";

import netlify from '@astrojs/netlify/functions';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://apis-cristian.netlify.app/",
  adapter: netlify({
    edgeMiddleware: true
  }),
  output: "server",
  integrations: [tailwind()],
});
