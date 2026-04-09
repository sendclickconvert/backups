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
  data: InferEntrySchema<"data-articles">
} & { render(): Render[".md"] };
"how-to-clean-a-mailing-list.md": {
	id: "how-to-clean-a-mailing-list.md";
  slug: "how-to-clean-a-mailing-list";
  body: string;
  collection: "data-articles";
  data: InferEntrySchema<"data-articles">
} & { render(): Render[".md"] };
"mailing-list-accuracy.md": {
	id: "mailing-list-accuracy.md";
  slug: "mailing-list-accuracy";
  body: string;
  collection: "data-articles";
  data: InferEntrySchema<"data-articles">
} & { render(): Render[".md"] };
"mailing-list-selects.md": {
	id: "mailing-list-selects.md";
  slug: "mailing-list-selects";
  body: string;
  collection: "data-articles";
  data: InferEntrySchema<"data-articles">
} & { render(): Render[".md"] };
"saturation-vs-targeted-mailing-lists.md": {
	id: "saturation-vs-targeted-mailing-lists.md";
  slug: "saturation-vs-targeted-mailing-lists";
  body: string;
  collection: "data-articles";
  data: InferEntrySchema<"data-articles">
} & { render(): Render[".md"] };
"voter-file-mailing-lists.md": {
	id: "voter-file-mailing-lists.md";
  slug: "voter-file-mailing-lists";
  body: string;
  collection: "data-articles";
  data: InferEntrySchema<"data-articles">
} & { render(): Render[".md"] };
"what-is-ncoa-processing.md": {
	id: "what-is-ncoa-processing.md";
  slug: "what-is-ncoa-processing";
  body: string;
  collection: "data-articles";
  data: InferEntrySchema<"data-articles">
} & { render(): Render[".md"] };
};
"dm-articles": {
"direct-mail-for-real-estate-agents-hudson-valley.md": {
	id: "direct-mail-for-real-estate-agents-hudson-valley.md";
  slug: "direct-mail-for-real-estate-agents-hudson-valley";
  body: string;
  collection: "dm-articles";
  data: InferEntrySchema<"dm-articles">
} & { render(): Render[".md"] };
"direct-mail-response-rates.md": {
	id: "direct-mail-response-rates.md";
  slug: "direct-mail-response-rates";
  body: string;
  collection: "dm-articles";
  data: InferEntrySchema<"dm-articles">
} & { render(): Render[".md"] };
"direct-mail-roi.md": {
	id: "direct-mail-roi.md";
  slug: "direct-mail-roi";
  body: string;
  collection: "dm-articles";
  data: InferEntrySchema<"dm-articles">
} & { render(): Render[".md"] };
"direct-mail-vs-digital-marketing.md": {
	id: "direct-mail-vs-digital-marketing.md";
  slug: "direct-mail-vs-digital-marketing";
  body: string;
  collection: "dm-articles";
  data: InferEntrySchema<"dm-articles">
} & { render(): Render[".md"] };
"eddm-every-door-direct-mail.md": {
	id: "eddm-every-door-direct-mail.md";
  slug: "eddm-every-door-direct-mail";
  body: string;
  collection: "dm-articles";
  data: InferEntrySchema<"dm-articles">
} & { render(): Render[".md"] };
"eddm-vs-targeted-direct-mail.md": {
	id: "eddm-vs-targeted-direct-mail.md";
  slug: "eddm-vs-targeted-direct-mail";
  body: string;
  collection: "dm-articles";
  data: InferEntrySchema<"dm-articles">
} & { render(): Render[".md"] };
"how-long-does-direct-mail-take.md": {
	id: "how-long-does-direct-mail-take.md";
  slug: "how-long-does-direct-mail-take";
  body: string;
  collection: "dm-articles";
  data: InferEntrySchema<"dm-articles">
} & { render(): Render[".md"] };
"how-much-does-direct-mail-cost.md": {
	id: "how-much-does-direct-mail-cost.md";
  slug: "how-much-does-direct-mail-cost";
  body: string;
  collection: "dm-articles";
  data: InferEntrySchema<"dm-articles">
} & { render(): Render[".md"] };
"how-to-build-a-mailing-list-for-direct-mail.md": {
	id: "how-to-build-a-mailing-list-for-direct-mail.md";
  slug: "how-to-build-a-mailing-list-for-direct-mail";
  body: string;
  collection: "dm-articles";
  data: InferEntrySchema<"dm-articles">
} & { render(): Render[".md"] };
"postcard-marketing.md": {
	id: "postcard-marketing.md";
  slug: "postcard-marketing";
  body: string;
  collection: "dm-articles";
  data: InferEntrySchema<"dm-articles">
} & { render(): Render[".md"] };
"postcard-vs-letter-direct-mail.md": {
	id: "postcard-vs-letter-direct-mail.md";
  slug: "postcard-vs-letter-direct-mail";
  body: string;
  collection: "dm-articles";
  data: InferEntrySchema<"dm-articles">
} & { render(): Render[".md"] };
"usps-informed-delivery-direct-mail-campaign.md": {
	id: "usps-informed-delivery-direct-mail-campaign.md";
  slug: "usps-informed-delivery-direct-mail-campaign";
  body: string;
  collection: "dm-articles";
  data: InferEntrySchema<"dm-articles">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
