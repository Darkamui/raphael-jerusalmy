'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NewEventPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    location: '',
    date: '',
    link: '',
    published: true,
    // French version
    titleFr: '',
    subtitleFr: '',
    locationFr: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create English version
      const enResponse = await fetch('/api/admin/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          subtitle: formData.subtitle,
          location: formData.location,
          date: formData.date,
          link: formData.link,
          locale: 'en',
          published: formData.published,
        }),
      });

      if (!enResponse.ok) throw new Error('Failed to create English version');

      // Create French version
      const frResponse = await fetch('/api/admin/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.titleFr,
          subtitle: formData.subtitleFr,
          location: formData.locationFr,
          date: formData.date,
          link: formData.link,
          locale: 'fr',
          published: formData.published,
        }),
      });

      if (!frResponse.ok) throw new Error('Failed to create French version');

      router.push(`/${locale}/admin/events`);
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event');
    } finally {
      setIsLoading(false);
    }
  };

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
            <h1 className="text-3xl font-bold text-gray-900">New Event</h1>
            <p className="text-gray-600 mt-1">Create a new event in both languages</p>
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
                <div>
                  <Label htmlFor="date">Event Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="link">Event Link</Label>
                  <Input
                    id="link"
                    value={formData.link}
                    onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                    placeholder="https://example.com/event"
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
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter event title"
                  required
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
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Event location"
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
                  onChange={(e) => setFormData(prev => ({ ...prev, titleFr: e.target.value }))}
                  placeholder="Entrez le titre de l'événement"
                  required
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
                <Label htmlFor="locationFr">Location (French)</Label>
                <Input
                  id="locationFr"
                  value={formData.locationFr}
                  onChange={(e) => setFormData(prev => ({ ...prev, locationFr: e.target.value }))}
                  placeholder="Lieu de l'événement"
                />
              </div>
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
              {isLoading ? 'Creating...' : 'Create Event'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}