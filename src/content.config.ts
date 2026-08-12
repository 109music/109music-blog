import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const source = z.object({
  name: z.string(),
  url: z.string().url(),
});

const base = z.object({
  title: z.string(),
  // The dek is the extractable 1-2 sentence answer. AI search lifts this.
  dek: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  // Beacons comment-keyword CTA (must already have a live automation) or a plain link CTA
  cta: z
    .object({
      keyword: z.string().optional(),
      heading: z.string(),
      line: z.string(),
      buttonText: z.string(),
      buttonUrl: z.string(),
    })
    .optional(),
  // Instagram permalink for the matching carousel. Null until the post is live.
  igEmbed: z.string().nullable().default(null),
  sources: z.array(source).default([]),
  faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  draft: z.boolean().default(false),
});

const mk = (dir: string) =>
  defineCollection({
    loader: glob({ pattern: '**/*.md', base: `./src/content/${dir}` }),
    schema: base,
  });

export const collections = {
  news: mk('news'),
  guides: mk('guides'),
  'case-studies': mk('case-studies'),
};
