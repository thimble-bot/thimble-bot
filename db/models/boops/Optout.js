const db = require('../../service');

const Optout = db.define('optouts', {
  createdAt: {
    type: db.Sequelize.DATE,
    defaultValue: db.Sequelize.NOW
  },
  updatedAt: {
    type: db.Sequelize.DATE,
    defaultValue: db.Sequelize.NOW
  },
  guild: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  userId: {
    type: db.Sequelize.STRING,
    allowNull: false
  }
}, {
  tableName: 'boop_optouts',
  freezeTableName: true,
  name: {
    singular: 'optout'
  }
});

module.exports = Optout;
