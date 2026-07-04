/* ============================================================
   Raline The Explorer v2 — game logic
   Bilingual (id/en) · adaptive tiers · scaffolded hints ·
   dino-egg collection · daily quest with spaced repetition ·
   parent dashboard + gate · rest reminder
   ============================================================ */

const QUESTIONS_PER_ROUND = 8;
const TRACE_PER_ROUND = 5;
const XP_MC = 10, XP_TYPE = 15, XP_ORDER = 12, XP_TRY = 2, XP_PAIR = 5;
const STREAK_BONUS = 5;
const EGG_COST = 150;
const REST_AFTER_MS = 20 * 60 * 1000;
const REST_SNOOZE_MS = 10 * 60 * 1000;

/* ---------- persistence & migration ---------- */

const store = {
  get(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  },
  set(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
};

let profile = store.get("raline_profile", {});
profile = { xp: 0, egg: 0, collection: {}, review: {}, ...profile }; // v1 → v2 keeps her XP
ensureMastery(profile);

let sessions = store.get("raline_sessions", []);

const session = {
  start: Date.now(), end: Date.now(),
  answered: 0, correct: 0, xp: 0, modules: {}
};
sessions.push(session);

function saveAll() {
  session.end = Date.now();
  store.set("raline_profile", profile);
  store.set("raline_sessions", sessions.slice(-300));
}
window.addEventListener("beforeunload", saveAll);
document.addEventListener("visibilitychange", () => { if (document.hidden) saveAll(); });

/* ---------- levels ---------- */

function totalXpForLevel(lvl) { return 60 * (lvl - 1) * lvl; }
function levelFromXp(xp) {
  let lvl = 1;
  while (totalXpForLevel(lvl + 1) <= xp) lvl++;
  return lvl;
}
function levelTitle(lvl) {
  const titles = t("levelTitles");
  return titles[Math.min(lvl - 1, titles.length - 1)];
}

/* ---------- helpers ---------- */

const $ = (id) => document.getElementById(id);
const rand = (n) => Math.floor(Math.random() * n);
const pick = (arr) => arr[rand(arr.length)];
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = rand(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function nameOf(item, lang) {
  const l = lang || settings.lang;
  return (l === "en" ? (item.en ?? item.id) : item.id);
}
function decoys(pool, correctName, n, lang) {
  const names = [...new Set(pool.map(x => typeof x === "string" ? x : nameOf(x, lang)).filter(x => x !== correctName))];
  return shuffle(names).slice(0, n);
}
function todayStr(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

/* ---------- audio ---------- */

let audioCtx = null;
function beep(freqs, dur = 0.15) {
  if (!settings.sound) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    freqs.forEach((f, i) => {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = "sine"; o.frequency.value = f;
      g.gain.setValueAtTime(0.18, audioCtx.currentTime + i * dur);
      g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + (i + 1) * dur);
      o.connect(g).connect(audioCtx.destination);
      o.start(audioCtx.currentTime + i * dur);
      o.stop(audioCtx.currentTime + (i + 1) * dur + 0.05);
    });
  } catch { /* no audio */ }
}
const soundGood = () => beep([523, 659, 784], 0.13);
const soundBad = () => beep([330, 262], 0.18);
const soundLevel = () => beep([523, 659, 784, 1047, 1319], 0.12);
const soundHint = () => beep([440, 554], 0.12);

function speak(text, lang) {
  if (!settings.sound || !text) return;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(String(text).toLowerCase());
    u.lang = lang || (settings.lang === "en" ? "en-US" : "id-ID");
    u.rate = 0.85;
    const voices = speechSynthesis.getVoices();
    const v = voices.find(v => v.lang.replace("_", "-").startsWith(u.lang.slice(0, 2)));
    if (v) u.voice = v;
    speechSynthesis.speak(u);
  } catch { /* no speech */ }
}
const contentLang = (forceEn) => forceEn || settings.lang === "en" ? "en-US" : "id-ID";

/* ---------- confetti ---------- */

function confetti(n = 40) {
  const colors = ["#f06292", "#ffd54f", "#4fc3f7", "#81c784", "#ba68c8", "#ff8a65"];
  for (let i = 0; i < n; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = rand(100) + "vw";
    c.style.background = pick(colors);
    c.style.animationDuration = (1.6 + Math.random() * 1.6) + "s";
    c.style.animationDelay = (Math.random() * 0.4) + "s";
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 4000);
  }
}

/* ---------- characters / HUD / screens ---------- */

function setChars(ralineMood, pinkyMood, pop = false) {
  const r = $("play-raline"), p = $("play-pinky");
  r.innerHTML = ralineSVG(ralineMood);
  p.innerHTML = pinkySVG(pinkyMood);
  if (pop) {
    r.classList.remove("pop"); p.classList.remove("pop");
    void r.offsetWidth;
    r.classList.add("pop"); p.classList.add("pop");
  }
}

function renderHud() {
  const lvl = levelFromXp(profile.xp);
  const base = totalXpForLevel(lvl), next = totalXpForLevel(lvl + 1);
  const pct = Math.min(100, Math.round(100 * (profile.xp - base) / (next - base)));
  $("hud-level").textContent = "Lv " + lvl;
  $("hud-title").textContent = levelTitle(lvl) + " · " + profile.xp + " XP";
  $("hud-xpfill").style.width = pct + "%";
  $("hud-avatar").innerHTML = ralineSVG("happy");
  $("hud-eggfill").style.width = Math.min(100, Math.round(100 * profile.egg / EGG_COST)) + "%";
  $("btn-lang").textContent = settings.lang === "id" ? "🇮🇩" : "🇬🇧";
  $("btn-sound").textContent = settings.sound ? "🔊" : "🔇";
}

function show(screenId) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  $(screenId).classList.add("active");
}

/* ---------- home (adventure map) ---------- */

function renderHome() {
  speechSynthesis?.cancel?.();
  $("home-raline").innerHTML = ralineSVG("happy");
  $("home-pinky").innerHTML = pinkySVG("happy");
  $("home-bubble").textContent = pick(t("greetings"));
  $("tagline").textContent = t("tagline");
  $("btn-report").textContent = t("btnReport");
  $("btn-stickers").textContent = t("btnStickers");
  const daily = store.get("raline_daily", {});
  $("btn-daily").textContent = t("btnDaily") + (daily.date === todayStr() && daily.done ? " ✅" : "");

  const area = $("map-area");
  area.innerHTML = "";
  area.className = settings.home === "grid" ? "modules" : "map";
  MODULES.forEach((m, idx) => {
    const [title, sub] = t("modules." + m.key);
    const tier = skillTier(m.key), max = SKILL_TIERS[m.key];
    const stars = "⭐".repeat(tier) + "☆".repeat(max - tier);
    const b = document.createElement("button");
    b.className = "module-btn" + (settings.home === "grid" ? "" : " island " + (idx % 2 ? "right" : "left"));
    b.innerHTML = `<span class="mi">${m.icon}</span><span class="mt">${title}</span><span class="ms">${sub}</span><span class="tier-stars">${stars}</span>`;
    b.onclick = () => startRound(m.key);
    area.appendChild(b);
  });
  $("btn-layout").textContent = settings.home === "grid" ? "🗺️" : "📋";
  renderHud();
  show("screen-home");
}

