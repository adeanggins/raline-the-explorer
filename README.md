# 🦕 Raline The Explorer

A learning adventure game for Raline — a 5-year-old Indonesian girl who loves
dinosaurs — together with her sidekick **Pinky** the pink pachycephalosaurus. 💗

Built as a single static web app (no dependencies, no build step) so it runs
anywhere, including GitHub Pages, phones, and tablets.

## 🎮 Learning modules

| Module | What she learns |
| --- | --- |
| 🔢 Matematika | Addition & subtraction (with counting helpers) |
| 🪑 Benda Sekitar | Identifying everyday objects |
| 🌻 Tanaman | Identifying plants |
| 🍉 Buah | Identifying fruits |
| 🦁 Hewan | Identifying animals |
| 🦖 Dinosaurus | Identifying dinosaurs (hand-drawn SVG dinos!) |
| 🔤 Membaca | Recognizing letters & spelling simple words |
| 🌍 Bendera | Country flag quiz |

## ✨ Features

- **Randomized answer modes** — questions randomly ask for multiple choice
  *or* "typing" via kid-friendly letter tiles / a number pad.
- **XP & level system** — every answer earns XP; levels unlock new explorer
  titles (Penjelajah Kecil → Penjelajah Legendaris) with a celebration screen.
- **Session tracking** — every play session is recorded (duration, questions,
  accuracy, per-module stats) and shown in the **📋 Laporan Ayah & Bunda**
  parent report. Data is stored locally in the browser (localStorage).
- **Expressive characters** — Raline and Pinky are hand-drawn SVGs with
  different reactions: thinking, happy, excited, cheering, and an encouraging
  "oops" face when an answer is wrong.
- **Sound** — cheerful chimes and an Indonesian text-to-speech 🔊 button for
  letters and words.

## 🚀 Run locally

Just open `index.html` in a browser, or:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

Made with ❤️ for Raline.
