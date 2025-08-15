"use client";

import { Book, Blog, Event, Testimonial } from "@/lib/types";
import { useTranslations } from "next-intl";

export class ClientDataService {
  private t: ReturnType<typeof useTranslations>;

  constructor(t: ReturnType<typeof useTranslations>) {
    this.t = t;
  }

  getBooks(): Book[] {
    return this.t.raw("booksPage.items") as Book[];
  }

  getBookBySlug(slug: string): Book | null {
    const books = this.getBooks();
    return books.find((book) => book.slug === slug) || null;
  }

  getBlogs(): Blog[] {
    const blogs = this.t.raw("blog.items") as Blog[];
    return blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  getBlogBySlug(slug: string): Blog | null {
    const blogs = this.getBlogs();
    return blogs.find((blog) => blog.slug === slug) || null;
  }

  getEvents(): Event[] {
    const events = this.t.raw("eventsPage.items") as Event[];
    return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  getUpcomingEventsFromHomepage(): Event[] {
    const events = this.t.raw("homepage.upcomingEvents.events") as Event[];
    return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  getUpcomingEvents(limit: number = 3): Event[] {
    const events = this.getUpcomingEventsFromHomepage();
    const now = new Date();
    return events
      .filter((event) => new Date(event.date) >= now)
      .slice(0, limit);
  }

  getFeaturedBooks(limit: number = 3): Book[] {
    const books = this.getBooks();
    return books.slice(0, limit);
  }

  getRecentBlogs(limit: number = 3): Blog[] {
    const blogs = this.getBlogs();
    return blogs.slice(0, limit);
  }

  getTestimonials(limit: number = 3): Testimonial[] {
    const testimonials = this.t.raw("homepage.testimonials.items") as Testimonial[];
    return testimonials.slice(0, limit);
  }
}