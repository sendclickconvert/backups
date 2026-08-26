// src/data/products.ts
// Shop product metadata that is NOT part of the Shopify catalog itself:
// parent service page, related guides, and Google Merchant feed taxonomy.
// This is merchandising/cross-linking data, not product specs — safe to
// curate here without touching src/content/products/*.md.

export interface ProductMeta {
  handle: string;
  /** Service page this product belongs to (used for the product → service back-link). */
  parentService: { label: string; href: string };
  /** At least one relevant guide/resource page (used for the product → guide back-link). */
  guides: { label: string; href: string }[];
  /** Google Merchant Center taxonomy (best-effort classification, not a fabricated spec). */
  googleProductCategory: string;
  productType: string;
}

export const PRODUCT_META: Record<string, ProductMeta> = {
  'plastic-postcard': {
    handle: 'plastic-postcard',
    parentService: { label: 'Direct Mail Campaigns', href: '/services/direct-mail' },
    guides: [{ label: 'USPS Postage Rates', href: '/direct-mail-tools/postage-rates' }],
    googleProductCategory: 'Business & Industrial > Advertising & Marketing',
    productType: 'Direct Mail > Postcards > Plastic Postcards',
  },
  'magnet-postcard': {
    handle: 'magnet-postcard',
    parentService: { label: 'Direct Mail Campaigns', href: '/services/direct-mail' },
    guides: [{ label: 'USPS Postage Rates', href: '/direct-mail-tools/postage-rates' }],
    googleProductCategory: 'Business & Industrial > Advertising & Marketing',
    productType: 'Direct Mail > Postcards > Magnet Postcards',
  },
  'scratchoff-postcard': {
    handle: 'scratchoff-postcard',
    parentService: { label: 'Direct Mail Campaigns', href: '/services/direct-mail' },
    guides: [{ label: 'USPS Postage Rates', href: '/direct-mail-tools/postage-rates' }],
    googleProductCategory: 'Business & Industrial > Advertising & Marketing',
    productType: 'Direct Mail > Postcards > Scratch-Off Postcards',
  },
  'lawn-sign': {
    handle: 'lawn-sign',
    parentService: { label: 'Printing Services', href: '/services/printing' },
    guides: [{ label: 'USPS Direct Mailer Templates', href: '/usps-direct-mailer-templates' }],
    googleProductCategory: 'Business & Industrial > Signage',
    productType: 'Signage > Lawn Signs',
  },
  'palm-card': {
    handle: 'palm-card',
    parentService: { label: 'Printing Services', href: '/services/printing' },
    guides: [{ label: 'Palm Card Sizes Guide', href: '/guides/palm-card-sizes' }],
    googleProductCategory: 'Business & Industrial > Advertising & Marketing',
    productType: 'Political & Campaign > Palm Cards',
  },
  'eddm-card': {
    handle: 'eddm-card',
    parentService: { label: 'EDDM', href: '/services/eddm' },
    guides: [{ label: 'USPS Postage Rates', href: '/direct-mail-tools/postage-rates' }],
    googleProductCategory: 'Business & Industrial > Advertising & Marketing',
    productType: 'Direct Mail > EDDM Cards',
  },
  'envelope': {
    handle: 'envelope',
    parentService: { label: 'Printing Services', href: '/services/printing' },
    guides: [{ label: 'Envelope Sizes Guide', href: '/guides/envelope-sizes' }],
    googleProductCategory: 'Business & Industrial > Office Supplies > General Office Supplies > Envelopes',
    productType: 'Printing > Envelopes',
  },
  'brochure': {
    handle: 'brochure',
    parentService: { label: 'Printing Services', href: '/services/printing' },
    guides: [{ label: 'USPS Direct Mailer Templates', href: '/usps-direct-mailer-templates' }],
    googleProductCategory: 'Business & Industrial > Advertising & Marketing',
    productType: 'Printing > Brochures',
  },
  'up-palm-card': {
    handle: 'up-palm-card',
    parentService: { label: 'Union Printing', href: '/services/union-printing' },
    guides: [{ label: 'Union Bug Printing Guide', href: '/guides/union-bug-printing' }],
    googleProductCategory: 'Business & Industrial > Advertising & Marketing',
    productType: 'Political & Campaign > Union-Printed Palm Cards',
  },
  'up-envelope': {
    handle: 'up-envelope',
    parentService: { label: 'Union Printing', href: '/services/union-printing' },
    guides: [
      { label: 'Union Bug Printing Guide', href: '/guides/union-bug-printing' },
      { label: 'Envelope Sizes Guide', href: '/guides/envelope-sizes' },
    ],
    googleProductCategory: 'Business & Industrial > Office Supplies > General Office Supplies > Envelopes',
    productType: 'Political & Campaign > Union-Printed Envelopes',
  },
  'up-postcard': {
    handle: 'up-postcard',
    parentService: { label: 'Union Printing', href: '/services/union-printing' },
    guides: [{ label: 'Union Bug Printing Guide', href: '/guides/union-bug-printing' }],
    googleProductCategory: 'Business & Industrial > Advertising & Marketing',
    productType: 'Political & Campaign > Union-Printed Postcards',
  },
  'up-letter': {
    handle: 'up-letter',
    parentService: { label: 'Union Printing', href: '/services/union-printing' },
    guides: [{ label: 'Union Bug Printing Guide', href: '/guides/union-bug-printing' }],
    googleProductCategory: 'Business & Industrial > Advertising & Marketing',
    productType: 'Political & Campaign > Union-Printed Letters',
  },
  'greeting-card': {
    handle: 'greeting-card',
    parentService: { label: 'Printing Services', href: '/services/printing' },
    guides: [{ label: 'Envelope Sizes Guide', href: '/guides/envelope-sizes' }],
    googleProductCategory: 'Occasions & Gifts > Cards & Invitations > Greeting Cards',
    productType: 'Printing > Greeting Cards',
  },
  'car-magnet': {
    handle: 'car-magnet',
    parentService: { label: 'Printing Services', href: '/services/printing' },
    guides: [{ label: 'USPS Direct Mailer Templates', href: '/usps-direct-mailer-templates' }],
    googleProductCategory: 'Vehicles & Parts > Vehicle Parts & Accessories > Motor Vehicle Exterior Accessories',
    productType: 'Signage > Car Magnets',
  },
  'banner': {
    handle: 'banner',
    parentService: { label: 'Printing Services', href: '/services/printing' },
    guides: [{ label: 'USPS Direct Mailer Templates', href: '/usps-direct-mailer-templates' }],
    googleProductCategory: 'Business & Industrial > Signage',
    productType: 'Signage > Banners',
  },
  'postcard': {
    handle: 'postcard',
    parentService: { label: 'Printing Services', href: '/services/printing' },
    guides: [{ label: 'USPS Direct Mailer Templates', href: '/usps-direct-mailer-templates' }],
    googleProductCategory: 'Business & Industrial > Advertising & Marketing',
    productType: 'Direct Mail > Postcards',
  },
  'raffle-ticket': {
    handle: 'raffle-ticket',
    parentService: { label: 'Printing Services', href: '/services/printing' },
    guides: [{ label: 'Complete Friendraising Guide', href: '/resources/complete-friendraising-guide' }],
    googleProductCategory: 'Business & Industrial > Advertising & Marketing',
    productType: 'Printing > Raffle Tickets',
  },
  'presentation-folder': {
    handle: 'presentation-folder',
    parentService: { label: 'Printing Services', href: '/services/printing' },
    guides: [{ label: 'Envelope Sizes Guide', href: '/guides/envelope-sizes' }],
    googleProductCategory: 'Business & Industrial > Office Supplies > Presentation Supplies > Business Folders',
    productType: 'Printing > Presentation Folders',
  },
  'certified-mailing-package': {
    handle: 'certified-mailing-package',
    parentService: { label: 'Mailing Services', href: '/services/mailing' },
    guides: [{ label: 'USPS Postage Rates', href: '/direct-mail-tools/postage-rates' }],
    googleProductCategory: 'Business & Industrial > Advertising & Marketing',
    productType: 'Mailing Services > Certified Mail',
  },
  'simple-mail-package': {
    handle: 'simple-mail-package',
    parentService: { label: 'Mailing Services', href: '/services/mailing' },
    guides: [{ label: 'USPS Postage Rates', href: '/direct-mail-tools/postage-rates' }],
    googleProductCategory: 'Business & Industrial > Advertising & Marketing',
    productType: 'Mailing Services > Simple Mail Packages',
  },
};

/** Gates schema.org shippingDetails / hasMerchantReturnPolicy on product Offers.
 *  Default FALSE — flip to true only once real shipping rates and a return
 *  policy are supplied; until then the values are TODO_SPEC and must not ship. */
export const SHOP_SCHEMA_CONFIG = {
  includeShippingAndReturns: false,
};
