---
title: Example article (template, not published)
description: One or two sentences that appear in Google results and on the Gardening page.
publishDate: 2026-10-10
updatedDate: 2026-10-10
tags:
  - template
draft: true
---
This file is a template. Because `draft: true` is set above, it only shows
when you preview the site on your computer (`npm run dev`), never on the
live site.

## How to write a new article

1. Copy this file and rename it, using lowercase words and hyphens, for

  example `small-lemons-in-pots.md`. The file name becomes the web address:
   freshfynds.com/gardening/small-lemons-in-pots/
2. Change the title, description and date at the top.
3. Set `draft: false` when it's ready to go live.
4. Write the article below the `---` line using Markdown:

  `## Heading`, `**bold**`, `- list item`, `[link text](https://...)`.

Photos go in `public/images/gardening/` and are added like this:

![Small lemons on my 12-masi lemon plant](/images/gardening/example.jpg)