/* ============================================================
   QUESTION BUILDERS (tier-aware)
   q = { prompt, speakText, speakLang, visualHTML, answer,
         options?: [string | {key, html}], mode, units?, hintable }
   mode: mc | tiles | numpad | order
   ============================================================ */

function buildQuestion(moduleKey) {
  const tier = skillTier(moduleKey);
  switch (moduleKey) {
    case "math":    return qMath(tier);
    case "banding": return qBanding(tier);
    case "bentuk":  return qBentuk(tier);
    case "benda":   return qNaming(DATA.benda, "benda", tier);
    case "tanaman": return qNaming(DATA.tanaman, "tanaman", tier);
    case "buah":    return qNaming(DATA.buah, "buah", tier);
    case "hewan":   return qNaming(DATA.hewan, "hewan", tier);
    case "dino":    return qDino(tier);
    case "baca":    return qBaca(tier);
    case "suku":    return qSuku(tier);
    case "english": return qEnglish(tier);
    case "bendera": return qFlag(tier);
    case "rasa":    return qRasa(tier);
  }
}

const emojiRow = (emoji, n) => `<div class="counthelp">${(emoji + " ").repeat(n).trim()}</div>`;

/* ----- Math ----- */
function qMath(tier) {
  if (tier === 1) {
    const n = 3 + rand(8);
    const em = pick(["🍎", "🦕", "⭐", "🌸", "🐟"]);
    const mode = Math.random() < 0.5 ? "mc" : "numpad";
    return {
      prompt: tq("count"), speakText: tq("count"),
      visualHTML: emojiRow(em, n),
      answer: String(n),
      options: mode === "mc" ? numberOptions(n, 3) : null,
      mode, hintable: true
    };
  }
  let a, b, isAdd, max;
  if (tier === 2) { isAdd = true; max = 5; }
  else if (tier === 3) { isAdd = Math.random() < 0.6; max = 10; }
  else { isAdd = Math.random() < 0.5; max = 20; }
  if (isAdd) {
    a = 1 + rand(Math.min(10, max - 1));
    b = 1 + rand(Math.max(1, Math.min(10, max - a)));
  } else {
    a = 2 + rand(Math.min(10, max) - 1);
    b = 1 + rand(a - 1);
  }
  const ans = isAdd ? a + b : a - b;
  const sym = isAdd ? "+" : "−";
  const help = tier >= 4 ? "" :
    isAdd ? `<div class="counthelp">${"🟢".repeat(a)} ${"🟡".repeat(b)}</div>`
          : `<div class="counthelp">${"🍪".repeat(a)}</div>`;
  const mode = Math.random() < 0.5 ? "numpad" : "mc";
  return {
    prompt: isAdd ? tq("mathAdd") : tq("mathSub"),
    speakText: settings.lang === "en" ? `${a} ${isAdd ? "plus" : "minus"} ${b}` : `${a} ${isAdd ? "tambah" : "kurang"} ${b}`,
    visualHTML: `<div class="mathrow">${a} ${sym} ${b} = ?</div>${help}`,
    answer: String(ans),
    options: mode === "mc" ? numberOptions(ans, 4) : null,
    mode, hintable: true
  };
}

function numberOptions(ans, count) {
  const set = new Set([ans]);
  let guard = 0;
  while (set.size < count && guard++ < 60) {
    const d = ans + (rand(9) - 4);
    if (d >= 0 && d !== ans) set.add(d);
    else set.add(ans + set.size + 1);
  }
  return shuffle([...set].map(String));
}

/* ----- Comparing / number sense ----- */
function qBanding(tier) {
  if (tier === 1) {
    const n = 2 + rand(9);
    const em = pick(["🦖", "🍓", "🐤", "🌼", "🚗"]);
    return {
      prompt: tq("count"), speakText: tq("count"),
      visualHTML: emojiRow(em, n),
      answer: String(n), options: numberOptions(n, 3), mode: "mc", hintable: true
    };
  }
  if (tier === 2) {
    const more = Math.random() < 0.5;
    let a = 2 + rand(6), b = 2 + rand(6);
    if (a === b) b += 1;
    const emA = "🍎", emB = "🐟";
    const win = more ? (a > b ? "A" : "B") : (a < b ? "A" : "B");
    return {
      prompt: more ? tq("more") : tq("fewer"),
      speakText: more ? tq("more") : tq("fewer"),
      visualHTML: "",
      answer: win,
      options: [
        { key: "A", html: `<div class="grouppic">${(emA + " ").repeat(a)}</div>` },
        { key: "B", html: `<div class="grouppic">${(emB + " ").repeat(b)}</div>` }
      ],
      mode: "mc", hintable: false
    };
  }
  if (tier === 3) {
    let a = 1 + rand(20), b = 1 + rand(20);
    if (a === b) b = a + 1 + rand(3);
    return {
      prompt: tq("bigger"), speakText: tq("bigger"),
      visualHTML: "",
      answer: String(Math.max(a, b)),
      options: shuffle([String(a), String(b)]),
      mode: "mc", hintable: false
    };
  }
  const nums = shuffle(Array.from({ length: 20 }, (_, i) => i + 1)).slice(0, 4);
  return {
    prompt: tq("order"), speakText: tq("order"),
    visualHTML: "",
    answer: nums.slice().sort((x, y) => x - y).map(String).join(","),
    options: shuffle(nums.map(String)),
    mode: "order", hintable: true
  };
}

/* ----- Shapes & patterns ----- */
function qBentuk(tier) {
  if (tier === 1) {
    const s = pick(DATA.shapes);
    const name = nameOf(s);
    return {
      prompt: tq("shape"), speakText: tq("shape"),
      visualHTML: `<div class="big">${shapeSVG(s.art, pick(SHAPE_COLORS))}</div>`,
      answer: name,
      options: shuffle([name, ...decoys(DATA.shapes, name, 3)]),
      mode: "mc", hintable: true, speakAnswer: name
    };
  }
  if (tier === 2 || tier === 3) {
    const [x, y, z] = shuffle(DATA.patternPool).slice(0, 3);
    let seq, ans;
    if (tier === 2) { seq = [x, y, x, y, x]; ans = y; }
    else if (Math.random() < 0.5) { seq = [x, x, y, y, x, x]; ans = y; }
    else { seq = [x, y, z, x, y]; ans = z; }
    const wrong = shuffle(DATA.patternPool.filter(e => e !== ans && !seq.includes(e))).slice(0, 2);
    return {
      prompt: tq("pattern"), speakText: tq("pattern"),
      visualHTML: `<div class="counthelp patternrow">${seq.join(" ")} <span class="qmark">?</span></div>`,
      answer: ans,
      options: shuffle([ans, ...wrong]).map(e => ({ key: e, html: `<span class="optemoji">${e}</span>` })),
      mode: "mc", hintable: false
    };
  }
  const g = pick(DATA.oddGroups);
  const items = shuffle([...shuffle(g.same).slice(0, 3), g.odd]);
  return {
    prompt: tq("oddOne"), speakText: tq("oddOne"),
    visualHTML: "",
    answer: g.odd,
    options: items.map(e => ({ key: e, html: `<span class="optemoji">${e}</span>` })),
    mode: "mc", hintable: true
  };
}

