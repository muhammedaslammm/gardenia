const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputFolder = path.resolve(__dirname, "../public/raw");
const outputFolder = path.resolve(__dirname, "../public/images");

if (!fs.existsSync(outputFolder))
  fs.mkdirSync(outputFolder, { recursive: true });

fs.readdirSync(inputFolder).forEach((file) => {
  if (file.endsWith(".jpg")) {
    const inputPath = path.join(inputFolder, file);
    const outputPath = path.join(outputFolder, file.replace(".jpg", ".webp"));

    sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath)
      .then(() => console.log(`✅ Converted: ${file}`))
      .catch((err) => console.error(`❌ Error converting ${file}:`, err));
  }
});
