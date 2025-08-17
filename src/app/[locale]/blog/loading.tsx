import { Skeleton } from "@/components/ui/skeleton";

export default function BlogLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary/10 via-accent/5 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Skeleton className="h-12 w-[300px] rounded-lg" />
            <Skeleton className="h-6 w-[600px] max-w-full rounded-lg" />
          </div>
        </div>
      </section>

      {/* Search and Filters Skeleton */}
      <section className="w-full py-6 bg-background border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <Skeleton className="h-10 w-full md:w-96 rounded-md" />
            <div className="flex flex-wrap gap-4 items-center">
              <Skeleton className="h-10 w-[150px] rounded-md" />
              <Skeleton className="h-10 w-[120px] rounded-md" />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid Skeleton */}
      <section className="w-full py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {Array(6)
                  .fill(null)
                  .map((_, index) => (
                    <BlogCardSkeleton key={index} />
                  ))}
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}

function BlogCardSkeleton() {
  return (
    <div className="overflow-hidden h-full flex flex-col rounded-lg border bg-card text-card-foreground shadow">
      {/* Featured Image Skeleton */}
      <Skeleton className="aspect-[16/9] w-full" />
      
      <div className="p-6 flex-grow flex flex-col space-y-4">
        {/* Category and Date */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-4 w-16 rounded-md" />
        </div>
        
        {/* Title */}
        <Skeleton className="h-6 w-full rounded-md" />
        <Skeleton className="h-6 w-3/4 rounded-md" />
        
        {/* Subtitle/Excerpt */}
        <Skeleton className="h-16 w-full rounded-md" />
        
        {/* Read Time and CTA */}
        <div className="flex items-center justify-between mt-auto pt-4">
          <Skeleton className="h-4 w-16 rounded-md" />
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
}
