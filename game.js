/* ============================================================
   Raline The Explorer — game logic
   - 8 learning modules, round of 8 questions
   - XP + level system with persistent profile
   - Session tracking in localStorage (parent report)
   - Answer mode randomized: multiple choice OR "typing"
     (letter tiles / number pad — toddler-friendly typing)
   ============================================================ */

const QUESTIONS_PER_ROUND = 8;
const XP_MC = 10;        // correct, multiple choice
const XP_TYPE = 15;      // correct, typed
const XP_TRY = 2;        // wrong answer still earns a little
const STREAK_BONUS = 5;  // every 3 correct in a row

/* ---------- persistence ---------- */

const store = {
  get(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  },
  set(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
};

let profile = store.get("raline_profile", { xp: 0 });
let sessions = store.get("raline_sessions", []);

/* current play session */
const session = {
  start: Date.now(),
  end: Date.now(),
  answered: 0,
  correct: 0,
  xp: 0,
  modules: {} // key -> {answered, correct}
};
sessions.push(session);

function saveAll() {
  session.end = Date.now();
  store.set("raline_profile", profile);
  store.set("raline_sessions", sessions.slice(-200));
}
window.addEventListener("beforeunload", saveAll);
document.addEventListener("visibilitychange", () => { if (document.hidden) saveAll(); });

/* ---------- levels ---------- */

function levelFromXp(xp) {
  let lvl = 1;
  while (totalXpForLevel(lvl + 1) <= xp) lvl++;
  return lvl;
}
function totalXpForLevel(lvl) { return 60 * (lvl - 1) * lvl; } // Lv2=120, Lv3=360, Lv4=720…
function levelTitle(lvl) {
  return LEVEL_TITLES[Math.min(lvl - 1, LEVEL_TITLES.length - 1)];
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
/* pick n distinct wrong answers from pool (by name), excluding correct */
function decoys(pool, correct, n) {
  const names = [...new Set(pool.map(x => x.name ?? x).filter(x => x !== correct))];
  return shuffle(names).slice(0, n);
}

/* ---------- audio ---------- */

let audioCtx = null;
function beep(freqs, dur = 0.15) {
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
  } catch { /* audio not available */ }
}
const soundGood = () => beep([523, 659, 784], 0.13);
const soundBad = () => beep([330, 262], 0.18);
const soundLevel = () => beep([523, 659, 784, 1047, 1319], 0.12);

function speak(text) {
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.toLowerCase());
    u.lang = "id-ID";
    u.rate = 0.85;
    speechSynthesis.speak(u);
  } catch { /* speech not available */ }
}

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

/* ---------- characters on screen ---------- */

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

/* ---------- HUD ---------- */

function renderHud() {
  const lvl = levelFromXp(profile.xp);
  const base = totalXpForLevel(lvl);
  const next = totalXpForLevel(lvl + 1);
  const pct = Math.min(100, Math.round(100 * (profile.xp - base) / (next - base)));
  $("hud-level").textContent = "Lv " + lvl;
  $("hud-title").textContent = levelTitle(lvl) + " · " + profile.xp + " XP";
  $("hud-xpfill").style.width = pct + "%";
  $("hud-avatar").innerHTML = ralineSVG("happy");
}

/* ---------- screens ---------- */

function show(screenId) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  $(screenId).classList.add("active");
}

const GREETINGS = [
  "Halo! Ayo main bersama aku! 🦕",
  "Pinky sudah tidak sabar, lho!",
  "Mau belajar apa hari ini?",
  "Rawr! Kata Pinky: semangat!",
  "Ayo jadi penjelajah hebat!"
];

function renderHome() {
  $("home-raline").innerHTML = ralineSVG("happy");
  $("home-pinky").innerHTML = pinkySVG("happy");
  $("home-bubble").textContent = pick(GREETINGS);
  const grid = $("module-grid");
  grid.innerHTML = "";
  MODULES.forEach(m => {
    const b = document.createElement("button");
    b.className = "module-btn";
    b.innerHTML = `<span class="mi">${m.icon}</span><span class="mt">${m.title}</span><span class="ms">${m.sub}</span>`;
    b.onclick = () => startRound(m.key);
    grid.appendChild(b);
  });
  renderHud();
  show("screen-home");
}

