"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type Event = {
  title: string;
  location: string;
  date: string;
  description: string;
};

const UpcomingEvents = () => {
  const t = useTranslations("homepage");
  const events = t.raw("latestEvents") as Event[];
  return (
    <section className="w-full py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {t("latestEventsHeader.title")}
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl text-balance">
              {t("latestEventsHeader.subtitle")}
            </p>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
          {events.map((event, id) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              key={id}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Calendar className="h-10 w-10 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold">
                        {event.title} - {event.location}
                      </h3>
                      <p className="text-muted-foreground mt-1">{event.date}</p>
                      <p className="mt-2">{event.description}</p>
                      <Button
                        variant="link"
                        className="p-0 h-auto mt-2"
                        asChild
                      >
                        <Link href="#">
                          {t("latestEventsHeader.cta")}{" "}
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
