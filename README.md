# 109MUSIC blog

Static publication for [@109music.co](https://www.instagram.com/109music.co/). Built with Astro,
hosted free on GitHub Pages, deployed automatically by GitHub Actions on every push to `main`.

Live: https://109music.github.io/109music-blog/

## Sections
Sections handle navigation. Tags handle topic browsing. Do not blur the two.

- `src/content/news/` — platform and industry news briefs. Every claim names and links its source.
- `src/content/music-marketing/` — step-by-step playbooks with real numbers. Broad on purpose:
  marketing, money and the business behind both. **Renamed from `guides/` on 2026-08-12.**
- `src/content/case-studies/` — teardowns of real releases and rollouts.

### The /guides/ redirects
`src/pages/guides/` contains redirect stubs only, driven by `LEGACY_GUIDE_SLUGS` in
`src/lib/site.ts`. GitHub Pages cannot serve a 301 header, so each stub is a meta refresh plus a
canonical pointing at the new address and `noindex` on the stub itself. They are excluded from the
sitemap. **Do not delete them**, including through any future rename — they are the only thing
keeping old links and citations alive.

## Tags
A fixed vocabulary lives in `TAGS` in `src/lib/site.ts` and is enforced by `content.config.ts`.
A tag outside the list fails the build rather than creating an orphan archive. Every article needs
at least one. Each term gets an archive at `/tags/<slug>/`, listed at `/tags/`.

Current vocabulary: `music-marketing`, `music-business`, `news`, `spotify-growth`, `tiktok`,
`instagram`, `release-strategy`, `case-study`, `touring`, `revenue`.

## Publishing a new article
Add a markdown file to the right folder and push. The frontmatter schema lives in
`src/content.config.ts`. Required: `title`, `dek`, `date`, `tags`. Optional: `updated`, `hero`,
`cta`, `igEmbed`, `sources`, `faq`, `draft`.

```bash
npm install     # first time only
npm run dev     # local preview at localhost:4321/109music-blog/
npm run build   # static output in dist/
```

Then run `publish.bat` from this folder. GitHub Actions rebuilds and redeploys within about a
minute of the push.

## In-article blocks
Raw HTML in markdown, styled by `src/styles/global.css`:

- `<div class="keyfact">` — the extractable claim AI search lifts.
- `<aside class="pullquote"><p>…</p><cite>…</cite></aside>` — a lift that breaks up long text.
- `<div class="stat">` — one big figure with a label and a sentence.
- `<div class="statgrid">` or `<div class="statgrid three">` — two or three figures side by side.

## Imagery
`hero` frontmatter and the `.plate` slot in the index rows exist but are unused until Stage 2.
The geometry is already reserved on every breakpoint, so adding photos is a data change.

**Blog imagery and carousel imagery are separate pipelines with different sourcing rules.**
The blog uses Wikimedia/CC, official press photos, or free stock for non-artist imagery only,
each logged with its licence in `image-credits.md`. The carousel's Rule A sourcing does not apply
here and W35 carousel photos must not be reused as blog heroes. Full rules in
`../system/content-system.md`.

## Editorial rules
Blog attribution differs from the social accounts on purpose. Every news claim is credited and
linked, and playbooks credit their data sources inline.
