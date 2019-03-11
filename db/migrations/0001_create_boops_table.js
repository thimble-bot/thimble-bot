module.exports = {
  up: function (q, Sequelize) {
    return q.createTable('boops', {
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
      sender: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      receiver: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      guild: {
        type: Sequelize.BIGINT,
        allowNull: false
      }
    });
  },
  down: function (q, Sequelize) {
    return q.dropTable('boops');
  }
};
