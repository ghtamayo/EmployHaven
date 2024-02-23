import express from 'express';
import authController from '../controllers/authController.js';
import imageController from '../controllers/imageController.js';
import { body } from 'express-validator';

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

const registerValidator = [
  // Validar los campos del formulario utilizando express-validator
  body('user')
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage('User must be atlist 6 to 20!'),
  body('email').isEmail().withMessage('Type an email!'),
  body('fullname').trim().notEmpty().withMessage('Write full name!'),
  body('password')
    .isStrongPassword({ minLength: 8 })
    .withMessage('Write strong password!'),
  body('repassword')
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
  registerValidator,
  authController.register
);
authenticator.get('/users', authController.users);

export default authenticator;
