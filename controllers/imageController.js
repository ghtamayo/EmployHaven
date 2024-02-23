import multer from 'multer';
import __dirname from '../utils.js';
import path from 'path';

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('Please upload only images.', false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/uploads/');
  },
  filename: (req, file, cb) => {
    let fileMeta = path.parse(file.originalname);
    cb(
      null,
      `${fileMeta.name}-${Date.now()}-${Math.round(Math.random() * 1e9)}${
        fileMeta.ext
      }`
    );
  },
});

const uploadFile = multer({ storage: storage, fileFilter: imageFilter });

export default { uploadFile };
