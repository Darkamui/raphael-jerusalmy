"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="border-2 cursor-pointer"
      onClick={toggleTheme}
    >
      {theme == "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] " />
      ) : (
        <Moon className="absolute h-[1.2rem] w-[1.2rem] " />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
