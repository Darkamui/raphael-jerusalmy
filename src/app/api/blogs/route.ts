import { NextRequest, NextResponse } from "next/server";
import { DataService } from "@/lib/services/data.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "en";
    
    const dataService = DataService.getInstance();
    const blogs = await dataService.getBlogs(locale);
    
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}