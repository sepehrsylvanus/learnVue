import type { Level } from "../types";

const level: Level = {
  id: 8,
  slug: "event-handling",
  emoji: "🖱️",
  title: "مدیریت رویدادها",
  tagline: "وقتی کاربر کلیک می‌کنه چی می‌شه؟",
  xp: 130,
  duration: "۱۲ دقیقه",
  docsUrl: "https://vuejs.org/guide/essentials/event-handling.html",
  learn: [
    {
      kind: "p",
      text: "برای گوش دادن به رویدادهای DOM از v-on استفاده می‌کنیم که مخفف خوشگلش ‎@‎ است. کلیک، تایپ، حرکت موس، سابمیت فرم... همه‌ش با همین. 🎧",
    },
    {
      kind: "code",
      code: `<!-- هندلر درون‌خطی -->
<button @click="count++">+1</button>

<!-- هندلر متدی -->
<button @click="greet">سلام کن</button>

<!-- فرستادن آرگومان -->
<button @click="say('سلام')">با آرگومان</button>

<!-- دسترسی به رویداد اصلی -->
<button @click="say('های', $event)">با event</button>`,
    },
    { kind: "h", text: "مادیفایرها: میان‌بُرهای طلایی ✨" },
    {
      kind: "list",
      items: [
        "‎@submit.prevent‎ → جلوی رفرش شدن فرم رو می‌گیره",
        "‎@click.stop‎ → جلوی حباب‌شدن رویداد به والد",
        "‎@click.once‎ → فقط یک‌بار اجرا می‌شه",
        "‎@click.self‎ → فقط وقتی خود المان کلیک شده",
        "‎@keyup.enter‎ / ‎@keyup.esc‎ → کلیدهای خاص",
        "‎@click.right‎ / ‎.middle‎ → دکمه‌های ماوس",
      ],
    },
    {
      kind: "code",
      code: `<form @submit.prevent="onSubmit">
  <input @keyup.enter="search" />
  <button type="submit">ارسال</button>
</form>`,
    },
    {
      kind: "analogy",
      text: "مادیفایرها مثل چاشنی‌های آماده‌ی آشپزخونه‌ان 🧂 — به‌جای نوشتن ‎event.preventDefault()‎ توی همه‌ی تابع‌ها، یه ‎.prevent‎ می‌چسبونی و تمام.",
    },
    {
      kind: "tip",
      title: "تابع رو صدا نزن!",
      text: "‎@click=\"doIt\"‎ درسته ولی ‎@click=\"doIt()\"‎ هم مجازه (چون درون‌خطی حساب می‌شه). اما ‎:onClick=\"doIt()\"‎ یا پاس دادن نتیجه‌ی تابع اشتباه رایجیه. 🙃",
    },
  ],
  demo: {
    title: "میدون تمرین رویدادها",
    description: "کلیک کن، تایپ کن، موس رو حرکت بده و لاگ رویدادها رو ببین.",
    files: {
      "/App.vue": `<script setup>
import { ref } from 'vue'

const logs = ref([])
const pos = ref({ x: 0, y: 0 })

function log(msg) {
  logs.value.unshift(msg)
  if (logs.value.length > 6) logs.value.pop()
}
function track(e) {
  pos.value = { x: e.offsetX, y: e.offsetY }
}
</script>

<template>
  <div class="pad" @mousemove="track" @click.self="log('کلیک روی خود کادر (self) 🎯')">
    موس رو تکون بده: x={{ pos.x }} y={{ pos.y }}
    <button @click.stop="log('کلیک دکمه (stop شد) 🛑')">دکمه با stop</button>
  </div>

  <form @submit.prevent="log('فرم ارسال شد بدون رفرش ✅')">
    <input placeholder="اینتر بزن" @keyup.enter="log('اینتر زدی ⌨️')" />
    <button type="submit">ارسال</button>
  </form>

  <button @click.once="log('من فقط یک‌بار کار می‌کنم 😌')">once</button>

  <ul>
    <li v-for="(l, i) in logs" :key="i">{{ l }}</li>
  </ul>
</template>

<style scoped>
.pad { border: 2px dashed #42b883; border-radius: 14px; padding: 16px; margin-bottom: 10px; }
form { display: flex; gap: 8px; margin-bottom: 10px; }
</style>`,
    },
  },
  project: {
    title: "پروژه: بازی «موش رو بگیر» 🐭",
    brief:
      "یه بازی کوچولو بساز: یه ایموجی موش تو نقاط تصادفی ظاهر می‌شه، کاربر باید روش کلیک کنه و امتیاز بگیره. تایمر ۱۵ ثانیه‌ای هم داشته باشه.",
    steps: [
      "رف‌های score، timeLeft، playing و position بساز.",
      "تابع startGame: امتیاز صفر، زمان ۱۵، هر ثانیه با setInterval کم بشه.",
      "تابع catchMouse: با ‎@click‎ روی موش، امتیاز زیاد و جای موش رندوم بشه.",
      "با ‎@click.stop‎ جلوی شمرده شدن کلیک روی زمین بازی رو بگیر.",
      "وقتی زمان تموم شد، پیام پایان بازی و امتیاز نهایی نشون بده.",
    ],
    starter: {
      "/App.vue": `<script setup>
import { ref } from 'vue'

const score = ref(0)
const timeLeft = ref(15)
const playing = ref(false)
const pos = ref({ top: 40, left: 40 })

function startGame() {
  // TODO
}
</script>

<template>
  <button @click="startGame">شروع بازی</button>
  <div class="field">
    <!-- TODO: موش با @click -->
  </div>
</template>

<style scoped>
.field { position: relative; height: 220px; border: 2px solid #42b883; border-radius: 16px; margin-top: 10px; overflow: hidden; }
</style>`,
    },
    solution: {
      "/App.vue": `<script setup>
import { ref, onUnmounted } from 'vue'

const score = ref(0)
const timeLeft = ref(15)
const playing = ref(false)
const misses = ref(0)
const pos = ref({ top: 40, left: 40 })
let timer = null

function move() {
  pos.value = {
    top: Math.random() * 75 + 5,
    left: Math.random() * 80 + 5
  }
}

function startGame() {
  score.value = 0
  misses.value = 0
  timeLeft.value = 15
  playing.value = true
  move()
  clearInterval(timer)
  timer = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      clearInterval(timer)
      playing.value = false
    }
  }, 1000)
}

function catchMouse() {
  if (!playing.value) return
  score.value++
  move()
}

onUnmounted(() => clearInterval(timer))
</script>

<template>
  <div class="head">
    <b>امتیاز: {{ score }}</b>
    <b>⏱ {{ timeLeft }}</b>
    <b>خطا: {{ misses }}</b>
    <button @click="startGame">{{ playing ? 'شروع دوباره' : 'شروع بازی 🎮' }}</button>
  </div>

  <div class="field" @click="playing && misses++">
    <span
      v-if="playing"
      class="mouse"
      :style="{ top: pos.top + '%', left: pos.left + '%' }"
      @click.stop="catchMouse"
    >🐭</span>

    <div v-else class="over">
      <p v-if="score > 0">🎉 تموم شد! امتیاز نهایی: {{ score }}</p>
      <p v-else>برای شروع دکمه رو بزن 👆</p>
    </div>
  </div>
</template>

<style scoped>
.head { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
.field { position: relative; height: 220px; border: 2px solid #42b883; border-radius: 16px; margin-top: 10px; overflow: hidden; background: rgba(66,184,131,.08); cursor: crosshair; }
.mouse { position: absolute; font-size: 34px; cursor: pointer; transition: top .1s, left .1s; user-select: none; }
.over { display: grid; place-items: center; height: 100%; }
</style>`,
    },
  },
  quiz: [
    {
      id: "l8q1",
      question: "شکل کوتاه ‎v-on:click‎ چیه؟",
      options: [":click", "@click", "#click", "on:click"],
      answer: 1,
      explain: "درسته! ‎@‎ مخفف v-on هست. 🖱️",
    },
    {
      id: "l8q2",
      question: "برای جلوگیری از رفرش شدن صفحه هنگام ارسال فرم چی می‌نویسیم؟",
      options: ["@submit.stop", "@submit.self", "@submit.prevent", "@submit.once"],
      answer: 2,
      explain: "دقیقاً! ‎.prevent‎ همون ‎event.preventDefault()‎ است. 🧯",
    },
    {
      id: "l8q3",
      question: "‎@click.self‎ یعنی چی؟",
      options: [
        "فقط یک‌بار اجرا شه",
        "فقط وقتی روی خود همون المان کلیک شده اجرا شه",
        "جلوی رفتار پیش‌فرض رو بگیره",
        "رویداد رو به والد بفرسته",
      ],
      answer: 1,
      explain: "آفرین! اگه کلیک از فرزندان حباب کرده باشه، اجرا نمی‌شه. 🎯",
    },
  ],
};

export default level;
