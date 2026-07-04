/* ============================================================
   Raline The Explorer — mastery engine (adaptive difficulty)

   Each module has numbered difficulty tiers (1..maxTier).
   We keep a rolling window of the last results per module:
   ≥80% over ≥6 answers → tier up (small celebration),
   ≤40% over ≥6 answers → tier down (quietly).
   Question generators read the current tier.
   ============================================================ */

const SKILL_TIERS = {
  math:    4, // 1 count objects · 2 add ≤5 with pictures · 3 add/sub ≤10 · 4 mixed ≤20, no picture help
  banding: 4, // 1 tap-count · 2 more/fewer · 3 bigger number · 4 order numbers
  bentuk:  4, // 1 shapes · 2 ABAB pattern · 3 AABB/ABC pattern · 4 odd-one-out
  benda:   3, // 1 two options · 2 four options · 3 typing + reverse questions
  tanaman: 3,
  buah:    3,
  hewan:   3,
  dino:    3, // 1 two options · 2 four options · 3 name → pick dino
  baca:    4, // 1 letter MC · 2 lowercase match · 3 short word tiles · 4 longer words
  suku:    4, // 1 hear syllable · 2 build 2-syl word · 3 read word → picture · 4 sentence
  tulis:   3, // 1 digits · 2 uppercase · 3 lowercase
  english: 4, // 1 hear → picture (2 opts) · 2 hear → picture (4) · 3 picture → word · 4 spell
  bendera: 3,
  memori:  3, // board size: 1 → 6 cards · 2 → 8 · 3 → 12 (picture↔word)
  rasa:    2  // 1 name the feeling · 2 good-habit scenarios
};

const MASTERY_WINDOW = 10;   // rolling window size
const MASTERY_MIN = 6;       // answers needed before a tier can move
const TIER_UP_AT = 0.8;
const TIER_DOWN_AT = 0.4;

function ensureMastery(profile) {
  profile.mastery ??= {};
  for (const k of Object.keys(SKILL_TIERS)) {
    profile.mastery[k] ??= { tier: 1, recent: [] };
  }
  return profile.mastery;
}

function skillTier(moduleKey) {
  return profile.mastery?.[moduleKey]?.tier ?? 1;
}

/* Record a result; returns "up" | "down" | null for tier movement */
function recordMastery(moduleKey, ok) {
  const m = ensureMastery(profile)[moduleKey];
  if (!m) return null;
  m.recent.push(ok ? 1 : 0);
  if (m.recent.length > MASTERY_WINDOW) m.recent.shift();
  if (m.recent.length < MASTERY_MIN) return null;
  const acc = m.recent.reduce((a, b) => a + b, 0) / m.recent.length;
  if (acc >= TIER_UP_AT && m.tier < SKILL_TIERS[moduleKey]) {
    m.tier++; m.recent = [];
    return "up";
  }
  if (acc <= TIER_DOWN_AT && m.tier > 1) {
    m.tier--; m.recent = [];
    return "down";
  }
  return null;
}
