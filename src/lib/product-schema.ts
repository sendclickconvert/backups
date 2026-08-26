// src/lib/product-schema.ts
// Builds Product + Offer + BreadcrumbList + FAQPage JSON-LD for a single
// /shop/[handle] product page. Deliberately excludes AggregateRating/Review
// (no real review data exists) and LocalBusiness (that belongs on
// service/location pages, not product pages).

import { BUSINESS } from '../data/site';
import { SHOP_SCHEMA_CONFIG, type ProductMeta } from '../data/products';
import { isPlaceholder, hasRealFaqs } from './product-content';

export interface SchemaProductData {
  title: string;
  handle: string;
  images: { url: string }[];
  variants: {
    sku: string;
    availableForSale: boolean;
    price: { amount: string; currencyCode: string };
  }[];
}

export interface SchemaProductContent {
  intro: string;
  faqs: { q: string; a: string }[];
}

function lowestPriceVariant(variants: SchemaProductData['variants']) {
  return variants.reduce((lowest, v) => {
    if (!lowest) return v;
    return parseFloat(v.price.amount) < parseFloat(lowest.price.amount) ? v : lowest;
  }, null as SchemaProductData['variants'][number] | null);
}

/** ISO date ~90 days out — a technical validity window for the Offer, not a business fact. */
function priceValidUntil(): string {
  const d = new Date();
  d.setDate(d.getDate() + 90);
  return d.toISOString().slice(0, 10);
}

export function buildProductGraph(
  product: SchemaProductData,
  content: SchemaProductContent,
  meta: ProductMeta,
  canonicalUrl: string
): object[] {
  const cheapest = lowestPriceVariant(product.variants);
  const inStock = product.variants.some((v) => v.availableForSale);
  const image = product.images[0]?.url;

  const offer: Record<string, unknown> = {
    '@type': 'Offer',
    url: canonicalUrl,
    priceCurrency: cheapest?.price.currencyCode ?? 'USD',
    price: cheapest?.price.amount ?? undefined,
    availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    itemCondition: 'https://schema.org/NewCondition',
    priceValidUntil: priceValidUntil(),
    seller: {
      '@type': 'Organization',
      name: BUSINESS.name,
      url: BUSINESS.url,
    },
  };

  if (SHOP_SCHEMA_CONFIG.includeShippingAndReturns) {
    offer.shippingDetails = {
      '@type': 'OfferShippingDetails',
      shippingRate: { '@type': 'MonetaryAmount', value: 'TODO_SPEC', currency: 'TODO_SPEC' },
      shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'TODO_SPEC' },
      deliveryTime: {
        '@type': 'ShippingDeliveryTime',
        handlingTime: {
          '@type': 'QuantitativeValue',
          minValue: 'TODO_SPEC',
          maxValue: 'TODO_SPEC',
          unitCode: 'DAY',
        },
        transitTime: {
          '@type': 'QuantitativeValue',
          minValue: 'TODO_SPEC',
          maxValue: 'TODO_SPEC',
          unitCode: 'DAY',
        },
      },
    };
    offer.hasMerchantReturnPolicy = {
      '@type': 'MerchantReturnPolicy',
      returnPolicyCategory: 'TODO_SPEC',
      merchantReturnDays: 'TODO_SPEC',
      returnMethod: 'TODO_SPEC',
      returnFees: 'TODO_SPEC',
    };
  }

  const productSchema: Record<string, unknown> = {
    '@type': 'Product',
    name: product.title,
    url: canonicalUrl,
    brand: { '@type': 'Brand', name: BUSINESS.name },
    offers: offer,
  };
  // Never emit the literal TODO_SPEC placeholder into schema — omit the
  // description field entirely rather than shipping placeholder text to
  // search engines / rich results.
  if (!isPlaceholder(content.intro)) productSchema.description = content.intro;
  if (image) productSchema.image = image;
  if (cheapest?.sku) productSchema.sku = cheapest.sku;

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BUSINESS.url },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: `${BUSINESS.url}/shop` },
      { '@type': 'ListItem', position: 3, name: product.title, item: canonicalUrl },
    ],
  };

  const graph: object[] = [productSchema, breadcrumb];

  // Drop FAQPage entirely when there are no real (non-placeholder) FAQs —
  // an FAQPage with only a TODO_SPEC question/answer is worse than no
  // FAQPage at all.
  if (hasRealFaqs(content)) {
    const realFaqs = content.faqs.filter((f) => !isPlaceholder(f.q) && !isPlaceholder(f.a));
    graph.push({
      '@type': 'FAQPage',
      mainEntity: realFaqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  return graph;
}
