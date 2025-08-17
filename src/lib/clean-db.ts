import { config } from "dotenv";
config({ path: ".env.local" });

import { db } from "./db";
import { books, blogs, events, timelines } from "./schema";

async function cleanDb() {
  console.warn("Cleaning database tables...");
  
  try {
    await db.delete(books);
    await db.delete(blogs);
    await db.delete(events);
    await db.delete(timelines);
    
    console.warn("Database cleaned successfully!");
  } catch (error) {
    console.error("Error cleaning database:", error);
  }
  
  process.exit();
}

cleanDb();