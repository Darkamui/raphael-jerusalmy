import { DataService } from "@/lib/services/data.service";
import { BookDetail } from "./book-detail";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { APP_CONFIG } from "@/lib/constants";
import { generateBookSchema } from "@/lib/utils/structured-data";

type Params = Promise<{ slug: string; locale: string }>;

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const { slug, locale } = await props.params;
  const dataService = DataService.getInstance();
  const book = await dataService.getBookBySlug(slug, locale);

  if (!book) {
    return {
      title: "Book Not Found",
      description: "The requested book could not be found.",
    };
  }

  const baseUrl = APP_CONFIG.url;
  const currentUrl = `${baseUrl}/${locale}/books/${slug}`;
  const imageUrl = book.cover ? 
    (book.cover.startsWith('http') ? book.cover : `${baseUrl}${book.cover}`) : 
    `${baseUrl}/placeholder.svg`;

  const author = book.author || "Raphaël Jerusalmy";
  
  return {
    title: `${book.title} - ${author}`,
    description: book.description || book.synopsis || `${book.title} by ${author}. Published by ${book.publisher} in ${book.year}.`,
    keywords: [
      book.title,
      author,
      "book",
      "novel",
      book.publisher,
      book.year?.toString(),
      "Raphaël Jerusalmy",
      locale === 'fr' ? 'livre français' : 'english book'
    ].filter((keyword): keyword is string => Boolean(keyword)),
    authors: [{ name: author }],
    creator: author,
    publisher: book.publisher,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${baseUrl}/en/books/${slug}`,
        fr: `${baseUrl}/fr/books/${slug}`,
      },
    },
    openGraph: {
      title: `${book.title} - ${author}`,
      description: book.description || book.synopsis || `${book.title} by ${author}. Published by ${book.publisher} in ${book.year}.`,
      url: currentUrl,
      siteName: APP_CONFIG.name,
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'book',
      authors: [author],
      tags: [book.genre, 'book', 'novel'].filter((tag): tag is string => Boolean(tag)),
      images: [
        {
          url: imageUrl,
          width: 400,
          height: 600,
          alt: `${book.title} - Book Cover`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${book.title} - ${author}`,
      description: book.description || book.synopsis || `${book.title} by ${author}`,
      images: [imageUrl],
      creator: '@raphaeljerusalmy',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

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

  // Generate structured data for SEO
  const bookSchema = generateBookSchema(book, locale);

  return (
    <>
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }}
      />
      <BookDetail book={book} />
    </>
  );
}
