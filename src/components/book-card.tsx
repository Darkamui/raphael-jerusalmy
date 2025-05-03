"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

interface BookCardProps {
  title: string;
  coverImg: string;
  type: string;
  year: string;
  subtitle: string;
  slug: string;
}

export default function BookCard({
  title,
  coverImg,
  type,
  year,
  subtitle,
  slug,
}: BookCardProps) {
  const t = useTranslations("homepage");
  return (
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
      <CardContent className="p-6 flex-grow flex flex-col">
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
            {t("featuredBooksHeader.details")}{" "}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
