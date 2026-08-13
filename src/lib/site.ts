export const SITE = {
  name: '109MUSIC',
  tagline: 'Music marketing, broken down.',
  description:
    'Music marketing breakdowns for independent artists: release strategy, Spotify and TikTok growth, touring economics and the money lanes that actually pay. Published by 109MUSIC.',
  author: '109MUSIC',
  instagram: 'https://www.instagram.com/109music.co/',
  beacons: 'https://beacons.ai/109music.co',
  lang: 'en',
  /* Bespoke-service enquiries go to WhatsApp, never a payment button. */
  whatsapp: '34651459500',
};

/* Every wa.me link carries a different pre-filled message so the origin of each
   enquiry is readable in the inbox without asking. Add a key, not a raw link. */
export const WA_MESSAGES = {
  'meta-ads': 'Hola, me interesa la gestion de Meta ads para mi musica',
  playlisting: 'Hola, me interesa el servicio de playlisting',
  services: 'Hola, vengo de la pagina de servicios de 109MUSIC',
  results: 'Hola, he visto vuestros resultados y quiero saber mas',
  article: 'Hola, vengo de un articulo de 109MUSIC y quiero que llevéis mi lanzamiento',
  home: 'Hola, quiero que llevéis el marketing de mi musica',
} as const;

export type WaKey = keyof typeof WA_MESSAGES;

/** wa('meta-ads') -> https://wa.me/34651459500?text=... */
export const wa = (key: WaKey) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(WA_MESSAGES[key])}`;

/* Music Marketing is organised by WHERE YOU ARE in a release, not by topic.
   This is presentation only: article URLs never contain the moment, so an article
   can be re-filed without breaking a link. */
export const MOMENTS = [
  { id: 'pre-release', label: 'Before the release', blurb: 'Everything that has to be true before the track is public.' },
  { id: 'release-week', label: 'Release week', blurb: 'The seven days that decide how far the record travels.' },
  { id: 'post-release', label: 'After the release', blurb: 'Turning a launch into something that keeps working.' },
  { id: 'always-on', label: 'Ongoing growth', blurb: 'The work that compounds between releases.' },
] as const;

export type MomentId = (typeof MOMENTS)[number]['id'];
export const MOMENT_IDS = MOMENTS.map((m) => m.id) as unknown as [MomentId, ...MomentId[]];
export const momentOf = (id?: string | null) => MOMENTS.find((m) => m.id === id);

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

/* Virtual sections own no collection: they are navigation surfaces that read across
   the collections above. Keep them OUT of SECTIONS — several pages iterate SECTIONS to
   call getCollection(), and a virtual id there fails the build. */
export const VIRTUAL_SECTIONS = [
  {
    id: 'music-business',
    label: 'Music Business',
    blurb: 'Rights, payouts, platform rules and the money behind the music.',
    tag: 'music-business',
  },
] as const;

/* The navigation bar. Order is deliberate: news first because it changes daily,
   then the two evergreen sections, then the proof. */
export const NAV = [
  { href: '/news/', label: 'News', id: 'news' },
  { href: '/music-marketing/', label: 'Music Marketing', id: 'music-marketing' },
  { href: '/music-business/', label: 'Music Business', id: 'music-business' },
  { href: '/case-studies/', label: 'Case Studies', id: 'case-studies' },
  { href: '/tags/', label: 'Topics', id: 'tags' },
] as const;

export const sectionOf = (id: string) =>
  SECTIONS.find((s) => s.id === id) ?? VIRTUAL_SECTIONS.find((s) => s.id === id);
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

/** Base-aware path: url('/music-marketing/') -> '/music-marketing/' */
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

/* Results block on the home page.
   Stays OFF until real client numbers exist. The markup is built and the layout is
   reserved, but nothing renders publicly while this is false — the site must never
   show placeholder figures to a visitor. Flip to true when RESULTS has real data. */
export const RESULTS_LIVE = false;

export const RESULTS: { figure: string; label: string; artist: string }[] = [
  // { figure: '', label: '', artist: '' },
];
