"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  // Star,
  ShoppingCart,
  // BookOpen,
  // Download,
  // Share2,
  // Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { use } from "react";
import { useTranslations } from "next-intl";
import { Book } from "@/lib/types";

type Params = Promise<{ slug: string }>;

export default function BookPage(props: { params: Params }) {
  const { slug } = use(props.params);

  const books = useTranslations().raw("booksPage.items") as Book[];
  const text = useTranslations("booksPage");
  const book = books.find((b) => b.slug === slug) ?? books[0];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 bg-gradient-to-b from-primary/10 via-accent/5 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <motion.div
              className="w-full md:w-1/3 lg:w-1/4"
              initial={{ opacity: 0, x: -120, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <div className="sticky top-24">
                <motion.div
                  className="relative aspect-[2/3] overflow-hidden rounded-xl shadow-2xl animate-float"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 z-10"></div>
                  <Image
                    src={book.coverImg || "/placeholder.svg"}
                    alt={book.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent z-20"></div>
                </motion.div>
                <div className="mt-6 space-y-4">
                  <Button
                    className="w-full glass group transition-all duration-300 water-drop  cursor-pointer"
                    size="lg"
                    variant="outline"
                    asChild
                  >
                    <Link href={book.purchaseUrl} target="_blank">
                      <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                      <span>{text("buy")}</span>
                    </Link>
                  </Button>
                  {/* <div className="flex gap-2">
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
                  </div> */}
                  <Button
                    variant="outline"
                    className="w-full glass water-drop"
                    asChild
                  >
                    <Link href="/books">
                      <ArrowLeft className="mr-2 h-4 w-4" /> {text("back")}
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: 100, y: 30 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-accent text-accent-foreground">
                    {book.type}
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
                <div className="flex flex-col glass-card p-4">
                  <span className="text-sm text-muted-foreground">
                    {text("publisher")}
                  </span>
                  <span className="font-medium">{book.publisher}</span>
                </div>
                <div className="flex flex-col glass-card p-4">
                  <span className="text-sm text-muted-foreground">Pages</span>
                  <span className="font-medium">{book.pages}</span>
                </div>
                <div className="flex flex-col glass-card p-4">
                  <span className="text-sm text-muted-foreground">
                    {text("year")}
                  </span>
                  <span className="font-medium">{book.year}</span>
                </div>
                <div className="flex flex-col glass-card p-4">
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
                  <div
                    className="text-muted-foreground glass-card p-6"
                    dangerouslySetInnerHTML={{ __html: book.summary }}
                  />
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 gradient-text">
                    {text("excerpt")}
                  </h2>
                  <Card className="glass-card overflow-hidden">
                    <CardContent className="p-6 italic">
                      <p className="whitespace-pre-line">{book.excerpt}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* <div>
                  <h2 className="text-2xl font-bold mb-4 gradient-text">
                    {text("critical")}
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
                </div> */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
