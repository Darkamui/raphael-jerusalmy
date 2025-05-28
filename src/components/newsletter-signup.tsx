"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const y = useTranslations("contactPage");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(email),
      });
      if (res.ok) {
        toast.success(y("form.success"));
        setEmail("");
      } else throw new Error();
    } catch {
      toast.error(y("form.error"));
    } finally {
      setIsLoading(false);
    }
  };

  const t = useTranslations("homepage.newsletter");

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-2">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          placeholder={t("form.emailPlaceholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-primary-foreground text-foreground placeholder:text-foreground/60"
        />
        <Button
          type="submit"
          variant="secondary"
          disabled={isLoading}
          className="cursor-pointer"
        >
          {isLoading ? "Subscribing..." : t("form.buttonLabel")}
        </Button>
      </div>
    </form>
  );
}
