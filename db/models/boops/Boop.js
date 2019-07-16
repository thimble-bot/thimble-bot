const db = require('../../service');
const invert = require('lodash.invert');

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
  },
  counts: {
    type: db.Sequelize.STRING,
    defaultValue: 1
  },
  type: {
    type: db.Sequelize.STRING,
    defaultValue: 'boop'
  }
});

Boop.INTERACTION_TYPES = {
  boop: 1,
  hug: 2,
  highfive: 3
};

Object.assign(Boop.INTERACTION_TYPES, invert(Boop.INTERACTION_TYPES));

module.exports = Boop;
