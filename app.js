import express from 'express';

import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import config from './settings/config.js';
import __dirname from './utils.js';
import appDataSource from './appDataSource.js';

import errorController from './controllers/errorController.js';
import homeController from './controllers/homeController.js';
import authHomeController from './controllers/authHomeController.js';

import userRouter from './routes/userRoutes.js';
import { key } from './settings/keys.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import verifyToken from './middlewares/verifyToken.js';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

appDataSource.dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('key', key);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(function (req, res, next) {
//   res.set('authorization', '');
//   next();
// });

app.get('/', homeController.home);
app.get('/auth', verifyToken, authHomeController.home);
app.use('/user', authRoutes);

app.get('/info', verifyToken, (req, res) => {
  res.json('INFO OK');
});

// app.get('/login', userController.login);
// app.get('/register', userController.register);
// app.get('/users', userController.users);

app.use(errorController.error404);

app.listen(config.port, () => {
  console.log(`Server running in http://localhost:${config.port}`);
});
