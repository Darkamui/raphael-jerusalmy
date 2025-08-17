import { Skeleton } from "@/components/ui/skeleton";

export default function BooksLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Skeleton className="h-12 w-[250px] rounded-lg" />
            <Skeleton className="h-6 w-[500px] max-w-full rounded-lg" />
          </div>
        </div>
      </section>

      {/* Filters Skeleton */}
      <section className="w-full py-6 bg-background border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <Skeleton className="h-10 w-full md:w-96 rounded-md" />
            <div className="flex flex-wrap gap-4 items-center">
              <Skeleton className="h-10 w-[180px] rounded-md" />
              <Skeleton className="h-10 w-[180px] rounded-md" />
            </div>
          </div>
        </div>
      </section>

      {/* Books Grid Skeleton */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array(8)
              .fill(null)
              .map((_, index) => (
                <BookCardSkeleton key={index} />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function BookCardSkeleton() {
  return (
    <div className="overflow-hidden h-full flex flex-col rounded-lg border bg-card text-card-foreground shadow">
      <Skeleton className="aspect-[2/3] w-full" />
      <div className="p-6 flex-grow flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-4 w-12 rounded-md" />
        </div>
        <Skeleton className="h-6 w-full rounded-md" />
        <Skeleton className="h-20 w-full rounded-md" />
        <Skeleton className="h-9 w-full mt-auto rounded-md" />
      </div>
    </div>
  );
}
