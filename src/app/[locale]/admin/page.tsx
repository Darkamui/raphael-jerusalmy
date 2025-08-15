import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { LogOut, FileText, Calendar, Book } from 'lucide-react';
import Link from 'next/link';

interface AdminDashboardProps {
  params: { locale: string };
}

export default async function AdminDashboard({ params }: AdminDashboardProps) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, {session.user?.name}</p>
          </div>
          <form action="/api/auth/signout" method="post">
            <Button type="submit" variant="outline" className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </form>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href={`/${locale}/admin/blogs`}>
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Blog Posts</h3>
                  <p className="text-sm text-gray-600">Manage blog content</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href={`/${locale}/admin/events`}>
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calendar className="w-8 h-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Events</h3>
                  <p className="text-sm text-gray-600">Manage upcoming events</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href={`/${locale}/admin/books`}>
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Book className="w-8 h-8 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Books</h3>
                  <p className="text-sm text-gray-600">Manage book catalog</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href={`/${locale}/admin/blogs/new`}>
              <Button className="justify-start h-auto p-4 w-full" variant="outline">
                <FileText className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">New Blog Post</div>
                  <div className="text-sm text-gray-500">Create a new blog article</div>
                </div>
              </Button>
            </Link>
            
            <Link href={`/${locale}/admin/events/new`}>
              <Button className="justify-start h-auto p-4 w-full" variant="outline">
                <Calendar className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">New Event</div>
                  <div className="text-sm text-gray-500">Schedule a new event</div>
                </div>
              </Button>
            </Link>
            
            <Link href={`/${locale}/admin/books/new`}>
              <Button className="justify-start h-auto p-4 w-full" variant="outline">
                <Book className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">New Book</div>
                  <div className="text-sm text-gray-500">Add a new book</div>
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}