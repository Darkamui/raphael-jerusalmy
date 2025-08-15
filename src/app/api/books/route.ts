import { NextRequest, NextResponse } from "next/server";
import { DataService } from "@/lib/services/data.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "en";
    
    const dataService = DataService.getInstance();
    const books = await dataService.getBooks(locale);
    
    return NextResponse.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}