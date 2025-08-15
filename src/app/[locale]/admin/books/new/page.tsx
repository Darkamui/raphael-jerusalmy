'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RichTextEditor } from '@/components/admin/rich-text-editor';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NewBookPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    slug: '',
    excerpt: '',
    summary: '',
    publisher: '',
    pages: '',
    year: '',
    isbn: '',
    coverImg: '',
    type: '',
    purchaseUrl: '',
    quotes: '',
    reviews: '',
    // French version
    titleFr: '',
    subtitleFr: '',
    slugFr: '',
    excerptFr: '',
    summaryFr: '',
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
      // Parse quotes and reviews as JSON arrays
      const parseJsonArray = (str: string) => {
        if (!str.trim()) return [];
        try {
          return str.split('\n').filter(line => line.trim()).map(line => line.trim());
        } catch {
          return [];
        }
      };

      // Create English version
      const enResponse = await fetch('/api/admin/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          subtitle: formData.subtitle,
          slug: formData.slug,
          excerpt: formData.excerpt,
          summary: formData.summary,
          publisher: formData.publisher,
          pages: formData.pages,
          year: formData.year,
          isbn: formData.isbn,
          coverImg: formData.coverImg,
          type: formData.type,
          purchaseUrl: formData.purchaseUrl,
          quotes: JSON.stringify(parseJsonArray(formData.quotes)),
          reviews: JSON.stringify(parseJsonArray(formData.reviews)),
          locale: 'en',
        }),
      });

      if (!enResponse.ok) throw new Error('Failed to create English version');

      // Create French version
      const frResponse = await fetch('/api/admin/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.titleFr,
          subtitle: formData.subtitleFr,
          slug: formData.slugFr,
          excerpt: formData.excerptFr,
          summary: formData.summaryFr,
          publisher: formData.publisher,
          pages: formData.pages,
          year: formData.year,
          isbn: formData.isbn,
          coverImg: formData.coverImg,
          type: formData.type,
          purchaseUrl: formData.purchaseUrl,
          quotes: JSON.stringify(parseJsonArray(formData.quotes)),
          reviews: JSON.stringify(parseJsonArray(formData.reviews)),
          locale: 'fr',
        }),
      });

      if (!frResponse.ok) throw new Error('Failed to create French version');

      router.push(`/${locale}/admin/books`);
    } catch (error) {
      console.error('Error creating book:', error);
      alert('Failed to create book');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href={`/${locale}/admin/books`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">New Book</h1>
            <p className="text-gray-600 mt-1">Add a new book to your catalog in both languages</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Common Information */}
          <Card>
            <CardHeader>
              <CardTitle>Book Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="publisher">Publisher</Label>
                  <Input
                    id="publisher"
                    value={formData.publisher}
                    onChange={(e) => setFormData(prev => ({ ...prev, publisher: e.target.value }))}
                    placeholder="Publisher name"
                  />
                </div>
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    value={formData.year}
                    onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                    placeholder="2024"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="pages">Pages</Label>
                  <Input
                    id="pages"
                    value={formData.pages}
                    onChange={(e) => setFormData(prev => ({ ...prev, pages: e.target.value }))}
                    placeholder="300"
                  />
                </div>
                <div>
                  <Label htmlFor="isbn">ISBN</Label>
                  <Input
                    id="isbn"
                    value={formData.isbn}
                    onChange={(e) => setFormData(prev => ({ ...prev, isbn: e.target.value }))}
                    placeholder="978-0-123456-78-9"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Input
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    placeholder="Novel, Non-fiction, etc."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="coverImg">Cover Image URL</Label>
                  <Input
                    id="coverImg"
                    value={formData.coverImg}
                    onChange={(e) => setFormData(prev => ({ ...prev, coverImg: e.target.value }))}
                    placeholder="https://example.com/cover.jpg"
                  />
                </div>
                <div>
                  <Label htmlFor="purchaseUrl">Purchase URL</Label>
                  <Input
                    id="purchaseUrl"
                    value={formData.purchaseUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, purchaseUrl: e.target.value }))}
                    placeholder="https://example.com/buy"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="quotes">Quotes (one per line)</Label>
                <Textarea
                  id="quotes"
                  value={formData.quotes}
                  onChange={(e) => setFormData(prev => ({ ...prev, quotes: e.target.value }))}
                  placeholder="Enter quotes, one per line"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="reviews">Reviews (one per line)</Label>
                <Textarea
                  id="reviews"
                  value={formData.reviews}
                  onChange={(e) => setFormData(prev => ({ ...prev, reviews: e.target.value }))}
                  placeholder="Enter reviews, one per line"
                  rows={4}
                />
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
                  placeholder="Enter book title"
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
                  placeholder="Brief excerpt or description"
                  rows={3}
                />
              </div>

              <div>
                <Label>Summary</Label>
                <RichTextEditor
                  content={formData.summary}
                  onChange={(content) => setFormData(prev => ({ ...prev, summary: content }))}
                  placeholder="Write the book summary..."
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
                  placeholder="Entrez le titre du livre"
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
                  placeholder="Extrait ou description brève"
                  rows={3}
                />
              </div>

              <div>
                <Label>Summary (French)</Label>
                <RichTextEditor
                  content={formData.summaryFr}
                  onChange={(content) => setFormData(prev => ({ ...prev, summaryFr: content }))}
                  placeholder="Écrivez le résumé du livre..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Link href={`/${locale}/admin/books`}>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isLoading}>
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Creating...' : 'Create Book'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}