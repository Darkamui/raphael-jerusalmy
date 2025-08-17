import { DataService } from "@/lib/services/data.service";
import { BlogPostClient } from "./blog-post-client";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { APP_CONFIG } from "@/lib/constants";
import { generateArticleSchema } from "@/lib/utils/structured-data";

type Params = Promise<{ slug: string; locale: string }>;

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const { slug, locale } = await props.params;
  const dataService = DataService.getInstance();
  const post = await dataService.getBlogBySlug(slug, locale);

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const baseUrl = APP_CONFIG.url;
  const currentUrl = `${baseUrl}/${locale}/blog/${slug}`;
  const imageUrl = post.image ? 
    (post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`) : 
    `${baseUrl}/placeholder.svg`;

  return {
    title: post.title,
    description: post.subtitle || post.content?.substring(0, 160) || "Read this article by Raphaël Jerusalmy",
    keywords: [post.category, "Raphaël Jerusalmy", "blog", "article", locale === 'fr' ? 'français' : 'english'].filter(Boolean),
    authors: [{ name: "Raphaël Jerusalmy" }],
    creator: "Raphaël Jerusalmy",
    publisher: "Raphaël Jerusalmy",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${baseUrl}/en/blog/${slug}`,
        fr: `${baseUrl}/fr/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.subtitle || post.content?.substring(0, 160) || "Read this article by Raphaël Jerusalmy",
      url: currentUrl,
      siteName: APP_CONFIG.name,
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updatedAt ? (typeof post.updatedAt === 'string' ? post.updatedAt : post.updatedAt.toISOString()) : post.date,
      authors: ['Raphaël Jerusalmy'],
      section: post.category,
      tags: [post.category],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.subtitle || post.content?.substring(0, 160) || "Read this article by Raphaël Jerusalmy",
      images: [imageUrl],
      creator: '@raphaeljerusalmy',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function BlogPostPage(props: { params: Params }) {
  const { slug, locale } = await props.params;

  const dataService = DataService.getInstance();
  const post = await dataService.getBlogBySlug(slug, locale);
  const posts = await dataService.getBlogs(locale);
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

  const filteredPost = posts.filter((item) => item.id !== post.id).slice(0, 3);

  // Generate structured data for SEO
  const articleSchema = generateArticleSchema(post, locale);

  return (
    <>
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogPostClient post={post} relatedPosts={filteredPost} />
    </>
  );
}
