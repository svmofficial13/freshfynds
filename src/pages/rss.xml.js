import fs from "node:fs";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

// File extension -> image type, for the feed's image attachment ("enclosure").
const IMAGE_TYPES = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

export async function GET(context) {
  const articles = (await getCollection("gardening", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  );

  const items = [];
  for (const a of articles) {
    const item = {
      title: a.data.title,
      description: a.data.description,
      pubDate: a.data.publishDate,
      link: `/gardening/${a.id}/`,
    };

    // Attach the hero image so Pinterest auto-publish has a picture for each article.
    const heroImage = a.data.heroImage;
    if (heroImage) {
      const extension = heroImage.split(".").pop().toLowerCase();
      const type = IMAGE_TYPES[extension];

      // heroImage looks like "/images/gardening/photo.jpg", and the file lives in public/.
      const filePath = `./public${heroImage}`;
      let length = 0;
      if (fs.existsSync(filePath)) {
        length = fs.statSync(filePath).size;
      }

      // Skip images with an unknown type rather than send a wrong one.
      if (type) {
        item.enclosure = {
          url: new URL(heroImage, context.site).href,
          type: type,
          length: length,
        };
      }
    }

    items.push(item);
  }

  return rss({
    title: "FreshFynds",
    description: "Real gardening fixes for Indian balconies and terraces.",
    site: context.site,
    items: items,
  });
}
