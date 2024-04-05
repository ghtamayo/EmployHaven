import typeorm from 'typeorm';

const EntitySchema = typeorm.EntitySchema;

const Employment = new EntitySchema({
  name: 'employment', // Will use table name `category` as default behaviour.
  tableName: 'employment', // Optional: Provide `tableName` property to override the default behaviour for table name.
  columns: {
    employment: {
      primary: true,
      type: 'varchar',
      length: 255,
    },
    experience: {
      type: 'varchar',
      length: 20,
    },
    user: {
      type: 'varchar',
      length: 20,
    },
  },
});

export default Employment;
