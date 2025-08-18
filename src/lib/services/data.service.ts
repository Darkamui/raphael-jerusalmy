import { Book, Blog, Event, Timeline } from "@/lib/types";
import { db } from "@/lib/db";
import { books, blogs, events, timelines } from "@/lib/schema";
import { eq, and, desc, asc } from "drizzle-orm";
import { getCacheService, CacheService } from "./redis-cache.service";

export class DataService {
  private static instance: DataService;
  private cacheService: CacheService;
  private readonly CACHE_TTL_SECONDS = 5 * 60; // 5 minutes in seconds

  public static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  private constructor() {
    this.cacheService = getCacheService();
  }

  private getCacheKey(method: string, ...args: unknown[]): string {
    return `data:${method}:${JSON.stringify(args)}`;
  }

  private async retry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
  ): Promise<T> {
    let lastError: Error | undefined;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        
        if (attempt === maxRetries) {
          console.error(`Operation failed after ${maxRetries + 1} attempts:`, lastError);
          throw lastError;
        }
        
        // Exponential backoff
        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw lastError || new Error('Unknown error occurred');
  }

  private async executeWithCache<T>(
    key: string,
    operation: () => Promise<T>
  ): Promise<T> {
    try {
      // Check cache first
      const cached = await this.cacheService.get<T>(key);
      if (cached !== null) {
        return cached;
      }

      // Execute with retry logic
      const result = await this.retry(operation);
      
      // Cache the result
      await this.cacheService.set(key, result, this.CACHE_TTL_SECONDS);
      
      return result;
    } catch (error) {
      console.error(`Database operation failed for key ${key}:`, error);
      throw error;
    }
  }

  async getBooks(locale: string = "en"): Promise<Book[]> {
    const cacheKey = this.getCacheKey('getBooks', locale);
    
    return this.executeWithCache(cacheKey, async () => {
      const result = await db
        .select()
        .from(books)
        .where(eq(books.locale, locale));
      
      return result.map(book => ({
        ...book,
        quotes: JSON.parse(book.quotes || '[]'),
        reviews: JSON.parse(book.reviews || '[]'),
      })) as Book[];
    });
  }

  async getBookBySlug(slug: string, locale: string = "en"): Promise<Book | null> {
    const cacheKey = this.getCacheKey('getBookBySlug', slug, locale);
    
    return this.executeWithCache(cacheKey, async () => {
      const result = await db
        .select()
        .from(books)
        .where(and(eq(books.slug, slug), eq(books.locale, locale)))
        .limit(1);

      if (result.length === 0) return null;

      const book = result[0];
      if (!book) return null;
      
      return {
        ...book,
        quotes: JSON.parse(book.quotes || '[]'),
        reviews: JSON.parse(book.reviews || '[]'),
      } as Book;
    });
  }

  async getBlogs(locale: string = "en"): Promise<Blog[]> {
    const cacheKey = this.getCacheKey('getBlogs', locale);
    
    return this.executeWithCache(cacheKey, async () => {
      const result = await db
        .select()
        .from(blogs)
        .where(and(eq(blogs.locale, locale), eq(blogs.published, true)))
        .orderBy(desc(blogs.date));
      
      return result as Blog[];
    });
  }

  async getBlogBySlug(slug: string, locale: string = "en"): Promise<Blog | null> {
    const cacheKey = this.getCacheKey('getBlogBySlug', slug, locale);
    
    return this.executeWithCache(cacheKey, async () => {
      // First try to find the blog post in the requested locale
      const result = await db
        .select()
        .from(blogs)
        .where(and(eq(blogs.slug, slug), eq(blogs.locale, locale), eq(blogs.published, true)))
        .limit(1);

      if (result.length > 0) {
        return result[0] as Blog;
      }

      // If not found, try to find a blog post with the same ID in the other locale
      // and then find its equivalent in the requested locale
      const otherLocale = locale === "en" ? "fr" : "en";
      const otherResult = await db
        .select()
        .from(blogs)
        .where(and(eq(blogs.slug, slug), eq(blogs.locale, otherLocale), eq(blogs.published, true)))
        .limit(1);

      if (otherResult.length > 0) {
        const originalId = otherResult[0]?.originalId;
        if (originalId) {
          // Try to find the blog with the same originalId in the requested locale
          const translationResult = await db
            .select()
            .from(blogs)
            .where(and(eq(blogs.originalId, originalId), eq(blogs.locale, locale), eq(blogs.published, true)))
            .limit(1);

          if (translationResult.length > 0) {
            return translationResult[0] as Blog;
          }
        }
      }

      return null;
    });
  }

  async getEvents(locale: string = "en"): Promise<Event[]> {
    const cacheKey = this.getCacheKey('getEvents', locale);
    
    return this.executeWithCache(cacheKey, async () => {
      const result = await db
        .select()
        .from(events)
        .where(and(eq(events.locale, locale), eq(events.published, true)))
        .orderBy(asc(events.date));
      
      return result as Event[];
    });
  }

  async getUpcomingEvents(locale: string = "en", limit: number = 3): Promise<Event[]> {
    const allEvents = await this.getEvents(locale);
    const now = new Date();
    return allEvents
      .filter((event) => new Date(event.date) >= now)
      .slice(0, limit);
  }

  async getTimeline(locale: string = "en"): Promise<Timeline[]> {
    const cacheKey = this.getCacheKey('getTimeline', locale);
    
    return this.executeWithCache(cacheKey, async () => {
      const result = await db
        .select()
        .from(timelines)
        .where(eq(timelines.locale, locale))
        .orderBy(asc(timelines.year));
      
      return result as Timeline[];
    });
  }

  async getFeaturedBooks(locale: string = "en", limit: number = 3): Promise<Book[]> {
    const allBooks = await this.getBooks(locale);
    return allBooks.slice(0, limit);
  }

  async getRecentBlogs(locale: string = "en", limit: number = 3): Promise<Blog[]> {
    const allBlogs = await this.getBlogs(locale);
    return allBlogs.slice(0, limit);
  }

  async getBlogByOriginalId(originalId: number, locale: string = "en"): Promise<Blog | null> {
    const result = await db
      .select()
      .from(blogs)
      .where(and(eq(blogs.originalId, originalId), eq(blogs.locale, locale), eq(blogs.published, true)))
      .limit(1);

    return result.length > 0 ? result[0] as Blog : null;
  }

  async getAlternativeLanguageBlog(slug: string, currentLocale: string): Promise<{ slug: string; locale: string } | null> {
    // Find the blog in the current locale first
    const currentBlog = await this.getBlogBySlug(slug, currentLocale);
    if (!currentBlog?.originalId) return null;

    // Find the blog in the other locale with the same originalId
    const otherLocale = currentLocale === "en" ? "fr" : "en";
    const alternativeBlog = await this.getBlogByOriginalId(currentBlog.originalId, otherLocale);
    
    if (alternativeBlog) {
      return {
        slug: alternativeBlog.slug,
        locale: otherLocale
      };
    }

    return null;
  }

  /**
   * Clear all cached data
   */
  async clearCache(): Promise<void> {
    await this.cacheService.clear();
  }

  /**
   * Get cache statistics and health information
   */
  getCacheStats(): { redisConnected: boolean; memoryEntries: number; cacheType: string } {
    return this.cacheService.getStats();
  }

  /**
   * Invalidate specific cache entries by pattern
   */
  async invalidateCache(method?: string, locale?: string): Promise<void> {
    try {
      if (method && locale) {
        const key = this.getCacheKey(method, locale);
        await this.cacheService.del(key);
      } else if (method) {
        // For now, just clear all cache - could be enhanced to support pattern matching
        console.warn(`Clearing all cache due to method ${method} invalidation`);
        await this.clearCache();
      } else {
        await this.clearCache();
      }
    } catch (error) {
      console.warn('Cache invalidation error:', error);
    }
  }
}