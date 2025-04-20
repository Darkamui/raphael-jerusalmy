"use client";
import NewsletterSignup from "@/components/newsletter-signup";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
const Newsletter = () => {
  const t = useTranslations("homepage");
  return (
    <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
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
              {t("newsletterCta.title")}
            </h2>
            <p className="max-w-[700px] md:text-xl">
              {t("newsletterCta.subtitle")}
            </p>
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
