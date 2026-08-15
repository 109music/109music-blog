import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { TAG_SLUGS, MOMENT_IDS } from './lib/site';

const source = z.object({
  name: z.string(),
  url: z.string().url(),
});

/* Hero imagery. The field predates Stage 2; what Stage 2 adds is `thumb`, the
   square crop the listing row uses, and the licence trail.

   TREATMENT, decided 2026-08-14: on the WEB photos run untouched. No filter, no
   grayscale. An unmodified photo is not a derivative work, so a Creative Commons
   file needs crediting and nothing else. The grayscale rule survives ONLY in the
   Instagram carousels, which are a separate pipeline with separate sourcing.
   `treatment` therefore stays in the schema so the nine existing articles keep
   validating, and is no longer read by any layout. */
const hero = z.object({
  src: z.string(),
  alt: z.string(),
  /* Square crop for the 96px listing thumbnail. Falls back to `src`. Set it when
     the 16:9 hero loses its subject in a centre crop. */
  thumb: z.string().optional(),
  credit: z.string().optional(),
  creditUrl: z.string().url().optional(),
  /* Licence exactly as the source states it, e.g. "CC BY-SA 4.0". Rendered under
     the photo. An image whose licence cannot be identified does not ship. */
  license: z.string().optional(),
  source: z.enum(['wikimedia', 'presskit', 'own']).optional(),
  /* Donde vive el hero. `background` lo pone de fondo del masthead con el titular
     encima; `below` lo deja debajo, con el masthead negro de siempre.
     NO es una preferencia estetica: medido sobre las nueve imagenes, un hero que
     YA CONTIENE tipografia grande da 2.43:1 contra el titular incluso con el velo
     puesto, y para llevarlo a 4.5 haria falta oscurecer un 40% y aplastar todas
     las demas. Ademas serian dos titulares superpuestos. Los tipograficos van
     `below`. */
  layout: z.enum(['background', 'below']).default('background'),
  // Accepted for backwards compatibility. Not read: the web applies no filter.
  treatment: z.enum(['grayscale', 'colour']).default('colour'),
});

/* A figure placed inside the body. Declared here rather than written into the
   markdown on purpose: the articles are .md, not .mdx, so a body image cannot
   carry a credit or a licence, and those are the two things that cannot be lost.
   `after` is the id of the h2 it follows — the id Astro already generates from
   the heading text. The automation pipeline only ever appends to this array; the
   body it writes stays plain markdown. */
const figure = z.object({
  after: z.string(),
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
  credit: z.string().optional(),
  creditUrl: z.string().url().optional(),
  license: z.string().optional(),
  source: z.enum(['wikimedia', 'presskit', 'own']).optional(),
});

/* A brand data chart, same placement mechanism. Our own numbers, drawn with the
   `.chart` component that has been in the CSS since Stage 1. Zero licensing, and
   it fills a page as well as a photograph does. */
const chart = z.object({
  after: z.string(),
  title: z.string(),
  sub: z.string().optional(),
  bars: z
    .array(
      z.object({
        name: z.string(),
        // Relative bar length, 0-100 after normalising against the largest bar.
        value: z.number(),
        label: z.string(),
        muted: z.boolean().default(false),
      })
    )
    .min(2),
  note: z.string().optional(),
  source: z.string().optional(),
});

const base = z.object({
  title: z.string(),
  // The dek is the extractable 1-2 sentence answer. AI search lifts this.
  dek: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  // Controlled vocabulary only. An unlisted tag fails the build on purpose.
  tags: z.array(z.enum(TAG_SLUGS)).min(1),
  /* Where in a release this belongs. Presentation only — never part of the URL, so an
     article can be re-filed between moments without breaking a single link. */
  moment: z.enum(MOMENT_IDS).nullable().default(null),
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
  /* Body imagery and charts. Both default to empty, so every article written
     before 2026-08-14 validates untouched. */
  figures: z.array(figure).default([]),
  charts: z.array(chart).default([]),
  /* Open Graph override. Left empty the build uses the generated brand card at
     /img/og/<section>/<slug>.jpg. A sourced photo is never used as the OG image:
     a share card cannot carry the credit line, so putting a CC photo there would
     redistribute it without attribution. */
  og: z.string().optional(),
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
