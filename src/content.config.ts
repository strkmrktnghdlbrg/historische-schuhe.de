import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const artikel = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artikel' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Silo: epoche | kultur | schuhtyp | ratgeber
    silo: z.enum(['epoche', 'kultur', 'schuhtyp', 'ratgeber']),
    // optionale Feinzuordnung (z.B. "Mittelalter", "China", "Antike/Rom")
    epocheLabel: z.string().optional(),
    // Typ: ratgeber (Anleitung/Info) | money (Produkt-/Shop-Vergleich) | hub
    type: z.enum(['ratgeber', 'money', 'hub']).default('ratgeber'),
    category: z.string(),
    icon: z.string().default('👞'),
    pubDate: z.coerce.date(),
    updated: z.coerce.date().optional(),
    // bestehende Live-URL erhalten (Slug nicht umbiegen)
    preserved: z.boolean().default(false),
    featured: z.boolean().default(false),
    // Lesezeit in Minuten (Anzeige)
    readMin: z.number().default(7),
    // optionaler Amazon-Produktgruppen-Key aus amazon-asins.json (zeigt Box-Grid unter dem Artikel)
    amazonGroup: z.string().optional(),
  }),
});

export const collections = { artikel };
