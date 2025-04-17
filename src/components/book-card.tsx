"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BookCardProps {
  title: string;
  coverImage: string;
  genre: string;
  year: string;
  description: string;
  slug: string;
}

export default function BookCard({
  title,
  coverImage,
  genre,
  year,
  description,
  slug,
}: BookCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={coverImage || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform hover:scale-105 duration-500"
        />
      </div>
      <CardContent className="p-6 flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline">{genre}</Badge>
          <span className="text-sm text-muted-foreground">{year}</span>
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4 flex-grow">{description}</p>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href={`/books/${slug}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
