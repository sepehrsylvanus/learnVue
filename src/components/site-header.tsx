"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useProgress } from "./progress-provider";
import { levels } from "@/content";

export default function SiteHeader() {
  const { state, percent, ready } = useProgress();
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      window.localStorage.setItem("vuekade-theme", next ? "dark" : "light");
    } catch {
      /* noop */
    }
    window.dispatchEvent(new CustomEvent("vk-theme", { detail: { dark: next } }));
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-[#070b14]/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4">
        <Link href="/" className="flex items-center gap-2 font-extrabold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 text-lg shadow-lg shadow-emerald-500/25">
            🍃
          </span>
          <span className="text-lg">
            ویو<span className="text-emerald-500">کده</span>
          </span>
        </Link>

        <span className="hidden text-xs text-slate-500 sm:inline dark:text-slate-400">
          آموزش تعاملی Vue 3
        </span>

        <div className="mx-auto hidden w-64 items-center gap-2 md:flex">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-l from-emerald-400 to-teal-500 transition-all duration-500"
              style={{ width: `${ready ? percent : 0}%` }}
            />
          </div>
          <span className="text-xs font-bold tabular-nums text-slate-500 dark:text-slate-400">
            {ready ? percent : 0}٪
          </span>
        </div>

        <div className="ms-auto flex items-center gap-2">
          <span className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
            ⭐ {ready ? state.xp : 0} XP
          </span>
          <span className="hidden rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700 sm:inline dark:bg-emerald-500/15 dark:text-emerald-300">
            🏁 {ready ? state.passedLevels.length : 0} / {levels.length}
          </span>
          <button
            onClick={toggleTheme}
            aria-label="تغییر تم"
            className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 text-base transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </header>
  );
}
