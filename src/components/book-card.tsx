"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { BookCardProps } from "@/lib/types";
import { staggerItem } from "@/lib/utils/animations";
import { generateImageUrl, truncateText } from "@/lib/utils";
import { IMAGE_SIZES } from "@/lib/constants";

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
  const animation = staggerItem(index);
  
  const optimizedImageUrl = generateImageUrl(
    coverImg || "/placeholder.svg",
    IMAGE_SIZES.bookCover.width,
    IMAGE_SIZES.bookCover.height
  );

  return (
    <motion.div
      {...animation}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col group">
        <div className="relative aspect-[2/3] overflow-hidden bg-white">
          <Link href={`/books/${slug}`} className="block h-full">
            <Image
              src={optimizedImageUrl}
              alt={`Book cover for ${title}`}
              fill
              className="object-cover transition-transform group-hover:scale-110 duration-500 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              priority={index < 3}
            />
          </Link>
        </div>
        
        <CardContent className="p-6 flex-grow flex flex-col lg:min-h-[300px]">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="text-xs">
              {type}
            </Badge>
            <span className="text-sm text-muted-foreground">{year}</span>
          </div>
          
          <h3 className="text-xl font-bold mb-2 break-words text-pretty line-clamp-2">
            {title}
          </h3>
          
          <p className="text-muted-foreground mb-4 flex-grow line-clamp-3">
            {truncateText(subtitle, 120)}
          </p>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" 
            asChild
          >
            <Link href={`/books/${slug}`}>
              {t("header.detailsLabel")} 
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
