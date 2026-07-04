/* ============================================================
   Raline The Explorer — Quiz content (Bahasa Indonesia)
   ============================================================ */

const DATA = {

  benda: [
    { emoji: "🪑", name: "KURSI" },
    { emoji: "🚪", name: "PINTU" },
    { emoji: "🛏️", name: "KASUR" },
    { emoji: "⏰", name: "JAM" },
    { emoji: "📚", name: "BUKU" },
    { emoji: "✏️", name: "PENSIL" },
    { emoji: "🥄", name: "SENDOK" },
    { emoji: "🍽️", name: "PIRING" },
    { emoji: "👟", name: "SEPATU" },
    { emoji: "🧸", name: "BONEKA" },
    { emoji: "☂️", name: "PAYUNG" },
    { emoji: "🪥", name: "SIKAT GIGI" },
    { emoji: "🧼", name: "SABUN" },
    { emoji: "💡", name: "LAMPU" },
    { emoji: "📺", name: "TELEVISI" },
    { emoji: "🚗", name: "MOBIL" },
    { emoji: "🚲", name: "SEPEDA" },
    { emoji: "⚽", name: "BOLA" },
    { emoji: "🎒", name: "TAS" },
    { emoji: "🧢", name: "TOPI" },
    { emoji: "🔑", name: "KUNCI" },
    { emoji: "🪟", name: "JENDELA" }
  ],

  tanaman: [
    { emoji: "🌹", name: "MAWAR" },
    { emoji: "🌻", name: "BUNGA MATAHARI" },
    { emoji: "🌵", name: "KAKTUS" },
    { emoji: "🌴", name: "POHON KELAPA" },
    { emoji: "🌷", name: "TULIP" },
    { emoji: "🍄", name: "JAMUR" },
    { emoji: "🌾", name: "PADI" },
    { emoji: "🎋", name: "BAMBU" },
    { emoji: "🌳", name: "POHON" },
    { emoji: "🌺", name: "KEMBANG SEPATU" },
    { emoji: "🍀", name: "SEMANGGI" },
    { emoji: "🌽", name: "JAGUNG" },
    { emoji: "🥀", name: "BUNGA LAYU" },
    { emoji: "🌿", name: "DAUN" }
  ],

  buah: [
    { emoji: "🍎", name: "APEL" },
    { emoji: "🍌", name: "PISANG" },
    { emoji: "🍊", name: "JERUK" },
    { emoji: "🍉", name: "SEMANGKA" },
    { emoji: "🍇", name: "ANGGUR" },
    { emoji: "🍓", name: "STROBERI" },
    { emoji: "🍍", name: "NANAS" },
    { emoji: "🥭", name: "MANGGA" },
    { emoji: "🥑", name: "ALPUKAT" },
    { emoji: "🍐", name: "PIR" },
    { emoji: "🍒", name: "CERI" },
    { emoji: "🥥", name: "KELAPA" },
    { emoji: "🍅", name: "TOMAT" },
    { emoji: "🍑", name: "PERSIK" },
    { emoji: "🥝", name: "KIWI" },
    { emoji: "🍋", name: "LEMON" }
  ],

  hewan: [
    { emoji: "🐱", name: "KUCING" },
    { emoji: "🐶", name: "ANJING" },
    { emoji: "🐘", name: "GAJAH" },
    { emoji: "🦁", name: "SINGA" },
    { emoji: "🐵", name: "MONYET" },
    { emoji: "🐦", name: "BURUNG" },
    { emoji: "🐟", name: "IKAN" },
    { emoji: "🐢", name: "KURA-KURA" },
    { emoji: "🐰", name: "KELINCI" },
    { emoji: "🦋", name: "KUPU-KUPU" },
    { emoji: "🐴", name: "KUDA" },
    { emoji: "🐮", name: "SAPI" },
    { emoji: "🐔", name: "AYAM" },
    { emoji: "🦆", name: "BEBEK" },
    { emoji: "🐍", name: "ULAR" },
    { emoji: "🦒", name: "JERAPAH" },
    { emoji: "🦓", name: "ZEBRA" },
    { emoji: "🐸", name: "KATAK" },
    { emoji: "🦀", name: "KEPITING" },
    { emoji: "🐝", name: "LEBAH" },
    { emoji: "🐯", name: "HARIMAU" },
    { emoji: "🐼", name: "PANDA" }
  ],

  /* Dinosaurs are drawn as SVG (see dinoSVG below) */
  dino: [
    { id: "trex",       name: "TIRANOSAURUS" },
    { id: "triceratops",name: "TRICERATOPS" },
    { id: "stego",      name: "STEGOSAURUS" },
    { id: "brachio",    name: "BRAKIOSAURUS" },
    { id: "pachy",      name: "PAKISEFALOSAURUS" },
    { id: "anky",       name: "ANKILOSAURUS" },
    { id: "raptor",     name: "VELOCIRAPTOR" },
    { id: "spino",      name: "SPINOSAURUS" },
    { id: "para",       name: "PARASAUROLOFUS" },
    { id: "ptero",      name: "PTEROSAURUS" }
  ],

  /* Simple words for the reading module — emoji + word to spell */
  kata: [
    { emoji: "⚽", name: "BOLA" },
    { emoji: "👁️", name: "MATA" },
    { emoji: "📚", name: "BUKU" },
    { emoji: "🥛", name: "SUSU" },
    { emoji: "🏠", name: "RUMAH" },
    { emoji: "🔥", name: "API" },
    { emoji: "🍚", name: "NASI" },
    { emoji: "🐟", name: "IKAN" },
    { emoji: "🌙", name: "BULAN" },
    { emoji: "⭐", name: "BINTANG" },
    { emoji: "🌂", name: "PAYUNG" },
    { emoji: "🦶", name: "KAKI" },
    { emoji: "👂", name: "TELINGA" },
    { emoji: "🍞", name: "ROTI" },
    { emoji: "💧", name: "AIR" },
    { emoji: "🐱", name: "KUCING" },
    { emoji: "🚗", name: "MOBIL" },
    { emoji: "🌸", name: "BUNGA" }
  ],

  bendera: [
    { emoji: "🇮🇩", name: "INDONESIA" },
    { emoji: "🇲🇾", name: "MALAYSIA" },
    { emoji: "🇸🇬", name: "SINGAPURA" },
    { emoji: "🇯🇵", name: "JEPANG" },
    { emoji: "🇰🇷", name: "KOREA" },
    { emoji: "🇨🇳", name: "TIONGKOK" },
    { emoji: "🇺🇸", name: "AMERIKA" },
    { emoji: "🇬🇧", name: "INGGRIS" },
    { emoji: "🇫🇷", name: "PRANCIS" },
    { emoji: "🇧🇷", name: "BRASIL" },
    { emoji: "🇦🇺", name: "AUSTRALIA" },
    { emoji: "🇮🇳", name: "INDIA" },
    { emoji: "🇸🇦", name: "ARAB SAUDI" },
    { emoji: "🇹🇭", name: "THAILAND" },
    { emoji: "🇻🇳", name: "VIETNAM" },
    { emoji: "🇩🇪", name: "JERMAN" },
    { emoji: "🇮🇹", name: "ITALIA" },
    { emoji: "🇪🇸", name: "SPANYOL" },
    { emoji: "🇳🇱", name: "BELANDA" },
    { emoji: "🇹🇷", name: "TURKI" }
  ]
};

