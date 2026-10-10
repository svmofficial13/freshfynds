import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Treat empty values from the admin panel ("" or null) as "not set".
const blank = (v: unknown) => (v === "" || v === null ? undefined : v);

const gardening = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/gardening" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.preprocess(blank, z.coerce.date().optional()),
    heroImage: z.preprocess(blank, z.string().optional()),
    heroAlt: z.preprocess(blank, z.string().optional()),
    tags: z.preprocess(blank, z.array(z.string()).default([])),
    draft: z.preprocess(blank, z.boolean().default(false)),
  }),
});

export const collections = { gardening };
