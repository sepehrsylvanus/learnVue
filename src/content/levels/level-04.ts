import type { Level } from "../types";

const level: Level = {
  id: 4,
  slug: "computed",
  emoji: "🧮",
  title: "پراپرتی‌های محاسبه‌شده",
  tagline: "داده‌هایی که خودشون حساب می‌کنن",
  xp: 120,
  duration: "۱۲ دقیقه",
  docsUrl: "https://vuejs.org/guide/essentials/computed.html",
  learn: [
    {
      kind: "p",
      text: "گاهی یه داده رو باید از روی داده‌های دیگه حساب کنی: جمع سبد خرید، تعداد کارهای انجام‌نشده، اسم کامل از اسم و فامیل. اگه این محاسبات رو بذاری داخل تمپلیت، تمپلیتت می‌شه یه سوپ. 🍜 راه‌حل: computed.",
    },
    {
      kind: "code",
      caption: "بدون computed (بد) در برابر با computed (خوب)",
      code: `<!-- ❌ شلوغ و تکراری -->
<p>{{ items.filter(i => !i.done).length }} کار مونده</p>

<!-- ✅ تمیز -->
<p>{{ remaining }} کار مونده</p>`,
    },
    {
      kind: "code",
      code: `import { ref, computed } from 'vue'

const items = ref([{ done: true }, { done: false }])

const remaining = computed(() => items.value.filter(i => !i.done).length)
// استفاده در JS: remaining.value`,
    },
    { kind: "h", text: "کش شدن: ابرقدرت computed" },
    {
      kind: "p",
      text: "computed نتیجه رو کش می‌کنه. تا وقتی وابستگی‌هاش عوض نشه، دوباره حساب نمی‌کنه. ولی یه متد معمولی هر بار رندر دوباره اجرا می‌شه.",
    },
    {
      kind: "analogy",
      text: "computed مثل دانش‌آموز باهوشیه که جواب رو یادداشت می‌کنه 📝 و تا وقتی سؤال عوض نشده، دوباره حسابش نمی‌کنه. متد مثل کسیه که هر بار از اول کل مسئله رو حل می‌کنه. 😅",
    },
    { kind: "h", text: "computed نوشتنی (getter/setter)" },
    {
      kind: "code",
      code: `const first = ref('لیلا')
const last = ref('محمدی')

const fullName = computed({
  get: () => first.value + ' ' + last.value,
  set: (val) => {
    const parts = val.split(' ')
    first.value = parts[0]
    last.value = parts[1] || ''
  }
})`,
    },
    {
      kind: "warn",
      title: "قانون طلایی",
      text: "داخل computed هیچ‌وقت عوارض جانبی (side effect) نذار: نه درخواست شبکه، نه تغییر دادن ref دیگه. computed فقط باید «حساب کنه و برگردونه». 🧼",
    },
  ],
  demo: {
    title: "سبد خرید کوچولو",
    description: "تعداد رو عوض کن؛ جمع کل و تخفیف خودکار حساب می‌شن. هیچ‌جا دستی محاسبه نکردیم!",
    files: {
      "/App.vue": `<script setup>
import { ref, computed } from 'vue'

const price = ref(250000)
const qty = ref(2)

const total = computed(() => price.value * qty.value)
const discount = computed(() => (total.value > 1000000 ? total.value * 0.1 : 0))
const payable = computed(() => total.value - discount.value)
const fa = (n) => Math.round(n).toLocaleString('fa-IR')
</script>

<template>
  <label>تعداد: <input type="number" v-model.number="qty" min="1" /></label>
  <ul>
    <li>جمع: {{ fa(total) }} تومان</li>
    <li>تخفیف: {{ fa(discount) }} تومان</li>
    <li><b>قابل پرداخت: {{ fa(payable) }} تومان</b></li>
  </ul>
  <p v-if="discount > 0">🎉 تخفیف ۱۰٪ برات فعال شد!</p>
</template>`,
    },
  },
  project: {
    title: "پروژه: ماشین‌حساب BMI 🏃",
    brief:
      "قد و وزن رو بگیر و شاخص توده‌ی بدنی رو با computed حساب کن؛ به‌علاوه یه پیام وضعیت که خودش از روی BMI می‌آد.",
    steps: [
      "دو تا ref بساز: heightCm و weightKg.",
      "یه computed به اسم bmi بنویس: وزن تقسیم بر مجذور قد (به متر).",
      "یه computed دیگه به اسم status که بر اساس bmi متن مناسب برگردونه.",
      "یه computed برای رنگ وضعیت بنویس و با ‎:style‎ استفاده کن.",
      "خروجی BMI رو با ‎toFixed(1)‎ گرد کن.",
    ],
    starter: {
      "/App.vue": `<script setup>
import { ref, computed } from 'vue'

const heightCm = ref(175)
const weightKg = ref(70)

// TODO: computed bmi
// TODO: computed status
</script>

<template>
  <label>قد (سانتی‌متر): <input type="number" v-model.number="heightCm" /></label>
  <label>وزن (کیلوگرم): <input type="number" v-model.number="weightKg" /></label>
  <!-- TODO: نمایش bmi و status -->
</template>`,
    },
    solution: {
      "/App.vue": `<script setup>
import { ref, computed } from 'vue'

const heightCm = ref(175)
const weightKg = ref(70)

const bmi = computed(() => {
  const m = heightCm.value / 100
  if (!m) return 0
  return weightKg.value / (m * m)
})

const status = computed(() => {
  const b = bmi.value
  if (b < 18.5) return 'کم‌وزن 🥲'
  if (b < 25) return 'عالی و نرمال 💪'
  if (b < 30) return 'اضافه‌وزن 🍔'
  return 'چاقی — یه قدم‌زدن بزن 🚶'
})

const color = computed(() => {
  const b = bmi.value
  if (b < 18.5) return '#0ea5e9'
  if (b < 25) return '#16a34a'
  if (b < 30) return '#f59e0b'
  return '#dc2626'
})
</script>

<template>
  <div class="box">
    <h3>ماشین‌حساب BMI</h3>
    <label>قد (cm): <input type="number" v-model.number="heightCm" /></label>
    <label>وزن (kg): <input type="number" v-model.number="weightKg" /></label>
    <h2 :style="{ color: color }">{{ bmi.toFixed(1) }}</h2>
    <p :style="{ color: color }">{{ status }}</p>
  </div>
</template>

<style scoped>
.box { border: 1px solid #e2e8f0; border-radius: 18px; padding: 16px; max-width: 340px; text-align: center; }
label { display: block; margin: 8px 0; }
h2 { font-size: 42px; margin: 6px 0; }
</style>`,
    },
  },
  quiz: [
    {
      id: "l4q1",
      question: "مهم‌ترین تفاوت computed با یک متد معمولی چیه؟",
      options: [
        "computed سریع‌تر تایپ می‌شه",
        "computed نتیجه رو بر اساس وابستگی‌ها کش می‌کنه",
        "متدها توی تمپلیت کار نمی‌کنن",
        "هیچ فرقی ندارن",
      ],
      answer: 1,
      explain: "دقیقاً! کش‌شدن نکته‌ی اصلیه؛ متد هر بار رندر دوباره اجرا می‌شه. 🧠",
    },
    {
      id: "l4q2",
      question: "داخل computed چه کاری نباید بکنیم؟",
      options: [
        "برگردوندن یک مقدار",
        "استفاده از چند ref",
        "ارسال درخواست شبکه یا تغییر دادن استیت",
        "استفاده از فیلتر روی آرایه",
      ],
      answer: 2,
      explain: "آره! computed باید خالص باشه — فقط حساب کن و برگردون. عوارض جانبی ممنوع. 🧼",
    },
    {
      id: "l4q3",
      question: "برای اینکه یک computed قابل نوشتن باشه چی لازمه؟",
      options: [
        "استفاده از reactive",
        "تعریف get و set",
        "اضافه کردن .writable",
        "computed هیچ‌وقت قابل نوشتن نیست",
      ],
      answer: 1,
      explain: "درسته! با آبجکتی شامل get و set می‌تونی computed نوشتنی بسازی. ✍️",
    },
  ],
};

export default level;
