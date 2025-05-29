"use client";
import NewsletterSignup from "@/components/newsletter-signup";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
const Newsletter = () => {
  const t = useTranslations("homepage.newsletter");

  return (
    <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {t("header.title")}
            </h2>
            <p className="max-w-[700px] md:text-xl">{t("header.subtitle")}</p>
          </div>
          <div className="w-full max-w-md">
            <NewsletterSignup />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
