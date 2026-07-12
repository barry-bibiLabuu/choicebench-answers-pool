import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://choicebench-answers-pool.pages.dev",
  trailingSlash: "always",
  integrations: [sitemap()],
  adapter: cloudflare()
});