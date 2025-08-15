"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { IMAGE_SIZES, ROUTES } from "@/lib/constants";
import { SectionProps } from "@/lib/types";
import { generateImageUrl, cn } from "@/lib/utils";
import { fadeInLeft, fadeInRight } from "@/lib/utils/animations";

type HeroProps = SectionProps;

export default function Hero({ className }: HeroProps) {
  const t = useTranslations("homepage");
  const leftAnimation = fadeInLeft();
  const rightAnimation = fadeInRight(0.3);

  const heroImageUrl = generateImageUrl(
    "/images/tribunes.jpg",
    IMAGE_SIZES.hero.width,
    IMAGE_SIZES.hero.height
  );

  return (
    <section
      className={cn(
        "w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted",
        className
      )}
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
          <motion.div
            {...leftAnimation}
            className="flex flex-col justify-center space-y-4"
          >
            <div className="space-y-2">
              <Badge className="inline-flex mb-2 w-fit">
                {t("hero.comingSoon")}
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                {t("hero.title")}
              </h1>
              <p className="lg:max-w-[800px] text-balance text-muted-foreground md:text-xl">
                {t("hero.description")}
              </p>
            </div>

            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="group" asChild>
                <Link href={ROUTES.books}>
                  {t("hero.ctaPrimary")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href={ROUTES.about}>{t("hero.ctaSecondary")}</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            {...rightAnimation}
            className="relative h-[400px] lg:h-[500px] overflow-hidden rounded-xl shadow-2xl"
          >
            <Image
              src={heroImageUrl}
              alt={"Author portrait"}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 500px"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
