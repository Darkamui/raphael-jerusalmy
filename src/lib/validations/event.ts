import { z } from 'zod';

// Common validation patterns
const urlPattern = /^https?:\/\/.+/;

// Event form schema (bilingual version for admin forms)
export const eventFormSchema = z.object({
  // Common fields
  date: z.string()
    .min(1, 'Event date is required')
    .refine(val => {
      const date = new Date(val);
      const now = new Date();
      return date > now;
    }, 'Event date must be in the future'),
  
  link: z.string()
    .optional()
    .or(z.literal(''))
    .refine(val => !val || urlPattern.test(val), 'Link must be a valid URL'),
  
  featuredImage: z.string()
    .optional()
    .or(z.literal(''))
    .refine(val => !val || urlPattern.test(val), 'Featured image must be a valid URL'),
  
  published: z.boolean().default(true),
  
  // English version
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must not exceed 200 characters')
    .trim(),
  
  subtitle: z.string()
    .optional()
    .or(z.literal(''))
    .refine(val => !val || val.length <= 250, 'Subtitle must not exceed 250 characters'),
  
  location: z.string()
    .optional()
    .or(z.literal(''))
    .refine(val => !val || (val.length >= 3 && val.length <= 200), 'Location must be between 3 and 200 characters'),
  
  // French version
  titleFr: z.string()
    .min(3, 'French title must be at least 3 characters')
    .max(200, 'French title must not exceed 200 characters')
    .trim(),
  
  subtitleFr: z.string()
    .optional()
    .or(z.literal(''))
    .refine(val => !val || val.length <= 250, 'French subtitle must not exceed 250 characters'),
  
  locationFr: z.string()
    .optional()
    .or(z.literal(''))
    .refine(val => !val || (val.length >= 3 && val.length <= 200), 'French location must be between 3 and 200 characters'),
});

export type EventFormData = z.infer<typeof eventFormSchema>;

// Utility to validate single field
export function validateEventField(
  fieldName: keyof EventFormData,
  value: unknown,
  _fullData?: Partial<EventFormData>
): string | null {
  try {
    const fieldSchema = eventFormSchema.shape[fieldName];
    fieldSchema.parse(value);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.issues[0]?.message || 'Invalid value';
    }
    return 'Validation error';
  }
}

// Format time for display
export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':');
  if (!hours || !minutes) return time;
  const hour = parseInt(hours);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${period}`;
}

// Sanitize input
export function sanitizeEventInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential XSS characters
    .replace(/\s+/g, ' '); // Normalize whitespace
}