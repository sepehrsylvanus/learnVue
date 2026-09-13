import type { Level } from "../types";

const level: Level = {
  id: 5,
  slug: "class-style",
  emoji: "🎨",
  title: "بایندینگ کلاس و استایل",
  tagline: "لباس پوشوندن به کامپوننت‌ها",
  xp: 120,
  duration: "۱۲ دقیقه",
  docsUrl: "https://vuejs.org/guide/essentials/class-and-style.html",
  learn: [
    {
      kind: "p",
      text: "class و style هم اتریبیوت‌اند، پس با ‎:‎ میشه بهشون مقدار داد. ولی ویو براشون یه لطف ویژه کرده: می‌تونی آبجکت یا آرایه بدی، نه فقط رشته. 💚",
    },
    { kind: "h", text: "سینتکس آبجکتی برای کلاس" },
    {
      kind: "code",
      code: `<div :class="{ active: isActive, 'text-danger': hasError }">
  کلاس‌ها بر اساس true/false روشن و خاموش می‌شن
</div>`,
    },
    { kind: "h", text: "سینتکس آرایه‌ای" },
    {
      kind: "code",
      code: `<div :class="[baseClass, isActive ? 'active' : '', { big: isBig }]"></div>

<!-- class ثابت و :class با هم ترکیب می‌شن، جایگزین نمی‌شن -->
<div class="card" :class="{ selected: isSelected }"></div>`,
    },
    { kind: "h", text: "استایل اینلاین" },
    {
      kind: "code",
      code: `<div :style="{ color: activeColor, fontSize: size + 'px' }"></div>
<!-- kebab-case هم قبوله ولی باید کوتیشن بذاری -->
<div :style="{ 'background-color': bg }"></div>
<!-- آرایه‌ای از چند آبجکت استایل -->
<div :style="[baseStyles, overrideStyles]"></div>`,
    },
    {
      kind: "tip",
      title: "ترکیب با computed",
      text: "وقتی شرط‌ها زیاد شدن، منطق کلاس رو ببر توی یک computed که یک آبجکت برگردونه. تمپلیتت تمیز می‌مونه و آدم‌های آینده (یعنی خودت) دعات می‌کنن. 🙏",
    },
    {
      kind: "analogy",
      text: "‎:class‎ مثل کمد لباسه 👕 — بر اساس حال و هوای داده‌ها لباس مناسب رو تن کامپوننت می‌کنی. ‎:style‎ هم مثل آرایش سریع و موردیه. 💄",
    },
  ],
  demo: {
    title: "دکمه‌ی حالت‌دار",
    description: "روی دکمه‌ها کلیک کن و ببین کلاس‌ها و استایل‌ها چطور زنده عوض می‌شن.",
    files: {
      "/App.vue": `<script setup>
import { ref, computed } from 'vue'

const isActive = ref(true)
const hasError = ref(false)
const size = ref(16)

const classes = computed(() => ({
  active: isActive.value,
  danger: hasError.value
}))
</script>

<template>
  <div class="box" :class="classes" :style="{ fontSize: size + 'px' }">
    من یک جعبه‌ام و حالم به داده‌ها بستگی داره!
  </div>

  <div class="row">
    <button @click="isActive = !isActive">فعال/غیرفعال</button>
    <button @click="hasError = !hasError">ارور روشن/خاموش</button>
    <button @click="size++">بزرگ‌تر 🔎</button>
    <button @click="size--">کوچیک‌تر</button>
  </div>
</template>

<style scoped>
.box { padding: 16px; border-radius: 14px; border: 2px dashed #cbd5e1; transition: all .25s; }
.box.active { border-color: #42b883; background: rgba(66,184,131,.12); }
.box.danger { border-color: #dc2626; background: rgba(220,38,38,.12); }
.row { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
</style>`,
    },
  },
  project: {
    title: "پروژه: سوییچ تم روشن/تاریک 🌗",
    brief:
      "یه پنل بساز که با یک دکمه بین تم روشن و تاریک سوییچ کنه، و با یه اسلایدر رنگ اصلی (accent) رو تغییر بده.",
    steps: [
      "یه ref بولین به اسم dark بساز.",
      "روی ریشه‌ی کامپوننت با ‎:class=\"{ dark: dark }\"‎ کلاس شرطی بذار.",
      "یه ref برای رنگ accent بساز و با ‎:style‎ اعمالش کن.",
      "یه computed برای متن دکمه بنویس (مثلاً «برو به تم تاریک 🌙»).",
      "برای نرم شدن تغییرات از transition در CSS استفاده کن.",
    ],
    starter: {
      "/App.vue": `<script setup>
import { ref, computed } from 'vue'

const dark = ref(false)
const accent = ref('#42b883')
// TODO: computed برای متن دکمه
</script>

<template>
  <div class="panel">
    <h3>پنل من</h3>
    <!-- TODO: کلاس شرطی و استایل داینامیک -->
    <button @click="dark = !dark">تغییر تم</button>
  </div>
</template>

<style scoped>
.panel { padding: 18px; border-radius: 18px; border: 1px solid #e2e8f0; }
</style>`,
    },
    solution: {
      "/App.vue": `<script setup>
import { ref, computed } from 'vue'

const dark = ref(false)
const accent = ref('#42b883')

const label = computed(() => (dark.value ? 'برو به تم روشن ☀️' : 'برو به تم تاریک 🌙'))
</script>

<template>
  <div class="panel" :class="{ dark: dark }" :style="{ '--accent': accent }">
    <h3 :style="{ color: accent }">پنل خوش‌تیپ من</h3>
    <p>تم فعلی: <b>{{ dark ? 'تاریک' : 'روشن' }}</b></p>

    <label>رنگ اصلی:
      <input type="color" v-model="accent" />
    </label>

    <div class="row">
      <button class="accent-btn" @click="dark = !dark">{{ label }}</button>
      <span class="badge" :class="{ on: dark }">{{ dark ? 'DARK' : 'LIGHT' }}</span>
    </div>
  </div>
</template>

<style scoped>
.panel {
  padding: 18px; border-radius: 18px; border: 1px solid #e2e8f0;
  background: #fff; color: #0f172a; transition: all .3s ease; max-width: 360px;
}
.panel.dark { background: #0f172a; color: #e2e8f0; border-color: #1e293b; }
.row { display: flex; align-items: center; gap: 10px; margin-top: 12px; }
.accent-btn { background: var(--accent); color: #04291b; }
.badge { font-size: 12px; padding: 4px 10px; border-radius: 999px; background: #e2e8f0; color: #0f172a; }
.badge.on { background: var(--accent); }
</style>`,
    },
  },
  quiz: [
    {
      id: "l5q1",
      question: "خروجی ‎<div class=\"card\" :class=\"{ active: true }\">‎ چیه؟",
      options: ['class="active"', 'class="card"', 'class="card active"', "ارور می‌ده"],
      answer: 2,
      explain: "درسته! class ثابت و ‎:class‎ با هم ترکیب می‌شن، همدیگه رو پاک نمی‌کنن. 🎨",
    },
    {
      id: "l5q2",
      question: "کدوم نوشتن استایل اینلاین درسته؟",
      options: [
        ":style=\"{ font-size: size }\"",
        ":style=\"{ fontSize: size + 'px' }\"",
        "style=\"fontSize: size\"",
        ":style=\"fontSize(size)px\"",
      ],
      answer: 1,
      explain: "آفرین! کلیدها رو camelCase بنویس و واحد رو خودت اضافه کن. 💄",
    },
    {
      id: "l5q3",
      question: "وقتی شرط‌های کلاس خیلی زیاد می‌شن بهترین کار چیه؟",
      options: [
        "همه رو توی تمپلیت بنویسیم",
        "از computed که آبجکت کلاس برمی‌گردونه استفاده کنیم",
        "از v-html استفاده کنیم",
        "کلاس‌ها رو با jQuery ست کنیم",
      ],
      answer: 1,
      explain: "دقیقاً! منطق رو ببر توی computed تا تمپلیت تمیز بمونه. 🧽",
    },
  ],
};

export default level;