/* ----- Naming categories (objects/plants/fruits/animals) ----- */
function qNaming(pool, promptKey, tier) {
  const item = pick(pool);
  const name = nameOf(item);
  if (tier === 3 && Math.random() < 0.5) {
    /* reverse: word → pick the picture */
    const others = shuffle(pool.filter(x => x !== item)).slice(0, 3);
    return {
      prompt: tq("whichPic"), speakText: name, speakLang: contentLang(),
      visualHTML: `<div class="wordshow">${name}</div>`,
      answer: item.emoji,
      options: shuffle([item, ...others]).map(x => ({ key: x.emoji, html: `<span class="optemoji">${x.emoji}</span>` })),
      mode: "mc", hintable: true
    };
  }
  const typable = /^[A-Z]+$/.test(name) && name.length <= 7;
  const useTiles = tier === 3 && typable && Math.random() < 0.5;
  const optCount = tier === 1 ? 2 : 4;
  return {
    prompt: tq(promptKey), speakText: tq(promptKey),
    visualHTML: `<div class="big">${item.emoji}</div>`,
    answer: name,
    options: useTiles ? null : shuffle([name, ...decoys(pool, name, optCount - 1)]),
    mode: useTiles ? "tiles" : "mc", hintable: true, speakAnswer: name
  };
}

/* ----- Dinosaurs ----- */
function qDino(tier) {
  const d = pick(DATA.dino);
  const name = nameOf(d);
  if (tier === 3 && Math.random() < 0.5) {
    const others = shuffle(DATA.dino.filter(x => x !== d)).slice(0, 3);
    return {
      prompt: tq("whichPic"), speakText: name, speakLang: contentLang(),
      visualHTML: `<div class="wordshow">${name}</div>`,
      answer: d.art,
      options: shuffle([d, ...others]).map(x => ({ key: x.art, html: `<span class="optdino">${dinoSVG(x.art)}</span>` })),
      mode: "mc", hintable: true
    };
  }
  return {
    prompt: tq("dino"), speakText: tq("dino"),
    visualHTML: `<div class="big">${dinoSVG(d.art)}</div>`,
    answer: name,
    options: shuffle([name, ...decoys(DATA.dino, name, tier === 1 ? 1 : 3)]),
    mode: "mc", hintable: tier > 1, speakAnswer: name
  };
}

/* ----- Reading ----- */
function qBaca(tier) {
  if (tier === 1) {
    const letter = pick(LETTERS);
    return {
      prompt: tq("letter"), speakText: letter, speakLang: contentLang(),
      visualHTML: `<div class="big letter">${letter}</div>`,
      answer: letter,
      options: shuffle([letter, ...decoys(LETTERS, letter, 3)]),
      mode: "mc", hintable: true
    };
  }
  if (tier === 2) {
    const letter = pick(LETTERS);
    return {
      prompt: tq("letterLower"), speakText: letter, speakLang: contentLang(),
      visualHTML: `<div class="big letter">${letter}</div>`,
      answer: letter.toLowerCase(),
      options: shuffle([letter.toLowerCase(), ...decoys(LETTERS.map(l => l.toLowerCase()), letter.toLowerCase(), 3)]),
      mode: "mc", hintable: true
    };
  }
  const pool = DATA.kata.filter(w => tier === 3 ? nameOf(w).length <= 4 : nameOf(w).length >= 5);
  const w = pick(pool.length ? pool : DATA.kata);
  const name = nameOf(w);
  return {
    prompt: tq("word"), speakText: name, speakLang: contentLang(),
    visualHTML: `<div class="big">${w.emoji}</div>`,
    answer: name, mode: "tiles", hintable: true, speakAnswer: name
  };
}

/* ----- Suku kata (syllables) ----- */
function qSuku(tier) {
  if (tier === 1) {
    const syl = pick(SYL_CONSONANTS) + pick(SYL_VOWELS).toLowerCase();
    const ans = syl.toUpperCase();
    const wrong = [];
    while (wrong.length < 2) {
      const w = pick(SYL_CONSONANTS) + pick(SYL_VOWELS);
      if (w !== ans && !wrong.includes(w)) wrong.push(w);
    }
    return {
      prompt: tq("syllable"), speakText: ans, speakLang: "id-ID",
      visualHTML: `<div class="big listen-big">🔊</div>`,
      answer: ans, options: shuffle([ans, ...wrong]),
      mode: "mc", hintable: true
    };
  }
  if (tier === 2) {
    const w = pick(DATA.sukuWords);
    const wrongSyl = [];
    while (wrongSyl.length < 2) {
      const s = pick(SYL_CONSONANTS) + pick(SYL_VOWELS);
      if (!w.suku.includes(s) && !wrongSyl.includes(s)) wrongSyl.push(s);
    }
    return {
      prompt: tq("buildWord"), speakText: w.id, speakLang: "id-ID",
      visualHTML: `<div class="big">${w.emoji}</div><div class="wordhint">${w.suku.join(" · ")}</div>`,
      answer: w.suku.join(""), units: shuffle([...w.suku, ...wrongSyl]),
      unitsAnswer: w.suku,
      mode: "tiles", hintable: true, speakAnswer: w.id
    };
  }
  if (tier === 3) {
    const w = pick([...DATA.sukuWords, ...DATA.sukuWords3]);
    const others = shuffle([...DATA.sukuWords, ...DATA.sukuWords3].filter(x => x !== w)).slice(0, 3);
    return {
      prompt: tq("readWord"), speakText: tq("readWord"),
      visualHTML: `<div class="wordshow">${w.suku.join("·")}</div>`,
      answer: w.emoji,
      options: shuffle([w, ...others]).map(x => ({ key: x.emoji, html: `<span class="optemoji">${x.emoji}</span>` })),
      mode: "mc", hintable: true, speakAnswer: w.id
    };
  }
  const s = pick(DATA.sentences);
  const others = shuffle(DATA.sentences.filter(x => x !== s)).slice(0, 2);
  const text = settings.lang === "en" ? s.en : s.id;
  return {
    prompt: tq("sentence"), speakText: text, speakLang: contentLang(),
    visualHTML: `<div class="wordshow sentence">${text}</div>`,
    answer: s.emoji,
    options: shuffle([s, ...others]).map(x => ({ key: x.emoji, html: `<span class="optemoji">${x.emoji}</span>` })),
    mode: "mc", hintable: false
  };
}

