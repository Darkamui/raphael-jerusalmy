CREATE TABLE "blogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"subtitle" text,
	"excerpt" text,
	"content" text,
	"description" text,
	"image" text,
	"url" text,
	"category" text,
	"slug" text NOT NULL,
	"read_time" text,
	"date" text NOT NULL,
	"locale" text DEFAULT 'en' NOT NULL,
	"published" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "blogs_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"subtitle" text,
	"excerpt" text,
	"summary" text,
	"publisher" text,
	"pages" text,
	"year" text,
	"isbn" text,
	"cover_img" text,
	"type" text,
	"slug" text NOT NULL,
	"purchase_url" text,
	"quotes" text,
	"reviews" text,
	"locale" text DEFAULT 'en' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "books_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"subtitle" text,
	"location" text,
	"date" text NOT NULL,
	"link" text,
	"locale" text DEFAULT 'en' NOT NULL,
	"published" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "timelines" (
	"id" serial PRIMARY KEY NOT NULL,
	"year" text NOT NULL,
	"title" text NOT NULL,
	"location" text,
	"locale" text DEFAULT 'en' NOT NULL,
	"created_at" timestamp DEFAULT now()
);
