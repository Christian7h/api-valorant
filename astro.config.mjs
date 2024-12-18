// @ts-nocheck
import { defineConfig } from "astro/config";

import netlify from '@astrojs/netlify';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  site: "https://apis-cristian.netlify.app/",
  adapter: netlify({
    edgeMiddleware: true,
    cacheOnDemandPages: true
  }),
  output: "server",
  integrations: [tailwind(), react(), db()],
});
