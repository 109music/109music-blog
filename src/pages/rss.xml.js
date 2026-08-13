import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE, SECTIONS, labelOf, tagLabel } from '../lib/site';

export async function GET(context) {
  const all = [];
  for (const s of SECTIONS) {
    const entries = await getCollection(s.id);
    for (const e of entries) {
      if (e.data.draft) continue;
      all.push({
        title: e.data.title,
        description: e.data.dek,
        pubDate: e.data.date,
        link: `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${s.id}/${e.id}/`,
        // Section label first, then the controlled tag vocabulary.
        categories: [labelOf(s.id), ...e.data.tags.map((t) => tagLabel(t))],
      });
    }
  }
  all.sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    site: context.site,
    items: all,
    customData: `<language>en-gb</language>`,
  });
}
