import appDataSource from '../appDataSource.js';
import Languaje from '../entity/languajeEntity.js';
import { startUpper } from '../helpers/helpers.js';
import jobTypeRepository from '../repositories/jobTypeRepository.js';
import languajeRepository from '../repositories/languajeRepository.js';
import userEmploymentRepository from '../repositories/userEmploymentRepository.js';
import userLanguajeRepository from '../repositories/userLanguajeRepository.js';

const home = async (req, res) => {
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
    currentUser: req.cookies.currentUser,
    languajes,
    userLanguajes,
    userEmployments,
    userEmploymentData,
    jobTypes,
  });
};

export default { home };
