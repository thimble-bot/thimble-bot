module.exports = {
  up: function (q, Sequelize) {
    return q.createTable('guilds', {
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
      guildId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      prefix: {
        type: Sequelize.STRING,
        defaultValue: '.',
        allowNull: false
      }
    });
  },
  down: function (q, Sequelize) {
    return q.dropTable('guilds');
  }
};
