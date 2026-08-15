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

### Resuelto el 15/08 — Openverse

`commons.wikimedia.org` y `api.openverse.org` siguen siendo inalcanzables desde el
contenedor, y Flickr tambien lo es ahora (la nota anterior que decia lo contrario ya no
vale). La busqueda y la descarga se hacen **por el navegador de Blanca**.

**Openverse (openverse.org, antes search.creativecommons.org) es la fuente de entrada.**
Busca en Wikimedia, Flickr y otros a la vez, y su API acepta el filtro de licencia en la
propia consulta: `license=cc0,pdm,by,by-sa`. Eso deja **NC y ND fuera desde el origen**,
que es mas seguro que descartarlos despues.

- **NC es el filtro que mas importa.** La web vende servicios, asi que una foto
  non-commercial no vale aunque el articulo sea editorial.
- **ND tambien queda fuera**, porque toda foto se reduce y casi siempre se recorta.
- **Openverse no es la prueba.** Su metadato se desincroniza. Cada imagen se verifica en
  la ficha original antes de bajarla, y lo que se registra abajo es lo que dice la ficha.

Openverse resolvio el caso que Commons no resolvia: buscando en Commons directamente,
Ariana no tenia ninguna foto apaisada decente. Openverse la ordeno mejor y aparecieron
las de la gira Dangerous Woman.

**Descargas:** Chrome tiene bloqueadas las descargas automaticas en la maquina de Blanca,
probado desde cuatro origenes y con blob y data-url. Las imagenes cruzan por captura de
pantalla, que topa a 1488x812, asi que los heroes de foto salen de un reescalado a
1600x900 desde esa captura. Cuando se desbloquee
(`chrome://settings/content/automaticDownloads`) conviene rehacerlos desde el original.

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

### Fotos de artista publicadas (update 20, 15/08/2026)

Las tres via Openverse, verificadas una a una en su ficha de Commons. Ninguna lleva NC,
ND ni restricciones adicionales.

| Articulo | Archivo en el repo | Foto original | Ano | Autor | Licencia | Ficha |
|---|---|---|---|---|---|---|
| case-studies/ariana-grande-petal-presave-machine | `ariana-photo-hero.webp` + `-thumb` | `Ariana Grande (33269922185).jpg`, 4608x3456 | 2017 | Emma | **CC BY-SA 2.0** | https://commons.wikimedia.org/wiki/File:Ariana_Grande_(33269922185).jpg |
| case-studies/charli-xcx-no-dead-air-rollout | `charli-photo-hero.webp` + `-thumb` | `Charli XCX Glastonbury 2017 (3).jpg`, 5989x3376 | 2017 | Raph_PH | **CC BY 2.0** | https://commons.wikimedia.org/wiki/File:Charli_XCX_Glastonbury_2017_(3).jpg |
| music-marketing/turn-streams-into-fans | `turn-streams-photo-hero.webp` + `-thumb` | `Post Malone @ Veld 2016.jpg`, 4600x3648 | 2016 | The Come Up Show | **CC BY 2.0** | https://commons.wikimedia.org/wiki/File:Post_Malone_@_Veld_2016.jpg |

**Credito que se pinta bajo cada foto**, abajo a la derecha del masthead: `Emma · CC BY-SA
2.0`, `Raph_PH · CC BY 2.0`, `The Come Up Show · CC BY 2.0`, con el autor enlazado a la
ficha. Verificado en el HTML construido, no solo en el codigo fuente.

**La miniatura sale de la misma foto**, reducida a 480x270 desde el hero. No es una imagen
distinta y ya no es el grafico generado.

**El grafico tipografico de cada uno baja al cuerpo** como figura tras el primer h2, con
su pie y su credito `109MUSIC · Own work`. No se tira nada.

**Aviso de edad:** las tres son de 2016-2017. Es lo mas reciente que existe con licencia
utilizable. La de Post Malone tiene diez anos y el articulo va de una gira cancelada en
2026. Es el, es legal y esta acreditado, pero no es una foto actual.

**Ariana pendiente de mejora:** Blanca decidio buscar en press kit oficial. Cuando se
haga, hay que leer las condiciones de uso del sello antes de bajar nada: los press kits
suelen permitir uso editorial y prohibir el comercial, y esa linea la marca su texto.
