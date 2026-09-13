"use client";

import { useEffect, useState } from "react";

/** وضعیت تم را می‌خواند و به رویداد سفارشی vk-theme گوش می‌دهد. */
export function useDark(): boolean {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ dark: boolean }>).detail;
      setDark(!!detail?.dark);
    };
    window.addEventListener("vk-theme", handler);
    return () => window.removeEventListener("vk-theme", handler);
  }, []);

  return dark;
}
