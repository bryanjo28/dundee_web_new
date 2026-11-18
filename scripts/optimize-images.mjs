// Optimize the site's photos: convert them to WebP, downscale them to the size
// they are actually rendered at, and generate the social preview image.
//
// Why this exists: `next.config.ts` uses `output: "export"` with
// `images.unoptimized`, so public/ files are shipped byte-for-byte. Any image
// that is too large stays too large in production.
//
// Outputs:
//   public/assets/food/*.webp            food photos
//   public/assets/location.webp          storefront photo
//   public/assets/logo-dundee.webp       header wordmark (rendered at 160x56)
//   public/assets/og-dundee.jpg          1200x630 social preview
//
// Safe to re-run: a job whose source has already been removed and whose output
// exists is skipped.
//
// Run: node scripts/optimize-images.mjs
import sharp from "sharp";
import { access, stat, unlink } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ASSETS = join(ROOT, "public/assets");
const FOOD = join(ASSETS, "food");

const exists = async (file) => {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
};

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

// width = the widest the image is displayed, x2 for high-density screens.
const jobs = [
  { name: "chicken-steak-hero", width: 1448 }, // hero: up to 720px wide
  { name: "chicken_steak", width: 1448 }, // hero fallback
  { name: "chicken balacan", width: 1200 }, // spotlight card
  { name: "chicken pepper", width: 1200 }, // spotlight card
  { name: "chicken cheese", width: 1000 }, // small card
  { name: "Chicken serundeng", width: 1000 },
  { name: "Cheese golden chick", width: 1000 },
  { name: "nasi goreng top", width: 1000 },
  { name: "Nasi udang", width: 1000 },
];

const slug = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

async function findSource(base) {
  for (const ext of [".png", ".jpg", ".jpeg"]) {
    const file = join(FOOD, `${base}${ext}`);
    if (await exists(file)) return file;
  }
  return null;
}

let saved = 0;

// Sources that were successfully converted, and can therefore be removed.
const converted = [];

for (const job of jobs) {
  const out = join(FOOD, `${slug(job.name)}.webp`);
  const src = await findSource(job.name);

  if (!src) {
    if (await exists(out)) {
      console.log(`skip   ${slug(job.name)}.webp (already optimized)`);
    } else {
      console.warn(`warn   no source found for "${job.name}"`);
    }
    continue;
  }

  const before = (await stat(src)).size;
  await sharp(src)
    .rotate()
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(out);
  const after = (await stat(out)).size;
  saved += before - after;
  converted.push(src);

  console.log(
    `ok     ${slug(job.name)}.webp  ${kb(before)} -> ${kb(after)}  (${job.width}px)`
  );
}

// Storefront photo. The source is only 448px wide and is displayed at 448px,
// so it is not downscaled, only re-encoded.
if (await exists(join(ASSETS, "location.png"))) {
  const src = join(ASSETS, "location.png");
  const out = join(ASSETS, "location.webp");
  const before = (await stat(src)).size;
  await sharp(src).webp({ quality: 82, effort: 6 }).toFile(out);
  const after = (await stat(out)).size;
  saved += before - after;
  converted.push(src);
  console.log(`ok     location.webp  ${kb(before)} -> ${kb(after)}`);
}

// Header wordmark. Rendered at 160x56 (128x44 on mobile), so 480px wide is
// enough for a 3x screen. Keeps transparency.
if (await exists(join(ASSETS, "logo-dundee-transparent.png"))) {
  const src = join(ASSETS, "logo-dundee-transparent.png");
  const out = join(ASSETS, "logo-dundee.webp");
  const before = (await stat(src)).size;
  await sharp(src)
    .resize({ width: 480, withoutEnlargement: true })
    .webp({ quality: 88, effort: 6, alphaQuality: 100 })
    .toFile(out);
  const after = (await stat(out)).size;
  saved += before - after;
  converted.push(src);
  console.log(`ok     logo-dundee.webp  ${kb(before)} -> ${kb(after)}`);
}

// Social preview: 1200x630, the size every chat app and social network expects.
// Cover-cropped food photo with the wordmark anchored bottom-left.
const ogHero = (await exists(join(FOOD, "chicken-steak-hero.webp")))
  ? join(FOOD, "chicken-steak-hero.webp")
  : join(FOOD, "chicken-steak-hero.png");

// The wordmark source may already have been removed by a previous run.
const ogLogoSource = (await exists(join(ASSETS, "logo-dundee-transparent.png")))
  ? join(ASSETS, "logo-dundee-transparent.png")
  : join(ASSETS, "logo-dundee.webp");

if (await exists(ogHero)) {
  const OG_WIDTH = 1200;
  const OG_HEIGHT = 630;
  const MARGIN = 56;
  const LOGO_WIDTH = 420;

  const logo = await sharp(ogLogoSource)
    .resize({ width: LOGO_WIDTH, withoutEnlargement: true })
    .toBuffer();

  const logoHeight = Math.round((LOGO_WIDTH / 1959) * 803);

  await sharp(ogHero)
    .resize(OG_WIDTH, OG_HEIGHT, { fit: "cover", position: "attention" })
    .composite([
      { input: logo, left: MARGIN, top: OG_HEIGHT - MARGIN - logoHeight },
    ])
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(join(ASSETS, "og-dundee.jpg"));

  const ogSize = (await stat(join(ASSETS, "og-dundee.jpg"))).size;
  console.log(`ok     og-dundee.jpg  ${OG_WIDTH}x${OG_HEIGHT}  ${kb(ogSize)}`);
}

// Drop the superseded originals so they stop shipping in the static export.
// Only files that were converted in this run are removed, so source assets kept
// outside public/ (such as scripts/source/dundee_logo.png, used by
// scripts/generate-icons.mjs) are never touched.
for (const src of converted) {
  await unlink(src);
  console.log(`rm     ${src.slice(ROOT.length + 1)}`);
}

console.log(`\nTotal saved: ${kb(saved)}`);
