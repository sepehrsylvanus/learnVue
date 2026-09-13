"use client";

import Link from "next/link";
import { useState } from "react";
import type { Level } from "@/content/types";
import { levels } from "@/content";
import { useProgress } from "./progress-provider";
import LessonBlocks from "./lesson-blocks";
import Playground from "./playground/playground";
import Quiz from "./quiz";
import LevelSidebar from "./level-sidebar";

type Tab = "learn" | "build" | "quiz";

const TABS: { key: Tab; label: string }[] = [
  { key: "learn", label: "📖 یاد بگیر" },
  { key: "build", label: "🔨 بساز" },
  { key: "quiz", label: "🧠 کوییز" },
];

export default function LevelView({ level }: { level: Level }) {
  const [tab, setTab] = useState<Tab>("learn");
  const { isUnlocked, isBuilt, markBuilt, ready } = useProgress();
  const prev = levels.find((l) => l.id === level.id - 1);
  const locked = ready && !isUnlocked(level.id);

  if (locked) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="text-6xl">🔒</p>
        <h1 className="mt-4 text-2xl font-extrabold">این مرحله هنوز قفله!</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          اول باید کوییز مرحله‌ی «{prev?.title}» رو پاس کنی. قول می‌دم سخت نباشه 😉
        </p>
        <Link
          href={prev ? `/levels/${prev.slug}` : "/"}
          className="mt-6 inline-block rounded-xl bg-emerald-500 px-6 py-3 font-bold text-white"
        >
          برو به مرحله‌ی قبل {prev?.emoji}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[260px_1fr]">
      <aside className="hidden lg:block">
        <div className="sticky top-20 rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-[#0d1424]">
          <LevelSidebar currentId={level.id} />
        </div>
      </aside>

      <div className="min-w-0">
        {/* هدر مرحله */}
        <div className="rounded-3xl bg-gradient-to-l from-emerald-500/15 via-teal-500/10 to-indigo-500/15 p-6">
          <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
            مرحله {level.id} از {levels.length} • ⏱ {level.duration} • ⭐ {level.xp} XP
          </p>
          <h1 className="mt-2 text-2xl font-extrabold sm:text-3xl">
            {level.emoji} {level.title}
          </h1>
          <p className="mt-1 text-slate-600 dark:text-slate-300">{level.tagline}</p>
          <a
            href={level.docsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-xs text-slate-500 underline underline-offset-4 hover:text-emerald-600 dark:text-slate-400"
          >
            🔗 همین موضوع در مستندات رسمی Vue
          </a>
        </div>

        {/* تب‌ها */}
        <div className="sticky top-16 z-30 my-4 flex gap-2 rounded-2xl border border-slate-200 bg-white/90 p-1.5 backdrop-blur dark:border-slate-800 dark:bg-[#0d1424]/90">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={
                "flex-1 rounded-xl px-3 py-2 text-sm font-bold transition " +
                (tab === t.key
                  ? "bg-emerald-500 text-white shadow"
                  : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800")
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "learn" && (
          <section className="animate-pop space-y-6">
            <article className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#0d1424]">
              <LessonBlocks blocks={level.learn} />
            </article>

            <div>
              <h3 className="mb-1 text-lg font-extrabold">🎬 دمو زنده: {level.demo.title}</h3>
              <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">
                {level.demo.description}
              </p>
              <Playground
                levelId={level.id}
                scope="demo"
                files={level.demo.files}
                height={420}
                persist={false}
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setTab("build")}
                className="rounded-xl bg-emerald-500 px-5 py-3 font-bold text-white transition hover:bg-emerald-600"
              >
                بریم پروژه رو بسازیم 🔨
              </button>
            </div>
          </section>
        )}

        {tab === "build" && (
          <section className="animate-pop space-y-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#0d1424]">
              <h2 className="text-xl font-extrabold">{level.project.title}</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-300">{level.project.brief}</p>

              <h4 className="mt-5 mb-2 font-bold">📋 قدم به قدم:</h4>
              <ol className="space-y-2 text-sm">
                {level.project.steps.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-emerald-500/15 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {i + 1}
                    </span>
                    <span className="text-slate-600 dark:text-slate-300">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <Playground
              levelId={level.id}
              scope="project"
              files={level.project.starter}
              solution={level.project.solution}
              height={520}
            />

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-dashed border-emerald-400 p-4">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                پروژه‌ات رو ساختی؟ کارت حرف نداشت! 👏 حالا وقتِ کوییزه.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => markBuilt(level.id)}
                  className="rounded-xl border border-emerald-500 px-4 py-2 text-sm font-bold text-emerald-600 transition hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-500/10"
                >
                  {ready && isBuilt(level.id) ? "✅ ساخته شد" : "ساختمش!"}
                </button>
                <button
                  onClick={() => setTab("quiz")}
                  className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-600"
                >
                  بریم کوییز 🧠
                </button>
              </div>
            </div>
          </section>
        )}

        {tab === "quiz" && (
          <section className="animate-pop">
            <Quiz level={level} />
          </section>
        )}
      </div>
    </div>
  );
}
