# 🍃 ویوکده — VueKade

An interactive, gamified, **project-based Vue.js course** in Persian (Farsi, RTL) — Codecademy style.
Every level teaches one concept from the [official Vue.js docs](https://vuejs.org/guide/introduction.html),
ends with a mini-project built in a **real in-browser Vue playground**, and is gated behind a quiz.

---

## ✨ Features

| Feature | Details |
| --- | --- |
| 🧪 Real Vue playground | Edits real `.vue` SFCs (template + `<script setup>` + `<style scoped>`) and runs them live in a sandboxed iframe using **`vue3-sfc-loader` + Vue 3 runtime** (served locally from `public/vendor`, no CDN required). |
| ⌨️ Code editor | **CodeMirror 6** (`@uiw/react-codemirror`) with Vue syntax highlighting, light/dark themes, multi-file tabs. |
| 🎮 Level system | 11 levels, locked → unlocked → completed. A level unlocks only when the previous quiz is passed. |
| 🧠 Quizzes | Multiple choice, instant feedback, funny hints, retry-until-correct. |
| ⭐ Gamification | XP per level, global progress bar, 🎉 confetti celebration, end-of-course certificate page. |
| 💾 Persistence | Progress + learner code saved in `localStorage` **and** mirrored into a local file-based database (`data/db.json` inside the app directory) through `/api/progress` — no external database server needed. |
| 🌗 Theming | Dark/light mode (persisted), synced into the playground iframe too. |
| 🇮🇷 Language | 100% Persian UI, `dir="rtl"`, `lang="fa"`, **Vazirmatn** font. Code samples stay English with Persian comments. |

---

## 🚀 Getting started

```bash
npm install          # install dependencies
npm run dev          # start dev server  → http://localhost:3000
npm run build        # production build
npm run start        # run the production build
npm run typecheck    # TypeScript check
npm run lint         # eslint
```

### Local file database (no server needed)

The app ships with its own tiny file-based database: `data/db.json` inside the project
directory (created automatically on first write). The API routes in `src/app/api/progress`
read/write it with `node:fs` — atomic writes via a `.tmp` + rename.

```bash
data/db.json   # { "learners": { "<clientId>": { nickname, xp, state, updatedAt } } }
```

Nothing to install, no `DATABASE_URL`, no PostgreSQL. Delete the `data/` folder to reset
the server-side mirror (browser `localStorage` still remains the client-side source of truth).

---

## 🧱 Tech stack

- **Next.js 16 (App Router) + React 19 + TypeScript** — the platform shell
- **Tailwind CSS v4** — styling (`src/app/globals.css`)
- **Vue 3 + vue3-sfc-loader** — the live playground engine (runs *inside* the app)
- **CodeMirror 6** — the editor
- **File-based local DB** (`data/db.json` + `node:fs`) — progress persistence
- **canvas-confetti** — 🎉

---

## 📁 Project structure

```
public/
  sandbox.html                 # the iframe that compiles & mounts .vue files at runtime
  vendor/
    vue.esm-browser.prod.js    # Vue 3 runtime (copied from node_modules)
    vue3-sfc-loader.esm.js     # in-browser SFC compiler (copied from node_modules)

src/
  app/
    layout.tsx                 # RTL shell, Vazirmatn, theme bootstrap, providers
    page.tsx                   # landing page + hero playground + course map
    levels/[slug]/page.tsx     # one page per level (SSG via generateStaticParams)
    finish/page.tsx            # certificate / end-of-course page
    api/progress/route.ts      # GET/POST learner progress (file-based local DB)
    api/health/route.ts        # healthcheck
  components/
    progress-provider.tsx      # React context: XP, unlocking, saved code (localStorage + sync)
    site-header.tsx            # logo, progress bar, XP, theme toggle
    course-map.tsx             # level cards grid on the landing page
    level-sidebar.tsx          # stepper navigation with lock/complete states
    level-view.tsx             # 📖 Learn / 🔨 Build / 🧠 Quiz tabs
    lesson-blocks.tsx          # renderer for structured lesson content
    quiz.tsx                   # quiz engine + confetti + unlock
    certificate.tsx            # final celebration
    playground/
      playground.tsx           # editor + preview + run/reset/solution toolbar
      code-editor.tsx          # CodeMirror wrapper (client-only)
      vue-preview.tsx          # iframe bridge (postMessage protocol)
  content/
    types.ts                   # Level / Block / Quiz type definitions
    index.ts                   # level registry
    levels/level-01..11.ts     # ALL course content lives here
  db/
    index.ts                   # Drizzle client
    schema.ts                  # learner_progress table
```

---

## 🗺️ Course map

| Level | Topic | Mini-project |
| --- | --- | --- |
| 1 | What is Vue? + setup | Profile card 🪪 |
| 2 | Template syntax | Product card 🛍️ |
| 3 | Reactivity (`ref`, `reactive`) | Pro counter ➕ |
| 4 | Computed properties | BMI calculator 🏃 |
| 5 | Class & style bindings | Light/dark panel 🌗 |
| 6 | Conditional rendering | Fake login flow 🔐 |
| 7 | List rendering (`v-for`) | To-do list ✅ |
| 8 | Event handling | "Catch the mouse" game 🐭 |
| 9 | Form bindings (`v-model`) | Sign-up form with live validation ✍️ |
| 10 | Components, props, events | User cards (multi-file) 👥 |
| 11 | **Capstone** | Expense tracker with 3 components 💰 |

---

## ➕ How to add a new level

1. Create `src/content/levels/level-12.ts` and default-export a `Level` object:

```ts
import type { Level } from "../types";

const level: Level = {
  id: 12,
  slug: "lifecycle",              // used in the URL: /levels/lifecycle
  emoji: "♻️",
  title: "چرخه‌ی حیات کامپوننت",
  tagline: "onMounted و دوستان",
  xp: 140,
  duration: "۱۲ دقیقه",
  docsUrl: "https://vuejs.org/guide/essentials/lifecycle.html",
  learn: [
    { kind: "p", text: "متن درس..." },
    { kind: "code", caption: "مثال", code: "// ..." },
    { kind: "tip", title: "نکته", text: "..." },
  ],
  demo: { title: "...", description: "...", files: { "/App.vue": "..." } },
  project: {
    title: "پروژه: ...",
    brief: "...",
    steps: ["قدم ۱", "قدم ۲"],
    starter:  { "/App.vue": "..." },
    solution: { "/App.vue": "..." },
  },
  quiz: [
    { id: "l12q1", question: "...", options: ["A", "B"], answer: 1, explain: "..." },
  ],
};

export default level;
```

2. Register it in `src/content/index.ts` (import + push into the `levels` array).
3. Done — routing, unlocking, XP totals, sidebar, landing cards and the certificate all update automatically.

### Content authoring notes

- **Block kinds:** `h`, `p`, `list` (`ordered?`), `code` (`caption?`), `tip`, `warn`, `analogy`.
- Inside `p`/`list`/`tip` text you can use `**bold**`, and wrap inline code in `U+200E` marks
  (the invisible LTR mark) to get a styled `<code>` chip — e.g. `‎.value‎`.
- Playground files are a plain map: `{ "/App.vue": "...", "/Child.vue": "..." }`.
  Imports between files work (`import Child from './Child.vue'`), so multi-component
  projects are supported out of the box.

---

## 🔌 The playground protocol

`vue-preview.tsx` ⇄ `public/sandbox.html` talk over `postMessage`:

```jsonc
// parent → iframe
{ "target": "vue-sandbox", "type": "render", "files": { "/App.vue": "..." }, "dark": true }

// iframe → parent
{ "source": "vue-sandbox", "type": "boot" }     // sandbox is ready
{ "source": "vue-sandbox", "type": "ready" }    // app mounted OK
{ "source": "vue-sandbox", "type": "error", "message": "..." }
```

The iframe unmounts the previous app and removes injected styles before every re-render,
so hot updates are clean and leak-free.

---

## 🔐 Adding auth later

`learner_progress` already has `client_id` (anonymous browser id) and a nullable `user_id`.
To add login: authenticate the user, then POST the same payload with `userId` filled in and
merge the anonymous row into the account row. No UI changes required elsewhere.

---

Made with 💚 — content based on the official Vue.js documentation.
