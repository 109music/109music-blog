import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// EDIT THESE TWO IF THE GITHUB USERNAME OR REPO NAME CHANGES.
// GitHub Pages project site: https://<user>.github.io/<repo>
export const GH_USER = '109music';
export const GH_REPO = '109music-blog';

export default defineConfig({
  site: `https://${GH_USER}.github.io`,
  base: `/${GH_REPO}`,
  trailingSlash: 'always',
  build: { format: 'directory' },   // clean URLs: /music-marketing/slug/
  // Retired /guides/ URLs are redirect stubs. They stay reachable forever but must not
  // be advertised in the sitemap, or Search Console files them as duplicates.
  integrations: [sitemap({ filter: (page) => !page.includes('/guides/') })],
});
