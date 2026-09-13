import type { Level } from "../types";

const level: Level = {
  id: 3,
  slug: "reactivity",
  emoji: "⚡",
  title: "واکنش‌پذیری: ref و reactive",
  tagline: "قلب تپنده‌ی ویو همینجاست",
  xp: 120,
  duration: "۱۵ دقیقه",
  docsUrl: "https://vuejs.org/guide/essentials/reactivity-fundamentals.html",
  learn: [
    {
      kind: "p",
      text: "واکنش‌پذیری یعنی: تو داده رو عوض می‌کنی، ویو خودش صفحه رو عوض می‌کنه. بدون واکنش‌پذیری، ویو فقط یه موتور تمپلیت خسته‌کننده بود. 😴",
    },
    {
      kind: "analogy",
      text: "ref مثل یه جعبه‌ست 📦 — داده داخل جعبه‌ست و برای دست زدن بهش توی جاوااسکریپت باید درش رو باز کنی (‎.value‎). توی تمپلیت ولی ویو مؤدبانه خودش درش رو باز می‌کنه.",
    },
    { kind: "h", text: "ref: برای همه‌چیز" },
    {
      kind: "code",
      code: `import { ref } from 'vue'

const count = ref(0)        // عدد
const name = ref('علی')     // رشته
const items = ref([])       // آرایه
const user = ref({ age: 20 }) // آبجکت

// در جاوااسکریپت: با .value
count.value++
user.value.age = 21

// در تمپلیت: بدون .value
// <p>{{ count }}</p>`,
    },
    { kind: "h", text: "reactive: فقط برای آبجکت‌ها" },
    {
      kind: "code",
      code: `import { reactive } from 'vue'

const state = reactive({ count: 0, user: { name: 'نگار' } })

state.count++            // بدون .value
state.user.name = 'رضا'  // عمیق هم واکنش‌پذیره`,
    },
    { kind: "h", text: "کدوم رو انتخاب کنم؟" },
    {
      kind: "list",
      items: [
        "‎ref‎: همه‌کاره، برای اعداد و رشته‌ها و بولین‌ها الزامیه. پیشنهاد پیش‌فرض ✅",
        "‎reactive‎: فقط آبجکت/آرایه/Map/Set. با عدد و رشته کار نمی‌کنه.",
        "‎reactive‎ اگر جایگزینش کنی (state = {...}) واکنش‌پذیری‌ش می‌شکنه، ولی ref رو راحت می‌تونی کامل عوض کنی.",
      ],
    },
    {
      kind: "warn",
      title: "تله‌ی کلاسیک 🪤",
      text: "فراموش کردن ‎.value‎ توی script رایج‌ترین اشتباه تازه‌کارهاست. اگه چیزی آپدیت نشد، اول دنبال ‎.value‎ گم‌شده بگرد!",
    },
    { kind: "h", text: "watch: گوش دادن به تغییرات" },
    {
      kind: "code",
      code: `import { ref, watch } from 'vue'

const query = ref('')
watch(query, (newVal, oldVal) => {
  console.log('از', oldVal, 'شد', newVal)
})`,
    },
  ],
  demo: {
    title: "ref در برابر متغیر معمولی",
    description:
      "دکمه‌ها رو بزن. عدد سمت راست (متغیر معمولی) هیچ‌وقت آپدیت نمی‌شه چون واکنش‌پذیر نیست!",
    files: {
      "/App.vue": `<script setup>
import { ref, reactive } from 'vue'

const reactiveCount = ref(0)
let plainCount = 0 // واکنش‌پذیر نیست!

const state = reactive({ likes: 0, title: 'حالت reactive' })

function bump() {
  reactiveCount.value++
  plainCount++
  state.likes++
}
</script>

<template>
  <button @click="bump">همه رو زیاد کن ➕</button>
  <ul>
    <li>ref: <b>{{ reactiveCount }}</b> ✅</li>
    <li>متغیر ساده: <b>{{ plainCount }}</b> ❌ (تکون نمی‌خوره)</li>
    <li>{{ state.title }}: <b>{{ state.likes }}</b> ✅</li>
  </ul>
</template>`,
    },
  },
  project: {
    title: "پروژه: شمارنده‌ی حرفه‌ای ➕➖",
    brief:
      "یه شمارنده بساز با دکمه‌های افزایش، کاهش و ریست. قدم شمارش هم قابل تنظیم باشه و عدد منفی هم پشتیبانی بشه.",
    steps: [
      "یه ref به اسم count با مقدار 0 و یه ref به اسم step با مقدار 1 بساز.",
      "توابع inc، dec و reset رو بنویس (یادت نره ‎.value‎!).",
      "سه تا دکمه بساز و به توابع وصلشون کن.",
      "با یه reactive به اسم stats تعداد کل کلیک‌ها رو بشمار.",
      "اگر count منفی شد، رنگش رو قرمز کن (راهنمایی: ‎:style‎).",
    ],
    starter: {
      "/App.vue": `<script setup>
import { ref, reactive } from 'vue'

const count = ref(0)
const step = ref(1)
// TODO: stats را با reactive بساز

function inc() {
  // TODO
}
</script>

<template>
  <h2>شمارنده: {{ count }}</h2>
  <button @click="inc">+</button>
  <!-- TODO: دکمه‌های کاهش و ریست و اینپوت قدم -->
</template>`,
    },
    solution: {
      "/App.vue": `<script setup>
import { ref, reactive } from 'vue'

const count = ref(0)
const step = ref(1)
const stats = reactive({ clicks: 0 })

function inc() {
  count.value += Number(step.value)
  stats.clicks++
}
function dec() {
  count.value -= Number(step.value)
  stats.clicks++
}
function reset() {
  count.value = 0
  stats.clicks++
}
</script>

<template>
  <div class="box">
    <h2 :style="{ color: count < 0 ? '#dc2626' : '#42b883' }">{{ count }}</h2>
    <div class="row">
      <button @click="dec">➖</button>
      <button @click="reset">🔄 ریست</button>
      <button @click="inc">➕</button>
    </div>
    <label>قدم: <input type="number" v-model="step" min="1" /></label>
    <p class="muted">تعداد کلیک‌ها: {{ stats.clicks }}</p>
  </div>
</template>

<style scoped>
.box { text-align: center; border: 1px solid #e2e8f0; border-radius: 18px; padding: 18px; max-width: 320px; }
h2 { font-size: 46px; margin: 4px 0; }
.row { display: flex; gap: 8px; justify-content: center; margin-bottom: 10px; }
input { width: 80px; }
.muted { font-size: 13px; opacity: .7; }
</style>`,
    },
  },
  quiz: [
    {
      id: "l3q1",
      question: "برای خواندن مقدار یک ref داخل <script setup> چی می‌نویسیم؟",
      options: ["count", "count.value", "count()", "count.get()"],
      answer: 1,
      explain: "دقیقاً! توی script باید ‎.value‎ بذاری، ولی توی template لازم نیست. 📦",
    },
    {
      id: "l3q2",
      question: "کدوم مورد با reactive() کار نمی‌کنه؟",
      options: ["آبجکت", "آرایه", "عدد ساده", "Map"],
      answer: 2,
      explain: "آفرین! reactive فقط با انواع آبجکتی کار می‌کنه؛ برای عدد و رشته باید ref بزنی. ⚡",
    },
    {
      id: "l3q3",
      question: "کد ‎let x = 0‎ داخل script setup چه رفتاری داره؟",
      options: [
        "مثل ref واکنش‌پذیره",
        "واکنش‌پذیر نیست و تغییرش UI رو آپدیت نمی‌کنه",
        "باعث ارور می‌شه",
        "فقط یک‌بار قابل تغییره",
      ],
      answer: 1,
      explain: "درسته! متغیر ساده ردیابی نمی‌شه؛ ویو خبردار نمی‌شه که تغییر کرده. 🙈",
    },
  ],
};

export default level;
