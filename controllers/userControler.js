import fs from 'fs';
import { Not } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

import appDataSource from '../appDataSource.js';
import __dirname from '../utils.js';
import optimizeImage from '../helpers/imageOptimization.js';
import User from '../entity/userEntity.js';
import Role from '../entity/roleEntity.js';
import User_Role from '../entity/userRoleEntity.js';
import { key } from '../settings/keys.js';
import config from '../settings/config.js';
import validationFormResult from '../helpers/helpers.js';
import { startUpper } from '../helpers/helpers.js';

const users = async (req, res) => {
  const users = await appDataSource.dataSource.getRepository(User).find();

  res.render('users', {
    title: 'Listado de usuarios',
    users: users,
  });
};

const insert = async (user) => {
  await appDataSource.dataSource.manager.transaction(
    async (transactionalEntityManager) => {
      await transactionalEntityManager.save(User, user);
      await transactionalEntityManager.save(User_Role, {
        user: user.user,
        role_id: user.role,
      });
    }
  );
};

const deleteImages = (images) => {
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

const registerRoles = async () => {
  let roles = await appDataSource.dataSource.getRepository(Role).findBy({
    role: Not('admin'),
  });

  return roles.map((role) => {
    role.role = startUpper(role.role);
    return role;
  });
};

const newLogin = async (req, res) => {
  res.render('login');
};

const login = async (req, res) => {
  const { user, password } = req.body;

  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors = validationFormResult(req.body, errors.array());

    return res.render('login', { user, password, errors });
  }

  try {
    let sql = `SELECT user.user, user.email, user.fullname, user.nationality, user.password, user.avatar, role.role
              FROM user
                INNER JOIN user_role ON user.user = user_role.user
                INNER JOIN role ON user_role.role_id = role.id
              WHERE user.user = '${user}'`;

    let userFound = await appDataSource.dataSource.manager.query(sql);
    userFound = userFound.length ? userFound[0] : undefined;

    if (!userFound) {
      errors = [
        { body: 'user', msg: 'Authentication failed, user not found!' },
        { body: 'password', msg: '' },
        { body: 'errors', msg: '' },
      ];
      return res.render('login', { user, password, errors });
    }

    // const passwordMatch = await bcrypt.compare(password, userFound.password);
    const passwordMatch = password.trim() === userFound.password.trim();

    if (!passwordMatch) {
      errors = [
        { body: 'user', msg: '' },
        { body: 'password', msg: 'Authentication failed, password incorrect!' },
        { body: 'errors', msg: '' },
      ];
      return res.render('login', { user, password, errors });
    }

    const token = jwt.sign({ userId: userFound.user + userFound.email }, key, {
      expiresIn: '1h',
    });

    userFound = {
      user: userFound.user,
      email: userFound.email,
      fullName: userFound.fullName,
      nationality: userFound.nationality,
      password: userFound.password,
      token: token,
      role: userFound.role,
    };

    // res.cookie('currentUser', userFound, config.cookieOptions);
    res.cookie('currentUser', userFound);
    res.redirect('/auth');
  } catch (error) {
    errors = [
      { body: 'user', msg: '' },
      { body: 'password', msg: '' },
      { body: 'errors', msg: 'Login failed!' },
    ];
    return res.render('login', { user, password, errors });
  }
};

const logout = async (req, res) => {
  // Eliminar la cookie del token y redirigir a la página de inicio de sesión
  res.clearCookie('currentUser');
  res.redirect('/');
};

const newRegister = async (req, res) => {
  let roles = await registerRoles();

  res.render('register', { roles });
};

const register = async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors = validationFormResult(req.body, errors.array());
    let roles = await registerRoles();

    return res.render('register', { data: req.body, roles, errors });
  }

  req.body.avatar = null;
  // req.body.password = await bcrypt.hash(req.body.password, 10);

  if (req.file) {
    const imagePath = await optimizeImage(req.file.filename);
    const sourceImagePath = __dirname + '/uploads/' + req.file.filename; // Ruta de la imagen en el servidor

    fs.readFile(imagePath, async (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error al leer el archivo de imagen.');
      } else {
        req.body.avatar = `data:image/webp;base64,${data.toString('base64')}`;

        await insert(req.body);

        res.redirect('/user/login');
        deleteImages([imagePath, sourceImagePath]);
      }
    });
  } else {
    await insert(req.body);

    res.redirect('/user/login');
  }
};

export default { users, newLogin, login, logout, newRegister, register };
