/* empty css                                     */
import { g as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_Bk7vL7Eo.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useCallback } from 'react';
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
function ProductSelector({ product }) {
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
    setSelections((prev) => ({ ...prev, [name]: value }));
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
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: product.options.map((opt) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-heading font-semibold text-navy-700 mb-1.5", children: opt.name }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: selections[opt.name],
            onChange: (e) => handleSelect(opt.name, e.target.value),
            className: "w-full border border-navy-200 rounded-lg px-3 py-2.5 text-sm font-heading text-navy-700 bg-white focus:outline-none focus:ring-2 focus:ring-crst-accent focus:border-transparent transition-colors",
            children: [
              /* @__PURE__ */ jsxs("option", { value: "", children: [
                "— Select ",
                opt.name,
                " —"
              ] }),
              opt.values.map((val) => /* @__PURE__ */ jsx("option", { value: val, children: val }, val))
            ]
          }
        )
      ] }, opt.name)) }),
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

const prerender = false;
const $$PlasticPostcard = createComponent(async ($$result, $$props, $$slots) => {
  const STOREFRONT_URL = "https://cornerstone-services-i42crwvc.myshopify.com/api/2025-10/graphql.json";
  const PRODUCT_QUERY = `
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      title
      handle
      descriptionHtml
      images(first: 10) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
      options {
        name
        values
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            sku
            availableForSale
            price {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;
  const token = process.env.SHOPIFY_STOREFRONT_TOKEN;
  let productData = null;
  let fetchError = "";
  if (!token) {
    fetchError = "Store not configured. Set SHOPIFY_STOREFRONT_TOKEN.";
  } else {
    try {
      const res = await fetch(STOREFRONT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": token
        },
        body: JSON.stringify({
          query: PRODUCT_QUERY,
          variables: { handle: "plastic-postcard" }
        })
      });
      const json = await res.json();
      const raw = json.data?.productByHandle;
      if (!raw) {
        fetchError = "Product not found. Confirm it is active and assigned to the storefront sales channel.";
      } else {
        productData = {
          title: raw.title,
          handle: raw.handle,
          descriptionHtml: raw.descriptionHtml ?? "",
          images: raw.images.edges.map((e) => e.node),
          options: raw.options,
          variants: raw.variants.edges.map((e) => e.node)
        };
      }
    } catch (err) {
      fetchError = "Failed to reach Shopify Storefront API.";
    }
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Plastic Postcards — Print & Mail", "description": "Order plastic postcards from Cornerstone Services. Choose your size, finish, and quantity — full-service print and direct mail from New Paltz, NY.", "schema": null, "noIndex": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-[70vh] bg-gray-50 py-14"> <div class="container-wide max-w-5xl"> <nav aria-label="Breadcrumb" class="mb-8"> <ol class="flex items-center gap-2 text-sm font-heading text-navy-400"> <li><a href="/" class="hover:text-crst-primary transition-colors">Home</a></li> <li class="flex items-center gap-2"> <svg class="w-3.5 h-3.5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"> <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path> </svg> <a href="/services/printing" class="hover:text-crst-primary transition-colors">Printing</a> </li> <li class="flex items-center gap-2"> <svg class="w-3.5 h-3.5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"> <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path> </svg> <span class="text-navy-600">Plastic Postcards</span> </li> </ol> </nav> ${fetchError ? renderTemplate`<div class="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl font-heading text-sm"> <strong>Error:</strong> ${fetchError} </div>` : productData ? renderTemplate`${renderComponent($$result2, "ProductSelector", ProductSelector, { "product": productData, "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/workspace/src/components/shop/ProductSelector.tsx", "client:component-export": "default" })}` : null} </div> </div> ` })}`;
}, "/home/runner/workspace/src/pages/shop/plastic-postcard.astro", void 0);
const $$file = "/home/runner/workspace/src/pages/shop/plastic-postcard.astro";
const $$url = "/shop/plastic-postcard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$PlasticPostcard,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
