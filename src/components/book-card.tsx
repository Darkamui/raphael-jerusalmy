"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
interface BookCardProps {
  title: string;
  coverImg: string;
  type: string;
  year: string;
  subtitle: string;
  slug: string;
  index: number;
}

export default function BookCard({
  title,
  coverImg,
  type,
  year,
  subtitle,
  slug,
  index,
}: BookCardProps) {
  const t = useTranslations("homepage.featuredBooks");
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: index % 3 === 0 ? -100 : index % 3 === 1 ? 0 : 100,
        y: index % 3 === 1 ? -60 : 40,
        scale: 0.9,
        rotate: index % 2 === 0 ? -1 : 1,
      }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className="h-full "
    >
      <Card className="overflow-hidden h-[full] flex flex-col">
        <div className="relative aspect-[2/3] overflow-hidden bg-white">
          <Link href={`/books/${slug}`}>
            <Image
              src={coverImg || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform hover:scale-105 duration-500"
            />
          </Link>
        </div>
        <CardContent className="p-6 flex-grow flex flex-col lg:min-h-[300px]">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline">{type}</Badge>
            <span className="text-sm text-muted-foreground">{year}</span>
          </div>
          <h3 className="text-xl flex-grow font-bold mb-2 break-words text-pretty">
            {title}
          </h3>
          <p className="text-muted-foreground mb-4 flex-grow">{subtitle}</p>
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link href={`/books/${slug}`}>
              {t("header.detailsLabel")} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
