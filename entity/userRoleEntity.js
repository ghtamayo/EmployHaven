import typeorm from 'typeorm';

const EntitySchema = typeorm.EntitySchema;

const User_Role = new EntitySchema({
  name: 'user_role', // Will use table name `category` as default behaviour.
  tableName: 'user_role', // Optional: Provide `tableName` property to override the default behaviour for table name.
  columns: {
    user: {
      primary: true,
      type: 'varchar',
      length: 20,
    },
    role_id: {
      primary: true,
      type: 'int',
    },
  },
});

export default User_Role;
