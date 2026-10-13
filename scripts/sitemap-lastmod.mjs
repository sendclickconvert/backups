// Builds { 'https://crst.net/path': 'YYYY-MM-DD' } for the sitemap's <lastmod>, from dates the
// site already records. Pages with no recorded date get no lastmod (better than a fake one).
//   - content collections: frontmatter updatedDate  -> /services/<cluster>/<slug>
//   - envelope spokes:     lastUpdated in src/data/envelope-spokes.ts -> /guides/envelope-sizes/<key>
//   - static .astro pages: the newest dateModified: '…' or const lastUpdated = '…' in the file
import fs from 'node:fs';
import path from 'node:path';

const SITE = 'https://crst.net';
const CLUSTER_ROUTES = {
  'dm-articles': '/services/direct-mail',
  'eddm-articles': '/services/eddm',
  'data-articles': '/services/data-lists',
  'graphic-design-articles': '/services/graphic-design',
  'mailing-articles': '/services/mailing',
  'nonprofit-articles': '/services/non-profit-mailing',
  'printing-articles': '/services/printing',
  'school-articles': '/services/school-district-direct-mail',
  'union-articles': '/services/union-printing',
  'web-design-articles': '/services/web-design',
};

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
}

export function buildLastmodMap(root) {
  const map = {};
  const set = (route, date) => {
    const url = SITE + (route === '/' ? '/' : route);
    if (!map[url] || map[url] < date) map[url] = date;
  };

  for (const [dir, route] of Object.entries(CLUSTER_ROUTES)) {
    const abs = path.join(root, 'src/content', dir);
    if (!fs.existsSync(abs)) continue;
    for (const f of fs.readdirSync(abs).filter((n) => n.endsWith('.md'))) {
      const m = fs.readFileSync(path.join(abs, f), 'utf8').match(/^updatedDate:\s*(\d{4}-\d{2}-\d{2})/m);
      if (m) set(`${route}/${f.replace(/\.md$/, '')}`, m[1]);
    }
  }

  // Spokes are an object keyed by slug: 'no-10': { ..., lastUpdated: '2026-05-11', ... }
  const spokes = fs.readFileSync(path.join(root, 'src/data/envelope-spokes.ts'), 'utf8');
  for (const m of spokes.matchAll(/^\s{2}'([a-z0-9-]+)':\s*\{[\s\S]*?lastUpdated:\s*'(\d{4}-\d{2}-\d{2})'/gm)) {
    set(`/guides/envelope-sizes/${m[1]}`, m[2]);
  }

  const pagesDir = path.join(root, 'src/pages');
  for (const file of walk(pagesDir).filter((f) => f.endsWith('.astro') && !f.includes('['))) {
    const src = fs.readFileSync(file, 'utf8');
    const dates = [...src.matchAll(/(?:dateModified:\s*['"]|const lastUpdated\s*=\s*['"])(\d{4}-\d{2}-\d{2})/g)].map((m) => m[1]);
    if (!dates.length) continue;
    const rel = path.relative(pagesDir, file).split(path.sep).join('/').replace(/\.astro$/, '');
    const route = ('/' + rel).replace(/\/index$/, '') || '/';
    set(route, dates.sort().at(-1));
  }
  return map;
}
