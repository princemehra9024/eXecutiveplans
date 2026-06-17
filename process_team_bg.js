import { Jimp } from 'jimp';

async function processImages() {
  try {
    const images = [
      [process.argv[2], process.argv[3]],
      [process.argv[4], process.argv[5]],
      [process.argv[6], process.argv[7]],
      [process.argv[8], process.argv[9]]
    ];

    for (let i = 0; i < images.length; i++) {
      const [inputPath, outputPath] = images[i];
      console.log(`Processing image ${i + 1}...`);
      const img = await Jimp.read(inputPath);
      img.scan((x, y, idx) => {
        const r = img.bitmap.data[idx + 0];
        const g = img.bitmap.data[idx + 1];
        const b = img.bitmap.data[idx + 2];
        const brightness = (r + g + b) / 3;
        
        // Threshold for dark lines
        if (brightness < 240) {
          img.bitmap.data[idx + 0] = 0;   
          img.bitmap.data[idx + 1] = 0;
          img.bitmap.data[idx + 2] = 0;
          img.bitmap.data[idx + 3] = 255; 
        } else {
          img.bitmap.data[idx + 3] = 0; // transparent
        }
      });
      await img.write(outputPath);
      console.log(`Saved ${outputPath}`);
    }
  } catch (err) {
    console.error("Error processing images:", err);
  }
}

processImages();
