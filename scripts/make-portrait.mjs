// Builds the site's About portrait from the untracked original.
// Usage: node scripts/make-portrait.mjs
// 4:5 portrait crop centred on the face (x~705). The owner explicitly approved this crop
// with NO blur: the pixels are the untouched original, only oriented, cropped and re-encoded.
import sharp from 'sharp';

const SRC = 'docs/ui/headshot.jpg';
const OUT = 'src/assets/portrait.jpg';
const crop = { left: 131, top: 191, width: 1148, height: 1435 };

const info = await sharp(SRC)
  .rotate()
  .extract(crop)
  .toColourspace('srgb')
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(OUT);
console.log(crop, info.width + 'x' + info.height, info.size + ' bytes');
