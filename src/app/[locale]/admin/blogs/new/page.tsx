'use client';

import { useState } from 'react';
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

export default function NewBlogPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    slug: '',
    excerpt: '',
    content: '',
    description: '',
    image: '',
    category: '',
    readTime: '',
    date: new Date().toISOString().split('T')[0],
    published: true,
    // Both locales
    titleFr: '',
    subtitleFr: '',
    slugFr: '',
    excerptFr: '',
    contentFr: '',
    descriptionFr: '',
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (field: 'title' | 'titleFr', value: string) => {
    const slugField = field === 'title' ? 'slug' : 'slugFr';
    setFormData(prev => ({
      ...prev,
      [field]: value,
      [slugField]: generateSlug(value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create English version
      const enResponse = await fetch('/api/admin/blogs', {
        method: 'POST',
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
          category: formData.category,
          readTime: formData.readTime,
          date: formData.date,
          locale: 'en',
          published: formData.published,
        }),
      });

      if (!enResponse.ok) throw new Error('Failed to create English version');
      const enResult = await enResponse.json();

      // Create French version
      const frResponse = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          originalId: enResult.id,
          title: formData.titleFr,
          subtitle: formData.subtitleFr,
          slug: formData.slugFr,
          excerpt: formData.excerptFr,
          content: formData.contentFr,
          description: formData.descriptionFr,
          image: formData.image,
          category: formData.category,
          readTime: formData.readTime,
          date: formData.date,
          locale: 'fr',
          published: formData.published,
        }),
      });

      if (!frResponse.ok) throw new Error('Failed to create French version');

      router.push(`/${locale}/admin/blogs`);
    } catch (error) {
      console.error('Error creating blog post:', error);
      alert('Failed to create blog post');
    } finally {
      setIsLoading(false);
    }
  };

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
            <h1 className="text-3xl font-bold text-gray-900">New Blog Post</h1>
            <p className="text-gray-600 mt-1">Create a new blog post in both languages</p>
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

              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
                />
                <Label htmlFor="published">Publish immediately</Label>
              </div>
            </CardContent>
          </Card>

          {/* English Version */}
          <Card>
            <CardHeader>
              <CardTitle>English Version</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange('title', e.target.value)}
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

          {/* French Version */}
          <Card>
            <CardHeader>
              <CardTitle>French Version</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="titleFr">Title (French) *</Label>
                <Input
                  id="titleFr"
                  value={formData.titleFr}
                  onChange={(e) => handleTitleChange('titleFr', e.target.value)}
                  placeholder="Entrez le titre du blog"
                  required
                />
              </div>

              <div>
                <Label htmlFor="slugFr">Slug (French)</Label>
                <Input
                  id="slugFr"
                  value={formData.slugFr}
                  onChange={(e) => setFormData(prev => ({ ...prev, slugFr: e.target.value }))}
                  placeholder="auto-genere-du-titre"
                />
              </div>

              <div>
                <Label htmlFor="subtitleFr">Subtitle (French)</Label>
                <Input
                  id="subtitleFr"
                  value={formData.subtitleFr}
                  onChange={(e) => setFormData(prev => ({ ...prev, subtitleFr: e.target.value }))}
                  placeholder="Sous-titre optionnel"
                />
              </div>

              <div>
                <Label htmlFor="excerptFr">Excerpt (French)</Label>
                <Textarea
                  id="excerptFr"
                  value={formData.excerptFr}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerptFr: e.target.value }))}
                  placeholder="Description brève pour les aperçus"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="descriptionFr">Meta Description (French)</Label>
                <Textarea
                  id="descriptionFr"
                  value={formData.descriptionFr}
                  onChange={(e) => setFormData(prev => ({ ...prev, descriptionFr: e.target.value }))}
                  placeholder="Description meta SEO"
                  rows={2}
                />
              </div>

              <div>
                <Label>Content (French) *</Label>
                <RichTextEditor
                  content={formData.contentFr}
                  onChange={(content) => setFormData(prev => ({ ...prev, contentFr: content }))}
                  placeholder="Écrivez le contenu de votre article de blog..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Link href={`/${locale}/admin/blogs`}>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isLoading}>
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Creating...' : 'Create Blog Post'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}