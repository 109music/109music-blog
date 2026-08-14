import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 109MUSIC runs on its own apex domain. There is no repo subpath any more — the site
// sits at the root, so `base` is '/' and every generated URL is clean.
//
// The old GitHub Pages address, https://109music.github.io/109music-blog/, keeps working:
// once a CNAME is set, GitHub redirects the project-site URLs to the custom domain
// automatically. Nothing that was ever published 404s.
//
// The CNAME file lives at public/CNAME so the Actions build copies it into dist/. Setting
// the domain only in repo Settings is not enough with an artifact-based deploy — the file
// has to be inside the published artifact or it gets dropped on the next run.
export const SITE_DOMAIN = '109music.co';

export default defineConfig({
  site: `https://${SITE_DOMAIN}`,
  base: '/',
  trailingSlash: 'always',
  build: { format: 'directory' },   // clean URLs: /music-marketing/slug/
  // Retired URLs are redirect stubs. They stay reachable forever but must not be
  // advertised in the sitemap, or Search Console files them as duplicates.
  //
  // Match on the PATH PREFIX, not with includes(). `/music-marketing/case-studies/` is a
  // live destination that contains the retired `/case-studies/` as a substring, so a
  // naive includes() check would quietly drop the real pages from the sitemap and leave
  // the redirect stubs as the only thing Google was told about.
  integrations: [
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        const RETIRED = ['/guides/', '/case-studies/', '/music-business/'];
        return !RETIRED.some((p) => path === p || path.startsWith(p));
      },
    }),
  ],
});
