import { pgTable, serial, text, timestamp, boolean, integer, unique } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull().default("admin"), // For future extensibility
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  excerpt: text("excerpt"),
  summary: text("summary"),
  publisher: text("publisher"),
  pages: text("pages"),
  year: text("year"),
  isbn: text("isbn"),
  coverImg: text("cover_img"),
  type: text("type"),
  slug: text("slug").notNull(),
  purchaseUrl: text("purchase_url"),
  quotes: text("quotes"), // JSON string array
  reviews: text("reviews"), // JSON string array
  locale: text("locale").notNull().default("en"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => ({
  slugLocaleUnique: unique().on(table.slug, table.locale),
}));

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  originalId: integer("original_id"),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  excerpt: text("excerpt"),
  content: text("content"),
  description: text("description"),
  image: text("image"),
  url: text("url"),
  category: text("category"),
  slug: text("slug").notNull(),
  readTime: text("read_time"),
  date: text("date").notNull(),
  locale: text("locale").notNull().default("en"),
  published: boolean("published").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => ({
  slugLocaleUnique: unique().on(table.slug, table.locale),
}));

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  location: text("location"),
  date: text("date").notNull(),
  link: text("link"),
  locale: text("locale").notNull().default("en"),
  published: boolean("published").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const timelines = pgTable("timelines", {
  id: serial("id").primaryKey(),
  year: text("year").notNull(),
  title: text("title").notNull(),
  location: text("location"),
  locale: text("locale").notNull().default("en"),
  createdAt: timestamp("created_at").defaultNow(),
});
