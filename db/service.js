const Sequelize = require('sequelize');
const config = require('../config');

module.exports = new Sequelize(config.db.database, config.db.user, config.db.password, {
  host: config.db.host,
  dialect: config.db.dialect,
  logging: config.db.logging && console.log,

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports.Sequelize = Sequelize;
