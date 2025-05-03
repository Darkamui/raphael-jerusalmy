"use client";
import BookCard from "@/components/book-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Book } from "../books/[slug]/page";

const Featured = () => {
  const t = useTranslations("homepage");
  const featured = (useTranslations().raw("booksDetails") as Book[]).slice(
    0,
    3
  );
  return (
    <section className="w-full py-12 md:py-24 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {t("featuredBooksHeader.title")}
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              {t("featuredBooksHeader.subtitle")}
            </p>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((book) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              key={book.title}
            >
              <BookCard
                title={book.title}
                coverImg={book.coverImg}
                type={book.type}
                year={book.year.toString()}
                subtitle={book.subtitle}
                slug={book.slug}
              />
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <Link href="/books">
              {t("featuredBooksHeader.cta")}{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Featured;
