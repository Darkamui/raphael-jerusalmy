import { NextRequest, NextResponse } from "next/server";
import { DataService } from "@/lib/services/data.service";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "en";
    const { slug } = await params;
    
    const dataService = DataService.getInstance();
    const book = await dataService.getBookBySlug(slug, locale);
    
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }
    
    return NextResponse.json(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    return NextResponse.json({ error: "Failed to fetch book" }, { status: 500 });
  }
}