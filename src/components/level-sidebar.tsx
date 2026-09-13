"use client";

import Link from "next/link";
import { levels } from "@/content";
import { useProgress } from "./progress-provider";

export default function LevelSidebar({ currentId }: { currentId?: number }) {
  const { isUnlocked, isPassed, ready } = useProgress();

  return (
    <nav className="space-y-1.5">
      <p className="mb-3 px-2 text-xs font-bold text-slate-500 dark:text-slate-400">
        🗺️ نقشه‌ی دوره
      </p>
      {levels.map((level) => {
        const unlocked = !ready || isUnlocked(level.id);
        const passed = ready && isPassed(level.id);
        const active = level.id === currentId;

        const base =
          "flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition ";
        const cls = active
          ? base + "border-emerald-500 bg-emerald-50 font-bold dark:bg-emerald-500/10"
          : unlocked
            ? base +
              "border-transparent hover:border-emerald-300 hover:bg-emerald-50/60 dark:hover:bg-slate-800/60"
            : base + "border-transparent opacity-50";

        const inner = (
          <>
            <span
              className={
                "grid h-8 w-8 shrink-0 place-items-center rounded-lg text-sm " +
                (passed
                  ? "bg-emerald-500 text-white"
                  : unlocked
                    ? "bg-slate-100 dark:bg-slate-800"
                    : "bg-slate-100 dark:bg-slate-800")
              }
            >
              {passed ? "✓" : unlocked ? level.emoji : "🔒"}
            </span>
            <span className="flex-1 leading-5">
              <span className="block text-[11px] text-slate-400">مرحله {level.id}</span>
              {level.title}
            </span>
          </>
        );

        return unlocked ? (
          <Link key={level.id} href={`/levels/${level.slug}`} className={cls}>
            {inner}
          </Link>
        ) : (
          <div key={level.id} className={cls + " cursor-not-allowed"} title="اول مرحله‌ی قبل رو تموم کن">
            {inner}
          </div>
        );
      })}
    </nav>
  );
}
