"use client";

import { useEffect, useState } from "react";
import type { Level } from "@/content/types";
import { useProgress } from "./progress-provider";
import { getSandboxSnapshot } from "@/lib/sandbox-store";

type Verdict = { passed: boolean; text: string };

/** جمع‌کردن کد فعلی sandbox پروژه‌ی این مرحله */
function currentProjectCode(levelId: number): string {
  const snapshot = getSandboxSnapshot();
  const files = snapshot[`${levelId}:project`];
  if (!files) return "";
  return Object.entries(files)
    .map(([name, code]) => `--- ${name} ---\n${code}`)
    .join("\n\n");
}

export default function ProjectSteps({ level }: { level: Level }) {
  const { ready, stepsPassed, passStep, markBuilt, isBuilt } = useProgress();
  const passed = ready ? stepsPassed(level.id) : [];
  const total = level.project.steps.length;
  const allDone = passed.length >= total;
  const activeIndex = level.project.steps.findIndex((_, i) => !passed.includes(i));

  const [checking, setChecking] = useState(false);
  const [feedback, setFeedback] = useState<Verdict | null>(null);
  const [error, setError] = useState<string | null>(null);

  // وقتی همه‌ی قدم‌ها پاس شد، پروژه به‌عنوان «ساخته‌شده» ثبت می‌شود
  useEffect(() => {
    if (allDone && !isBuilt(level.id)) markBuilt(level.id);
  }, [allDone, level.id, markBuilt, isBuilt]);

  async function checkCurrent() {
    if (checking || activeIndex < 0) return;
    setChecking(true);
    setFeedback(null);
    setError(null);
    try {
      const res = await fetch("/api/ai/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          levelId: level.id,
          stepIndex: activeIndex + 1,
          step: level.project.steps[activeIndex],
          steps: level.project.steps,
          code: currentProjectCode(level.id),
          lessonContext: `${level.title} — ${level.tagline}\n${level.project.title}: ${level.project.brief}`,
        }),
      });
      const data = (await res.json()) as { passed?: boolean; feedback?: string; error?: string };
      if (!res.ok || typeof data.passed !== "boolean") {
        setError(data.error ?? "بررسی انجام نشد؛ دوباره تلاش کن.");
      } else if (data.passed) {
        passStep(level.id, activeIndex);
        setFeedback({ passed: true, text: data.feedback ?? "آفرین! این قدم تایید شد. 🎉" });
      } else {
        setFeedback({ passed: false, text: data.feedback ?? "این قدم هنوز کامل نیست." });
      }
    } catch {
      setError("ارتباط با داور برقرار نشد 🥲 اینترنتت رو چک کن.");
    } finally {
      setChecking(false);
    }
  }

  return (
    <div className="space-y-2">
      {level.project.steps.map((step, i) => {
        const done = passed.includes(i);
        const active = i === activeIndex;
        const locked = !done && !active;

        return (
          <div
            key={i}
            className={
              "rounded-2xl border p-4 transition " +
              (done
                ? "border-emerald-400 bg-emerald-50/60 dark:bg-emerald-500/10"
                : active
                  ? "border-emerald-500 bg-white dark:bg-[#0d1424]"
                  : "border-dashed border-slate-300 opacity-60 dark:border-slate-700")
            }
          >
            <div className="flex items-start gap-3">
              <span
                className={
                  "grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-bold " +
                  (done
                    ? "bg-emerald-500 text-white"
                    : active
                      ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                      : "bg-slate-200 text-slate-400 dark:bg-slate-800")
                }
              >
                {done ? "✓" : locked ? "🔒" : i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p
                  className={
                    "text-sm leading-7 " +
                    (done
                      ? "text-slate-500 line-through dark:text-slate-400"
                      : "text-slate-700 dark:text-slate-200")
                  }
                >
                  {step}
                </p>

                {done && (
                  <p className="mt-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    این قدم تایید شد 🎉
                  </p>
                )}

                {active && (
                  <div className="mt-3">
                    <button
                      onClick={checkCurrent}
                      disabled={checking}
                      className="rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-white transition hover:bg-emerald-600 disabled:opacity-50"
                    >
                      {checking ? "دارم بررسی می‌کنم… 🕵️" : "بررسی کن ✅"}
                    </button>

                    {feedback && (
                      <div
                        className={
                          "mt-3 rounded-xl p-3 text-sm leading-7 " +
                          (feedback.passed
                            ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                            : "bg-amber-500/10 text-amber-700 dark:text-amber-300")
                        }
                      >
                        <span className="font-extrabold">
                          {feedback.passed ? "🎉 " : "🤔 "}
                        </span>
                        {feedback.text}
                      </div>
                    )}

                    {error && (
                      <p className="mt-3 rounded-xl bg-rose-500/10 p-3 text-xs text-rose-600 dark:text-rose-400">
                        {error}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {allDone && (
        <div className="mt-4 rounded-2xl border border-emerald-400 bg-emerald-50 p-4 text-center dark:bg-emerald-500/10">
          <p className="text-sm font-extrabold text-emerald-700 dark:text-emerald-300">
            🎊 همه‌ی قدم‌ها کامل شد! پروژه‌ات آماده‌ئه.
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            خواستی خلاقیت به خرج بده و قشنگ‌ترش کنی — بعدش سراغ کوییز برو 🧠
          </p>
        </div>
      )}
    </div>
  );
}
