import { f as createAstro, g as createComponent, m as maybeRenderHead, i as addAttribute, r as renderTemplate } from './astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import 'clsx';
import { B as BUSINESS } from './site_iO3XgdBw.mjs';

const $$Astro = createAstro("https://crst.net");
const $$CTASection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CTASection;
  const {
    headline = "Ready to Start Your Next Mailing?",
    text = `Get a free estimate from Hudson Valley's most trusted direct mail team. ${BUSINESS.stats.piecesMailed} pieces mailed and counting.`
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="relative overflow-hidden"> <div class="absolute inset-0 bg-gradient-to-br from-crst-primary via-navy-700 to-crst-secondary"></div> <div class="absolute inset-0 opacity-[0.04]" style="background-image: linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px); background-size: 48px 48px;"></div> <div class="absolute top-0 right-0 w-80 h-80 rounded-full bg-crst-gold/8 blur-3xl"></div> <div class="relative container-wide py-16 lg:py-20 text-center"> <div class="section-divider mx-auto mb-6"></div> <h2 class="text-3xl sm:text-4xl font-display text-white mb-4 text-balance"> ${headline} </h2> <p class="text-white/60 font-heading text-lg max-w-2xl mx-auto mb-8"> ${text} </p> <div class="flex flex-wrap items-center justify-center gap-4"> <a href="/estimate" title="Get Free Estimate" class="btn-accent text-sm px-8 py-3.5">
Get Free Estimate
<svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg> </a> <a${addAttribute(`tel:${BUSINESS.phoneClean}`, "href")}${addAttribute(`Call ${BUSINESS.name}`, "title")} class="inline-flex items-center gap-2 px-6 py-3.5 text-white/80 font-heading font-medium text-sm hover:text-white transition-colors"> <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
Call ${BUSINESS.phone} </a> </div> </div> </section>`;
}, "/home/runner/workspace/src/components/CTASection.astro", void 0);

export { $$CTASection as $ };
