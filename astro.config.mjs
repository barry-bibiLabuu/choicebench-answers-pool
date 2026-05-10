import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://choicebench-answers-pool.pages.dev",
  trailingSlash: "always",
  integrations: [sitemap()]
});
