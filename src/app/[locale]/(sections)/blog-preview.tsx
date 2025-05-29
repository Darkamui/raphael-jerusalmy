"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Blog } from "@/lib/types";
const BlogPreview = () => {
  const t = useTranslations("blog");
  const blogPosts = (t.raw("items") as Blog[]).slice(0, 3);
  return (
    <section className="w-full py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, x: -60, y: 30 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {t("header.title")}
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              {t("header.subtitle")}
            </p>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((blog, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 60,
                x: index === 0 ? -60 : index === 1 ? 0 : 60,
                scale: 0.95,
              }}
              whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Card>
                <Image
                  src={blog.image}
                  alt="Blog post"
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardContent className="p-6">
                  <Badge className="mb-2">{blog.category}</Badge>
                  <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                  <p className="text-muted-foreground">{blog.subtitle}</p>
                  <Button variant="link" className="p-0 h-auto mt-4" asChild>
                    <Link href="#">
                      {t("cta")} <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <Link href="/blog">
              {t("header.cta")} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
