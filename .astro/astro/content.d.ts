declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"data-articles": {
"how-often-to-update-your-mailing-list.md": {
	id: "how-often-to-update-your-mailing-list.md";
  slug: "how-often-to-update-your-mailing-list";
  body: string;
  collection: "data-articles";
  data: any
} & { render(): Render[".md"] };
"how-to-clean-a-mailing-list.md": {
	id: "how-to-clean-a-mailing-list.md";
  slug: "how-to-clean-a-mailing-list";
  body: string;
  collection: "data-articles";
  data: any
} & { render(): Render[".md"] };
"mailing-list-accuracy.md": {
	id: "mailing-list-accuracy.md";
  slug: "mailing-list-accuracy";
  body: string;
  collection: "data-articles";
  data: any
} & { render(): Render[".md"] };
"mailing-list-selects.md": {
	id: "mailing-list-selects.md";
  slug: "mailing-list-selects";
  body: string;
  collection: "data-articles";
  data: any
} & { render(): Render[".md"] };
"saturation-vs-targeted-mailing-lists.md": {
	id: "saturation-vs-targeted-mailing-lists.md";
  slug: "saturation-vs-targeted-mailing-lists";
  body: string;
  collection: "data-articles";
  data: any
} & { render(): Render[".md"] };
"voter-file-mailing-lists.md": {
	id: "voter-file-mailing-lists.md";
  slug: "voter-file-mailing-lists";
  body: string;
  collection: "data-articles";
  data: any
} & { render(): Render[".md"] };
"what-is-ncoa-processing.md": {
	id: "what-is-ncoa-processing.md";
  slug: "what-is-ncoa-processing";
  body: string;
  collection: "data-articles";
  data: any
} & { render(): Render[".md"] };
};
"dm-articles": {
"direct-mail-for-real-estate-agents-hudson-valley.md": {
	id: "direct-mail-for-real-estate-agents-hudson-valley.md";
  slug: "direct-mail-for-real-estate-agents-hudson-valley";
  body: string;
  collection: "dm-articles";
  data: any
} & { render(): Render[".md"] };
"direct-mail-response-rates.md": {
	id: "direct-mail-response-rates.md";
  slug: "direct-mail-response-rates";
  body: string;
  collection: "dm-articles";
  data: any
} & { render(): Render[".md"] };
"direct-mail-roi.md": {
	id: "direct-mail-roi.md";
  slug: "direct-mail-roi";
  body: string;
  collection: "dm-articles";
  data: any
} & { render(): Render[".md"] };
"direct-mail-vs-digital-marketing.md": {
	id: "direct-mail-vs-digital-marketing.md";
  slug: "direct-mail-vs-digital-marketing";
  body: string;
  collection: "dm-articles";
  data: any
} & { render(): Render[".md"] };
"eddm-every-door-direct-mail.md": {
	id: "eddm-every-door-direct-mail.md";
  slug: "eddm-every-door-direct-mail";
  body: string;
  collection: "dm-articles";
  data: any
} & { render(): Render[".md"] };
"eddm-vs-targeted-direct-mail.md": {
	id: "eddm-vs-targeted-direct-mail.md";
  slug: "eddm-vs-targeted-direct-mail";
  body: string;
  collection: "dm-articles";
  data: any
} & { render(): Render[".md"] };
"how-long-does-direct-mail-take.md": {
	id: "how-long-does-direct-mail-take.md";
  slug: "how-long-does-direct-mail-take";
  body: string;
  collection: "dm-articles";
  data: any
} & { render(): Render[".md"] };
"how-much-does-direct-mail-cost.md": {
	id: "how-much-does-direct-mail-cost.md";
  slug: "how-much-does-direct-mail-cost";
  body: string;
  collection: "dm-articles";
  data: any
} & { render(): Render[".md"] };
"how-to-build-a-mailing-list-for-direct-mail.md": {
	id: "how-to-build-a-mailing-list-for-direct-mail.md";
  slug: "how-to-build-a-mailing-list-for-direct-mail";
  body: string;
  collection: "dm-articles";
  data: any
} & { render(): Render[".md"] };
"postcard-marketing.md": {
	id: "postcard-marketing.md";
  slug: "postcard-marketing";
  body: string;
  collection: "dm-articles";
  data: any
} & { render(): Render[".md"] };
"postcard-vs-letter-direct-mail.md": {
	id: "postcard-vs-letter-direct-mail.md";
  slug: "postcard-vs-letter-direct-mail";
  body: string;
  collection: "dm-articles";
  data: any
} & { render(): Render[".md"] };
"usps-informed-delivery-direct-mail-campaign.md": {
	id: "usps-informed-delivery-direct-mail-campaign.md";
  slug: "usps-informed-delivery-direct-mail-campaign";
  body: string;
  collection: "dm-articles";
  data: any
} & { render(): Render[".md"] };
};
"eddm-articles": {
"eddm-postcard-sizes-and-specs.md": {
	id: "eddm-postcard-sizes-and-specs.md";
  slug: "eddm-postcard-sizes-and-specs";
  body: string;
  collection: "eddm-articles";
  data: any
} & { render(): Render[".md"] };
"eddm-printing-requirements.md": {
	id: "eddm-printing-requirements.md";
  slug: "eddm-printing-requirements";
  body: string;
  collection: "eddm-articles";
  data: any
} & { render(): Render[".md"] };
"eddm-retail-vs-eddm-bmeu.md": {
	id: "eddm-retail-vs-eddm-bmeu.md";
  slug: "eddm-retail-vs-eddm-bmeu";
  body: string;
  collection: "eddm-articles";
  data: any
} & { render(): Render[".md"] };
"how-much-does-eddm-cost.md": {
	id: "how-much-does-eddm-cost.md";
  slug: "how-much-does-eddm-cost";
  body: string;
  collection: "eddm-articles";
  data: any
} & { render(): Render[".md"] };
"how-to-set-up-an-eddm-campaign.md": {
	id: "how-to-set-up-an-eddm-campaign.md";
  slug: "how-to-set-up-an-eddm-campaign";
  body: string;
  collection: "eddm-articles";
  data: any
} & { render(): Render[".md"] };
"what-is-every-door-direct-mail.md": {
	id: "what-is-every-door-direct-mail.md";
  slug: "what-is-every-door-direct-mail";
  body: string;
  collection: "eddm-articles";
  data: any
} & { render(): Render[".md"] };
};
"graphic-design-articles": {
"brochure-design-for-direct-mail.md": {
	id: "brochure-design-for-direct-mail.md";
  slug: "brochure-design-for-direct-mail";
  body: string;
  collection: "graphic-design-articles";
  data: any
} & { render(): Render[".md"] };
"direct-mail-call-to-action-guide.md": {
	id: "direct-mail-call-to-action-guide.md";
  slug: "direct-mail-call-to-action-guide";
  body: string;
  collection: "graphic-design-articles";
  data: any
} & { render(): Render[".md"] };
"direct-mail-design-best-practices.md": {
	id: "direct-mail-design-best-practices.md";
  slug: "direct-mail-design-best-practices";
  body: string;
  collection: "graphic-design-articles";
  data: any
} & { render(): Render[".md"] };
"eddm-design-requirements-and-specs.md": {
	id: "eddm-design-requirements-and-specs.md";
  slug: "eddm-design-requirements-and-specs";
  body: string;
  collection: "graphic-design-articles";
  data: any
} & { render(): Render[".md"] };
"how-to-design-a-direct-mail-postcard.md": {
	id: "how-to-design-a-direct-mail-postcard.md";
  slug: "how-to-design-a-direct-mail-postcard";
  body: string;
  collection: "graphic-design-articles";
  data: any
} & { render(): Render[".md"] };
};
"mailing-articles": {
"bulk-mailing-vs-first-class.md": {
	id: "bulk-mailing-vs-first-class.md";
  slug: "bulk-mailing-vs-first-class";
  body: string;
  collection: "mailing-articles";
  data: any
} & { render(): Render[".md"] };
"diy-vs-mail-house-direct-mail.md": {
	id: "diy-vs-mail-house-direct-mail.md";
  slug: "diy-vs-mail-house-direct-mail";
  body: string;
  collection: "mailing-articles";
  data: any
} & { render(): Render[".md"] };
"inkjet-addressing-for-direct-mail.md": {
	id: "inkjet-addressing-for-direct-mail.md";
  slug: "inkjet-addressing-for-direct-mail";
  body: string;
  collection: "mailing-articles";
  data: any
} & { render(): Render[".md"] };
"presort-mail-discount-guide.md": {
	id: "presort-mail-discount-guide.md";
  slug: "presort-mail-discount-guide";
  body: string;
  collection: "mailing-articles";
  data: any
} & { render(): Render[".md"] };
"what-is-a-lettershop.md": {
	id: "what-is-a-lettershop.md";
  slug: "what-is-a-lettershop";
  body: string;
  collection: "mailing-articles";
  data: any
} & { render(): Render[".md"] };
};
"nonprofit-articles": {
"annual-fund-direct-mail-strategy.md": {
	id: "annual-fund-direct-mail-strategy.md";
  slug: "annual-fund-direct-mail-strategy";
  body: string;
  collection: "nonprofit-articles";
  data: any
} & { render(): Render[".md"] };
"eddm-vs-targeted-mail-for-nonprofits.md": {
	id: "eddm-vs-targeted-mail-for-nonprofits.md";
  slug: "eddm-vs-targeted-mail-for-nonprofits";
  body: string;
  collection: "nonprofit-articles";
  data: any
} & { render(): Render[".md"] };
"how-to-qualify-for-nonprofit-bulk-mail.md": {
	id: "how-to-qualify-for-nonprofit-bulk-mail.md";
  slug: "how-to-qualify-for-nonprofit-bulk-mail";
  body: string;
  collection: "nonprofit-articles";
  data: any
} & { render(): Render[".md"] };
"nonprofit-donor-acquisition-by-mail.md": {
	id: "nonprofit-donor-acquisition-by-mail.md";
  slug: "nonprofit-donor-acquisition-by-mail";
  body: string;
  collection: "nonprofit-articles";
  data: any
} & { render(): Render[".md"] };
"nonprofit-postage-rates.md": {
	id: "nonprofit-postage-rates.md";
  slug: "nonprofit-postage-rates";
  body: string;
  collection: "nonprofit-articles";
  data: any
} & { render(): Render[".md"] };
"writing-nonprofit-fundraising-letters.md": {
	id: "writing-nonprofit-fundraising-letters.md";
  slug: "writing-nonprofit-fundraising-letters";
  body: string;
  collection: "nonprofit-articles";
  data: any
} & { render(): Render[".md"] };
};
"printing-articles": {
"brochure-printing-guide.md": {
	id: "brochure-printing-guide.md";
  slug: "brochure-printing-guide";
  body: string;
  collection: "printing-articles";
  data: any
} & { render(): Render[".md"] };
"commercial-printing-vs-online-printing.md": {
	id: "commercial-printing-vs-online-printing.md";
  slug: "commercial-printing-vs-online-printing";
  body: string;
  collection: "printing-articles";
  data: any
} & { render(): Render[".md"] };
"direct-mail-paper-stock-guide.md": {
	id: "direct-mail-paper-stock-guide.md";
  slug: "direct-mail-paper-stock-guide";
  body: string;
  collection: "printing-articles";
  data: any
} & { render(): Render[".md"] };
"flyer-printing-for-small-business.md": {
	id: "flyer-printing-for-small-business.md";
  slug: "flyer-printing-for-small-business";
  body: string;
  collection: "printing-articles";
  data: any
} & { render(): Render[".md"] };
"how-to-prepare-print-ready-files.md": {
	id: "how-to-prepare-print-ready-files.md";
  slug: "how-to-prepare-print-ready-files";
  body: string;
  collection: "printing-articles";
  data: any
} & { render(): Render[".md"] };
"postcard-printing-for-direct-mail.md": {
	id: "postcard-printing-for-direct-mail.md";
  slug: "postcard-printing-for-direct-mail";
  body: string;
  collection: "printing-articles";
  data: any
} & { render(): Render[".md"] };
};
"products": {
"banner.md": {
	id: "banner.md";
  slug: "banner";
  body: string;
  collection: "products";
  data: any
} & { render(): Render[".md"] };
"brochure.md": {
	id: "brochure.md";
  slug: "brochure";
  body: string;
  collection: "products";
  data: any
} & { render(): Render[".md"] };
"car-magnet.md": {
	id: "car-magnet.md";
  slug: "car-magnet";
  body: string;
  collection: "products";
  data: any
} & { render(): Render[".md"] };
"certified-mailing-package.md": {
	id: "certified-mailing-package.md";
  slug: "certified-mailing-package";
  body: string;
  collection: "products";
  data: any
} & { render(): Render[".md"] };
"eddm-card.md": {
	id: "eddm-card.md";
  slug: "eddm-card";
  body: string;
  collection: "products";
  data: any
} & { render(): Render[".md"] };
"envelope.md": {
	id: "envelope.md";
  slug: "envelope";
  body: string;
  collection: "products";
  data: any
} & { render(): Render[".md"] };
"greeting-card.md": {
	id: "greeting-card.md";
  slug: "greeting-card";
  body: string;
  collection: "products";
  data: any
} & { render(): Render[".md"] };
"lawn-sign.md": {
	id: "lawn-sign.md";
  slug: "lawn-sign";
  body: string;
  collection: "products";
  data: any
} & { render(): Render[".md"] };
"magnet-postcard.md": {
	id: "magnet-postcard.md";
  slug: "magnet-postcard";
  body: string;
  collection: "products";
  data: any
} & { render(): Render[".md"] };
"palm-card.md": {
	id: "palm-card.md";
  slug: "palm-card";
  body: string;
  collection: "products";
  data: any
} & { render(): Render[".md"] };
"plastic-postcard.md": {
	id: "plastic-postcard.md";
  slug: "plastic-postcard";
  body: string;
  collection: "products";
  data: any
} & { render(): Render[".md"] };
"postcard.md": {
	id: "postcard.md";
  slug: "postcard";
  body: string;
  collection: "products";
  data: any
} & { render(): Render[".md"] };
"presentation-folder.md": {
	id: "presentation-folder.md";
  slug: "presentation-folder";
  body: string;
  collection: "products";
  data: any
} & { render(): Render[".md"] };
"raffle-ticket.md": {
	id: "raffle-ticket.md";
  slug: "raffle-ticket";
  body: string;
  collection: "products";
  data: any
} & { render(): Render[".md"] };
"scratchoff-postcard.md": {
	id: "scratchoff-postcard.md";
  slug: "scratchoff-postcard";
  body: string;
  collection: "products";
  data: any
} & { render(): Render[".md"] };
"simple-mail-package.md": {
	id: "simple-mail-package.md";
  slug: "simple-mail-package";
  body: string;
  collection: "products";
  data: any
} & { render(): Render[".md"] };
"up-envelope.md": {
	id: "up-envelope.md";
  slug: "up-envelope";
  body: string;
  collection: "products";
  data: any
} & { render(): Render[".md"] };
"up-letter.md": {
	id: "up-letter.md";
  slug: "up-letter";
  body: string;
  collection: "products";
  data: any
} & { render(): Render[".md"] };
"up-palm-card.md": {
	id: "up-palm-card.md";
  slug: "up-palm-card";
  body: string;
  collection: "products";
  data: any
} & { render(): Render[".md"] };
"up-postcard.md": {
	id: "up-postcard.md";
  slug: "up-postcard";
  body: string;
  collection: "products";
  data: any
} & { render(): Render[".md"] };
};
"school-articles": {
"how-to-reach-voters-for-school-elections.md": {
	id: "how-to-reach-voters-for-school-elections.md";
  slug: "how-to-reach-voters-for-school-elections";
  body: string;
  collection: "school-articles";
  data: any
} & { render(): Render[".md"] };
"school-budget-vote-direct-mail-guide.md": {
	id: "school-budget-vote-direct-mail-guide.md";
  slug: "school-budget-vote-direct-mail-guide";
  body: string;
  collection: "school-articles";
  data: any
} & { render(): Render[".md"] };
"school-district-mailing-list-guide.md": {
	id: "school-district-mailing-list-guide.md";
  slug: "school-district-mailing-list-guide";
  body: string;
  collection: "school-articles";
  data: any
} & { render(): Render[".md"] };
};
"union-articles": {
"union-printing-for-political-campaigns.md": {
	id: "union-printing-for-political-campaigns.md";
  slug: "union-printing-for-political-campaigns";
  body: string;
  collection: "union-articles";
  data: any
} & { render(): Render[".md"] };
"what-is-the-union-bug.md": {
	id: "what-is-the-union-bug.md";
  slug: "what-is-the-union-bug";
  body: string;
  collection: "union-articles";
  data: any
} & { render(): Render[".md"] };
"why-choose-a-union-print-shop.md": {
	id: "why-choose-a-union-print-shop.md";
  slug: "why-choose-a-union-print-shop";
  body: string;
  collection: "union-articles";
  data: any
} & { render(): Render[".md"] };
};
"web-design-articles": {
"local-web-designer-vs-national-agency.md": {
	id: "local-web-designer-vs-national-agency.md";
  slug: "local-web-designer-vs-national-agency";
  body: string;
  collection: "web-design-articles";
  data: any
} & { render(): Render[".md"] };
"small-business-website-cost-guide.md": {
	id: "small-business-website-cost-guide.md";
  slug: "small-business-website-cost-guide";
  body: string;
  collection: "web-design-articles";
  data: any
} & { render(): Render[".md"] };
"website-design-for-hudson-valley-businesses.md": {
	id: "website-design-for-hudson-valley-businesses.md";
  slug: "website-design-for-hudson-valley-businesses";
  body: string;
  collection: "web-design-articles";
  data: any
} & { render(): Render[".md"] };
"what-to-expect-from-web-design-project.md": {
	id: "what-to-expect-from-web-design-project.md";
  slug: "what-to-expect-from-web-design-project";
  body: string;
  collection: "web-design-articles";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
