// Generate the full Dundee favicon / app-icon set from the real logo badge.
//
// Sources:
//   public/assets/dundee_logo.png  -> square badge, used for the icon mark
// Geometry measured by scripts/measure-badge.mjs (circle centre 628,632; d=1218 on 1254px).
//
// Outputs (Favicon + PWA + platform):
//   app/icon.png                      512px  (Next.js file convention: <link rel="icon">)
//   app/apple-icon.png                180px  (Next.js file convention: apple-touch-icon)
//   app/favicon.ico                   16/32/48 multi-size
//   public/icon-192.png, icon-512.png        PWA manifest
//   public/icon-maskable-512.png             PWA maskable (extra safe padding)
//
// Run: node scripts/generate-icons.mjs
import sharp from "sharp";
import { mkdirSync, existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "public/assets/dundee_logo.png");

const CENTER = { x: 628, y: 632 };
const DIAMETER = 1218;
const CANVAS = 1254;

// Background behind the badge. The logo art is on white; the site paper is #F7F3EA,
// which blends far better in a browser tab than a hard white square.
const PAPER = "#F7F3EA";
const NAVY = "#142345";

/**
 * Crop a square around the badge, centred, with `inset` controlling how much of the
 * tile the badge occupies (1.0 = fills the tile edge to edge).
 *
 * `flatten` composites onto an opaque background (for tile backgrounds); leaving it
 * off keeps the alpha channel. Next.js's ICO decoder requires RGBA PNG entries, so
 * every buffer returned here has 4 channels.
 */
async function badgeTile(size, inset, flattenBackground) {
  const crop = Math.min(Math.round(DIAMETER * inset), CANVAS);
  const left = Math.round(Math.min(Math.max(CENTER.x - crop / 2, 0), CANVAS - crop));
  const top = Math.round(Math.min(Math.max(CENTER.y - crop / 2, 0), CANVAS - crop));

  let img = sharp(SRC).extract({ left, top, width: crop, height: crop });
  img = flattenBackground
    ? img.flatten({ background: flattenBackground }) // drops alpha
    : img.ensureAlpha();
  // .png() on an RGB pipeline still emits 3 channels, which the ICO decoder rejects.
  return img.resize(size, size, { fit: "fill" }).ensureAlpha().png().toBuffer();
}

/**
 * Minimal multi-size .ico writer. Every entry is PNG-encoded, which is supported by
 * every browser that matters today (IE11+ / all evergreen browsers, Windows Vista+).
 */
function buildIco(entries) {
  const count = entries.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);

  let offset = 6 + count * 16;
  const directory = Buffer.alloc(count * 16);
  for (let i = 0; i < count; i++) {
    const { size, data } = entries[i];
    const o = i * 16;
    directory.writeUInt8(size >= 256 ? 0 : size, o + 0); // width
    directory.writeUInt8(size >= 256 ? 0 : size, o + 1); // height
    directory.writeUInt8(0, o + 2); // palette colours
    directory.writeUInt8(0, o + 3); // reserved
    directory.writeUInt16LE(1, o + 4); // colour planes
    directory.writeUInt16LE(32, o + 6); // bits per pixel
    directory.writeUInt32LE(data.length, o + 8);
    directory.writeUInt32LE(offset, o + 12);
    offset += data.length;
  }
  return Buffer.concat([header, directory, ...entries.map((e) => e.data)]);
}

