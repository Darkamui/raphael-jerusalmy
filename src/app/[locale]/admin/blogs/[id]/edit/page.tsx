'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { RichTextEditor } from '@/components/admin/rich-text-editor';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BlogPost {
  id: number;
  title: string;
  subtitle: string | null;
  slug: string;
  excerpt: string | null;
  content: string | null;
  description: string | null;
  image: string | null;
  url: string | null;
  category: string | null;
  readTime: string | null;
  date: string;
  locale: string;
  published: boolean | null;
  originalId: number | null;
}

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const id = params.id as string;

  const [isLoading, setIsLoading] = useState(false);
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [relatedBlog, setRelatedBlog] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    slug: '',
    excerpt: '',
    content: '',
    description: '',
    image: '',
    url: '',
    category: '',
    readTime: '',
    date: '',
    published: true,
    // Related blog (other language)
    relatedTitle: '',
    relatedSubtitle: '',
    relatedSlug: '',
    relatedExcerpt: '',
    relatedContent: '',
    relatedDescription: '',
  });

  useEffect(() => {
    const fetchBlogData = async () => {
    try {
      const response = await fetch(`/api/admin/blogs/${id}`);
      if (response.ok) {
        const blogData = await response.json();
        setBlog(blogData.blog);
        setRelatedBlog(blogData.related);
        
        setFormData({
          title: blogData.blog.title || '',
          subtitle: blogData.blog.subtitle || '',
          slug: blogData.blog.slug || '',
          excerpt: blogData.blog.excerpt || '',
          content: blogData.blog.content || '',
          description: blogData.blog.description || '',
          image: blogData.blog.image || '',
          url: blogData.blog.url || '',
          category: blogData.blog.category || '',
          readTime: blogData.blog.readTime || '',
          date: blogData.blog.date || '',
          published: blogData.blog.published ?? true,
          relatedTitle: blogData.related?.title || '',
          relatedSubtitle: blogData.related?.subtitle || '',
          relatedSlug: blogData.related?.slug || '',
          relatedExcerpt: blogData.related?.excerpt || '',
          relatedContent: blogData.related?.content || '',
          relatedDescription: blogData.related?.description || '',
        });
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
    }
    };

    fetchBlogData();
  }, [id]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      title: value,
      slug: generateSlug(value)
    }));
  };

  const handleRelatedTitleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      relatedTitle: value,
      relatedSlug: generateSlug(value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Update current blog
      const response = await fetch(`/api/admin/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          subtitle: formData.subtitle,
          slug: formData.slug,
          excerpt: formData.excerpt,
          content: formData.content,
          description: formData.description,
          image: formData.image,
          url: formData.url,
          category: formData.category,
          readTime: formData.readTime,
          date: formData.date,
          published: formData.published,
        }),
      });

      if (!response.ok) throw new Error('Failed to update blog');

      // Update related blog if it exists
      if (relatedBlog) {
        const relatedResponse = await fetch(`/api/admin/blogs/${relatedBlog.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: formData.relatedTitle,
            subtitle: formData.relatedSubtitle,
            slug: formData.relatedSlug,
            excerpt: formData.relatedExcerpt,
            content: formData.relatedContent,
            description: formData.relatedDescription,
            image: formData.image,
            url: formData.url,
            category: formData.category,
            readTime: formData.readTime,
            date: formData.date,
            published: formData.published,
          }),
        });

        if (!relatedResponse.ok) throw new Error('Failed to update related blog');
      }

      router.push(`/${locale}/admin/blogs`);
    } catch (error) {
      console.error('Error updating blog post:', error);
      alert('Failed to update blog post');
    } finally {
      setIsLoading(false);
    }
  };

  if (!blog) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  const isEnglish = blog.locale === 'en';
  const otherLanguage = isEnglish ? 'French' : 'English';

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href={`/${locale}/admin/blogs`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Blog Post</h1>
            <p className="text-gray-600 mt-1">Update blog post in both languages</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Common Fields */}
          <Card>
            <CardHeader>
              <CardTitle>Common Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="Technology, Personal, etc."
                  />
                </div>
                <div>
                  <Label htmlFor="readTime">Read Time</Label>
                  <Input
                    id="readTime"
                    value={formData.readTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, readTime: e.target.value }))}
                    placeholder="5 min read"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Publication Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="image">Featured Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="url">Blog Post URL</Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="https://example.com/blog-post"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
                />
                <Label htmlFor="published">Published</Label>
              </div>
            </CardContent>
          </Card>

          {/* Current Language Version */}
          <Card>
            <CardHeader>
              <CardTitle>{blog.locale.toUpperCase()} Version</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter blog post title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="auto-generated-from-title"
                />
              </div>

              <div>
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                  placeholder="Optional subtitle"
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Brief description for previews"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="description">Meta Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="SEO meta description"
                  rows={2}
                />
              </div>

              <div>
                <Label>Content *</Label>
                <RichTextEditor
                  content={formData.content}
                  onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                  placeholder="Write your blog post content..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Related Language Version */}
          {relatedBlog && (
            <Card>
              <CardHeader>
                <CardTitle>{otherLanguage} Version</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="relatedTitle">Title ({otherLanguage}) *</Label>
                  <Input
                    id="relatedTitle"
                    value={formData.relatedTitle}
                    onChange={(e) => handleRelatedTitleChange(e.target.value)}
                    placeholder={`Enter blog post title in ${otherLanguage.toLowerCase()}`}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="relatedSlug">Slug ({otherLanguage})</Label>
                  <Input
                    id="relatedSlug"
                    value={formData.relatedSlug}
                    onChange={(e) => setFormData(prev => ({ ...prev, relatedSlug: e.target.value }))}
                    placeholder="auto-generated-from-title"
                  />
                </div>

                <div>
                  <Label htmlFor="relatedSubtitle">Subtitle ({otherLanguage})</Label>
                  <Input
                    id="relatedSubtitle"
                    value={formData.relatedSubtitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, relatedSubtitle: e.target.value }))}
                    placeholder="Optional subtitle"
                  />
                </div>

                <div>
                  <Label htmlFor="relatedExcerpt">Excerpt ({otherLanguage})</Label>
                  <Textarea
                    id="relatedExcerpt"
                    value={formData.relatedExcerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, relatedExcerpt: e.target.value }))}
                    placeholder="Brief description for previews"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="relatedDescription">Meta Description ({otherLanguage})</Label>
                  <Textarea
                    id="relatedDescription"
                    value={formData.relatedDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, relatedDescription: e.target.value }))}
                    placeholder="SEO meta description"
                    rows={2}
                  />
                </div>

                <div>
                  <Label>Content ({otherLanguage}) *</Label>
                  <RichTextEditor
                    content={formData.relatedContent}
                    onChange={(content) => setFormData(prev => ({ ...prev, relatedContent: content }))}
                    placeholder={`Write your blog post content in ${otherLanguage.toLowerCase()}...`}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Link href={`/${locale}/admin/blogs`}>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isLoading}>
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Updating...' : 'Update Blog Post'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}