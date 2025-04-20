"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useTranslations } from "next-intl";

// Sample event data
const events = [
  {
    id: 1,
    title: "Book Signing - New York",
    date: "May 15, 2025",
    time: "6:00 PM - 8:00 PM",
    location: "Barnes & Noble, 5th Avenue",
    description:
      "Join us for an evening of conversation and book signing. The author will read excerpts from the latest novel, answer questions, and sign copies of all books.",
    type: "Signing",
    link: "#",
  },
  {
    id: 2,
    title: "Literary Festival - London",
    date: "June 8, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Southbank Centre",
    description:
      "A special appearance at the annual London Literary Festival. The author will participate in a panel discussion on 'The Future of Historical Fiction' followed by a Q&A session.",
    type: "Festival",
    link: "#",
  },
  {
    id: 3,
    title: "Writing Workshop - Online",
    date: "July 22, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "Virtual Event (Zoom)",
    description:
      "A virtual workshop on character development and narrative structure. Limited spots available. Participants will receive feedback on a short writing sample.",
    type: "Workshop",
    link: "#",
  },
  {
    id: 4,
    title: "Book Launch - San Francisco",
    date: "August 30, 2025",
    time: "7:00 PM - 9:00 PM",
    location: "City Lights Bookstore",
    description:
      "The official launch of the newest novel. Join us for readings, refreshments, and a special Q&A about the inspiration and research behind the book.",
    type: "Launch",
    link: "#",
  },
  {
    id: 5,
    title: "Literary Retreat - Tuscany",
    date: "September 15-20, 2025",
    time: "All Day",
    location: "Villa Medicea, Florence, Italy",
    description:
      "An immersive five-day retreat for aspiring writers. Daily workshops, one-on-one consultations, and evening readings in a beautiful Tuscan villa.",
    type: "Retreat",
    link: "#",
  },
];

export default function EventsPage() {
  const [activeEvent, setActiveEvent] = useState<number | null>(null);
  const t = useTranslations("HomePage");

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 bg-gradient-to-b from-primary/10 via-accent/5 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tighter sm:text-5xl gradient-text">
                {t("title")}
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Join the author at these upcoming events, book signings, and
                literary festivals around the world.
              </p>
            </div>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/50 to-primary/50 transform md:-translate-x-1/2"></div>

            {/* Timeline Events */}
            <div className="space-y-12 relative">
              {events.map((event, index) => (
                <TimelineEvent
                  key={event.id}
                  event={event}
                  index={index}
                  isActive={activeEvent === event.id}
                  onToggle={() =>
                    setActiveEvent(activeEvent === event.id ? null : event.id)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

interface TimelineEventProps {
  event: {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    type: string;
    link: string;
  };
  index: number;
  isActive: boolean;
  onToggle: () => void;
}

function TimelineEvent({
  event,
  index,
  isActive,
  onToggle,
}: TimelineEventProps) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`flex flex-col ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } items-center gap-16`}
    >
      {/* Timeline Dot */}
      <motion.div
        className="absolute left-0 md:left-1/2 w-6 h-6 rounded-full bg-primary transform md:-translate-x-1/2 z-10"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={onToggle}
      >
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-20"></span>
      </motion.div>

      {/* Date */}
      <div
        className={`w-full md:w-1/2 text-center ${
          isEven ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
        }`}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="inline-block glass-card px-4 py-2 water-drop"
        >
          <Calendar className="inline-block mr-2 h-4 w-4 text-primary" />
          <span className="font-semibold">{event.date}</span>
        </motion.div>
      </div>

      {/* Event Card */}
      <motion.div
        className={`w-full md:w-1/2 ${isEven ? "md:pl-12" : "md:pr-12"}`}
        layout
        animate={{ height: isActive ? "auto" : "auto" }}
      >
        <motion.div
          className="glass-card overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={onToggle}
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold gradient-text">{event.title}</h3>
              <Badge className="bg-accent text-accent-foreground">
                {event.type}
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-muted-foreground">
                <Clock className="mr-2 h-4 w-4 text-primary" />
                {event.time}
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4 text-primary" />
                {event.location}
              </div>

              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: isActive ? 1 : 0,
                  height: isActive ? "auto" : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="mt-4 text-muted-foreground">
                  {event.description}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="glass water-drop"
                    asChild
                  >
                    <Link href={event.link}>
                      Learn More <ExternalLink className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                  <div className="text-sm text-muted-foreground flex items-center">
                    <Users className="mr-1 h-3 w-3" /> Limited Seats
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