/* Letters used in the "read the letter" questions */
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/* Module definitions shown on the home screen */
const MODULES = [
  { key: "math",    icon: "🔢", title: "Matematika",   sub: "Tambah & kurang" },
  { key: "benda",   icon: "🪑", title: "Benda Sekitar", sub: "Kenali benda" },
  { key: "tanaman", icon: "🌻", title: "Tanaman",      sub: "Kenali tanaman" },
  { key: "buah",    icon: "🍉", title: "Buah",         sub: "Kenali buah" },
  { key: "hewan",   icon: "🦁", title: "Hewan",        sub: "Kenali hewan" },
  { key: "dino",    icon: "🦖", title: "Dinosaurus",   sub: "Favorit Raline!" },
  { key: "baca",    icon: "🔤", title: "Membaca",      sub: "Huruf & kata" },
  { key: "bendera", icon: "🌍", title: "Bendera",      sub: "Bendera negara" }
];

/* Level titles as Raline grows */
const LEVEL_TITLES = [
  "Penjelajah Kecil", "Penjelajah Pemberani", "Sahabat Dino",
  "Penjelajah Hebat", "Pemburu Fosil", "Ahli Dino Muda",
  "Kapten Petualang", "Bintang Penjelajah", "Profesor Dino Cilik",
  "Penjelajah Legendaris"
];

/* Cute simplified dinosaur drawings.
   Each is a 200x140 viewBox SVG string with a friendly eye. */
