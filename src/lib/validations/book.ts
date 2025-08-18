import { z } from 'zod';

// Common validation patterns
const urlPattern = /^https?:\/\/.+/;
const isbnPattern = /^(?:\d{10}|\d{13})$/;

// Book form schema (bilingual version for admin forms)
export const bookFormSchema = z.object({
  // Common fields
  publisher: z.string()
    .min(2, 'Publisher must be at least 2 characters')
    .max(100, 'Publisher must not exceed 100 characters')
    .trim(),
  
  pages: z.string()
    .regex(/^\d+$/, 'Pages must be a number')
    .refine(val => {
      const num = parseInt(val);
      return num > 0 && num <= 10000;
    }, 'Pages must be between 1 and 10,000'),
  
  year: z.string()
    .regex(/^\d{4}$/, 'Year must be a 4-digit number')
    .refine(val => {
      const year = parseInt(val);
      const currentYear = new Date().getFullYear();
      return year >= 1000 && year <= currentYear;
    }, 'Year must be valid and not in the future'),
  
  isbn: z.string()
    .optional()
    .or(z.literal(''))
    .refine(val => !val || isbnPattern.test(val.replace(/[-\s]/g, '')), 'ISBN must be 10 or 13 digits'),
  
  coverImg: z.string()
    .optional()
    .or(z.literal(''))
    .refine(val => !val || urlPattern.test(val), 'Cover image must be a valid URL'),
  
  type: z.string()
    .min(2, 'Type must be at least 2 characters')
    .max(50, 'Type must not exceed 50 characters')
    .trim(),
  
  purchaseUrl: z.string()
    .optional()
    .or(z.literal(''))
    .refine(val => !val || urlPattern.test(val), 'Purchase URL must be a valid URL'),
  
  quotes: z.string()
    .optional()
    .or(z.literal('')),
  
  reviews: z.string()
    .optional()
    .or(z.literal('')),
  
  // English version
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must not exceed 200 characters')
    .trim(),
  
  subtitle: z.string()
    .optional()
    .or(z.literal(''))
    .refine(val => !val || val.length <= 250, 'Subtitle must not exceed 250 characters'),
  
  excerpt: z.string()
    .optional()
    .or(z.literal(''))
    .refine(val => !val || val.length <= 500, 'Excerpt must not exceed 500 characters'),
  
  summary: z.string()
    .min(50, 'Summary must be at least 50 characters')
    .max(2000, 'Summary must not exceed 2000 characters')
    .trim(),
  
  slug: z.string()
    .min(3, 'Slug must be at least 3 characters')
    .max(100, 'Slug must not exceed 100 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug can only contain lowercase letters, numbers, and hyphens')
    .trim(),
  
  // French version
  titleFr: z.string()
    .min(3, 'French title must be at least 3 characters')
    .max(200, 'French title must not exceed 200 characters')
    .trim(),
  
  subtitleFr: z.string()
    .optional()
    .or(z.literal(''))
    .refine(val => !val || val.length <= 250, 'French subtitle must not exceed 250 characters'),
  
  excerptFr: z.string()
    .optional()
    .or(z.literal(''))
    .refine(val => !val || val.length <= 500, 'French excerpt must not exceed 500 characters'),
  
  summaryFr: z.string()
    .min(50, 'French summary must be at least 50 characters')
    .max(2000, 'French summary must not exceed 2000 characters')
    .trim(),
  
  slugFr: z.string()
    .min(3, 'French slug must be at least 3 characters')
    .max(100, 'French slug must not exceed 100 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'French slug can only contain lowercase letters, numbers, and hyphens')
    .trim(),
});

export type BookFormData = z.infer<typeof bookFormSchema>;

// Utility to validate single field
export function validateBookField(
  fieldName: keyof BookFormData,
  value: unknown,
  _fullData?: Partial<BookFormData>
): string | null {
  try {
    const fieldSchema = bookFormSchema.shape[fieldName];
    fieldSchema.parse(value);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.issues[0]?.message || 'Invalid value';
    }
    return 'Validation error';
  }
}

// Format ISBN for display
export function formatISBN(isbn: string): string {
  const cleanISBN = isbn.replace(/[-\s]/g, '');
  if (cleanISBN.length === 10) {
    return `${cleanISBN.slice(0, 1)}-${cleanISBN.slice(1, 6)}-${cleanISBN.slice(6, 9)}-${cleanISBN.slice(9)}`;
  } else if (cleanISBN.length === 13) {
    return `${cleanISBN.slice(0, 3)}-${cleanISBN.slice(3, 4)}-${cleanISBN.slice(4, 9)}-${cleanISBN.slice(9, 12)}-${cleanISBN.slice(12)}`;
  }
  return isbn;
}

// Sanitize input
export function sanitizeBookInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential XSS characters
    .replace(/\s+/g, ' '); // Normalize whitespace
}