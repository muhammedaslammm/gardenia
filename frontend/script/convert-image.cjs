const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputFolder = path.resolve(__dirname, "../public/images");
const outputFolder = path.resolve(__dirname, "../public/compressed_images");

if (!fs.existsSync(outputFolder))
  fs.mkdirSync(outputFolder, { recursive: true });

fs.readdirSync(inputFolder).forEach((file) => {
  if (
    [".webp", ".avif", ".jpg", ".jpeg", "JPG"].some((format) =>
      file.endsWith(format)
    )
  ) {
    const inputPath = path.join(inputFolder, file);
    const outputPath = path.join(
      outputFolder,
      file.replace(/\.(jpeg|jpg|JPG|webp|avif)$/, ".webp")
    );

    sharp(inputPath)
      .webp({ quality: 78 })
      .toFile(outputPath)
      .then(() => console.log(`✅ Converted: ${file}`))
      .catch((err) => console.error(`❌ Error converting ${file}:`, err));
  }
});
