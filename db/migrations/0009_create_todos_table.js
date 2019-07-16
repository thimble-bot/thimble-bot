module.exports = {
  up: function (q, Sequelize) {
    return q.createTable('todos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      guildId: {
        type: Sequelize.STRING
      },
      todo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    });
  },
  down: function (q, Sequelize) {
    return q.dropTable('todos');
  }
};
