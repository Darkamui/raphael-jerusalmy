import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { blogs } from '@/lib/schema';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const allBlogs = await db
      .select()
      .from(blogs)
      .orderBy(blogs.createdAt);

    return NextResponse.json(allBlogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    const result = await db
      .insert(blogs)
      .values({
        originalId: data.originalId || null,
        title: data.title,
        subtitle: data.subtitle || null,
        excerpt: data.excerpt || null,
        content: data.content || null,
        description: data.description || null,
        image: data.image || null,
        url: data.url || null,
        category: data.category || null,
        slug: data.slug,
        readTime: data.readTime || null,
        date: data.date,
        locale: data.locale,
        published: data.published ?? true,
      })
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}