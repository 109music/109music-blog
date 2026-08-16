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
| music-marketing/turn-streams-into-fans | `turn-streams-photo-hero.webp` + `-thumb` | `Seigmen 2026-25.jpg`, 3508x1973 | **2026** | Birgit Fostervold | **CC BY-SA 4.0** | https://commons.wikimedia.org/wiki/File:Seigmen_2026-25.jpg |

**Credito que se pinta bajo cada foto**, abajo a la derecha del masthead: `Emma · CC BY-SA
2.0`, `Raph_PH · CC BY 2.0`, `The Come Up Show · CC BY 2.0`, con el autor enlazado a la
ficha. Verificado en el HTML construido, no solo en el codigo fuente.

**La miniatura sale de la misma foto**, reducida a 480x270 desde el hero. No es una imagen
distinta y ya no es el grafico generado.

**El grafico tipografico de cada uno baja al cuerpo** como figura tras el primer h2, con
su pie y su credito `109MUSIC · Own work`. No se tira nada.

**turn-streams cambio de foto en el update 21.** Llevaba a Post Malone de 2016, y el
articulo habla de una gira cancelada en 2026: diez anos de diferencia y otro aspecto. No
hay foto suya reciente con licencia utilizable — `Category:Post Malone` tiene 63 archivos
y la mas nueva apaisada es la de 2016 —, asi que **decision de Blanca: si el articulo
trata de giras, una foto de concierto**. Publico y escenario dicen de que va sin depender
de quien sale, y sin protagonista identificable no hay permiso que pedir. La sustituta es
del **10 de julio de 2026**, un mes antes de publicarse.

**Aviso de edad, ya solo para las dos que quedan:** Ariana y Charli son de 2017, que es lo
mas reciente con licencia utilizable para las dos. En sus articulos si tiene sentido,
porque el texto va sobre esa artista y ese lanzamiento.

### Caratulas de Real Results (update 21)

Las tres desde el oEmbed de Spotify, 640x640 recortadas a **600x600 WebP**. Sustituyen al
mosaico de marca `plate-1/2/3.webp`, que era placeholder de diseno.

| Tarjeta | Archivo | Que muestra la portada | KB |
|---|---|---|---|
| Mir Naranjo · LOCA LA CABEZA | `cover-mir.webp` | el disco, "Make It Real" | 15 |
| Hannah Blaze · A MILLI ON YOU | `cover-hannah.webp` | el propio titulo, "INTO THE 109" | 67 |
| LA KARMA · NI SANTA, NI PUTA | `cover-karma.webp` | el disco, "Alma Pura", con dos mujeres | 62 |

No son Creative Commons: son las portadas de los lanzamientos que 109MUSIC promociono,
publicadas con permiso de cada artista. Las dos rarezas — el titulo del disco distinto del
tema en Mir Naranjo, y las dos mujeres en la de LA KARMA con el permiso de las dos — estan
decididas y registradas en `claude/client-cases-inventory.md`.

### Los heroes se rehicieron desde el original (update 21)

En el update 20 las tres fotos cruzaron por captura de pantalla, que topa a 1488x812, asi
que el hero salia reescalado. Con las descargas desbloqueadas se rehicieron desde el
archivo original de Commons: Ariana desde 4608x3456 y Charli desde 5989x3376. Ganan entre
un 80 y un 150 por ciento de peso a igual medida, que es detalle real y no relleno.

**Truco de descarga, para la proxima:** Chrome deja pasar **una descarga por pestana**,
aunque el sitio este en "permitir siempre". Pestana nueva para cada archivo.

**Ariana pendiente de mejora:** Blanca decidio buscar en press kit oficial. Cuando se
haga, hay que leer las condiciones de uso del sello antes de bajar nada: los press kits
suelen permitir uso editorial y prohibir el comercial, y esa linea la marca su texto.

### Update 22 (15/08/2026) — dos heroes nuevos

