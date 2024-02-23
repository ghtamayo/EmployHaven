import express from 'express';
import authController from '../controllers/authController.js';
import imageController from '../controllers/imageController.js';

const userRouter = express.Router();

userRouter.get('/login', authController.newLogin);
userRouter.post('/login', authController.login);
userRouter.post('/logout', authController.logout);
userRouter.get('/register', authController.newRegister);
userRouter.post(
  '/register',
  imageController.uploadFile.single('avatar'),
  authController.register
);
userRouter.get('/users', authController.users);

export default userRouter;