function dinoSVG(id) {
  const eye = (x, y) =>
    `<circle cx="${x}" cy="${y}" r="6" fill="#fff"/><circle cx="${x + 1.5}" cy="${y}" r="3" fill="#333"/>`;
  const svgs = {
    trex: `
      <path d="M45 120 Q20 110 15 85 Q35 95 55 90 Q50 70 65 55 Q75 40 105 38 L150 40 Q168 42 168 58 Q168 70 150 72 L128 74 Q140 80 138 95 Q136 115 110 122 Z" fill="#7cb342"/>
      <path d="M150 40 L160 30 L158 42 Z" fill="#7cb342"/>
      <rect x="95" y="115" width="12" height="20" rx="5" fill="#7cb342"/>
      <rect x="118" y="113" width="12" height="22" rx="5" fill="#7cb342"/>
      <path d="M118 78 q10 4 8 12" stroke="#558b2f" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M138 62 l7 8 M148 60 l7 8" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
      ${eye(140, 50)}`,
    triceratops: `
      <ellipse cx="90" cy="90" rx="55" ry="35" fill="#ff8a65"/>
      <path d="M135 75 Q160 60 158 85 Q158 105 135 105 Q148 90 135 75" fill="#ff8a65"/>
      <path d="M130 55 Q155 45 172 62 Q178 70 170 78 Q160 88 140 82 Q125 75 130 55" fill="#e64a19"/>
      <ellipse cx="160" cy="80" rx="22" ry="18" fill="#ff8a65"/>
      <path d="M150 65 L146 48 L158 60 Z" fill="#fff8e1"/>
      <path d="M170 68 L174 52 L178 66 Z" fill="#fff8e1"/>
      <path d="M178 84 L192 80 L182 92 Z" fill="#fff8e1"/>
      <rect x="55" y="112" width="13" height="20" rx="6" fill="#ff8a65"/>
      <rect x="95" y="112" width="13" height="20" rx="6" fill="#ff8a65"/>
      <path d="M38 88 Q20 92 18 104 Q30 106 42 100" fill="#ff8a65"/>
      ${eye(160, 78)}`,
    stego: `
      <path d="M40 70 L52 45 L64 70 Z M65 60 L79 30 L93 60 Z M94 58 L108 28 L122 58 Z M123 65 L136 40 L148 65 Z" fill="#ffb300"/>
      <ellipse cx="90" cy="92" rx="58" ry="30" fill="#8d6e63"/>
      <path d="M140 85 Q168 88 175 100 Q160 108 145 102" fill="#8d6e63"/>
      <path d="M170 96 l10 -8 M176 102 l12 -4" stroke="#ffb300" stroke-width="5" stroke-linecap="round"/>
      <ellipse cx="38" cy="95" rx="18" ry="13" fill="#8d6e63"/>
      <rect x="60" y="110" width="13" height="22" rx="6" fill="#8d6e63"/>
      <rect x="105" y="110" width="13" height="22" rx="6" fill="#8d6e63"/>
      ${eye(32, 92)}`,
    brachio: `
      <ellipse cx="80" cy="105" rx="50" ry="27" fill="#4fc3f7"/>
      <path d="M115 95 Q135 80 138 40 Q140 20 152 20 Q166 20 164 36 Q150 38 150 55 Q148 90 128 105 Z" fill="#4fc3f7"/>
      <ellipse cx="155" cy="28" rx="15" ry="12" fill="#4fc3f7"/>
      <rect x="52" y="120" width="13" height="18" rx="6" fill="#4fc3f7"/>
      <rect x="92" y="120" width="13" height="18" rx="6" fill="#4fc3f7"/>
      <path d="M35 100 Q15 102 12 114 Q28 118 40 110" fill="#4fc3f7"/>
      <circle cx="70" cy="100" r="5" fill="#81d4fa"/><circle cx="92" cy="108" r="5" fill="#81d4fa"/>
      ${eye(158, 26)}`,
    pachy: `
      <ellipse cx="85" cy="98" rx="48" ry="28" fill="#f48fb1"/>
      <path d="M120 88 Q135 70 138 55 Q140 42 152 44 Q150 30 138 32 Q120 36 118 60 Z" fill="#f48fb1"/>
      <circle cx="148" cy="48" r="17" fill="#f48fb1"/>
      <path d="M138 34 Q148 24 158 34 Q160 40 155 42 Q148 36 141 42 Q136 40 138 34" fill="#ec407a"/>
      <circle cx="133" cy="38" r="3" fill="#ec407a"/><circle cx="163" cy="40" r="3" fill="#ec407a"/>
      <rect x="60" y="115" width="12" height="20" rx="6" fill="#f48fb1"/>
      <rect x="98" y="115" width="12" height="20" rx="6" fill="#f48fb1"/>
      <path d="M40 92 Q22 94 18 106 Q32 110 45 102" fill="#f48fb1"/>
      ${eye(150, 50)}`,
    anky: `
      <ellipse cx="90" cy="95" rx="58" ry="30" fill="#9575cd"/>
      <path d="M50 72 l8 -12 8 12 M75 66 l8 -12 8 12 M100 66 l8 -12 8 12 M125 72 l8 -12 8 12" fill="#5e35b1"/>
      <ellipse cx="152" cy="92" rx="18" ry="13" fill="#9575cd"/>
      <path d="M38 90 Q18 88 12 96 Q14 104 26 104" fill="#9575cd"/>
      <circle cx="14" cy="99" r="10" fill="#5e35b1"/>
      <rect x="65" y="112" width="13" height="20" rx="6" fill="#9575cd"/>
      <rect x="105" y="112" width="13" height="20" rx="6" fill="#9575cd"/>
      ${eye(156, 88)}`,
    raptor: `
      <path d="M40 115 Q30 90 55 80 Q75 72 95 75 L125 60 Q135 52 148 55 L165 60 Q170 68 160 72 L138 78 Q130 95 108 100 Q120 108 115 120 L100 120 Q102 108 88 105 Q60 118 40 115" fill="#26a69a"/>
      <path d="M148 55 L155 44 L158 58 Z" fill="#26a69a"/>
      <rect x="70" y="108" width="10" height="24" rx="5" fill="#26a69a"/>
      <path d="M75 132 l10 0 M75 132 l-3 6" stroke="#00695c" stroke-width="4" stroke-linecap="round"/>
      <path d="M120 70 q8 2 8 8" stroke="#00695c" stroke-width="4" fill="none" stroke-linecap="round"/>
      ${eye(148, 63)}`,
    spino: `
      <path d="M55 75 Q60 35 90 30 Q125 28 135 70 Q95 60 55 75" fill="#ef5350"/>
      <path d="M60 72 Q68 48 88 42 M95 40 Q115 42 125 65" stroke="#ffcdd2" stroke-width="3" fill="none"/>
      <ellipse cx="92" cy="95" rx="55" ry="28" fill="#ef5350"/>
      <path d="M140 85 Q158 78 175 82 Q182 86 178 92 Q165 98 145 95 Z" fill="#ef5350"/>
      <path d="M168 84 l0 8 M176 85 l0 6" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <rect x="65" y="112" width="13" height="20" rx="6" fill="#ef5350"/>
      <rect x="105" y="112" width="13" height="20" rx="6" fill="#ef5350"/>
      <path d="M40 92 Q22 96 18 108 Q32 110 44 102" fill="#ef5350"/>
      ${eye(160, 84)}`,
    para: `
      <ellipse cx="85" cy="100" rx="50" ry="27" fill="#ffa726"/>
      <path d="M118 90 Q135 75 138 58 Q142 45 155 48 Q168 50 165 62 Q152 60 150 72 Q145 95 125 103 Z" fill="#ffa726"/>
      <ellipse cx="155" cy="58" rx="15" ry="12" fill="#ffa726"/>
      <path d="M148 50 Q135 30 118 25 Q112 24 112 32 Q114 40 130 46 Q142 50 148 56 Z" fill="#f57c00"/>
      <rect x="58" y="115" width="13" height="20" rx="6" fill="#ffa726"/>
      <rect x="98" y="115" width="13" height="20" rx="6" fill="#ffa726"/>
      <path d="M38 95 Q20 98 16 110 Q30 113 43 105" fill="#ffa726"/>
      ${eye(158, 56)}`,
    ptero: `
      <path d="M100 70 Q60 30 15 45 Q45 60 70 78 Z" fill="#ab47bc"/>
      <path d="M100 70 Q140 30 185 45 Q155 60 130 78 Z" fill="#ab47bc"/>
      <ellipse cx="100" cy="85" rx="26" ry="20" fill="#ce93d8"/>
      <path d="M118 75 Q135 68 148 72 L138 82 Q128 85 120 82 Z" fill="#ce93d8"/>
      <path d="M122 70 Q112 55 118 45 Q126 55 132 68 Z" fill="#ab47bc"/>
      <path d="M85 102 L80 118 M105 102 L110 118" stroke="#ab47bc" stroke-width="5" stroke-linecap="round"/>
      ${eye(128, 74)}`
  };
  return `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">${svgs[id] || ""}</svg>`;
}
