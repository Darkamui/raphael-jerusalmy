export interface Blog {
  readonly id: number;
  readonly originalId?: number | null;
  readonly title: string;
  readonly date: string;
  readonly excerpt: string | null;
  readonly url: string | null;
  readonly category: string;
  readonly subtitle: string | null;
  readonly description: string | null;
  readonly image: string | null;
  readonly readTime: string;
  readonly slug: string;
  readonly content: string | null;
  readonly updatedAt?: string | Date | null;
  readonly locale: string;
  readonly published: boolean;
}

export interface Timeline {
  readonly year: string;
  readonly title: string;
  readonly location: string;
}

export interface Testimonial {
  readonly quote: string;
  readonly source: string;
}

export interface Event {
  readonly title: string;
  readonly subtitle: string;
  readonly location: string;
  readonly date: string;
  readonly id: number;
  readonly link: string;
}

export interface Book {
  readonly id: number;
  readonly publisher: string | null;
  readonly pages: string | null;
  readonly year: string | null;
  readonly isbn: string | null;
  readonly subtitle: string | null;
  readonly excerpt: string | null;
  readonly quotes: readonly string[];
  readonly slug: string;
  readonly coverImg: string | null;
  readonly cover?: string | null;
  readonly type: string | null;
  readonly title: string;
  readonly reviews: readonly string[];
  readonly purchaseUrl: string | null;
  readonly summary: string | null;
  readonly author?: string | null;
  readonly description?: string | null;
  readonly synopsis?: string | null;
  readonly genre?: string | null;
  readonly updatedAt?: string | Date | null;
  readonly locale: string;
}

// Component prop types
export interface BookCardProps {
  readonly title: string;
  readonly coverImg: string;
  readonly type: string;
  readonly year: string;
  readonly subtitle: string;
  readonly slug: string;
  readonly index: number;
}

export interface SectionProps {
  readonly className?: string;
}

// API response types
export interface ContactFormData {
  readonly name: string;
  readonly email: string;
  readonly message: string;
}

export interface NewsletterFormData {
  readonly email: string;
}

// Locale types
export type Locale = "en" | "fr";

// Animation types
export interface AnimationConfig {
  readonly initial: Record<string, string | number>;
  readonly animate: Record<string, string | number>;
  readonly transition: Record<string, string | number>;
}
