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
/* Donde se cobra hoy el envio de 5 EUR. Ko-fi, no Stripe: ya funciona, tiene 72
   transacciones detras y no hay un segundo producto que justifique montar una
   pasarela propia todavia. Una sola constante para no repetir la URL. */
export const KOFI = 'https://ko-fi.com/109music';
/* La coleccion publica de listas, para que el artista compruebe el encaje ANTES
   de pagar. Es lo que mas baja la friccion y lo que mas protege la reputacion. */
export const PLAYLISTS_URL = 'https://open.spotify.com/user/31jk6ht3ed5436kzxqjoggmp7cee';

/* LAS DOS LISTAS ACTIVAS, y solo esas. Las otras tres del perfil (bedroom &
   chill, Zyzz Hardstyle, Prod. La Hater) estan inactivas y por eso NO se nombran
   en ninguna parte: prometer cinco listas en una pagina donde se paga, cuando
   solo se programan dos, es una promesa falsa.
   Cifras de guardados leidas en Spotify el 16/08/2026. Si se vuelven a citar,
   se vuelven a leer: es un numero que sube y que aparece junto a un precio. */
export const PLAYLISTS = [
  {
    id: '2fbKli1KFMkNeSHL6NSt5g',
    name: 'Urban Essentials',
    saves: '6,389',
    line: 'Urban, in English and beyond',
    url: 'https://open.spotify.com/playlist/2fbKli1KFMkNeSHL6NSt5g',
  },
  {
    id: '1IsG2UxPdXajXg1raxckya',
    name: 'Urban Spanish Essentials',
    saves: '15,951',
    line: 'The Spanish-language list, and the bigger of the two',
    url: 'https://open.spotify.com/playlist/1IsG2UxPdXajXg1raxckya',
  },
] as const;

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
    /* El h1 de la pagina y la etiqueta de la cabecera NO tienen que coincidir.
       "News" a secas no dice nada y no tiene fuerza como titular; "The Industry
       Wire" si, y ademas dice de que industria hablamos. Un nombre de publicacion
       puro (The Wire, The Signal) solo funciona cuando la publicacion ya es
       conocida, y esta seccion tiene tres articulos: por eso gana el descriptivo.
       Y el h1 CONTIENE la etiqueta: la cabecera dice News, el titulo dice INDUSTRY
       NEWS. Asi no contradice, matiza. Un h1 que renombra la etiqueta hace que el
       visitante dude de si ha llegado donde queria, y ese coste es mayor que el
       caracter que gana el titulo. La URL /news/ no se toca. */
    heading: 'Industry News',
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
   collapses under Blog — whose children are real anchors in the DOM of every page,
   grouped for the eye and never hidden from a crawler. On mobile the group flattens,
   because a submenu inside a hamburger is two taps to reach News. */
