"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { Blog } from "@/lib/types";

// Categories for filtering
// const categories = [
//   "All Categories",
//   "Writing Craft",
//   "Research",
//   "Behind the Scenes",
//   "Literary World",
//   "Publishing",
// ];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortOrder] = useState("newest");
  const [expandedPost, setExpandedPost] = useState<number | null>(null);

  const t = useTranslations("blog");
  const blogPosts = t.raw("items") as Blog[];
  const cta = t("cta");
  // Filter and sort posts
  const filteredPosts = blogPosts
    .filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All Categories" ||
        post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (sortOrder === "newest") {
        return dateB.getTime() - dateA.getTime();
      } else {
        return dateA.getTime() - dateB.getTime();
      }
    });

  const toggleExpand = (id: number) => {
    setExpandedPost(expandedPost === id ? null : id);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 bg-gradient-to-b from-primary/10 via-accent/5 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
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

          {/* Filters */}
          {/* <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search blog posts..."
                className="w-full pl-8 glass"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-4 items-center w-full md:w-auto">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full md:w-[180px] glass">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-full md:w-[180px] glass">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div> */}

          {/* Blog Posts */}
          <div className="space-y-8">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <BlogPostCard
                    post={post}
                    isExpanded={expandedPost === post.id}
                    onToggle={toggleExpand}
                    cta={cta}
                  />
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No blog posts found matching your criteria.
                </p>
                <Button
                  variant="link"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All Categories");
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

interface BlogPostCardProps {
  post: Blog;
  isExpanded: boolean;
  onToggle: (id: number) => void;
  cta: string;
}

function BlogPostCard({ post, isExpanded, onToggle, cta }: BlogPostCardProps) {
  return (
    <Card className="glass-card overflow-hidden">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-0">
          {/* Image */}
          <div className="relative h-60 md:h-full min-h-[200px] overflow-hidden">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover transition-transform hover:scale-105 duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 z-10"></div>
            <Badge className="absolute top-4 left-4 z-20 bg-accent text-accent-foreground">
              {post.category}
            </Badge>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col">
            <div className="flex items-center justify-between mb-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-2 gradient-text">
              {post.title}
            </h2>
            <h3 className="text-lg text-muted-foreground mb-4">
              {post.subtitle}
            </h3>

            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isExpanded ? 1 : 0,
                height: isExpanded ? "auto" : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-4"
            >
              <p className="text-muted-foreground">{post.description}</p>
            </motion.div>

            <div className="mt-auto flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                className="glass water-drop"
                asChild
              >
                <Link href={`/blog/${post.slug}`} className="flex items-center">
                  {cta} <ChevronRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
              <div className="flex">
                {post.url && (
                  <Button variant="ghost" size="sm" asChild>
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-muted-foreground"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggle(post.id)}
                  className="flex items-center text-muted-foreground"
                >
                  {isExpanded ? (
                    <>
                      Less <ChevronUp className="ml-1 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      More <ChevronDown className="ml-1 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
