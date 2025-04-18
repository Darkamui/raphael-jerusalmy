export interface Book {
  slug: string;
  title: string;
  year: number;
  coverImage: string;
  description: string;
}

export const books: Book[] = [
  {
    slug: "the-great-gatsby",
    title: "The Great Gatsby",
    year: 1925,
    coverImage: "/images/gatsby.jpg",
    description: "A portrait of the Jazz Age in all of its decadence…",
  },
  {
    slug: "to-kill-a-mockingbird",
    title: "To Kill a Mockingbird",
    year: 1960,
    coverImage: "/images/mockingbird.jpg",
    description: "Scout Finch grows up in the racially charged Deep South…",
  },
];
