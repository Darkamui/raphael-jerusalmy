import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { blogs } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return redirect('/admin/login');
    }

    const id = parseInt(params.id);
    
    // Get the blog to find related posts
    const blog = await db
      .select()
      .from(blogs)
      .where(eq(blogs.id, id))
      .limit(1);

    if (!blog[0]) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Delete related blog posts (translations)
    if (blog[0].originalId) {
      // This is a translation, also delete the original if it exists
      await db.delete(blogs).where(eq(blogs.id, blog[0].originalId));
    } else {
      // This is original, delete all translations
      await db.delete(blogs).where(eq(blogs.originalId, blog[0].id));
    }

    // Delete the current blog
    await db.delete(blogs).where(eq(blogs.id, id));

    // Redirect back to blogs list
    const referer = request.headers.get('referer');
    const locale = referer?.includes('/fr/') ? 'fr' : 'en';
    
    return redirect(`/${locale}/admin/blogs`);
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}