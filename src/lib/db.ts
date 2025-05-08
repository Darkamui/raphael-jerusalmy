import "dotenv/config"; // <-- still safe even if you're using docker-compose env vars

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // 👈 this must resolve at runtime
});

export const db = drizzle(pool, { schema });
