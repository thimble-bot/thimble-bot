const db = require('../../service');

const Boop = db.define('boop', {
  createdAt: {
    type: db.Sequelize.DATE,
    defaultValue: db.Sequelize.NOW
  },
  updatedAt: {
    type: db.Sequelize.DATE,
    defaultValue: db.Sequelize.NOW
  },
  sender: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  receiver: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  guild: {
    type: db.Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Boop;
