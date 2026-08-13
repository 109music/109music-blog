export const SITE = {
  name: '109MUSIC',
  tagline: 'Music marketing, broken down.',
  description:
    'Music marketing breakdowns for independent artists: release strategy, Spotify and TikTok growth, touring economics and the money lanes that actually pay. Published by 109MUSIC.',
  author: '109MUSIC',
  instagram: 'https://www.instagram.com/109music.co/',
  beacons: 'https://beacons.ai/109music.co',
  lang: 'en',
};

/* Sections handle navigation. Tags handle topic browsing. Do not blur the two. */
export const SECTIONS = [
  {
    id: 'news',
    label: 'News',
    blurb: 'What changed on the platforms, and what it costs you.',
  },
  {
    id: 'music-marketing',
    label: 'Music Marketing',
    blurb: 'Step-by-step playbooks with real numbers. Marketing, money, and the business behind both.',
  },
  {
    id: 'case-studies',
    label: 'Case Studies',
    blurb: 'How a real rollout actually worked.',
  },
] as const;

export const sectionOf = (id: string) => SECTIONS.find((s) => s.id === id);
export const labelOf = (id: string) => sectionOf(id)?.label ?? '';

/* Controlled tag vocabulary, taken from the content-system.md cover-pill taxonomy.
   content.config.ts validates against this list, so a typo fails the build instead of
   quietly creating a one-article orphan archive. */
export const TAGS = [
  { slug: 'music-marketing', label: 'Music Marketing', blurb: 'Getting the record in front of people.' },
  { slug: 'music-business', label: 'Music Business', blurb: 'Rights, rules, and how the industry pays.' },
  { slug: 'news', label: 'News', blurb: 'What changed this week.' },
  { slug: 'spotify-growth', label: 'Spotify Growth', blurb: 'Playlists, the algorithm, and streaming share.' },
  { slug: 'tiktok', label: 'TikTok', blurb: 'Sounds, LIVE, and short-form discovery.' },
  { slug: 'instagram', label: 'Instagram', blurb: 'Feed, Reels, and paid social.' },
  { slug: 'release-strategy', label: 'Release Strategy', blurb: 'Rollouts, pre-saves, and release-day velocity.' },
  { slug: 'case-study', label: 'Case Study', blurb: 'A real campaign taken apart.' },
  { slug: 'touring', label: 'Touring', blurb: 'Ticket sales, routing, and the economics of a room.' },
  { slug: 'revenue', label: 'Revenue', blurb: 'Payout lanes, royalties, and direct fan money.' },
] as const;

export type TagSlug = (typeof TAGS)[number]['slug'];

/** The literal tuple the content schema validates against. */
export const TAG_SLUGS = TAGS.map((t) => t.slug) as unknown as [TagSlug, ...TagSlug[]];

export const tagOf = (slug: string) => TAGS.find((t) => t.slug === slug);
export const tagLabel = (slug: string) => tagOf(slug)?.label ?? slug;

/** Vocabulary order, so chips read the same on every page. */
export const orderTags = (slugs: string[] = []) =>
  TAGS.filter((t) => slugs.includes(t.slug)).map((t) => t.slug);

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Base-aware path: url('/music-marketing/') -> '/109music-blog/music-marketing/' */
export const url = (p = '/') => `${BASE}/${p.replace(/^\//, '')}`;

export const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();

export const isoDate = (d: Date) => d.toISOString().split('T')[0];

/** ~200 wpm, rounded up, floor of 1 */
export const readingTime = (body = '') =>
  Math.max(1, Math.round(body.trim().split(/\s+/).length / 200));

export const pad = (n: number) => String(n).padStart(2, '0');

/* Old /guides/ URLs that must never 404. Drives the redirect stubs in src/pages/guides/.
   Keep this list forever, including through any future rename. */
export const LEGACY_GUIDE_SLUGS = [
  'new-ways-your-music-pays-2026',
  'sell-out-your-next-show',
  'spotify-ai-purge-what-it-means',
  'turn-streams-into-fans',
] as const;
