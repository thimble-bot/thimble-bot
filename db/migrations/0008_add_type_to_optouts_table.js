module.exports = {
  up: function (q, Sequelize) {
    return q.addColumn('boop_optouts', 'type', Sequelize.STRING);
  },
  down: function (q, Sequelize) {
    return q.removeColumn('boop_optouts', 'type');
  }
};
