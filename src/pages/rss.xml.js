import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../lib/site';

export async function GET(context) {
  const cols = ['news', 'guides', 'case-studies'];
  const all = [];
  for (const c of cols) {
    const entries = await getCollection(c);
    for (const e of entries) {
      if (e.data.draft) continue;
      all.push({
        title: e.data.title,
        description: e.data.dek,
        pubDate: e.data.date,
        link: `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${c}/${e.id}/`,
        categories: [c, ...e.data.tags],
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
