import Hero from "./(sections)/hero";
import Featured from "./(sections)/featured";
import Testimonials from "./(sections)/testimonials";
import UpcomingEvents from "./(sections)/upcoming-events";
import Newsletter from "./(sections)/newsletter";
import BlogPreview from "./(sections)/blog-preview";
// import { db } from "@/lib/db";
// import { books } from "@/lib/schema";
// import BlogPreview from "./(sections)/blog-preview";

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <UpcomingEvents />
      <Featured />
      <BlogPreview />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
