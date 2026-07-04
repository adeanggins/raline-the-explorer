# 🦕 Raline The Explorer v2

A bilingual (🇮🇩 Bahasa Indonesia / 🇬🇧 English) learning adventure that prepares
Raline — a 5-year-old dinosaur fan — for elementary school, together with her
sidekick **Pinky** the pink pachycephalosaurus. 💗

Built as a static, dependency-free web app (vanilla JS, no build step) that runs
on GitHub Pages and installs to a tablet as an offline PWA.

**Play:** https://adeanggins.github.io/raline-the-explorer/

## 🎓 Design grounding

The curriculum maps to **Kurikulum Merdeka PAUD / STPPA** outcomes (syllable-based
*suku kata* reading, counting to 20, shapes & patterns, self-help skills) and
kindergarten-readiness frameworks (US Common Core K, UK EYFS, Head Start ELOF).
The interaction design follows early-childhood ed-tech practice: audio-first
prompts for pre-readers, mastery-based adaptive difficulty, scaffolded hints,
no timers or fail states, collection rewards, a parental gate, and gentle
screen-time pacing.

## 🎮 Learning modules (15)

| Module | School-readiness skill |
| --- | --- |
| 🔢 Matematika / Math | Counting → addition & subtraction to 20 (4 tiers) |
| ⚖️ Membandingkan / Comparing | One-to-one counting, more/fewer, ordering numbers |
| 🔺 Bentuk & Pola / Shapes & Patterns | Shape names, ABAB/AABB/ABC patterns, odd-one-out |
| 🪑 Benda Sekitar / Objects | Everyday-object vocabulary |
| 🌻 Tanaman / Plants · 🍉 Buah / Fruits · 🦁 Hewan / Animals | Nature vocabulary |
| 🦖 Dinosaurus / Dinosaurs | Raline's favorite! Hand-drawn SVG dinos |
| 🔤 Membaca / Reading | Letters, upper↔lowercase, spelling words |
| 🗣️ Suku Kata / Syllables | Indonesian syllable method: BA+JU → BAJU, up to sentences |
| ✍️ Menulis / Writing | Canvas letter/number tracing with stroke-order dots |
| 🇬🇧 English Time | Colors, numbers, animals, body parts, family, greetings |
| 🌍 Bendera / Flags | Country flag quiz |
| 🃏 Kartu Memori / Memory | Working memory; tier 3 pairs pictures with words |
| 😊 Perasaan & Sikap / Feelings & Habits | Emotion naming + good-habit scenarios (SEL) |
| 🌟 Petualangan Harian / Daily Adventure | 10-question mix with spaced-repetition review |

## ✨ How it teaches

- **Bilingual everywhere** — one tap on the 🇮🇩/🇬🇧 flag switches the interface,
  the answers, and the text-to-speech voice; English Time teaches English
  vocabulary with Indonesian scaffolding.
- **Audio-first** — every question is read aloud automatically (Web Speech API,
  id-ID / en-US), with a 🔊 replay button. A 🔇 toggle mutes everything.
- **Adaptive difficulty** — each module has 3–4 tiers. A rolling accuracy window
  moves her up at ≥80% (with a celebration) and quietly down at ≤40%, so
  questions always feel "just right".
- **Scaffolded hints** — a first wrong answer removes two wrong options (or
  clears and prefills the first letter) and grants a retry for half XP; a second
  miss shows the answer warmly. Never a dead end.
- **Randomized answer modes** — multiple choice, picture choice, letter/syllable
  tiles, a number pad, tap-in-order, and canvas tracing.
- **XP, levels & dino eggs** — XP fills a level bar *and* an egg; full eggs hatch
  collectible color-variant baby dinos (some rare ✨) into a sticker book.
- **Spaced repetition** — missed items enter Leitner boxes and reappear in the
  Daily Adventure until mastered.
- **Session tracking + parent dashboard** — every session logs duration,
  questions, accuracy, and per-module stats. The report (behind a grown-ups-only
  gate) shows mastery tiers, a 14-day play-time chart, day streaks, weakest-skill
  offline practice tips, and JSON export/import of all progress.
- **Screen-time care** — after ~20 minutes Raline suggests a break (dismissible).
- **Offline PWA** — installable to a tablet home screen; a service worker caches
  everything, so it plays with no internet. All data stays on-device.

## 🚀 Run locally

```bash
python3 -m http.server 8080   # then open http://localhost:8080
```

(Or just open `index.html` — everything works from file:// except the service worker.)

## 🗂 Code map

| File | Purpose |
| --- | --- |
| `i18n.js` | All UI strings (id/en), settings store |
| `data.js` | Bilingual quiz content, SVG dinos & shapes |
| `characters.js` | Raline & Pinky SVGs with moods + emotion heads |
| `skills.js` | Difficulty tiers + mastery engine |
| `tracing.js` | Letter/number glyph strokes + canvas tracer |
| `game.js` | Screens, question builders, rounds, XP/eggs, report |
| `sw.js`, `manifest.json`, `icons/` | Offline PWA |

Made with ❤️ for Raline.
