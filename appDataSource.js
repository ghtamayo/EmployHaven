import typeorm from 'typeorm';
import User from './entity/userEntity.js';
import Role from './entity/roleEntity.js';
import User_Role from './entity/userRoleEntity.js';

const dataSource = new typeorm.DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'abcd1234',
  database: 'employhaven',
  insecureAuth: false,
  synchronize: false,
  entities: [User, Role, User_Role],
});

export default { dataSource };