/* ----- English Time ----- */
const EN_POOLS = () => [DATA.colors, DATA.body, DATA.family, DATA.greetings, DATA.classroom, DATA.hewan, DATA.buah];
function qEnglish(tier) {
  const pool = pick(EN_POOLS());
  const item = pick(pool);
  const en = item.en;
  if (tier <= 2) {
    const others = shuffle(pool.filter(x => x !== item)).slice(0, tier === 1 ? 1 : 3);
    return {
      prompt: tq("enHear"), speakText: en, speakLang: "en-US",
      visualHTML: `<div class="big listen-big">🔊</div><div class="wordhint">${en}</div>`,
      answer: item.emoji,
      options: shuffle([item, ...others]).map(x => ({ key: x.emoji, html: `<span class="optemoji">${x.emoji}</span>` })),
      mode: "mc", hintable: tier > 1, speakAnswer: en
    };
  }
  if (tier === 3) {
    return {
      prompt: tq("enWord"), speakText: tq("enWord"),
      visualHTML: `<div class="big">${item.emoji}</div>${settings.lang === "id" ? `<div class="wordhint">${item.id}</div>` : ""}`,
      answer: en,
      options: shuffle([en, ...decoys(pool, en, 3, "en")]),
      mode: "mc", hintable: true, speakAnswer: en
    };
  }
  const spellPool = pool.filter(x => /^[A-Z]+$/.test(x.en) && x.en.length <= 6);
  const it = spellPool.length ? pick(spellPool) : pick(DATA.colors);
  return {
    prompt: tq("enSpell"), speakText: it.en, speakLang: "en-US",
    visualHTML: `<div class="big">${it.emoji}</div>`,
    answer: it.en, mode: "tiles", hintable: true, speakAnswer: it.en
  };
}

/* ----- Flags ----- */
function qFlag(tier) {
  const f = pick(DATA.bendera);
  const name = nameOf(f);
  if (tier === 3 && Math.random() < 0.5) {
    const others = shuffle(DATA.bendera.filter(x => x !== f)).slice(0, 3);
    return {
      prompt: tq("whichPic"), speakText: name, speakLang: contentLang(),
      visualHTML: `<div class="wordshow">${name}</div>`,
      answer: f.emoji,
      options: shuffle([f, ...others]).map(x => ({ key: x.emoji, html: `<span class="optemoji">${x.emoji}</span>` })),
      mode: "mc", hintable: true
    };
  }
  return {
    prompt: tq("flag"), speakText: tq("flag"),
    visualHTML: `<div class="big flag">${f.emoji}</div>`,
    answer: name,
    options: shuffle([name, ...decoys(DATA.bendera, name, tier === 1 ? 1 : 3)]),
    mode: "mc", hintable: tier > 1, speakAnswer: name
  };
}

/* ----- Feelings & habits (SEL) ----- */
function qRasa(tier) {
  if (tier === 1 || Math.random() < 0.4) {
    const f = pick(DATA.feelings);
    const name = nameOf(f);
    return {
      prompt: tq("feeling"), speakText: tq("feeling"),
      visualHTML: `<div class="big head">${ralineHead(f.face)}</div>`,
      answer: name,
      options: shuffle([name, ...decoys(DATA.feelings, name, 2)]),
      mode: "mc", hintable: false, speakAnswer: name
    };
  }
  const h = pick(DATA.habits);
  const en = settings.lang === "en";
  const ok = en ? h.oken : h.okid;
  const bads = en ? h.baden : h.badid;
  return {
    prompt: en ? h.qen : h.qid, speakText: en ? h.qen : h.qid,
    visualHTML: `<div class="big">${h.emoji}</div>`,
    answer: ok,
    options: shuffle([ok, ...bads]),
    mode: "mc", hintable: false, speakAnswer: ok
  };
}

/* ============================================================
   ROUND FLOW
   ============================================================ */

const round = { moduleKey: null, qIndex: 0, correct: 0, xpGained: 0, streak: 0, results: [], total: QUESTIONS_PER_ROUND, daily: false, reviewQueue: [] };
let currentQ = null;
let locked = false;
const overlayQueue = [];

function startRound(moduleKey, opts = {}) {
  if (moduleKey === "daily" && !opts.daily) {
    opts = { daily: true, total: 10, reviewQueue: shuffle(dueReviews()) };
  }
  round.moduleKey = moduleKey;
  round.qIndex = 0; round.correct = 0; round.xpGained = 0;
  round.streak = 0; round.results = [];
  round.daily = !!opts.daily;
  round.reviewQueue = opts.reviewQueue || [];
  round.total = opts.total
    || (moduleKey === "tulis" ? TRACE_PER_ROUND : QUESTIONS_PER_ROUND);
  show("screen-play");
  if (moduleKey === "memori") return renderMemoryRound();
  nextQuestion();
}

function nextQuestion() {
  if (round.qIndex >= round.total) return endRound();
  if (round.moduleKey === "tulis") return renderTraceQuestion();
  if (round.daily && round.reviewQueue.length) {
    const r = round.reviewQueue.shift();
    currentQ = buildQuestion(r.module);
    currentQ.reviewKey = r.key;
    currentQ.module = r.module;
  } else {
    const mod = round.daily
      ? pick(["math", "banding", "bentuk", "benda", "buah", "hewan", "dino", "baca", "suku", "english", "bendera", "rasa"])
      : round.moduleKey;
    currentQ = buildQuestion(mod);
    currentQ.module = mod;
  }
  currentQ.attempts = 0;
  locked = false;
  $("feedback").textContent = "";
  $("feedback").className = "feedback";
  setChars("thinking", "idle");
  renderDots();
  renderQuestion();
}

function renderDots() {
  const dots = $("dots");
  dots.innerHTML = "";
  for (let i = 0; i < round.total; i++) {
    const s = document.createElement("span");
    if (i < round.results.length) s.className = round.results[i] ? "done-good" : "done-bad";
    else if (i === round.qIndex) s.className = "current";
    dots.appendChild(s);
  }
}

function renderQuestion() {
  const q = currentQ;
  $("qcard").innerHTML = `
    <div class="prompt">${q.prompt}</div>
    ${q.visualHTML}
    <button class="speak-btn" id="btn-speak">🔊</button>
  `;
  const say = () => speak(q.speakText || q.prompt, q.speakLang);
  $("btn-speak").onclick = say;
  setTimeout(say, 350); /* audio-first: read every question aloud */

  const box = $("answers");
  box.innerHTML = "";
  if (q.mode === "mc") renderOptions(q, box);
  else if (q.mode === "order") renderOrder(q, box);
  else renderTyping(q, box);
}

