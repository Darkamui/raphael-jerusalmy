CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"name" text NOT NULL,
	"role" text DEFAULT 'admin' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "blogs" DROP CONSTRAINT "blogs_slug_unique";--> statement-breakpoint
ALTER TABLE "books" DROP CONSTRAINT "books_slug_unique";--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "original_id" integer;--> statement-breakpoint
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_slug_locale_unique" UNIQUE("slug","locale");--> statement-breakpoint
ALTER TABLE "books" ADD CONSTRAINT "books_slug_locale_unique" UNIQUE("slug","locale");