export const NAV = [
  { href: '/results/', label: 'Results', id: 'results' },
  { href: '/services/', label: 'Services', id: 'services' },
  {
    href: '/music-marketing/',
    label: 'Blog',
    id: 'blog',
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
  news: 'blog',
  'music-marketing': 'blog',
  'case-studies': 'blog',
  business: 'blog',
  tags: 'blog',
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
   ON desde el 15/08/2026. Estuvo en false mientras faltaba alguna confirmacion:
   la nota del bloque dice que ninguna cifra aparece sin que la artista la haya
   visto y confirmado, y publicar antes habria hecho falsa esa frase el dia uno.
   Las tres confirmaciones estan fechadas en claude/client-cases-inventory.md.
   Si se anade una tarjeta nueva sin confirmar, esto vuelve a false. */
export const RESULTS_LIVE = true;

/* El CTA comercial es agendar una llamada, no comprar, y va por WhatsApp como el
   resto del sitio. Decidido el 14/08: el cuello de botella no es cuadrar agendas,
   es que entren consultas, y un calendario pide nombre, correo, huso horario y un
   hueco de 30 minutos antes de que exista ninguna relacion. Ademas la audiencia
   llega de Instagram, en el movil y en España: WhatsApp es su canal por defecto.
   Cuando entren mas consultas de las que se pueden contestar, se cambia. */

/* Los cuatro pasos. Nombran mecánica concreta (Meta ads, playlisting, píxel,
   línea base) a propósito: la referencia de indepenjend cuenta su proceso en
   genérico porque vende un servicio gestionado, y ahí es donde les ganamos. */
/* Estos tres salieron de Our Process el 14/08 y viven ahora en /services/. El
   rotulo que llevaban, "Added when the record needs it, not before", decia
   literalmente que sobran, que es lo contrario de venderlos. Y "Playlist
   pitching" era el mismo servicio que Playlisting duplicado, asi que se fue.
   Consultations estaba en el dossier a 100 EUR la hora y no estaba en la web. */
export const SERVICES_AROUND = [
  { label: 'Creative for the ads', line: 'We cut the video and write the copy when you do not have it.', price: 'Quoted per campaign' },
  { label: 'Release planning', line: 'The calendar, the assets and the order things go out in.', price: 'Quoted per release' },
  { label: 'Consultations', line: 'Private 1:1 sessions on your career, your organic social, or auditing the campaigns you run yourself.', price: 'Quoted by the hour' },
] as const;

export const STEPS = [
  {
    h: 'Discovery call',
    p: 'Thirty minutes. We map the record, the goal and where you are right now. You leave knowing which service fits, and that read costs nothing whether you hire us or not.',
    shot: null,
  },
  {
    /* Renombrado desde "Services & pricing" del dossier. Aquel titulo describia
       un capitulo del PDF, no un paso, y su copy estaba escrito para alguien que
       tiene el dossier delante: en la web el visitante no lo tiene. */
    h: 'What it costs',
    p: 'Playlist pitching starts at 100 EUR and the whole ladder comes in one message, the same day. Ads are quoted against what you are actually putting out, because the number depends on the spend. Either way it is written down before you commit, the numbers are the same for everyone, and nothing lands on the invoice that was not on that list.',
    shot: null,
  },
  {
    h: 'Selection and payment',
    p: 'You pick what you want to run. We invoice, and the work starts the moment the payment clears. No retainer, no minimum term.',
    shot: null,
  },
  {
    /* EL paso del bloque. El proceso es generico a proposito, porque su gracia es
       que el artista no elige de antemano, pero alguien podia leerlo entero sin
       enterarse de que lo que vendemos son anuncios. Aqui se nombra la mecanica:
       Meta ads como motor, playlisting como acompañamiento. */
    h: 'Strategy in motion',
    p: 'Two engines, and they do different jobs. Meta ads are built, targeted and optimised in-house, run mostly to Spotify: reach you control, with the pixel on your ad account and not ours. Playlisting is pitched to real curators, never bought placements: discovery, listeners who were not looking for you. Most records want both.',
    shot: '/img/steps/step-3.webp',
  },
  {
    h: 'Growth and optimisation',
    p: 'We track against the numbers we recorded before spending anything, and adjust while the campaign is running. Weekly reporting, in plain language.',
    shot: '/img/steps/step-4.webp',
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
  /* Id de Spotify VERIFICADO abriendo cada enlace. Los que llegaron el 14/08
     traian el 2 y el 3 cruzados. De aqui sale la caratula: 640x640 del oEmbed,
     recortada a 600x600 WebP. */
  spotify?: string;
  figure: string;
  label: string;
  context: string;
  baseline: string;
  art?: string | null;
};

/* Tarjetas SIN CIFRA que van detras de los resultados reales.

   POR QUE EXISTEN, y por que no son relleno. Con solo tres tarjetas el carrusel
   tenia 490px de desplazamiento en movil, y la animacion dirigida por scroll
   necesita recorrido: cada naipe apenas recorria un tercio de su rango, y el
   ladeo salia a tirones. Con seis el recorrido pasa a ~1.600px y el movimiento
   se vuelve continuo.

   PERO NO SE INVENTA NADA. Ninguna lleva artista, tema ni cifra: la cifra grande
   es lo que hace que una tarjeta se lea como un resultado, y sin ella no hay
   forma de confundirlas. Y en vez de decir "proximo caso", que se leeria como un
   hueco esperando a llenarse, cada una dice algo verdadero que ese bloque
   necesita decir de todos modos: como se miden las cifras, por que no hay
   nombres, y que se puede hacer para aparecer ahi.

   SUSTITUIRLAS ES UN CAMBIO DE DATOS: se añade el caso real a RESULTS y se borra
   una entrada de aqui. Dos lineas, sin tocar plantilla ni CSS. */
export type ResultNote = {
  kicker: string;
  line: string;
  cta?: { label: string; href: string };
};

export const RESULT_NOTES: ResultNote[] = [
  {
    kicker: 'How these are measured',
    /* Reescrita: la version anterior prometia una captura del punto de partida para
       CADA cifra, y para un lanzamiento desde cero esa captura no existe porque el
       tema no existia. La excepcion explicada es mas creible que la promesa
       generica, porque dice POR QUE el cero no necesita prueba. */
    line: 'Every figure comes from Spotify for Artists on the artist\'s own account, rounded down. No number appears here that the artist has not seen and confirmed.',
  },
];

/* EN PRODUCCION. Tres casos reales, con nombre y permiso de la artista. Sin
   inversion publicitaria porque no existe la captura de Meta de esas campañas y
   aqui no se publica nada que no se pueda ensenar. Ver el inventario en
   claude/client-cases-inventory.md para la procedencia dato a dato. */
export const RESULTS: ResultCard[] = [
  /* Caratulas reales desde el oEmbed de Spotify, 640x640 recortadas a 600x600
     WebP. Ya no es el mosaico de marca. La de Mir Naranjo lleva impreso "Make It
     Real", que es el disco, y la de LA KARMA es la de "Alma Pura" y salen dos
     mujeres: son las portadas autenticas que Spotify sirve para esos temas y las
     dos decisiones estan tomadas y registradas en el inventario.
     Cifras facilitadas por Blanca, redondeadas a la baja, y confirmadas por cada
     artista sobre su propia tarjeta el 15/08/2026. NO son lecturas mias de una
     captura: el inventario marca dato a dato que viene de captura y que viene de
     la clienta. Cambiar una cifra invalida su confirmacion: se vuelve a pedir. */
  {
    artist: 'Mir Naranjo', track: 'LOCA LA CABEZA',
    spotify: '3yeVW681ZDcpi9f9v6f14B',
    figure: '65,000+', label: 'streams',
    context: 'in', baseline: '3 months',
    art: '/img/results/cover-mir.webp',
  },
  {
    artist: 'Hannah Blaze', track: 'A MILLI ON YOU',
    spotify: '76K8ZcrPyjmY8oVevGHfzb',
    figure: '25,000+', label: 'streams',
    context: 'from zero on a new release, in', baseline: '30 days',
    art: '/img/results/cover-hannah.webp',
  },
  {
    /* El "from 500+" se queda: aqui el punto de partida no es un tecnicismo, es
       lo que convierte la cifra en una historia. */
    artist: 'LA KARMA', track: 'NI SANTA, NI PUTA',
    spotify: '4VR9uZbvaInIZndR3dw9oV',
    figure: '25,000+', label: 'monthly listeners',
    context: 'from 500+, in', baseline: '2 months',
    art: '/img/results/cover-karma.webp',
  },
];

/* ==========================================================================
   TESTIMONIOS (16/08/2026)

   Salen de la pagina 6 de la lista de precios, MARKETING > PRICE LISTS 2026 en
   el Drive de info109records. Comprobadas la version inglesa y la espanola: las
   dos dicen exactamente lo mismo y con las mismas cifras.

   LA REGLA QUE MANDA AQUI, Y POR QUE DOS CITAS VAN RECORTADAS:

     Una cita NUNCA repite un numero que su tarjeta de Real Results ya da.

   No es pudor, es que los dos bloques van en la misma pantalla y el numero no
   coincide. Caso a caso:

   - LA KARMA. Su tarjeta mide oyentes mensuales (de 500+ a 25.000+). Su cita
     media lo mismo y decia otra cosa: "from 300 monthly listeners to over
     20.000". Lo de 20.000 contra 25.000 se explica solo, la cita es anterior y
     la campana siguio. Lo que NO se explica es la partida: 300 contra 500+, y
     un punto de partida no crece con el tiempo. Fuera la frase entera. Le queda
     elogio sin datos, y esta bien asi: la prueba la pone su tarjeta, que esta al
     lado. Una cita cargada de cifras compite con la tarjeta en vez de sumar.
   - MIR NARANJO. Su tarjeta mide STREAMS (65.000+). Su cita decia "nearly
     50.000 streams", misma metrica y otro numero: fuera esa parte. Los oyentes
     mensuales se quedan porque su tarjeta no los da, asi que no se pisan y
     ademas aportan un dato que no estaba en ningun sitio.
   - INSTINTO DK. Entera. No lleva ni un numero y no tiene tarjeta, asi que no
     puede contradecir nada. Es tambien la unica que habla de la consultoria.

   `full` guarda la cita completa del PDF. No se usa en la web: esta ahi para
   que dentro de seis meses se vea que se recorto y no haya que abrir el Drive
   para saber si falta algo o si sobraba.

   SI ALGUN DIA HAY CIFRAS CONFIRMADAS POR LA ARTISTA: se actualiza la tarjeta,
   NO se devuelve el numero a la cita. La regla no cambia.
   ========================================================================== */
export type Testimonial = {
  quote: string;
  name: string;
  /* Que hicimos con esa persona. No es el tema, es el servicio, porque el tema
     ya sale en su tarjeta y repetirlo es ruido. */
  work: string;
  full?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Working with 109MUSIC was the best decision I\'ve made.',
    name: 'LA KARMA',
    work: 'Playlisting and Meta ads',
    full: 'Working with 109MUSIC was the best decision I\'ve made. I went from 300 monthly listeners on Spotify to over 20,000.',
  },
  {
    quote: 'I ran Meta Ads with 109MUSIC for my song LOCA LA CABEZA and went from 500 to over 7,000 monthly listeners.',
    name: 'Mir Naranjo',
    work: 'Meta ads',
    full: 'I ran Meta Ads with 109MUSIC for my song LOCA LA CABEZA and went from 500 to over 7,000 monthly listeners and nearly 50,000 streams.',
  },
  {
    quote: 'My consultation with 109MUSIC surprised me. I learned things I didn\'t even know about marketing. I started applying them and my promotion has improved massively.',
    name: 'Instinto DK',
    work: 'Consultation',
  },
];
