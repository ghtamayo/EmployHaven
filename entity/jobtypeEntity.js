import typeorm from 'typeorm';

const EntitySchema = typeorm.EntitySchema;

const JobType = new EntitySchema({
  name: 'jobtype', // Will use table name `category` as default behaviour.
  tableName: 'jobtype', // Optional: Provide `tableName` property to override the default behaviour for table name.
  columns: {
    id: {
      primary: true,
      type: 'int',
    },
    role: {
      type: 'varchar',
      length: 255,
    },
  },
});

export default JobType;
