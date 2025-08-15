import { DataService } from "@/lib/services/data.service";
import { BooksClient } from "./books-client";

interface BooksPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BooksPage({ params }: BooksPageProps) {
  const { locale } = await params;
  const dataService = DataService.getInstance();
  const books = await dataService.getBooks(locale);
  
  return <BooksClient books={books} />;
}
