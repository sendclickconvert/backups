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
  schemaFAQ: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
  schemaHowTo: z.object({
    name: z.string(),
    steps: z.array(z.object({ name: z.string(), text: z.string() })),
  }).optional(),
  schemaItemList: z.array(z.object({ name: z.string() })).optional(),
});

const dmArticles = defineCollection({ type: 'content', schema: articleSchema });
const dataArticles = defineCollection({ type: 'content', schema: articleSchema });

export const collections = {
  'dm-articles': dmArticles,
  'data-articles': dataArticles,
};
