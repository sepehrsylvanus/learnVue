"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import confetti from "canvas-confetti";
import type { Level } from "@/content/types";
import { useProgress } from "./progress-provider";
import { levels } from "@/content";

const WRONG_LINES = [
  "اوه نه! 😅 این یکی نبود، دوباره امتحان کن.",
  "نزدیک بود ولی نه! 🙃 یه بار دیگه بخونش.",
  "اشتباه! ولی نگران نباش، همه‌ی برنامه‌نویس‌ها این کارو کردن 😆",
  "هوم... نه! 🤔 برگرد یه نگاه به بخش «یاد بگیر» بنداز.",
];

export default function Quiz({ level }: { level: Level }) {
  const { passLevel, isPassed } = useProgress();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [wrongShake, setWrongShake] = useState<string | null>(null);
  const [celebrated, setCelebrated] = useState(false);

  const correctCount = useMemo(
    () => level.quiz.filter((q) => answers[q.id] === q.answer).length,
    [answers, level.quiz],
  );

  const allCorrect = correctCount === level.quiz.length;
  const already = isPassed(level.id);
  const nextLevel = levels.find((l) => l.id === level.id + 1);

  function choose(questionId: string, index: number, answer: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: index }));
    if (index !== answer) {
      setWrongShake(questionId);
      setTimeout(() => setWrongShake(null), 700);
      return;
    }
    const next = { ...answers, [questionId]: index };
    const done = level.quiz.every((q) => next[q.id] === q.answer);
    if (done && !celebrated) {
      setCelebrated(true);
      passLevel(level.id, level.xp);
      void confetti({ particleCount: 160, spread: 85, origin: { y: 0.6 } });
      setTimeout(
        () => void confetti({ particleCount: 90, spread: 110, origin: { y: 0.5 } }),
        350,
      );
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between rounded-2xl bg-gradient-to-l from-indigo-500/10 to-emerald-500/10 p-4">
        <p className="font-bold">
          🧠 کوییز مرحله‌ی {level.id} — {correctCount} از {level.quiz.length} درست
        </p>
        {already && (
          <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">
            ✅ پاس شده
          </span>
        )}
      </div>

      {level.quiz.map((q, qi) => {
        const picked = answers[q.id];
        const answered = picked !== undefined;
        const isCorrect = picked === q.answer;

        return (
          <div
            key={q.id}
            className={
              "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#0d1424] " +
              (wrongShake === q.id ? "animate-shake" : "")
            }
          >
            <p className="mb-4 font-bold text-slate-900 dark:text-white">
              {qi + 1}. {q.question}
            </p>
            <div className="grid gap-2">
              {q.options.map((opt, oi) => {
                const selected = picked === oi;
                const showRight = answered && oi === q.answer && isCorrect;
                const showWrong = selected && !isCorrect;
                return (
                  <button
                    key={oi}
                    onClick={() => !isCorrect && choose(q.id, oi, q.answer)}
                    disabled={isCorrect}
                    className={
                      "flex items-center gap-3 rounded-xl border p-3 text-start text-sm transition " +
                      (showRight
                        ? "border-emerald-500 bg-emerald-50 font-bold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                        : showWrong
                          ? "border-rose-400 bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300"
                          : "border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 dark:border-slate-700 dark:hover:border-emerald-500 dark:hover:bg-emerald-500/5")
                    }
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-slate-100 text-xs font-bold dark:bg-slate-800">
                      {["الف", "ب", "ج", "د"][oi]}
                    </span>
                    <span className="flex-1" dir="auto">
                      {opt}
                    </span>
                    {showRight && <span>✅</span>}
                    {showWrong && <span>❌</span>}
                  </button>
                );
              })}
            </div>

            {answered && (
              <p
                className={
                  "mt-3 rounded-xl p-3 text-sm " +
                  (isCorrect
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                    : "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300")
                }
              >
                {isCorrect ? q.explain : WRONG_LINES[qi % WRONG_LINES.length]}
              </p>
            )}
          </div>
        );
      })}

      {allCorrect && (
        <div className="animate-pop rounded-3xl bg-gradient-to-l from-emerald-500 to-teal-600 p-6 text-center text-white shadow-xl shadow-emerald-500/25">
          <p className="text-4xl">🎉</p>
          <h3 className="mt-2 text-2xl font-extrabold">ایول! مرحله {level.id} رو رد کردی</h3>
          <p className="mt-1 opacity-90">
            +{level.xp} XP گرفتی{nextLevel ? " و مرحله‌ی بعد باز شد 🔓" : " و دوره رو تموم کردی! 🏆"}
          </p>
          <div className="mt-4 flex justify-center gap-3">
            {nextLevel ? (
              <Link
                href={`/levels/${nextLevel.slug}`}
                className="rounded-xl bg-white px-5 py-2.5 font-bold text-emerald-700 transition hover:bg-emerald-50"
              >
                برو به مرحله‌ی بعد {nextLevel.emoji}
              </Link>
            ) : (
              <Link
                href="/finish"
                className="rounded-xl bg-white px-5 py-2.5 font-bold text-emerald-700 transition hover:bg-emerald-50"
              >
                دیدن گواهی پایان دوره 🏅
              </Link>
            )}
            <Link
              href="/"
              className="rounded-xl border border-white/50 px-5 py-2.5 font-bold text-white transition hover:bg-white/10"
            >
              نقشه‌ی دوره 🗺️
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
