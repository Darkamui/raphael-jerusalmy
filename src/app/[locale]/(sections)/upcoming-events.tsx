"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { Event } from "@/lib/types";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Calendar, MapPin, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const UpcomingEvents = () => {
  const t = useTranslations("homepage.upcomingEvents");
  const events = t.raw("events") as Event[];
  return (
    <section className="w-full py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {t("header.title")}
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              {t("header.subtitle")}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 max-w-6xl mx-auto auto-rows-fr">
          {/* Tel Aviv Event */}
          <motion.div
            initial={{ opacity: 0, x: -120, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group h-full"
          >
            <Card className="glass-card overflow-hidden h-full flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/event-tel-aviv.jpg"
                  alt="Raphaël Jerusalmy - Tel Aviv University Event"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                {/* <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                  Academic Conference
                </Badge> */}
              </div>
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4 text-primary" />
                    {events[0].date}
                  </div>
                  <div className="flex items-start text-sm text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span
                      dangerouslySetInnerHTML={{ __html: events[0].location }}
                    />
                  </div>
                  <h3 className="text-xl font-bold gradient-text">
                    {events[0].title}
                    Tribunes de guerre, 2023-2025
                  </h3>
                  <p className="text-muted-foreground flex-1">
                    {events[0].subtitle}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 mt-auto">
                  <div className="text-sm text-muted-foreground flex items-center">
                    <Users className="mr-1 h-3 w-3" /> Limited Seats
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="glass water-drop"
                    asChild
                  >
                    <Link href="mailto:celinecorsia@tauex.tau.ac.il">
                      Reserve Seat <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Puteaux Event */}
          <motion.div
            initial={{ opacity: 0, x: 120, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group h-full"
          >
            <Card className="glass-card overflow-hidden h-full flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/event-puteaux.jpg"
                  alt="Raphaël Jerusalmy Conference - Beth Aharon Puteaux"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                {/* <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                  Book Presentation
                </Badge> */}
              </div>
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4 text-primary" />
                    {events[1].date}
                  </div>
                  <div className="flex items-start text-sm text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4 text-primary mt-0.5 flex-shrink-0" />

                    <span
                      dangerouslySetInnerHTML={{ __html: events[1].location }}
                    />
                  </div>
                  <h3 className="text-xl font-bold gradient-text">
                    {events[1].title}
                  </h3>
                  <p className="text-muted-foreground flex-1">
                    {events[1].subtitle}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 mt-auto">
                  <div className="text-sm text-muted-foreground flex items-center">
                    <BookOpen className="mr-1 h-3 w-3" /> Book Signing
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="glass water-drop"
                    asChild
                  >
                    <Link href="/contact">
                      {t("header.ctaLabel")}{" "}
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <Button
            variant="outline"
            size="lg"
            className="glass water-drop"
            asChild
          >
            <Link href="/events">
              {t("header.viewAll")} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
