"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  files: Record<string, string>;
  dark: boolean;
  /** هر بار تغییر کند، پیش‌نمایش از صفر ری‌استارت می‌شود */
  reloadKey?: number;
  className?: string;
};

export default function VuePreview({ files, dark, reloadKey = 0, className }: Props) {
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const [booted, setBooted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const filesRef = useRef(files);
  filesRef.current = files;

  const send = useCallback(() => {
    const win = frameRef.current?.contentWindow;
    if (!win) return;
    win.postMessage(
      { target: "vue-sandbox", type: "render", files: filesRef.current, dark },
      "*",
    );
  }, [dark]);

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      const data = event.data as { source?: string; type?: string; message?: string };
      if (!data || data.source !== "vue-sandbox") return;
      if (data.type === "boot") {
        setBooted(true);
        send();
      }
      if (data.type === "ready") setError(null);
      if (data.type === "error") setError(data.message ?? "خطای ناشناخته");
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [send]);

  // ارسال کد جدید با هر تغییر
  useEffect(() => {
    if (!booted) return;
    setError(null);
    send();
  }, [files, dark, booted, send]);

  // ری‌استارت کامل
  useEffect(() => {
    if (!reloadKey) return;
    setBooted(false);
    const frame = frameRef.current;
    if (frame) frame.src = "/sandbox.html?r=" + reloadKey;
  }, [reloadKey]);

  return (
    <div className={"relative h-full w-full " + (className ?? "")}>
      <iframe
        ref={frameRef}
        src="/sandbox.html"
        title="پیش‌نمایش زنده"
        sandbox="allow-scripts allow-same-origin allow-modals allow-popups"
        className="h-full w-full border-0 bg-white dark:bg-[#0b1220]"
      />
      {!booted && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center bg-white/70 text-sm text-slate-500 dark:bg-[#0b1220]/70 dark:text-slate-400">
          ⏳ در حال روشن کردن موتور Vue...
        </div>
      )}
      {error && (
        <div className="absolute inset-x-2 bottom-2 rounded-xl border border-rose-300 bg-rose-50 px-3 py-2 text-xs text-rose-700 shadow dark:border-rose-900 dark:bg-rose-950/80 dark:text-rose-300">
          💥 {error}
        </div>
      )}
    </div>
  );
}
