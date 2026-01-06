const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const imagesDir = path.join(__dirname, "../public/images");
const outputDir = imagesDir; // Save WebP files in the same directory

// Image files to convert
const imageFiles = [
  "typing.jpg",
  "telly.jpg",
  "graphicDesign.jpg",
  "excel.jpg",
  "AUTOCAD.jpeg",
  "ADCA.jpeg",
  "cscCenter.jpg",
  "coaching.jpg",
  "hardware.jpg",
  "dataEntry.jpg",
];

async function convertToWebP(inputPath, outputPath) {
  try {
    const inputFile = path.join(imagesDir, inputPath);
    const outputFile = path.join(outputDir, outputPath);

    // Check if input file exists
    if (!fs.existsSync(inputFile)) {
      console.log(`⚠️  File not found: ${inputPath}`);
      return false;
    }

    // Get original file size
    const originalStats = fs.statSync(inputFile);
    const originalSize = originalStats.size;

    // Convert to WebP with quality 80 (good balance between quality and size)
    await sharp(inputFile).webp({ quality: 80 }).toFile(outputFile);

    // Get converted file size
    const convertedStats = fs.statSync(outputFile);
    const convertedSize = convertedStats.size;
    const savings = (
      ((originalSize - convertedSize) / originalSize) *
      100
    ).toFixed(2);

    console.log(`✅ Converted: ${inputPath}`);
    console.log(`   Original: ${(originalSize / 1024).toFixed(2)} KB`);
    console.log(`   WebP: ${(convertedSize / 1024).toFixed(2)} KB`);
    console.log(`   Savings: ${savings}%`);
    console.log("");

    return true;
  } catch (error) {
    console.error(`❌ Error converting ${inputPath}:`, error.message);
    return false;
  }
}

async function main() {
  console.log("🖼️  Starting image conversion to WebP...\n");

  let successCount = 0;
  let failCount = 0;

  for (const imageFile of imageFiles) {
    // Get file extension
    const ext = path.extname(imageFile);
    const nameWithoutExt = path.basename(imageFile, ext);
    const webpFileName = `${nameWithoutExt}.webp`;

    const success = await convertToWebP(imageFile, webpFileName);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log("\n📊 Conversion Summary:");
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📁 Total: ${imageFiles.length}`);
}

main().catch(console.error);
