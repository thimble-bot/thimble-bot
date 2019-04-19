const db = require('../../service');

const Guild = db.define('guild', {
  createdAt: {
    type: db.Sequelize.DATE,
    defaultValue: db.Sequelize.NOW
  },
  updatedAt: {
    type: db.Sequelize.DATE,
    defaultValue: db.Sequelize.NOW
  },
  guildId: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  prefix: {
    type: db.Sequelize.STRING,
    defaultValue: '.',
    allowNull: false
  }
});

module.exports = Guild;
