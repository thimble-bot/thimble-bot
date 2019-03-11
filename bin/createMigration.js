const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const migrationsDir = path.join(__dirname, '..', 'db', 'migrations');
const migrationFilenames = fs.readdirSync(migrationsDir);

const MIGRATION_TEMPLATE = `module.exports = {
  up: function (q, Sequelize) {
    return q.addColumn('table', 'column_name', Sequelize.STRING);
  },
  down: function (q, Sequelize) {
    return q.removeColumn('table', 'column_name');
  }
};
`;

let currentIndex = 1;
migrationFilenames.forEach(function (fname) {
  const match = fname.match(/^(\d\d\d\d)_[.\w]+$/);

  if (!match) {
    throw new Error(`Bad filename ${fname}`);
  }

  if (parseInt(match[1]) !== currentIndex) {
    throw new Error(`Migration ${fname} should be ${currentIndex.toString().padStart(4, '0')}`);
  }

  currentIndex++;
});

inquirer.prompt([{
  type: 'string',
  name: 'name',
  message: 'Name the file:'
}])
  .then(function (answers) {
    const newFilename = `${currentIndex.toString().padStart(4, '0')}_${answers.name.replace(/ /g, '_')}.js`;
    const fullFilename = path.join(migrationsDir, newFilename);

    console.log(`Creating ${newFilename}`);

    fs.writeFileSync(fullFilename, MIGRATION_TEMPLATE);

    console.log('Done!');
  })
  .catch(function (err) {
    console.error(err);
  });
