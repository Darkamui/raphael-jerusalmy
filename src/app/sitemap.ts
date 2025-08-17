import { MetadataRoute } from 'next';
import { DataService } from '@/lib/services/data.service';
import { APP_CONFIG } from '@/lib/constants';
import { Book, Blog } from '@/lib/types';

// Force dynamic generation at runtime
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = APP_CONFIG.url;
  
  // Get all content from database with fallback for build errors
  let enBooks: Book[] = [];
  let frBooks: Book[] = [];
  let enBlogs: Blog[] = [];
  let frBlogs: Blog[] = [];
  
  try {
    const dataService = DataService.getInstance();
    [enBooks, frBooks, enBlogs, frBlogs] = await Promise.all([
      dataService.getBooks('en'),
      dataService.getBooks('fr'),
      dataService.getBlogs('en'),
      dataService.getBlogs('fr'),
    ]);
  } catch (error) {
    console.warn('Failed to fetch dynamic content for sitemap:', error);
    // Continue with static sitemap generation only
  }

  const sitemap: MetadataRoute.Sitemap = [
    // Static pages
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/fr`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/en/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/fr/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/books`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/fr/books`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/fr/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/events`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/fr/events`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/fr/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Add book pages
  enBooks.forEach((book) => {
    sitemap.push({
      url: `${baseUrl}/en/books/${book.slug}`,
      lastModified: book.updatedAt ? new Date(book.updatedAt) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  frBooks.forEach((book) => {
    sitemap.push({
      url: `${baseUrl}/fr/books/${book.slug}`,
      lastModified: book.updatedAt ? new Date(book.updatedAt) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Add blog pages
  enBlogs.forEach((blog) => {
    sitemap.push({
      url: `${baseUrl}/en/blog/${blog.slug}`,
      lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(blog.date),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  frBlogs.forEach((blog) => {
    sitemap.push({
      url: `${baseUrl}/fr/blog/${blog.slug}`,
      lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(blog.date),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  return sitemap;
}