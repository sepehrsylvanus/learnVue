/**
 * تعریف ساختار محتوای دوره.
 * برای اضافه‌کردن مرحله‌ی جدید کافیست یک فایل تازه در src/content/levels بسازی
 * و آن را در src/content/index.ts ثبت کنی.
 */

export type Block =
  | { kind: "h"; text: string }
  | { kind: "p"; text: string }
  | { kind: "list"; items: string[]; ordered?: boolean }
  | { kind: "code"; code: string; caption?: string }
  | { kind: "tip"; title?: string; text: string }
  | { kind: "warn"; title?: string; text: string }
  | { kind: "analogy"; text: string };

/** مجموعه فایل‌های یک پروژه‌ی پلی‌گراند. کلید حتماً با / شروع می‌شود. */
export type SandboxFiles = Record<string, string>;

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  /** ایندکس گزینه‌ی درست */
  answer: number;
  /** توضیح بعد از جواب دادن */
  explain: string;
};

export type Demo = {
  title: string;
  description: string;
  files: SandboxFiles;
};

export type Project = {
  title: string;
  brief: string;
  steps: string[];
  starter: SandboxFiles;
  solution: SandboxFiles;
};

export type Level = {
  id: number;
  slug: string;
  emoji: string;
  title: string;
  tagline: string;
  xp: number;
  docsUrl: string;
  duration: string;
  learn: Block[];
  demo: Demo;
  project: Project;
  quiz: QuizQuestion[];
};
