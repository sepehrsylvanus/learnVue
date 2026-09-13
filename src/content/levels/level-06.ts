import type { Level } from "../types";

const level: Level = {
  id: 6,
  slug: "conditional-rendering",
  emoji: "🔀",
  title: "رندر شرطی",
  tagline: "نشون بده یا نده، مسئله این است",
  xp: 120,
  duration: "۱۰ دقیقه",
  docsUrl: "https://vuejs.org/guide/essentials/conditional.html",
  learn: [
    {
      kind: "p",
      text: "گاهی می‌خوای یه بخش از UI فقط توی شرایط خاص دیده بشه: پیام خوش‌آمد وقتی کاربر لاگین کرده، اسپینر وقتی داده در حال لود شدنه، پیام خالی بودن لیست... اینجا v-if وارد می‌شه. 🦸",
    },
    {
      kind: "code",
      code: `<h2 v-if="isLoading">در حال بارگذاری... ⏳</h2>
<h2 v-else-if="error">یه چیزی خراب شد! 💥</h2>
<h2 v-else>خوش اومدی! 🎉</h2>`,
    },
    { kind: "h", text: "v-show چی؟" },
    {
      kind: "list",
      items: [
        "‎v-if‎ واقعاً المان رو از DOM حذف/اضافه می‌کنه (رندر تنبل).",
        "‎v-show‎ المان همیشه توی DOM هست، فقط ‎display: none‎ می‌شه.",
        "اگه شرط زیاد عوض می‌شه → ‎v-show‎. اگه کم عوض می‌شه یا ممکنه اصلاً لازم نشه → ‎v-if‎.",
        "‎v-show‎ با ‎v-else‎ کار نمی‌کنه و روی ‎<template>‎ هم پشتیبانی نمی‌شه.",
      ],
    },
    {
      kind: "analogy",
      text: "v-if مثل اینه که مهمون رو از خونه بیرون کنی 🚪 و بعداً دوباره دعوتش کنی. v-show مثل اینه که فقط چراغ اتاقش رو خاموش کنی 💡 — هنوز اونجاست!",
    },
    { kind: "h", text: "گروه‌بندی با template" },
    {
      kind: "code",
      code: `<template v-if="loggedIn">
  <h3>سلام {{ user.name }}</h3>
  <p>امروز چه خبر؟</p>
</template>`,
    },
    {
      kind: "tip",
      title: "کلید key برای المان‌های مشابه",
      text: "ویو برای سرعت، المان‌های شبیه هم رو دوباره استفاده می‌کنه. اگه نمی‌خوای مقدار اینپوت بین دو حالت حفظ بشه، بهشون ‎key‎ متفاوت بده. 🔑",
    },
  ],
  demo: {
    title: "شبیه‌ساز وضعیت لود",
    description: "دکمه‌ها رو بزن و بین حالت‌های مختلف سوییچ کن. تفاوت v-if و v-show رو هم ببین.",
    files: {
      "/App.vue": `<script setup>
import { ref } from 'vue'

const state = ref('loading') // loading | error | done
const showBox = ref(true)
</script>

<template>
  <div class="row">
    <button @click="state = 'loading'">لودینگ</button>
    <button @click="state = 'error'">ارور</button>
    <button @click="state = 'done'">موفق</button>
  </div>

  <p v-if="state === 'loading'">⏳ صبر کن، دارم می‌آرمش...</p>
  <p v-else-if="state === 'error'">💥 اوپس! دوباره تلاش کن.</p>
  <p v-else>✅ تمام! داده‌ها اومدن.</p>

  <hr />
  <button @click="showBox = !showBox">سوییچ نمایش</button>
  <div v-if="showBox" class="tag">من با v-if هستم (از DOM حذف می‌شم)</div>
  <div v-show="showBox" class="tag">من با v-show هستم (فقط مخفی می‌شم)</div>
</template>

<style scoped>
.row { display: flex; gap: 8px; margin-bottom: 10px; }
.tag { margin-top: 8px; padding: 8px 12px; border-radius: 12px; background: rgba(66,184,131,.15); }
</style>`,
    },
  },
  project: {
    title: "پروژه: فرم ورود ساده (بدون بک‌اند) 🔐",
    brief:
      "یه صفحه بساز که اگه کاربر «وارد شده» باشه، پیام خوش‌آمد و دکمه‌ی خروج نشون بده؛ وگرنه فرم ورود. یه حالت لودینگ هم وسطش بذار.",
    steps: [
      "رف‌های loggedIn (بولین)، username (رشته) و loading (بولین) رو بساز.",
      "با ‎v-if / v-else‎ بین فرم ورود و پنل کاربر سوییچ کن.",
      "وقتی دکمه‌ی ورود زده شد، اول ۸۰۰ میلی‌ثانیه loading رو true کن (setTimeout).",
      "اگر نام کاربری خالی بود، با ‎v-if‎ پیام خطا نشون بده.",
      "با ‎<template v-if>‎ چند المان رو با یک شرط گروه کن.",
    ],
    starter: {
      "/App.vue": `<script setup>
import { ref } from 'vue'

const loggedIn = ref(false)
const username = ref('')
const loading = ref(false)

function login() {
  // TODO: اعتبارسنجی + لودینگ + ورود
}
</script>

<template>
  <!-- TODO: v-if برای حالت‌های مختلف -->
  <input v-model="username" placeholder="نام کاربری" />
  <button @click="login">ورود</button>
</template>`,
    },
    solution: {
      "/App.vue": `<script setup>
import { ref } from 'vue'

const loggedIn = ref(false)
const username = ref('')
const loading = ref(false)
const error = ref('')

function login() {
  error.value = ''
  if (!username.value.trim()) {
    error.value = 'اسمت رو بنویس دیگه! 😅'
    return
  }
  loading.value = true
  setTimeout(() => {
    loading.value = false
    loggedIn.value = true
  }, 800)
}

function logout() {
  loggedIn.value = false
  username.value = ''
}
</script>

<template>
  <div class="box">
    <p v-if="loading">⏳ در حال ورود...</p>

    <template v-else-if="loggedIn">
      <h3>سلام {{ username }} عزیز! 👋</h3>
      <p>خوشحالیم که برگشتی.</p>
      <button @click="logout">خروج 🚪</button>
    </template>

    <template v-else>
      <h3>ورود به حساب</h3>
      <input v-model="username" placeholder="نام کاربری" @keyup.enter="login" />
      <button @click="login">ورود</button>
      <p v-if="error" class="err">{{ error }}</p>
    </template>
  </div>
</template>

<style scoped>
.box { border: 1px solid #e2e8f0; border-radius: 18px; padding: 18px; max-width: 340px; }
input { display: block; width: 100%; margin: 10px 0; }
.err { color: #dc2626; font-size: 13px; }
</style>`,
    },
  },
  quiz: [
    {
      id: "l6q1",
      question: "تفاوت اصلی v-if و v-show چیه؟",
      options: [
        "هیچی، فقط اسمشون فرق داره",
        "v-if المان رو از DOM حذف می‌کنه، v-show فقط مخفیش می‌کنه",
        "v-show سریع‌تر رندر اولیه داره",
        "v-if فقط برای متن کار می‌کنه",
      ],
      answer: 1,
      explain: "دقیقاً! v-if واقعاً حذف می‌کنه، v-show فقط display: none می‌ذاره. 🚪💡",
    },
    {
      id: "l6q2",
      question: "کدوم ترکیب معتبره؟",
      options: [
        "v-if ... v-else-if ... v-else",
        "v-show ... v-else",
        "v-if ... v-otherwise",
        "v-when ... v-else",
      ],
      answer: 0,
      explain: "درسته! v-else حتماً باید بلافاصله بعد از v-if یا v-else-if بیاد. ✅",
    },
    {
      id: "l6q3",
      question: "اگه شرط خیلی زیاد بین true/false عوض می‌شه، کدوم بهتره؟",
      options: ["v-if", "v-show", "v-for", "v-html"],
      answer: 1,
      explain: "آره! v-show هزینه‌ی سوییچ کمتری داره چون فقط CSS رو عوض می‌کنه. ⚡",
    },
  ],
};

export default level;
