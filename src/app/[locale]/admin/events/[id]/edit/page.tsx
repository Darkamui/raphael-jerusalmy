'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { eventFormSchema, type EventFormData } from '@/lib/validations/event';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField } from '@/components/admin/form-field';

interface Event {
  id: number;
  title: string;
  subtitle: string | null;
  location: string | null;
  date: string;
  link: string | null;
  featuredImage: string | null;
  locale: string;
  published: boolean;
}

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const eventId = params.id as string;

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingEvent, setIsLoadingEvent] = useState(true);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [events, setEvents] = useState<{ en: Event | null; fr: Event | null }>({
    en: null,
    fr: null,
  });
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    subtitle: '',
    location: '',
    date: '',
    link: '',
    featuredImage: '',
    published: true,
    // French version
    titleFr: '',
    subtitleFr: '',
    locationFr: '',
  });

  useEffect(() => {
    fetchEvents();
  }, [eventId]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchEvents = async () => {
    try {
      // Fetch both English and French versions
      const [enResponse, frResponse] = await Promise.all([
        fetch(`/api/admin/events/${eventId}?locale=en`),
        fetch(`/api/admin/events/${eventId}?locale=fr`),
      ]);

      const enEvent = enResponse.ok ? await enResponse.json() : null;
      const frEvent = frResponse.ok ? await frResponse.json() : null;

      setEvents({ en: enEvent, fr: frEvent });

      // Populate form data
      setFormData({
        title: enEvent?.title || '',
        subtitle: enEvent?.subtitle || '',
        location: enEvent?.location || '',
        date: enEvent?.date || '',
        link: enEvent?.link || '',
        featuredImage: enEvent?.featuredImage || '',
        published: enEvent?.published ?? true,
        titleFr: frEvent?.title || '',
        subtitleFr: frEvent?.subtitle || '',
        locationFr: frEvent?.location || '',
      });
    } catch (error) {
      console.error('Error fetching events:', error);
      alert('Failed to load event data');
    } finally {
      setIsLoadingEvent(false);
    }
  };

  const handleFieldChange = (field: keyof EventFormData, value: string | boolean) => {
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
      eventFormSchema.parse(formData);
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
      // Update English version
      if (events.en) {
        const enResponse = await fetch(`/api/admin/events/${events.en.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: formData.title,
            subtitle: formData.subtitle,
            location: formData.location,
            date: formData.date,
            link: formData.link,
            featuredImage: formData.featuredImage,
            published: formData.published,
          }),
        });

        if (!enResponse.ok) throw new Error('Failed to update English version');
      }

      // Update French version
      if (events.fr) {
        const frResponse = await fetch(`/api/admin/events/${events.fr.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: formData.titleFr,
            subtitle: formData.subtitleFr,
            location: formData.locationFr,
            date: formData.date,
            link: formData.link,
            featuredImage: formData.featuredImage,
            published: formData.published,
          }),
        });

        if (!frResponse.ok) throw new Error('Failed to update French version');
      }

      router.push(`/${locale}/admin/events`);
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to update event');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingEvent) {
    return <div className="p-8 text-center">Loading event...</div>;
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href={`/${locale}/admin/events`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Event</h1>
            <p className="text-gray-600 mt-1">Update event in both languages</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Common Information */}
          <Card>
            <CardHeader>
              <CardTitle>Event Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField 
                  id="date" 
                  label="Event Date" 
                  error={validationErrors.date}
                  required
                >
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleFieldChange('date', e.target.value)}
                    className={validationErrors.date ? 'border-red-500' : ''}
                  />
                </FormField>
                <FormField 
                  id="link" 
                  label="Event Link" 
                  error={validationErrors.link}
                >
                  <Input
                    id="link"
                    value={formData.link}
                    onChange={(e) => handleFieldChange('link', e.target.value)}
                    placeholder="https://example.com/event"
                    className={validationErrors.link ? 'border-red-500' : ''}
                  />
                </FormField>
              </div>

              <FormField 
                id="featuredImage" 
                label="Featured Image URL" 
                error={validationErrors.featuredImage}
              >
                <Input
                  id="featuredImage"
                  value={formData.featuredImage}
                  onChange={(e) => handleFieldChange('featuredImage', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className={validationErrors.featuredImage ? 'border-red-500' : ''}
                />
              </FormField>

              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => handleFieldChange('published', checked)}
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
              <FormField 
                id="title" 
                label="Title" 
                error={validationErrors.title}
                required
              >
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  placeholder="Enter event title"
                  className={validationErrors.title ? 'border-red-500' : ''}
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
                id="location" 
                label="Location" 
                error={validationErrors.location}
              >
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleFieldChange('location', e.target.value)}
                  placeholder="Event location"
                  className={validationErrors.location ? 'border-red-500' : ''}
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
                  onChange={(e) => handleFieldChange('titleFr', e.target.value)}
                  placeholder="Entrez le titre de l'événement"
                  className={validationErrors.titleFr ? 'border-red-500' : ''}
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
                id="locationFr" 
                label="Location (French)" 
                error={validationErrors.locationFr}
              >
                <Input
                  id="locationFr"
                  value={formData.locationFr}
                  onChange={(e) => handleFieldChange('locationFr', e.target.value)}
                  placeholder="Lieu de l'événement"
                  className={validationErrors.locationFr ? 'border-red-500' : ''}
                />
              </FormField>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Link href={`/${locale}/admin/events`}>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isLoading}>
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Updating...' : 'Update Event'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}