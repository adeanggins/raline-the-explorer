/* ============================================================
   Raline The Explorer — letter/number tracing (writing readiness)

   Glyphs live in a 100x140 box (baseline y=120).
   Each glyph = array of strokes; each stroke = array of commands:
     ["M",x,y] ["L",x,y] ["Q",cx,cy,x,y]
   The child traces on a canvas over a dashed guide with numbered
   stroke-start dots. Scoring = guide coverage vs stray drawing.
   ============================================================ */

const GLYPHS = {
  "0": [[["M",50,20],["Q",20,20,20,70],["Q",20,120,50,120],["Q",80,120,80,70],["Q",80,20,50,20]]],
  "1": [[["M",35,40],["L",55,20],["L",55,120]]],
  "2": [[["M",25,40],["Q",25,15,50,18],["Q",78,22,72,48],["Q",66,70,25,120],["L",80,120]]],
  "3": [[["M",25,32],["Q",60,8,68,40],["Q",70,62,45,68],["Q",75,70,72,98],["Q",66,130,22,110]]],
  "4": [[["M",60,20],["L",20,85],["L",80,85]],[["M",60,20],["L",60,120]]],
  "5": [[["M",75,20],["L",30,20],["L",28,65],["Q",55,55,68,75],["Q",80,100,60,113],["Q",38,125,25,105]]],
  "6": [[["M",70,25],["Q",30,15,25,75],["Q",22,120,52,120],["Q",78,118,75,92],["Q",72,68,48,70],["Q",30,73,25,88]]],
  "7": [[["M",20,20],["L",80,20],["L",45,120]]],
  "8": [[["M",50,68],["Q",20,60,25,38],["Q",30,15,50,20],["Q",72,15,75,38],["Q",78,60,50,68],["Q",15,78,22,100],["Q",28,124,50,120],["Q",75,124,78,100],["Q",83,78,50,68]]],
  "9": [[["M",72,48],["Q",75,20,50,20],["Q",25,20,27,45],["Q",29,70,52,70],["Q",72,70,72,48]],[["M",72,48],["L",70,120]]],

  "A": [[["M",15,120],["L",50,20]],[["M",50,20],["L",85,120]],[["M",27,85],["L",73,85]]],
  "B": [[["M",25,20],["L",25,120]],[["M",25,20],["Q",75,20,70,45],["Q",68,66,25,68]],[["M",25,68],["Q",80,70,78,95],["Q",76,120,25,120]]],
  "C": [[["M",78,32],["Q",15,15,15,70],["Q",15,125,78,108]]],
  "D": [[["M",25,20],["L",25,120]],[["M",25,20],["Q",85,25,85,70],["Q",85,115,25,120]]],
  "E": [[["M",75,20],["L",25,20],["L",25,120],["L",75,120]],[["M",25,70],["L",65,70]]],
  "F": [[["M",75,20],["L",25,20],["L",25,120]],[["M",25,70],["L",65,70]]],
  "G": [[["M",78,32],["Q",15,15,15,70],["Q",15,125,80,110],["L",80,75],["L",55,75]]],
  "H": [[["M",20,20],["L",20,120]],[["M",80,20],["L",80,120]],[["M",20,70],["L",80,70]]],
  "I": [[["M",30,20],["L",70,20]],[["M",50,20],["L",50,120]],[["M",30,120],["L",70,120]]],
  "J": [[["M",65,20],["L",65,95],["Q",65,122,42,120],["Q",25,118,25,100]]],
  "K": [[["M",25,20],["L",25,120]],[["M",78,20],["L",25,72]],[["M",40,60],["L",80,120]]],
  "L": [[["M",25,20],["L",25,120],["L",78,120]]],
  "M": [[["M",15,120],["L",15,20],["L",50,80],["L",85,20],["L",85,120]]],
  "N": [[["M",20,120],["L",20,20],["L",80,120],["L",80,20]]],
  "O": [[["M",50,20],["Q",15,20,15,70],["Q",15,120,50,120],["Q",85,120,85,70],["Q",85,20,50,20]]],
  "P": [[["M",25,20],["L",25,120]],[["M",25,20],["Q",82,20,82,48],["Q",82,75,25,75]]],
  "Q": [[["M",50,20],["Q",15,20,15,70],["Q",15,120,50,120],["Q",85,120,85,70],["Q",85,20,50,20]],[["M",60,95],["L",85,125]]],
  "R": [[["M",25,20],["L",25,120]],[["M",25,20],["Q",82,20,82,48],["Q",82,75,25,75]],[["M",45,75],["L",80,120]]],
  "S": [[["M",78,32],["Q",20,8,25,45],["Q",28,68,50,70],["Q",78,74,75,100],["Q",71,130,20,110]]],
  "T": [[["M",15,20],["L",85,20]],[["M",50,20],["L",50,120]]],
  "U": [[["M",20,20],["L",20,90],["Q",20,122,50,120],["Q",80,122,80,90],["L",80,20]]],
  "V": [[["M",15,20],["L",50,120],["L",85,20]]],
  "W": [[["M",10,20],["L",30,120],["L",50,55],["L",70,120],["L",90,20]]],
  "X": [[["M",20,20],["L",80,120]],[["M",80,20],["L",20,120]]],
  "Y": [[["M",20,20],["L",50,70],["L",50,120]],[["M",80,20],["L",50,70]]],
  "Z": [[["M",20,20],["L",80,20],["L",20,120],["L",80,120]]],

  "a": [[["M",68,88],["Q",68,58,45,60],["Q",22,62,24,90],["Q",26,120,48,118],["Q",68,116,68,90]],[["M",68,60],["L",68,120]]],
  "b": [[["M",25,20],["L",25,120]],[["M",25,88],["Q",28,58,50,62],["Q",75,66,73,90],["Q",71,118,48,118],["Q",28,118,25,100]]],
  "c": [[["M",70,72],["Q",60,56,42,62],["Q",22,68,24,90],["Q",26,115,45,118],["Q",62,120,70,106]]],
  "d": [[["M",72,20],["L",72,120]],[["M",72,88],["Q",69,58,47,62],["Q",22,66,24,90],["Q",26,118,49,118],["Q",69,118,72,100]]],
  "e": [[["M",25,88],["L",70,88],["Q",72,58,46,60],["Q",24,62,24,90],["Q",25,118,48,118],["Q",64,118,70,106]]],
  "f": [[["M",65,25],["Q",45,15,43,40],["L",43,120]],[["M",28,65],["L",62,65]]],
  "g": [[["M",68,88],["Q",68,58,45,60],["Q",22,62,24,90],["Q",26,118,48,116],["Q",68,114,68,90]],[["M",68,60],["L",68,122],["Q",68,142,45,138],["Q",32,136,30,128]]],
  "h": [[["M",25,20],["L",25,120]],[["M",25,80],["Q",35,58,52,62],["Q",68,66,68,85],["L",68,120]]],
  "i": [[["M",50,60],["L",50,120]],[["M",50,38],["L",50,42]]],
  "j": [[["M",55,60],["L",55,125],["Q",55,142,38,138]],[["M",55,38],["L",55,42]]],
  "k": [[["M",25,20],["L",25,120]],[["M",62,62],["L",25,92]],[["M",38,82],["L",66,120]]],
  "l": [[["M",50,20],["L",50,120]]],
  "m": [[["M",20,62],["L",20,120]],[["M",20,78],["Q",35,56,50,68],["L",50,120]],[["M",50,78],["Q",65,56,80,68],["L",80,120]]],
  "n": [[["M",25,62],["L",25,120]],[["M",25,78],["Q",40,56,58,66],["Q",68,72,68,86],["L",68,120]]],
  "o": [[["M",50,60],["Q",24,60,24,90],["Q",24,120,50,120],["Q",76,120,76,90],["Q",76,60,50,60]]],
  "p": [[["M",25,62],["L",25,140]],[["M",25,88],["Q",28,58,50,62],["Q",75,66,73,90],["Q",71,118,48,118],["Q",28,118,25,100]]],
  "q": [[["M",68,88],["Q",68,58,45,60],["Q",22,62,24,90],["Q",26,118,48,116],["Q",68,114,68,90]],[["M",68,62],["L",68,140]]],
  "r": [[["M",30,62],["L",30,120]],[["M",30,80],["Q",40,58,62,64]]],
  "s": [[["M",66,68],["Q",45,52,32,66],["Q",24,76,42,84],["Q",66,92,60,106],["Q",52,122,28,110]]],
  "t": [[["M",45,30],["L",45,105],["Q",45,122,62,118]],[["M",28,62],["L",66,62]]],
  "u": [[["M",25,60],["L",25,95],["Q",25,120,47,117],["Q",66,114,66,92],["L",66,60]],[["M",66,60],["L",66,120]]],
  "v": [[["M",25,60],["L",50,120],["L",75,60]]],
  "w": [[["M",15,60],["L",32,120],["L",50,80],["L",68,120],["L",85,60]]],
  "x": [[["M",25,60],["L",75,120]],[["M",75,60],["L",25,120]]],
  "y": [[["M",25,60],["L",50,110]],[["M",75,60],["L",40,138]]],
  "z": [[["M",28,60],["L",72,60],["L",28,120],["L",72,120]]]
};

