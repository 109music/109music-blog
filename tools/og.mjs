/* ---------------------------------------------------------------------------
   Generador de tarjetas de Open Graph.

   La tarjeta de compartir es SIEMPRE nuestra, nunca la foto del artículo. Una
   vista previa de WhatsApp o Facebook no puede llevar la línea de crédito, así
   que poner ahí una Creative Commons sería redistribuirla sin atribución, que
   es justo lo único que la licencia pide. Con una tarjeta de marca el problema
   desaparece y además todo lo que se comparte se ve como la misma publicación.

   1200x630 JPG. JPG y no WebP porque algunos rastreadores todavía no leen WebP
   y se quedan sin imagen en vez de degradar.

   Uso:  node tools/og.mjs
   Lee los .md de src/content/, escribe public/img/og/<seccion>/<slug>.jpg y
   regenera public/img/og/default.jpg. Es idempotente: se puede lanzar siempre.
   --------------------------------------------------------------------------- */
import { chromium } from 'playwright-core';
import { readdir, readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SECTIONS = { news: 'News', 'music-marketing': 'Music Marketing', 'case-studies': 'Case Studies' };
const fontB64 = async (f) => (await readFile(path.join(ROOT, 'public/fonts', f))).toString('base64');

const template = (kicker, title, fonts) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:'Archivo Black';src:url(data:font/woff2;base64,${fonts.black}) format('woff2');font-weight:400}
@font-face{font-family:'Archivo';src:url(data:font/woff2;base64,${fonts.archivo}) format('woff2');font-weight:100 900}
@font-face{font-family:'Inter';src:url(data:font/woff2;base64,${fonts.inter}) format('woff2');font-weight:600}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#0A0A0A;color:#fff;position:relative;overflow:hidden;
     font-family:'Inter',system-ui,sans-serif}
/* Los mismos blobs de la web: el radial deja de tener forma a 140px de blur y
   pasa a ser luz. Es la pieza con mejor relación acabado/coste del sistema. */
.g1{position:absolute;width:720px;height:720px;right:-160px;top:-220px;border-radius:50%;
    background:radial-gradient(circle,#C59FFD 0%,#6638B0 45%,transparent 70%);opacity:.34;filter:blur(140px)}
.g2{position:absolute;width:560px;height:560px;left:-180px;bottom:-260px;border-radius:50%;
    background:radial-gradient(circle,#E8D4C9 0%,#8a5f3a 45%,transparent 70%);opacity:.22;filter:blur(150px)}
.stars{position:absolute;inset:0;opacity:.40;background-repeat:repeat;background-size:900px 200px;
  background-image:radial-gradient(1px 1px at 40px 30px,#fff,transparent),radial-gradient(1px 1px at 180px 120px,#fff,transparent),
  radial-gradient(1px 1px at 330px 60px,#fff,transparent),radial-gradient(1px 1px at 520px 160px,#fff,transparent),
  radial-gradient(1px 1px at 700px 40px,#fff,transparent),radial-gradient(1px 1px at 840px 140px,#fff,transparent),
  radial-gradient(1px 1px at 260px 180px,#fff,transparent),radial-gradient(1px 1px at 610px 100px,#fff,transparent)}
.pad{position:relative;height:100%;padding:64px 72px;display:flex;flex-direction:column;justify-content:space-between}
.k{font-family:ui-monospace,'SFMono-Regular',Menlo,monospace;font-size:19px;letter-spacing:.18em;
   text-transform:uppercase;color:#C59FFD}
h1{font-family:'Archivo',sans-serif;font-weight:800;font-size:${title.length > 62 ? 56 : title.length > 40 ? 66 : 78}px;
   line-height:1.06;letter-spacing:-.022em;max-width:16ch;text-wrap:balance}
.foot{display:flex;align-items:baseline;justify-content:space-between}
.mark{font-family:'Archivo Black',sans-serif;font-size:30px;letter-spacing:-.01em}
.mark i{font-style:normal;color:#C59FFD}
.dom{font-family:ui-monospace,monospace;font-size:16px;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.55)}
</style></head><body>
<div class="g1"></div><div class="g2"></div><div class="stars"></div>
<div class="pad">
  <p class="k">${kicker}</p>
  <h1>${title.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</h1>
  <div class="foot"><span class="mark"><i>109</i>MUSIC.CO</span><span class="dom">Independent music marketing</span></div>
</div></body></html>`;

const fonts = {
  black: await fontB64('archivo-black-latin-400-normal.woff2'),
  archivo: await fontB64('archivo-latin-wght-normal.woff2'),
  inter: await fontB64('inter-latin-600-normal.woff2'),
};

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });

async function shot(kicker, title, out) {
  await mkdir(path.dirname(out), { recursive: true });
  await page.setContent(template(kicker, title, fonts), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: out, type: 'jpeg', quality: 86 });
  console.log('  ', path.relative(ROOT, out));
}

let n = 0;
for (const [dir, label] of Object.entries(SECTIONS)) {
  const base = path.join(ROOT, 'src/content', dir);
  if (!existsSync(base)) continue;
  for (const f of (await readdir(base)).filter((f) => f.endsWith('.md'))) {
    const src = await readFile(path.join(base, f), 'utf8');
    const title = (src.match(/^title:\s*(.+)$/m)?.[1] ?? f).trim().replace(/^["']|["']$/g, '');
    await shot(label, title, path.join(ROOT, 'public/img/og', dir, f.replace(/\.md$/, '.jpg')));
    n++;
  }
}
await shot('Independent music marketing', 'Your number one source to market your music.', path.join(ROOT, 'public/img/og/default.jpg'));
await browser.close();
console.log(`\n${n} tarjetas de artículo + la del sitio.`);