| Artículo | Archivo | Foto original | Año | Autor | Licencia | Ficha |
|---|---|---|---|---|---|---|
| case-studies/charli-xcx-no-dead-air-rollout | `charli-photo-hero.webp` + `-thumb` | `Charli XCX at the 2025 Toronto International Film Festival for Erupcja (1).jpg`, 6000x4000 | **2025** | Kevin Payravi | **CC BY-SA 4.0** | https://commons.wikimedia.org/wiki/File:Charli_XCX_at_the_2025_Toronto_International_Film_Festival_for_Erupcja_(1).jpg |
| music-marketing/spotify-ai-purge-what-it-means | `spotify-purge-photo-hero.webp` + `-thumb` | `Datacenter Server Racks (22370909788).jpg`, 6000x4000 | 2015 | Carl Lender | **CC BY 2.0** | https://commons.wikimedia.org/wiki/File:Datacenter_Server_Racks_(22370909788).jpg |

**Charli sustituye a la de Glastonbury 2017.** Se publica como **excepción
consciente** al criterio de imagen: la ficha lleva `restrictions: personality` y
el fondo es un photocall con logos de TIFF. Se acepta porque es persona pública
en acto público, uso editorial en un case study sobre su propio lanzamiento, y va
con crédito visible enlazado a la ficha. El razonamiento completo está en
`claude/imagery-sourcing-playbook.md`.

Encuadre: recorte de 3360x1890 tomado **desde y=640** del original de 6000x4000.
Subir la ventana saca el logo de RBC de cuadro y deja la cara entera en la mitad
superior, donde el titular no la tapa. **Aprendido: en un photocall, recortar más
cerrado AGRANDA los logos** — el muro es un patrón repetido. Lo que funciona es
mover el encuadre, no cerrarlo.

**Spotify pasa de gráfico a foto.** Sala de servidores, que es la escala a la que
ocurre una purga de catálogo. El gráfico tipográfico baja al cuerpo como figura
tras el primer h2, con su pie.

Descartada antes: `Racks Amravati Data Center.jpg`, 6000x4004, CC BY-SA 4.0.
Imagen mejor y más reciente, pero **imposible de comprimir**: puertas de rack
perforadas, ruido de alta frecuencia puro, no bajaba de 194 KB ni a calidad 38 ni
con desenfoque previo. **Señal para el futuro: mallas, rejillas y tramas finas
revientan el presupuesto de peso; se descartan antes de invertir tiempo.**

**SoundCloud se queda con su gráfico propio.** Ninguna candidata libre superaba
lo que ya dice el gráfico, y forzar una foto genérica de tienda de vinilos habría
sido peor. Es el resultado correcto según nuestra propia regla.

**Vía de sala de prensa, explorada y cerrada por ahora.** El anuncio de Spotify
del 11/08/2026 sobre las etiquetas de IA tiene las imágenes exactas del tema, a
2560x1458, pero **sin enlaces de descarga y sin condiciones de uso publicadas** en
todo el newsroom. SoundCloud no tiene ni capturas de producto ni página de notas
de prensa (404). La ruta real sería pedirlo por correo, como hace la prensa
especializada; Blanca decide no enviar correos y quedarse en Creative Commons.

### Update 23 (16/08/2026) — dos heroes mas

| Artículo | Archivo | Foto original | Año | Autor | Licencia | Ficha |
|---|---|---|---|---|---|---|
| music-marketing/sell-out-your-next-show | `sell-out-photo-hero.webp` + `-thumb` | `Audience - 15 Year Anniversary Tour at Enmore Theatre, 2025 (0R0A9687).jpg`, 7793x5195 | **2025** | Leoxiong | **CC BY-SA 4.0** | https://commons.wikimedia.org/wiki/File:Audience_-_15_Year_Anniversary_Tour_at_Enmore_Theatre,_2025_(0R0A9687).jpg |
| news/eu-ai-act-labeling-live | `eu-ai-act-photo-hero.webp` + `-thumb` | `The European Parliament plenary session - July 2025 - 54644307137.jpg`, 7008x4672 | **2025** | Parlamento Europeo | **CC BY 4.0** | https://commons.wikimedia.org/wiki/File:The_European_Parliament_plenary_session_-_July_2025_-_54644307137.jpg |

