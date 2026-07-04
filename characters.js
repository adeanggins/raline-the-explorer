/* ============================================================
   Raline The Explorer — Character art (SVG)
   Raline: 5-year-old Indonesian girl who loves dinosaurs.
   Pinky : her pink pachycephalosaurus sidekick.
   Moods : idle | happy | excited | thinking | oops | cheer
   ============================================================ */

const SKIN = "#c68863";
const SKIN_DARK = "#a96f4e";
const HAIR = "#2b2118";
const SHIRT = "#43a047";
const SHIRT_DARK = "#2e7d32";
const SHORTS = "#f06292";
const PINK = "#f48fb1";
const PINK_DARK = "#ec407a";

/* ---------- Raline ---------- */

function ralineSVG(mood = "idle") {
  const parts = ralineFace(mood);
  const arms = ralineArms(mood);
  const bounce = (mood === "excited" || mood === "cheer") ? -8 : 0;

  return `
<svg viewBox="0 0 220 300" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0 ${bounce})">
    <!-- pigtails -->
    <circle cx="52" cy="78" r="20" fill="${HAIR}"/>
    <circle cx="168" cy="78" r="20" fill="${HAIR}"/>
    <circle cx="52" cy="60" r="9" fill="#ffd54f"/>
    <circle cx="168" cy="60" r="9" fill="#ffd54f"/>

    <!-- head -->
    <circle cx="110" cy="80" r="46" fill="${SKIN}"/>
    <!-- hair top / bangs -->
    <path d="M64 74 Q62 30 110 28 Q158 30 156 74 Q150 48 132 52 Q140 40 122 44 Q126 34 110 40 Q94 34 98 44 Q80 40 88 52 Q70 48 64 74" fill="${HAIR}"/>

    ${parts.eyes}
    ${parts.mouth}
    ${parts.extra}
    <!-- blush -->
    <ellipse cx="76" cy="94" rx="8" ry="5" fill="#f8a1a1" opacity=".7"/>
    <ellipse cx="144" cy="94" rx="8" ry="5" fill="#f8a1a1" opacity=".7"/>

    <!-- body : dino t-shirt -->
    <path d="M78 128 Q110 118 142 128 L150 200 Q110 212 70 200 Z" fill="${SHIRT}"/>
    <path d="M78 128 L60 150 L74 162 L84 140 Z" fill="${SHIRT}"/>
    <path d="M142 128 L160 150 L146 162 L136 140 Z" fill="${SHIRT}"/>
    <!-- little dino print on shirt -->
    <g transform="translate(88 150) scale(.32)">
      <ellipse cx="55" cy="60" rx="40" ry="24" fill="#a5d6a7"/>
      <path d="M85 50 Q100 34 108 20 Q118 26 110 42 Q100 56 92 60 Z" fill="#a5d6a7"/>
      <circle cx="104" cy="30" r="12" fill="#a5d6a7"/>
      <rect x="34" y="76" width="10" height="16" rx="5" fill="#a5d6a7"/>
      <rect x="62" y="76" width="10" height="16" rx="5" fill="#a5d6a7"/>
      <circle cx="107" cy="28" r="3" fill="#1b5e20"/>
    </g>

    ${arms}

    <!-- shorts -->
    <path d="M76 198 L144 198 L146 232 L118 232 L110 214 L102 232 L74 232 Z" fill="${SHORTS}"/>
    <!-- legs -->
    <rect x="84" y="230" width="16" height="34" rx="8" fill="${SKIN}"/>
    <rect x="120" y="230" width="16" height="34" rx="8" fill="${SKIN}"/>
    <!-- sneakers -->
    <path d="M80 262 Q80 256 92 256 Q104 256 104 264 L104 272 L78 272 Q76 266 80 262" fill="#7e57c2"/>
    <path d="M116 262 Q116 256 128 256 Q140 256 140 264 L140 272 L114 272 Q112 266 116 262" fill="#7e57c2"/>
    <rect x="78" y="268" width="26" height="6" rx="3" fill="#fff"/>
    <rect x="114" y="268" width="26" height="6" rx="3" fill="#fff"/>
  </g>
</svg>`;
}

