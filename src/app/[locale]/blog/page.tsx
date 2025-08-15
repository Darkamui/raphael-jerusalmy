import { DataService } from "@/lib/services/data.service";
import { BlogClient } from "./blog-client";

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const dataService = DataService.getInstance();
  const blogPosts = await dataService.getBlogs(locale);

  return <BlogClient blogPosts={blogPosts} />;
}