/* ============================================================
   QUESTION BUILDING
   Each question: {
     prompt, visualHTML, answer (string), options[ ]?, mode,
     speakText?, countHelp?
   }
   mode: "mc" | "tiles" | "numpad"
   ============================================================ */

function buildQuestion(moduleKey) {
  switch (moduleKey) {
    case "math":    return qMath();
    case "benda":   return qNaming(DATA.benda, "Benda apa ini?");
    case "tanaman": return qNaming(DATA.tanaman, "Tanaman apa ini?");
    case "buah":    return qNaming(DATA.buah, "Buah apa ini?");
    case "hewan":   return qNaming(DATA.hewan, "Hewan apa ini?");
    case "dino":    return qDino();
    case "baca":    return Math.random() < 0.5 ? qLetter() : qWord();
    case "bendera": return qFlag();
  }
}

/* randomize answer method; typing only for short answers */
function chooseMode(answer) {
  const typable = /^[A-Z]+$/.test(answer) && answer.length <= 7;
  const isNumber = /^\d+$/.test(answer);
  if (isNumber) return Math.random() < 0.5 ? "numpad" : "mc";
  if (typable) return Math.random() < 0.45 ? "tiles" : "mc";
  return "mc";
}

function qMath() {
  const isAdd = Math.random() < 0.55;
  let a, b, ans;
  if (isAdd) {
    a = 1 + rand(10); b = 1 + rand(10); ans = a + b;
  } else {
    a = 2 + rand(9); b = 1 + rand(a - 1); ans = a - b; // never negative
  }
  const sym = isAdd ? "+" : "−";
  const mode = chooseMode(String(ans));
  const opts = mode === "mc" ? numberOptions(ans) : null;
  const help = isAdd
    ? "🟢".repeat(a) + " " + "🟡".repeat(b)
    : "🍪".repeat(a);
  return {
    prompt: isAdd ? "Berapa hasilnya?" : "Berapa sisanya?",
    visualHTML: `<div class="mathrow">${a} ${sym} ${b} = ?</div><div class="counthelp">${help}</div>`,
    answer: String(ans),
    options: opts,
    mode,
    speakText: `${a} ${isAdd ? "tambah" : "kurang"} ${b}, berapa?`
  };
}

function numberOptions(ans) {
  const set = new Set([ans]);
  while (set.size < 4) {
    const d = ans + (rand(7) - 3);
    if (d >= 0 && d !== ans) set.add(d);
    else set.add(ans + set.size + 1);
  }
  return shuffle([...set].map(String));
}

function qNaming(pool, prompt) {
  const item = pick(pool);
  const mode = chooseMode(item.name);
  return {
    prompt,
    visualHTML: `<div class="big">${item.emoji}</div>`,
    answer: item.name,
    options: mode === "mc" ? shuffle([item.name, ...decoys(pool, item.name, 3)]) : null,
    mode,
    speakText: item.name
  };
}

function qDino() {
  const d = pick(DATA.dino);
  return {
    prompt: "Dinosaurus apa ini?",
    visualHTML: `<div class="big">${dinoSVG(d.id)}</div>`,
    answer: d.name,
    options: shuffle([d.name, ...decoys(DATA.dino, d.name, 3)]),
    mode: "mc",
    speakText: d.name
  };
}

function qLetter() {
  const letter = pick(LETTERS);
  const wrong = decoys(LETTERS.map(l => ({ name: l })), letter, 3);
  return {
    prompt: "Huruf apa ini? Tekan 🔊 untuk dengar!",
    visualHTML: `<div class="big letter">${letter}</div>`,
    answer: letter,
    options: shuffle([letter, ...wrong]),
    mode: "mc",
    speakText: letter
  };
}

