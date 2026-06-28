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
};
