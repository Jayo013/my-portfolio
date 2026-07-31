"use client";
import { useEffect, useState } from "react";

const STORAGE_KEY = "theme-pref";

export function useDarkMode() {
  const [dark, setDark] = useState(true);

  // Sync with whatever layout.tsx's pre-hydration script already applied to <html>,
  // instead of recomputing independently (that mismatch was the source of the theme-flash bug).
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
  }, [dark]);

  return { dark, setDark };
}
