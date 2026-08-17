import { f as createAstro, g as createComponent, m as maybeRenderHead, i as addAttribute, r as renderTemplate } from './astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import 'clsx';
import { C as COUNTIES_DATA } from './locations_D7Dz0HLI.mjs';

const $$Astro = createAstro("https://crst.net");
const $$NearbyTowns = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$NearbyTowns;
  const { currentSlug, countySlug, countyDisplayName, basePath, serviceType } = Astro2.props;
  const county = COUNTIES_DATA.find((c) => c.slug === countySlug);
  const nearby = (county?.locations ?? []).filter((t) => t.slug !== currentSlug).slice(0, 8);
  return renderTemplate`${nearby.length > 0 && renderTemplate`${maybeRenderHead()}<section class="py-12 bg-gray-50"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><h2 class="text-xl font-display font-bold text-crst-primary mb-3">
Direct Mail Services in Nearby Towns
</h2><p class="text-sm text-gray-600 mb-6">
Cornerstone Services provides ${serviceType} throughout ${countyDisplayName}. Explore other communities we serve:
</p><ul class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">${nearby.map((town) => renderTemplate`<li><a${addAttribute(`${basePath}/${town.slug}`, "href")} class="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-white hover:border-crst-primary/40 hover:bg-crst-primary/5 transition-all group text-sm"><span class="text-gray-700 group-hover:text-crst-primary font-medium transition-colors">${town.name} direct mail services
</span><svg class="w-3.5 h-3.5 text-gray-300 group-hover:text-crst-primary shrink-0 ml-2 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg></a></li>`)}</ul></div></section>`}`;
}, "/home/runner/workspace/src/components/NearbyTowns.astro", void 0);

export { $$NearbyTowns as $ };
