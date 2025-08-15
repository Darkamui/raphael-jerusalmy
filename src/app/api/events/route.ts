import { NextRequest, NextResponse } from "next/server";
import { DataService } from "@/lib/services/data.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "en";
    
    const dataService = DataService.getInstance();
    const events = await dataService.getEvents(locale);
    
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}