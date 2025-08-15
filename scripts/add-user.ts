#!/usr/bin/env tsx
/* eslint-disable @typescript-eslint/no-non-null-assertion */

/**
 * Script to add a user to the database
 * Usage: npx tsx scripts/add-user.ts <email> <password> <name> [role]
 */

import { config } from "dotenv";
config({ path: ".env.local" });

import bcrypt from "bcryptjs";
import { db } from "../src/lib/db";
import { users } from "../src/lib/schema";
import { eq } from "drizzle-orm";

async function addUser() {
  const args = process.argv.slice(2);

  if (args.length < 3) {
    console.error(
      "Usage: npx tsx scripts/add-user.ts <email> <password> <name> [role]"
    );
    console.error(
      'Example: npx tsx scripts/add-user.ts admin@example.com mypassword "Admin User" admin'
    );
    process.exit(1);
  }

  const email = args[0]!;
  const password = args[1]!;
  const name = args[2]!;
  const role = args[3] || "admin";

  try {
    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      console.error(`User with email ${email} already exists`);
      process.exit(1);
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 12);

    // Insert the user
    const result = await db
      .insert(users)
      .values({
        email,
        passwordHash,
        name,
        role,
        isActive: true,
      })
      .returning();

    const newUser = result[0];
    if (newUser) {
      console.log("User created successfully:");
      console.log(`ID: ${newUser.id}`);
      console.log(`Email: ${newUser.email}`);
      console.log(`Name: ${newUser.name}`);
      console.log(`Role: ${newUser.role}`);
      console.log(`Created: ${newUser.createdAt}`);
    }
  } catch (error) {
    console.error("Error creating user:", error);
    process.exit(1);
  }

  process.exit(0);
}

addUser();
