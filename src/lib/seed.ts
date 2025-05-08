import { db } from "./db";
import { books } from "./schema";

async function seed() {
  await db.insert(books).values([
    {
      title: "The Light and the Silence",
      summary: "A poetic exploration of truth and time.",
    },
    {
      title: "Letters to the Void",
      summary: "A collection of reflections on memory and loss.",
    },
  ]);

  console.log("✅ Seed data inserted");
}

seed().catch(console.error);
