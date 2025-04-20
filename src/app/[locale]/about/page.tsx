"use client";
/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, BookOpen, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
            <motion.div
              className="flex flex-col justify-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  About the Author
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Award-winning novelist with a passion for storytelling and
                  exploring the depths of human experience.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-[400px] lg:h-[500px] overflow-hidden rounded-xl"
            >
              <Image
                src="/placeholder.svg?height=600&width=400"
                alt="Author portrait"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Biography */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <motion.div
            className="max-w-3xl mx-auto space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tighter">Biography</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Born in a small coastal town, I developed a love for
                storytelling at an early age. My grandmother, a librarian, would
                read to me for hours, transporting me to worlds far beyond our
                quiet village. This early exposure to literature sparked a
                lifelong passion for the written word.
              </p>
              <p>
                After studying English Literature at Oxford University, I spent
                several years traveling across Europe, Asia, and South America,
                collecting experiences and stories that would later influence my
                writing. During this time, I worked various jobs – from teaching
                English in Tokyo to working on a vineyard in Tuscany – all while
                filling notebooks with observations, character sketches, and
                plot ideas.
              </p>
              <p>
                My debut novel, "Whispers in the Wind," was published in 2010
                and received critical acclaim, winning the National Book Award
                for Fiction. Since then, I've published eight more novels, each
                exploring different aspects of the human condition through
                diverse settings and characters.
              </p>
              <p>
                When not writing, I divide my time between a cottage in the
                English countryside and an apartment in New York City. I teach
                creative writing workshops at various universities and literary
                festivals around the world, sharing my passion for storytelling
                with aspiring writers.
              </p>
              <p>
                My writing process typically involves extensive research,
                followed by months of drafting and revision. I believe in the
                power of stories to bridge divides, foster empathy, and
                illuminate the complexities of human experience. Through my
                work, I aim to create narratives that resonate with readers long
                after they've turned the final page.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6">
          <motion.div
            className="max-w-3xl mx-auto space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tighter">
              Career Highlights
            </h2>
            <div className="relative border-l border-primary/20 pl-6 space-y-10">
              <TimelineItem
                year="2010"
                title="Literary Debut"
                description="Published debut novel 'Whispers in the Wind' to critical acclaim, winning the National Book Award for Fiction."
              />
              <TimelineItem
                year="2013"
                title="International Recognition"
                description="'The Forgotten Path' translated into 28 languages and adapted into an award-winning film."
              />
              <TimelineItem
                year="2016"
                title="Academic Appointment"
                description="Appointed as Visiting Professor of Creative Writing at Columbia University."
              />
              <TimelineItem
                year="2019"
                title="Literary Prize"
                description="Received the Pulitzer Prize for Fiction for 'Beyond the Horizon'."
              />
              <TimelineItem
                year="2022"
                title="Bestseller Success"
                description="'Midnight Whispers' spent 52 weeks on the New York Times Bestseller list."
              />
              <TimelineItem
                year="2024"
                title="Latest Achievement"
                description="'The Silent Echo' named Book of the Year by multiple literary publications."
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Writing Philosophy */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tighter">
                Writing Philosophy
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I believe that great fiction should do more than entertain—it
                  should illuminate the human experience, challenge
                  perspectives, and foster empathy. My approach to writing is
                  character-driven, focusing on the complexities and
                  contradictions that make us human.
                </p>
                <p>
                  Research is fundamental to my process. Whether I'm writing
                  historical fiction or contemporary drama, I immerse myself in
                  the world of my characters, studying everything from
                  historical events to regional dialects to ensure authenticity.
                </p>
                <p>
                  I view writing as a form of exploration—both of the world
                  around us and the landscapes within. Through storytelling, I
                  aim to bridge divides and create connections, reminding
                  readers of our shared humanity despite our differences.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tighter">
                Influences & Inspiration
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  My writing has been shaped by a diverse range of literary
                  influences, from the psychological depth of Virginia Woolf to
                  the narrative precision of Gabriel García Márquez. I'm drawn
                  to writers who blend beautiful prose with profound insights
                  into the human condition.
                </p>
                <p>
                  Beyond literature, I find inspiration in art, music, and
                  travel. Exploring new cultures and landscapes often sparks
                  ideas for settings and characters. The paintings of Edward
                  Hopper, with their sense of isolation and quiet contemplation,
                  have particularly influenced my approach to atmosphere and
                  mood.
                </p>
                <p>
                  Ultimately, my greatest inspiration comes from people—their
                  stories, struggles, and triumphs. I'm endlessly fascinated by
                  the complexity of human relationships and the ways in which we
                  navigate life's challenges, both ordinary and extraordinary.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6">
          <motion.div
            className="max-w-3xl mx-auto space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tighter">
              Contact Information
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold">Literary Agent</h3>
                      <p className="text-muted-foreground mt-1">
                        Jane Smith, Literary Representation Inc.
                      </p>
                      <p className="mt-1">agent@literaryrep.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <BookOpen className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold">Publisher</h3>
                      <p className="text-muted-foreground mt-1">
                        Penguin Random House
                      </p>
                      <p className="mt-1">publicity@penguinrandomhouse.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold">Speaking Engagements</h3>
                      <p className="text-muted-foreground mt-1">
                        For speaking requests and literary events
                      </p>
                      <p className="mt-1">events@authorname.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Award className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold">Media Inquiries</h3>
                      <p className="text-muted-foreground mt-1">
                        For interviews and press
                      </p>
                      <p className="mt-1">press@authorname.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-center mt-8">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Contact Form <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function TimelineItem({
  year,
  title,
  description,
}: {
  year: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="absolute -left-10 mt-1.5 h-4 w-4 rounded-full border border-primary bg-primary"></div>
      <div className="mb-1 text-lg font-bold">{year}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </motion.div>
  );
}
