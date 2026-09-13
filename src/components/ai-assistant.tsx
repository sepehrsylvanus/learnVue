"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { Block } from "@/content/types";
import { getLevel } from "@/content";
import { getSandboxSnapshot, sandboxToText } from "@/lib/sandbox-store";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Vue چیه به زبان ساده؟ 🤔",
  "فرق ref و reactive چیه؟",
  "v-if بهتره یا v-show؟",
  "کامپوننت چطوری بنویسم؟",
];

/** تبدیل بلاک‌های درس به متن ساده برای context مدل */
function blockToText(b: Block): string {
  switch (b.kind) {
    case "h":
      return `## ${b.text}`;
    case "p":
    case "analogy":
      return b.text;
    case "list":
      return b.items.map((i) => `- ${i}`).join("\n");
    case "code":
      return `${b.caption ? `(${b.caption})\n` : ""}\`\`\`\n${b.code}\n\`\`\``;
    case "tip":
    case "warn":
      return `${b.kind === "tip" ? "💡" : "⚠️"} ${b.title ? `${b.title}: ` : ""}${b.text}`;
    default:
      return "";
  }
}

function levelContext(slug: string | null): string {
  if (!slug) return "";
  const level = getLevel(slug);
  if (!level) return "";
  const learn = level.learn.slice(0, 60).map(blockToText).join("\n\n");
  const quiz = level.quiz.map((q) => `${q.question} → ${q.options[q.answer]}`).join("\n");
  const steps = level.project.steps.map((s, i) => `${i + 1}. ${s}`).join("\n");
  const ctx = [
    `مرحله‌ی ${level.id}: ${level.title} — ${level.tagline}`,
    learn,
    `پروژه‌ی این مرحله: ${level.project.title}\n${level.project.brief}\nقدم‌های پروژه:\n${steps}`,
    quiz && `سوالات کوییز این مرحله:\n${quiz}`,
  ]
    .filter(Boolean)
    .join("\n\n");
  return ctx.length > 8000 ? ctx.slice(0, 8000) : ctx;
}

/** کد زنده‌ی sandbox ها (فقط مربوط به همین مرحله) */
function sandboxContext(slug: string | null): string {
  if (!slug) return "";
  const level = getLevel(slug);
  if (!level) return "";
  const snapshot = getSandboxSnapshot();
  const relevant: Record<string, Record<string, string>> = {};
  for (const [key, files] of Object.entries(snapshot)) {
    if (key.startsWith(`${level.id}:`)) relevant[key] = files;
  }
  return sandboxToText(relevant);
}

/** رندر ساده‌ی مارک‌داون: بلاک کد + بولد */
function renderContent(text: string) {
  return text.split(/```/).map((part, i) => {
    if (i % 2 === 1) {
      const lines = part.replace(/^\w*\n/, "").trim();
      return (
        <pre
          key={i}
          dir="ltr"
          className="my-2 overflow-x-auto rounded-xl bg-slate-900 p-3 text-left font-mono text-xs leading-relaxed text-emerald-200"
        >
          <code>{lines}</code>
        </pre>
      );
    }
    const nodes: React.ReactNode[] = [];
    part.split(/(\*\*[^*]+\*\*)/g).forEach((seg, j) => {
      if (seg.startsWith("**") && seg.endsWith("**")) {
        nodes.push(<strong key={j}>{seg.slice(2, -2)}</strong>);
      } else if (seg) {
        nodes.push(<span key={j}>{seg}</span>);
      }
    });
    return (
      <span key={i} className="whitespace-pre-wrap leading-relaxed">
        {nodes}
      </span>
    );
  });
}

export default function AiAssistant() {
  const pathname = usePathname();
  const slug = pathname.startsWith("/levels/") ? pathname.split("/")[2] ?? null : null;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "سلام رفیق! 👋 من دستیار ویوکده‌ام. هر سوالی درباره‌ی Vue یا درسی که روش کار می‌کنی داری بپرس — با کمال میل جواب می‌دم! 🍃",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    setError(null);
    setInput("");
    const next = [...messages, { role: "user" as const, content }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.slice(-12),
          context: levelContext(slug),
          sandbox: sandboxContext(slug),
        }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      if (!res.ok || !data.reply) {
        setError(data.error ?? "جوابی نیامد؛ دوباره امتحان کن.");
      } else {
        setMessages((m) => [...m, { role: "assistant", content: data.reply! }]);
      }
    } catch {
      setError("ارتباط با دستیار برقرار نشد 🥲 اینترنتت رو چک کن.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* دکمه‌ی شناور */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="دستیار هوشمند"
        className="fixed bottom-5 left-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 text-2xl shadow-xl shadow-emerald-500/30 transition hover:scale-110 active:scale-95"
      >
        {open ? "✕" : "🤖"}
      </button>

      {/* پنل چت */}
      {open && (
        <div className="fixed bottom-24 left-5 z-50 flex h-[70vh] max-h-[560px] w-[min(92vw,380px)] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-[#0d1424]">
          {/* هدر */}
          <div className="flex items-center gap-3 bg-gradient-to-l from-emerald-500/15 to-teal-500/10 px-4 py-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 text-lg">
              🤖
            </span>
            <div className="min-w-0">
              <p className="text-sm font-extrabold">دستیار ویوکده</p>
              <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                {slug ? `همراهت در مرحله: ${getLevel(slug)?.title ?? ""}` : "سوال‌های کلی Vue 🍃"}
              </p>
            </div>
          </div>
          {/* پیام‌ها */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-start" : "flex justify-end"}>
                <div
                  className={
                    "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm " +
                    (m.role === "user"
                      ? "rounded-bl-md bg-emerald-500 text-white"
                      : "rounded-br-md bg-slate-100 text-slate-800 dark:bg-slate-800/80 dark:text-slate-100")
                  }
                >
                  {renderContent(m.content)}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-end">
                <div className="flex gap-1 rounded-2xl rounded-br-md bg-slate-100 px-4 py-3 dark:bg-slate-800/80">
                  {[0, 150, 300].map((d) => (
                    <span
                      key={d}
                      className="h-2 w-2 animate-bounce rounded-full bg-emerald-500"
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {error && (
              <p className="rounded-xl bg-rose-500/10 px-3 py-2 text-center text-xs text-rose-600 dark:text-rose-400">
                {error}
              </p>
            )}

            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-emerald-500/40 px-3 py-1.5 text-xs text-emerald-600 transition hover:bg-emerald-500/10 dark:text-emerald-400"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ورودی */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-slate-200 p-3 dark:border-slate-800"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="سوالت رو بپرس… ✍️"
              className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm outline-none focus:border-emerald-500 dark:border-slate-700"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-500 text-white transition hover:bg-emerald-600 disabled:opacity-40"
              aria-label="ارسال"
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}

