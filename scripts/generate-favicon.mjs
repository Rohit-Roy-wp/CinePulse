/**
 * Script to convert icon.png -> proper favicon.ico using sharp
 * Run: node scripts/generate-favicon.mjs
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");

const inputFile = path.join(projectRoot, "src", "app", "icon.png");
const outputDir = path.join(projectRoot, "src", "app");
const publicDir = path.join(projectRoot, "public");

async function generateFavicons() {
  console.log("🎬 Generating favicons for The Cineverse...\n");

  // 1. Generate 32x32 PNG for icon.png (Next.js App Router)
  await sharp(inputFile)
    .resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(outputDir, "icon-32.png"));
  console.log("✅ Generated icon-32.png (32x32)");

  // 2. Generate 16x16 for small display
  const buf16 = await sharp(inputFile)
    .resize(16, 16, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  console.log("✅ Generated 16x16 buffer");

  // 3. Generate 32x32
  const buf32 = await sharp(inputFile)
    .resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  console.log("✅ Generated 32x32 buffer");

  // 4. Generate 48x48 (Google Search uses this)
  const buf48 = await sharp(inputFile)
    .resize(48, 48, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  console.log("✅ Generated 48x48 buffer");

  // 5. Write proper ICO file (ICO format with 16x16, 32x32, 48x48)
  const icoBuffer = createIco([buf16, buf32, buf48]);
  const icoPath = path.join(outputDir, "favicon.ico");
  fs.writeFileSync(icoPath, icoBuffer);
  console.log(`✅ Written proper favicon.ico (${icoBuffer.length} bytes) to src/app/`);

  // Also copy to public/
  fs.copyFileSync(icoPath, path.join(publicDir, "favicon.ico"));
  console.log("✅ Copied favicon.ico to public/\n");

  // 6. Generate apple-icon (180x180)
  await sharp(inputFile)
    .resize(180, 180, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(outputDir, "apple-icon.png"));
  console.log("✅ Generated apple-icon.png (180x180)");

  // Also copy to public/
  fs.copyFileSync(
    path.join(outputDir, "apple-icon.png"),
    path.join(publicDir, "apple-touch-icon.png")
  );
  console.log("✅ Copied apple-touch-icon.png to public/\n");

  console.log("🎉 All favicons generated successfully!");
}

/**
 * Create a proper ICO file from an array of PNG buffers.
 * ICO format: https://en.wikipedia.org/wiki/ICO_(file_format)
 */
function createIco(pngBuffers) {
  const numImages = pngBuffers.length;
  const headerSize = 6;          // ICONDIR
  const dirEntrySize = 16;       // ICONDIRENTRY per image
  const dataOffset = headerSize + dirEntrySize * numImages;

  // Get dimensions from PNG headers
  const images = pngBuffers.map((buf) => {
    const width = buf.readUInt32BE(16);
    const height = buf.readUInt32BE(20);
    return { buf, width, height };
  });

  const totalSize = dataOffset + images.reduce((sum, img) => sum + img.buf.length, 0);
  const ico = Buffer.alloc(totalSize);

  // ICONDIR header
  ico.writeUInt16LE(0, 0);        // Reserved
  ico.writeUInt16LE(1, 2);        // Type: 1 = ICO
  ico.writeUInt16LE(numImages, 4); // Number of images

  let dirOffset = headerSize;
  let dataOffsetCurrent = dataOffset;

  for (const img of images) {
    const w = img.width >= 256 ? 0 : img.width;
    const h = img.height >= 256 ? 0 : img.height;

    ico.writeUInt8(w, dirOffset);              // Width
    ico.writeUInt8(h, dirOffset + 1);          // Height
    ico.writeUInt8(0, dirOffset + 2);          // Color count (0 = no palette)
    ico.writeUInt8(0, dirOffset + 3);          // Reserved
    ico.writeUInt16LE(1, dirOffset + 4);       // Color planes
    ico.writeUInt16LE(32, dirOffset + 6);      // Bits per pixel
    ico.writeUInt32LE(img.buf.length, dirOffset + 8);  // Size of image data
    ico.writeUInt32LE(dataOffsetCurrent, dirOffset + 12); // Offset of image data

    dirOffset += dirEntrySize;
    img.buf.copy(ico, dataOffsetCurrent);
    dataOffsetCurrent += img.buf.length;
  }

  return ico;
}

generateFavicons().catch(console.error);
