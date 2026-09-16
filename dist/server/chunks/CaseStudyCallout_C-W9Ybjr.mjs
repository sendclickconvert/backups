import { f as createAstro, g as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate, i as addAttribute } from './astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro("https://crst.net");
const $$CaseStudyCallout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CaseStudyCallout;
  const { href, client, summary, summaryHtml, anchor } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="bg-navy-50/60 border border-navy-100 rounded-xl p-5 hover:border-crst-primary/30 hover:shadow-sm transition-all"> <span class="inline-block text-xs font-heading font-semibold uppercase tracking-wider text-crst-primary/60 mb-2">Case Study</span> <h3 class="font-heading font-bold text-navy-800 text-sm mb-2">${client}</h3> ${summaryHtml ? renderTemplate`<p class="text-sm text-navy-600/80 leading-relaxed mb-3">${unescapeHTML(summaryHtml)}</p>` : renderTemplate`<p class="text-sm text-navy-600/80 leading-relaxed mb-3">${summary}</p>`} <a${addAttribute(href, "href")} class="inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-crst-accent hover:text-crst-primary transition-colors"> ${anchor} <svg class="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"></path> </svg> </a> </div>`;
}, "/home/runner/workspace/src/components/CaseStudyCallout.astro", void 0);

export { $$CaseStudyCallout as $ };
