import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { satteri } from "@astrojs/markdown-satteri";
import { mythCards } from "./src/plugins/myth-cards.mjs";

export default defineConfig({
  site: "https://freshfynds.com",
  integrations: [sitemap()],
  markdown: {
    // Turns **Myth:** / **Reality:** paragraph pairs in articles into a card.
    // Sätteri is Astro's default Markdown processor; we only add one plugin.
    processor: satteri({ hastPlugins: [mythCards] }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
