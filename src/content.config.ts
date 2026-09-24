import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      year: z.number().optional(),
      category: z.string(),
      role: z.array(z.string()).default([]),
      status: z.string().optional(),
      summary: z.string(),
      cover: z
        .object({
          src: image(),
          alt: z.string().min(1),
        })
        .optional(),
      liveUrl: z.url().optional(),
      tint: z.enum(['blue', 'warm', 'violet']).default('blue'),
      featured: z.boolean().default(false),
      order: z.number().default(0),
      technologies: z.array(z.string()).default([]),
    }),
});

export const collections = { projects };
