export const SITE = {
  name: '109MUSIC',
  tagline: 'Music marketing, broken down.',
  description:
    'Music marketing breakdowns for independent artists: release strategy, Spotify and TikTok growth, touring economics and the money lanes that actually pay. Published by 109MUSIC.',
  author: '109MUSIC',
  instagram: 'https://www.instagram.com/109music.co/',
  beacons: 'https://beacons.ai/109music.co',
  lang: 'en',
};

export const SECTIONS = [
  { id: 'news', label: 'News', blurb: 'What changed on the platforms, and what it costs you.' },
  { id: 'guides', label: 'Guides', blurb: 'Step-by-step playbooks with real numbers.' },
  { id: 'case-studies', label: 'Case Studies', blurb: 'How a real rollout actually worked.' },
] as const;

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Build a base-aware absolute path: url('/guides/') -> '/109music-blog/guides/' */
export const url = (p = '/') => `${BASE}/${p.replace(/^\//, '')}`;

export const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();

export const isoDate = (d: Date) => d.toISOString().split('T')[0];

/** ~200 wpm, rounded up, floor of 1 */
export const readingTime = (body = '') =>
  Math.max(1, Math.round(body.trim().split(/\s+/).length / 200));

export const pad = (n: number) => String(n).padStart(2, '0');
