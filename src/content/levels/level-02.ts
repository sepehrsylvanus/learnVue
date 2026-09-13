import type { Level } from "../types";

const level: Level = {
  id: 2,
  slug: "template-syntax",
  emoji: "🧩",
  title: "سینتکس تمپلیت",
  tagline: "حرف زدن با HTML به زبون ویو",
  xp: 100,
  duration: "۱۲ دقیقه",
  docsUrl: "https://vuejs.org/guide/essentials/template-syntax.html",
  learn: [
    {
      kind: "p",
      text: "تمپلیت ویو همون HTML خودمونه، فقط چند تا قدرت جادویی اضافه داره. مهم‌ترینش «سبیل» یا mustache است: {{ }} — هرچی داخلش بذاری، ویو نتیجه‌اش رو توی متن چاپ می‌کنه.",
    },
    {
      kind: "code",
      caption: "درج متن",
      code: `<span>پیام: {{ msg }}</span>
<span>جمع: {{ 2 + 3 }}</span>
<span>{{ ok ? 'آره ✅' : 'نه ❌' }}</span>`,
    },
    {
      kind: "tip",
      title: "فقط یک عبارت!",
      text: "داخل {{ }} فقط «یک عبارت» می‌تونی بنویسی، نه دستور. یعنی ‎{{ a + b }}‎ اوکیه ولی ‎{{ if (a) {...} }}‎ اصلاً. 🙅",
    },
    { kind: "h", text: "بایندینگ ویژگی‌ها با v-bind" },
    {
      kind: "p",
      text: "سبیل‌ها فقط داخل متن کار می‌کنن. برای مقداردهی به اتریبیوت‌ها از v-bind استفاده می‌کنیم که مخفف خفنش یه دونه دو نقطه‌ست: ‎:‎",
    },
    {
      kind: "code",
      code: `<img v-bind:src="imageUrl" />
<!-- شکل کوتاه و محبوب -->
<img :src="imageUrl" :alt="imageAlt" />
<a :href="'https://vuejs.org/' + page">مستندات</a>

<!-- اتریبیوت بولی: اگر false باشه، کلاً حذف می‌شه -->
<button :disabled="isLoading">ثبت</button>`,
    },
    { kind: "h", text: "دایرکتیوها" },
    {
      kind: "p",
      text: "هر اتریبیوتی که با ‎v-‎ شروع بشه یه دایرکتیوه: v-bind، v-if، v-for، v-on، v-model و... اینا دستوراتی هستن که مستقیم به ویو می‌دیم.",
    },
    {
      kind: "list",
      items: [
        "‎v-text‎ و ‎{{ }}‎ برای متن",
        "‎v-html‎ برای رندر HTML خام (با احتیاط! ⚠️)",
        "‎:‎ مخفف v-bind و ‎@‎ مخفف v-on",
      ],
    },
    {
      kind: "warn",
      title: "حواست به v-html باشه",
      text: "هیچ‌وقت محتوای کاربر رو با v-html رندر نکن؛ راه باز می‌شه برای حمله‌ی XSS. 😈",
    },
  ],
  demo: {
    title: "سبیل‌ها و بایندینگ در عمل",
    description: "مقدار متغیرها رو تغییر بده و ببین همه‌ی اتصال‌ها همزمان آپدیت می‌شن.",
    files: {
      "/App.vue": `<script setup>
import { ref } from 'vue'

const title = ref('ویو خیلی باحاله')
const color = ref('#42b883')
const disabled = ref(false)
const rawHtml = ref('<b>این متن بولد است</b>')
</script>

<template>
  <h2 :style="{ color: color }">{{ title }}</h2>
  <p>طول عنوان: {{ title.length }} کاراکتر</p>
  <p>بزرگ‌شده: {{ title.toUpperCase() }}</p>
  <p v-html="rawHtml"></p>
  <button :disabled="disabled">دکمه (disabled = {{ disabled }})</button>
</template>`,
    },
  },
  project: {
    title: "پروژه: کارت محصول فروشگاهی 🛍️",
    brief:
      "یه کارت محصول بساز که عکس، اسم، قیمت و وضعیت موجودی رو با بایندینگ نمایش بده. قیمت با جداکننده‌ی هزارگان نشون داده بشه.",
    steps: [
      "متغیرهای product (اسم)، price، image و inStock رو بساز.",
      "عکس رو با ‎:src‎ و متن جایگزین رو با ‎:alt‎ وصل کن.",
      "قیمت رو با ‎{{ price.toLocaleString('fa-IR') }}‎ چاپ کن تا قشنگ بشه.",
      "دکمه‌ی «افزودن به سبد» رو وقتی موجود نیست با ‎:disabled‎ غیرفعال کن.",
      "عنوان کارت رو با ‎:title‎ به یه توضیح کوتاه وصل کن.",
    ],
    starter: {
      "/App.vue": `<script setup>
import { ref } from 'vue'

const product = ref('هدفون بی‌سیم')
const price = ref(1850000)
const image = ref('https://picsum.photos/seed/vue/300/180')
const inStock = ref(true)
</script>

<template>
  <div class="card">
    <!-- TODO: عکس رو با :src وصل کن -->
    <h3>{{ product }}</h3>
    <!-- TODO: قیمت و دکمه -->
  </div>
</template>

<style scoped>
.card { border: 1px solid #e2e8f0; border-radius: 16px; padding: 14px; max-width: 320px; }
img { width: 100%; border-radius: 12px; }
</style>`,
    },
    solution: {
      "/App.vue": `<script setup>
import { ref } from 'vue'

const product = ref('هدفون بی‌سیم')
const price = ref(1850000)
const image = ref('https://picsum.photos/seed/vue/300/180')
const inStock = ref(true)
const note = ref('ارسال رایگان برای سفارش بالای ۵۰۰ هزار تومان')
</script>

<template>
  <div class="card" :title="note">
    <img :src="image" :alt="'عکس ' + product" />
    <h3>{{ product }}</h3>
    <p class="price">{{ price.toLocaleString('fa-IR') }} تومان</p>
    <p :style="{ color: inStock ? '#16a34a' : '#dc2626' }">
      {{ inStock ? 'موجود ✅' : 'ناموجود ❌' }}
    </p>
    <button :disabled="!inStock">افزودن به سبد 🛒</button>
  </div>
</template>

<style scoped>
.card { border: 1px solid #e2e8f0; border-radius: 16px; padding: 14px; max-width: 320px; }
img { width: 100%; border-radius: 12px; }
.price { font-weight: 800; font-size: 18px; }
button:disabled { opacity: .5; cursor: not-allowed; }
</style>`,
    },
  },
  quiz: [
    {
      id: "l2q1",
      question: "شکل کوتاه v-bind:src چیه؟",
      options: ["@src", "#src", ":src", "&src"],
      answer: 2,
      explain: "درسته! دو نقطه ‎:‎ مخفف v-bind هست و ‎@‎ مخفف v-on. 🎯",
    },
    {
      id: "l2q2",
      question: "کدوم کد داخل {{ }} معتبر نیست؟",
      options: ["{{ count + 1 }}", "{{ ok ? 'بله' : 'خیر' }}", "{{ if (ok) { return 1 } }}", "{{ name.trim() }}"],
      answer: 2,
      explain: "آره! داخل سبیل‌ها فقط «عبارت» مجازه، نه دستور if. 🙂",
    },
    {
      id: "l2q3",
      question: "برای رندر HTML خام از چی استفاده می‌کنیم (با احتیاط)؟",
      options: ["v-text", "v-html", "v-raw", "v-code"],
      answer: 1,
      explain: "v-html درسته، ولی فقط برای محتوای مطمئن — وگرنه XSS در کمینه! ⚠️",
    },
  ],
};

export default level;
