import { body, validationResult } from 'express-validator';
import validationFormResult, { deleteImages } from '../helpers/helpers.js';
import optimizeImage from '../helpers/imageOptimization.js';
import userEmploymentRepository from '../repositories/userEmploymentRepository.js';
import userLanguajeRepository from '../repositories/userLanguajeRepository.js';
import userRepository from '../repositories/userRepository.js';
import __dirname from '../utils.js';
import fs from 'fs';
import languajeRepository from '../repositories/languajeRepository.js';
import jobTypeRepository from '../repositories/jobTypeRepository.js';

const addUserLanguaje = async (req, res) => {
  const { languaje } = req.body;
  let initials = languaje;
  let user = req.cookies.currentUser.user;
  await userLanguajeRepository.addUserLanguaje(user, initials);
  res.redirect('/auth');
};

const deleteUserLanguaje = async (req, res) => {
  let { user, initials } = req.params;
  await userLanguajeRepository.deleteUserLanguaje(user, initials);
  res.redirect('/auth');
};

const addUserEmployment = async (req, res) => {
  const { employment, experience, employment_old, experience_old } = req.body;
  let user = req.cookies.currentUser.user;

  await userEmploymentRepository.addEmployment(employment, experience, user);
  res.redirect('/auth');
};

const updateUserEmploymentData = async (req, res) => {
  let employmentdata = req.body;
  let user = req.cookies.currentUser.user;

  employmentdata = { ...employmentdata, user };
  await userEmploymentRepository.updateUserEmploymentData(employmentdata);
  res.redirect('/auth');
};

const updateUser = async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors = validationFormResult(req.body, errors.array());

    renderIndex(req, res, true, errors, undefined);

    if (req.file) {
      deleteImages([__dirname + '/public/img/uploads/' + req.file.filename]);
    }
    return;
  }

  if (req.file) {
    const imageName = await optimizeImage(req.file.filename);
    const sourceImagePath =
      __dirname + '/public/img/uploads/' + req.file.filename; // Ruta de la imagen en el servidor

    req.body.avatar = '/img/uploads/' + imageName;
    if (req.cookies.currentUser.avatar) {
      const splited = req.cookies.currentUser.avatar.split('/');
      deleteImages([
        __dirname + '/public/img/uploads/' + splited[splited.length - 1],
      ]);
    }
    deleteImages([sourceImagePath]);
  }

  res.cookie('currentUser', { ...req.cookies.currentUser, ...req.body });
  await userRepository.updateUser(req.body);
  res.redirect('/auth');
};

const deleteUserEmployment = async (req, res) => {
  let { employment } = req.params;
  let user = req.cookies.currentUser.user;
  await userEmploymentRepository.deleteEmployment(employment, user);
  res.redirect('/auth');
};

const updatePassword = async (req, res) => {
  let user = req.cookies.currentUser.user;

  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors = validationFormResult(req.body, errors.array());

    renderIndex(req, res, false, undefined, errors);

    return;
  }

  await userRepository.updatePassword({
    user: user,
    password: req.body.repassword,
  });

  res.redirect('/auth');
};

const updateUserValidator = [
  // Validar los campos del formulario utilizando express-validator
  body('email').isEmail().withMessage('Type an email!'),
  body('fullname').trim().notEmpty().withMessage('Write full name!'),
];

const updatePasswordValidator = [
  // Validar los campos del formulario utilizando express-validator
  body('password')
    .isStrongPassword({ minLength: 8 })
    .withMessage('Write strong password!'),
  body('repassword')
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage(`Password didn't match!`),
  body('repassword')
    .isStrongPassword({ minLength: 8 })
    .withMessage('Write strong password!'),
];

const renderIndex = async (
  req,
  res,
  isUserUpdated,
  userDataErrors,
  passwordErrors
) => {
  let languajes = await languajeRepository.languajes();
  let userLanguajes = await userLanguajeRepository.languajes(
    req.cookies.currentUser.user
  );
  let userEmployments = await userEmploymentRepository.employments(
    req.cookies.currentUser.user
  );
  let userEmploymentData = await userEmploymentRepository.employmentData(
    req.cookies.currentUser.user
  );
  let jobTypes = await jobTypeRepository.jobTypes();

  res.render('index', {
    title: 'EmployHaven',
    currentUser: isUserUpdated
      ? { ...req.cookies.currentUser, ...req.body }
      : { ...req.cookies.currentUser },
    languajes,
    userLanguajes,
    userEmployments,
    userEmploymentData,
    jobTypes,
    passwordData: isUserUpdated ? undefined : { ...req.body },
    userDataErrors: userDataErrors,
    passwordErrors: passwordErrors,
  });
};

export default {
  addUserLanguaje,
  deleteUserLanguaje,
  addUserEmployment,
  updateUserEmploymentData,
  deleteUserEmployment,
  updateUser,
  updateUserValidator,
  updatePassword,
  updatePasswordValidator,
};
