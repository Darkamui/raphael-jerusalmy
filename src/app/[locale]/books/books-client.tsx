"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import BookCard from "@/components/book-card";
import { Book } from "@/lib/types";
import { staggerContainer, fadeInUp } from "@/lib/utils/animations";

interface BooksClientProps {
  books: Book[];
}

export function BooksClient({ books }: BooksClientProps) {
  const t = useTranslations("booksPage");
  const headerAnimation = fadeInUp();
  const containerAnimation = staggerContainer();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="w-full py-12 bg-gradient-to-b from-primary/10 via-accent/5 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            {...headerAnimation}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl gradient-text">
                {t("header.title")}
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                {t("header.subtitle")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          {!books?.length ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No books available at the moment.</p>
            </div>
          ) : (
            <motion.div
              {...containerAnimation}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {books.map((book, index) => (
                <BookCard
                  key={book.slug}
                  title={book.title}
                  coverImg={book.coverImg || "/placeholder.svg"}
                  type={book.type || ""}
                  year={book.year || ""}
                  subtitle={book.subtitle || ""}
                  slug={book.slug}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}