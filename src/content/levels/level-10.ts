import type { Level } from "../types";

const level: Level = {
  id: 10,
  slug: "components",
  emoji: "🧱",
  title: "کامپوننت‌ها، props و رویدادها",
  tagline: "لِگوبازی حرفه‌ای با ویو",
  xp: 150,
  duration: "۱۸ دقیقه",
  docsUrl: "https://vuejs.org/guide/essentials/component-basics.html",
  learn: [
    {
      kind: "p",
      text: "تا اینجا همه‌چی توی یه فایل بود. ولی برنامه‌های واقعی بزرگ می‌شن. کامپوننت‌ها یعنی شکستن UI به قطعه‌های کوچیکِ قابل استفاده‌ی دوباره — مثل لگو 🧱",
    },
    {
      kind: "analogy",
      text: "props مثل پارامترهای تابعه ⬇️ (والد به فرزند می‌ده) و emit مثل return یا داد زدنِ فرزنده ⬆️ («هی بابا! یه اتفاقی افتاد»). جریان داده یک‌طرفه‌ست: پایین با props، بالا با رویداد.",
    },
    { kind: "h", text: "ساخت و استفاده" },
    {
      kind: "code",
      caption: "TaskCard.vue (فرزند)",
      code: `<script setup>
// تعریف ورودی‌ها
const props = defineProps({
  title: { type: String, required: true },
  done: { type: Boolean, default: false }
})

// تعریف رویدادهای خروجی
const emit = defineEmits(['toggle', 'remove'])
</script>

<template>
  <div class="card">
    <b>{{ title }}</b>
    <button @click="emit('toggle')">تغییر وضعیت</button>
    <button @click="emit('remove')">حذف</button>
  </div>
</template>`,
    },
    {
      kind: "code",
      caption: "App.vue (والد)",
      code: `<script setup>
import TaskCard from './TaskCard.vue'
</script>

<template>
  <TaskCard
    title="یادگیری کامپوننت"
    :done="true"
    @toggle="onToggle"
    @remove="onRemove"
  />
</template>`,
    },
    { kind: "h", text: "نکات طلایی" },
    {
      kind: "list",
      items: [
        "پراپ‌ها **فقط خواندنی**‌ان. فرزند نباید مستقیم عوضشون کنه؛ باید emit کنه.",
        "اسم پراپ رو توی JS با camelCase و توی تمپلیت با kebab-case می‌نویسیم: ‎userName‎ → ‎:user-name‎",
        "برای پاس دادن غیر-رشته حتماً ‎:‎ بذار: ‎:count=\"3\"‎ نه ‎count=\"3\"‎",
        "‎<slot />‎ یعنی «جای خالی» که والد می‌تونه داخلش محتوا بذاره.",
        "‎defineModel()‎ راه سریع ساخت کامپوننتی‌ست که با v-model کار می‌کنه.",
      ],
    },
    {
      kind: "code",
      caption: "اسلات: محتوای دلخواه از والد",
      code: `<!-- Card.vue -->
<div class="card"><slot>محتوای پیش‌فرض</slot></div>

<!-- استفاده -->
<Card><h3>هرچی دوست داشتم 😍</h3></Card>`,
    },
    {
      kind: "warn",
      title: "خطای رایج",
      text: "اگه توی فرزند بنویسی ‎props.done = true‎ ویو بهت اخطار می‌ده. جریان داده یک‌طرفه‌ست: بالا → پایین با props، پایین → بالا با emit. 🚦",
    },
  ],
  demo: {
    title: "والد و فرزند در عمل",
    description:
      "این پلی‌گراند دو فایل داره! روی تب‌ها کلیک کن تا ‎RatingStars.vue‎ رو هم ببینی.",
    files: {
      "/App.vue": `<script setup>
import { ref } from 'vue'
import RatingStars from './RatingStars.vue'

const score = ref(3)
const log = ref('هنوز چیزی امتیاز نگرفته')
</script>

<template>
  <h3>به این دوره چند می‌دی؟</h3>

  <RatingStars
    :value="score"
    label="امتیاز دوره"
    @change="(v) => { score = v; log = 'امتیاز شد ' + v }"
  />

  <p>{{ log }}</p>
  <p>مقدار در والد: <b>{{ score }}</b></p>
</template>`,
      "/RatingStars.vue": `<script setup>
// props: داده‌ای که از والد می‌آد
defineProps({
  value: { type: Number, default: 0 },
  label: { type: String, default: '' }
})

// emit: پیامی که به والد می‌فرستیم
const emit = defineEmits(['change'])
</script>

<template>
  <div class="stars">
    <span class="label">{{ label }}:</span>
    <button
      v-for="n in 5"
      :key="n"
      class="star"
      :class="{ on: n <= value }"
      @click="emit('change', n)"
    >★</button>
  </div>
</template>

<style scoped>
.stars { display: flex; align-items: center; gap: 4px; }
.star { background: transparent; border: none; font-size: 26px; color: #cbd5e1; cursor: pointer; padding: 0 2px; }
.star.on { color: #f59e0b; }
.label { margin-inline-end: 6px; }
</style>`,
    },
  },
  project: {
    title: "پروژه: لیست کارت‌های کاربر با کامپوننت 👥",
    brief:
      "یه کامپوننت ‎UserCard.vue‎ بساز که اطلاعات کاربر رو با props بگیره و با دکمه‌ی «دنبال کردن» یه رویداد به والد بفرسته. والد لیست کاربران رو با v-for رندر می‌کنه.",
    steps: [
      "توی UserCard.vue پراپ‌های name و role و avatar و following رو تعریف کن.",
      "یه ‎defineEmits(['follow'])‎ بذار و روی دکمه emit کن.",
      "توی App.vue آرایه‌ی users رو با v-for رندر کن و ‎:key‎ بده.",
      "وقتی رویداد follow اومد، وضعیت اون کاربر رو توی والد عوض کن.",
      "یه شمارنده بذار که بگه چند نفر رو دنبال می‌کنی (با computed).",
    ],
    starter: {
      "/App.vue": `<script setup>
import { ref } from 'vue'
import UserCard from './UserCard.vue'

const users = ref([
  { id: 1, name: 'مینا', role: 'طراح UI', avatar: '👩‍🎨', following: false },
  { id: 2, name: 'رضا', role: 'فرانت‌اند', avatar: '🧑‍💻', following: false },
  { id: 3, name: 'هانیه', role: 'بک‌اند', avatar: '👩‍🔧', following: false }
])

// TODO: تابع toggleFollow
</script>

<template>
  <h3>کاربران</h3>
  <!-- TODO: v-for روی users و پاس دادن props -->
</template>`,
      "/UserCard.vue": `<script setup>
// TODO: defineProps و defineEmits
</script>

<template>
  <div class="card">
    <!-- TODO: نمایش اطلاعات و دکمه -->
  </div>
</template>

<style scoped>
.card { border: 1px solid #e2e8f0; border-radius: 16px; padding: 12px; }
</style>`,
    },
    solution: {
      "/App.vue": `<script setup>
import { ref, computed } from 'vue'
import UserCard from './UserCard.vue'

const users = ref([
  { id: 1, name: 'مینا', role: 'طراح UI', avatar: '👩‍🎨', following: false },
  { id: 2, name: 'رضا', role: 'فرانت‌اند', avatar: '🧑‍💻', following: true },
  { id: 3, name: 'هانیه', role: 'بک‌اند', avatar: '👩‍🔧', following: false }
])

const followingCount = computed(() => users.value.filter(u => u.following).length)

function toggleFollow(id) {
  const user = users.value.find(u => u.id === id)
  if (user) user.following = !user.following
}
</script>

<template>
  <h3>کاربران ({{ followingCount }} نفر دنبال می‌شن)</h3>

  <div class="list">
    <UserCard
      v-for="u in users"
      :key="u.id"
      :name="u.name"
      :role="u.role"
      :avatar="u.avatar"
      :following="u.following"
      @follow="toggleFollow(u.id)"
    />
  </div>
</template>

<style scoped>
.list { display: grid; gap: 10px; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }
</style>`,
      "/UserCard.vue": `<script setup>
defineProps({
  name: { type: String, required: true },
  role: { type: String, default: '' },
  avatar: { type: String, default: '🙂' },
  following: { type: Boolean, default: false }
})

const emit = defineEmits(['follow'])
</script>

<template>
  <div class="card" :class="{ on: following }">
    <div class="avatar">{{ avatar }}</div>
    <b>{{ name }}</b>
    <small>{{ role }}</small>
    <button @click="emit('follow')">
      {{ following ? 'دنبال می‌کنی ✅' : 'دنبال کردن ➕' }}
    </button>
  </div>
</template>

<style scoped>
.card { border: 1px solid #e2e8f0; border-radius: 16px; padding: 12px; text-align: center; transition: .2s; }
.card.on { border-color: #42b883; background: rgba(66,184,131,.1); }
.avatar { font-size: 34px; }
small { display: block; opacity: .7; margin-bottom: 8px; }
</style>`,
    },
  },
  quiz: [
    {
      id: "l10q1",
      question: "داده از والد به فرزند چطور می‌ره؟",
      options: ["با emit", "با props", "با slot", "با ref"],
      answer: 1,
      explain: "درسته! props مسیر رو به پایینه. ⬇️",
    },
    {
      id: "l10q2",
      question: "فرزند چطور به والد خبر می‌ده اتفاقی افتاده؟",
      options: [
        "props رو مستقیم تغییر می‌ده",
        "با emit یک رویداد سفارشی می‌فرسته",
        "با v-if",
        "با import کردن والد",
      ],
      answer: 1,
      explain: "آفرین! emit مسیر رو به بالاست. ⬆️ تغییر مستقیم props ممنوع!",
    },
    {
      id: "l10q3",
      question: "‎<slot />‎ برای چیه؟",
      options: [
        "برای تعریف پراپ",
        "برای جای خالی که والد داخلش محتوا می‌ذاره",
        "برای استایل scoped",
        "برای رویدادها",
      ],
      answer: 1,
      explain: "دقیقاً! اسلات یعنی «هرچی دوست داری اینجا بذار». 🎁",
    },
  ],
};

export default level;
