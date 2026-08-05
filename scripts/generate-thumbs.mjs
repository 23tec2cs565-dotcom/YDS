import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const TARGET_DIR = path.join(ROOT, "public", "assets", "optimized");
const SIZES = [480, 768];
const VALID_EXT = new Set([".jpg", ".jpeg", ".png"]);

async function walk(dir, list = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, list);
    } else {
      list.push(full);
    }
  }
  return list;
}

function buildOutPath(srcPath, size) {
  return srcPath.replace("-1024", `-${size}`);
}

async function ensureThumb(srcPath, size) {
  const outPath = buildOutPath(srcPath, size);
  try {
    await fs.access(outPath);
    return { outPath, created: false };
  } catch {
    // continue
  }

  const ext = path.extname(srcPath).toLowerCase();
  const base = sharp(srcPath).resize({ width: size, withoutEnlargement: true });
  if (ext === ".png") {
    await base.png({ compressionLevel: 9 }).toFile(outPath);
  } else {
    await base.jpeg({ quality: 80, mozjpeg: true }).toFile(outPath);
  }
  return { outPath, created: true };
}

async function main() {
  try {
    const all = await walk(TARGET_DIR);
    const candidates = all.filter((p) => {
      const ext = path.extname(p).toLowerCase();
      const name = path.basename(p).toLowerCase();
      return VALID_EXT.has(ext) && name.includes("-1024");
    });

    let createdCount = 0;
    for (const src of candidates) {
      for (const size of SIZES) {
        const { created } = await ensureThumb(src, size);
        if (created) createdCount += 1;
      }
    }

    console.log(`Processed ${candidates.length} source images.`);
    console.log(`Created ${createdCount} thumbnails.`);
  } catch (err) {
    console.error("Thumbnail generation failed:", err);
    process.exit(1);
  }
}

main();
