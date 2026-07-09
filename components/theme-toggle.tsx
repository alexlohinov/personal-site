"use client";

import { useEffect, useRef, useState } from "react";
import { Laptop, MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";

const themes = ["system", "light", "dark"] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [displayTheme, setDisplayTheme] = useState<(typeof themes)[number]>(
    "system",
  );
  const currentTheme = useRef<(typeof themes)[number]>("system");

  useEffect(() => {
    if (!mounted) {
      if (themes.includes(theme as (typeof themes)[number])) {
        currentTheme.current = theme as (typeof themes)[number];
        setDisplayTheme(currentTheme.current);
      }
      setMounted(true);
    }
  }, [mounted, theme]);

  const cycleTheme = () => {
    const nextTheme =
      themes[(themes.indexOf(currentTheme.current) + 1) % themes.length];

    currentTheme.current = nextTheme;
    setDisplayTheme(nextTheme);
    setTheme(nextTheme);
  };

  const Icon =
    displayTheme === "light"
      ? SunMedium
      : displayTheme === "dark"
        ? MoonStar
        : Laptop;

  return (
    <button
      type="button"
      aria-label="Change color theme"
      title="Change color theme"
      disabled={!mounted}
      onClick={cycleTheme}
      className="flex size-8 shrink-0 items-center justify-center rounded-[10px] text-[#4d4d4d] hover:bg-[#f7f7f7] disabled:cursor-default dark:text-[#b4b4b4] dark:hover:bg-[#1b1b1b]"
    >
      <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
    </button>
  );
}
