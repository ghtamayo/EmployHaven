import express from 'express';
import authController from '../controllers/authController.js';
import imageController from '../controllers/imageController.js';
import { body } from 'express-validator';
import userRepository from '../repositories/userRepository.js';

const loginValidator = [
  // Validar los campos del formulario utilizando express-validator
  body('user')
    .trim()
    .isLength({ min: 6 })
    .withMessage('User must be almost 6 char!'),
  body('password')
    .isStrongPassword({ minLength: 8 })
    .withMessage('Write strong password!'),
];

const authenticator = express.Router();

authenticator.get('/login', authController.newLogin);
authenticator.post('/login', loginValidator, authController.login);
authenticator.get('/logout', authController.logout);
authenticator.get('/register', authController.newRegister);
authenticator.post(
  '/register',
  imageController.uploadFile.single('avatar'),
  authController.registerValidator,
  authController.register
);
authenticator.get('/users', authController.users);

export default authenticator;