El gráfico tipográfico de sell-out baja al cuerpo como figura tras el primer h2.
El de eu-ai-act no tiene h2 en el cuerpo, así que ese gráfico se retira.

**EXCEPCION DE PESO, decidida con la curva medida delante.** Las dos superan el
presupuesto de 120 KB: 153 KB y 146 KB a calidad 64. **La curva de compresión es
plana**: bajar de calidad 64 a 48 solo ahorra un 18 por ciento y la degradación sí
se ve. El peso no lo manda la calidad, lo manda el detalle — un público son
cientos de caras y un hemiciclo son setecientos escaños.

**Regla nueva: el presupuesto de 120 KB vale para gráficos y fotos limpias. Para
fotos de multitud el techo sube a 160 KB.** Por debajo de eso se degrada sin
ganar nada. Lo que no se toca es el criterio de descarte de tramas finas: una
malla o una rejilla no baja de 190 KB ni destruyendo la imagen, y esas se siguen
descartando.

Contraste medido en las dos, ocho comprobaciones, ninguna falla. sell-out:
titular 6,30 · dek 6,60 · metadatos 7,19 · crédito 5,45. eu-ai-act: 6,16 · 6,94 ·
7,26 · 5,33.

### Update 24 (16/08/2026) — new-ways, y el cierre de SoundCloud

| Artículo | Archivo | Foto original | Año | Autor | Licencia | Ficha |
|---|---|---|---|---|---|---|
| music-marketing/new-ways-your-music-pays-2026 | `new-ways-photo-hero.webp` + `-thumb` | `w0IzSwffjbA`, 6000x4000 | 2022 | gaspifilms | **Unsplash License** | https://unsplash.com/photos/a-laptop-computer-sitting-on-top-of-a-desk-w0IzSwffjbA |

Un estudio de dormitorio de noche: espuma acústica, dos monitores, cascos en el
pie de micro y un portátil con una sesión abierta. Es el sitio donde aterriza el
dinero del que habla el artículo, que era lo que faltaba: las cuatro vías son
abstractas y el gráfico de carriles no las hacía menos abstractas.

**Recorte forzado por un motivo concreto.** El original lleva **una figura de un
Minion encima del monitor izquierdo**, y es el objeto más saturado del encuadre:
el ojo va ahí antes que a nada. Es propiedad intelectual de terceros, del mismo
tipo que los logos de photocall que ya descartamos. El recorte arranca en y=1450
del original, justo por debajo (el Minion ocupa de y=829 a y=1325), y se lleva
también las estrellas adhesivas de la pared. Origen 4533x2550 para un destino de
1600x900, o sea 2,8 veces la resolución final.

Quedan dentro dos marcas de terceros que **no** se pueden quitar sin destrozar el
encuadre: el rótulo LEGION del portátil y la interfaz de FL Studio en pantalla.
Se aceptan: es una foto de una habitación, no una captura de la interfaz, y ni
una ni otra son el sujeto. **La distinción sigue siendo la que fijamos: una
captura de interfaz subida por un tercero no vale, porque quien la sube no es
dueño de la interfaz; una interfaz que aparece de fondo en una fotografía sí.**

Subida de exposición: gamma 0,70 más 6 por ciento de ganancia. Sin ella el velo
de `.masthead--photo` sobre una foto que ya nace oscura dejaba la cabecera casi
en negro. 111 KB, dentro del presupuesto de 120 KB. Contraste medido sobre el
píxel peor compuesto: **titular 12,85 · dek 9,61 · crédito 5,66**. Es la cabecera
con más margen de todo el blog.

