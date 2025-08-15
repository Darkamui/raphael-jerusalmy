import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { books } from '@/lib/schema';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const allBooks = await db
      .select()
      .from(books)
      .orderBy(books.createdAt);

    return NextResponse.json(allBooks);
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
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
      .insert(books)
      .values({
        title: data.title,
        subtitle: data.subtitle || null,
        excerpt: data.excerpt || null,
        summary: data.summary || null,
        publisher: data.publisher || null,
        pages: data.pages || null,
        year: data.year || null,
        isbn: data.isbn || null,
        coverImg: data.coverImg || null,
        type: data.type || null,
        slug: data.slug,
        purchaseUrl: data.purchaseUrl || null,
        quotes: data.quotes || null,
        reviews: data.reviews || null,
        locale: data.locale,
      })
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error creating book:', error);
    return NextResponse.json({ error: 'Failed to create book' }, { status: 500 });
  }
}