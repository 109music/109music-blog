import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { TAG_SLUGS } from './lib/site';

const source = z.object({
  name: z.string(),
  url: z.string().url(),
});

/* Hero imagery lands in Stage 2. The field exists now so the index and article
   layouts already reserve the geometry, and Stage 2 is a data change, not a rebuild. */
const hero = z.object({
  src: z.string(),
  alt: z.string(),
  credit: z.string().optional(),
  creditUrl: z.string().url().optional(),
  // 'colour' opts one article out of the default grayscale treatment.
  treatment: z.enum(['grayscale', 'colour']).default('grayscale'),
});

const base = z.object({
  title: z.string(),
  // The dek is the extractable 1-2 sentence answer. AI search lifts this.
  dek: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  // Controlled vocabulary only. An unlisted tag fails the build on purpose.
  tags: z.array(z.enum(TAG_SLUGS)).min(1),
  hero: hero.nullable().default(null),
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
  // Renamed from `guides` on 2026-08-12. Old URLs redirect from src/pages/guides/.
  'music-marketing': mk('music-marketing'),
  'case-studies': mk('case-studies'),
};
