import appDataSource from '../appDataSource.js';
import User from '../entity/userEntity.js';

const user = async (username) => {
  let userFound = await appDataSource.dataSource
    .getRepository(User)
    .findBy({ user: username });
  userFound = userFound.length ? userFound[0] : undefined;
  return userFound;
};

const updateUser = async (userdata) => {
  const userRepository = appDataSource.dataSource.getRepository(User);
  await userRepository.save(userdata);
};

const updatePassword = async (userdata) => {
  let sql = `UPDATE user SET password='${userdata.password}' WHERE user='${userdata.user}'`;

  let result = await appDataSource.dataSource.manager.query(sql);
  return result.affectedRows;
};

export default { user, updateUser, updatePassword };
