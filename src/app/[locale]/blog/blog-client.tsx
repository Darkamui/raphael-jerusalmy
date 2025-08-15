"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Blog } from "@/lib/types";
import {
  staggerContainer,
  staggerItem,
  fadeInUp,
} from "@/lib/utils/animations";
import Image from "next/image";

interface BlogClientProps {
  blogPosts: Blog[];
}

export function BlogClient({ blogPosts }: BlogClientProps) {
  const [searchTerm] = useState("");
  const [selectedCategory] = useState<string | null>(null);
  const t = useTranslations("blog");

  // // Get unique categories
  // const categories = Array.from(
  //   new Set(blogPosts.map((post) => post.category).filter(Boolean))
  // );

  const containerAnimation = staggerContainer();
  const headerAnimation = fadeInUp();

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

      {/* Blog Posts Grid */}
      <section className="w-full py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            {blogPosts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-muted-foreground">
                  {searchTerm || selectedCategory
                    ? "No articles match your search criteria."
                    : "No articles available at the moment."}
                </p>
              </motion.div>
            ) : (
              <motion.div
                {...containerAnimation}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {blogPosts.map((post) => (
                  <motion.div key={post.slug} {...staggerItem}>
                    <Card className="group h-full overflow-hidden glass-card hover:shadow-xl transition-all duration-300">
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-accent text-accent-foreground">
                            {post.category}
                          </Badge>
                        </div>
                      </div>

                      <CardContent className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>

                        <p className="text-muted-foreground text-sm mb-4 flex-1">
                          {post.subtitle}
                        </p>

                        <Button
                          variant="ghost"
                          className="self-start p-3 h-auto"
                          asChild
                        >
                          <Link href={`/blog/${post.slug}`}>Read more →</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
