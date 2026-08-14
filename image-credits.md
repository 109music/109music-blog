# Blog image credits — 109MUSIC

Every image published on the blog is logged here with its source and licence before it
ships. An image with no identifiable licence or press-use basis does not go on the site.

## The licensing chain (binding, from the build spec)

1. Wikimedia Commons / Creative Commons
2. Official press photos — label press rooms, artist press kits, festival media pages
3. Free stock (Unsplash, Pexels) — **non-artist imagery only**

Acceptable licences: CC0, public domain, CC BY, CC BY-SA.
**Not acceptable:** CC BY-NC, CC BY-ND, fair use, "found on Google", or any file whose
licence page cannot be produced on request.

Where no clean licence exists, the fallback is an original branded graphic. Some articles
will land on the fallback. That is the correct outcome, not a failure.

## The two-pipeline rule

Blog imagery and carousel imagery are **separate pipelines with different sourcing rules.**

- The **blog** uses the licensed chain above, only.
- The **carousel** uses Rule A (Google Images, highest resolution, sharp at 1080px, no
  watermarks) and stays exactly as it is.

Neither pipeline's images are automatically valid in the other. In particular the W35
carousel photos prefixed `gi-` came from Vogue, People, Billboard and Hearst CDNs and are
largely Getty-derived. They are fine at 0.48 opacity under a black overlay in a social
carousel. **They are not fine as a credited image on a public indexed site**, at hero size
or any other size.

## Status — 2026-08-13

**No photographic imagery has shipped yet.** Hero sourcing is blocked, see below.

### Original graphics in use (no licence needed — all 109MUSIC work)

| Article | Graphic | Notes |
|---|---|---|
| news/luminate-midyear-2026 | Bar chart, global vs US on-demand stream growth | HTML/CSS, brand colours only |
| music-marketing/new-ways-your-music-pays-2026 | Bar chart, YouTube watch-hour thresholds | HTML/CSS, brand colours only |
| music-marketing/turn-streams-into-fans | Bar chart, monthly listeners at tour cancellation | HTML/CSS, brand colours only |
| case-studies/ariana-grande-petal-presave-machine | Bar chart, pre-saves as a share of day one | HTML/CSS, brand colours only |

These are built in HTML rather than as image files, so they carry the real brand
typography, stay crisp at every pixel density, add no image weight, and re-theme with the
page — which also makes them usable in the light-vs-dark comparison without being rebuilt.
Each carries a `109MUSIC · Source: …` caption. No third-party chart branding anywhere.

### Blocked: photographic heroes

`commons.wikimedia.org`, `upload.wikimedia.org`, `api.wikimedia.org` and Openverse are all
unreachable from the cloud container — the egress proxy returns
`This domain is cache-only and cannot be fetched` for WebFetch and a 403 CONNECT for
anything else. Flickr is reachable.

Consequence: licence tags, author credits and original dimensions **cannot be verified from
this environment**, and the rule above says an unverifiable licence is an automatic reject.
So no photo hero has been added.

Wikimedia-sourced files already sitting in `batches/2026-W35-pilot/img/` under the `wm-`,
`wm2-` and `wm3-` prefixes are candidates, but `batches/2026-W35-pilot/image-credits.md`
records only the Commons **file name** for each — not the licence tag or the author string.
Both are required before any of them can be published here.

### Candidate heroes awaiting licence verification

Do not use any of these until the licence tag and author credit are confirmed on the
Commons file page and recorded in the table below.

| Article | Subject | Already on disk? | Commons file |
|---|---|---|---|
| case-studies/charli-xcx-no-dead-air-rollout | Charli XCX | `wm-charli-1.jpg` (2997×3987) | `File:Charli_XCX-4059_(cropped_II).jpg` |
| case-studies/charli-xcx-no-dead-air-rollout | Charli XCX, alt | `wm-charli-2.jpg` (2929×4000) | `File:Charli_XCX_at_the_2025_Toronto_International_Film_Festival_for_Erupcja_(1)_(cropped).jpg` |
| case-studies/ariana-grande-petal-presave-machine | Ariana Grande | `wm-ariana-1.jpg`, `wm-ariana-2.jpg` | not recorded — needs identifying |
| music-marketing/turn-streams-into-fans | Post Malone | `wm-post-malone.jpg` | not recorded — needs identifying |
| music-marketing/sell-out-your-next-show | Venue / small crowd | no | `Category:Concert crowds` is the entry point |
| music-marketing/spotify-ai-purge-what-it-means | Spotify | no | probably none exists; the wordmark is a trademark and a poor hero regardless |

### Fields required before any photo ships

For each image, this file must record: Commons file page URL · exact file name · direct
`upload.wikimedia.org` URL · original pixel dimensions · exact licence tag · author credit
string exactly as stated · the attribution line rendered under the photo · framing
(face / upper body preferred over distant live shots).

## Web (109music.co) — registro de imagen por artículo

Distinto del `image-credits.md` de cada batch de Instagram. **Las fotos de los
carruseles están vetadas para la web**: vienen de medios y casi todas son Getty.

Regla de tratamiento: en la web las fotos van sin filtro. Sin modificar no son
obra derivada, así que una Creative Commons solo pide crédito. El gris se queda
solo en los carruseles.

| Artículo | Recurso | Fuente | Autor | Licencia |
|---|---|---|---|---|
| how-to-sell-out-your-next-show | hero 1600×900 | Generada por nosotros | 109MUSIC | Own work |
| how-to-sell-out-your-next-show | figura de cuerpo 1600×900 | Generada por nosotros | 109MUSIC | Own work |
| how-to-sell-out-your-next-show | miniatura 256×256 | Generada por nosotros | 109MUSIC | Own work |
| how-to-sell-out-your-next-show | tarjeta OG 1200×630 | Generada por `tools/og.mjs` | 109MUSIC | Own work |
| turn-streams-into-fans | hero, figura, miniatura | Generadas por nosotros | 109MUSIC | Own work |
| (todos) | tarjeta OG | Generada por `tools/og.mjs` | 109MUSIC | Own work |
