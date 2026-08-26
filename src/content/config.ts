import { defineCollection, z } from 'astro:content';

const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.date(),
  updatedDate: z.date(),
  author: z.string(),
  authorTitle: z.string(),
  authorLocation: z.string(),
  primaryKeyword: z.string(),
  pillar: z.string(),
  leadAnswer: z.string().optional(),
  schemaFAQ: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
  schemaHowTo: z.object({
    name: z.string(),
    steps: z.array(z.object({ name: z.string(), text: z.string() })),
  }).optional(),
  schemaItemList: z.array(z.object({ name: z.string() })).optional(),
});

const dmArticles = defineCollection({ type: 'content', schema: articleSchema });
const dataArticles = defineCollection({ type: 'content', schema: articleSchema });
const eddmArticles = defineCollection({ type: 'content', schema: articleSchema });
const printingArticles = defineCollection({ type: 'content', schema: articleSchema });
const mailingArticles = defineCollection({ type: 'content', schema: articleSchema });
const graphicDesignArticles = defineCollection({ type: 'content', schema: articleSchema });
const webDesignArticles = defineCollection({ type: 'content', schema: articleSchema });
const nonprofitArticles = defineCollection({ type: 'content', schema: articleSchema });
const schoolArticles = defineCollection({ type: 'content', schema: articleSchema });
const unionArticles = defineCollection({ type: 'content', schema: articleSchema });

const productContentSchema = z.object({
  intro: z.string(),
  specs: z.object({
    sizes: z.string(),
    stock: z.string(),
    inkFinish: z.string(),
    minQuantity: z.string(),
    quantityBreaks: z.string(),
    turnaround: z.string(),
  }),
  useCases: z.array(z.string()),
  howToOrder: z.array(z.string()),
  faqs: z.array(z.object({ q: z.string(), a: z.string() })),
  relatedProducts: z.array(z.string()),
  // Manual override: a content author can force a product to draft status
  // regardless of placeholder detection (see src/lib/product-content.ts).
  // Auto-detection from TODO_SPEC placeholders is the primary mechanism;
  // this exists for cases that need a page pulled without editing content.
  draft: z.boolean().optional(),
});
const products = defineCollection({ type: 'content', schema: productContentSchema });

export const collections = {
  'dm-articles': dmArticles,
  'data-articles': dataArticles,
  'eddm-articles': eddmArticles,
  'printing-articles': printingArticles,
  'mailing-articles': mailingArticles,
  'graphic-design-articles': graphicDesignArticles,
  'web-design-articles': webDesignArticles,
  'nonprofit-articles': nonprofitArticles,
  'school-articles': schoolArticles,
  'union-articles': unionArticles,
  'products': products,
};
