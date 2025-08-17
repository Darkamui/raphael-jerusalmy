"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { generateImageUrl } from "@/lib/utils";
import { IMAGE_SIZES } from "@/lib/constants";

export default function AboutPage() {
  const t = useTranslations("aboutPage");
  
  const authorImageUrl = generateImageUrl(
    "/bio2.jfif",
    IMAGE_SIZES.hero.width,
    IMAGE_SIZES.hero.height
  );
  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
            <motion.div
              className="flex flex-col justify-center space-y-4"
              initial={{ opacity: 0, x: -120, y: 30 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  {t("header.title")}
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  {t("header.subtitle")}
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 120, scale: 0.8, rotate: 3 }}
              animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
              className="relative h-[400px] lg:h-[500px] overflow-hidden rounded-xl"
            >
              <Image
                src={authorImageUrl}
                alt="Author portrait - Raphaël Jerusalmy"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 500px"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Biography */}
      <section className="w-full px-6 md:px-0 py-12 md:py-24 bg-background ">
        <div className="container px-4 mx-auto">
          <motion.div
            className="max-w-3xl mx-auto space-y-6"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold tracking-tighter">
              {t("biography.title")}
            </h2>
            <div
              className="space-y-4 tracking-wide leading-7 text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: t("biography.text") }}
            />
          </motion.div>
        </div>
      </section>

      {/* Career Timeline */}
      {/* <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 mx-auto">
          <motion.div
            className="max-w-3xl mx-auto space-y-6"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold tracking-tighter">
              {t("timeline.title")}
            </h2>
            <div className="relative border-l border-primary/20 pl-6 space-y-10">
              {timeline.map((item, id) => (
                <TimelineItem
                  key={id}
                  year={item.year}
                  title={item.title}
                  location={item.location}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* Writing Philosophy */}
      {/* <section className="w-full py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 xl:px-24">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -80, y: 40 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl font-bold tracking-tighter">
                {t("writingPhilosophy.title")}
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>{t("writingPhilosophy.text")}</p>
              </div>
            </motion.div>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: 80, y: 40 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl font-bold tracking-tighter">
                Influences & Inspiration
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>{t("influences.text")}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* Contact Information */}
      {/* <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6">
          <motion.div
            className="max-w-3xl mx-auto space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tighter">
              Contact Information
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold">Literary Agent</h3>
                      <p className="text-muted-foreground mt-1">
                        Jane Smith, Literary Representation Inc.
                      </p>
                      <p className="mt-1">agent@literaryrep.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <BookOpen className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold">Publisher</h3>
                      <p className="text-muted-foreground mt-1">
                        Penguin Random House
                      </p>
                      <p className="mt-1">publicity@penguinrandomhouse.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold">Speaking Engagements</h3>
                      <p className="text-muted-foreground mt-1">
                        For speaking requests and literary events
                      </p>
                      <p className="mt-1">events@authorname.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Award className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold">Media Inquiries</h3>
                      <p className="text-muted-foreground mt-1">
                        For interviews and press
                      </p>
                      <p className="mt-1">press@authorname.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-center mt-8">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Contact Form <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section> */}
    </div>
  );
}

// function TimelineItem({
//   year,
//   title,
//   location,
// }: {
//   year: string;
//   title: string;
//   location: string;
// }) {
//   return (
//     <motion.div
//       className="relative"
//       initial={{ opacity: 0, x: -60, scale: 0.9 }}
//       whileInView={{ opacity: 1, x: 0, scale: 1 }}
//       transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
//       viewport={{ once: true, margin: "-50px" }}
//     >
//       <div className="absolute -left-10 mt-1.5 h-4 w-4 rounded-full border border-primary bg-primary"></div>
//       <div className="mb-1 text-lg font-bold">{year}</div>
//       <h3 className="text-xl font-semibold">{title}</h3>
//       <p className="mt-2 text-muted-foreground">{location}</p>
//     </motion.div>
//   );
// }