function qWord() {
  const w = pick(DATA.kata);
  const mode = Math.random() < 0.6 ? "tiles" : "mc";
  return {
    prompt: mode === "tiles" ? "Susun kata ini!" : "Ini gambar apa?",
    visualHTML: `<div class="big">${w.emoji}</div>`,
    answer: w.name,
    options: mode === "mc" ? shuffle([w.name, ...decoys(DATA.kata, w.name, 3)]) : null,
    mode,
    speakText: w.name
  };
}

function qFlag() {
  const f = pick(DATA.bendera);
  const mode = chooseMode(f.name);
  return {
    prompt: "Bendera negara apa ini?",
    visualHTML: `<div class="big flag">${f.emoji}</div>`,
    answer: f.name,
    options: mode === "mc" ? shuffle([f.name, ...decoys(DATA.bendera, f.name, 3)]) : null,
    mode,
    speakText: f.name
  };
}

/* ============================================================
   ROUND FLOW
   ============================================================ */

const round = { moduleKey: null, qIndex: 0, correct: 0, xpGained: 0, streak: 0, results: [] };
let currentQ = null;
let locked = false;

function startRound(moduleKey) {
  round.moduleKey = moduleKey;
  round.qIndex = 0;
  round.correct = 0;
  round.xpGained = 0;
  round.streak = 0;
  round.results = [];
  show("screen-play");
  nextQuestion();
}

