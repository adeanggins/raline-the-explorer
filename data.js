/* ============================================================
   Raline The Explorer — Content (bilingual: id / en)
   Every item: { emoji, id: "NAMA", en: "NAME" }
   ============================================================ */

const DATA = {

  benda: [
    { emoji: "🪑", id: "KURSI", en: "CHAIR" },
    { emoji: "🚪", id: "PINTU", en: "DOOR" },
    { emoji: "🛏️", id: "KASUR", en: "BED" },
    { emoji: "⏰", id: "JAM", en: "CLOCK" },
    { emoji: "📚", id: "BUKU", en: "BOOK" },
    { emoji: "✏️", id: "PENSIL", en: "PENCIL" },
    { emoji: "🥄", id: "SENDOK", en: "SPOON" },
    { emoji: "🍽️", id: "PIRING", en: "PLATE" },
    { emoji: "👟", id: "SEPATU", en: "SHOES" },
    { emoji: "🧸", id: "BONEKA", en: "DOLL" },
    { emoji: "☂️", id: "PAYUNG", en: "UMBRELLA" },
    { emoji: "🧼", id: "SABUN", en: "SOAP" },
    { emoji: "💡", id: "LAMPU", en: "LAMP" },
    { emoji: "📺", id: "TELEVISI", en: "TV" },
    { emoji: "🚗", id: "MOBIL", en: "CAR" },
    { emoji: "🚲", id: "SEPEDA", en: "BICYCLE" },
    { emoji: "⚽", id: "BOLA", en: "BALL" },
    { emoji: "🎒", id: "TAS", en: "BAG" },
    { emoji: "🧢", id: "TOPI", en: "HAT" },
    { emoji: "🔑", id: "KUNCI", en: "KEY" },
    { emoji: "🪟", id: "JENDELA", en: "WINDOW" }
  ],

  tanaman: [
    { emoji: "🌹", id: "MAWAR", en: "ROSE" },
    { emoji: "🌻", id: "BUNGA MATAHARI", en: "SUNFLOWER" },
    { emoji: "🌵", id: "KAKTUS", en: "CACTUS" },
    { emoji: "🌴", id: "POHON KELAPA", en: "PALM TREE" },
    { emoji: "🌷", id: "TULIP", en: "TULIP" },
    { emoji: "🍄", id: "JAMUR", en: "MUSHROOM" },
    { emoji: "🌾", id: "PADI", en: "RICE PLANT" },
    { emoji: "🎋", id: "BAMBU", en: "BAMBOO" },
    { emoji: "🌳", id: "POHON", en: "TREE" },
    { emoji: "🌺", id: "KEMBANG SEPATU", en: "HIBISCUS" },
    { emoji: "🍀", id: "SEMANGGI", en: "CLOVER" },
    { emoji: "🌽", id: "JAGUNG", en: "CORN" },
    { emoji: "🌿", id: "DAUN", en: "LEAF" }
  ],

  buah: [
    { emoji: "🍎", id: "APEL", en: "APPLE" },
    { emoji: "🍌", id: "PISANG", en: "BANANA" },
    { emoji: "🍊", id: "JERUK", en: "ORANGE" },
    { emoji: "🍉", id: "SEMANGKA", en: "WATERMELON" },
    { emoji: "🍇", id: "ANGGUR", en: "GRAPES" },
    { emoji: "🍓", id: "STROBERI", en: "STRAWBERRY" },
    { emoji: "🍍", id: "NANAS", en: "PINEAPPLE" },
    { emoji: "🥭", id: "MANGGA", en: "MANGO" },
    { emoji: "🥑", id: "ALPUKAT", en: "AVOCADO" },
    { emoji: "🍐", id: "PIR", en: "PEAR" },
    { emoji: "🍒", id: "CERI", en: "CHERRY" },
    { emoji: "🥥", id: "KELAPA", en: "COCONUT" },
    { emoji: "🍅", id: "TOMAT", en: "TOMATO" },
    { emoji: "🍑", id: "PERSIK", en: "PEACH" },
    { emoji: "🥝", id: "KIWI", en: "KIWI" },
    { emoji: "🍋", id: "LEMON", en: "LEMON" }
  ],

  hewan: [
    { emoji: "🐱", id: "KUCING", en: "CAT" },
    { emoji: "🐶", id: "ANJING", en: "DOG" },
    { emoji: "🐘", id: "GAJAH", en: "ELEPHANT" },
    { emoji: "🦁", id: "SINGA", en: "LION" },
    { emoji: "🐵", id: "MONYET", en: "MONKEY" },
    { emoji: "🐦", id: "BURUNG", en: "BIRD" },
    { emoji: "🐟", id: "IKAN", en: "FISH" },
    { emoji: "🐢", id: "KURA-KURA", en: "TURTLE" },
    { emoji: "🐰", id: "KELINCI", en: "RABBIT" },
    { emoji: "🦋", id: "KUPU-KUPU", en: "BUTTERFLY" },
    { emoji: "🐴", id: "KUDA", en: "HORSE" },
    { emoji: "🐮", id: "SAPI", en: "COW" },
    { emoji: "🐔", id: "AYAM", en: "CHICKEN" },
    { emoji: "🦆", id: "BEBEK", en: "DUCK" },
    { emoji: "🐍", id: "ULAR", en: "SNAKE" },
    { emoji: "🦒", id: "JERAPAH", en: "GIRAFFE" },
    { emoji: "🦓", id: "ZEBRA", en: "ZEBRA" },
    { emoji: "🐸", id: "KATAK", en: "FROG" },
    { emoji: "🦀", id: "KEPITING", en: "CRAB" },
    { emoji: "🐝", id: "LEBAH", en: "BEE" },
    { emoji: "🐯", id: "HARIMAU", en: "TIGER" },
    { emoji: "🐼", id: "PANDA", en: "PANDA" }
  ],

  dino: [
    { art: "trex",        id: "TIRANOSAURUS", en: "T-REX" },
    { art: "triceratops", id: "TRICERATOPS", en: "TRICERATOPS" },
    { art: "stego",       id: "STEGOSAURUS", en: "STEGOSAURUS" },
    { art: "brachio",     id: "BRAKIOSAURUS", en: "BRACHIOSAURUS" },
    { art: "pachy",       id: "PAKISEFALOSAURUS", en: "PACHYCEPHALOSAURUS" },
    { art: "anky",        id: "ANKILOSAURUS", en: "ANKYLOSAURUS" },
    { art: "raptor",      id: "VELOCIRAPTOR", en: "VELOCIRAPTOR" },
    { art: "spino",       id: "SPINOSAURUS", en: "SPINOSAURUS" },
    { art: "para",        id: "PARASAUROLOFUS", en: "PARASAUROLOPHUS" },
    { art: "ptero",       id: "PTEROSAURUS", en: "PTEROSAUR" }
  ],

  /* simple words for reading (tile-spelling) */
  kata: [
    { emoji: "⚽", id: "BOLA", en: "BALL" },
    { emoji: "👁️", id: "MATA", en: "EYE" },
    { emoji: "📚", id: "BUKU", en: "BOOK" },
    { emoji: "🥛", id: "SUSU", en: "MILK" },
    { emoji: "🏠", id: "RUMAH", en: "HOUSE" },
    { emoji: "🔥", id: "API", en: "FIRE" },
    { emoji: "🍚", id: "NASI", en: "RICE" },
    { emoji: "🐟", id: "IKAN", en: "FISH" },
    { emoji: "🌙", id: "BULAN", en: "MOON" },
    { emoji: "⭐", id: "BINTANG", en: "STAR" },
    { emoji: "🦶", id: "KAKI", en: "FOOT" },
    { emoji: "🍞", id: "ROTI", en: "BREAD" },
    { emoji: "💧", id: "AIR", en: "WATER" },
    { emoji: "🐱", id: "KUCING", en: "CAT" },
    { emoji: "🚗", id: "MOBIL", en: "CAR" },
    { emoji: "🌸", id: "BUNGA", en: "FLOWER" }
  ],

  bendera: [
    { emoji: "🇮🇩", id: "INDONESIA", en: "INDONESIA" },
    { emoji: "🇲🇾", id: "MALAYSIA", en: "MALAYSIA" },
    { emoji: "🇸🇬", id: "SINGAPURA", en: "SINGAPORE" },
    { emoji: "🇯🇵", id: "JEPANG", en: "JAPAN" },
    { emoji: "🇰🇷", id: "KOREA", en: "KOREA" },
    { emoji: "🇨🇳", id: "TIONGKOK", en: "CHINA" },
    { emoji: "🇺🇸", id: "AMERIKA", en: "AMERICA" },
    { emoji: "🇬🇧", id: "INGGRIS", en: "BRITAIN" },
    { emoji: "🇫🇷", id: "PRANCIS", en: "FRANCE" },
    { emoji: "🇧🇷", id: "BRASIL", en: "BRAZIL" },
    { emoji: "🇦🇺", id: "AUSTRALIA", en: "AUSTRALIA" },
    { emoji: "🇮🇳", id: "INDIA", en: "INDIA" },
    { emoji: "🇸🇦", id: "ARAB SAUDI", en: "SAUDI ARABIA" },
    { emoji: "🇹🇭", id: "THAILAND", en: "THAILAND" },
    { emoji: "🇻🇳", id: "VIETNAM", en: "VIETNAM" },
    { emoji: "🇩🇪", id: "JERMAN", en: "GERMANY" },
    { emoji: "🇮🇹", id: "ITALIA", en: "ITALY" },
    { emoji: "🇪🇸", id: "SPANYOL", en: "SPAIN" },
    { emoji: "🇳🇱", id: "BELANDA", en: "NETHERLANDS" },
    { emoji: "🇹🇷", id: "TURKI", en: "TURKEY" }
  ],

  /* ---------- English Time themed sets ---------- */

  colors: [
    { emoji: "🔴", id: "MERAH", en: "RED" },
    { emoji: "🔵", id: "BIRU", en: "BLUE" },
    { emoji: "🟡", id: "KUNING", en: "YELLOW" },
    { emoji: "🟢", id: "HIJAU", en: "GREEN" },
    { emoji: "🟠", id: "ORANYE", en: "ORANGE" },
    { emoji: "🟣", id: "UNGU", en: "PURPLE" },
    { emoji: "🩷", id: "MERAH MUDA", en: "PINK" },
    { emoji: "⚫", id: "HITAM", en: "BLACK" },
    { emoji: "⚪", id: "PUTIH", en: "WHITE" },
    { emoji: "🟤", id: "COKELAT", en: "BROWN" }
  ],

  body: [
    { emoji: "👁️", id: "MATA", en: "EYE" },
    { emoji: "👂", id: "TELINGA", en: "EAR" },
    { emoji: "👃", id: "HIDUNG", en: "NOSE" },
    { emoji: "👄", id: "MULUT", en: "MOUTH" },
    { emoji: "✋", id: "TANGAN", en: "HAND" },
    { emoji: "🦶", id: "KAKI", en: "FOOT" },
    { emoji: "🦷", id: "GIGI", en: "TOOTH" },
    { emoji: "👅", id: "LIDAH", en: "TONGUE" }
  ],

  family: [
    { emoji: "👩", id: "IBU", en: "MOTHER" },
    { emoji: "👨", id: "AYAH", en: "FATHER" },
    { emoji: "👵", id: "NENEK", en: "GRANDMA" },
    { emoji: "👴", id: "KAKEK", en: "GRANDPA" },
    { emoji: "👶", id: "BAYI", en: "BABY" },
    { emoji: "👧", id: "KAKAK", en: "SISTER" },
    { emoji: "👦", id: "ADIK", en: "BROTHER" }
  ],

  greetings: [
    { emoji: "👋", id: "HALO", en: "HELLO" },
    { emoji: "🌅", id: "SELAMAT PAGI", en: "GOOD MORNING" },
    { emoji: "🌙", id: "SELAMAT MALAM", en: "GOOD NIGHT" },
    { emoji: "🙏", id: "TERIMA KASIH", en: "THANK YOU" },
    { emoji: "🥺", id: "TOLONG", en: "PLEASE" },
    { emoji: "😔", id: "MAAF", en: "SORRY" },
    { emoji: "👋", id: "SAMPAI JUMPA", en: "GOODBYE" }
  ],

  classroom: [
    { emoji: "📚", id: "BUKU", en: "BOOK" },
    { emoji: "✏️", id: "PENSIL", en: "PENCIL" },
    { emoji: "🎒", id: "TAS", en: "BAG" },
    { emoji: "✂️", id: "GUNTING", en: "SCISSORS" },
    { emoji: "🖍️", id: "KRAYON", en: "CRAYON" },
    { emoji: "📏", id: "PENGGARIS", en: "RULER" },
    { emoji: "🪑", id: "KURSI", en: "CHAIR" },
    { emoji: "🖊️", id: "PULPEN", en: "PEN" }
  ],

  /* ---------- Suku Kata (Indonesian syllable reading) ---------- */

  /* two-syllable picture words: suku = the syllable split */
  sukuWords: [
    { emoji: "👕", id: "BAJU", suku: ["BA", "JU"] },
    { emoji: "⚽", id: "BOLA", suku: ["BO", "LA"] },
    { emoji: "📚", id: "BUKU", suku: ["BU", "KU"] },
    { emoji: "👁️", id: "MATA", suku: ["MA", "TA"] },
    { emoji: "🦷", id: "GIGI", suku: ["GI", "GI"] },
    { emoji: "🦶", id: "KAKI", suku: ["KA", "KI"] },
    { emoji: "🥛", id: "SUSU", suku: ["SU", "SU"] },
    { emoji: "🍞", id: "ROTI", suku: ["RO", "TI"] },
    { emoji: "🐮", id: "SAPI", suku: ["SA", "PI"] },
    { emoji: "🌾", id: "PADI", suku: ["PA", "DI"] },
    { emoji: "🧢", id: "TOPI", suku: ["TO", "PI"] },
    { emoji: "🎲", id: "DADU", suku: ["DA", "DU"] },
    { emoji: "🎀", id: "PITA", suku: ["PI", "TA"] },
    { emoji: "🔥", id: "API", suku: ["A", "PI"] },
    { emoji: "👩", id: "IBU", suku: ["I", "BU"] }
  ],
  sukuWords3: [
    { emoji: "🧸", id: "BONEKA", suku: ["BO", "NE", "KA"] },
    { emoji: "🥥", id: "KELAPA", suku: ["KE", "LA", "PA"] },
    { emoji: "🙂", id: "KEPALA", suku: ["KE", "PA", "LA"] },
    { emoji: "🚲", id: "SEPEDA", suku: ["SE", "PE", "DA"] },
    { emoji: "👟", id: "SEPATU", suku: ["SE", "PA", "TU"] },
    { emoji: "🍌", id: "PISANG", suku: ["PI", "SANG"] },
    { emoji: "🐘", id: "GAJAH", suku: ["GA", "JAH"] }
  ],

  sentences: [
    { emoji: "👩🍚", id: "IBU MAKAN NASI", en: "MOTHER EATS RICE" },
    { emoji: "👦🥛", id: "ADIK MINUM SUSU", en: "BROTHER DRINKS MILK" },
    { emoji: "👨📚", id: "AYAH BACA BUKU", en: "FATHER READS A BOOK" },
    { emoji: "🐱🐟", id: "KUCING MAKAN IKAN", en: "THE CAT EATS FISH" },
    { emoji: "👧⚽", id: "KAKAK MAIN BOLA", en: "SISTER PLAYS BALL" },
    { emoji: "🐦🌳", id: "BURUNG DI POHON", en: "A BIRD IN THE TREE" },
    { emoji: "👶😴", id: "BAYI SEDANG TIDUR", en: "THE BABY IS SLEEPING" },
    { emoji: "🐶🏃", id: "ANJING BERLARI", en: "THE DOG IS RUNNING" }
  ],

  /* ---------- Shapes (drawn as SVG via shapeSVG) ---------- */
  shapes: [
    { art: "circle",    id: "LINGKARAN", en: "CIRCLE" },
    { art: "triangle",  id: "SEGITIGA", en: "TRIANGLE" },
    { art: "square",    id: "PERSEGI", en: "SQUARE" },
    { art: "rectangle", id: "PERSEGI PANJANG", en: "RECTANGLE" },
    { art: "star",      id: "BINTANG", en: "STAR" },
    { art: "heart",     id: "HATI", en: "HEART" },
    { art: "oval",      id: "OVAL", en: "OVAL" },
    { art: "diamond",   id: "BELAH KETUPAT", en: "DIAMOND" },
    { art: "pentagon",  id: "SEGILIMA", en: "PENTAGON" },
    { art: "hexagon",   id: "SEGIENAM", en: "HEXAGON" }
  ],

  /* pools used to build ABAB / AABB / ABC patterns and odd-one-out */
  patternPool: ["🍎", "🍌", "⭐", "❤️", "🐱", "🌸", "⚽", "🦕", "🌙", "🍓"],
  oddGroups: [
    { same: ["🍎", "🍌", "🍇", "🍓"], odd: "🚗" },
    { same: ["🐱", "🐶", "🐰", "🐮"], odd: "🌻" },
    { same: ["🚗", "🚲", "🚌", "✈️"], odd: "🍉" },
    { same: ["🌹", "🌻", "🌷", "🌺"], odd: "🐟" },
    { same: ["⚽", "🏀", "🎾", "⚾"], odd: "🦋" },
    { same: ["🦕", "🦖", "🐊", "🐢"], odd: "📚" },
    { same: ["👕", "👗", "🧢", "👟"], odd: "🍌" },
    { same: ["🥄", "🍽️", "🥣", "🍴"], odd: "🐘" }
  ],

  /* ---------- Feelings & habits (SEL) ---------- */
  feelings: [
    { face: "happy",     emoji: "😊", id: "SENANG", en: "HAPPY" },
    { face: "sad",       emoji: "😢", id: "SEDIH", en: "SAD" },
    { face: "angry",     emoji: "😠", id: "MARAH", en: "ANGRY" },
    { face: "scared",    emoji: "😨", id: "TAKUT", en: "SCARED" },
    { face: "surprised", emoji: "😲", id: "KAGET", en: "SURPRISED" },
    { face: "sleepy",    emoji: "😴", id: "NGANTUK", en: "SLEEPY" }
  ],

  habits: [
    {
      emoji: "🍽️",
      qid: "Sebelum makan, apa yang kita lakukan?", qen: "Before eating, what should we do?",
      okid: "CUCI TANGAN", oken: "WASH HANDS",
      badid: ["LANGSUNG MAKAN", "MAIN DULU"], baden: ["EAT RIGHT AWAY", "PLAY FIRST"]
    },
    {
      emoji: "🛏️",
      qid: "Sebelum tidur, apa yang kita lakukan?", qen: "Before bed, what should we do?",
      okid: "SIKAT GIGI", oken: "BRUSH TEETH",
      badid: ["MAKAN PERMEN", "NONTON TV"], baden: ["EAT CANDY", "WATCH TV"]
    },
    {
      emoji: "🧸",
      qid: "Selesai bermain, mainan harus di...", qen: "After playing, toys should be...",
      okid: "RAPIKAN", oken: "TIDIED UP",
      badid: ["BIARKAN SAJA", "SEMBUNYIKAN"], baden: ["LEFT ALONE", "HIDDEN"]
    },
    {
      emoji: "🏫",
      qid: "Mau bicara di kelas? Kita harus...", qen: "Want to speak in class? We should...",
      okid: "ANGKAT TANGAN", oken: "RAISE OUR HAND",
      badid: ["BERTERIAK", "BERDIRI DI MEJA"], baden: ["SHOUT", "STAND ON THE DESK"]
    },
    {
      emoji: "🎁",
      qid: "Diberi hadiah, kita bilang...", qen: "When given a gift, we say...",
      okid: "TERIMA KASIH", oken: "THANK YOU",
      badid: ["TIDAK MAU", "DIAM SAJA"], baden: ["NO WAY", "NOTHING"]
    },
    {
      emoji: "🗑️",
      qid: "Sampah harus dibuang ke...", qen: "Trash goes into the...",
      okid: "TEMPAT SAMPAH", oken: "TRASH BIN",
      badid: ["LANTAI", "BAWAH KASUR"], baden: ["FLOOR", "UNDER THE BED"]
    },
    {
      emoji: "🧒",
      qid: "Teman ingin pinjam mainan. Kita...", qen: "A friend wants to borrow a toy. We...",
      okid: "BERBAGI", oken: "SHARE",
      badid: ["SEMBUNYIKAN", "LARI"], baden: ["HIDE IT", "RUN AWAY"]
    },
    {
      emoji: "👩‍🏫",
      qid: "Bertemu ibu guru, kita...", qen: "When we meet the teacher, we...",
      okid: "MEMBERI SALAM", oken: "SAY HELLO",
      badid: ["PURA-PURA TIDAK LIHAT", "LARI"], baden: ["PRETEND NOT TO SEE", "RUN AWAY"]
    },
    {
      emoji: "🚻",
      qid: "Banyak yang antre. Kita harus...", qen: "There is a queue. We should...",
      okid: "MENUNGGU GILIRAN", oken: "WAIT OUR TURN",
      badid: ["MENYEROBOT", "MENANGIS"], baden: ["CUT IN LINE", "CRY"]
    },
    {
      emoji: "🤧",
      qid: "Saat bersin, kita menutup...", qen: "When sneezing, we cover our...",
      okid: "MULUT DAN HIDUNG", oken: "MOUTH AND NOSE",
      badid: ["MATA", "TELINGA"], baden: ["EYES", "EARS"]
    }
  ]
};

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const SYL_CONSONANTS = ["B", "C", "D", "G", "J", "K", "L", "M", "N", "P", "R", "S", "T"];
const SYL_VOWELS = ["A", "I", "U", "E", "O"];

