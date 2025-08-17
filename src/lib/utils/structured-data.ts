import type { Book, Blog } from "@/lib/types";
import { APP_CONFIG } from "@/lib/constants";

/**
 * Generate JSON-LD structured data for SEO enhancement
 */

export interface PersonSchema {
  "@context": "https://schema.org";
  "@type": "Person";
  name: string;
  alternateName?: string;
  description: string;
  url: string;
  sameAs: string[];
  jobTitle: string;
  birthPlace?: string;
  nationality?: string;
  alumniOf?: string[];
  award?: string[];
  knowsAbout: string[];
}

export interface BookSchema {
  "@context": "https://schema.org";
  "@type": "Book";
  name: string;
  author: {
    "@type": "Person";
    name: string;
    url: string;
  };
  description: string;
  isbn?: string;
  datePublished?: string;
  publisher?: {
    "@type": "Organization";
    name: string;
  };
  genre?: string | undefined;
  inLanguage: string;
  url: string;
  image?: string | undefined;
  review?: {
    "@type": "Review";
    reviewRating: {
      "@type": "Rating";
      ratingValue: number;
      bestRating: number;
    };
    author: {
      "@type": "Organization";
      name: string;
    };
    reviewBody: string;
  }[];
}

export interface ArticleSchema {
  "@context": "https://schema.org";
  "@type": "Article";
  headline: string;
  description: string;
  author: {
    "@type": "Person";
    name: string;
    url: string;
  };
  publisher: {
    "@type": "Organization";
    name: string;
    url: string;
    logo: {
      "@type": "ImageObject";
      url: string;
    };
  };
  datePublished: string;
  dateModified: string;
  mainEntityOfPage: {
    "@type": "WebPage";
    "@id": string;
  };
  image?: string | undefined;
  articleSection: string;
  wordCount?: number;
  inLanguage: string;
  url: string;
}

export interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo: {
    "@type": "ImageObject";
    url: string;
  };
  contactPoint: {
    "@type": "ContactPoint";
    contactType: "customer service";
    email: string;
  };
  sameAs: string[];
}

export interface WebsiteSchema {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  description: string;
  url: string;
  inLanguage: string[];
  publisher: {
    "@type": "Person";
    name: string;
  };
  potentialAction: {
    "@type": "SearchAction";
    target: {
      "@type": "EntryPoint";
      urlTemplate: string;
    };
    "query-input": string;
  };
}

/**
 * Generate Person schema for Raphaël Jerusalmy
 */
export function generatePersonSchema(): PersonSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Raphaël Jerusalmy",
    description: "French-Israeli author, former intelligence officer, and expert commentator known for historical fiction and geopolitical analysis.",
    url: APP_CONFIG.url,
    sameAs: [
      "https://www.linkedin.com/in/raphael-jerusalmy",
      "https://twitter.com/RJerusalmy",
      "https://www.goodreads.com/author/show/raphael-jerusalmy"
    ],
    jobTitle: "Author, Former Intelligence Officer, Expert Commentator",
    birthPlace: "France",
    nationality: "French-Israeli",
    alumniOf: [
      "École Normale Supérieure",
      "Sorbonne University",
      "Lycée Henri IV"
    ],
    award: [
      "Prix Emmanuel Roblès 2013",
      "Prix littéraire de l'ENS Cachan",
      "Prix Coup de cœur des lecteurs des Rendez-vous de l'histoire de Blois 2016",
      "Prix Amerigo-Vespucci 2017"
    ],
    knowsAbout: [
      "Historical Fiction",
      "Holocaust Literature", 
      "Geopolitical Analysis",
      "Intelligence Operations",
      "Sephardic History",
      "Book Collecting",
      "Middle Eastern Affairs"
    ]
  };
}

/**
 * Generate Book schema from book data
 */
export function generateBookSchema(book: Book, locale: string): BookSchema {
  const bookUrl = `${APP_CONFIG.url}/${locale}/books/${book.slug}`;
  
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: {
      "@type": "Person",
      name: book.author || "Raphaël Jerusalmy",
      url: APP_CONFIG.url
    },
    description: book.summary || book.subtitle || book.description || book.synopsis || book.title,
    ...(book.year && { datePublished: book.year }),
    ...(book.publisher && { publisher: {
      "@type": "Organization",
      name: book.publisher
    } }),
    ...(book.type && { genre: book.type }),
    inLanguage: locale === "fr" ? "fr-FR" : "en-US",
    url: bookUrl,
    ...(book.coverImg && { image: `${APP_CONFIG.url}${book.coverImg}` })
  };
}

/**
 * Generate Article schema from blog post data
 */
export function generateArticleSchema(post: Blog, locale: string): ArticleSchema {
  const postUrl = `${APP_CONFIG.url}/${locale}/blog/${post.slug}`;
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.title,
    author: {
      "@type": "Person",
      name: "Raphaël Jerusalmy",
      url: APP_CONFIG.url
    },
    publisher: {
      "@type": "Organization",
      name: APP_CONFIG.name,
      url: APP_CONFIG.url,
      logo: {
        "@type": "ImageObject",
        url: `${APP_CONFIG.url}/logo.png`
      }
    },
    datePublished: post.date || new Date().toISOString(),
    dateModified: typeof post.updatedAt === 'string' ? post.updatedAt : (post.updatedAt instanceof Date ? post.updatedAt.toISOString() : post.date),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl
    },
    ...(post.image && { image: `${APP_CONFIG.url}${post.image}` }),
    articleSection: "Analysis",
    inLanguage: locale === "fr" ? "fr-FR" : "en-US",
    url: postUrl
  };
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema(): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: APP_CONFIG.name,
    url: APP_CONFIG.url,
    logo: {
      "@type": "ImageObject",
      url: `${APP_CONFIG.url}/logo.png`
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "contact@raphael-jerusalmy.com"
    },
    sameAs: [
      "https://www.linkedin.com/in/raphael-jerusalmy",
      "https://twitter.com/RJerusalmy"
    ]
  };
}

/**
 * Generate Website schema
 */
export function generateWebsiteSchema(): WebsiteSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: APP_CONFIG.name,
    description: APP_CONFIG.description,
    url: APP_CONFIG.url,
    inLanguage: ["fr-FR", "en-US"],
    publisher: {
      "@type": "Person",
      name: "Raphaël Jerusalmy"
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${APP_CONFIG.url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Generate script tag with JSON-LD data
 */
export function generateStructuredDataScript(data: object): string {
  return `<script type="application/ld+json">${JSON.stringify(data, null, 2)}</script>`;
}