import { f as createAstro, g as createComponent, r as renderTemplate, u as unescapeHTML, m as maybeRenderHead, i as addAttribute } from './astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import 'clsx';
import { B as BUSINESS } from './site_hCY61IW0.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://crst.net");
const $$PageHero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PageHero;
  const { title, subtitle, breadcrumbs, noSchema } = Astro2.props;
  const pageUrl = `${BUSINESS.url}${Astro2.url.pathname}`;
  const breadcrumbSchema = breadcrumbs ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BUSINESS.url },
      ...breadcrumbs.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: crumb.label,
        ...crumb.href ? { item: `${BUSINESS.url}${crumb.href}` } : {}
      }))
    ]
  } : null;
  return renderTemplate`${breadcrumbSchema && !noSchema && renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(breadcrumbSchema)))}${maybeRenderHead()}<section class="relative bg-crst-primary overflow-hidden"> <div class="absolute inset-0"> <div class="absolute inset-0 bg-gradient-to-br from-navy-900 via-crst-primary to-navy-700"></div> <div class="absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px); background-size: 56px 56px;"></div> <div class="absolute top-10 right-10 w-64 h-64 rounded-full bg-crst-accent/10 blur-3xl"></div> </div> <div class="relative container-wide py-14 lg:py-20"> ${breadcrumbs && renderTemplate`<nav aria-label="Breadcrumb" class="mb-4"> <ol class="flex items-center gap-2 text-sm font-heading text-white/50"> <li><a href="/" class="hover:text-white/80 transition-colors">Home</a></li> ${breadcrumbs.map((crumb, i) => renderTemplate`<li class="flex items-center gap-2"> <svg class="w-3.5 h-3.5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg> ${crumb.href ? renderTemplate`<a${addAttribute(crumb.href, "href")} class="hover:text-white/80 transition-colors">${crumb.label}</a>` : renderTemplate`<span class="text-white/70">${crumb.label}</span>`} </li>`)} </ol> </nav>`} <h1 class="text-3xl sm:text-4xl lg:text-5xl font-display text-white leading-tight"> ${title} </h1> ${subtitle && renderTemplate`<p class="mt-4 text-lg text-white/60 font-heading max-w-2xl">${subtitle}</p>`} </div> </section>`;
}, "/home/runner/workspace/src/components/PageHero.astro", void 0);

export { $$PageHero as $ };
