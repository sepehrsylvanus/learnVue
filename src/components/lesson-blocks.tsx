"use client";

import type { ReactNode } from "react";
import type { Block } from "@/content/types";

/** پشتیبانی ساده از **بولد** و کدهای درون‌خطی (که با U+200E دور آن‌ها گذاشته شده) */
function RichText({ text }: { text: string }) {
  const parts = text.split("\u200E");
  const nodes: ReactNode[] = [];

  parts.forEach((part, index) => {
    if (index % 2 === 1) {
      nodes.push(
        <code
          key={`c${index}`}
          dir="ltr"
          className="mx-0.5 inline-block rounded-md bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[0.85em] text-emerald-700 dark:text-emerald-300"
        >
          {part}
        </code>,
      );
      return;
    }
    const bold = part.split(/\*\*(.+?)\*\*/g);
    bold.forEach((chunk, i) => {
      if (!chunk) return;
      nodes.push(
        i % 2 === 1 ? (
          <strong key={`b${index}-${i}`} className="font-extrabold text-slate-900 dark:text-white">
            {chunk}
          </strong>
        ) : (
          <span key={`t${index}-${i}`}>{chunk}</span>
        ),
      );
    });
  });

  return <>{nodes}</>;
}

function CodeBlock({ code, caption }: { code: string; caption?: string }) {
  return (
    <figure className="my-4 overflow-hidden rounded-2xl border border-slate-800 bg-[#0d1424] shadow-lg">
      {caption && (
        <figcaption className="border-b border-slate-800 bg-[#111a2e] px-4 py-2 text-xs font-bold text-slate-400">
          {caption}
        </figcaption>
      )}
      <pre className="ltr-code overflow-x-auto p-4 text-[13px] leading-7 text-slate-200">
        <code className="font-mono">{code}</code>
      </pre>
    </figure>
  );
}

export default function LessonBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="text-[15px] leading-8 text-slate-700 dark:text-slate-300">
      {blocks.map((block, i) => {
        switch (block.kind) {
          case "h":
            return (
              <h3
                key={i}
                className="mt-8 mb-3 text-xl font-extrabold text-slate-900 dark:text-white"
              >
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="my-3">
                <RichText text={block.text} />
              </p>
            );
          case "list": {
            const Tag = block.ordered ? "ol" : "ul";
            return (
              <Tag
                key={i}
                className={
                  "my-4 space-y-2 ps-6 " + (block.ordered ? "list-decimal" : "list-disc")
                }
              >
                {block.items.map((item, j) => (
                  <li key={j} className="marker:text-emerald-500">
                    <RichText text={item} />
                  </li>
                ))}
              </Tag>
            );
          }
          case "code":
            return <CodeBlock key={i} code={block.code} caption={block.caption} />;
          case "tip":
            return (
              <div
                key={i}
                className="my-4 rounded-2xl border-s-4 border-emerald-500 bg-emerald-50 p-4 dark:bg-emerald-500/10"
              >
                <p className="mb-1 font-extrabold text-emerald-700 dark:text-emerald-300">
                  💡 {block.title ?? "نکته"}
                </p>
                <p>
                  <RichText text={block.text} />
                </p>
              </div>
            );
          case "warn":
            return (
              <div
                key={i}
                className="my-4 rounded-2xl border-s-4 border-amber-500 bg-amber-50 p-4 dark:bg-amber-500/10"
              >
                <p className="mb-1 font-extrabold text-amber-700 dark:text-amber-300">
                  ⚠️ {block.title ?? "حواست باشه"}
                </p>
                <p>
                  <RichText text={block.text} />
                </p>
              </div>
            );
          case "analogy":
            return (
              <div
                key={i}
                className="my-4 rounded-2xl border border-dashed border-indigo-400 bg-indigo-50 p-4 dark:bg-indigo-500/10"
              >
                <p className="mb-1 font-extrabold text-indigo-600 dark:text-indigo-300">
                  🎭 یه مثال خودمونی
                </p>
                <p>
                  <RichText text={block.text} />
                </p>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
