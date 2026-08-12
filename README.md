# 109MUSIC blog

Static publication for [@109music.co](https://www.instagram.com/109music.co/). Built with Astro,
hosted free on GitHub Pages, deployed automatically by GitHub Actions on every push to `main`.

Live: https://109music.github.io/109music-blog/

## Sections
- `src/content/news/` — platform and industry news briefs. Every claim names and links its source.
- `src/content/guides/` — step-by-step playbooks with real numbers.
- `src/content/case-studies/` — teardowns of real releases and rollouts.

## Publishing a new article
Add a markdown file to the right folder and push. The frontmatter schema lives in
`src/content.config.ts`. Required: `title`, `dek`, `date`. Optional: `updated`, `tags`, `cta`,
`igEmbed`, `sources`, `faq`, `draft`.

```bash
npm install     # first time only
npm run dev     # local preview at localhost:4321/109music-blog/
npm run build   # static output in dist/
git add -A && git commit -m "New article" && git push
```

GitHub Actions rebuilds and redeploys within about a minute of the push.

## Editorial rules
Blog attribution differs from the social accounts on purpose. Every news claim is credited and
linked, and guides credit their data sources inline. No sourced artist photos are used here:
branded graphics and Instagram embeds only. Full rules in `../system/content-system.md`.
