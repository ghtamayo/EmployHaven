import appDataSource from '../appDataSource.js';

const jobTypes = async () => {
  let sql = `SELECT id, type FROM jobtype order by id`;

  let jobTypesFound = await appDataSource.dataSource.manager.query(sql);
  jobTypesFound = jobTypesFound.length ? jobTypesFound : undefined;
  return jobTypesFound;
};

export default { jobTypes };