/* --- multiple choice (text or picture options, with hint retry) --- */
function renderOptions(q, box) {
  const wrap = document.createElement("div");
  wrap.className = "options" + (q.options.some(o => typeof o === "object") ? " picopts" : "");
  const btns = [];
  q.options.forEach(opt => {
    const key = typeof opt === "object" ? opt.key : opt;
    const b = document.createElement("button");
    b.className = "opt-btn";
    if (typeof opt === "object") b.innerHTML = opt.html;
    else b.textContent = opt;
    b.dataset.key = key;
    b.onclick = () => {
      if (locked || b.disabled) return;
      const ok = key === q.answer;
      if (!ok && q.attempts === 0 && q.hintable && btns.filter(x => !x.disabled).length > 2) {
        /* scaffolded hint: knock out the chosen + one more wrong option, retry */
        q.attempts = 1;
        b.disabled = true; b.classList.add("wrong");
        const other = btns.find(x => !x.disabled && x.dataset.key !== q.answer);
        if (other) { other.disabled = true; other.classList.add("dim"); }
        $("feedback").textContent = t("hintMsg");
        $("feedback").className = "feedback hint";
        soundHint();
        setChars("thinking", "happy");
        return;
      }
      locked = true;
      btns.forEach(x => {
        x.disabled = true;
        if (x.dataset.key === q.answer) x.classList.add("correct");
        else if (x === b && !ok) x.classList.add("wrong");
      });
      settle(ok, XP_MC);
    };
    btns.push(b);
    wrap.appendChild(b);
  });
  box.appendChild(wrap);
}

/* --- order mode: tap numbers smallest → biggest --- */
function renderOrder(q, box) {
  const target = q.answer.split(",");
  let seq = [];
  const wrap = document.createElement("div");
  wrap.className = "options";
  const btns = q.options.map(n => {
    const b = document.createElement("button");
    b.className = "opt-btn ordnum";
    b.textContent = n;
    b.onclick = () => {
      if (locked || b.disabled) return;
      seq.push(n);
      b.disabled = true;
      b.innerHTML = `${n} <span class="ordbadge">${seq.length}</span>`;
      if (seq.length === target.length) {
        const ok = seq.join(",") === q.answer;
        if (!ok && q.attempts === 0) {
          q.attempts = 1;
          seq = [];
          btns.forEach(x => { x.disabled = false; x.textContent = x.textContent.trim().split(" ")[0]; });
          $("feedback").textContent = t("hintMsg");
          $("feedback").className = "feedback hint";
          soundHint();
          return;
        }
        locked = true;
        btns.forEach(x => x.disabled = true);
        settle(ok, XP_ORDER);
      }
    };
    wrap.appendChild(b);
    return b;
  });
  box.appendChild(wrap);
}

/* --- toddler typing: letter/syllable tiles or number pad --- */
function renderTyping(q, box) {
  const answer = q.answer;
  const isNum = q.mode === "numpad";
  const unitsAnswer = q.unitsAnswer || answer.replace(/ /g, "").split("");
  let typed = [];

  const slotsDiv = document.createElement("div");
  slotsDiv.className = "slots";
  const slotEls = unitsAnswer.map(() => {
    const s = document.createElement("div");
    s.className = "slot" + (q.unitsAnswer ? " syl" : "");
    slotsDiv.appendChild(s);
    return s;
  });

  const tilesDiv = document.createElement("div");
  tilesDiv.className = "tiles";
  let keys;
  if (isNum) keys = "0123456789".split("");
  else if (q.units) keys = q.units;
  else {
    const letters = unitsAnswer.slice();
    const extras = decoys(LETTERS, null, Math.max(2, 8 - letters.length));
    keys = shuffle(letters.concat(extras));
  }

  const maxLen = unitsAnswer.length;

  function redraw() {
    slotEls.forEach((s, i) => {
      s.textContent = typed[i]?.v || "";
      s.classList.toggle("filled", !!typed[i]);
      s.style.borderColor = "";
    });
    goBtn.disabled = typed.length !== maxLen;
    if (!isNum) tileEls.forEach(tl => tl.disabled = tl.dataset.used === "1");
  }

  const tileEls = keys.map(k => {
    const tl = document.createElement("button");
    tl.className = "tile-btn" + (isNum ? " num" : "") + (q.units ? " syl" : "");
    tl.textContent = k;
    tl.onclick = () => {
      if (locked || typed.length >= maxLen) return;
      typed.push({ v: k, el: tl });
      if (!isNum) tl.dataset.used = "1";
      redraw();
    };
    tilesDiv.appendChild(tl);
    return tl;
  });

  const actions = document.createElement("div");
  actions.className = "type-actions";
  const delBtn = document.createElement("button");
  delBtn.className = "action-btn del";
  delBtn.textContent = t("btnDelete");
  delBtn.onclick = () => {
    if (locked || !typed.length) return;
    const last = typed.pop();
    if (!isNum && last.el && !typed.some(x => x.el === last.el)) delete last.el.dataset.used;
    redraw();
  };
  const goBtn = document.createElement("button");
  goBtn.className = "action-btn go";
  goBtn.textContent = t("btnAnswer");
  goBtn.onclick = () => {
    if (locked || typed.length !== maxLen) return;
    const ok = typed.map(x => x.v).join("") === unitsAnswer.join("");
    if (!ok && q.attempts === 0 && q.hintable) {
      /* hint: clear, prefill the first unit, retry */
      q.attempts = 1;
      typed.forEach(x => { if (x.el) delete x.el.dataset.used; });
      typed = [];
      const first = tileEls.find(tl => tl.textContent === unitsAnswer[0] && tl.dataset.used !== "1");
      if (first) { typed.push({ v: unitsAnswer[0], el: first }); if (!isNum) first.dataset.used = "1"; }
      redraw();
      $("feedback").textContent = t("hintMsg");
      $("feedback").className = "feedback hint";
      soundHint();
      if (q.speakAnswer) speak(q.speakAnswer, q.speakLang || contentLang());
      return;
    }
    locked = true;
    if (!ok) slotEls.forEach((s, i) => {
      s.style.borderColor = unitsAnswer[i] === typed[i]?.v ? "#43a047" : "#e57373";
    });
    settle(ok, XP_TYPE);
  };
  actions.appendChild(delBtn);
  actions.appendChild(goBtn);

  box.appendChild(slotsDiv);
  box.appendChild(tilesDiv);
  box.appendChild(actions);
  redraw();
}

/* ---------- answer settlement, XP, mastery, eggs ---------- */

function settle(ok, xpBase) {
  const q = currentQ;
  const fb = $("feedback");
  const modKey = q.module || round.moduleKey;

  session.answered++;
  const mod = session.modules[modKey] ??= { answered: 0, correct: 0 };
  mod.answered++;

  let gained;
  if (ok) {
    round.correct++;
    round.streak++;
    session.correct++;
    mod.correct++;
    gained = q.attempts > 0 ? Math.ceil(xpBase / 2) : xpBase;
    if (round.streak % 3 === 0) gained += STREAK_BONUS;
    fb.textContent = pick(t("praise")) + (round.streak % 3 === 0 ? ` +${STREAK_BONUS} ${t("streakBonus")}` : "");
    fb.className = "feedback good";
    setChars("excited", "cheer", true);
    soundGood();
    if (q.speakAnswer) setTimeout(() => speak(q.speakAnswer, q.speakLang || contentLang()), 500);
    if (round.streak % 3 === 0) confetti(18);
  } else {
    round.streak = 0;
    gained = XP_TRY;
    fb.textContent = pick(t("cheerUp")) + " " + t("theAnswer") + " " + q.answer;
    fb.className = "feedback bad";
    setChars("oops", "oops");
    soundBad();
  }

  /* spaced repetition bookkeeping */
  updateReview(q, ok, modKey);

  /* mastery */
  const move = recordMastery(modKey, ok);
  if (move === "up") {
    overlayQueue.push({ type: "tierup", module: modKey });
  }

  round.results.push(ok);
  renderDots();
  grantXp(gained);

  const delay = ok ? 1500 : 2700;
  setTimeout(() => { round.qIndex++; runOverlays(nextQuestion); }, delay);
}

