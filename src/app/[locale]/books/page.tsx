"use client";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { motion } from "framer-motion";
// import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import BookCard from "@/components/book-card";
import { Book } from "@/lib/types";

export default function BooksPage() {
  const t = useTranslations("booksPage");
  const books = t.raw("items") as Book[];
  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 bg-gradient-to-b from-primary/10 via-accent/5 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
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

      {/* Filters */}
      {/* <section className="w-full py-6 bg-background border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search books..."
                className="w-full pl-8"
              />
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genres</SelectItem>
                  <SelectItem value="literary">Literary Fiction</SelectItem>
                  <SelectItem value="historical">Historical Fiction</SelectItem>
                  <SelectItem value="mystery">Mystery</SelectItem>
                  <SelectItem value="romance">Romance</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="newest">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                  <SelectItem value="title-desc">Title (Z-A)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section> */}

      {/* Books Grid */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map((book) => (
              <BookCard
                key={book.slug}
                title={book.title}
                coverImg={book.coverImg}
                type={book.type}
                year={book.year}
                subtitle={book.subtitle}
                slug={book.slug}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// function BookCardSkeleton() {
//   return (
//     <div className="overflow-hidden h-full flex flex-col rounded-lg border bg-card text-card-foreground shadow">
//       <Skeleton className="aspect-[2/3] w-full" />
//       <div className="p-6 flex-grow flex flex-col space-y-4">
//         <div className="flex items-center justify-between">
//           <Skeleton className="h-5 w-20 rounded-full" />
//           <Skeleton className="h-4 w-12 rounded-md" />
//         </div>
//         <Skeleton className="h-6 w-full rounded-md" />
//         <Skeleton className="h-20 w-full rounded-md" />
//         <Skeleton className="h-9 w-full mt-auto rounded-md" />
//       </div>
//     </div>
//   );
// }
