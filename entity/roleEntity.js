import typeorm from 'typeorm';

const EntitySchema = typeorm.EntitySchema;

const Role = new EntitySchema({
  name: 'role', // Will use table name `category` as default behaviour.
  tableName: 'role', // Optional: Provide `tableName` property to override the default behaviour for table name.
  columns: {
    id: {
      primary: true,
      type: 'int',
    },
    role: {
      type: 'varchar',
      length: 20,
    },
    comment: {
      type: 'varchar',
      length: 2000,
    },
  },
});

export default Role;