function grantXp(gained) {
  const before = levelFromXp(profile.xp);
  profile.xp += gained;
  round.xpGained += gained;
  session.xp += gained;
  profile.egg += gained;
  if (profile.egg >= EGG_COST) {
    profile.egg -= EGG_COST;
    overlayQueue.push({ type: "hatch", ...hatchDino() });
  }
  const after = levelFromXp(profile.xp);
  if (after > before) overlayQueue.push({ type: "levelup", level: after });
  renderHud();
  saveAll();
  maybeRest();
}

/* ---------- Leitner review boxes ---------- */

const BOX_DAYS = [0, 1, 2, 4, 8];
function itemKeyOf(q, modKey) {
  return q.reviewKey || (["math", "banding", "tulis", "memori"].includes(modKey) ? null : modKey + "|" + q.answer);
}
function updateReview(q, ok, modKey) {
  const key = itemKeyOf(q, modKey);
  if (!key) return;
  const r = profile.review[key];
  if (!ok) {
    profile.review[key] = { box: 1, due: todayStr(new Date(Date.now() + 86400000)), module: modKey };
  } else if (r) {
    r.box++;
    if (r.box >= BOX_DAYS.length) delete profile.review[key];
    else r.due = todayStr(new Date(Date.now() + BOX_DAYS[r.box] * 86400000));
  }
}
function dueReviews() {
  const today = todayStr();
  return Object.entries(profile.review)
    .filter(([, r]) => r.due <= today)
    .map(([key, r]) => ({ key, module: r.module }))
    .slice(0, 6);
}

/* ---------- daily quest ---------- */

function startDaily() {
  const daily = store.get("raline_daily", {});
  if (daily.date === todayStr() && daily.done) {
    $("home-bubble").textContent = t("dailyDone");
    speak(t("dailyDone"));
    return;
  }
  startRound("daily", { daily: true, total: 10, reviewQueue: shuffle(dueReviews()) });
}

/* ---------- tracing round (Menulis) ---------- */

function renderTraceQuestion() {
  const tier = skillTier("tulis");
  const glyph = pick(TRACE_SETS[Math.min(tier, 3)]);
  locked = false;
  $("feedback").textContent = "";
  $("feedback").className = "feedback";
  setChars("thinking", "idle");
  renderDots();
  $("qcard").innerHTML = `
    <div class="prompt">${t("traceIt")}</div>
    <div class="big letter traceletter">${glyph}</div>
    <button class="speak-btn" id="btn-speak">🔊</button>
  `;
  const say = () => speak(glyph, contentLang());
  $("btn-speak").onclick = say;
  setTimeout(say, 350);

  const box = $("answers");
  box.innerHTML = `
    <div class="trace-wrap"><canvas id="trace-canvas" width="330" height="420"></canvas></div>
    <div class="type-actions">
      <button class="action-btn del" id="btn-trace-clear">${t("traceClear")}</button>
      <button class="action-btn go" id="btn-trace-check">${t("traceCheck")}</button>
    </div>
  `;
  const tracer = createTracer($("trace-canvas"), glyph);
  $("btn-trace-clear").onclick = () => tracer.clear();
  $("btn-trace-check").onclick = () => {
    if (locked || !tracer.hasInk()) return;
    locked = true;
    const stars = tracer.score();
    const ok = stars >= 2;
    session.answered++;
    const mod = session.modules.tulis ??= { answered: 0, correct: 0 };
    mod.answered++;
    const fb = $("feedback");
    if (stars >= 1) {
      if (ok) { session.correct++; mod.correct++; round.correct++; }
      fb.textContent = (stars === 3 ? t("traceGreat") : t("traceGood")) + " " + "⭐".repeat(stars);
      fb.className = "feedback good";
      setChars(stars === 3 ? "cheer" : "excited", "cheer", true);
      soundGood();
    } else {
      fb.textContent = t("traceTry");
      fb.className = "feedback bad";
      setChars("oops", "happy");
      soundBad();
    }
    recordMastery("tulis", ok);
    round.results.push(ok);
    renderDots();
    grantXp(Math.max(2, stars * 6));
    setTimeout(() => { round.qIndex++; runOverlays(nextQuestion); }, 1700);
  };
}

/* ---------- memory match round ---------- */

function renderMemoryRound() {
  const tier = skillTier("memori");
  const pairsN = tier === 1 ? 3 : tier === 2 ? 4 : 6;
  const pool = shuffle([...DATA.hewan, ...DATA.buah, ...DATA.benda]).slice(0, pairsN);
  /* tier 3 pairs picture ↔ word; below that picture ↔ picture */
  const cards = shuffle(pool.flatMap((item, i) => [
    { pair: i, html: `<span class="memface">${item.emoji}</span>` },
    { pair: i, html: tier === 3 ? `<span class="memword">${nameOf(item)}</span>` : `<span class="memface">${item.emoji}</span>` }
  ]));
  round.total = pairsN;
  locked = false;
  $("feedback").textContent = "";
  $("feedback").className = "feedback";
  setChars("thinking", "happy");
  renderDots();
  $("qcard").innerHTML = `<div class="prompt">${t("memoryFind")}</div>`;
  speak(t("memoryFind"));

  const box = $("answers");
  box.innerHTML = `<div class="memgrid n${cards.length}"></div>`;
  const grid = box.firstElementChild;
  let open = [], found = 0, flips = 0;

  cards.forEach(card => {
    const b = document.createElement("button");
    b.className = "mem-card";
    b.innerHTML = `<span class="memback">🦕</span><span class="memfront">${card.html}</span>`;
    b.onclick = () => {
      if (locked || b.classList.contains("open") || b.classList.contains("matched")) return;
      b.classList.add("open");
      open.push({ b, card });
      if (open.length === 2) {
        locked = true; flips++;
        const [x, y] = open;
        if (x.card.pair === y.card.pair) {
          setTimeout(() => {
            x.b.classList.add("matched"); y.b.classList.add("matched");
            found++;
            round.correct++; round.results.push(true);
            session.answered++; session.correct++;
            const mod = session.modules.memori ??= { answered: 0, correct: 0 };
            mod.answered++; mod.correct++;
            $("feedback").textContent = t("memoryPair");
            $("feedback").className = "feedback good";
            setChars("excited", "cheer", true);
            soundGood();
            renderDots();
            grantXp(XP_PAIR);
            open = []; locked = false;
            if (found === pairsN) {
              recordMastery("memori", flips <= pairsN * 2.5);
              grantXp(10);
              setTimeout(() => runOverlays(endRound), 900);
            }
          }, 350);
        } else {
          setTimeout(() => {
            x.b.classList.remove("open"); y.b.classList.remove("open");
            open = []; locked = false;
          }, 900);
        }
      }
    };
    grid.appendChild(b);
  });
}

