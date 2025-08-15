"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ExternalLink,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Blog } from "@/lib/types";
import { TiptapContent } from "@/components/tiptap-content";

interface BlogPostClientProps {
  post: Blog;
  relatedPosts: Blog[];
}

export function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const newsletterTexts = useTranslations("homepage.newsletter");

  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const title = post.title;
    const text = post.subtitle;

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            title
          )}&url=${encodeURIComponent(url)}`
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(
            text
          )}`
        );
        break;
      case "copy":
        try {
          await navigator.clipboard.writeText(url);
          toast.success("Link copied to clipboard!");
        } catch (err) {
          toast.error("Failed to copy link: " + err);
        }
        break;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="w-full py-8 bg-gradient-to-b from-primary/10 via-accent/5 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -60, x: -30 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Button variant="ghost" className="mb-6" asChild>
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
              </Link>
            </Button>

            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-accent text-accent-foreground">
                  {post.category}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground gap-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 gradient-text">
                {post.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {post.subtitle}
              </p>

              {/* Social Actions */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground mr-2">
                    Share:
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare("twitter")}
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare("facebook")}
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare("linkedin")}
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare("copy")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="w-full">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.9, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl mb-8">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 z-10"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="w-full py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, x: -80, y: 40 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              {/* External URL Reference */}
              {post.url && (
                <Card className="glass-card mb-8">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold mb-1">
                          External Reference
                        </h3>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="glass water-drop"
                        asChild
                      >
                        <a
                          href={post.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Source
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <div className="glass-card p-8">
                  <TiptapContent content={post.content || ""} />
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 100, y: 40 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              {/* Related Posts */}
              <Card className="glass-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Related Posts</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost, index) => (
                      <div
                        key={index}
                        className="border-b border-border/50 pb-4"
                      >
                        <h4 className="font-medium mb-1">
                          <Link
                            href={`/blog/${relatedPost.slug}`}
                            className="hover:text-primary"
                          >
                            {relatedPost.title}
                          </Link>
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {relatedPost.subtitle}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card className="glass-card wave-bg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">
                    {newsletterTexts("header.title")}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {newsletterTexts("header.subtitle")}
                  </p>
                  <Button className="w-full water-drop" asChild>
                    <Link href="/newsletter">
                      {newsletterTexts("form.buttonLabel")}
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