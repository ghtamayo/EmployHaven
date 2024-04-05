import typeorm from 'typeorm';

const EntitySchema = typeorm.EntitySchema;

const Languaje = new EntitySchema({
  name: 'language', // Will use table name `category` as default behaviour.
  tableName: 'languaje', // Optional: Provide `tableName` property to override the default behaviour for table name.
  columns: {
    initials: {
      primary: true,
      type: 'varchar',
      length: 5,
    },
    languaje: {
      type: 'varchar',
      length: 100,
    },
  },
});

export default Languaje;
