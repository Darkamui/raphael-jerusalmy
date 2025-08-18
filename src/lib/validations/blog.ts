import { z } from 'zod';

// Common validation patterns
const urlPattern = /^https?:\/\/.+/;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const readTimePattern = /^\d+\s*(min|minutes?)\s*(read)?$/i;

// Base blog schema for individual language
const blogLanguageSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must not exceed 200 characters')
    .trim(),
  
  subtitle: z.string()
    .max(250, 'Subtitle must not exceed 250 characters')
    .optional()
    .or(z.literal('')),
  
  slug: z.string()
    .min(3, 'Slug must be at least 3 characters')
    .max(100, 'Slug must not exceed 100 characters')
    .regex(slugPattern, 'Slug can only contain lowercase letters, numbers, and hyphens')
    .trim(),
  
  excerpt: z.string()
    .max(300, 'Excerpt must not exceed 300 characters')
    .optional()
    .or(z.literal('')),
  
  content: z.string()
    .min(50, 'Content must be at least 50 characters')
    .trim(),
  
  description: z.string()
    .max(160, 'Meta description must not exceed 160 characters')
    .optional()
    .or(z.literal('')),
});

// Full blog form schema with both languages
export const blogFormSchema = z.object({
  // Common fields
  category: z.string()
    .min(2, 'Category must be at least 2 characters')
    .max(50, 'Category must not exceed 50 characters')
    .trim(),
  
  readTime: z.string()
    .regex(readTimePattern, 'Read time must be in format "X min read" or "X minutes"')
    .refine(val => {
      if (!val) return false;
      const match = val.match(/(\d+)/);
      if (!match || !match[1]) return false;
      const minutes = parseInt(match[1]);
      return minutes >= 1 && minutes <= 120;
    }, 'Read time must be between 1 and 120 minutes'),
  
  date: z.string().min(1, 'Publication date is required'),
  
  image: z.string()
    .optional()
    .or(z.literal(''))
    .refine(val => !val || urlPattern.test(val), 'Image must be a valid URL'),
  
  url: z.string()
    .optional()
    .or(z.literal(''))
    .refine(val => !val || urlPattern.test(val), 'URL must be a valid URL'),
  
  published: z.boolean().default(true),
  
  // English version
  title: blogLanguageSchema.shape.title,
  subtitle: blogLanguageSchema.shape.subtitle,
  slug: blogLanguageSchema.shape.slug,
  excerpt: blogLanguageSchema.shape.excerpt,
  content: blogLanguageSchema.shape.content,
  description: blogLanguageSchema.shape.description,
  
  // French version
  titleFr: blogLanguageSchema.shape.title,
  subtitleFr: blogLanguageSchema.shape.subtitle,
  slugFr: blogLanguageSchema.shape.slug,
  excerptFr: blogLanguageSchema.shape.excerpt,
  contentFr: blogLanguageSchema.shape.content,
  descriptionFr: blogLanguageSchema.shape.description,
});

export type BlogFormData = z.infer<typeof blogFormSchema>;

// Utility to sanitize slug
export function sanitizeSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove multiple consecutive hyphens
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

// Utility to validate single field
export function validateField(
  fieldName: keyof BlogFormData,
  value: unknown,
  _fullData?: Partial<BlogFormData>
): string | null {
  try {
    const fieldSchema = blogFormSchema.shape[fieldName];
    fieldSchema.parse(value);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.issues[0]?.message || 'Invalid value';
    }
    return 'Validation error';
  }
}