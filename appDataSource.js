import typeorm from 'typeorm';
import User from './entity/userEntity.js';
import Role from './entity/roleEntity.js';
import User_Role from './entity/userRoleEntity.js';
import Languaje from './entity/languajeEntity.js';
import User_Languaje from './entity/userLanguajeEntity.js';
import Employment from './entity/employmentEntity.js';
import JobType from './entity/jobtypeEntity.js';
import EmploymentData from './entity/employmentDataEntity.js';

const dataSource = new typeorm.DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'abcd1234',
  database: 'employhaven',
  insecureAuth: false,
  synchronize: false,
  entities: [
    User,
    Role,
    User_Role,
    Languaje,
    User_Languaje,
    Employment,
    JobType,
    EmploymentData,
  ],
});

export default { dataSource };
