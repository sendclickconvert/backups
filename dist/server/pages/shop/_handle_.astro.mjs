/* empty css                                     */
import { f as createAstro, g as createComponent, j as renderComponent, r as renderTemplate, k as Fragment$1, u as unescapeHTML, m as maybeRenderHead, i as addAttribute } from '../../chunks/astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_DiWmhVn7.mjs';
import { $ as $$CTASection } from '../../chunks/CTASection_DUHcOetM.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useCallback } from 'react';
import { g as getStorefrontToken, s as storefrontFetch, P as PRODUCT_BY_HANDLE_QUERY, c as PRODUCT_VARIANTS_PAGE_QUERY } from '../../chunks/shopify_B5LulV77.mjs';
import { g as getCollection } from '../../chunks/_astro_content_BqFzM45_.mjs';
import { P as PRODUCT_META } from '../../chunks/products_xtWUVfSC.mjs';
import { B as BUSINESS } from '../../chunks/site_Bvm2fFWv.mjs';
import { a as isPlaceholder, h as hasRealFaqs, i as isDraftProduct } from '../../chunks/product-content_CGIJuP1_.mjs';
export { renderers } from '../../renderers.mjs';

function formatPrice(amount, currency) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2
  }).format(parseFloat(amount));
}
function findVariant(variants, selections) {
  if (Object.values(selections).some((v) => !v)) return null;
  return variants.find(
    (v) => v.selectedOptions.every((opt) => selections[opt.name] === opt.value)
  ) ?? null;
}
function getAvailableValues(variants, options, selections, optionIndex) {
  const priorOptions = options.slice(0, optionIndex);
  const filtered = variants.filter(
    (v) => priorOptions.every((prior) => {
      const sel = selections[prior.name];
      return sel && v.selectedOptions.some((o) => o.name === prior.name && o.value === sel);
    }) && v.availableForSale
  );
  const currentName = options[optionIndex].name;
  const seen = /* @__PURE__ */ new Set();
  const result = [];
  for (const v of filtered) {
    const opt = v.selectedOptions.find((o) => o.name === currentName);
    if (opt && !seen.has(opt.value)) {
      seen.add(opt.value);
      result.push(opt.value);
    }
  }
  return result;
}
function ProductSelector({ product, placeholderSrc }) {
  const blank = {};
  product.options.forEach((opt) => {
    blank[opt.name] = "";
  });
  const [selections, setSelections] = useState(blank);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const matched = findVariant(product.variants, selections);
  const allSelected = product.options.every((opt) => !!selections[opt.name]);
  const available = matched?.availableForSale ?? false;
  const canBuy = allSelected && available;
  const handleSelect = (name, value) => {
    const idx = product.options.findIndex((o) => o.name === name);
    setSelections((prev) => {
      const next = { ...prev, [name]: value };
      product.options.slice(idx + 1).forEach((o) => {
        next[o.name] = "";
      });
      return next;
    });
    setError("");
  };
  const handleAddToCart = useCallback(async () => {
    if (!matched || !canBuy) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/shop/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId: matched.id })
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      try {
        localStorage.setItem(
          "crst_cart",
          JSON.stringify({ checkoutUrl: data.checkoutUrl, count: 1 })
        );
        window.dispatchEvent(new Event("crst_cart_updated"));
      } catch {
      }
      window.location.href = data.checkoutUrl;
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [matched, canBuy]);
  const firstImage = product.images[0];
  return /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-10 lg:gap-16 items-start", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-2xl border border-navy-100 overflow-hidden shadow-sm", children: firstImage ? /* @__PURE__ */ jsx(
      "img",
      {
        src: firstImage.url,
        alt: firstImage.altText ?? product.title,
        width: firstImage.width,
        height: firstImage.height,
        className: "w-full h-auto object-cover"
      }
    ) : placeholderSrc ? /* @__PURE__ */ jsx(
      "img",
      {
        src: placeholderSrc,
        alt: product.title,
        className: "w-full h-auto object-cover"
      }
    ) : /* @__PURE__ */ jsx("div", { className: "aspect-square bg-navy-50 flex items-center justify-center", children: /* @__PURE__ */ jsx(
      "svg",
      {
        className: "w-16 h-16 text-navy-300",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 1.5,
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          }
        )
      }
    ) }) }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-display text-crst-primary leading-tight", children: product.title }),
        product.descriptionHtml && /* @__PURE__ */ jsx(
          "div",
          {
            className: "mt-3 text-navy-600/80 text-sm leading-relaxed prose prose-sm max-w-none",
            dangerouslySetInnerHTML: { __html: product.descriptionHtml }
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: product.options.map((opt, idx) => {
        const prevName = idx > 0 ? product.options[idx - 1].name : null;
        const upstreamMissing = idx > 0 && !selections[product.options[idx - 1].name];
        const availableValues = upstreamMissing ? [] : getAvailableValues(product.variants, product.options, selections, idx);
        return /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-heading font-semibold text-navy-700 mb-1.5", children: opt.name }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: selections[opt.name],
              onChange: (e) => handleSelect(opt.name, e.target.value),
              disabled: upstreamMissing,
              className: `w-full border rounded-lg px-3 py-2.5 text-sm font-heading bg-white focus:outline-none focus:ring-2 focus:ring-crst-accent focus:border-transparent transition-colors ${upstreamMissing ? "border-navy-100 text-navy-300 cursor-not-allowed" : "border-navy-200 text-navy-700"}`,
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: upstreamMissing ? `Select ${prevName} first` : `— Select ${opt.name} —` }),
                availableValues.map((val) => /* @__PURE__ */ jsx("option", { value: val, children: val }, val))
              ]
            }
          )
        ] }, opt.name);
      }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-navy-50 rounded-xl px-4 py-4 border border-navy-100", children: matched ? /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-heading font-medium text-navy-500 uppercase tracking-wide mb-1", children: "Total Order Price" }),
        /* @__PURE__ */ jsx("p", { className: "text-3xl font-display text-crst-primary", children: formatPrice(matched.price.amount, matched.price.currencyCode) }),
        matched.sku && /* @__PURE__ */ jsxs("p", { className: "text-xs text-navy-400 mt-1.5 font-mono", children: [
          "SKU: ",
          matched.sku
        ] })
      ] }) : /* @__PURE__ */ jsx("p", { className: "text-sm text-navy-500 font-heading", children: allSelected ? "This combination is unavailable." : "Select all options to see pricing." }) }),
      error && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-600 font-heading", role: "alert", children: error }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: handleAddToCart,
          disabled: !canBuy || loading,
          className: `w-full py-3.5 px-6 rounded-xl font-heading font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${canBuy && !loading ? "bg-crst-primary text-white hover:bg-navy-700 shadow-md hover:shadow-lg" : "bg-navy-100 text-navy-400 cursor-not-allowed"}`,
          children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs(
              "svg",
              {
                className: "w-4 h-4 animate-spin",
                fill: "none",
                viewBox: "0 0 24 24",
                children: [
                  /* @__PURE__ */ jsx(
                    "circle",
                    {
                      className: "opacity-25",
                      cx: "12",
                      cy: "12",
                      r: "10",
                      stroke: "currentColor",
                      strokeWidth: "4"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      className: "opacity-75",
                      fill: "currentColor",
                      d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    }
                  )
                ]
              }
            ),
            "Processing…"
          ] }) : !allSelected ? "Select All Options" : !available ? "Unavailable" : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-4 h-4",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                strokeWidth: 2,
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                  }
                )
              }
            ),
            "Proceed to Checkout"
          ] })
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-navy-400 font-heading text-center", children: "Secure checkout · Powered by Shopify" })
    ] })
  ] });
}

