"use client";

import type React from "react";

import { motion } from "framer-motion";
import { Mail, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function BlogPage() {
  const t = useTranslations("blogComingSoon");

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success(
      "Thank you for subscribing! We'll notify you when our blog launches."
    );
  };

  return (
    <div className="flex flex-col min-h-[80dvh]">
      <section className="w-full py-12 bg-gradient-to-b from-primary/10 via-accent/5 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 max-w-3xl"
            >
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter gradient-text">
                {t("title")}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                {t("subtitle")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-md glass-card p-8"
            >
              <div className="flex flex-col space-y-6">
                <div className="flex items-center justify-center">
                  <PenTool className="h-12 w-12 text-primary animate-pulse-slow" />
                </div>
                <h2 className="text-2xl font-semibold text-center">
                  {t("ctaTitle")}
                </h2>
                <p className="text-center text-muted-foreground">
                  {t("ctaDescription")}
                </p>
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <Input
                      type="email"
                      placeholder={t("emailPlaceholder")}
                      required
                      className="glass"
                    />
                  </div>
                  <Button type="submit" className="w-full water-drop">
                    <Mail className="mr-2 h-4 w-4" />
                    {t("buttonLabel")}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
