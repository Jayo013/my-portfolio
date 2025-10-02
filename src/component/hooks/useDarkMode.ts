"use client";
import { useEffect, useState } from "react";

export function useDarkMode(defaultOn = true) {
  const [dark, setDark] = useState<boolean>(defaultOn);
  useEffect(() => {
    const stored = localStorage.getItem("prefers-dark");
    setDark(stored ? stored === "true" : defaultOn);
  }, [defaultOn]);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("prefers-dark", String(dark));
  }, [dark]);
  return { dark, setDark };
}
