# AGENTS.md: FreshFynds

FreshFynds (freshfynds.com) is a home gardening website for Indian homes.
Angle: "myth vs reality, step by step, for Indian gardens", based on the
owner's own terrace garden in Punjab. Built with Astro + Tailwind v4,
hosted on Cloudflare Pages (pushing to `main` deploys live).

The owner is a product manager, not a full-time developer. Keep code
simple and readable for a new developer: no clever patterns, no
abstractions "for later", short comments explaining *why*.

## Before every task

1. Run `git pull`. Pages CMS saves articles straight to GitHub, so the
   local copy is often behind.
2. Create a branch for the task: `git switch -c <short-task-name>`.
   Never work directly on `main`.
3. Do NOT push, merge or commit to `main`. The owner reviews and pushes.

## After every task

1. Run `npm run build`. It must finish with no errors.
2. Do not leave a dev server running.
3. End with a short plain-English summary: which files changed and why,
   anything the owner must do (e.g. a new `npm install`), and how to
   check it on the site.

## Commands (Windows PowerShell)

- `npm run dev`: local site at http://localhost:4321
- `npm run build`: production build into `dist/`
- Ask before adding any new npm package.

## Where things are

- Articles: Markdown in `src/content/gardening/` (schema in
  `src/content.config.ts`). `draft: true` shows only in `npm run dev`.
  Template: `example-article-template.md`.
- Article page: `src/pages/gardening/[slug].astro`.
- Photos: `public/images/gardening/` (strip EXIF/location data).
- Layout (header, footer, SEO and share tags): `src/layouts/Layout.astro`.
- Theme colours and fonts: `src/styles/global.css`.
- Homepage monthly sowing block: top of `src/pages/index.astro`.
- RSS feed: `src/pages/rss.xml.js`. Sitemap: `@astrojs/sitemap` in
  `astro.config.mjs`.
- Pages CMS config: `.pages.yml`. If the article schema changes, update
  `.pages.yml` in the same task, or the admin panel breaks.

## Design

- Colours: leaf #24502F, leaf-soft #E4ECDF, marigold #E39B12,
  soil #2B2622, stone #5E625A, paper #F8FAF5.
- Fonts: Bricolage Grotesque (headings), Literata (body).
- Fast on budget phones: no 3D, no heavy animation libraries. CSS-only
  motion that respects `prefers-reduced-motion`.

## Content rules (do not break)

- Do not rewrite article text unless asked. Articles are written and
  approved by the owner.
- No affiliate