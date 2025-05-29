export type Blog = {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  url: string;
  category: string;
  subtitle: string;
  description: string;
  image: string;
  readTime: string;
  slug: string;
  content: string;
};

export type Timeline = {
  year: string;
  title: string;
  location: string;
};

export type Event = {
  title: string;
  subtitle: string;
  location: string;
  date: string;
  id: number;
  link: string;
};

export type Book = {
  publisher: string;
  pages: string;
  year: string;
  isbn: string;
  subtitle: string;
  excerpt: string;
  quotes: string[];
  slug: string;
  coverImg: string;
  type: string;
  title: string;
  reviews: string[];
  purchaseUrl: string;
  summary: string;
};
