import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex flex-col space-y-6 lg:w-1/2">
              <Skeleton className="h-8 w-32 rounded-full" />
              <Skeleton className="h-12 w-full max-w-lg rounded-lg" />
              <Skeleton className="h-6 w-full max-w-md rounded-lg" />
              <div className="flex gap-4 pt-4">
                <Skeleton className="h-10 w-32 rounded-md" />
                <Skeleton className="h-10 w-32 rounded-md" />
              </div>
            </div>
            <div className="lg:w-1/2">
              <Skeleton className="aspect-[4/5] w-full max-w-md mx-auto rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section Skeleton */}
      <section className="w-full py-12 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <Skeleton className="h-10 w-64 rounded-lg" />
            <Skeleton className="h-6 w-96 max-w-full rounded-lg" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <FeaturedBookSkeleton key={index} />
              ))}
          </div>
        </div>
      </section>

      {/* Blog Preview Section Skeleton */}
      <section className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <Skeleton className="h-10 w-56 rounded-lg" />
            <Skeleton className="h-6 w-80 max-w-full rounded-lg" />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <BlogPreviewSkeleton key={index} />
              ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section Skeleton */}
      <section className="w-full py-12 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <Skeleton className="h-10 w-72 rounded-lg" />
            <Skeleton className="h-6 w-96 max-w-full rounded-lg" />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <TestimonialSkeleton key={index} />
              ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section Skeleton */}
      <section className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-6 text-center">
            <Skeleton className="h-10 w-48 rounded-lg" />
            <Skeleton className="h-6 w-80 max-w-full rounded-lg" />
            <div className="flex w-full max-w-md space-x-2">
              <Skeleton className="h-10 flex-1 rounded-md" />
              <Skeleton className="h-10 w-32 rounded-md" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeaturedBookSkeleton() {
  return (
    <div className="overflow-hidden h-full flex flex-col rounded-lg border bg-card text-card-foreground shadow">
      <Skeleton className="aspect-[2/3] w-full" />
      <div className="p-6 flex-grow flex flex-col space-y-4">
        <Skeleton className="h-6 w-full rounded-md" />
        <Skeleton className="h-16 w-full rounded-md" />
        <Skeleton className="h-9 w-full mt-auto rounded-md" />
      </div>
    </div>
  );
}

function BlogPreviewSkeleton() {
  return (
    <div className="overflow-hidden h-full flex flex-col rounded-lg border bg-card text-card-foreground shadow">
      <Skeleton className="aspect-[16/9] w-full" />
      <div className="p-6 flex-grow flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-4 w-16 rounded-md" />
        </div>
        <Skeleton className="h-6 w-full rounded-md" />
        <Skeleton className="h-16 w-full rounded-md" />
        <Skeleton className="h-9 w-24 mt-auto rounded-md" />
      </div>
    </div>
  );
}

function TestimonialSkeleton() {
  return (
    <div className="p-6 rounded-lg border bg-card text-card-foreground shadow">
      <Skeleton className="h-20 w-full rounded-md mb-4" />
      <Skeleton className="h-5 w-32 rounded-md" />
    </div>
  );
}