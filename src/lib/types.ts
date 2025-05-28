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
  slug: string;
  coverImg: string;
  title: string;
  subtitle: string;
  year: string;
  type: string;
};
