/* ---------------------------------------------------------------------------
   Body imagery and brand charts, injected after the h2 they belong to.

   WHY A REHYPE PLUGIN AND NOT A COMPONENT.
   The articles are .md, not .mdx, so the body cannot call a component. Writing a
   plain markdown image into the body would work visually and lose the two things
   that must never be lost: the photographer credit and the licence. So the media
   is declared in frontmatter (`figures[]`, `charts[]`), each item naming the id
   of the h2 it follows, and this plugin drops it into the tree at build time.

   The payoff is that the automation pipeline never learns a new body syntax. It
   appends objects to an array; the prose it writes stays plain markdown.

   `after` is matched against the heading id Astro publishes in the final HTML.
   Careful: at the point a USER rehype plugin runs, Astro has not added those ids
   yet, so reading `properties.id` here finds nothing. The ids are recomputed with
   github-slugger, the same slugger Astro uses, walking every heading level in
   document order so the duplicate-suffix counter lands on the same values.

   An `after` that matches nothing throws in dev and warns in production. A figure
   that silently vanished is worse than a build that stops.
   --------------------------------------------------------------------------- */

import Slugger from 'github-slugger';

const el = (tagName, properties, children = []) => ({
  type: 'element', tagName, properties, children,
});
const txt = (value) => ({ type: 'text', value });

/* The credit line. Photographer, then licence, both muted and small. This is the
   whole reason the media lives in frontmatter, so it is never optional-by-accident:
   if a credit exists it renders, and an image with a licence we cannot name does
   not get added in the first place. */
function creditLine(item) {
  if (!item.credit && !item.license) return null;
  const bits = [];
  if (item.credit) {
    bits.push(
      item.creditUrl
        ? el('a', { href: item.creditUrl, target: '_blank', rel: 'noopener nofollow' }, [txt(item.credit)])
        : txt(item.credit)
    );
  }
  if (item.license) {
    if (bits.length) bits.push(txt(' · '));
    bits.push(txt(item.license));
  }
  return el('p', { className: ['fig-credit', 'mono'] }, bits);
}

function figureNode(f) {
  const kids = [
    el('figure', { className: ['body-figure'] }, [
      el('img', {
        src: f.src, alt: f.alt, loading: 'lazy', decoding: 'async',
        width: 1600, height: 900,
      }),
    ]),
  ];
  if (f.caption) kids.push(el('p', { className: ['fig-caption'] }, [txt(f.caption)]));
  const c = creditLine(f);
  if (c) kids.push(c);
  return el('div', { className: ['media'] }, kids);
}

function chartNode(c) {
  /* Bars are normalised against the largest value, so an author writes real
     numbers and never a percentage of a bar width. */
  const max = Math.max(...c.bars.map((b) => Number(b.value) || 0), 0) || 1;
  const rows = c.bars.map((b) =>
    el('div', { className: ['bar-row'] }, [
      el('div', { className: ['bar-head'] }, [
        el('span', { className: ['bar-name'] }, [txt(b.name)]),
        el('span', { className: ['bar-value'] }, [txt(b.label)]),
      ]),
      el('div', { className: ['track'] }, [
        el('div', {
          className: b.muted ? ['fill', 'muted'] : ['fill'],
          style: `width:${Math.max(2, Math.round((Number(b.value) / max) * 100))}%`,
        }),
      ]),
    ])
  );

  const kids = [el('p', { className: ['chart-title'] }, [txt(c.title)])];
  if (c.sub) kids.push(el('p', { className: ['chart-sub'] }, [txt(c.sub)]));
  kids.push(el('div', { className: ['bars'] }, rows));
  if (c.note) kids.push(el('p', { className: ['chart-note'] }, [txt(c.note)]));
  if (c.source) kids.push(el('figcaption', {}, [txt(`Source: ${c.source}`)]));
  return el('figure', { className: ['chart'] }, kids);
}

export default function rehypeMedia() {
  return (tree, file) => {
    const fm = file?.data?.astro?.frontmatter ?? {};
    const items = [
      ...(fm.figures ?? []).map((f) => ({ after: f.after, node: () => figureNode(f) })),
      ...(fm.charts ?? []).map((c) => ({ after: c.after, node: () => chartNode(c) })),
    ];
    if (!items.length) return;

    /* Slug every heading in order with one slugger, exactly as rehype-slug does,
       so a repeated heading text gets the same "-1" suffix Astro will give it. */
    const text = (n) =>
      n.type === 'text' ? n.value : (n.children ?? []).map(text).join('');
    const slugger = new Slugger();
    const ids = new Map();
    for (const n of tree.children) {
      if (n.type !== 'element' || !/^h[1-6]$/.test(n.tagName)) continue;
      const id = n.properties?.id ?? slugger.slug(text(n));
      if (n.tagName === 'h2') ids.set(n, id);
    }

    const placed = new Set();
    for (let i = tree.children.length - 1; i >= 0; i--) {
      const n = tree.children[i];
      if (!ids.has(n)) continue;
      const mine = items.filter((it) => it.after === ids.get(n));
      if (!mine.length) continue;
      tree.children.splice(i + 1, 0, ...mine.map((it) => it.node()));
      mine.forEach((it) => placed.add(it));
    }

    const orphans = items.filter((it) => !placed.has(it));
    if (orphans.length) {
      const available = [...ids.values()];
      const msg =
        `rehype-media: no h2 matches ${orphans.map((o) => `"${o.after}"`).join(', ')}` +
        ` in ${file?.history?.[0] ?? 'an article'}. Available ids: ${available.join(', ') || '(none)'}`;
      if (process.env.NODE_ENV !== 'production') throw new Error(msg);
      console.warn(msg);
    }
  };
}
