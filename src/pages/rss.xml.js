import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const articles = (await getCollection("gardening", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  );
  return rss({
    title: "FreshFynds",
    description: "Real gardening fixes for Indian balconies and terraces.",
    site: context.site,
    items: articles.map((a) => ({
      title: a.data.title,
      description: a.data.description,
      pubDate: a.data.publishDate,
      link: `/gardening/${a.id}/`,
      ...(a.data.heroImage && {
        enclosure: {
          url: new URL(a.data.heroImage, context.site).href,
          type: "image/jpeg",
          length: 0,
        },
      }),
    })),
  });
}
