module.exports = {
  up: function (q, Sequelize) {
    return q.addColumn('boops', 'type', Sequelize.STRING);
  },
  down: function (q, Sequelize) {
    return q.removeColumn('boops', 'type');
  }
};
