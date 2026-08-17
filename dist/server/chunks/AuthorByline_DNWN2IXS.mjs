import { f as createAstro, g as createComponent, m as maybeRenderHead, r as renderTemplate } from './astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro("https://crst.net");
const $$AuthorByline = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AuthorByline;
  const { compact = false } = Astro2.props;
  return renderTemplate`${compact ? renderTemplate`${maybeRenderHead()}<div class="flex items-center gap-3 text-sm text-gray-500 mt-6"><img src="/images/sean-griffin.png" alt="Sean Griffin, MDP" class="w-12 h-12 rounded-full object-cover" loading="lazy"><div><span class="font-medium text-gray-900">Sean Griffin, MDP</span><span class="mx-1">&middot;</span><span>Mailpiece Design Professional</span></div></div>` : renderTemplate`<div class="my-8 p-6 bg-gray-50 border-l-4 border-crst-primary rounded-r-lg"><div class="flex items-start gap-4"><img src="/images/sean-griffin.png" alt="Sean Griffin, Mailpiece Design Professional" class="w-20 h-20 rounded-full object-cover flex-shrink-0" loading="lazy"><div><div class="font-semibold text-lg text-gray-900"><a href="/about" class="hover:text-crst-primary transition-colors">Sean Griffin, MDP</a></div><div class="text-sm text-gray-600 mb-2">
Mailpiece Design Professional | Owner, Cornerstone Services, Inc.
</div><p class="text-sm text-gray-700 leading-relaxed">
Sean is a USPS-certified Mailpiece Design Professional (MDP) with 25+ years of experience producing compliant direct mail campaigns for Hudson Valley businesses. He has processed over 2.3 million mail pieces through the USPS Business Mail Entry Unit in Saugerties, NY since 1998.
</p></div></div></div>`}`;
}, "/home/runner/workspace/src/components/AuthorByline.astro", void 0);

export { $$AuthorByline as $ };
