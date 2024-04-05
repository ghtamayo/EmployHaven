import sharp from 'sharp';
import path from 'path';

import __dirname from '../utils.js';

let folder = __dirname + '/public/img/uploads';
let targetWidth = 320;

const optimizeImage = async (fileName) => {
  try {
    let fileMeta = path.parse(fileName);

    let targetFileName = `opt_${fileMeta.name}.webp`;

    let inputPath = `${folder}/${fileName}`;
    let outputPath = `${folder}/${targetFileName}`;

    await sharp(inputPath)
      .resize(targetWidth)
      .webp({ quality: 80 })
      .toFile(outputPath);

    console.log(`Se ha optimizado la imagen: ${fileName}`);

    // return outputPath;
    return targetFileName;
  } catch (err) {
    console.error(err);
  }
};

export default optimizeImage;
