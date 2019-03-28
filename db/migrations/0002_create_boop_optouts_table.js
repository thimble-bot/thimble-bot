module.exports = {
  up: function (q, Sequelize) {
    return q.createTable('boop_optouts', {
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
      guild: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      userId: {
        type: Sequelize.BIGINT,
        allowNull: false
      }
    });
  },
  down: function (q, Sequelize) {
    return q.dropTable('boop_optouts');
  }
};
