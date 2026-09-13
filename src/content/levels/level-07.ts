import type { Level } from "../types";

const level: Level = {
  id: 7,
  slug: "list-rendering",
  emoji: "📋",
  title: "رندر لیست با v-for",
  tagline: "یه بار بنویس، صدتا بساز",
  xp: 130,
  duration: "۱۴ دقیقه",
  docsUrl: "https://vuejs.org/guide/essentials/list.html",
  learn: [
    {
      kind: "p",
      text: "می‌خوای ۱۰۰ تا کارت محصول نشون بدی؟ قرار نیست ۱۰۰ بار کپی‌پیست کنی! 😵 با v-for یه قالب می‌نویسی و ویو برای هر آیتم یکی می‌سازه.",
    },
    {
      kind: "code",
      code: `<ul>
  <li v-for="(item, index) in items" :key="item.id">
    {{ index + 1 }}. {{ item.title }}
  </li>
</ul>`,
    },
    { kind: "h", text: "key چرا انقدر مهمه؟ 🔑" },
    {
      kind: "p",
      text: "key به ویو می‌گه هر المان متعلق به کدوم داده‌ست تا موقع تغییر لیست، به‌جای ساختن دوباره‌ی همه‌چی، هوشمندانه جابه‌جا کنه. همیشه یه شناسه‌ی یکتا و پایدار بده — ایندکس گزینه‌ی آخره!",
    },
    { kind: "h", text: "v-for روی چه چیزهایی کار می‌کنه؟" },
    {
      kind: "code",
      code: `<!-- آرایه -->
<li v-for="n in numbers" :key="n">{{ n }}</li>

<!-- آبجکت: مقدار، کلید، ایندکس -->
<li v-for="(value, key, i) in user" :key="key">{{ key }}: {{ value }}</li>

<!-- عدد: از ۱ تا ۵ -->
<span v-for="n in 5" :key="n">⭐</span>

<!-- گروهی -->
<template v-for="p in posts" :key="p.id">
  <h4>{{ p.title }}</h4>
  <p>{{ p.body }}</p>
</template>`,
    },
    {
      kind: "warn",
      title: "v-for و v-if رو با هم روی یک المان نذار!",
      text: "اولویتشون گیج‌کننده‌ست و ویو هم اخطار می‌ده. راه درست: یا از computed فیلترشده استفاده کن، یا v-if رو ببر روی یک ‎<template>‎ بیرونی. 🧯",
    },
    {
      kind: "code",
      caption: "راه درست فیلتر کردن",
      code: `const doneTasks = computed(() => tasks.value.filter(t => t.done))
// <li v-for="t in doneTasks" :key="t.id">`,
    },
    {
      kind: "tip",
      title: "آرایه‌های واکنش‌پذیر",
      text: "متدهای push، pop، splice، sort و reverse روی آرایه‌ی ref واکنش‌پذیرن. برای filter و map که آرایه‌ی جدید می‌سازن، نتیجه رو دوباره assign کن: ‎list.value = list.value.filter(...)‎",
    },
  ],
  demo: {
    title: "لیست خرید زنده",
    description: "آیتم اضافه کن، حذف کن و ببین ویو چطور DOM رو هماهنگ نگه می‌داره.",
    files: {
      "/App.vue": `<script setup>
import { ref, computed } from 'vue'

let nextId = 4
const fruits = ref([
  { id: 1, name: 'سیب 🍎', qty: 2 },
  { id: 2, name: 'موز 🍌', qty: 5 },
  { id: 3, name: 'هندوانه 🍉', qty: 1 }
])

const total = computed(() => fruits.value.reduce((s, f) => s + f.qty, 0))

function add() {
  fruits.value.push({ id: nextId++, name: 'میوه‌ی مرموز 🥭', qty: 1 })
}
function remove(id) {
  fruits.value = fruits.value.filter(f => f.id !== id)
}
</script>

<template>
  <h3>سبد میوه ({{ total }} عدد)</h3>
  <ul>
    <li v-for="(f, i) in fruits" :key="f.id">
      {{ i + 1 }}. {{ f.name }} × {{ f.qty }}
      <button @click="f.qty++">+</button>
      <button @click="remove(f.id)">🗑</button>
    </li>
  </ul>
  <p v-if="fruits.length === 0">سبد خالیه! 😢</p>
  <button @click="add">افزودن میوه</button>
</template>

<style scoped>
li { margin: 6px 0; display: flex; gap: 8px; align-items: center; }
button { padding: 2px 10px; }
</style>`,
    },
  },
  project: {
    title: "پروژه: لیست کارها (To-Do) ✅",
    brief:
      "کلاسیک همیشگی! لیست کارها با امکان افزودن، تیک زدن، حذف کردن و فیلتر (همه / انجام‌شده / باقی‌مانده).",
    steps: [
      "یه آرایه‌ی ref از تسک‌ها بساز؛ هر تسک id و text و done داره.",
      "با v-for لیست رو رندر کن و ‎:key‎ رو id بذار.",
      "یه اینپوت + دکمه برای افزودن تسک جدید بساز (id یکتا فراموش نشه).",
      "یه ref به اسم filter بساز و با computed لیست فیلترشده رو حساب کن.",
      "حالت خالی بودن لیست رو با v-if مدیریت کن و تعداد باقی‌مانده رو نشون بده.",
    ],
    starter: {
      "/App.vue": `<script setup>
import { ref, computed } from 'vue'

let nextId = 1
const tasks = ref([])
const newTask = ref('')

function add() {
  // TODO: اگر خالی نبود، تسک جدید اضافه کن
}
</script>

<template>
  <h3>لیست کارها</h3>
  <input v-model="newTask" placeholder="چیکار داری؟" />
  <button @click="add">افزودن</button>
  <!-- TODO: v-for روی tasks -->
</template>`,
    },
    solution: {
      "/App.vue": `<script setup>
import { ref, computed } from 'vue'

let nextId = 4
const tasks = ref([
  { id: 1, text: 'یاد گرفتن v-for', done: true },
  { id: 2, text: 'ساختن پروژه‌ی تودو', done: false },
  { id: 3, text: 'قهوه خوردن ☕', done: false }
])
const newTask = ref('')
const filter = ref('all')

const visible = computed(() => {
  if (filter.value === 'done') return tasks.value.filter(t => t.done)
  if (filter.value === 'todo') return tasks.value.filter(t => !t.done)
  return tasks.value
})
const remaining = computed(() => tasks.value.filter(t => !t.done).length)

function add() {
  const text = newTask.value.trim()
  if (!text) return
  tasks.value.push({ id: nextId++, text, done: false })
  newTask.value = ''
}
function remove(id) {
  tasks.value = tasks.value.filter(t => t.id !== id)
}
</script>

<template>
  <div class="box">
    <h3>لیست کارها 📝 ({{ remaining }} کار مونده)</h3>

    <div class="row">
      <input v-model="newTask" placeholder="چیکار داری؟" @keyup.enter="add" />
      <button @click="add">افزودن</button>
    </div>

    <div class="row filters">
      <button @click="filter = 'all'" :class="{ on: filter === 'all' }">همه</button>
      <button @click="filter = 'todo'" :class="{ on: filter === 'todo' }">باقی‌مانده</button>
      <button @click="filter = 'done'" :class="{ on: filter === 'done' }">انجام‌شده</button>
    </div>

    <ul>
      <li v-for="t in visible" :key="t.id" :class="{ done: t.done }">
        <input type="checkbox" v-model="t.done" />
        <span>{{ t.text }}</span>
        <button @click="remove(t.id)">🗑</button>
      </li>
    </ul>

    <p v-if="visible.length === 0">اینجا خالیه! یه کار اضافه کن 🎈</p>
  </div>
</template>

<style scoped>
.box { border: 1px solid #e2e8f0; border-radius: 18px; padding: 16px; max-width: 420px; }
.row { display: flex; gap: 8px; margin: 10px 0; }
.filters button { background: #e2e8f0; color: #0f172a; }
.filters button.on { background: #42b883; color: #04291b; }
ul { list-style: none; padding: 0; }
li { display: flex; align-items: center; gap: 8px; padding: 6px 0; border-bottom: 1px dashed #e2e8f0; }
li.done span { text-decoration: line-through; opacity: .55; }
li span { flex: 1; }
</style>`,
    },
  },
  quiz: [
    {
      id: "l7q1",
      question: "چرا به v-for باید key بدیم؟",
      options: [
        "برای زیبایی کد",
        "تا ویو بتونه المان‌ها را درست ردیابی و بازاستفاده کنه",
        "چون بدون key ارور سینتکسی می‌گیریم",
        "برای مرتب‌سازی خودکار",
      ],
      answer: 1,
      explain: "درسته! key هویت هر آیتمه و باعث آپدیت‌های دقیق و سریع می‌شه. 🔑",
    },
    {
      id: "l7q2",
      question: "کدوم کار توصیه نمی‌شه؟",
      options: [
        "گذاشتن v-for و v-if روی یک المان",
        "استفاده از computed برای فیلتر لیست",
        "استفاده از template با v-for",
        "دادن id یکتا به key",
      ],
      answer: 0,
      explain: "آفرین! این ترکیب گیج‌کننده‌ست؛ فیلتر رو بده به computed. 🧯",
    },
    {
      id: "l7q3",
      question: "‎<span v-for=\"n in 3\">⭐</span>‎ چند ستاره می‌سازه؟",
      options: ["۰", "۲", "۳", "۴"],
      answer: 2,
      explain: "درسته! v-for روی عدد از ۱ شروع می‌شه و تا خود عدد می‌ره. ⭐⭐⭐",
    },
  ],
};

export default level;
