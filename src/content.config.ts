import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    year: z.number(),
    category: z.string(),
    role: z.array(z.string()),
    status: z.string(),
    summary: z.string(),
    tint: z.enum(['blue', 'warm', 'violet']).default('blue'),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    technologies: z.array(z.string()).default([]),
  }),
});

export const collections = { projects };