/* Home-screen modules (titles come from i18n: t("modules.<key>")) */
const MODULES = [
  { key: "math",    icon: "🔢" },
  { key: "banding", icon: "⚖️" },
  { key: "bentuk",  icon: "🔺" },
  { key: "benda",   icon: "🪑" },
  { key: "tanaman", icon: "🌻" },
  { key: "buah",    icon: "🍉" },
  { key: "hewan",   icon: "🦁" },
  { key: "dino",    icon: "🦖" },
  { key: "baca",    icon: "🔤" },
  { key: "suku",    icon: "🗣️" },
  { key: "tulis",   icon: "✍️" },
  { key: "english", icon: "🇬🇧" },
  { key: "bendera", icon: "🌍" },
  { key: "memori",  icon: "🃏" },
  { key: "rasa",    icon: "😊" }
];

/* ---------- shape drawings ---------- */
function shapeSVG(art, color) {
  const c = color || "#7e57c2";
  const inner = {
    circle:    `<circle cx="70" cy="70" r="52" fill="${c}"/>`,
    oval:      `<ellipse cx="70" cy="70" rx="58" ry="38" fill="${c}"/>`,
    square:    `<rect x="20" y="20" width="100" height="100" rx="8" fill="${c}"/>`,
    rectangle: `<rect x="8" y="38" width="124" height="64" rx="8" fill="${c}"/>`,
    triangle:  `<path d="M70 14 L128 118 L12 118 Z" fill="${c}"/>`,
    diamond:   `<path d="M70 10 L124 70 L70 130 L16 70 Z" fill="${c}"/>`,
    star:      `<path d="M70 10 L84 52 L128 52 L93 78 L106 122 L70 95 L34 122 L47 78 L12 52 L56 52 Z" fill="${c}"/>`,
    heart:     `<path d="M70 122 C20 86 12 52 34 34 C50 22 66 30 70 44 C74 30 90 22 106 34 C128 52 120 86 70 122" fill="${c}"/>`,
    pentagon:  `<path d="M70 12 L126 55 L104 122 L36 122 L14 55 Z" fill="${c}"/>`,
    hexagon:   `<path d="M40 18 L100 18 L130 70 L100 122 L40 122 L10 70 Z" fill="${c}"/>`
  }[art] || "";
  return `<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
}
const SHAPE_COLORS = ["#7e57c2", "#ef5350", "#42a5f5", "#66bb6a", "#ffa726", "#ec407a", "#26a69a"];

/* Cute simplified dinosaur drawings (200x140 viewBox). */
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

/* Baby-dino color variants for the egg collection: hue-rotate filters */
const DINO_VARIANTS = [
  { hue: 0, rare: false }, { hue: 45, rare: false }, { hue: 90, rare: false },
  { hue: 180, rare: true }, { hue: 270, rare: true }
];
