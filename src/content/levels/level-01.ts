import type { Level } from "../types";

const level: Level = {
  id: 1,
  slug: "what-is-vue",
  emoji: "👋",
  title: "ویو چیه و چطوری روشنش کنیم؟",
  tagline: "اولین قدم: بفهمیم این موجود سبز چیکار می‌کنه",
  xp: 100,
  duration: "۱۰ دقیقه",
  docsUrl: "https://vuejs.org/guide/introduction.html",
  learn: [
    {
      kind: "p",
      text: "سلام رفیق! 👋 خوش اومدی به دنیای Vue. ویو یه فریم‌ورک جاوااسکریپتیه برای ساختن رابط کاربری. یعنی چی؟ یعنی به‌جای اینکه تو با دست بری سراغ DOM و بگی «این متن رو عوض کن، این دکمه رو قرمز کن»، فقط به ویو می‌گی «داده‌ی من اینه» و ویو خودش صفحه رو هماهنگ نگه می‌داره.",
    },
    {
      kind: "analogy",
      text: "جاوااسکریپت خالی مثل آشپزی کردن با دست خودته 🍳 — همه‌چی رو باید خودت هم بزنی. ویو مثل یه آشپزخونه‌ی هوشمنده: تو فقط مواد اولیه (داده) رو می‌ذاری، غذا (UI) خودش به‌روز می‌مونه.",
    },
    { kind: "h", text: "دو تا ستون اصلی ویو" },
    {
      kind: "list",
      items: [
        "**رندر اعلانی (Declarative Rendering):** با یه سینتکس شبیه HTML توصیف می‌کنی خروجی چه شکلیه.",
        "**واکنش‌پذیری (Reactivity):** ویو تغییرات داده‌ها رو ردیابی می‌کنه و فقط همون تیکه از صفحه رو آپدیت می‌کنه.",
      ],
    },
    { kind: "h", text: "یه کامپوننت ویو چه شکلیه؟" },
    {
      kind: "p",
      text: "فایل‌های ویو پسوند ‎.vue‎ دارن و بهشون می‌گن SFC یا Single-File Component. هر فایل سه بخش داره: منطق (script)، ظاهر (template) و استایل (style). همه چی کنار هم، تمیز و مرتب.",
    },
    {
      kind: "code",
      caption: "ساختار یک فایل .vue",
      code: `<script setup>
// اینجا منطق برنامه می‌نویسیم (مغز 🧠)
import { ref } from 'vue'
const message = ref('سلام ویو!')
</script>

<template>
  <!-- اینجا ظاهر رو می‌سازیم (صورت 😀) -->
  <h1>{{ message }}</h1>
</template>

<style scoped>
/* اینجا استایل، فقط مخصوص همین کامپوننت (لباس 👕) */
h1 { color: #42b883; }
</style>`,
    },
    { kind: "h", text: "راه‌اندازی روی کامپیوتر خودت" },
    {
      kind: "p",
      text: "لازم نیست الان چیزی نصب کنی — پلی‌گراند همین سایت کد ویوی واقعی رو اجرا می‌کنه. ولی وقتی خواستی پروژه‌ی جدی بزنی، فقط این چند خط کافیه:",
    },
    {
      kind: "code",
      caption: "ترمینال",
      code: `npm create vue@latest my-app
cd my-app
npm install
npm run dev`,
    },
    {
      kind: "tip",
      title: "دو مدل نوشتن",
      text: "ویو دو تا API داره: Options API (با data و methods) و Composition API (با script setup و ref). ما تو کل دوره از Composition API استفاده می‌کنیم چون مدرن‌تره، خلاصه‌تره و مستندات رسمی هم برای پروژه‌های جدید همینو پیشنهاد می‌کنه. 😎",
    },
  ],
  demo: {
    title: "اولین کامپوننت زنده‌ی تو",
    description:
      "متن داخل ref رو عوض کن و ببین سمت راست (یا پایین) بلافاصله تغییر می‌کنه. جادو نیست، واکنش‌پذیریه!",
    files: {
      "/App.vue": `<script setup>
import { ref } from 'vue'

// یک داده‌ی واکنش‌پذیر
const name = ref('رفیق')
const likes = ref(0)
</script>

<template>
  <h1>سلام {{ name }}! 👋</h1>
  <p>این متن رو از داخل کد عوض کن و ببین چی می‌شه.</p>
  <button @click="likes++">لایک ❤️ {{ likes }}</button>
</template>

<style scoped>
h1 { color: #42b883; }
</style>`,
    },
  },
  project: {
    title: "پروژه: کارت معرفی خودت 🪪",
    brief:
      "یه کارت معرفی بساز که اسم، لقب و یه جمله درباره‌ی خودت رو نشون بده؛ به‌علاوه یه دکمه که تعداد «سلام»هایی که گرفتی رو می‌شمره.",
    steps: [
      "داخل script setup سه تا ref بساز: fullName و role و bio.",
      "یک ref دیگه به اسم hellos با مقدار اولیه 0 اضافه کن.",
      "توی template مقادیر رو با {{ }} نمایش بده.",
      "یه دکمه بذار که با کلیک، hellos رو یکی زیاد کنه.",
      "با CSS داخل style scoped کارت رو خوشگل کن (رنگ سبز ویو: ‎#42b883‎).",
    ],
    starter: {
      "/App.vue": `<script setup>
import { ref } from 'vue'

// ۱) اطلاعات خودت رو اینجا بنویس
const fullName = ref('اسم تو')
// TODO: role و bio و hellos رو بساز

</script>

<template>
  <div class="card">
    <h1>{{ fullName }}</h1>
    <!-- TODO: نقش، بیو و دکمه‌ی سلام -->
  </div>
</template>

<style scoped>
.card {
  border: 2px solid #42b883;
  border-radius: 18px;
  padding: 18px;
  max-width: 340px;
}
</style>`,
    },
    solution: {
      "/App.vue": `<script setup>
import { ref } from 'vue'

const fullName = ref('سارا کدنویس')
const role = ref('Vue Developer در راه 🚀')
const bio = ref('عاشق قهوه، کد تمیز و انیمیشن‌های نرم.')
const hellos = ref(0)
</script>

<template>
  <div class="card">
    <div class="avatar">🧑‍💻</div>
    <h1>{{ fullName }}</h1>
    <p class="role">{{ role }}</p>
    <p>{{ bio }}</p>
    <button @click="hellos++">سلام کن 👋</button>
    <p class="counter">تا حالا {{ hellos }} نفر بهت سلام کردن!</p>
  </div>
</template>

<style scoped>
.card {
  border: 2px solid #42b883;
  border-radius: 18px;
  padding: 18px;
  max-width: 340px;
  box-shadow: 0 10px 30px rgba(66, 184, 131, 0.15);
}
.avatar { font-size: 44px; }
h1 { margin: 6px 0; }
.role { color: #42b883; font-weight: 700; }
.counter { font-size: 13px; opacity: 0.8; }
</style>`,
    },
  },
  quiz: [
    {
      id: "l1q1",
      question: "فایل‌های SFC در ویو معمولاً چه پسوندی دارن؟",
      options: [".vuejs", ".vue", ".vc", ".html"],
      answer: 1,
      explain: "آفرین! پسوند ‎.vue‎ درسته — سه‌گانه‌ی template و script و style توی یک فایل. 🎯",
    },
    {
      id: "l1q2",
      question: "کدوم گزینه بهترین توصیف ویوئه؟",
      options: [
        "یک پایگاه داده برای ذخیره‌ی اطلاعات",
        "یک فریم‌ورک جاوااسکریپتی برای ساخت رابط کاربری",
        "یک زبان برنامه‌نویسی جدید",
        "یک ادیتور کد",
      ],
      answer: 1,
      explain:
        "دقیقاً! ویو یه فریم‌ورک UIه که روی HTML و CSS و JS استاندارد ساخته شده. نه زبان جدیده، نه دیتابیس. 😄",
    },
    {
      id: "l1q3",
      question: "توی Composition API، منطق کامپوننت رو معمولاً کجا می‌نویسیم؟",
      options: [
        "داخل <template>",
        "داخل <style scoped>",
        "داخل <script setup>",
        "داخل فایل package.json",
      ],
      answer: 2,
      explain: "درسته! ‎<script setup>‎ خونه‌ی منطق برنامه‌ست. 🧠",
    },
  ],
};

export default level;
