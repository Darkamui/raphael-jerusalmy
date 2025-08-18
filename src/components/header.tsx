"use client";
import { Link } from "@/i18n/navigation";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Book, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { announceToScreenReader } from "@/lib/utils/accessibility";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import LocaleSwitcher from "./locale-switcher";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("navigation");
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstFocusableRef = useRef<HTMLAnchorElement>(null);

  // Close mobile menu when route changes
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
      announceToScreenReader("Navigation menu closed");
    }
  }, [pathname, isOpen]);

  // Handle keyboard navigation and focus management
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Focus the first focusable element when menu opens
      setTimeout(() => {
        firstFocusableRef.current?.focus();
      }, 100);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6  flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <Book className="h-6 w-6 transition-transform group-hover:scale-110" />
          <span className="font-dancing-script text-2xl font-bold hidden md:inline-block">
            Raphaël Jerusalmy
          </span>
          <span className="font-bold md:hidden ">RJ</span>
        </Link>
        <nav
          className="hidden lg:flex items-center gap-6"
          aria-label="Main navigation"
        >
          <NavLink href="/">{t("home")}</NavLink>
          <NavLink href="/about">{t("about")}</NavLink>
          <NavLink href="/books">{t("books")}</NavLink>
          <NavLink href="/events">{t("events")}</NavLink>
          <NavLink href="/blog">{t("blog")}</NavLink>
          <NavLink href="/contact">{t("contact")}</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* <Button
            variant="outline"
            size="sm"
            className="hidden lg:flex"
            asChild
          >
            <Link href="/newsletter">{t("newsletter")}</Link>
          </Button>*/}
          <Button className="hidden lg:flex" size="sm" asChild>
            <Link href="https://manuelbleu.com" target="_blank">
              Le Manuel Bleu
            </Link>
          </Button>
          <Button
            ref={menuButtonRef}
            variant="ghost"
            size="icon"
            className="lg:hidden border-2 cursor-pointer"
            onClick={() => {
              const newState = !isOpen;
              setIsOpen(newState);
              announceToScreenReader(
                newState ? "Navigation menu opened" : "Navigation menu closed"
              );
            }}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">
              {isOpen ? "Close menu" : "Open menu"}
            </span>
          </Button>
          <LocaleSwitcher />
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="absolute inset-0"
                onClick={() => setIsOpen(false)}
              />
            </motion.div>

            {/* Menu Content */}
            <motion.div
              className="absolute top-0 left-0 right-0 bottom-0 h-[100dvh] w-full overflow-y-auto bg-background shadow-xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
            <div
              ref={menuRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-menu-title"
              className="h-full"
            >
              <div className="container w-[80%] mx-auto flex flex-col  py-6 h-full">
                <h2 id="mobile-menu-title" className="sr-only">
                  Main navigation menu
                </h2>
                <div className="flex items-center justify-between mb-8">
                  <Link
                    ref={firstFocusableRef}
                    href="/"
                    className="flex items-center space-x-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <Book className="h-6 w-6" />
                    <span className="font-dancing-script text-2xl font-bold">
                      Raphaël Jerusalmy
                    </span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <nav
                  className="flex flex-col gap-4 mt-4"
                  aria-label="Main navigation"
                >
                  <MobileNavLink href="/">{t("home")}</MobileNavLink>
                  <MobileNavLink href="/about">{t("about")}</MobileNavLink>
                  <MobileNavLink href="/books">{t("books")}</MobileNavLink>
                  <MobileNavLink href="/events">{t("events")}</MobileNavLink>
                  <MobileNavLink href="/blog">{t("blog")}</MobileNavLink>
                  <MobileNavLink href="/contact">{t("contact")}</MobileNavLink>
                </nav>
                <div className="mt-auto space-y-4 pt-8">
                  <Button className="w-full" asChild>
                    <Link href="/books">Le Manuel Bleu</Link>
                  </Button>
                  {/* <Button variant="outline" className="w-full" asChild>
                    <Link href="/newsletter">{t("newsletter")}</Link>
                  </Button> */}
                </div>
              </div>
            </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        isActive ? "text-primary" : "text-muted-foreground"
      )}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "text-lg font-medium transition-colors py-3 border-b border-border/50 hover:text-primary",
        isActive ? "text-primary" : "text-muted-foreground"
      )}
    >
      {children}
    </Link>
  );
}
