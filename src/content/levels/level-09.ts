import type { Level } from "../types";

const level: Level = {
  id: 9,
  slug: "form-bindings",
  emoji: "📝",
  title: "فرم‌ها و v-model",
  tagline: "اتصال دوطرفه، بدون دردسر",
  xp: 130,
  duration: "۱۳ دقیقه",
  docsUrl: "https://vuejs.org/guide/essentials/forms.html",
  learn: [
    {
      kind: "p",
      text: "بدون v-model باید هم ‎:value‎ بدی، هم ‎@input‎ بگیری و دستی ست کنی. v-model این دو تا رو یکی می‌کنه: اتصال دوطرفه‌ی داده و ورودی. ✌️",
    },
    {
      kind: "code",
      caption: "همین دو تا دقیقاً یکی‌ان",
      code: `<input :value="text" @input="text = $event.target.value" />
<!-- ⬇️ خیلی تمیزتر -->
<input v-model="text" />`,
    },
    { kind: "h", text: "روی همه‌ی انواع ورودی کار می‌کنه" },
    {
      kind: "code",
      code: `<input v-model="name" />                     <!-- متن -->
<textarea v-model="bio"></textarea>         <!-- متن چندخطی -->
<input type="checkbox" v-model="accepted" /> <!-- بولین -->
<input type="checkbox" value="vue" v-model="skills" /> <!-- آرایه -->
<input type="radio" value="m" v-model="gender" />
<select v-model="city">
  <option value="thr">تهران</option>
</select>`,
    },
    { kind: "h", text: "مادیفایرهای v-model" },
    {
      kind: "list",
      items: [
        "‎.lazy‎ → به‌جای هر کلید، موقع change آپدیت می‌کنه",
        "‎.number‎ → ورودی رو به عدد تبدیل می‌کنه (خیلی مهم! وگرنه '2' + 1 می‌شه '21' 😱)",
        "‎.trim‎ → فاصله‌های اضافه‌ی اول و آخر رو حذف می‌کنه",
      ],
    },
    {
      kind: "code",
      code: `<input v-model.number="age" type="number" />
<input v-model.trim="username" />
<input v-model.lazy="search" />`,
    },
    {
      kind: "tip",
      title: "اعتبارسنجی با computed",
      text: "پیام‌های خطا رو با computed حساب کن؛ اینطوری فرم زنده و بدون کد اضافه اعتبارسنجی می‌شه. مثلاً ‎const emailOk = computed(() => email.value.includes('@'))‎ ✅",
    },
    {
      kind: "analogy",
      text: "v-model مثل یه سیم دوطرفه‌ست 🔌 — داده می‌ره توی اینپوت، تایپ کاربر برمی‌گرده توی داده. برق دوطرفه، بدون اتصالی!",
    },
  ],
  demo: {
    title: "فرم زنده",
    description: "تایپ کن و ببین خروجی JSON بلافاصله آپدیت می‌شه. 🔁",
    files: {
      "/App.vue": `<script setup>
import { ref, computed } from 'vue'

const form = ref({
  name: '',
  age: 20,
  city: 'thr',
  skills: [],
  newsletter: true
})

const summary = computed(() => JSON.stringify(form.value, null, 2))
</script>

<template>
  <div class="grid">
    <label>اسم: <input v-model.trim="form.name" placeholder="اسمت" /></label>
    <label>سن: <input type="number" v-model.number="form.age" /></label>
    <label>شهر:
      <select v-model="form.city">
        <option value="thr">تهران</option>
        <option value="isf">اصفهان</option>
        <option value="shz">شیراز</option>
      </select>
    </label>
    <div>
      مهارت‌ها:
      <label><input type="checkbox" value="vue" v-model="form.skills" /> Vue</label>
      <label><input type="checkbox" value="css" v-model="form.skills" /> CSS</label>
      <label><input type="checkbox" value="ts" v-model="form.skills" /> TypeScript</label>
    </div>
    <label><input type="checkbox" v-model="form.newsletter" /> خبرنامه بیاد</label>
  </div>

  <pre>{{ summary }}</pre>
</template>

<style scoped>
.grid { display: grid; gap: 10px; }
pre { direction: ltr; text-align: left; background: rgba(100,116,139,.12); padding: 12px; border-radius: 12px; font-size: 12px; }
</style>`,
    },
  },
  project: {
    title: "پروژه: فرم ثبت‌نام با اعتبارسنجی زنده ✍️",
    brief:
      "یه فرم ثبت‌نام بساز با نام، ایمیل، رمز، تکرار رمز و تیک قوانین. تا وقتی همه‌چی درست نیست، دکمه‌ی ثبت غیرفعال بمونه.",
    steps: [
      "یه آبجکت ref به اسم form با فیلدهای لازم بساز.",
      "همه‌ی ورودی‌ها رو با v-model وصل کن (‎.trim‎ برای متن‌ها).",
      "برای هر قانون یه computed بنویس: نام حداقل ۳ حرف، ایمیل شامل @، رمز حداقل ۶ کاراکتر، تکرار رمز برابر.",
      "یه computed به اسم isValid بساز که همه‌ی قوانین رو and کنه و دکمه رو ‎:disabled‎ کن.",
      "بعد از ارسال موفق، پیام تبریک نشون بده (‎v-if‎).",
    ],
    starter: {
      "/App.vue": `<script setup>
import { ref, computed } from 'vue'

const form = ref({ name: '', email: '', pass: '', pass2: '', terms: false })

// TODO: قوانین اعتبارسنجی با computed
// TODO: isValid
</script>

<template>
  <form @submit.prevent="">
    <input v-model.trim="form.name" placeholder="نام" />
    <!-- TODO: بقیه‌ی فیلدها و پیام‌های خطا -->
    <button type="submit">ثبت‌نام</button>
  </form>
</template>`,
    },
    solution: {
      "/App.vue": `<script setup>
import { ref, computed } from 'vue'

const form = ref({ name: '', email: '', pass: '', pass2: '', terms: false })
const submitted = ref(false)

const nameOk = computed(() => form.value.name.length >= 3)
const emailOk = computed(() => /.+@.+\\..+/.test(form.value.email))
const passOk = computed(() => form.value.pass.length >= 6)
const matchOk = computed(() => form.value.pass !== '' && form.value.pass === form.value.pass2)
const isValid = computed(() => nameOk.value && emailOk.value && passOk.value && matchOk.value && form.value.terms)

function submit() {
  if (!isValid.value) return
  submitted.value = true
}
</script>

<template>
  <div class="box">
    <h3 v-if="!submitted">ساخت حساب کاربری 🚀</h3>

    <form v-if="!submitted" @submit.prevent="submit">
      <label>نام
        <input v-model.trim="form.name" placeholder="مثلاً مینا" />
        <small v-if="form.name && !nameOk">حداقل ۳ حرف لطفاً 🙏</small>
      </label>

      <label>ایمیل
        <input v-model.trim="form.email" type="email" placeholder="you@mail.com" />
        <small v-if="form.email && !emailOk">این ایمیل یه جای کارش می‌لنگه 🤔</small>
      </label>

      <label>رمز عبور
        <input v-model="form.pass" type="password" />
        <small v-if="form.pass && !passOk">حداقل ۶ کاراکتر 🔒</small>
      </label>

      <label>تکرار رمز
        <input v-model="form.pass2" type="password" />
        <small v-if="form.pass2 && !matchOk">با هم یکی نیستن! 😵</small>
      </label>

      <label class="inline">
        <input type="checkbox" v-model="form.terms" /> قوانین رو قبول دارم
      </label>

      <button type="submit" :disabled="!isValid">
        {{ isValid ? 'ثبت‌نام کن! ✅' : 'هنوز کامل نیست...' }}
      </button>
    </form>

    <div v-else class="done">
      <h3>🎉 خوش اومدی {{ form.name }}!</h3>
      <p>حسابت با ایمیل {{ form.email }} ساخته شد.</p>
      <button @click="submitted = false">برگرد به فرم</button>
    </div>
  </div>
</template>

<style scoped>
.box { border: 1px solid #e2e8f0; border-radius: 18px; padding: 18px; max-width: 380px; }
form { display: grid; gap: 12px; }
label { display: grid; gap: 4px; font-size: 14px; }
label.inline { display: flex; align-items: center; gap: 8px; }
small { color: #dc2626; }
button:disabled { opacity: .5; cursor: not-allowed; }
.done { text-align: center; }
</style>`,
    },
  },
  quiz: [
    {
      id: "l9q1",
      question: "v-model دقیقاً معادل چیه؟",
      options: [
        ":value به‌علاوه‌ی @input",
        "فقط :value",
        "فقط @change",
        "v-bind:model",
      ],
      answer: 0,
      explain: "درسته! v-model شکر سینتکسی برای همین ترکیبه. 🔌",
    },
    {
      id: "l9q2",
      question: "برای اینکه ورودی عددی واقعاً عدد باشه (نه رشته) چی اضافه می‌کنیم؟",
      options: ["v-model.trim", "v-model.lazy", "v-model.number", "v-model.int"],
      answer: 2,
      explain: "آفرین! ‎.number‎ نجات‌دهنده‌ست، وگرنه '2' + 1 می‌شه '21' 😱",
    },
    {
      id: "l9q3",
      question: "چند چک‌باکس با یک v-model روی یک آرایه چه رفتاری دارن؟",
      options: [
        "فقط آخری ذخیره می‌شه",
        "مقدارهای تیک‌خورده داخل آرایه جمع می‌شن",
        "ارور می‌ده",
        "آرایه به بولین تبدیل می‌شه",
      ],
      answer: 1,
      explain: "دقیقاً! برای انتخاب چندتایی عالیه. ☑️☑️",
    },
  ],
};

export default level;