function ralineFace(mood) {
  let eyes = "", mouth = "", extra = "";
  switch (mood) {
    case "excited":
    case "cheer":
      eyes = `
        <path d="M84 76 Q90 68 96 76" stroke="#2b2118" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M124 76 Q130 68 136 76" stroke="#2b2118" stroke-width="4" fill="none" stroke-linecap="round"/>`;
      mouth = `<path d="M94 98 Q110 116 126 98 Q110 108 94 98" fill="#5d3a2e"/><path d="M98 102 Q110 112 122 102 Q110 108 98 102" fill="#ef9a9a"/>`;
      extra = mood === "cheer"
        ? `<text x="30" y="40" font-size="22">✨</text><text x="170" y="36" font-size="22">🌟</text>`
        : "";
      break;
    case "thinking":
      eyes = `
        <circle cx="90" cy="74" r="6" fill="#2b2118"/>
        <circle cx="130" cy="74" r="6" fill="#2b2118"/>
        <circle cx="92" cy="72" r="2" fill="#fff"/>
        <circle cx="132" cy="72" r="2" fill="#fff"/>`;
      mouth = `<ellipse cx="112" cy="102" rx="6" ry="7" fill="#5d3a2e"/>`;
      extra = `<text x="158" y="34" font-size="26" font-weight="bold" fill="#7e57c2">?</text>`;
      break;
    case "oops":
      eyes = `
        <path d="M84 78 Q90 74 96 78" stroke="#2b2118" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M124 78 Q130 74 136 78" stroke="#2b2118" stroke-width="4" fill="none" stroke-linecap="round"/>`;
      mouth = `<path d="M98 104 Q110 96 122 104" stroke="#5d3a2e" stroke-width="4" fill="none" stroke-linecap="round"/>`;
      extra = `<path d="M148 56 q6 8 0 14" stroke="#64b5f6" stroke-width="4" fill="none" stroke-linecap="round"/>`;
      break;
    case "happy":
      eyes = `
        <circle cx="90" cy="76" r="7" fill="#2b2118"/>
        <circle cx="130" cy="76" r="7" fill="#2b2118"/>
        <circle cx="92" cy="73" r="2.5" fill="#fff"/>
        <circle cx="132" cy="73" r="2.5" fill="#fff"/>`;
      mouth = `<path d="M94 96 Q110 112 126 96" stroke="#5d3a2e" stroke-width="5" fill="none" stroke-linecap="round"/>`;
      break;
    default: /* idle */
      eyes = `
        <circle cx="90" cy="76" r="7" fill="#2b2118"/>
        <circle cx="130" cy="76" r="7" fill="#2b2118"/>
        <circle cx="92" cy="73" r="2.5" fill="#fff"/>
        <circle cx="132" cy="73" r="2.5" fill="#fff"/>`;
      mouth = `<path d="M98 98 Q110 108 122 98" stroke="#5d3a2e" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  }
  return { eyes, mouth, extra };
}

function ralineArms(mood) {
  if (mood === "excited" || mood === "cheer") {
    /* both arms up in celebration */
    return `
      <path d="M78 134 Q54 110 50 88" stroke="${SKIN}" stroke-width="14" fill="none" stroke-linecap="round"/>
      <path d="M142 134 Q166 110 170 88" stroke="${SKIN}" stroke-width="14" fill="none" stroke-linecap="round"/>`;
  }
  if (mood === "thinking") {
    /* one hand on chin */
    return `
      <path d="M78 136 Q64 160 68 186" stroke="${SKIN}" stroke-width="14" fill="none" stroke-linecap="round"/>
      <path d="M142 136 Q158 130 138 108" stroke="${SKIN}" stroke-width="14" fill="none" stroke-linecap="round"/>`;
  }
  if (mood === "oops") {
    /* hand scratching head */
    return `
      <path d="M78 136 Q64 160 68 186" stroke="${SKIN}" stroke-width="14" fill="none" stroke-linecap="round"/>
      <path d="M142 134 Q168 110 156 62" stroke="${SKIN}" stroke-width="14" fill="none" stroke-linecap="round"/>`;
  }
  if (mood === "happy") {
    /* one waving arm */
    return `
      <path d="M78 136 Q64 160 68 186" stroke="${SKIN}" stroke-width="14" fill="none" stroke-linecap="round"/>
      <path d="M142 134 Q168 116 168 92" stroke="${SKIN}" stroke-width="14" fill="none" stroke-linecap="round"/>`;
  }
  /* idle: both arms down */
  return `
    <path d="M78 136 Q64 160 68 186" stroke="${SKIN}" stroke-width="14" fill="none" stroke-linecap="round"/>
    <path d="M142 136 Q156 160 152 186" stroke="${SKIN}" stroke-width="14" fill="none" stroke-linecap="round"/>`;
}

/* Big Raline head with a named emotion — used by the Feelings module
   emotions: happy | sad | angry | scared | surprised | sleepy */
function ralineHead(emotion) {
  const faces = {
    happy: `
      <path d="M84 96 Q92 86 100 96" stroke="#2b2118" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M120 96 Q128 86 136 96" stroke="#2b2118" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M92 118 Q110 140 128 118" stroke="#5d3a2e" stroke-width="6" fill="none" stroke-linecap="round"/>`,
    sad: `
      <circle cx="92" cy="96" r="7" fill="#2b2118"/><circle cx="128" cy="96" r="7" fill="#2b2118"/>
      <path d="M96 128 Q110 116 124 128" stroke="#5d3a2e" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M84 108 q-4 12 2 18" stroke="#64b5f6" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M80 84 Q88 88 96 86 M124 86 Q132 88 140 84" stroke="#2b2118" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    angry: `
      <circle cx="92" cy="98" r="7" fill="#2b2118"/><circle cx="128" cy="98" r="7" fill="#2b2118"/>
      <path d="M80 84 L100 92 M140 84 L120 92" stroke="#2b2118" stroke-width="5" stroke-linecap="round"/>
      <path d="M96 128 Q110 118 124 128" stroke="#5d3a2e" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M146 74 l8 -8 M150 82 l10 -4" stroke="#e53935" stroke-width="4" stroke-linecap="round"/>`,
    scared: `
      <circle cx="92" cy="96" r="9" fill="#fff" stroke="#2b2118" stroke-width="3"/>
      <circle cx="92" cy="96" r="4" fill="#2b2118"/>
      <circle cx="128" cy="96" r="9" fill="#fff" stroke="#2b2118" stroke-width="3"/>
      <circle cx="128" cy="96" r="4" fill="#2b2118"/>
      <ellipse cx="110" cy="126" rx="9" ry="11" fill="#5d3a2e"/>
      <path d="M78 80 Q86 76 94 80 M126 80 Q134 76 142 80" stroke="#2b2118" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    surprised: `
      <circle cx="92" cy="94" r="9" fill="#2b2118"/><circle cx="94" cy="91" r="3" fill="#fff"/>
      <circle cx="128" cy="94" r="9" fill="#2b2118"/><circle cx="130" cy="91" r="3" fill="#fff"/>
      <ellipse cx="110" cy="124" rx="10" ry="12" fill="#5d3a2e"/>
      <path d="M82 78 Q92 72 100 78 M120 78 Q128 72 138 78" stroke="#2b2118" stroke-width="4" fill="none" stroke-linecap="round"/>
      <text x="150" y="66" font-size="26" font-weight="bold" fill="#7e57c2">!</text>`,
    sleepy: `
      <path d="M84 96 Q92 100 100 96" stroke="#2b2118" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M120 96 Q128 100 136 96" stroke="#2b2118" stroke-width="5" fill="none" stroke-linecap="round"/>
      <ellipse cx="110" cy="124" rx="7" ry="9" fill="#5d3a2e"/>
      <text x="146" y="64" font-size="20" fill="#7e57c2">z</text>
      <text x="158" y="50" font-size="26" fill="#7e57c2">Z</text>`
  };
  return `
<svg viewBox="0 0 220 190" xmlns="http://www.w3.org/2000/svg">
  <circle cx="46" cy="96" r="24" fill="${HAIR}"/>
  <circle cx="174" cy="96" r="24" fill="${HAIR}"/>
  <circle cx="46" cy="74" r="10" fill="#ffd54f"/>
  <circle cx="174" cy="74" r="10" fill="#ffd54f"/>
  <circle cx="110" cy="100" r="58" fill="${SKIN}"/>
  <path d="M52 92 Q50 38 110 36 Q170 38 168 92 Q160 60 138 64 Q148 48 126 54 Q131 42 110 49 Q89 42 94 54 Q72 48 82 64 Q60 60 52 92" fill="${HAIR}"/>
  <ellipse cx="74" cy="116" rx="9" ry="6" fill="#f8a1a1" opacity=".7"/>
  <ellipse cx="146" cy="116" rx="9" ry="6" fill="#f8a1a1" opacity=".7"/>
  ${faces[emotion] || faces.happy}
</svg>`;
}

/* ---------- Pinky the pachycephalosaurus ---------- */

function pinkySVG(mood = "idle") {
  const face = pinkyFace(mood);
  const jump = (mood === "excited" || mood === "cheer") ? -10 : 0;
  return `
<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0 ${jump})">
    <!-- tail -->
    <path d="M40 105 Q18 108 12 122 Q30 126 46 116 Z" fill="${PINK}"/>
    <!-- body -->
    <ellipse cx="85" cy="108" rx="48" ry="30" fill="${PINK}"/>
    <ellipse cx="78" cy="116" rx="30" ry="18" fill="#fce4ec"/>
    <!-- legs -->
    <rect x="58" y="126" width="13" height="22" rx="6" fill="${PINK}"/>
    <rect x="98" y="126" width="13" height="22" rx="6" fill="${PINK}"/>
    <!-- neck + dome head -->
    <path d="M118 98 Q132 82 136 64 Q138 50 150 52 Q148 40 137 42 Q120 46 117 70 Z" fill="${PINK}"/>
    <circle cx="147" cy="57" r="19" fill="${PINK}"/>
    <!-- dome bumps -->
    <path d="M136 42 Q147 31 158 42 Q160 48 155 50 Q147 43 140 50 Q134 47 136 42" fill="${PINK_DARK}"/>
    <circle cx="131" cy="47" r="3" fill="${PINK_DARK}"/>
    <circle cx="163" cy="49" r="3" fill="${PINK_DARK}"/>
    ${face}
  </g>
</svg>`;
}

function pinkyFace(mood) {
  switch (mood) {
    case "excited":
    case "cheer":
      return `
        <path d="M148 56 Q153 50 158 56" stroke="#880e4f" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <path d="M150 66 Q157 74 164 65" stroke="#880e4f" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <text x="168" y="34" font-size="18">💖</text>`;
    case "thinking":
      return `
        <circle cx="153" cy="57" r="4.5" fill="#880e4f"/>
        <circle cx="154.5" cy="55.5" r="1.5" fill="#fff"/>
        <ellipse cx="158" cy="68" rx="3.5" ry="4" fill="#880e4f"/>`;
    case "oops":
      return `
        <path d="M148 58 Q153 55 158 58" stroke="#880e4f" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <path d="M150 70 Q157 65 164 70" stroke="#880e4f" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
    case "happy":
      return `
        <circle cx="153" cy="57" r="4.5" fill="#880e4f"/>
        <circle cx="154.5" cy="55.5" r="1.5" fill="#fff"/>
        <path d="M150 66 Q157 73 164 65" stroke="#880e4f" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
    default:
      return `
        <circle cx="153" cy="57" r="4.5" fill="#880e4f"/>
        <circle cx="154.5" cy="55.5" r="1.5" fill="#fff"/>
        <path d="M151 66 Q157 70 163 66" stroke="#880e4f" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  }
}
