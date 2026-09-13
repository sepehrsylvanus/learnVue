import Link from "next/link";
import CourseMap from "@/components/course-map";
import HeroPlayground from "@/components/hero-playground";
import { levels, totalXp } from "@/content";

const FEATURES = [
  {
    icon: "🧪",
    title: "پلی‌گراند واقعی Vue",
    text: "کد ‎.vue‎ می‌نویسی و همون لحظه توی مرورگر اجرا می‌شه. هیچ نصبی لازم نیست.",
  },
  {
    icon: "🎮",
    title: "سیستم مرحله‌ای",
    text: "هر مرحله با کوییز باز می‌شه، XP می‌گیری و پیشرفتت ذخیره می‌مونه.",
  },
  {
    icon: "🔨",
    title: "پروژه‌محور",
    text: "هر مرحله یه مینی‌پروژه‌ی واقعی داره؛ آخرش هم یه کپستون حسابی.",
  },
  {
    icon: "😄",
    title: "زبان آدمیزاد",
    text: "بدون کلمه‌های قلمبه. با مثال‌های خودمونی و کلی ایموجی.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="grid-bg">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-2 lg:items-center lg:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-300">
              🍃 بر اساس مستندات رسمی Vue.js
            </span>
            <h1 className="mt-5 text-4xl leading-tight font-black sm:text-5xl">
              ویو رو{" "}
              <span className="bg-gradient-to-l from-emerald-400 to-teal-600 bg-clip-text text-transparent">
                بازی‌وار
              </span>{" "}
              یاد بگیر، نه حفظی 🎮
            </h1>
            <p className="mt-4 max-w-lg text-lg text-slate-600 dark:text-slate-300">
              {levels.length} مرحله، {levels.length} مینی‌پروژه، یه عالمه کوییز و یه پلی‌گراند
              زنده که همون‌جا کدت رو اجرا می‌کنه. مثل یه رفیق که کنارت نشسته و Vue یادت می‌ده. ☕
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={`/levels/${levels[0].slug}`}
                className="rounded-2xl bg-emerald-500 px-7 py-3.5 font-bold text-white shadow-xl shadow-emerald-500/25 transition hover:-translate-y-0.5 hover:bg-emerald-600"
              >
                شروع مرحله‌ی اول 🚀
              </Link>
              <Link
                href="#map"
                className="rounded-2xl border border-slate-300 px-7 py-3.5 font-bold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                دیدن نقشه‌ی دوره 🗺️
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-6 text-sm text-slate-500 dark:text-slate-400">
              <span>⭐ {totalXp} امتیاز کل</span>
              <span>⏱ حدود ۳ ساعت</span>
              <span>💸 کاملاً رایگان</span>
            </div>
          </div>

          <div className="animate-floaty">
            <HeroPlayground />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0d1424]"
            >
              <p className="text-3xl">{f.icon}</p>
              <h3 className="mt-2 font-extrabold">{f.title}</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <CourseMap />

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
        ساخته‌شده با 💚 و Vue — محتوا بر پایه‌ی{" "}
        <a
          className="underline underline-offset-4"
          href="https://vuejs.org/guide/introduction.html"
          target="_blank"
          rel="noreferrer"
        >
          مستندات رسمی Vue.js
        </a>
      </footer>
    </>
  );
}
