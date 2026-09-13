"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { levels } from "@/content";
import { useProgress } from "./progress-provider";
import type { Block, QuizQuestion } from "@/content/types";

/** یه بلوک کد از محتوای مرحله برای نمایش در مرور */
function pickCodeBlock(blocks: Block[]): string | null {
  const code = blocks.find((b) => b.kind === "code");
  return code && code.kind === "code" ? code.code : null;
}

function ReviewCard({
  levelId,
  onNext,
  onSkip,
}: {
  levelId: number;
  onNext: () => void;
  onSkip: () => void;
}) {
  const level = levels.find((l) => l.id === levelId);
  const [picked, setPicked] = useState<number | null>(null);

  const question: QuizQuestion | undefined = useMemo(() => {
    if (!level || level.quiz.length === 0) return undefined;
    return level.quiz[Math.floor(Math.random() * level.quiz.length)];
  }, [level]);

  if (!level) return null;

  const snippet = pickCodeBlock(level.learn);
  const answered = picked !== null && question ? picked === question.answer : null;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-[#0d1424]">
      <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
        یادش هستی؟ 🤔 — مرحله {level.id}: {level.title}
      </p>
      <h3 className="mt-1 text-lg font-extrabold">
        {level.emoji} {level.tagline}
      </h3>

      {snippet && (
        <pre
          dir="ltr"
          className="mt-4 max-h-44 overflow-auto rounded-xl border border-slate-200 bg-slate-950 p-4 text-left font-mono text-xs leading-6 text-emerald-200 dark:border-slate-800"
        >
          {snippet.trim().slice(0, 500)}
        </pre>
      )}

      {question && (
        <div className="mt-4">
          <p className="text-sm font-bold">{question.question}</p>
          <div className="mt-3 grid gap-2">
            {question.options.map((opt, i) => {
              const isRight = i === question.answer;
              const chosen = picked === i;
              let cls =
                "border-slate-200 hover:border-emerald-400 dark:border-slate-700 dark:hover:border-emerald-500";
              if (picked !== null) {
                if (isRight)
                  cls = "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";
                else if (chosen)
                  cls = "border-rose-400 bg-rose-500/10 text-rose-600 dark:text-rose-300";
                else cls = "border-slate-200 opacity-50 dark:border-slate-700";
              }
              return (
                <button
                  key={i}
                  disabled={picked !== null}
                  onClick={() => setPicked(i)}
                  className={`rounded-xl border px-4 py-2.5 text-right text-sm transition ${cls}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {picked !== null && (
            <div
              className={`mt-3 rounded-xl p-3 text-sm ${
                answered
                  ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                  : "bg-amber-500/10 text-amber-700 dark:text-amber-300"
              }`}
            >
              {answered ? "ایول! یادته 🎉 " : "یه کم جا خوردی 😅 "}
              {question.explain}
            </div>
          )}
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={onNext}
          className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-600"
        >
          سوال دیگه 🔄
        </button>
        <Link
          href={`/levels/${level.slug}`}
          className="rounded-xl border border-emerald-500 px-4 py-2 text-sm font-bold text-emerald-600 transition hover:bg-emerald-500/10 dark:text-emerald-300"
        >
          مرور کامل این مرحله 📖
        </Link>
        <button
          onClick={onSkip}
          className="mr-auto rounded-xl px-4 py-2 text-sm text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          فعلاً نه ✋
        </button>
      </div>
    </div>
  );
}

export default function ReviewModal() {
  const { ready, state } = useProgress();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [round, setRound] = useState(0);

  const passed = state.passedLevels;

  useEffect(() => {
    if (!ready) return;
    // هر بار که اپ باز می‌شه، اگه حداقل یه مرحله پاس شده، مرور پیشنهاد می‌شه
    const dismissed = window.sessionStorage.getItem("vuekade-review-dismissed");
    if (!dismissed && passed.length > 0) setOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  // فقط توی صفحه‌ی اصلی نشونش بده
  if (pathname !== "/") return null;

  const candidate = passed[round % passed.length] ?? passed[0];

  const close = () => {
    setOpen(false);
    window.sessionStorage.setItem("vuekade-review-dismissed", "1");
  };

  if (!open || passed.length === 0 || !candidate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl">
        <ReviewCard
          key={`${candidate}-${round}`}
          levelId={candidate}
          onNext={() => setRound((r) => r + 1)}
          onSkip={close}
        />
      </div>
    </div>
  );
}