/* ---------- overlays (level up / tier up / egg hatch) ---------- */

function runOverlays(then) {
  const next = overlayQueue.shift();
  if (!next) return then();
  if (next.type === "levelup") {
    $("lvl-head").textContent = t("levelUp");
    $("lvl-raline").innerHTML = ralineSVG("cheer");
    $("lvl-pinky").innerHTML = pinkySVG("cheer");
    $("lvl-title").textContent = `${t("level")} ${next.level} — ${levelTitle(next.level)}`;
    $("levelup").classList.add("show");
    confetti(60); soundLevel();
    $("btn-lvl-ok").textContent = t("btnNext");
    $("btn-lvl-ok").onclick = () => { $("levelup").classList.remove("show"); runOverlays(then); };
  } else if (next.type === "tierup") {
    const fb = $("feedback");
    fb.textContent = t("tierUp");
    fb.className = "feedback good";
    soundLevel(); confetti(24);
    setTimeout(() => runOverlays(then), 1200);
  } else if (next.type === "hatch") {
    $("hatch-title").textContent = t("eggHatch");
    $("hatch-dino").innerHTML = `<div class="babydino" style="filter:hue-rotate(${next.hue}deg)">${dinoSVG(next.art)}</div>${next.rare ? '<div class="sparkle">✨</div>' : ""}`;
    $("hatch-msg").textContent = (next.isNew ? t("eggNew") : t("eggAgain")) + " " + next.name + (next.rare ? " ✨" : "");
    $("hatch").classList.add("show");
    confetti(50); soundLevel();
    $("btn-hatch-ok").textContent = t("btnNext");
    $("btn-hatch-ok").onclick = () => { $("hatch").classList.remove("show"); runOverlays(then); };
  } else {
    runOverlays(then);
  }
}

function hatchDino() {
  const d = pick(DATA.dino);
  const variant = Math.random() < 0.18 ? pick(DINO_VARIANTS.filter(v => v.rare)) : pick(DINO_VARIANTS.filter(v => !v.rare));
  const key = d.art + ":" + variant.hue;
  const isNew = !profile.collection[key];
  profile.collection[key] = (profile.collection[key] || 0) + 1;
  return { art: d.art, hue: variant.hue, rare: variant.rare, isNew, name: nameOf(d) };
}

/* ---------- round end ---------- */

function endRound() {
  if (round.daily) {
    store.set("raline_daily", { date: todayStr(), done: true });
    grantXp(30);
  }
  const c = round.correct, n = round.total;
  const stars = c >= n - 1 ? 3 : c >= Math.ceil(n * 0.6) ? 2 : c >= Math.ceil(n * 0.3) ? 1 : 0;
  const mood = stars >= 2 ? "cheer" : "happy";
  $("summary-card").innerHTML = `
    <div class="summary-chars">
      <div class="char">${ralineSVG(mood)}</div>
      <div class="char">${pinkySVG(mood)}</div>
    </div>
    <h2>${t("roundDone")}</h2>
    <div class="stars">${"⭐".repeat(stars)}${"☆".repeat(3 - stars)}</div>
    <div class="sline">${t("correctOf")(c, n)}</div>
    <div class="xp-gain">+${round.xpGained} XP 🏆</div>
    <div class="type-actions">
      <button class="action-btn del" id="btn-sum-home">${t("btnHome")}</button>
      <button class="action-btn go" id="btn-sum-again">${t("btnAgain")}</button>
    </div>
  `;
  show("screen-summary");
  if (stars === 3) { confetti(50); soundLevel(); }
  $("btn-sum-home").onclick = renderHome;
  $("btn-sum-again").onclick = () => round.daily ? renderHome() : startRound(round.moduleKey);
  saveAll();
}

/* ---------- rest reminder ---------- */

let nextRestAt = Date.now() + REST_AFTER_MS;
function maybeRest() {
  if (Date.now() < nextRestAt) return;
  nextRestAt = Date.now() + REST_SNOOZE_MS;
  session.restNudges = (session.restNudges || 0) + 1;
  $("rest-title").textContent = t("restTitle");
  $("rest-body").textContent = t("restBody");
  $("rest-head").innerHTML = ralineHead("sleepy");
  $("btn-rest-now").textContent = t("restNow");
  $("btn-rest-later").textContent = t("restLater");
  $("rest").classList.add("show");
  $("btn-rest-now").onclick = () => { $("rest").classList.remove("show"); renderHome(); };
  $("btn-rest-later").onclick = () => { $("rest").classList.remove("show"); };
}

/* ---------- parental gate ---------- */

let gatePassed = false;
function openReport() {
  if (gatePassed) return renderReport();
  const a = 3 + rand(7), b = 3 + rand(7);
  $("gate-title").textContent = t("gateTitle");
  $("gate-q").textContent = t("gateAsk")(a, b);
  $("gate").classList.add("show");
  let typed = "";
  const slots = $("gate-slots");
  const draw = () => slots.textContent = typed || "· ·";
  draw();
  const pad = $("gate-pad");
  pad.innerHTML = "";
  "1234567890".split("").forEach(d => {
    const btn = document.createElement("button");
    btn.className = "tile-btn num";
    btn.textContent = d;
    btn.onclick = () => {
      typed = (typed + d).slice(0, 3);
      draw();
      if (typed.length >= String(a * b).length) {
        if (parseInt(typed, 10) === a * b) {
          gatePassed = true;
          $("gate").classList.remove("show");
          renderReport();
        } else {
          typed = "";
          $("gate-q").textContent = t("gateWrong") + " " + t("gateAsk")(a, b);
          draw();
        }
      }
    };
    pad.appendChild(btn);
  });
  $("btn-gate-close").onclick = () => $("gate").classList.remove("show");
}

/* ---------- parent report v2 ---------- */

function dayStreak() {
  const days = new Set(sessions.filter(s => s.answered > 0).map(s => todayStr(new Date(s.start))));
  let streak = 0;
  const d = new Date();
  if (!days.has(todayStr(d))) d.setDate(d.getDate() - 1);
  while (days.has(todayStr(d))) { streak++; d.setDate(d.getDate() - 1); }
  return streak;
}

