const Umzug = require('umzug');
const Sequelize = require('sequelize');
const sequelize = require('../db/service');
const program = require('commander');

program
  .option('--r, --rollback', 'Rollback migrations.')
  .option('--v, --verbose', 'Print umzug logs')
  .parse(process.argv);

const umzug = new Umzug({
  storage: 'sequelize',
  logging: program.verbose && console.log,
  storageOptions: {
    sequelize,
    modelName: 'Migration',
    tableName: 'migrations',
    columnName: 'name',
    columnType: new Sequelize.STRING(255)
  },
  migrations: {
    path: 'db/migrations',
    params: [ sequelize.getQueryInterface(), sequelize.constructor ]
  }
});

if (program.rollback) {
  umzug
    .down()
    .then(migrations => {
      migrations.forEach(m => console.log(`Rolled back ${m.file}!`));
      console.log('Done!');
      process.exit();
    });
} else {
  umzug
    .up()
    .then(migrations => {
      migrations.forEach(m => console.log(`Ran ${m.file}!`));
      console.log('Done!');
      process.exit();
    });
}
