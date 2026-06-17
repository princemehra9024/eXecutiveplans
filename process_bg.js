import { Jimp } from 'jimp';

async function processImages() {
  try {
    // 1. Process Light Theme Image
    console.log("Processing light theme image...");
    const lightImg = await Jimp.read(process.argv[2]);
    lightImg.scan((x, y, idx) => {
      const r = lightImg.bitmap.data[idx + 0];
      const g = lightImg.bitmap.data[idx + 1];
      const b = lightImg.bitmap.data[idx + 2];
      const brightness = (r + g + b) / 3;
      
      // If pixel is not white (dark line), make it fully opaque black/dark
      // We use a threshold of 240 (anything darker than very light gray is a line)
      if (brightness < 240) {
        lightImg.bitmap.data[idx + 0] = 0;   // Black lines for max visibility
        lightImg.bitmap.data[idx + 1] = 0;
        lightImg.bitmap.data[idx + 2] = 0;
        lightImg.bitmap.data[idx + 3] = 255; // Fully opaque
      } else {
        lightImg.bitmap.data[idx + 3] = 0; // transparent
      }
    });
    await lightImg.write(process.argv[3]);
    console.log("Light theme image saved!");

    // 2. Process Dark Theme Image
    console.log("Processing dark theme image...");
    const darkImg = await Jimp.read(process.argv[4]);
    darkImg.scan((x, y, idx) => {
      const r = darkImg.bitmap.data[idx + 0];
      const g = darkImg.bitmap.data[idx + 1];
      const b = darkImg.bitmap.data[idx + 2];
      const brightness = (r + g + b) / 3;
      
      // If pixel is not black (light line), make it fully opaque white/light
      // We use a threshold of 30 (anything brighter than very dark gray is a line)
      if (brightness > 30) {
        darkImg.bitmap.data[idx + 0] = 255; // White lines for max visibility
        darkImg.bitmap.data[idx + 1] = 255;
        darkImg.bitmap.data[idx + 2] = 255;
        darkImg.bitmap.data[idx + 3] = 255; // Fully opaque
      } else {
        darkImg.bitmap.data[idx + 3] = 0; // transparent
      }
    });
    await darkImg.write(process.argv[5]);
    console.log("Dark theme image saved!");

  } catch (err) {
    console.error("Error processing images:", err);
  }
}

processImages();
