import appDataSource from '../appDataSource.js';
import User_Languaje from '../entity/userLanguajeEntity.js';

const languajes = async (user) => {
  let sql = `SELECT user_languaje.user, languaje.initials, languaje.languaje
              FROM user_languaje
                INNER JOIN languaje ON languaje.initials = user_languaje.initials
              WHERE user_languaje.user = '${user}'`;

  let languajesFound = await appDataSource.dataSource.manager.query(sql);
  languajesFound = languajesFound.length ? languajesFound : undefined;
  return languajesFound;
};

const addUserLanguaje = async (user, initials) => {
  const userlanguajeRepository =
    appDataSource.dataSource.getRepository(User_Languaje);
  await userlanguajeRepository.save({ user, initials });
};

const deleteUserLanguaje = async (user, initials) => {
  const userlanguajeRepository =
    appDataSource.dataSource.getRepository(User_Languaje);
  await userlanguajeRepository.delete({ user, initials });
};

export default { languajes, addUserLanguaje, deleteUserLanguaje };
