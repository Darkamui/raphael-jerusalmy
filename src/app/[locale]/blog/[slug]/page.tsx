import { DataService } from "@/lib/services/data.service";
import { BlogPostClient } from "./blog-post-client";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type Params = Promise<{ slug: string; locale: string }>;

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

  return <BlogPostClient post={post} relatedPosts={filteredPost} />;
}
