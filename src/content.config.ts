import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

export const projectIcons = ['window', 'chip', 'rings', 'chart', 'signal', 'layers', 'dice', 'gamepad'] as const;

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['software', 'hardware', 'research', 'coursework']),
    year: z.number().int(),
    summary: z.string(),
    description: z.string(),
    icon: z.enum(projectIcons),
    featured: z.boolean().default(false),
    order: z.number().optional(),
    repo: z.url().optional(),
    url: z.url().optional(),
  }),
});

const companies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/companies' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      summary: z.string(),
      description: z.string(),
      founded: z.number().int(),
      website: z.url().optional(),
      websiteLabel: z.string().optional(),
      logo: image().optional(),
      mark: z.enum(['circle-line', 'squares', 'triangle']).optional(),
    }),
});

const milestones = defineCollection({
  loader: file('./src/content/milestones.yaml'),
  schema: z.object({
    label: z.string(),
    title: z.string(),
    note: z.string().optional(),
    current: z.boolean().default(false),
    order: z.number(),
  }),
});

export const collections = { projects, companies, milestones };
