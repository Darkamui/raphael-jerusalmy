"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  BookOpen,
  Download,
  Share2,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { use } from "react";

type Params = Promise<{ slug: string }>;

// This would typically come from a database or CMS
const books = [
  {
    slug: "the-silent-echo",
    title: "The Silent Echo",
    coverImage: "/placeholder.svg?height=600&width=400",
    genre: "Literary Fiction",
    year: "2023",
    publisher: "Penguin Random House",
    pages: 342,
    isbn: "978-1234567890",
    description:
      "A haunting tale of memory and loss in post-war Europe. When Elise returns to her childhood home in a small French village after decades away, she must confront the ghosts of her past and the secrets that have shaped her life.",
    excerpt:
      "The village hadn't changed, not really. The same stone houses lined the narrow streets, the same church bell tolled the hours, the same scent of lavender hung in the air. But Elise had changed. Forty years had passed since she'd last walked these streets, since she'd last heard that bell, since she'd last breathed in that sweet, familiar scent. Forty years of memories—some cherished, some buried—pressed against her chest as she stood at the edge of the village, her suitcase heavy in her hand.\n\nShe hadn't planned to return. Not ever. But then the letter had arrived, its handwriting shaky but unmistakable, and she knew she had no choice. Some calls couldn't be ignored, even after decades of silence.\n\n'Are you all right, madame?' The taxi driver's voice pulled her from her thoughts. He was young, probably in his twenties, with kind eyes that reminded her of someone she'd once known.\n\n'Yes,' she said, though her voice betrayed her. 'Yes, I'm fine.'\n\nBut she wasn't fine. How could she be? The last time she'd stood on this spot, she'd been eighteen years old, with a heart full of dreams and a head full of promises. Now she was an old woman, her dreams long since adjusted to reality, those promises turned to dust.",
    reviews: [
      {
        author: "The New York Times",
        text: "A masterpiece of modern literature. The character development is unparalleled, and the prose is simply breathtaking.",
      },
      {
        author: "The Guardian",
        text: "A profound exploration of memory, guilt, and redemption. This novel will stay with you long after you've turned the final page.",
      },
      {
        author: "Literary Review",
        text: "Exquisite prose and meticulous historical detail combine to create a deeply moving narrative about the lasting impacts of war.",
      },
    ],
    relatedBooks: [
      "beyond-the-horizon",
      "the-forgotten-path",
      "whispers-in-the-wind",
    ],
  },
  // Other books would be defined here
];

export default function BookPage(props: { params: Params }) {
  // unwrap the async params
  const { slug } = use(props.params);

  // In a real app you’d fetch; here we read from the local array
  const book = books.find((b) => b.slug === slug) ?? books[0];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 bg-gradient-to-b from-primary/10 via-accent/5 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <motion.div
              className="w-full md:w-1/3 lg:w-1/4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="sticky top-24">
                <motion.div
                  className="relative aspect-[2/3] overflow-hidden rounded-xl shadow-2xl animate-float"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 z-10"></div>
                  <Image
                    src={book.coverImage || "/placeholder.svg"}
                    alt={book.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent z-20"></div>
                </motion.div>
                <div className="mt-6 space-y-4">
                  <Button
                    className="w-full glass group transition-all duration-300 water-drop"
                    size="lg"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                    <span>Purchase Book</span>
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 glass water-drop"
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Hardcover
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 glass water-drop"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      eBook
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full glass water-drop"
                    asChild
                  >
                    <Link href="/books">
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back to Books
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-accent text-accent-foreground">
                    {book.genre}
                  </Badge>
                  <Badge variant="outline" className="glass">
                    {book.year}
                  </Badge>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text">
                  {book.title}
                </h1>
              </div>

              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col glass-card p-4 wave-bg">
                  <span className="text-sm text-muted-foreground">
                    Publisher
                  </span>
                  <span className="font-medium">{book.publisher}</span>
                </div>
                <div className="flex flex-col glass-card p-4 wave-bg">
                  <span className="text-sm text-muted-foreground">Pages</span>
                  <span className="font-medium">{book.pages}</span>
                </div>
                <div className="flex flex-col glass-card p-4 wave-bg">
                  <span className="text-sm text-muted-foreground">Year</span>
                  <span className="font-medium">{book.year}</span>
                </div>
                <div className="flex flex-col glass-card p-4 wave-bg">
                  <span className="text-sm text-muted-foreground">ISBN</span>
                  <span className="font-medium">{book.isbn}</span>
                </div>
              </div>

              <Separator className="my-8 opacity-30" />

              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4 gradient-text">
                    Synopsis
                  </h2>
                  <p className="text-muted-foreground glass-card p-6">
                    {book.description}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 gradient-text">
                    Excerpt
                  </h2>
                  <Card className="glass-card overflow-hidden">
                    <CardContent className="p-6 italic">
                      <p className="whitespace-pre-line">{book.excerpt}</p>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 gradient-text">
                    Critical Acclaim
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {book.reviews.map((review, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Card className="glass-card h-full">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-4 w-4 text-blue-400 animate-pulse-slow"
                                  style={{ animationDelay: `${i * 0.2}s` }}
                                  fill="currentColor"
                                />
                              ))}
                            </div>
                            <p className="italic mb-2">{review.text}</p>
                            <p className="text-sm font-semibold gradient-text">
                              — {review.author}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Books */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter gradient-text">
                You May Also Enjoy
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Explore more books in similar genres and themes.
              </p>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <RelatedBookCard
              title="Beyond the Horizon"
              coverImage="/placeholder.svg?height=400&width=250"
              genre="Historical Fiction"
              year="2019"
              slug="beyond-the-horizon"
              index={0}
            />
            <RelatedBookCard
              title="The Forgotten Path"
              coverImage="/placeholder.svg?height=400&width=250"
              genre="Literary Fiction"
              year="2017"
              slug="the-forgotten-path"
              index={1}
            />
            <RelatedBookCard
              title="Whispers in the Wind"
              coverImage="/placeholder.svg?height=400&width=250"
              genre="Romance"
              year="2015"
              slug="whispers-in-the-wind"
              index={2}
            />
            <RelatedBookCard
              title="The Last Summer"
              coverImage="/placeholder.svg?height=400&width=250"
              genre="Coming of Age"
              year="2013"
              slug="the-last-summer"
              index={3}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function RelatedBookCard({
  title,
  coverImage,
  genre,
  year,
  slug,
  index = 0,
}: {
  title: string;
  coverImage: string;
  genre: string;
  year: string;
  slug: string;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
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
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-30 bg-background/30 backdrop-blur-sm hover:bg-background/50"
          >
            <Bookmark className="h-4 w-4 text-white" />
          </Button>
        </div>
        <CardContent className="p-6 flex-grow flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <Badge className="bg-accent text-accent-foreground">{genre}</Badge>
            <span className="text-sm text-muted-foreground">{year}</span>
          </div>
          <h3 className="text-xl font-bold mb-2 gradient-text">{title}</h3>
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-auto glass water-drop group"
            asChild
          >
            <Link
              href={`/books/${slug}`}
              className="flex items-center justify-center"
            >
              View Details
              <Share2 className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
