import "dotenv/config"; // ← this loads .env automatically
import { defineConfig } from "drizzle-kit";

// Load from .env.local specifically
import { config } from "dotenv";
config({ path: ".env.local" });

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/lib/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