**SoundCloud se queda con su gráfico, decisión cerrada.** Busqué otra vez con la
tienda de vinilos como metáfora de la selección humana. Dos motivos para no
hacerlo: la metáfora es falsa — The Upload es una lista editorial digital, no
vinilo — y las candidatas buenas fallaban por otro lado. La mejor,
`XpxuhBvekjQ`, 6240x4160, manos rebuscando en una caja de discos, es **Unsplash+**
y sale con marca de agua. La siguiente, `ivbI3VqsqEM`, lleva una portada de
Quincy Jones en primer plano, que es obra de terceros, y además es una foto clara
que pelearía con el titular blanco.

**Criterio de descarte nuevo: Unsplash+ no es Unsplash.** Es una licencia de pago
con marca de agua en la previsualización, y en la API se distingue por el campo
`plus`. Hay que filtrarlo en la propia búsqueda, no al mirar la foto.

**Regla nueva de nombres de archivo, aprendida a la mala.** El 22 y el 23 usaron
el mismo `spotify-purge-photo-hero.webp` para dos fotos distintas. El despliegue
era correcto y la web servía la foto nueva, pero el navegador de Blanca seguía
enseñando la vieja durante horas: mismo nombre, ningún motivo para volver a
pedirla. **Cuando cambia la foto de un hero, cambia también el nombre del
archivo.** Un cambio de imagen bajo el mismo nombre es indistinguible de ningún
cambio para cualquier caché del camino.

### Nota de esquema

`hero.source` y `figures[].source` aceptaban solo `wikimedia | presskit | own`.
Con Unsplash entrando en el catálogo, el enum pasa a
`wikimedia | unsplash | pexels | presskit | own`. Sigue siendo cerrado: un valor
no listado rompe el build a propósito, que es lo que queremos. `photoHero` no
cambia, sigue siendo «cualquier cosa que no sea `own`».

### Update 26 (16/08/2026) — News deja de ser mitad foto y mitad gráfico

| Artículo | Archivo | Foto original | Año | Autor | Licencia | Ficha |
|---|---|---|---|---|---|---|
| news/luminate-midyear-2026 | `luminate-photo-hero.webp` + `-thumb` | `sa0tkcjgVLU`, 7952x4472 | 2026 | Nicolás Flor | **Unsplash License** | https://unsplash.com/photos/crowd-watches-a-dj-perform-on-a-brightly-lit-stage-sa0tkcjgVLU |
| news/soundcloud-the-upload-launch | `soundcloud-photo-hero.webp` + `-thumb` | `GxYek2QfwpA`, 5650x3767 | 2025 | Janay Peters | **Unsplash License** | https://unsplash.com/photos/GxYek2QfwpA |

**El criterio se amplía, por decisión de Blanca (16/08).** La imagen no tiene que
ser literal del tema. Vale cualquier cosa que hable de música y de audiencia
siempre que encaje razonablemente. Prioridad, en este orden: que sea de música,
que sea buena foto, que encaje. **Una buena foto de concierto gana a un gráfico
generado.**

El detonante fue mirar el listado de News: el AI Act con foto real de un pleno
del Parlamento, y a los lados dos gráficos. Al lado de una foto de verdad, un
gráfico generado desentona. Un listado mezclado se lee peor que uno coherente,
sea de fotos o sea de gráficos, y aquí la opción buena es fotos.

**Luminate: público enorme de noche.** El artículo va de escala global de
escucha, y una masa de gente delante de un escenario dice escala sin explicar
nada. Original de 7952x4472, ya en 16:9 exacto, así que va a fondo completo sin
recorte. Gamma 0,88. **39 KB**, la cabecera más ligera del blog, porque es casi
toda negro con una fuente de luz.

**SoundCloud: sala pequeña con el escenario montado.** Focos rojos, batería, unas
siluetas esperando. El artículo va de curación humana y de artistas emergentes, y
esto es exactamente la habitación donde toca alguien que nadie conoce todavía.
Recorte 16:9 desde y=230 para conservar la fila de focos, que es lo que da la
escala del techo. 100 KB.