function renderReport() {
  const all = sessions;
  const totQ = all.reduce((s, x) => s + x.answered, 0);
  const totC = all.reduce((s, x) => s + x.correct, 0);
  const played = all.filter(s => s.answered > 0);

  const modStats = {};
  all.forEach(s => Object.entries(s.modules || {}).forEach(([k, v]) => {
    const m = modStats[k] ??= { answered: 0, correct: 0 };
    m.answered += v.answered; m.correct += v.correct;
  }));

  const masteryRows = MODULES.map(m => {
    const s = modStats[m.key];
    const tier = skillTier(m.key), max = SKILL_TIERS[m.key];
    const acc = s ? Math.round(100 * s.correct / s.answered) : null;
    return `<div class="sess"><span class="d">${m.icon} ${t("modules." + m.key)[0]}</span> —
      ${t("repTier")} ${"⭐".repeat(tier)}${"☆".repeat(max - tier)}
      ${s ? `· ${s.correct}/${s.answered} (${acc}%)` : ""}</div>`;
  }).join("");

  /* play minutes per day, last 14 days */
  const byDay = {};
  played.forEach(s => {
    const k = todayStr(new Date(s.start));
    byDay[k] = (byDay[k] || 0) + Math.max(1, Math.round((s.end - s.start) / 60000));
  });
  let dayRows = "";
  for (let i = 13; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const k = todayStr(d);
    const mins = byDay[k] || 0;
    const label = d.toLocaleDateString(settings.lang === "en" ? "en-US" : "id-ID", { day: "numeric", month: "short" });
    dayRows += `<div class="daybar"><span class="dl">${label}</span><div class="db"><div style="width:${Math.min(100, mins * 3)}%"></div></div><span class="dm">${mins ? mins + " " + t("repMinutes") : "·"}</span></div>`;
  }

  /* weakest modules → offline tips */
  const weakest = Object.entries(modStats)
    .filter(([, v]) => v.answered >= 5)
    .sort((a, b) => (a[1].correct / a[1].answered) - (b[1].correct / b[1].answered))
    .slice(0, 2).map(([k]) => k);
  const tipsRows = (weakest.length ? weakest : ["baca", "math"])
    .map(k => `<div class="sess">💡 ${STRINGS[settings.lang].tips[k] ?? STRINGS.id.tips[k] ?? ""}</div>`).join("");

  const sessRows = played.slice(-10).reverse().map(s => {
    const d = new Date(s.start);
    const mins = Math.max(1, Math.round((s.end - s.start) / 60000));
    const loc = settings.lang === "en" ? "en-US" : "id-ID";
    return `<div class="sess">
      <span class="d">${d.toLocaleDateString(loc, { weekday: "short", day: "numeric", month: "short" })} ${d.toLocaleTimeString(loc, { hour: "2-digit", minute: "2-digit" })}</span>
      <div class="m">±${mins} ${t("repMinutes")} · ${s.answered} ✏️ · ${s.correct} ✅ · +${s.xp} XP</div>
    </div>`;
  }).join("") || `<div class="sess">${t("repNoData")}</div>`;

  $("report-body").innerHTML = `
    <h2>${t("reportTitle")}</h2>
    <div class="totals">
      <div class="tot"><b>${levelFromXp(profile.xp)}</b><span>${t("repLevel")}</span></div>
      <div class="tot"><b>${profile.xp}</b><span>${t("repXp")}</span></div>
      <div class="tot"><b>${dayStreak()} 🔥</b><span>${t("repDayStreak")}</span></div>
      <div class="tot"><b>${played.length}</b><span>${t("repSessions")}</span></div>
      <div class="tot"><b>${totQ}</b><span>${t("repQuestions")}</span></div>
      <div class="tot"><b>${totQ ? Math.round(100 * totC / totQ) : 0}%</b><span>${t("repAccuracy")}</span></div>
    </div>
    <h2>${t("repMastery")}</h2>
    ${masteryRows}
    <h2 style="margin-top:14px">${t("repDays")}</h2>
    ${dayRows}
    <h2 style="margin-top:14px">${t("repTips")}</h2>
    ${tipsRows}
    <h2 style="margin-top:14px">${t("repSessionsH")}</h2>
    ${sessRows}
    <div class="type-actions" style="margin-top:16px">
      <button class="action-btn del" id="btn-export">${t("repExport")}</button>
      <button class="action-btn del" id="btn-import">${t("repImport")}</button>
      <input type="file" id="import-file" accept=".json" style="display:none">
    </div>
  `;
  $("btn-export").onclick = exportData;
  $("btn-import").onclick = () => $("import-file").click();
  $("import-file").onchange = importData;
  show("screen-report");
}

function exportData() {
  saveAll();
  const blob = new Blob([JSON.stringify({ app: "raline-the-explorer", profile, sessions, settings }, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "raline-progress.json";
  a.click();
  URL.revokeObjectURL(a.href);
}

function importData(ev) {
  const file = ev.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (data.app !== "raline-the-explorer" || typeof data.profile?.xp !== "number") throw new Error("bad");
      profile = { xp: 0, egg: 0, collection: {}, review: {}, ...data.profile };
      ensureMastery(profile);
      sessions = Array.isArray(data.sessions) ? data.sessions : [];
      sessions.push(session);
      saveAll();
      alert(t("repImported"));
      renderReport();
      renderHud();
    } catch {
      alert(t("repImportBad"));
    }
  };
  reader.readAsText(file);
}

/* ---------- sticker book ---------- */

function renderStickers() {
  const entries = Object.entries(profile.collection);
  const pct = Math.min(100, Math.round(100 * profile.egg / EGG_COST));
  const cards = entries.map(([key, count]) => {
    const [art, hue] = key.split(":");
    const d = DATA.dino.find(x => x.art === art);
    const rare = DINO_VARIANTS.find(v => v.hue === +hue)?.rare;
    return `<div class="stick${rare ? " rare" : ""}">
      <div class="babydino" style="filter:hue-rotate(${hue}deg)">${dinoSVG(art)}</div>
      <div class="sn">${d ? nameOf(d) : art}${rare ? " ✨" : ""}</div>
      ${count > 1 ? `<div class="scount">×${count}</div>` : ""}
    </div>`;
  }).join("");
  $("stickers-body").innerHTML = `
    <h2>🥚 ${t("eggTitle")}</h2>
    <div class="eggrow">
      <span class="eggbig">🥚</span>
      <div class="xpbar eggbar"><div style="width:${pct}%"></div></div>
      <span class="eggpct">${pct}%</span>
    </div>
    <div class="eggsub">${t("eggProgress")}</div>
    ${entries.length ? `<div class="stickgrid">${cards}</div>` : `<div class="sess">${t("eggEmpty")}</div>`}
  `;
  show("screen-stickers");
}

/* ---------- wiring ---------- */

$("btn-quit").onclick = renderHome;
$("btn-report").onclick = openReport;
$("btn-report-back").onclick = renderHome;
$("btn-stickers").onclick = renderStickers;
$("btn-stickers-back").onclick = renderHome;
$("btn-daily").onclick = startDaily;
$("btn-lang").onclick = () => {
  settings.lang = settings.lang === "id" ? "en" : "id";
  saveSettings();
  renderHome();
};
$("btn-sound").onclick = () => {
  settings.sound = !settings.sound;
  saveSettings();
  renderHud();
};
$("btn-layout").onclick = () => {
  settings.home = settings.home === "grid" ? "map" : "grid";
  saveSettings();
  renderHome();
};

/* preload voices (some browsers populate the list lazily) */
try { speechSynthesis.getVoices(); speechSynthesis.onvoiceschanged = () => {}; } catch { /* no speech */ }

/* register service worker for offline play */
if ("serviceWorker" in navigator && location.protocol !== "file:") {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

renderHome();
