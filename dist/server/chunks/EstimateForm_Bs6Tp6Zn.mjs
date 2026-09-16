import { g as createComponent, m as maybeRenderHead, i as addAttribute, r as renderTemplate } from './astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import 'clsx';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$EstimateForm = createComponent(async ($$result, $$props, $$slots) => {
  const siteKey = process.env.TURNSTILE_SITE ?? "";
  return renderTemplate`${maybeRenderHead()}<form id="estimate-form" class="space-y-5"> <div class="grid sm:grid-cols-2 gap-4"> <div> <label for="firstName" class="block text-sm font-heading font-medium text-navy-700 mb-1.5">First Name *</label> <input type="text" id="firstName" name="firstName" required class="w-full px-4 py-2.5 text-sm rounded-lg border border-navy-200 
               focus:border-crst-accent focus:ring-2 focus:ring-crst-accent/20 
               outline-none transition-all font-body placeholder:text-navy-400" placeholder="John"> </div> <div> <label for="lastName" class="block text-sm font-heading font-medium text-navy-700 mb-1.5">Last Name *</label> <input type="text" id="lastName" name="lastName" required class="w-full px-4 py-2.5 text-sm rounded-lg border border-navy-200 
               focus:border-crst-accent focus:ring-2 focus:ring-crst-accent/20 
               outline-none transition-all font-body placeholder:text-navy-400" placeholder="Smith"> </div> </div> <div class="grid sm:grid-cols-2 gap-4"> <div> <label for="email" class="block text-sm font-heading font-medium text-navy-700 mb-1.5">Email *</label> <input type="email" id="email" name="email" required class="w-full px-4 py-2.5 text-sm rounded-lg border border-navy-200 
               focus:border-crst-accent focus:ring-2 focus:ring-crst-accent/20 
               outline-none transition-all font-body placeholder:text-navy-400" placeholder="john@company.com"> </div> <div> <label for="phone" class="block text-sm font-heading font-medium text-navy-700 mb-1.5">Phone</label> <input type="tel" id="phone" name="phone" class="w-full px-4 py-2.5 text-sm rounded-lg border border-navy-200 
               focus:border-crst-accent focus:ring-2 focus:ring-crst-accent/20 
               outline-none transition-all font-body placeholder:text-navy-400" placeholder="(845) 555-0100"> </div> </div> <div> <label for="company" class="block text-sm font-heading font-medium text-navy-700 mb-1.5">Company / Organization</label> <input type="text" id="company" name="company" class="w-full px-4 py-2.5 text-sm rounded-lg border border-navy-200 
             focus:border-crst-accent focus:ring-2 focus:ring-crst-accent/20 
             outline-none transition-all font-body placeholder:text-navy-400" placeholder="Acme Corp"> </div> <div> <label for="message" class="block text-sm font-heading font-medium text-navy-700 mb-1.5">Tell us about your project *</label> <textarea id="message" name="message" required rows="4" class="w-full px-4 py-2.5 text-sm rounded-lg border border-navy-200 
             focus:border-crst-accent focus:ring-2 focus:ring-crst-accent/20 
             outline-none transition-all font-body placeholder:text-navy-400 resize-y" placeholder="Describe your mailing project — quantity, mail piece type, target area, timeline, etc."></textarea> </div> <!-- Honeypot --> <div class="hidden" aria-hidden="true"> <input type="text" name="website" tabindex="-1" autocomplete="off"> <input type="text" name="_loadtime" tabindex="-1" autocomplete="off" id="form-loadtime"> </div> <!-- Cloudflare Turnstile widget --> ${siteKey && renderTemplate`<div class="cf-turnstile"${addAttribute(siteKey, "data-sitekey")} data-theme="light"></div>`} <button type="submit" class="btn-primary w-full sm:w-auto text-sm px-8 py-3" id="estimate-submit"> <span id="submit-text">Get Free Estimate</span> <svg id="submit-spinner" class="hidden w-4 h-4 ml-2 animate-spin" fill="none" viewBox="0 0 24 24"> <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle> <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg> </button> <!-- Status messages --> <div id="form-success" class="hidden p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800 font-heading"> <strong>Thank you!</strong> We've received your request and will be in touch within one business day.
</div> <div id="form-error" class="hidden p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800 font-heading">
Something went wrong. Please call us at <a href="tel:8452555722" class="underline font-semibold">(845) 255-5722</a> or email <a href="mailto:info@crst.net" class="underline font-semibold">info@crst.net</a>.
</div> </form> <!-- Load Turnstile script once per page --> ${siteKey && renderTemplate(_a || (_a = __template(['<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>'])))} `;
}, "/home/runner/workspace/src/components/EstimateForm.astro", void 0);

export { $$EstimateForm as $ };
