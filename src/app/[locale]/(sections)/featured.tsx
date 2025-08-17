"use client";
import BookCard from "@/components/book-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Book } from "@/lib/types";

interface FeaturedProps {
  books: Book[];
}

const Featured = ({ books }: FeaturedProps) => {
  const t = useTranslations("homepage");
  return (
    <section className="w-full py-12 md:py-24 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {t("featuredBooks.header.title")}
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              {t("featuredBooks.header.subtitle")}
            </p>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
          {books.map((book, index) => (
            <motion.div
              key={book.slug}
              initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80, y: 30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <BookCard
                title={book.title}
                coverImg={book.coverImg || "/placeholder.svg"}
                type={book.type || ""}
                year={book.year || ""}
                subtitle={book.subtitle || ""}
                slug={book.slug}
                index={index}
              />
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <Link href="/books">
              {t("featuredBooks.header.ctaLabel")}{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Featured;
