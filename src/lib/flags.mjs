/* INTERRUPTORES DEL SITIO.

   Vive en .mjs y no dentro de site.ts por una razon concreta: astro.config.mjs
   tambien lo necesita, para dejar /results/ fuera del sitemap, y la config no
   puede importar TypeScript. Con el flag aqui hay UN solo sitio donde cambiarlo
   y las dos partes leen el mismo valor. Si estuviera duplicado, tarde o
   temprano se enciende la pagina y se queda fuera del sitemap, o al reves. */

/* Results entero: el bloque de tarjetas de la home Y la pagina.
   En false: fuera de la home, fuera de la navegacion, fuera del sitemap, fuera
   del buscador y con noindex. No se borra nada, y la comparativa que vivia
   dentro de esa pagina se muda sola a la home.
   Se enciende cuando haya casos suficientes. Es esta linea y nada mas. */
export const SHOW_RESULTS = false;