function nextQuestion() {
  if (round.qIndex >= QUESTIONS_PER_ROUND) return endRound();
  currentQ = buildQuestion(round.moduleKey);
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
  for (let i = 0; i < QUESTIONS_PER_ROUND; i++) {
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
    ${q.speakText ? `<button class="speak-btn" id="btn-speak">🔊</button>` : ""}
  `;
  if (q.speakText) $("btn-speak").onclick = () => speak(q.speakText);

  const box = $("answers");
  box.innerHTML = "";
  if (q.mode === "mc") renderOptions(q, box);
  else renderTyping(q, box);
}

/* --- multiple choice --- */
function renderOptions(q, box) {
  const wrap = document.createElement("div");
  wrap.className = "options";
  q.options.forEach(opt => {
    const b = document.createElement("button");
    b.className = "opt-btn";
    b.textContent = opt;
    b.onclick = () => {
      if (locked) return;
      locked = true;
      const ok = opt === q.answer;
      wrap.querySelectorAll("button").forEach(x => {
        x.disabled = true;
        if (x.textContent === q.answer) x.classList.add("correct");
        else if (x === b && !ok) x.classList.add("wrong");
      });
      settle(ok, XP_MC);
    };
    wrap.appendChild(b);
  });
  box.appendChild(wrap);
}

/* --- toddler "typing": letter tiles or number pad + answer slots --- */
function renderTyping(q, box) {
  const answer = q.answer;
  const isNum = q.mode === "numpad";
  let typed = [];

  const slotsDiv = document.createElement("div");
  slotsDiv.className = "slots";
  const slotEls = [];
  answer.split("").forEach(ch => {
    const s = document.createElement("div");
    if (ch === " ") { s.className = "slot space"; }
    else { s.className = "slot"; slotEls.push(s); }
    slotsDiv.appendChild(s);
  });

  const tilesDiv = document.createElement("div");
  tilesDiv.className = "tiles";
  let keys;
  if (isNum) {
    keys = "0123456789".split("");
  } else {
    const letters = answer.replace(/ /g, "").split("");
    const extras = decoys(LETTERS.map(l => ({ name: l })), null, 3)
      .filter(l => true).slice(0, Math.max(2, 8 - letters.length));
    keys = shuffle(letters.concat(extras));
  }

  const maxLen = answer.replace(/ /g, "").length;

  function redraw() {
    slotEls.forEach((s, i) => {
      s.textContent = typed[i] || "";
      s.classList.toggle("filled", !!typed[i]);
    });
    goBtn.disabled = typed.length !== maxLen;
    if (!isNum) {
      /* each letter tile is single-use */
      tileEls.forEach(t => t.disabled = t.dataset.used === "1");
    }
  }

  const tileEls = [];
  keys.forEach(k => {
    const t = document.createElement("button");
    t.className = "tile-btn" + (isNum ? " num" : "");
    t.textContent = k;
    t.onclick = () => {
      if (locked || typed.length >= maxLen) return;
      typed.push(k);
      if (!isNum) { t.dataset.used = "1"; t.dataset.pos = typed.length - 1; }
      redraw();
    };
    tileEls.push(t);
    tilesDiv.appendChild(t);
  });

  const actions = document.createElement("div");
  actions.className = "type-actions";
  const delBtn = document.createElement("button");
  delBtn.className = "action-btn del";
  delBtn.textContent = "⌫ Hapus";
  delBtn.onclick = () => {
    if (locked || !typed.length) return;
    typed.pop();
    if (!isNum) {
      const t = tileEls.find(t => t.dataset.used === "1" && +t.dataset.pos === typed.length);
      if (t) { delete t.dataset.used; delete t.dataset.pos; }
    }
    redraw();
  };
  const goBtn = document.createElement("button");
  goBtn.className = "action-btn go";
  goBtn.textContent = "✓ Jawab!";
  goBtn.onclick = () => {
    if (locked || typed.length !== maxLen) return;
    locked = true;
    const guess = rebuild(answer, typed);
    const ok = guess === answer;
    if (!ok) slotEls.forEach((s, i) => {
      s.style.borderColor = answer.replace(/ /g, "")[i] === typed[i] ? "#43a047" : "#e57373";
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

/* re-insert spaces of the original answer into the typed letters */
function rebuild(answer, typed) {
  let out = "", ti = 0;
  for (const ch of answer) out += ch === " " ? " " : (typed[ti++] ?? "");
  return out;
}

const PRAISE = ["Hebat! 🌟", "Pintar sekali! 🎉", "Keren, Raline! 💚", "Wow, benar! 🦕", "Luar biasa! ✨"];
const CHEER_UP = ["Tidak apa-apa, ayo coba lagi! 💪", "Hampir benar! Semangat! 🌈", "Pinky bilang: kamu pasti bisa! 💗"];

function settle(ok, xpIfCorrect) {
  const q = currentQ;
  const fb = $("feedback");

  /* session tracking */
  session.answered++;
  const mod = session.modules[round.moduleKey] ??= { answered: 0, correct: 0 };
  mod.answered++;

  let gained;
  if (ok) {
    round.correct++;
    round.streak++;
    session.correct++;
    mod.correct++;
    gained = xpIfCorrect + (round.streak % 3 === 0 ? STREAK_BONUS : 0);
    fb.textContent = pick(PRAISE) + (round.streak % 3 === 0 ? ` +${STREAK_BONUS} bonus beruntun!` : "");
    fb.classList.add("good");
    setChars("excited", "cheer", true);
    soundGood();
    if (round.streak % 3 === 0) confetti(18);
  } else {
    round.streak = 0;
    gained = XP_TRY;
    fb.textContent = pick(CHEER_UP) + " Jawabannya: " + q.answer;
    fb.classList.add("bad");
    setChars("oops", "oops");
    soundBad();
  }

  round.results.push(ok);
  renderDots();

  const before = levelFromXp(profile.xp);
  profile.xp += gained;
  round.xpGained += gained;
  session.xp += gained;
  const after = levelFromXp(profile.xp);
  renderHud();
  saveAll();

  const delay = ok ? 1400 : 2600;
  setTimeout(() => {
    if (after > before) showLevelUp(after, () => { round.qIndex++; nextQuestion(); });
    else { round.qIndex++; nextQuestion(); }
  }, delay);
}

function endRound() {
  const c = round.correct, n = QUESTIONS_PER_ROUND;
  const stars = c >= n - 1 ? 3 : c >= Math.ceil(n * 0.6) ? 2 : c >= Math.ceil(n * 0.3) ? 1 : 0;
  const mood = stars >= 2 ? "cheer" : "happy";
  $("summary-card").innerHTML = `
    <div class="summary-chars">
      <div class="char">${ralineSVG(mood)}</div>
      <div class="char">${pinkySVG(mood)}</div>
    </div>
    <h2>Petualangan Selesai!</h2>
    <div class="stars">${"⭐".repeat(stars)}${"☆".repeat(3 - stars)}</div>
    <div class="sline">Benar ${c} dari ${n} soal</div>
    <div class="xp-gain">+${round.xpGained} XP 🏆</div>
    <div class="type-actions">
      <button class="action-btn del" id="btn-sum-home">🏠 Beranda</button>
      <button class="action-btn go" id="btn-sum-again">🔁 Main Lagi</button>
    </div>
  `;
  show("screen-summary");
  if (stars === 3) { confetti(50); soundLevel(); }
  $("btn-sum-home").onclick = renderHome;
  $("btn-sum-again").onclick = () => startRound(round.moduleKey);
  saveAll();
}

/* ---------- level up ---------- */

function showLevelUp(newLevel, then) {
  $("lvl-raline").innerHTML = ralineSVG("cheer");
  $("lvl-pinky").innerHTML = pinkySVG("cheer");
  $("lvl-title").textContent = `Level ${newLevel} — ${levelTitle(newLevel)}`;
  $("levelup").classList.add("show");
  confetti(60);
  soundLevel();
  speak("Naik level! Hebat, Raline!");
  $("btn-lvl-ok").onclick = () => {
    $("levelup").classList.remove("show");
    then();
  };
}

/* ---------- parent report ---------- */

function renderReport() {
  const all = sessions;
  const totQ = all.reduce((s, x) => s + x.answered, 0);
  const totC = all.reduce((s, x) => s + x.correct, 0);
  const played = all.filter(s => s.answered > 0);

  const modStats = {};
  all.forEach(s => {
    Object.entries(s.modules || {}).forEach(([k, v]) => {
      const m = modStats[k] ??= { answered: 0, correct: 0 };
      m.answered += v.answered; m.correct += v.correct;
    });
  });

  const modRows = MODULES
    .filter(m => modStats[m.key])
    .map(m => {
      const s = modStats[m.key];
      const pct = Math.round(100 * s.correct / s.answered);
      return `<div class="sess"><span class="d">${m.icon} ${m.title}</span> — benar ${s.correct}/${s.answered} (${pct}%)</div>`;
    }).join("") || `<div class="sess">Belum ada permainan.</div>`;

  const sessRows = played.slice(-10).reverse().map(s => {
    const d = new Date(s.start);
    const mins = Math.max(1, Math.round((s.end - s.start) / 60000));
    const date = d.toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short" });
    const time = d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    return `<div class="sess">
      <span class="d">${date} ${time}</span>
      <div class="m">±${mins} menit · ${s.answered} soal · ${s.correct} benar · +${s.xp} XP</div>
    </div>`;
  }).join("") || `<div class="sess">Belum ada sesi.</div>`;

  $("report-body").innerHTML = `
    <h2>📋 Laporan Belajar Raline</h2>
    <div class="totals">
      <div class="tot"><b>${levelFromXp(profile.xp)}</b><span>Level</span></div>
      <div class="tot"><b>${profile.xp}</b><span>Total XP</span></div>
      <div class="tot"><b>${played.length}</b><span>Sesi main</span></div>
      <div class="tot"><b>${totQ}</b><span>Soal dijawab</span></div>
      <div class="tot"><b>${totC}</b><span>Jawaban benar</span></div>
      <div class="tot"><b>${totQ ? Math.round(100 * totC / totQ) : 0}%</b><span>Akurasi</span></div>
    </div>
    <h2>Per Modul</h2>
    ${modRows}
    <h2 style="margin-top:14px">Sesi Terakhir</h2>
    ${sessRows}
  `;
  show("screen-report");
}

/* ---------- wiring ---------- */

$("btn-quit").onclick = renderHome;
$("btn-report").onclick = renderReport;
$("btn-report-back").onclick = renderHome;

renderHome();
