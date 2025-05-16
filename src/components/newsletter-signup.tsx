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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setEmail("");
      toast("Event has been created", {
        description: "Sunday, December 03, 2023 at 9:00 AM",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    }, 1000);
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
          className="bg-primary-foreground"
        />
        <Button type="submit" variant="secondary" disabled={isLoading}>
          {isLoading ? "Subscribing..." : t("form.buttonLabel")}
        </Button>
      </div>
    </form>
  );
}