/* what each Menulis tier practices */
const TRACE_SETS = {
  1: "0123456789".split(""),
  2: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  3: "abcdefghijklmnopqrstuvwxyz".split("")
};

/* sample a stroke's commands into dense points (glyph space) */
function strokePoints(stroke, step = 4) {
  const pts = [];
  let cur = null;
  const push = (p) => {
    if (!pts.length) return pts.push(p);
    const last = pts[pts.length - 1];
    if (Math.hypot(p.x - last.x, p.y - last.y) >= step) pts.push(p);
  };
  for (const cmd of stroke) {
    if (cmd[0] === "M") { cur = { x: cmd[1], y: cmd[2] }; pts.push(cur); }
    else if (cmd[0] === "L") {
      const to = { x: cmd[1], y: cmd[2] };
      const d = Math.hypot(to.x - cur.x, to.y - cur.y);
      const n = Math.max(1, Math.ceil(d / step));
      for (let i = 1; i <= n; i++) push({ x: cur.x + (to.x - cur.x) * i / n, y: cur.y + (to.y - cur.y) * i / n });
      cur = to;
    } else if (cmd[0] === "Q") {
      const [ , cx, cy, x1, y1] = cmd;
      const n = 24;
      for (let i = 1; i <= n; i++) {
        const u = i / n, v = 1 - u;
        push({ x: v * v * cur.x + 2 * v * u * cx + u * u * x1, y: v * v * cur.y + 2 * v * u * cy + u * u * y1 });
      }
      cur = { x: x1, y: y1 };
    }
  }
  return pts;
}

