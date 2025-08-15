import { DataService } from "@/lib/services/data.service";
import { BookDetail } from "./book-detail";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type Params = Promise<{ slug: string; locale: string }>;

export default async function BookPage(props: { params: Params }) {
  const { slug, locale } = await props.params;

  const dataService = DataService.getInstance();
  const book = await dataService.getBookBySlug(slug, locale);

  if (!book) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Book Not Found</h1>
        <Button asChild>
          <Link href="/books">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Books
          </Link>
        </Button>
      </div>
    );
  }

  return <BookDetail book={book} />;
}
