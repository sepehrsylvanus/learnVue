import type { Level } from "../types";

const level: Level = {
  id: 11,
  slug: "capstone",
  emoji: "🏆",
  title: "کپستون: اپلیکیشن مدیریت خرج‌ها",
  tagline: "همه‌ی چیزهایی که یاد گرفتی، یکجا",
  xp: 250,
  duration: "۳۰ دقیقه",
  docsUrl: "https://vuejs.org/guide/essentials/application.html",
  learn: [
    {
      kind: "p",
      text: "تبریک! 🎉 رسیدی به آخرین مرحله. اینجا دیگه مفهوم جدید یاد نمی‌گیری — قراره همه‌ی ۱۰ مرحله‌ی قبل رو بچسبونی به هم و یه اپ واقعی بسازی: **دخل و خرج‌یار**.",
    },
    { kind: "h", text: "چک‌لیست مهارت‌هایی که به کار می‌گیری" },
    {
      kind: "list",
      ordered: true,
      items: [
        "‎ref/reactive‎ برای استیت تراکنش‌ها ⚡",
        "‎computed‎ برای جمع درآمد، هزینه و موجودی 🧮",
        "‎v-for‎ برای لیست تراکنش‌ها 📋",
        "‎v-if/v-show‎ برای حالت خالی و پیام‌ها 🔀",
        "‎v-model‎ برای فرم ثبت تراکنش 📝",
        "‎@click‎ و مادیفایرها برای تعامل 🖱️",
        "‎:class/:style‎ برای رنگ درآمد/هزینه 🎨",
        "کامپوننت + props + emit برای تفکیک کد 🧱",
      ],
    },
    { kind: "h", text: "معماری پیشنهادی" },
    {
      kind: "code",
      code: `App.vue            // استیت اصلی + محاسبات + چیدمان
 ├─ StatCard.vue   // کارت آمار (props: label, value, color)
 └─ TxItem.vue     // یک ردیف تراکنش (props: tx | emit: remove)`,
    },
    {
      kind: "tip",
      title: "قانون کامپوننت خوب",
      text: "هر کامپوننت باید یک کار انجام بده و بشه بدون دونستن بقیه‌ی اپ ازش استفاده کرد. اگه پراپ‌هاش از ۶-۷ تا بیشتر شد، احتمالاً باید بشکنیش. ✂️",
    },
    {
      kind: "p",
      text: "بعد از این مرحله، قدم بعدی توی مسیر ویو اینهاست: Vue Router برای صفحه‌بندی، Pinia برای استیت گلوبال، و چرخه‌ی حیات کامپوننت‌ها (‎onMounted‎). ولی الان... بریم بسازیم! 🚀",
    },
  ],
  demo: {
    title: "پیش‌نمایش چیزی که می‌سازی",
    description:
      "این نسخه‌ی مینیمالِ همون اپه. ببین چطور کامپوننت StatCard از props استفاده می‌کنه.",
    files: {
      "/App.vue": `<script setup>
import { ref, computed } from 'vue'
import StatCard from './StatCard.vue'

const items = ref([
  { id: 1, title: 'حقوق', amount: 12000000 },
  { id: 2, title: 'اجاره', amount: -5000000 },
  { id: 3, title: 'قهوه ☕', amount: -180000 }
])

const income = computed(() => items.value.filter(i => i.amount > 0).reduce((s, i) => s + i.amount, 0))
const expense = computed(() => items.value.filter(i => i.amount < 0).reduce((s, i) => s + i.amount, 0))
const balance = computed(() => income.value + expense.value)
</script>

<template>
  <div class="stats">
    <StatCard label="درآمد" :value="income" color="#16a34a" />
    <StatCard label="هزینه" :value="Math.abs(expense)" color="#dc2626" />
    <StatCard label="موجودی" :value="balance" color="#42b883" />
  </div>

  <ul>
    <li v-for="i in items" :key="i.id" :style="{ color: i.amount > 0 ? '#16a34a' : '#dc2626' }">
      {{ i.title }} — {{ i.amount.toLocaleString('fa-IR') }}
    </li>
  </ul>
</template>

<style scoped>
.stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 12px; }
ul { list-style: none; padding: 0; }
li { padding: 6px 0; border-bottom: 1px dashed #e2e8f0; }
</style>`,
      "/StatCard.vue": `<script setup>
defineProps({
  label: String,
  value: Number,
  color: { type: String, default: '#42b883' }
})
</script>

<template>
  <div class="stat" :style="{ borderColor: color }">
    <small>{{ label }}</small>
    <b :style="{ color: color }">{{ value.toLocaleString('fa-IR') }}</b>
  </div>
</template>

<style scoped>
.stat { border: 2px solid; border-radius: 14px; padding: 10px; text-align: center; }
b { display: block; font-size: 15px; }
</style>`,
    },
  },
  project: {
    title: "پروژه نهایی: دخل و خرج‌یار 💰",
    brief:
      "یه اپ کامل مدیریت مالی بساز: ثبت تراکنش (عنوان، مبلغ، نوع)، نمایش لیست، فیلتر، حذف، و کارت‌های آماری. سه فایل داری: App.vue و StatCard.vue و TxItem.vue.",
    steps: [
      "استیت: آرایه‌ی تراکنش‌ها + فرم (title, amount, type) با v-model.",
      "افزودن تراکنش با ‎@submit.prevent‎ و اعتبارسنجی ساده (عنوان خالی نباشه، مبلغ > 0).",
      "محاسبه‌ی درآمد، هزینه و موجودی با computed و نمایششون با StatCard.",
      "رندر لیست با v-for و کامپوننت TxItem؛ حذف با emit به والد.",
      "فیلتر همه/درآمد/هزینه با دکمه‌ها و کلاس فعال (‎:class‎).",
      "حالت خالی با v-if و یه پیام بامزه. 🎈",
      "امتیاز اضافه: ذخیره در localStorage با watch. 💾",
    ],
    starter: {
      "/App.vue": `<script setup>
import { ref, computed } from 'vue'
import StatCard from './StatCard.vue'
import TxItem from './TxItem.vue'

let nextId = 1
const txs = ref([])
const form = ref({ title: '', amount: null, type: 'expense' })
const filter = ref('all')

// TODO: computed های income / expense / balance / visible

function addTx() {
  // TODO: اعتبارسنجی و افزودن
}

function removeTx(id) {
  // TODO
}
</script>

<template>
  <h2>دخل و خرج‌یار 💰</h2>
  <!-- TODO: کارت‌های آماری، فرم، فیلترها و لیست -->
</template>`,
      "/StatCard.vue": `<script setup>
defineProps({ label: String, value: Number, color: String })
</script>

<template>
  <div class="stat">
    <small>{{ label }}</small>
    <b>{{ value }}</b>
  </div>
</template>

<style scoped>
.stat { border: 2px solid #e2e8f0; border-radius: 14px; padding: 10px; text-align: center; }
</style>`,
      "/TxItem.vue": `<script setup>
// TODO: props tx و emit remove
</script>

<template>
  <li>
    <!-- TODO -->
  </li>
</template>`,
    },
    solution: {
      "/App.vue": `<script setup>
import { ref, computed, watch } from 'vue'
import StatCard from './StatCard.vue'
import TxItem from './TxItem.vue'

// --- استیت ---
const saved = JSON.parse(localStorage.getItem('vk-txs') || 'null')
const txs = ref(saved || [
  { id: 1, title: 'حقوق ماه', amount: 12000000, type: 'income' },
  { id: 2, title: 'اجاره خونه', amount: 5000000, type: 'expense' },
  { id: 3, title: 'قهوه ☕', amount: 180000, type: 'expense' }
])
let nextId = Math.max(0, ...txs.value.map(t => t.id)) + 1

const form = ref({ title: '', amount: null, type: 'expense' })
const filter = ref('all')
const error = ref('')

// --- محاسبات ---
const income = computed(() =>
  txs.value.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
)
const expense = computed(() =>
  txs.value.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
)
const balance = computed(() => income.value - expense.value)

const visible = computed(() => {
  if (filter.value === 'all') return txs.value
  return txs.value.filter(t => t.type === filter.value)
})

// --- اکشن‌ها ---
function addTx() {
  error.value = ''
  if (!form.value.title.trim()) {
    error.value = 'یه عنوان بنویس دیگه! 😅'
    return
  }
  if (!form.value.amount || form.value.amount <= 0) {
    error.value = 'مبلغ باید بزرگ‌تر از صفر باشه 💸'
    return
  }
  txs.value.unshift({
    id: nextId++,
    title: form.value.title.trim(),
    amount: Number(form.value.amount),
    type: form.value.type
  })
  form.value = { title: '', amount: null, type: form.value.type }
}

function removeTx(id) {
  txs.value = txs.value.filter(t => t.id !== id)
}

// ذخیره‌ی خودکار 💾
watch(txs, (val) => {
  localStorage.setItem('vk-txs', JSON.stringify(val))
}, { deep: true })
</script>

<template>
  <div class="app">
    <h2>دخل و خرج‌یار 💰</h2>

    <div class="stats">
      <StatCard label="درآمد" :value="income" color="#16a34a" icon="📈" />
      <StatCard label="هزینه" :value="expense" color="#dc2626" icon="📉" />
      <StatCard label="موجودی" :value="balance" :color="balance >= 0 ? '#42b883' : '#dc2626'" icon="👛" />
    </div>

    <form @submit.prevent="addTx">
      <input v-model.trim="form.title" placeholder="بابت چی؟" />
      <input v-model.number="form.amount" type="number" placeholder="مبلغ (تومان)" />
      <select v-model="form.type">
        <option value="expense">هزینه</option>
        <option value="income">درآمد</option>
      </select>
      <button type="submit">ثبت ➕</button>
    </form>
    <p v-if="error" class="err">{{ error }}</p>

    <div class="filters">
      <button @click="filter = 'all'" :class="{ on: filter === 'all' }">همه</button>
      <button @click="filter = 'income'" :class="{ on: filter === 'income' }">درآمدها</button>
      <button @click="filter = 'expense'" :class="{ on: filter === 'expense' }">هزینه‌ها</button>
    </div>

    <ul>
      <TxItem v-for="t in visible" :key="t.id" :tx="t" @remove="removeTx(t.id)" />
    </ul>

    <p v-if="visible.length === 0" class="empty">
      اینجا خالیه مثل جیب آخر ماه 😄 — یه تراکنش ثبت کن!
    </p>
  </div>
</template>

<style scoped>
.app { max-width: 520px; }
.stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 14px 0; }
form { display: grid; grid-template-columns: 2fr 1.4fr 1fr auto; gap: 8px; }
.err { color: #dc2626; font-size: 13px; }
.filters { display: flex; gap: 8px; margin: 12px 0; }
.filters button { background: #e2e8f0; color: #0f172a; }
.filters button.on { background: #42b883; color: #04291b; }
ul { list-style: none; padding: 0; margin: 0; }
.empty { text-align: center; opacity: .75; padding: 16px; }
@media (max-width: 520px) {
  form { grid-template-columns: 1fr 1fr; }
}
</style>`,
      "/StatCard.vue": `<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: Number, default: 0 },
  color: { type: String, default: '#42b883' },
  icon: { type: String, default: '💡' }
})
</script>

<template>
  <div class="stat" :style="{ borderColor: color }">
    <span class="icon">{{ icon }}</span>
    <small>{{ label }}</small>
    <b :style="{ color: color }">{{ value.toLocaleString('fa-IR') }}</b>
  </div>
</template>

<style scoped>
.stat { border: 2px solid; border-radius: 16px; padding: 10px; text-align: center; }
.icon { font-size: 20px; }
small { display: block; opacity: .75; font-size: 12px; }
b { display: block; font-size: 15px; }
</style>`,
      "/TxItem.vue": `<script setup>
defineProps({
  tx: { type: Object, required: true }
})
const emit = defineEmits(['remove'])
</script>

<template>
  <li class="tx" :class="tx.type">
    <span class="dot"></span>
    <span class="title">{{ tx.title }}</span>
    <span class="amount">
      {{ tx.type === 'income' ? '+' : '−' }}{{ tx.amount.toLocaleString('fa-IR') }}
    </span>
    <button class="del" @click="emit('remove')">🗑</button>
  </li>
</template>

<style scoped>
.tx { display: flex; align-items: center; gap: 10px; padding: 10px; border-radius: 12px; margin-bottom: 6px; background: rgba(100,116,139,.08); }
.dot { width: 10px; height: 10px; border-radius: 50%; }
.tx.income .dot { background: #16a34a; }
.tx.expense .dot { background: #dc2626; }
.title { flex: 1; }
.tx.income .amount { color: #16a34a; font-weight: 700; }
.tx.expense .amount { color: #dc2626; font-weight: 700; }
.del { background: transparent; border: none; cursor: pointer; font-size: 16px; }
</style>`,
    },
  },
  quiz: [
    {
      id: "l11q1",
      question: "برای محاسبه‌ی جمع کل تراکنش‌ها بهترین ابزار چیه؟",
      options: ["watch", "computed", "v-for", "defineProps"],
      answer: 1,
      explain: "درسته! computed مقدار مشتق‌شده رو کش‌شده و تمیز نگه می‌داره. 🧮",
    },
    {
      id: "l11q2",
      question: "کامپوننت TxItem چطور باید حذف شدن رو به App اطلاع بده؟",
      options: [
        "آرایه‌ی والد رو مستقیم دستکاری کنه",
        "با emit('remove') رویداد بفرسته",
        "با v-model روی لیست",
        "با localStorage",
      ],
      answer: 1,
      explain: "آفرین! فرزند فقط خبر می‌ده، تصمیم با والده. 🚦",
    },
    {
      id: "l11q3",
      question: "برای ذخیره‌ی خودکار داده‌ها در localStorage از چی استفاده کردیم؟",
      options: ["computed", "watch با deep: true", "defineEmits", "v-show"],
      answer: 1,
      explain: "دقیقاً! watch برای عوارض جانبی (side effect) ساخته شده، نه computed. 💾",
    },
  ],
};

export default level;
