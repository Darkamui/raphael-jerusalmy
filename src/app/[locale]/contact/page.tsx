"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, AtSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("contactPage");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, inquiryType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Your message has been sent! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        inquiryType: "",
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 bg-gradient-to-b from-primary/10 via-accent/5 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          ></motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="glass-card overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center mb-6">
                    <MessageSquare className="h-6 w-6 mr-3 text-primary" />
                    <h2 className="text-2xl font-semibold">{t("title")}</h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t("fields.name")}</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          className="glass"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t("fields.email")}</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          className="glass"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="inquiryType">
                        {t("fields.inquiryType")}
                      </Label>
                      <Select
                        value={formData.inquiryType}
                        onValueChange={handleSelectChange}
                        required
                      >
                        <SelectTrigger className="glass w-full">
                          <SelectValue
                            placeholder={t("fields.inquiryTypePlaceholder")}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">
                            General Inquiry
                          </SelectItem>
                          <SelectItem value="media">Media & Press</SelectItem>
                          <SelectItem value="events">
                            Speaking & Events
                          </SelectItem>
                          <SelectItem value="rights">
                            Rights & Permissions
                          </SelectItem>
                          <SelectItem value="feedback">
                            Book Feedback
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">{t("fields.subject")}</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder={t("fields.subjectPlaceholder")}
                        className="glass"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">{t("fields.message")}</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder={t("fields.messagePlaceholder")}
                        className="glass min-h-[150px]"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full water-drop"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>Sending Message...</>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" /> {t("button")}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-24"
            >
              {/* Contact Cards */}
              <Card className="glass-card overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <AtSign className="h-6 w-6 mr-3 text-primary" />
                    <h2 className="text-xl font-semibold">{t("info.title")}</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 mr-3 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">{t("info.email")}</p>
                        <a
                          href="mailto:contact@authorname.com"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          contact@authorname.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Phone className="h-5 w-5 mr-3 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">{t("info.phone")}</p>
                        <a
                          href="tel:+12345678900"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          +1 (234) 567-8900
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 mr-3 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">{t("info.agency")}</p>
                        <p className="text-muted-foreground">
                          Literary Representation Inc.
                          <br />
                          123 Book Street, Suite 456
                          <br />
                          New York, NY 10001
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card className="glass-card overflow-hidden wave-bg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">
                    {t("responseTime.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("responseTime.text")}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* FAQ Section */}
          {/* <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-center gradient-text">
              Frequently Asked Questions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Do you accept book review requests?
                  </h3>
                  <p className="text-muted-foreground">
                    Due to the high volume of requests, we can only accommodate
                    reviews from established publications. Please contact our
                    press team for more information.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">
                    How can I get a signed copy of a book?
                  </h3>
                  <p className="text-muted-foreground">
                    Signed copies are available at in-person events. Check our
                    events page for upcoming signings or contact us for special
                    requests.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Can I book the author for a speaking engagement?
                  </h3>
                  <p className="text-muted-foreground">
                    Yes! Please use the contact form and select "Speaking &
                    Events" as your inquiry type, or email our events team
                    directly.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">
                    How can I report errors in a book?
                  </h3>
                  <p className="text-muted-foreground">
                    We appreciate your feedback. Please use the contact form
                    with "Book Feedback" as the inquiry type and include the
                    edition and page number.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div> */}
        </div>
      </section>
    </div>
  );
}
