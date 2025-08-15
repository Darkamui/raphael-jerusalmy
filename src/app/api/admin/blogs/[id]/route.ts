import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { blogs } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = parseInt(params.id);
    
    // Get the current blog
    const blog = await db
      .select()
      .from(blogs)
      .where(eq(blogs.id, id))
      .limit(1);

    if (!blog[0]) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Find related blog (same originalId or this blog is the original)
    let related = null;
    if (blog[0].originalId) {
      // This is a translation, find the original
      related = await db
        .select()
        .from(blogs)
        .where(eq(blogs.id, blog[0].originalId))
        .limit(1);
    } else {
      // This is original, find translation
      related = await db
        .select()
        .from(blogs)
        .where(eq(blogs.originalId, blog[0].id))
        .limit(1);
    }

    return NextResponse.json({
      blog: blog[0],
      related: related?.[0] || null
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = parseInt(params.id);
    const data = await request.json();
    
    const result = await db
      .update(blogs)
      .set({
        title: data.title,
        subtitle: data.subtitle || null,
        excerpt: data.excerpt || null,
        content: data.content || null,
        description: data.description || null,
        image: data.image || null,
        category: data.category || null,
        slug: data.slug,
        readTime: data.readTime || null,
        date: data.date,
        published: data.published ?? true,
        updatedAt: new Date(),
      })
      .where(eq(blogs.id, id))
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = parseInt(params.id);
    
    // Delete the blog
    await db
      .delete(blogs)
      .where(eq(blogs.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}