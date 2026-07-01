import React, { useState, useCallback } from 'react';

type ShopifyOption = {
  name: string;
  values: string[];
};

type ShopifyVariant = {
  id: string;
  title: string;
  sku: string;
  availableForSale: boolean;
  price: { amount: string; currencyCode: string };
  selectedOptions: { name: string; value: string }[];
};

type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
};

type Product = {
  title: string;
  handle: string;
  descriptionHtml: string;
  images: ShopifyImage[];
  options: ShopifyOption[];
  variants: ShopifyVariant[];
};

type ProductSelectorProps = {
  product: Product;
  placeholderSrc?: string | null;
};

function formatPrice(amount: string, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(parseFloat(amount));
}

function findVariant(
  variants: ShopifyVariant[],
  selections: Record<string, string>
): ShopifyVariant | null {
  if (Object.values(selections).some(v => !v)) return null;
  return (
    variants.find(v =>
      v.selectedOptions.every(opt => selections[opt.name] === opt.value)
    ) ?? null
  );
}

function getAvailableValues(
  variants: ShopifyVariant[],
  options: { name: string }[],
  selections: Record<string, string>,
  optionIndex: number
): string[] {
  const priorOptions = options.slice(0, optionIndex);
  const filtered = variants.filter(v =>
    priorOptions.every(prior => {
      const sel = selections[prior.name];
      return sel && v.selectedOptions.some(o => o.name === prior.name && o.value === sel);
    }) && v.availableForSale
  );
  const currentName = options[optionIndex].name;
  const seen = new Set<string>();
  const result: string[] = [];
  for (const v of filtered) {
    const opt = v.selectedOptions.find(o => o.name === currentName);
    if (opt && !seen.has(opt.value)) {
      seen.add(opt.value);
      result.push(opt.value);
    }
  }
  return result;
}

export default function ProductSelector({ product, placeholderSrc }: ProductSelectorProps) {
  const blank: Record<string, string> = {};
  product.options.forEach(opt => { blank[opt.name] = ''; });

  const [selections, setSelections] = useState<Record<string, string>>(blank);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const matched = findVariant(product.variants, selections);
  const allSelected = product.options.every(opt => !!selections[opt.name]);
  const available = matched?.availableForSale ?? false;
  const canBuy = allSelected && available;

  const handleSelect = (name: string, value: string) => {
    const idx = product.options.findIndex(o => o.name === name);
    setSelections(prev => {
      const next = { ...prev, [name]: value };
      product.options.slice(idx + 1).forEach(o => { next[o.name] = ''; });
      return next;
    });
    setError('');
  };

  const handleAddToCart = useCallback(async () => {
    if (!matched || !canBuy) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/shop/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variantId: matched.id }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error ?? 'Something went wrong. Please try again.');
        return;
      }
      try {
        localStorage.setItem(
          'crst_cart',
          JSON.stringify({ checkoutUrl: data.checkoutUrl, count: 1 })
        );
        window.dispatchEvent(new Event('crst_cart_updated'));
      } catch {}
      window.location.href = data.checkoutUrl;
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [matched, canBuy]);

  const firstImage = product.images[0];

  return (
    <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
      <div className="bg-white rounded-2xl border border-navy-100 overflow-hidden shadow-sm">
        {firstImage ? (
          <img
            src={firstImage.url}
            alt={firstImage.altText ?? product.title}
            width={firstImage.width}
            height={firstImage.height}
            className="w-full h-auto object-cover"
          />
        ) : placeholderSrc ? (
          <img
            src={placeholderSrc}
            alt={product.title}
            className="w-full h-auto object-cover"
          />
        ) : (
          <div className="aspect-square bg-navy-50 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-navy-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display text-crst-primary leading-tight">
            {product.title}
          </h1>
          {product.descriptionHtml && (
            <div
              className="mt-3 text-navy-600/80 text-sm leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          )}
        </div>

        <div className="space-y-4">
          {product.options.map((opt, idx) => {
            const prevName = idx > 0 ? product.options[idx - 1].name : null;
            const upstreamMissing = idx > 0 && !selections[product.options[idx - 1].name];
            const availableValues = upstreamMissing
              ? []
              : getAvailableValues(product.variants, product.options, selections, idx);
            return (
              <div key={opt.name}>
                <label className="block text-sm font-heading font-semibold text-navy-700 mb-1.5">
                  {opt.name}
                </label>
                <select
                  value={selections[opt.name]}
                  onChange={e => handleSelect(opt.name, e.target.value)}
                  disabled={upstreamMissing}
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm font-heading bg-white focus:outline-none focus:ring-2 focus:ring-crst-accent focus:border-transparent transition-colors ${
                    upstreamMissing
                      ? 'border-navy-100 text-navy-300 cursor-not-allowed'
                      : 'border-navy-200 text-navy-700'
                  }`}
                >
                  <option value="">
                    {upstreamMissing
                      ? `Select ${prevName} first`
                      : `— Select ${opt.name} —`}
                  </option>
                  {availableValues.map(val => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>

        <div className="bg-navy-50 rounded-xl px-4 py-4 border border-navy-100">
          {matched ? (
            <div>
              <p className="text-xs font-heading font-medium text-navy-500 uppercase tracking-wide mb-1">
                Total Order Price
              </p>
              <p className="text-3xl font-display text-crst-primary">
                {formatPrice(matched.price.amount, matched.price.currencyCode)}
              </p>
              {matched.sku && (
                <p className="text-xs text-navy-400 mt-1.5 font-mono">
                  SKU: {matched.sku}
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-navy-500 font-heading">
              {allSelected
                ? 'This combination is unavailable.'
                : 'Select all options to see pricing.'}
            </p>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-600 font-heading" role="alert">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!canBuy || loading}
          className={`w-full py-3.5 px-6 rounded-xl font-heading font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            canBuy && !loading
              ? 'bg-crst-primary text-white hover:bg-navy-700 shadow-md hover:shadow-lg'
              : 'bg-navy-100 text-navy-400 cursor-not-allowed'
          }`}
        >
          {loading ? (
            <>
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Processing…
            </>
          ) : !allSelected ? (
            'Select All Options'
          ) : !available ? (
            'Unavailable'
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                />
              </svg>
              Proceed to Checkout
            </>
          )}
        </button>

        <p className="text-xs text-navy-400 font-heading text-center">
          Secure checkout · Powered by Shopify
        </p>
      </div>
    </div>
  );
}
