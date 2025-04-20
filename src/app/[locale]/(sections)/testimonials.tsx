"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type Testimonial = {
  quote: string;
  source: string;
};

const Testimonials = () => {
  const t = useTranslations("homepage");
  const testimonials = t.raw("testimonials") as Testimonial[];
  return (
    <section className="w-full py-12 md:py-24 bg-muted">
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
              {t("testimonialsHeader.title")}
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              {t("testimonialsHeader.subtitle")}
            </p>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, id) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              key={id}
            >
              <Card className="h-58">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-primary mb-4" />
                  <p className="mb-4 italic">{testimonial.quote}</p>
                  <div className="font-semibold">{testimonial.source}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
