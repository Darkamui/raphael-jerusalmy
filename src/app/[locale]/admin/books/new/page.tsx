'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { bookFormSchema, sanitizeBookInput, type BookFormData } from '@/lib/validations/book';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RichTextEditor } from '@/components/admin/rich-text-editor';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField } from '@/components/admin/form-field';

export default function NewBookPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<BookFormData>({
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
    return sanitizeBookInput(title)
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
    
    // Clear validation errors for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        delete newErrors[slugField];
        return newErrors;
      });
    }
  };

  const handleFieldChange = (field: keyof BookFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    try {
      bookFormSchema.parse(formData);
      setValidationErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path.length > 0) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setValidationErrors(errors);
        return;
      }
    }
    
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
          quotes: JSON.stringify(parseJsonArray(formData.quotes || '')),
          reviews: JSON.stringify(parseJsonArray(formData.reviews || '')),
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
          quotes: JSON.stringify(parseJsonArray(formData.quotes || '')),
          reviews: JSON.stringify(parseJsonArray(formData.reviews || '')),
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
                <FormField 
                  id="publisher" 
                  label="Publisher" 
                  error={validationErrors.publisher}
                  required
                >
                  <Input
                    id="publisher"
                    value={formData.publisher}
                    onChange={(e) => handleFieldChange('publisher', e.target.value)}
                    placeholder="Publisher name"
                    className={validationErrors.publisher ? 'border-red-500' : ''}
                  />
                </FormField>
                <FormField 
                  id="year" 
                  label="Year" 
                  error={validationErrors.year}
                  required
                >
                  <Input
                    id="year"
                    value={formData.year}
                    onChange={(e) => handleFieldChange('year', e.target.value)}
                    placeholder="2024"
                    className={validationErrors.year ? 'border-red-500' : ''}
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField 
                  id="pages" 
                  label="Pages" 
                  error={validationErrors.pages}
                  required
                >
                  <Input
                    id="pages"
                    value={formData.pages}
                    onChange={(e) => handleFieldChange('pages', e.target.value)}
                    placeholder="300"
                    className={validationErrors.pages ? 'border-red-500' : ''}
                  />
                </FormField>
                <FormField 
                  id="isbn" 
                  label="ISBN" 
                  error={validationErrors.isbn}
                >
                  <Input
                    id="isbn"
                    value={formData.isbn}
                    onChange={(e) => handleFieldChange('isbn', e.target.value)}
                    placeholder="978-0-123456-78-9"
                    className={validationErrors.isbn ? 'border-red-500' : ''}
                  />
                </FormField>
                <FormField 
                  id="type" 
                  label="Type" 
                  error={validationErrors.type}
                  required
                >
                  <Input
                    id="type"
                    value={formData.type}
                    onChange={(e) => handleFieldChange('type', e.target.value)}
                    placeholder="Novel, Non-fiction, etc."
                    className={validationErrors.type ? 'border-red-500' : ''}
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField 
                  id="coverImg" 
                  label="Cover Image URL" 
                  error={validationErrors.coverImg}
                >
                  <Input
                    id="coverImg"
                    value={formData.coverImg}
                    onChange={(e) => handleFieldChange('coverImg', e.target.value)}
                    placeholder="https://example.com/cover.jpg"
                    className={validationErrors.coverImg ? 'border-red-500' : ''}
                  />
                </FormField>
                <FormField 
                  id="purchaseUrl" 
                  label="Purchase URL" 
                  error={validationErrors.purchaseUrl}
                >
                  <Input
                    id="purchaseUrl"
                    value={formData.purchaseUrl}
                    onChange={(e) => handleFieldChange('purchaseUrl', e.target.value)}
                    placeholder="https://example.com/buy"
                    className={validationErrors.purchaseUrl ? 'border-red-500' : ''}
                  />
                </FormField>
              </div>

              <FormField 
                id="quotes" 
                label="Quotes (one per line)" 
                error={validationErrors.quotes}
              >
                <Textarea
                  id="quotes"
                  value={formData.quotes}
                  onChange={(e) => handleFieldChange('quotes', e.target.value)}
                  placeholder="Enter quotes, one per line"
                  rows={4}
                  className={validationErrors.quotes ? 'border-red-500' : ''}
                />
              </FormField>

              <FormField 
                id="reviews" 
                label="Reviews (one per line)" 
                error={validationErrors.reviews}
              >
                <Textarea
                  id="reviews"
                  value={formData.reviews}
                  onChange={(e) => handleFieldChange('reviews', e.target.value)}
                  placeholder="Enter reviews, one per line"
                  rows={4}
                  className={validationErrors.reviews ? 'border-red-500' : ''}
                />
              </FormField>
            </CardContent>
          </Card>

          {/* English Version */}
          <Card>
            <CardHeader>
              <CardTitle>English Version</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField 
                id="title" 
                label="Title" 
                error={validationErrors.title}
                required
              >
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange('title', e.target.value)}
                  placeholder="Enter book title"
                  className={validationErrors.title ? 'border-red-500' : ''}
                />
              </FormField>

              <FormField 
                id="slug" 
                label="Slug" 
                error={validationErrors.slug}
                required
              >
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleFieldChange('slug', e.target.value)}
                  placeholder="auto-generated-from-title"
                  className={validationErrors.slug ? 'border-red-500' : ''}
                />
              </FormField>

              <FormField 
                id="subtitle" 
                label="Subtitle" 
                error={validationErrors.subtitle}
              >
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => handleFieldChange('subtitle', e.target.value)}
                  placeholder="Optional subtitle"
                  className={validationErrors.subtitle ? 'border-red-500' : ''}
                />
              </FormField>

              <FormField 
                id="excerpt" 
                label="Excerpt" 
                error={validationErrors.excerpt}
              >
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => handleFieldChange('excerpt', e.target.value)}
                  placeholder="Brief excerpt or description"
                  rows={3}
                  className={validationErrors.excerpt ? 'border-red-500' : ''}
                />
              </FormField>

              <FormField 
                id="summary" 
                label="Summary" 
                error={validationErrors.summary}
                required
              >
                <RichTextEditor
                  content={formData.summary}
                  onChange={(content) => handleFieldChange('summary', content)}
                  placeholder="Write the book summary..."
                />
              </FormField>
            </CardContent>
          </Card>

          {/* French Version */}
          <Card>
            <CardHeader>
              <CardTitle>French Version</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField 
                id="titleFr" 
                label="Title (French)" 
                error={validationErrors.titleFr}
                required
              >
                <Input
                  id="titleFr"
                  value={formData.titleFr}
                  onChange={(e) => handleTitleChange('titleFr', e.target.value)}
                  placeholder="Entrez le titre du livre"
                  className={validationErrors.titleFr ? 'border-red-500' : ''}
                />
              </FormField>

              <FormField 
                id="slugFr" 
                label="Slug (French)" 
                error={validationErrors.slugFr}
                required
              >
                <Input
                  id="slugFr"
                  value={formData.slugFr}
                  onChange={(e) => handleFieldChange('slugFr', e.target.value)}
                  placeholder="auto-genere-du-titre"
                  className={validationErrors.slugFr ? 'border-red-500' : ''}
                />
              </FormField>

              <FormField 
                id="subtitleFr" 
                label="Subtitle (French)" 
                error={validationErrors.subtitleFr}
              >
                <Input
                  id="subtitleFr"
                  value={formData.subtitleFr}
                  onChange={(e) => handleFieldChange('subtitleFr', e.target.value)}
                  placeholder="Sous-titre optionnel"
                  className={validationErrors.subtitleFr ? 'border-red-500' : ''}
                />
              </FormField>

              <FormField 
                id="excerptFr" 
                label="Excerpt (French)" 
                error={validationErrors.excerptFr}
              >
                <Textarea
                  id="excerptFr"
                  value={formData.excerptFr}
                  onChange={(e) => handleFieldChange('excerptFr', e.target.value)}
                  placeholder="Extrait ou description brève"
                  rows={3}
                  className={validationErrors.excerptFr ? 'border-red-500' : ''}
                />
              </FormField>

              <FormField 
                id="summaryFr" 
                label="Summary (French)" 
                error={validationErrors.summaryFr}
                required
              >
                <RichTextEditor
                  content={formData.summaryFr}
                  onChange={(content) => handleFieldChange('summaryFr', content)}
                  placeholder="Écrivez le résumé du livre..."
                />
              </FormField>
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