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
  /* Los tres CTA de la home nueva. Cada bloque manda un mensaje distinto para que
     en la bandeja se vea DE DONDE viene la persona sin tener que preguntarlo: el
     que llega del hero no sabe nada todavia, el que llega de "how we work" ya ha
     leido los cuatro pasos y viene con la fecha en la cabeza. */
  'hero-call': 'Hola, quiero agendar una llamada para hablar de mi lanzamiento',
  'how-we-work': 'Hola, he leido como trabajáis y quiero agendar una llamada. Mi proxima fecha de lanzamiento es:',
  'close-call': 'Hola, esto es lo que voy a sacar:',
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

/* Sections handle navigation. Tags handle topic browsing. Do not blur the two.

   `path` is the ONLY place a section's URL is written down. Every link is built from it
   through pathOf(), so relocating a section is a one-line edit here plus a redirect
   stub. Case Studies moved under Music Marketing on 2026-08-14 by exactly that route. */
export const SECTIONS = [
  {
    id: 'news',
    label: 'News',
    path: '/news/',
    blurb: 'What changed on the platforms, and what it costs you.',
  },
  {
    id: 'music-marketing',
    label: 'Music Marketing',
    path: '/music-marketing/',
    blurb: 'Step-by-step guides with real numbers. Marketing, money, and the business behind both.',
  },
  {
    id: 'case-studies',
    label: 'Case Studies',
    path: '/music-marketing/case-studies/',
    /* Read this next to RESULTS and keep them apart. Case Studies are OTHER people's
       rollouts pulled apart for teaching. Our own client numbers live at /results/ and
       never use the word "case". If the two ever blur, the commercial page stops
       meaning anything. */
    blurb: 'Major-label rollouts taken apart, so you can steal the structure at your budget.',
    parent: 'music-marketing',
  },
] as const;

/* Virtual sections own no collection: they are navigation surfaces that read across
   the collections above. Keep them OUT of SECTIONS — several pages iterate SECTIONS to
   call getCollection(), and a virtual id there fails the build. */
export const VIRTUAL_SECTIONS = [
  {
    id: 'business',
    /* Renombrada el 14/08. "Business" a secas no decia que hay dentro. La RUTA se
       queda en /business/: cambiarla obligaria a otra redireccion permanente a
       cambio de nada, porque nadie busca una seccion por su slug. */
    label: 'The Money Side',
    path: '/business/',
    blurb: 'Royalties, rights, contracts and how the industry actually pays.',
    tag: 'music-business',
  },
] as const;

/** Where a collection's articles live. Single source of truth for every article URL. */
export const pathOf = (collection: string, slug?: string) => {
  const base = (SECTIONS as readonly any[]).find((s) => s.id === collection)?.path ?? '/';
  return slug ? `${base}${slug}/` : base;
};

/* The navigation bar. Six destinations instead of nine.
   The rule Blanca set: what sells goes in the header, what is read can be grouped.
   Results and Services are the commercial pair, flat and first. Everything editorial
   collapses under Learn — whose children are real anchors in the DOM of every page,
   grouped for the eye and never hidden from a crawler. On mobile the group flattens,
   because a submenu inside a hamburger is two taps to reach News. */
export const NAV = [
  { href: '/results/', label: 'Results', id: 'results' },
  { href: '/services/', label: 'Services', id: 'services' },
  {
    href: '/music-marketing/',
    label: 'Learn',
    id: 'learn',
    children: [
      { href: '/news/', label: 'News', id: 'news', blurb: 'What changed this week.' },
      { href: '/music-marketing/', label: 'Music Marketing', id: 'music-marketing', blurb: 'Playbooks, by release moment.' },
      { href: '/music-marketing/case-studies/', label: 'Case Studies', id: 'case-studies', blurb: 'Famous rollouts, taken apart.' },
      { href: '/business/', label: 'The Money Side', id: 'business', blurb: 'Royalties, rights and contracts.' },
    ],
  },
  { href: '/resources/', label: 'Resources', id: 'resources' },
] as const;

/** Every nav destination, flattened. Drives the mobile menu and the link audit. */
export const NAV_FLAT: { href: string; label: string; id: string }[] = NAV.flatMap((n: any) =>
  n.children ? n.children.map((c: any) => ({ href: c.href, label: c.label, id: c.id }))
             : [{ href: n.href, label: n.label, id: n.id }],
);

/** Which top-level nav item should light up for a given active section id. */
export const NAV_PARENT: Record<string, string> = {
  news: 'learn',
  'music-marketing': 'learn',
  'case-studies': 'learn',
  business: 'learn',
  tags: 'learn',
};

/* The one conversion point in the header, styled as a button rather than a link so it
   stops competing with the editorial sections it would always lose to. */
export const NAV_CTA = { href: '/submit-your-track/', label: 'Submit your track' };

