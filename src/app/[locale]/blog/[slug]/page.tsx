"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ExternalLink,
  Bookmark,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

type Params = Promise<{ slug: string }>;

type Blog = {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  url: string;
  category: string;
  subtitle: string;
  description: string;
  image: string;
  readTime: string;
  slug: string;
  content: string;
};

export default function BlogPostPage(props: { params: Params }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { slug } = use(props.params);

  const posts = useTranslations().raw("blog.items") as Blog[];
  const post = posts.find((b) => b.slug === slug) ?? posts[0];

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
        <Button asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </Button>
      </div>
    );
  }

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

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(
      isBookmarked ? "Removed from bookmarks" : "Added to bookmarks"
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="w-full py-8 bg-gradient-to-b from-primary/10 via-accent/5 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
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
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="glass water-drop"
                    onClick={toggleBookmark}
                  >
                    <Bookmark
                      className={`h-4 w-4 mr-2 ${
                        isBookmarked ? "fill-current" : ""
                      }`}
                    />
                    {isBookmarked ? "Bookmarked" : "Bookmark"}
                  </Button>
                </div>

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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
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
                        {/* <p className="text-sm text-muted-foreground">
                          {post.url}
                        </p> */}
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
                <div className="glass-card p-8">{post.content}</div>
              </div>

              {/* Tags */}
              {/* <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="glass">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div> */}

              <Separator className="my-8" />

              {/* Author Bio */}
              {/* <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src="/placeholder.svg?height=64&width=64"
                        alt={post.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        {post.author}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Award-winning novelist with a passion for storytelling
                        and exploring the depths of human experience. Author of
                        multiple bestselling novels including "The Silent Echo"
                        and "Beyond the Horizon."
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="glass water-drop"
                        asChild
                      >
                        <Link href="/about">
                          View Author Profile{" "}
                          <ChevronRight className="ml-2 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>*/}
            </motion.div>

            {/* Sidebar */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* Table of Contents */}
              {/* <Card className="glass-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Table of Contents
                  </h3>
                  <nav className="space-y-2">
                    <a
                      href="#introduction"
                      className="block text-sm text-muted-foreground hover:text-primary"
                    >
                      Introduction
                    </a>
                    <a
                      href="#understanding-character-motivation"
                      className="block text-sm text-muted-foreground hover:text-primary"
                    >
                      Understanding Character Motivation
                    </a>
                    <a
                      href="#creating-authentic-flaws"
                      className="block text-sm text-muted-foreground hover:text-primary"
                    >
                      Creating Authentic Flaws
                    </a>
                    <a
                      href="#the-power-of-contradiction"
                      className="block text-sm text-muted-foreground hover:text-primary"
                    >
                      The Power of Contradiction
                    </a>
                    <a
                      href="#dialogue-as-character-revelation"
                      className="block text-sm text-muted-foreground hover:text-primary"
                    >
                      Dialogue as Character Revelation
                    </a>
                    <a
                      href="#character-arcs-and-growth"
                      className="block text-sm text-muted-foreground hover:text-primary"
                    >
                      Character Arcs and Growth
                    </a>
                    <a
                      href="#research-and-observation"
                      className="block text-sm text-muted-foreground hover:text-primary"
                    >
                      Research and Observation
                    </a>
                    <a
                      href="#conclusion"
                      className="block text-sm text-muted-foreground hover:text-primary"
                    >
                      Conclusion
                    </a>
                  </nav>
                </CardContent>
              </Card> */}

              {/* Related Posts */}
              <Card className="glass-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Related Posts</h3>
                  <div className="space-y-4">
                    <div className="border-b border-border/50 pb-4">
                      <h4 className="font-medium mb-1">
                        <Link
                          href="/blog/writing-voice"
                          className="hover:text-primary"
                        >
                          Finding Your Voice as a Writer
                        </Link>
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Developing your unique writing style and perspective
                      </p>
                    </div>
                    <div className="border-b border-border/50 pb-4">
                      <h4 className="font-medium mb-1">
                        <Link
                          href="/blog/historical-research"
                          className="hover:text-primary"
                        >
                          Research Methods for Historical Fiction
                        </Link>
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        How to bring authenticity to your historical settings
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">
                        <Link
                          href="/blog/silent-echo-journey"
                          className="hover:text-primary"
                        >
                          Behind the Scenes: The Silent Echo
                        </Link>
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        The inspiration and journey behind my latest novel
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card className="glass-card wave-bg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get notified when new blog posts are published.
                  </p>
                  <Button className="w-full water-drop" asChild>
                    <Link href="/newsletter">Subscribe to Newsletter</Link>
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
