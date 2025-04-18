"use client";
/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BookCard from "@/components/book-card";
import NewsletterSignup from "@/components/newsletter-signup";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
            <motion.div
              className="flex flex-col justify-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2">
                <Badge className="inline-flex mb-2">
                  Released - March 2024
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  In Absentia
                </h1>
                <p className="max-w-[800px] text-balance text-muted-foreground md:text-xl">
                  Imprévisible et subtilement engagé, Raphaël Jerusalmy
                  orchestre brève la rencontre cruciale de deux destins et
                  accomplit un tour de force romanesque stupéfiant.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href="/books">
                    Explore Books <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/about">About the Author</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-[400px] lg:h-[500px] overflow-hidden rounded-xl"
            >
              <Image
                src="/placeholder.svg?height=600&width=400"
                alt="Author with books"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Featured Books
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Discover the stories that have captivated readers worldwide.
              </p>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <BookCard
                title="The Silent Echo"
                coverImage="/placeholder.svg?height=400&width=250"
                genre="Literary Fiction"
                year="2023"
                description="A haunting tale of memory and loss in post-war Europe."
                slug="the-silent-echo"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <BookCard
                title="Midnight Whispers"
                coverImage="/placeholder.svg?height=400&width=250"
                genre="Mystery"
                year="2021"
                description="A gripping mystery set in a small coastal town with dark secrets."
                slug="midnight-whispers"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <BookCard
                title="Beyond the Horizon"
                coverImage="/placeholder.svg?height=400&width=250"
                genre="Historical Fiction"
                year="2019"
                description="An epic journey across continents during the Age of Exploration."
                slug="beyond-the-horizon"
              />
            </motion.div>
          </div>
          <div className="flex justify-center mt-10">
            <Button variant="outline" size="lg" asChild>
              <Link href="/books">
                View All Books <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
                Reader Testimonials
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                What critics and readers are saying about the books.
              </p>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-primary mb-4" />
                  <p className="mb-4 italic">
                    "A masterpiece of modern literature. The character
                    development is unparalleled, and the prose is simply
                    breathtaking."
                  </p>
                  <div className="font-semibold">The New York Times</div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-primary mb-4" />
                  <p className="mb-4 italic">
                    "I couldn't put it down. The way the author weaves together
                    multiple storylines is nothing short of genius."
                  </p>
                  <div className="font-semibold">Literary Review</div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-primary mb-4" />
                  <p className="mb-4 italic">
                    "A profound exploration of human nature that will stay with
                    you long after you've turned the final page."
                  </p>
                  <div className="font-semibold">The Guardian</div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Upcoming Events
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Meet the author and join the conversation at these upcoming
                events.
              </p>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Calendar className="h-10 w-10 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold">
                        Book Signing - New York
                      </h3>
                      <p className="text-muted-foreground mt-1">
                        May 15, 2025 • 6:00 PM
                      </p>
                      <p className="mt-2">Barnes & Noble, 5th Avenue</p>
                      <Button
                        variant="link"
                        className="p-0 h-auto mt-2"
                        asChild
                      >
                        <Link href="#">
                          Learn more <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Calendar className="h-10 w-10 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold">
                        Literary Festival - London
                      </h3>
                      <p className="text-muted-foreground mt-1">
                        June 8, 2025 • 2:00 PM
                      </p>
                      <p className="mt-2">Southbank Centre</p>
                      <Button
                        variant="link"
                        className="p-0 h-auto mt-2"
                        asChild
                      >
                        <Link href="#">
                          Learn more <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
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
                Stay Updated
              </h2>
              <p className="max-w-[700px] md:text-xl">
                Subscribe to the newsletter for updates on new releases, events,
                and exclusive content.
              </p>
            </div>
            <div className="w-full max-w-md">
              <NewsletterSignup />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Preview */}
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                From the Blog
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Thoughts, writing tips, and behind-the-scenes insights.
              </p>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Blog post"
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardContent className="p-6">
                  <Badge className="mb-2">Writing Tips</Badge>
                  <h3 className="text-xl font-bold mb-2">
                    Finding Your Voice as a Writer
                  </h3>
                  <p className="text-muted-foreground">
                    Exploring the journey to discovering your unique writing
                    style and voice.
                  </p>
                  <Button variant="link" className="p-0 h-auto mt-4" asChild>
                    <Link href="#">
                      Read more <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card>
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Blog post"
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardContent className="p-6">
                  <Badge className="mb-2">Behind the Scenes</Badge>
                  <h3 className="text-xl font-bold mb-2">
                    The Research Process
                  </h3>
                  <p className="text-muted-foreground">
                    A look at how historical accuracy shapes the narrative in my
                    latest novel.
                  </p>
                  <Button variant="link" className="p-0 h-auto mt-4" asChild>
                    <Link href="#">
                      Read more <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card>
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Blog post"
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardContent className="p-6">
                  <Badge className="mb-2">Inspiration</Badge>
                  <h3 className="text-xl font-bold mb-2">
                    Literary Influences
                  </h3>
                  <p className="text-muted-foreground">
                    The authors and books that have shaped my writing journey
                    over the years.
                  </p>
                  <Button variant="link" className="p-0 h-auto mt-4" asChild>
                    <Link href="#">
                      Read more <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
