export interface Blog {
  readonly id: number;
  readonly originalId?: number;
  readonly title: string;
  readonly date: string;
  readonly excerpt: string;
  readonly url: string;
  readonly category: string;
  readonly subtitle: string;
  readonly description: string;
  readonly image: string;
  readonly readTime: string;
  readonly slug: string;
  readonly content: string;
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
  readonly publisher: string;
  readonly pages: string;
  readonly year: string;
  readonly isbn: string;
  readonly subtitle: string;
  readonly excerpt: string;
  readonly quotes: readonly string[];
  readonly slug: string;
  readonly coverImg: string;
  readonly type: string;
  readonly title: string;
  readonly reviews: readonly string[];
  readonly purchaseUrl: string;
  readonly summary: string;
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
