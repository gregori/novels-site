import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// BR-1: allowed status values
const titleStatus = z.enum(['ongoing', 'completed', 'paused', 'dropped']);

const titles = defineCollection({
  loader: glob({
    pattern: '*/index.md',
    base: './src/content/titles',
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      originalAuthor: z.string().min(1),
      // BR-2: categories are free-form, but an empty string is not a valid category value
      categories: z.array(z.string().trim().min(1)).default([]),
      status: titleStatus,
      synopsis: z.string().min(1),
      coverImage: image(),
      credits: z.string().min(1),
    }),
});

const chapters = defineCollection({
  // BR-3: every file in a title's folder except index.md is a chapter, ordered by filename
  loader: glob({
    pattern: ['*/*.md', '!*/index.md'],
    base: './src/content/titles',
  }),
  schema: z.object({
    chapterTitle: z.string().min(1),
    publishDate: z.coerce.date(),
  }),
});

export const collections = { titles, chapters };
