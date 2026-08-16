// scripts/optimize-images.js
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

async function optimizeFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return;

  const stat = fs.statSync(filePath);
  // Only optimize files larger than 80 KB
  if (stat.size < 80 * 1024) return;

  const tmpPath = filePath + ".tmp";
  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    let transform = sharp(filePath);
    if (metadata.width && metadata.width > 1600) {
      transform = transform.resize({ width: 1600, withoutEnlargement: true });
    }

    if (ext === ".png") {
      if (filePath.includes("whatsapp-logo")) {
        transform = transform.resize({ width: 128, height: 128, fit: "contain" }).png({ quality: 85, compressionLevel: 9 });
      } else {
        transform = transform.png({ quality: 85, compressionLevel: 9 });
      }
    } else {
      transform = transform.jpeg({ quality: 82, mozjpeg: true });
    }

    await transform.toFile(tmpPath);
    const newStat = fs.statSync(tmpPath);

    if (newStat.size < stat.size) {
      fs.unlinkSync(filePath);
      fs.renameSync(tmpPath, filePath);
      console.log(`Optimized ${filePath}: ${(stat.size/1024).toFixed(0)}KB -> ${(newStat.size/1024).toFixed(0)}KB`);
    } else {
      fs.unlinkSync(tmpPath);
    }
  } catch (err) {
    if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
    console.error(`Failed to optimize ${filePath}:`, err.message);
  }
}

async function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkDir(full);
    } else {
      await optimizeFile(full);
    }
  }
}

(async () => {
  console.log("Starting image optimization on public/...");
  await walkDir(path.join(__dirname, "../public"));
  console.log("Finished image optimization!");
})();
