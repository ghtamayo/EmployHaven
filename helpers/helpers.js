import fs from 'fs';

const validationFormResult = (body, validationResult) => {
  if (!body) return [];

  if (!validationResult) return [];

  const properties = Object.keys(body);
  let result = properties.map((prop) => {
    let error = validationResult.find((element) => element.path === prop);
    if (error) {
      return { body: prop, msg: error.msg };
    } else {
      return { body: prop, msg: null };
    }
  });
  return result;
};

export const startUpper = (str) => {
  if (typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const deleteImages = (images) => {
  images.forEach((imagepath) => {
    fs.unlink(imagepath, async (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error al leer el archivo de imagen.');
      } else {
        console.log('File removed');
      }
    });
  });
};

export default validationFormResult;
