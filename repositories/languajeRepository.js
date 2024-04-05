import appDataSource from '../appDataSource.js';
import Languaje from '../entity/languajeEntity.js';

const languajes = async () => {
  let languajesFound = await appDataSource.dataSource
    .getRepository(Languaje)
    .find();
  languajesFound = languajesFound.length ? languajesFound : undefined;
  return languajesFound;
};

export default {
  languajes,
};
