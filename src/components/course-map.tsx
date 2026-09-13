"use client";

import Link from "next/link";
import { levels, totalXp } from "@/content";
import { useProgress } from "./progress-provider";

export default function CourseMap() {
  const { isUnlocked, isPassed, isBuilt, state, percent, ready, reset } = useProgress();
  const nextLevel = levels.find((l) => !isPassed(l.id)) ?? levels[levels.length - 1];

  return (
    <section id="map" className="mx-auto max-w-7xl px-4 pb-20">
      {/* نوار پیشرفت */}
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#0d1424]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold">🗺️ نقشه‌ی دوره</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {ready ? state.passedLevels.length : 0} مرحله از {levels.length} تموم شده •{" "}
              {ready ? state.xp : 0} از {totalXp} امتیاز
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/levels/${nextLevel.slug}`}
              className="rounded-xl bg-emerald-500 px-5 py-3 font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600"
            >
              {ready && state.passedLevels.length > 0 ? "ادامه بده ▶️" : "شروع کن 🚀"}
            </Link>
            {ready && state.passedLevels.length > 0 && (
              <button
                onClick={() => {
                  if (confirm("مطمئنی؟ همه‌ی پیشرفتت پاک می‌شه! 😨")) reset();
                }}
                className="rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-500 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                ریست پیشرفت
              </button>
            )}
          </div>
        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-l from-emerald-400 to-teal-500 transition-all duration-700"
            style={{ width: `${ready ? percent : 0}%` }}
          />
        </div>
      </div>

      {/* کارت‌های مرحله */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {levels.map((level) => {
          const unlocked = !ready || isUnlocked(level.id);
          const passed = ready && isPassed(level.id);
          const built = ready && isBuilt(level.id);

          const card = (
            <div
              className={
                "group h-full rounded-3xl border p-5 transition " +
                (passed
                  ? "border-emerald-400 bg-emerald-50/60 dark:border-emerald-700 dark:bg-emerald-500/10"
                  : unlocked
                    ? "border-slate-200 bg-white hover:-translate-y-1 hover:border-emerald-400 hover:shadow-xl dark:border-slate-800 dark:bg-[#0d1424]"
                    : "border-slate-200 bg-slate-50 opacity-60 dark:border-slate-800 dark:bg-[#0b1120]")
              }
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl">{unlocked ? level.emoji : "🔒"}</span>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  مرحله {level.id}
                </span>
              </div>
              <h3 className="mt-3 font-extrabold">{level.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                {level.tagline}
              </p>
              <div className="mt-4 flex items-center gap-2 text-[11px]">
                <span className="rounded-full bg-amber-100 px-2 py-1 font-bold text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
                  ⭐ {level.xp}
                </span>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  ⏱ {level.duration}
                </span>
                {built && <span title="پروژه ساخته شد">🔨</span>}
                {passed && (
                  <span className="ms-auto rounded-full bg-emerald-500 px-2 py-1 font-bold text-white">
                    تموم شد ✓
                  </span>
                )}
              </div>
            </div>
          );

          return unlocked ? (
            <Link key={level.id} href={`/levels/${level.slug}`} className="block">
              {card}
            </Link>
          ) : (
            <div key={level.id} className="cursor-not-allowed" title="اول مرحله‌ی قبلی رو تموم کن">
              {card}
            </div>
          );
        })}
      </div>
    </section>
  );
}
