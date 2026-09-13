"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { levels, totalXp } from "@/content";
import { useProgress } from "./progress-provider";

export default function Certificate() {
  const { state, ready, setNickname } = useProgress();
  const [name, setName] = useState("");
  const done = ready && state.passedLevels.length === levels.length;

  useEffect(() => {
    if (ready && state.nickname) setName(state.nickname);
  }, [ready, state.nickname]);

  useEffect(() => {
    if (!done) return;
    void confetti({ particleCount: 220, spread: 100, origin: { y: 0.6 } });
  }, [done]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <div className="rounded-[2rem] border-4 border-emerald-500 bg-white p-8 text-center shadow-2xl shadow-emerald-500/10 dark:bg-[#0d1424]">
        <p className="text-6xl">{done ? "🏆" : "🎯"}</p>
        <h1 className="mt-4 text-3xl font-black">
          {done ? "تبریک! دوره‌ی Vue رو تموم کردی" : "هنوز چند قدم مونده!"}
        </h1>

        {done ? (
          <>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              تو هر {levels.length} مرحله رو پاس کردی و {state.xp} از {totalXp} امتیاز گرفتی. حالا
              دیگه می‌تونی با خیال راحت بگی: «من Vue بلدم» 😎
            </p>

            <div className="mx-auto mt-8 max-w-md rounded-2xl border border-dashed border-emerald-400 p-6">
              <p className="text-xs text-slate-500 dark:text-slate-400">این گواهی تعلق دارد به</p>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNickname(e.target.value);
                }}
                placeholder="اسمت رو بنویس ✍️"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2 text-center text-xl font-extrabold outline-none focus:border-emerald-500 dark:border-slate-700"
              />
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                🍃 دوره‌ی تعاملی Vue 3 — ویوکده
              </p>
            </div>

            <div className="mt-8 text-start">
              <h2 className="font-extrabold">قدم‌های بعدی 🚶</h2>
              <ul className="mt-2 list-disc space-y-1 ps-6 text-sm text-slate-600 dark:text-slate-300">
                <li>Vue Router برای صفحه‌بندی اپ‌های چندصفحه‌ای</li>
                <li>Pinia برای مدیریت استیت گلوبال</li>
                <li>چرخه‌ی حیات کامپوننت‌ها (onMounted و دوستان)</li>
                <li>Nuxt برای SSR و پروژه‌های فول‌استک</li>
              </ul>
            </div>
          </>
        ) : (
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            {ready ? state.passedLevels.length : 0} مرحله از {levels.length} رو تموم کردی. برگرد و
            بقیه‌ش رو هم بترکون! 💪
          </p>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-xl bg-emerald-500 px-6 py-3 font-bold text-white transition hover:bg-emerald-600"
          >
            برگرد به نقشه‌ی دوره 🗺️
          </Link>
          <a
            href="https://vuejs.org/guide/introduction.html"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-slate-300 px-6 py-3 font-bold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            مستندات رسمی Vue 📚
          </a>
        </div>
      </div>
    </div>
  );
}