function lowestPriceVariant(variants) {
  return variants.reduce((lowest, v) => {
    if (!lowest) return v;
    return parseFloat(v.price.amount) < parseFloat(lowest.price.amount) ? v : lowest;
  }, null);
}
function priceValidUntil() {
  const d = /* @__PURE__ */ new Date();
  d.setDate(d.getDate() + 90);
  return d.toISOString().slice(0, 10);
}
function buildProductGraph(product, content, meta, canonicalUrl) {
  const cheapest = lowestPriceVariant(product.variants);
  const inStock = product.variants.some((v) => v.availableForSale);
  const image = product.images[0]?.url;
  const offer = {
    "@type": "Offer",
    url: canonicalUrl,
    priceCurrency: cheapest?.price.currencyCode ?? "USD",
    price: cheapest?.price.amount ?? void 0,
    availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    itemCondition: "https://schema.org/NewCondition",
    priceValidUntil: priceValidUntil(),
    seller: {
      "@type": "Organization",
      name: BUSINESS.name,
      url: BUSINESS.url
    }
  };
  const productSchema = {
    "@type": "Product",
    name: product.title,
    url: canonicalUrl,
    brand: { "@type": "Brand", name: BUSINESS.name },
    offers: offer
  };
  if (!isPlaceholder(content.intro)) productSchema.description = content.intro;
  if (image) productSchema.image = image;
  if (cheapest?.sku) productSchema.sku = cheapest.sku;
  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BUSINESS.url },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${BUSINESS.url}/shop` },
      { "@type": "ListItem", position: 3, name: product.title, item: canonicalUrl }
    ]
  };
  const graph = [productSchema, breadcrumb];
  if (hasRealFaqs(content)) {
    const realFaqs = content.faqs.filter((f) => !isPlaceholder(f.q) && !isPlaceholder(f.a));
    graph.push({
      "@type": "FAQPage",
      mainEntity: realFaqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a }
      }))
    });
  }
  return graph;
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://crst.net");
const prerender = false;
const $$handle = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$handle;
  const { handle } = Astro2.params;
  Astro2.response.headers.set("Cache-Control", "no-store");
  const PRODUCT_PLACEHOLDERS = {
    "plastic-postcard": "/images/shop/plastic-postcard-placeholder.png",
    "magnet-postcard": "/images/shop/magnet-postcard-placeholder.png"
  };
  const placeholderSrc = PRODUCT_PLACEHOLDERS[handle] ?? null;
  const token = getStorefrontToken();
  let productData = null;
  let fetchError = "";
  if (!token) {
    Astro2.response.status = 503;
    fetchError = "Store not configured. Set SHOPIFY_STOREFRONT_TOKEN.";
  } else {
    try {
      const data = await storefrontFetch(
        PRODUCT_BY_HANDLE_QUERY,
        { handle }
      );
      const raw = data.productByHandle;
      if (!raw) {
        return new Response("Product not found.", {
          status: 404,
          headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" }
        });
      }
      const allVariants = raw.variants.edges.map((e) => e.node);
      let pageInfo = raw.variants.pageInfo;
      while (pageInfo.hasNextPage) {
        const cursor = pageInfo.endCursor;
        if (!cursor) throw new Error("Missing Shopify variant cursor.");
        const nextData = await storefrontFetch(
          PRODUCT_VARIANTS_PAGE_QUERY,
          { handle, after: cursor }
        );
        const nextVariants = nextData.productByHandle?.variants;
        if (!nextVariants || nextVariants.pageInfo.hasNextPage && nextVariants.pageInfo.endCursor === cursor) {
          throw new Error("Invalid Shopify variant pagination.");
        }
        allVariants.push(...nextVariants.edges.map((e) => e.node));
        pageInfo = nextVariants.pageInfo;
      }
      productData = {
        title: raw.title,
        handle: raw.handle,
        descriptionHtml: raw.descriptionHtml ?? "",
        images: raw.images.edges.map((e) => e.node),
        options: raw.options,
        variants: allVariants
      };
    } catch (err) {
      Astro2.response.status = 503;
      Astro2.response.headers.set("Retry-After", "60");
      console.error("[shop/product] Shopify unavailable:", err instanceof Error ? err.message : "Unknown error");
      fetchError = "This product is temporarily unavailable. Please try again shortly or contact us for an order.";
    }
  }
  const contentEntries = await getCollection("products");
  const contentEntry = contentEntries.find((e) => e.slug === handle);
  const content = contentEntry?.data ?? null;
  const meta = PRODUCT_META[handle] ?? null;
  const canonicalUrl = `${BUSINESS.url}/shop/${handle}`;
  const relatedProducts = (content?.relatedProducts ?? []).map((h) => contentEntries.find((e) => e.slug === h)).filter((e) => !!e);
  const schemaGraph = productData && content && meta ? buildProductGraph(productData, content, meta, canonicalUrl) : null;
  const draft = content ? isDraftProduct(content) : true;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": productData ? `${productData.title} \u2014 Print & Mail | Cornerstone` : "Product | Cornerstone Services", "description": productData ? `Order ${productData.title} from Cornerstone Services. Choose your options and go straight to checkout. Full-service print and direct mail from Saugerties, NY.` : "", "canonical": canonicalUrl, "schema": null, "noIndex": draft || !!fetchError }, { "default": async ($$result2) => renderTemplate`${maybeRenderHead()}<div class="min-h-[70vh] bg-gray-50 py-14"> <div class="container-wide max-w-5xl"> <!-- 1. Breadcrumb --> <nav aria-label="Breadcrumb" class="mb-8"> <ol class="flex items-center gap-2 text-sm font-heading text-navy-400"> <li><a href="/" class="hover:text-crst-primary transition-colors">Home</a></li> <li class="flex items-center gap-2"> <svg class="w-3.5 h-3.5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"> <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path> </svg> <a href="/shop" class="hover:text-crst-primary transition-colors">Shop</a> </li> ${productData && renderTemplate`<li class="flex items-center gap-2"> <svg class="w-3.5 h-3.5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"> <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path> </svg> <span class="text-navy-600">${productData.title}</span> </li>`} </ol> </nav> ${fetchError ? renderTemplate`<div class="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl font-heading text-sm"> <strong>Error:</strong> ${fetchError} </div>` : productData ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment$1, {}, { "default": async ($$result3) => renderTemplate`  ${renderComponent($$result3, "ProductSelector", ProductSelector, { "product": productData, "placeholderSrc": placeholderSrc, "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/workspace/src/components/shop/ProductSelector.tsx", "client:component-export": "default" })} <div class="mt-4 flex justify-end"> <a${addAttribute(`/estimate?product=${handle}`, "href")} class="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-crst-primary text-crst-primary font-heading font-semibold text-sm hover:bg-crst-primary hover:text-white transition-colors">
Request a Quote Instead
<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg> </a> </div> ${content && renderTemplate`<div class="mt-16 grid lg:grid-cols-3 gap-10"> <div class="lg:col-span-2 space-y-12"> <!-- 3. Intro (never renders the literal placeholder) --> ${!isPlaceholder(content.intro) && renderTemplate`<div class="prose prose-navy max-w-none prose-headings:font-display prose-headings:text-crst-primary prose-p:text-navy-600/80"> <p class="text-lg leading-relaxed">${content.intro}</p> </div>`} <!-- 4. Specifications — hidden entirely while draft; per-row
                     guards protect stock/inkFinish/turnaround, which can be
                     unfilled even on a non-draft product. --> ${!draft && renderTemplate`<section> <h2 class="text-2xl font-display text-crst-primary mb-4">Specifications</h2> <div class="overflow-x-auto rounded-xl border border-navy-100 bg-white"> <table class="w-full text-sm"> <tbody class="divide-y divide-navy-100"> <tr><th class="text-left px-4 py-3 font-heading font-semibold text-navy-700 w-40 align-top">Sizes</th><td class="px-4 py-3 text-navy-600/80">${content.specs.sizes}</td></tr> ${!isPlaceholder(content.specs.stock) && renderTemplate`<tr><th class="text-left px-4 py-3 font-heading font-semibold text-navy-700 align-top">Stock</th><td class="px-4 py-3 text-navy-600/80">${content.specs.stock}</td></tr>`} ${!isPlaceholder(content.specs.inkFinish) && renderTemplate`<tr><th class="text-left px-4 py-3 font-heading font-semibold text-navy-700 align-top">Ink / Finish</th><td class="px-4 py-3 text-navy-600/80">${content.specs.inkFinish}</td></tr>`} <tr><th class="text-left px-4 py-3 font-heading font-semibold text-navy-700 align-top">Minimum Quantity</th><td class="px-4 py-3 text-navy-600/80">${content.specs.minQuantity}</td></tr> <tr><th class="text-left px-4 py-3 font-heading font-semibold text-navy-700 align-top">Quantity Breaks</th><td class="px-4 py-3 text-navy-600/80">${content.specs.quantityBreaks}</td></tr> ${!isPlaceholder(content.specs.turnaround) && renderTemplate`<tr><th class="text-left px-4 py-3 font-heading font-semibold text-navy-700 align-top">Turnaround</th><td class="px-4 py-3 text-navy-600/80">${content.specs.turnaround}</td></tr>`} </tbody> </table> </div> </section>`} <!-- 5. Use Cases --> ${!draft && renderTemplate`<section> <h2 class="text-2xl font-display text-crst-primary mb-4">Common Use Cases</h2> <ul class="grid sm:grid-cols-2 gap-3"> ${content.useCases.map((uc) => renderTemplate`<li class="flex items-start gap-2 text-navy-600/80 text-sm bg-white border border-navy-100 rounded-lg px-4 py-3"> <svg class="w-4 h-4 text-crst-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg> ${uc} </li>`)} </ul> </section>`} <!-- 6. How to Order --> ${!draft && renderTemplate`<section> <h2 class="text-2xl font-display text-crst-primary mb-4">How to Order</h2> <ol class="space-y-3"> ${content.howToOrder.map((step, i) => renderTemplate`<li class="flex items-start gap-3 text-navy-600/80 text-sm"> <span class="flex-shrink-0 w-6 h-6 rounded-full bg-crst-primary text-white text-xs font-heading font-bold flex items-center justify-center">${i + 1}</span> <span class="pt-0.5">${step}</span> </li>`)} </ol> </section>`} <!-- 7. FAQ (fully expanded, no JS) --> ${!draft && hasRealFaqs(content) && renderTemplate`<section> <h2 class="text-2xl font-display text-crst-primary mb-4">Frequently Asked Questions</h2> <div class="space-y-4"> ${content.faqs.filter((f) => !isPlaceholder(f.q) && !isPlaceholder(f.a)).map((f) => renderTemplate`<div class="bg-white rounded-xl border border-navy-100 p-5"> <h3 class="font-heading font-semibold text-navy-800 text-sm mb-2">${f.q}</h3> <p class="text-sm text-navy-600/70 leading-relaxed">${f.a}</p> </div>`)} </div> </section>`} </div> <!-- Sidebar --> <aside class="lg:col-span-1"> <div class="sticky top-28 space-y-6"> <!-- 10. Parent service back-link --> ${meta && renderTemplate`<div class="bg-crst-primary rounded-xl p-6 text-white"> <h3 class="font-display text-lg mb-2">Part of ${meta.parentService.label}</h3> <p class="text-white/60 text-sm leading-relaxed mb-4">See the full service this product supports, including design and mailing.</p> <a${addAttribute(meta.parentService.href, "href")} class="btn-accent w-full text-center text-sm">View ${meta.parentService.label} →</a> </div>`} <!-- 9. Related guides --> ${meta && meta.guides.length > 0 && renderTemplate`<div class="bg-navy-50/50 rounded-xl p-5 border border-navy-100"> <h3 class="font-heading font-bold text-navy-800 text-sm mb-3">Related Guides</h3> <div class="space-y-2"> ${meta.guides.map((g) => renderTemplate`<a${addAttribute(g.href, "href")} class="flex items-center justify-between px-3 py-2 text-sm text-navy-700 hover:text-crst-primary hover:bg-white rounded-md transition-colors font-heading"> ${g.label} <svg class="w-3.5 h-3.5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg> </a>`)} </div> </div>`} <!-- 8. Related products --> ${relatedProducts.length > 0 && renderTemplate`<div class="bg-white rounded-xl p-5 border border-navy-100"> <h3 class="font-heading font-bold text-navy-800 text-sm mb-3">Related Products</h3> <div class="space-y-2"> ${relatedProducts.map((p) => renderTemplate`<a${addAttribute(`/shop/${p.slug}`, "href")} class="flex items-center justify-between px-3 py-2 text-sm text-navy-700 hover:text-crst-primary hover:bg-navy-50 rounded-md transition-colors font-heading"> ${p.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} <svg class="w-3.5 h-3.5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg> </a>`)} </div> </div>`} </div> </aside> </div>`}` })}` : null} </div> </div>  ${renderComponent($$result2, "CTASection", $$CTASection, {})} `, "head": async ($$result2) => renderTemplate`${schemaGraph && renderTemplate`${renderComponent($$result2, "Fragment", Fragment$1, { "slot": "head" }, { "default": async ($$result3) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', "<\/script> "])), unescapeHTML(JSON.stringify({ "@context": "https://schema.org", "@graph": schemaGraph }))) })}`}` })}`;
}, "/home/runner/workspace/src/pages/shop/[handle].astro", void 0);

const $$file = "/home/runner/workspace/src/pages/shop/[handle].astro";
const $$url = "/shop/[handle]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$handle,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
