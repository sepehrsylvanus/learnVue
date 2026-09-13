"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import VuePreview from "./vue-preview";
import { useDark } from "@/lib/use-dark";
import { useProgress } from "@/components/progress-provider";

const CodeEditor = dynamic(() => import("./code-editor"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center text-xs text-slate-400">
      ⌨️ در حال آماده‌سازی ادیتور...
    </div>
  ),
});

type Props = {
  levelId: number;
  /** شناسه‌ی یکتا برای ذخیره‌سازی کد (مثلاً demo یا project) */
  scope: string;
  files: Record<string, string>;
  solution?: Record<string, string>;
  height?: number;
  /** آیا کد کاربر در پیشرفت ذخیره شود؟ */
  persist?: boolean;
};

export default function Playground({
  levelId,
  scope,
  files,
  solution,
  height = 440,
  persist = true,
}: Props) {
  const dark = useDark();
  const { saveCode, getCode, ready } = useProgress();
  const fileNames = useMemo(() => Object.keys(files), [files]);

  const [current, setCurrent] = useState(fileNames[0]);
  const [code, setCode] = useState<Record<string, string>>(files);
  const [live, setLive] = useState<Record<string, string>>(files);
  const [showingSolution, setShowingSolution] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [restored, setRestored] = useState(false);
  const [stacked, setStacked] = useState(false);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  // بازیابی کد ذخیره‌شده‌ی کاربر
  useEffect(() => {
    if (!ready || restored) return;
    if (persist) {
      const restoredFiles: Record<string, string> = { ...files };
      let found = false;
      fileNames.forEach((name) => {
        const saved = getCode(levelId, `${scope}:${name}`);
        if (typeof saved === "string" && saved.length > 0) {
          restoredFiles[name] = saved;
          found = true;
        }
      });
      if (found) {
        setCode(restoredFiles);
        setLive(restoredFiles);
      }
    }
    setRestored(true);
  }, [ready, restored, persist, files, fileNames, getCode, levelId, scope]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const update = () => setStacked(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  function update(next: string) {
    const nextFiles = { ...code, [current]: next };
    setCode(nextFiles);
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(() => {
      setLive(nextFiles);
      if (persist) saveCode(levelId, `${scope}:${current}`, next);
    }, 550);
  }

  function applyFiles(next: Record<string, string>) {
    setCode(next);
    setLive(next);
    if (persist) {
      Object.entries(next).forEach(([name, value]) =>
        saveCode(levelId, `${scope}:${name}`, value),
      );
    }
  }

  function resetCode() {
    applyFiles({ ...files });
    setShowingSolution(false);
    setReloadKey((k) => k + 1);
  }

  function toggleSolution() {
    if (!solution) return;
    if (showingSolution) {
      applyFiles({ ...files });
      setShowingSolution(false);
    } else {
      applyFiles({ ...solution });
      setShowingSolution(true);
    }
    setReloadKey((k) => k + 1);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0d1424]">
      {/* نوار ابزار */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-[#111a2e]">
        <div className="flex flex-wrap items-center gap-1">
          {fileNames.map((name) => (
            <button
              key={name}
              onClick={() => setCurrent(name)}
              className={
                "rounded-lg px-3 py-1.5 font-mono text-xs transition " +
                (current === name
                  ? "bg-emerald-500 text-white shadow"
                  : "bg-slate-200 text-slate-600 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700")
              }
              dir="ltr"
            >
              {name.replace("/", "")}
            </button>
          ))}
        </div>

        <div className="ms-auto flex items-center gap-2">
          {showingSolution && (
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-amber-700 dark:bg-amber-500/20 dark:text-amber-300">
              👀 حالت جواب
            </span>
          )}
          <button
            onClick={() => {
              setLive({ ...code });
              setReloadKey((k) => k + 1);
            }}
            className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-emerald-600"
          >
            ▶️ اجرا
          </button>
          <button
            onClick={resetCode}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            ♻️ ریست
          </button>
          {solution && (
            <button
              onClick={toggleSolution}
              className="rounded-lg bg-indigo-500 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-indigo-600"
            >
              {showingSolution ? "🙈 مخفی کن" : "💡 جواب"}
            </button>
          )}
        </div>
      </div>

      {/* ادیتور + پیش‌نمایش */}
      <div
        className={stacked ? "flex flex-col" : "grid"}
        style={stacked ? undefined : { gridTemplateColumns: "1fr 1fr" }}
      >
        <div
          className="overflow-hidden border-slate-200 dark:border-slate-800 md:border-s"
          style={{ height: stacked ? height * 0.62 : height }}
        >
          <CodeEditor value={code[current] ?? ""} onChange={update} dark={dark} height="100%" />
        </div>
        <div
          className="border-t border-slate-200 md:border-t-0 dark:border-slate-800"
          style={{ height: stacked ? height * 0.62 : height }}
        >
          <VuePreview files={live} dark={dark} reloadKey={reloadKey} />
        </div>
      </div>
    </div>
  );
}
