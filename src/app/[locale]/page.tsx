import Hero from "./(sections)/hero";
import Featured from "./(sections)/featured";
import Testimonials from "./(sections)/testimonials";
import Newsletter from "./(sections)/newsletter";
import BlogPreview from "./(sections)/blog-preview";
import { DataService } from "@/lib/services/data.service";

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  const dataService = DataService.getInstance();

  // Fetch data from database in parallel for optimal performance
  const [featuredBooks, recentBlogs] = await Promise.all([
    dataService.getFeaturedBooks(locale, 3),
    dataService.getRecentBlogs(locale, 3),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      {/* <UpcomingEvents events={upcomingEvents} /> */}
      <Featured books={featuredBooks} />
      <BlogPreview blogPosts={recentBlogs} />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
