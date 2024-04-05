import appDataSource from '../appDataSource.js';
import EmploymentData from '../entity/employmentDataEntity.js';
import Employment from '../entity/employmentEntity.js';

const employments = async () => {
  let employmentsFound = await appDataSource.dataSource
    .getRepository(Employment)
    .find();
  employmentsFound = employmentsFound.length ? employmentsFound : undefined;
  return employmentsFound;
};

const employment = async (employment) => {
  let employmentFound = await appDataSource.dataSource
    .getRepository(Employment)
    .findBy({ employment: employment });
  employmentFound = employmentFound.length ? employmentFound[0] : undefined;
  return employmentFound;
};

const employmentData = async (employment) => {
  let employmentDataFound = await appDataSource.dataSource
    .getRepository(EmploymentData)
    .findBy({ user: employment });
  employmentDataFound = employmentDataFound.length
    ? employmentDataFound[0]
    : undefined;
  return employmentDataFound;
};

const addEmployment = async (employment, experience, user) => {
  const employmentRepository =
    appDataSource.dataSource.getRepository(Employment);
  await employmentRepository.save({ employment, experience, user });
};

const deleteEmployment = async (employment, user) => {
  const employmentRepository =
    appDataSource.dataSource.getRepository(Employment);
  await employmentRepository.delete({ employment, user });
};

const updateUserEmploymentData = async (employmentdata) => {
  employmentdata.id = parseInt(employmentdata.id);

  employmentdata.haveworkpermit = parseInt(employmentdata.haveworkpermit);
  employmentdata.ein = parseInt(employmentdata.ein);
  employmentdata.havepreviousstudies = parseInt(
    employmentdata.havepreviousstudies
  );
  employmentdata.havespecialpermits = parseInt(
    employmentdata.havespecialpermits
  );
  employmentdata.extratime = parseInt(employmentdata.extratime);

  const employmentRepository =
    appDataSource.dataSource.getRepository(EmploymentData);
  await employmentRepository.save(employmentdata);
};

export default {
  employments,
  employment,
  employmentData,
  addEmployment,
  deleteEmployment,
  updateUserEmploymentData,
};
