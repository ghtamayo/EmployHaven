import typeorm from 'typeorm';

const EntitySchema = typeorm.EntitySchema;

const EmploymentData = new EntitySchema({
  name: 'employmentdata', // Will use table name `category` as default behaviour.
  tableName: 'employmentdata', // Optional: Provide `tableName` property to override the default behaviour for table name.
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    user: {
      type: 'varchar',
      length: 20,
    },
    haveworkpermit: {
      type: 'boolean',
    },
    ein: {
      type: 'boolean',
    },
    havepreviousstudies: {
      type: 'boolean',
    },
    position: {
      type: 'varchar',
      length: 1000,
    },
    havespecialpermits: {
      type: 'boolean',
    },
    extratime: {
      type: 'boolean',
    },
    aspireto: {
      type: 'varchar',
      length: 3000,
    },
    jobtype: {
      type: 'int',
    },
    perday: {
      type: 'decimal',
      precision: 10,
      scale: 2,
    },
    perhour: {
      type: 'decimal',
      precision: 10,
      scale: 2,
    },
  },
});

export default EmploymentData;
