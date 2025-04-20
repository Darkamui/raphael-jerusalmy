"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

// Book data (would typically come from an API)
const bookData = [
  {
    title: "The Silent Echo",
    coverImage: "/placeholder.svg?height=400&width=250",
    genre: "Literary Fiction",
    year: "2023",
    description: "A haunting tale of memory and loss in post-war Europe.",
    slug: "the-silent-echo",
  },
  {
    title: "Midnight Whispers",
    coverImage: "/placeholder.svg?height=400&width=250",
    genre: "Mystery",
    year: "2021",
    description:
      "A gripping mystery set in a small coastal town with dark secrets.",
    slug: "midnight-whispers",
  },
  {
    title: "Beyond the Horizon",
    coverImage: "/placeholder.svg?height=400&width=250",
    genre: "Historical Fiction",
    year: "2019",
    description:
      "An epic journey across continents during the Age of Exploration.",
    slug: "beyond-the-horizon",
  },
  {
    title: "The Forgotten Path",
    coverImage: "/placeholder.svg?height=400&width=250",
    genre: "Literary Fiction",
    year: "2017",
    description:
      "A poignant exploration of family, identity, and reconciliation.",
    slug: "the-forgotten-path",
  },
  {
    title: "Whispers in the Wind",
    coverImage: "/placeholder.svg?height=400&width=250",
    genre: "Romance",
    year: "2015",
    description:
      "A sweeping romance set against the backdrop of the American Civil War.",
    slug: "whispers-in-the-wind",
  },
  {
    title: "The Last Summer",
    coverImage: "/placeholder.svg?height=400&width=250",
    genre: "Coming of Age",
    year: "2013",
    description:
      "A nostalgic coming-of-age story about friendship and first love.",
    slug: "the-last-summer",
  },
  {
    title: "Shadows of the Past",
    coverImage: "/placeholder.svg?height=400&width=250",
    genre: "Thriller",
    year: "2011",
    description:
      "A psychological thriller that explores the dark corners of the human mind.",
    slug: "shadows-of-the-past",
  },
  {
    title: "The Winter Garden",
    coverImage: "/placeholder.svg?height=400&width=250",
    genre: "Historical Fiction",
    year: "2010",
    description:
      "A tale of resilience and hope set during the harsh winter of 1942.",
    slug: "the-winter-garden",
  },
];

export default function BooksPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState<typeof bookData>([]);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setBooks(bookData);
      setIsLoading(false);
    }, 500); // Simulate a 500ms loading delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary/10 via-accent/5 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl gradient-text">
                Books
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Explore the complete collection of novels spanning various
                genres and time periods.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="w-full py-6 bg-background border-b">
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
      </section>

      {/* Books Grid */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {isLoading
              ? Array(8)
                  .fill(null)
                  .map((_, index) => <BookCardSkeleton key={index} />)
              : books.map((book, index) => (
                  <BookCard
                    key={book.slug}
                    title={book.title}
                    coverImage={book.coverImage}
                    genre={book.genre}
                    year={book.year}
                    description={book.description}
                    slug={book.slug}
                    index={index}
                  />
                ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function BookCard({
  title,
  coverImage,
  genre,
  year,
  description,
  slug,
  index = 0,
}: {
  title: string;
  coverImage: string;
  genre: string;
  year: string;
  description: string;
  slug: string;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col glass-card">
        <div className="relative aspect-[2/3] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 z-10"></div>
          <Image
            src={coverImage || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform hover:scale-105 duration-500"
          />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent z-20"></div>
        </div>
        <CardContent className="p-6 flex-grow flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline">{genre}</Badge>
            <span className="text-sm text-muted-foreground">{year}</span>
          </div>
          <h3 className="text-xl font-bold mb-2 gradient-text">{title}</h3>
          <p className="text-muted-foreground mb-4 flex-grow">{description}</p>
          <Button
            variant="outline"
            size="sm"
            className="w-full glass water-drop group"
            asChild
          >
            <Link
              href={`/books/${slug}`}
              className="flex items-center justify-center"
            >
              View Details{" "}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function BookCardSkeleton() {
  return (
    <div className="overflow-hidden h-full flex flex-col rounded-lg border bg-card text-card-foreground shadow">
      <Skeleton className="aspect-[2/3] w-full" />
      <div className="p-6 flex-grow flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-4 w-12 rounded-md" />
        </div>
        <Skeleton className="h-6 w-full rounded-md" />
        <Skeleton className="h-20 w-full rounded-md" />
        <Skeleton className="h-9 w-full mt-auto rounded-md" />
      </div>
    </div>
  );
}
