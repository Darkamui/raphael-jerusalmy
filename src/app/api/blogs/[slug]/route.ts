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
    const blog = await dataService.getBlogBySlug(slug, locale);
    
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    
    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}