const db = require('../../service');

const Todo = db.define('todo', {
  createdAt: {
    type: db.Sequelize.DATE,
    defaultValue: db.Sequelize.NOW
  },
  updatedAt: {
    type: db.Sequelize.DATE,
    defaultValue: db.Sequelize.NOW
  },
  userId: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  guildId: {
    type: db.Sequelize.STRING
  },
  todo: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: db.Sequelize.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'todos',
  freezeTableName: true,
  name: {
    singular: 'todos'
  }
});

Todo.STATUS = {
  pending: 0,
  done: 1
};

module.exports = Todo;
