import express from 'express';
import authHomeController from '../controllers/authHomeController.js';
import userController from '../controllers/userController.js';
import imageController from '../controllers/imageController.js';

const authenticatedUser = express.Router();

authenticatedUser.get('/', authHomeController.home);
authenticatedUser.get(
  '/deletelanguaje/:user.:initials',
  userController.deleteUserLanguaje
);
authenticatedUser.post('/addlanguaje', userController.addUserLanguaje);
authenticatedUser.get(
  '/deleteemployment/:employment.:user',
  userController.deleteUserEmployment
);
authenticatedUser.post('/addemployment', userController.addUserEmployment);
authenticatedUser.post(
  '/updateemploymentdata',
  userController.updateUserEmploymentData
);
authenticatedUser.post(
  '/updateuser',
  imageController.uploadFile.single('avatar'),
  userController.updateUserValidator,
  userController.updateUser
);
authenticatedUser.post(
  '/updatepassword',
  userController.updatePasswordValidator,
  userController.updatePassword
);

export default authenticatedUser;
