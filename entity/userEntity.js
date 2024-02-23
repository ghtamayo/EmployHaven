import typeorm from 'typeorm';

const EntitySchema = typeorm.EntitySchema;

const User = new EntitySchema({
  name: 'user', // Will use table name `category` as default behaviour.
  tableName: 'user', // Optional: Provide `tableName` property to override the default behaviour for table name.
  columns: {
    user: {
      primary: true,
      type: 'varchar',
      length: 150,
      //   generated: true,
    },
    email: {
      type: 'varchar',
      length: 255,
    },
    fullname: {
      type: 'varchar',
      length: 255,
    },
    avatar: {
      type: 'longblob',
    },
    nationality: {
      type: 'varchar',
      length: 60,
    },
    password: {
      type: 'varchar',
      length: 255,
    },
    reset_token: {
      type: 'varchar',
      length: 255,
    },
    active: {
      type: 'bit',
      // length: 1,
    },
  },
});

export default User;
