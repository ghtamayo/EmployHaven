import typeorm from 'typeorm';

const EntitySchema = typeorm.EntitySchema;

const User_Languaje = new EntitySchema({
  name: 'user_languaje', // Will use table name `category` as default behaviour.
  tableName: 'user_languaje', // Optional: Provide `tableName` property to override the default behaviour for table name.
  columns: {
    user: {
      primary: true,
      type: 'varchar',
      length: 20,
    },
    initials: {
      primary: true,
      type: 'varchar',
      length: 5,
    },
  },
});

export default User_Languaje;
