"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
const BlogPreview = () => {
  return (
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
                  Exploring the journey to discovering your unique writing style
                  and voice.
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
                <h3 className="text-xl font-bold mb-2">The Research Process</h3>
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
                <h3 className="text-xl font-bold mb-2">Literary Influences</h3>
                <p className="text-muted-foreground">
                  The authors and books that have shaped my writing journey over
                  the years.
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
  );
};

export default BlogPreview;