/* Second tier. Topics is navigation of the second order — you reach it from a section,
   not from the masthead — and the rest are exits from the site. */
export const FOOT_NAV = [
  { href: '/tags/', label: 'Topics' },
  { href: '/rss.xml', label: 'RSS' },
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

/* Retired 2026-08-14: /case-studies/<slug>/ -> /music-marketing/case-studies/<slug>/.
   Same rule as LEGACY_GUIDE_SLUGS — hard-coded rather than read from the collection, so
   the stubs survive an article being renamed, re-filed or unpublished. Never delete. */
export const LEGACY_CASE_STUDY_SLUGS = [
  'ariana-grande-petal-presave-machine',
  'charli-xcx-no-dead-air-rollout',
] as const;

/* Results block on the home page.
   Stays OFF until real client numbers exist. The markup is built and the layout is
   reserved, but nothing renders publicly while this is false — the site must never
   show placeholder figures to a visitor. Flip to true when RESULTS has real data. */
export const RESULTS_LIVE = false;

/* El CTA comercial es agendar una llamada, no comprar, y va por WhatsApp como el
   resto del sitio. Decidido el 14/08: el cuello de botella no es cuadrar agendas,
   es que entren consultas, y un calendario pide nombre, correo, huso horario y un
   hueco de 30 minutos antes de que exista ninguna relacion. Ademas la audiencia
   llega de Instagram, en el movil y en España: WhatsApp es su canal por defecto.
   Cuando entren mas consultas de las que se pueden contestar, se cambia. */

/* Los cuatro pasos. Nombran mecánica concreta (Meta ads, playlisting, píxel,
   línea base) a propósito: la referencia de indepenjend cuenta su proceso en
   genérico porque vende un servicio gestionado, y ahí es donde les ganamos. */
/* Servicios que se anaden al proceso segun lo que necesite el disco, no antes.
   El playlisting salio del paso 03 el 14/08: mezclarlo con los anuncios daba a
   entender que van juntos siempre, y la promesa del bloque es la contraria. */
export const EXTRA_SERVICES = [
  { label: 'Playlist pitching', line: 'Your track in front of real curators. No bots, no bought placements.' },
  { label: 'Creative for the ads', line: 'We cut the video and write the copy when you do not have it.' },
  { label: 'Release planning', line: 'The calendar, the assets and the order things go out in.' },
] as const;

export const STEPS = [
  {
    h: 'You send the track',
    p: 'A message with the release date and the link. You do not have to know which service you need. That is our job, and it is the first thing we work out.',
  },
  {
    h: 'We set the baseline and pick the route',
    p: 'Seven days of your current numbers, recorded before a single euro is spent, and a straight answer on what your record needs. Sometimes that is ads. Sometimes it is not.',
  },
  {
    h: 'The Meta ads run',
    p: 'Campaigns built, targeted and optimised in-house, adjusted while they are live. The pixel sits on your account, not ours, so the audience stays yours when we are done.',
  },
  {
    h: 'You get the numbers',
    p: 'Weekly reporting against that baseline, in plain language. The same figures that end up on the results page, if you let us print them.',
  },
] as const;

/* One card per client campaign. `figure` is the single big number; `context` is the
   sentence that carries the BASELINE, and without it the figure means nothing — a
   "+400%" on twelve daily streams is not a result. See the intake template for the
   rules the data has to satisfy before a card can be built.
   `art` is a path under /public; null falls back to the branded plate. */
export type ResultCard = {
  artist: string;
  track: string;
  figure: string;
  label: string;
  context: string;
  baseline: string;
  art?: string | null;
};

/* MUESTRA. Cifras reales y verificadas contra capturas fechadas, sin nombre porque
   todavía no hay permiso por escrito, y sin inversión porque no existe la captura de
   Meta de esas campañas. NO se publican: RESULTS_LIVE sigue en false. Están aquí para
   poder juzgar la forma del bloque. Ver claude/client-cases-inventory.md. */
export const RESULTS: ResultCard[] = [
  {
    artist: 'Spanish urban artist', track: 'Single, 2025',
    figure: '+1,819%', label: 'in Spotify streams',
    context: '26,919 streams over 91 days, from an',
    baseline: '11,969 all-time baseline',
    art: '/img/results/plate-1.webp',
  },
  {
    artist: 'Spanish urban artist', track: 'Single, 2024',
    figure: '+32%', label: 'in monthly listeners',
    context: '5,583 streams in 28 days on 115 EUR of ad spend, from a',
    baseline: '2,436 listener baseline',
    art: '/img/results/plate-2.webp',
  },
  {
    artist: '109RECORDS playlists', track: 'Urban Spanish Essentials',
    figure: '6,089', label: 'streams placed in 12 months',
    context: 'one track, from our own editorial network, on a',
    baseline: 'zero-paid-placement policy',
    art: '/img/results/plate-3.webp',
  },
];
