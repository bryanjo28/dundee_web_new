// Measure the circular badge in the Dundee logo properly: threshold the mark,
// then take a per-row/per-column ink profile to find the outer circle bounds.
import sharp from "sharp";

const SRC = "public/assets/dundee_logo.png";
const S = 1024; // working resolution for measurement

const meta = await sharp(SRC).metadata();
const { data } = await sharp(SRC)
  .resize(S, S, { fit: "fill" })
  .flatten({ background: "#ffffff" })
  .raw()
  .toBuffer({ resolveWithObject: true });

const isInk = (x, y) => {
  const i = (y * S + x) * 3;
  return data[i] < 232 || data[i + 1] < 232 || data[i + 2] < 232;
};

// Full ink bounding box of the whole mark
let minX = S, minY = S, maxX = -1, maxY = -1;
for (let y = 0; y < S; y++) {
  for (let x = 0; x < S; x++) {
    if (!isInk(x, y)) continue;
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
}
console.log(`ink bbox @${S}: x ${minX}..${maxX} (${maxX - minX + 1})  y ${minY}..${maxY} (${maxY - minY + 1})`);

// Row profile: how many ink pixels per row, and the row span (left/right edge)
const rows = [];
for (let y = minY; y <= maxY; y++) {
  let count = 0, first = -1, last = -1;
  for (let x = 0; x < S; x++) {
    if (isInk(x, y)) {
      count++;
      if (first < 0) first = x;
      last = x;
    }
  }
  rows.push({ y, count, span: last - first + 1, first, last });
}

const widest = rows.reduce((a, b) => (b.span > a.span ? b : a));
console.log(`widest row y=${widest.y} span=${widest.span} (${widest.first}..${widest.last})`);

// Column profile for the vertical extremes
let tallest = { span: 0, x: 0 };
for (let x = minX; x <= maxX; x++) {
  let count = 0;
  for (let y = 0; y < S; y++) if (isInk(x, y)) count++;
  if (count > tallest.span) tallest = { span: count, x };
}
console.log(`tallest column x=${tallest.x} span=${tallest.span}`);

// Dump a coarse profile so the shape is visible as numbers
console.log("\nrow profile (every 8th row): y, ink count, span");
for (let i = 0; i < rows.length; i += 8) {
  const r = rows[i];
  const bar = "#".repeat(Math.round((r.span / widest.span) * 40));
  console.log(`${String(r.y).padStart(4)}  ${String(r.count).padStart(4)}  ${String(r.span).padStart(4)}  ${bar}`);
}

// Circle geometry: top/bottom on the vertical centre line, left/right on the horizontal centre line
const cx = Math.round((widest.first + widest.last) / 2);
let topOnCx = -1, bottomOnCx = -1;
for (let y = 0; y < S; y++) if (isInk(cx, y)) { topOnCx = y; break; }
for (let y = S - 1; y >= 0; y--) if (isInk(cx, y)) { bottomOnCx = y; break; }

console.log(`\ncircle centre column x=${cx}`);
console.log(`top=${topOnCx} bottom=${bottomOnCx} vertical diameter=${bottomOnCx - topOnCx + 1}`);
console.log(`horizontal diameter=${widest.span}`);
console.log(`circle centre ~ (${cx}, ${Math.round((topOnCx + bottomOnCx) / 2)}) @${S}`);

const k = meta.width / S;
console.log(`\nscale to source (x${k.toFixed(4)}):`);
console.log(`  centre = (${(cx * k).toFixed(1)}, ${(((topOnCx + bottomOnCx) / 2) * k).toFixed(1)})`);
console.log(`  diameter ≈ ${(Math.max(widest.span, bottomOnCx - topOnCx + 1) * k).toFixed(1)}px`);
