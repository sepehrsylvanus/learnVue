"use client";

import Playground from "./playground/playground";

const FILES = {
  "/App.vue": `<script setup>
import { ref, computed } from 'vue'

// سلام! این کد واقعاً داره اجرا می‌شه 👇
const name = ref('رفیق')
const emojis = ['🍃', '🔥', '🚀', '✨', '🎉']
const i = ref(0)

const emoji = computed(() => emojis[i.value % emojis.length])
</script>

<template>
  <h2>سلام {{ name }} {{ emoji }}</h2>
  <input v-model="name" placeholder="اسمت رو بنویس" />
  <button @click="i++">ایموجی بعدی</button>
  <p>همین الان دستت به کد بخوره، اینجا عوض می‌شه 😍</p>
</template>

<style scoped>
h2 { color: #42b883; }
input { margin-inline-end: 8px; }
</style>`,
};

export default function HeroPlayground() {
  return <Playground levelId={0} scope="hero" files={FILES} height={380} persist={false} />;
}
