import Hero from "./(sections)/hero";
import Featured from "./(sections)/featured";
import Testimonials from "./(sections)/testimonials";
import UpcomingEvents from "./(sections)/upcoming-events";
import Newsletter from "./(sections)/newsletter";
// import BlogPreview from "./(sections)/blog-preview";

export default function Home() {
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