/* Create a tracer bound to a <canvas>. Returns { clear, score }. */
function createTracer(canvas, glyphChar) {
  const strokes = GLYPHS[glyphChar] || GLYPHS["O"];
  const guide = strokes.map(s => strokePoints(s));
  const allGuide = guide.flat();

  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;
  const scale = Math.min(W / 110, H / 150);
  const ox = (W - 100 * scale) / 2, oy = (H - 140 * scale) / 2;
  const gx = (p) => ({ x: p.x * scale + ox, y: p.y * scale + oy });

  let drawn = [];       // points in glyph space
  let drawing = false;

  function drawGuide() {
    ctx.clearRect(0, 0, W, H);
    /* writing lines (top, mid, baseline) like school paper */
    ctx.strokeStyle = "#e8def5"; ctx.lineWidth = 2; ctx.setLineDash([]);
    [20, 60, 120].forEach(y => {
      ctx.beginPath();
      ctx.moveTo(8, y * scale + oy); ctx.lineTo(W - 8, y * scale + oy);
      ctx.stroke();
    });
    /* dashed glyph guide */
    ctx.strokeStyle = "#b39ddb"; ctx.lineWidth = 10 * scale / 2.6;
    ctx.lineCap = "round"; ctx.lineJoin = "round";
    ctx.setLineDash([10, 10]);
    guide.forEach(pts => {
      ctx.beginPath();
      pts.forEach((p, i) => { const q = gx(p); i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y); });
      ctx.stroke();
    });
    ctx.setLineDash([]);
    /* numbered start dots */
    guide.forEach((pts, i) => {
      const q = gx(pts[0]);
      ctx.fillStyle = "#66bb6a";
      ctx.beginPath(); ctx.arc(q.x, q.y, 13, 0, 7); ctx.fill();
      ctx.fillStyle = "#fff"; ctx.font = "bold 15px sans-serif";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(String(i + 1), q.x, q.y + 1);
    });
  }

  function repaint() {
    drawGuide();
    /* child's crayon strokes */
    ctx.strokeStyle = "#f06292"; ctx.lineWidth = 12 * scale / 2.6;
    ctx.lineCap = "round"; ctx.lineJoin = "round";
    let started = false;
    ctx.beginPath();
    drawn.forEach(p => {
      if (p === null) { started = false; return; }
      const q = gx(p);
      if (!started) { ctx.moveTo(q.x, q.y); started = true; }
      else ctx.lineTo(q.x, q.y);
    });
    ctx.stroke();
  }

  function toGlyph(ev) {
    const r = canvas.getBoundingClientRect();
    const cx = (ev.clientX - r.left) * (W / r.width);
    const cy = (ev.clientY - r.top) * (H / r.height);
    return { x: (cx - ox) / scale, y: (cy - oy) / scale };
  }

  canvas.onpointerdown = (e) => { drawing = true; canvas.setPointerCapture(e.pointerId); drawn.push(toGlyph(e)); repaint(); e.preventDefault(); };
  canvas.onpointermove = (e) => { if (!drawing) return; drawn.push(toGlyph(e)); repaint(); e.preventDefault(); };
  canvas.onpointerup = canvas.onpointercancel = () => { drawing = false; drawn.push(null); };

  drawGuide();

  return {
    clear() { drawn = []; drawGuide(); },
    hasInk() { return drawn.filter(Boolean).length > 4; },
    /* 0..3 stars */
    score() {
      const ink = drawn.filter(Boolean);
      if (ink.length < 5) return 0;
      const near = (p, pts, tol) => pts.some(q => Math.hypot(p.x - q.x, p.y - q.y) <= tol);
      const covered = allGuide.filter(p => near(p, ink, 14)).length / allGuide.length;
      const stray = ink.filter(p => !near(p, allGuide, 20)).length / ink.length;
      if (covered >= 0.85 && stray <= 0.3) return 3;
      if (covered >= 0.6 && stray <= 0.5) return 2;
      if (covered >= 0.35) return 1;
      return 0;
    }
  };
}
