import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  summary: text("summary"),
  createdAt: timestamp("created_at").defaultNow(),
});
