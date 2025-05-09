import Hero from "./(sections)/hero";
import Featured from "./(sections)/featured";
import Testimonials from "./(sections)/testimonials";
import UpcomingEvents from "./(sections)/upcoming-events";
import Newsletter from "./(sections)/newsletter";
// import { db } from "@/lib/db";
// import { books } from "@/lib/schema";
// import BlogPreview from "./(sections)/blog-preview";

export default async function Home() {
  // const allBooks = await db.select().from(books);
  // console.log(allBooks);
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <UpcomingEvents />
      <Featured />
      <Testimonials />
      <Newsletter />
      {/* <BlogPreview /> */}
    </div>
  );
}