**Las dos son distintas entre sí y distintas de las dos que ya teníamos.** El
Enmore es un patio de butacas lleno visto desde arriba; la de Spotify es un
escenario con el público grabando. Luminate es exterior de noche a mucha
distancia y SoundCloud es interior con el escenario vacío. Cuatro fotos con
público o escenario y ninguna se parece a otra, que era la condición.

Contraste, peor píxel compuesto: **Luminate 13,93 · 9,63 · 5,66. SoundCloud
12,79 · 10,07 · 5,66.** Las dos cabeceras con más margen del sitio junto a la de
new-ways.

**Salvedad que dejo por escrito: en la de Luminate se lee «PURA FIESTA VIP» en la
pantalla del escenario.** Es el nombre del evento, no una marca comercial que
pinte nada, y entra por la misma regla que el rótulo del portátil en new-ways: es
una fotografía de una explanada con gente, no un cartel. Pero es el objeto más
brillante del encuadre y se lee. **No hay recorte que lo arregle** — moverlo
hacia un lado lo deja debajo del titular y cerrar el encuadre lo agranda, que es
la lección del photocall de Charli. Si a Blanca le molesta, la alternativa ya
buscada es `yy8KMTJwpaI`, 5830x4000, joël Armand Amissa, misma idea con luz
naranja y sin rótulo.

**Descartadas en esta ronda, para no repetir la búsqueda:** `XpxuhBvekjQ` y todo
el material de tiendas de vinilo (Unsplash+ o portadas de terceros en primer
plano); `9zh8fSUQb8w`, buena foto de club pero con el rótulo «Solomons Jazz Club»
legible; `lstL0OETugY`, un cantante identificable en primer plano; `B4Q0RxtWS84`,
otro patio de butacas lleno, demasiado parecido al Enmore.

### Update 27 (16/08/2026) — los cuatro artículos que quedaban de agosto

Los cuatro salen en borrador (`draft: true`). No se publican hasta que Blanca los
lea. Los cuatro heroes son foto real, con el criterio ampliado del 26: música,
buena foto, encaje razonable.

| Artículo | Archivo | Foto original | Autor | Licencia | Ficha |
|---|---|---|---|---|---|
| film-a-month-of-content-in-one-hour | `content-system-photo-hero.webp` + `-thumb` | `ftW3L0qtT_k`, 6240x4160 | atelierbyvineeth | **Unsplash License** | https://unsplash.com/photos/person-playing-guitar-with-camera-on-tripod-ftW3L0qtT_k |
| where-your-first-hundred-fans-come-from | `first-fans-photo-hero.webp` + `-thumb` | `i49Sw4YT7Tw`, 8649x5851 | Pascal Bernardon | **Unsplash License** | https://unsplash.com/photos/musicians-playing-instruments-on-a-bridge-in-paris-i49Sw4YT7Tw |
| what-to-release-next-and-how-often | `release-pace-photo-hero.webp` + `-thumb` | `AnsMiqi86Pk`, 7952x5304 | AMONWAT DUMKRUT | **Unsplash License** | https://unsplash.com/photos/a-person-adjusting-controls-on-a-sound-mixing-board-AnsMiqi86Pk |
| before-you-post-anything | `before-you-post-photo-hero.webp` + `-thumb` | `LakKPeF1ONE`, 6774x4492 | Barney Goodman | **Unsplash License** | https://unsplash.com/photos/a-music-stage-with-instruments-and-equipment-under-yellow-lights-LakKPeF1ONE |

Tratamiento, y esta vez hubo que trabajar dos de ellas:

- **content-system**: recorte desde arriba, y=0 a 3510. La mitad inferior del
  original es suelo vacío. Sin retoque de exposición, ya nace oscura.