/** Verify an .ico header/directory is internally consistent before writing it. */
function verifyIco(buf, expectedSizes) {
  const type = buf.readUInt16LE(2);
  const count = buf.readUInt16LE(4);
  if (type !== 1) throw new Error(`ico type is ${type}, expected 1`);
  if (count !== expectedSizes.length) throw new Error(`ico has ${count} entries, expected ${expectedSizes.length}`);

  let end = 6 + count * 16;
  for (let i = 0; i < count; i++) {
    // The directory starts after the 6-byte ICONDIR header.
    const o = 6 + i * 16;
    // A stored byte of 0 means 256 in the ICO format, so only 0 maps to 256.
    const rawW = buf.readUInt8(o);
    const w = rawW === 0 ? 256 : rawW;
    const len = buf.readUInt32LE(o + 8);
    const off = buf.readUInt32LE(o + 12);
    if (w !== expectedSizes[i]) throw new Error(`entry ${i} is ${w}px, expected ${expectedSizes[i]}px`);
    if (off < end) throw new Error(`entry ${i} offset ${off} overlaps the directory`);
    if (off + len > buf.length) throw new Error(`entry ${i} runs past end of file`);
    if (buf.readUInt32BE(off) !== 0x89504e47) throw new Error(`entry ${i} is not a PNG`);
    // IHDR colour type lives at byte 25 of the PNG; 6 = RGBA. Next.js's ICO decoder
    // rejects anything else ("The PNG is not in RGBA format!").
    const colourType = buf.readUInt8(off + 25);
    if (colourType !== 6) {
      throw new Error(`entry ${i} PNG colour type is ${colourType}, expected 6 (RGBA)`);
    }
    end = off + len;
  }
  return true;
}

async function main() {
  // --- 1. Next.js file conventions (app/) -------------------------------------
  // Slightly tighter inset than the PWA icons: browser tabs draw at 16px.
  const iconTile = await badgeTile(512, 0.9, PAPER);
  const appleTile = await badgeTile(180, 0.86, PAPER);

  await sharp(iconTile).toFile(join(ROOT, "app/icon.png"));
  await sharp(appleTile).toFile(join(ROOT, "app/apple-icon.png"));

  // --- 2. favicon.ico (classic /favicon.ico request every browser makes) ------
  const icoSizes = [16, 32, 48];
  const icoEntries = [];
  for (const size of icoSizes) {
    // Smaller sizes need the badge a touch larger so the ring stays readable.
    const inset = size <= 16 ? 0.98 : size <= 32 ? 0.94 : 0.9;
    icoEntries.push({ size, data: await badgeTile(size, inset, PAPER) });
  }
  const ico = buildIco(icoEntries);
  verifyIco(ico, icoSizes);
  const icoPath = join(ROOT, "app/favicon.ico");
  const hadIco = existsSync(icoPath);
  const before = hadIco ? readFileSync(icoPath).length : 0;
  const { writeFileSync } = await import("node:fs");
  writeFileSync(icoPath, ico);
  console.log(`app/favicon.ico        ${icoSizes.join("/")}px  ${ico.length} bytes (was ${before})`);

  // --- 3. PWA / web app manifest icons ---------------------------------------
  await sharp(await badgeTile(192, 0.9, PAPER)).toFile(join(ROOT, "public/icon-192.png"));
  await sharp(await badgeTile(512, 0.9, PAPER)).toFile(join(ROOT, "public/icon-512.png"));

  // Maskable icons get cropped to a circle by Android: keep the badge inside the
  // safe zone (80% of the tile) so the ring is never clipped.
  const maskable = await sharp({
    create: { width: 512, height: 512, channels: 4, background: NAVY },
  })
    .composite([{ input: await badgeTile(512, 0.72, null), blend: "over" }])
    .png()
    .toBuffer();
  await sharp(maskable).toFile(join(ROOT, "public/icon-maskable-512.png"));

  const written = [
    "app/icon.png",
    "app/apple-icon.png",
    "app/favicon.ico",
    "public/icon-192.png",
    "public/icon-512.png",
    "public/icon-maskable-512.png",
  ];

  const failures = [];
  for (const rel of written) {
    const p = join(ROOT, rel);
    const bytes = readFileSync(p).length;
    if (rel.endsWith(".ico")) {
      // verifyIco already threw if the directory or entries were malformed.
      console.log(`${rel.padEnd(30)} ico multi-size             ${bytes} bytes`);
      continue;
    }
    const m = await sharp(p).metadata();
    if (m.format !== "png") failures.push(`${rel}: format is ${m.format}, expected png`);
    if (m.channels !== 4) failures.push(`${rel}: ${m.channels} channels, expected 4 (RGBA)`);
    console.log(`${rel.padEnd(30)} ${m.width}x${m.height} ${m.format} ch=${m.channels}  ${bytes} bytes`);
  }

  if (failures.length) {
    throw new Error(`icon verification failed:\n  - ${failures.join("\n  - ")}`);
  }
  console.log("\nAll icons verified (multi-size ICO + RGBA PNGs).");
}

await main();