- **first-fans**: es de día y con cielo, la más difícil de todas. Gamma 1,55 y un
  apagado progresivo de la mitad izquierda al 42 por ciento, que es donde cae el
  titular. **148 KB**, por encima del presupuesto de 120 KB: es una foto de
  ciudad con follaje otoñal, o sea detalle fino por todas partes, y entra por la
  misma excepción medida que sell-out y eu-ai-act.
- **release-pace**: sin tocar, ya es oscura.
- **before-you-post**: bruma amarilla muy clara. Gamma 1,45 y apagado izquierdo
  al 46 por ciento.

Contraste, peor píxel compuesto, titular · dek · crédito:
**content 11,43 · 10,00 · 5,66 — fans 11,83 · 10,01 · 5,66 — release 13,16 ·
10,47 · 5,66 — before 13,13 · 9,61 · 5,66.** Ninguna cerca de fallar.

**Salvedad en first-fans: hay cuatro músicos con la cara identificable.** Son
artistas callejeros tocando en un puente, en un lugar público, y el uso es
editorial en un artículo que habla precisamente de tocar para poca gente. Es
defendible, pero incumple la preferencia de «sin protagonista identificable», así
que queda anotado. A esa distancia y con el velo puesto, las caras no se
reconocen en la cabecera montada.

**En before-you-post se lee «nord electro» en un teclado.** Incidental, de fondo,
no es el sujeto. Entra por la misma regla que el rótulo del portátil en new-ways.

**Descartada por marca: `pPfGWg83GAg` y `m9fMawDQLXA`,** dos primeros planos
preciosos de un amplificador Fender, 10000x6667 los dos. **El logotipo de Fender
ES el sujeto de la foto**, no un rótulo de fondo. Eso cruza la línea: una marca
que ocupa el encuadre en la cabecera de un artículo nuestro sí sugiere relación
comercial. Criterio nuevo, escrito: **la distinción no es si la marca aparece,
es si la marca es el sujeto.**

**El gráfico huérfano de new-ways se borra.** `new-ways-hero.webp` y
`new-ways-thumb.webp` dejaron de estar referenciados cuando la foto de estudio
subió a la cabecera. Consideré bajarlo al cuerpo como se hizo en sell-out y en
spotify, y no encaja: el gráfico dibuja los cuatro carriles, y el único h2 donde
cabría ya tiene su figura, que dice lo mismo. Un segundo gráfico repitiendo el
argumento es ruido. Además el artículo ya lleva dos piezas propias, la figura y
el gráfico de barras de YouTube. El `.bat` del 27 los borra. `new-ways-figure.webp`
NO se toca, esa sigue en uso.

### Update 28 (16/08/2026) — los cinco salen de borrador

`draft: true` fuera de los cinco. Se publican.

**Cambio de fecha, y lo digo porque se ve.** Los cinco venían fechados entre el 31
de agosto y el 4 de septiembre, siguiendo la regla del STEP 7 de que el artículo
va después de sus carruseles. Publicándolos hoy, 16 de agosto, esas fechas salen
en el futuro en una web que ya está en vivo, y eso se lee como un error.

Los cinco pasan a **2026-08-16**, que es el día en que de verdad se publican. La
regla de orden no se rompe: existe para que el `igEmbed` no apunte a un post que
todavía no existe, y **estos cinco tienen `igEmbed: null`**. Sus carruseles son
los posts de foto única de Meta de agosto, anteriores al pipeline, que nunca se
iban a incrustar. Cuando el pipeline empiece a generar de verdad, con carruseles
propios y permalink, la regla vuelve a morder y hay que respetarla.

**El gráfico huérfano de new-ways queda borrado en el 27.** `new-ways-figure.webp`
sigue en uso, esa no se toca.

Estado tras el 28: **catorce artículos publicados, catorce con hero y miniatura,
trece con foto real.** El único con gráfico propio es
`viral-week-into-an-audience-you-own`.
