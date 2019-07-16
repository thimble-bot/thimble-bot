module.exports = {
  up: function (q, Sequelize) {
    return q.addColumn('boops', 'counts', Sequelize.STRING);
  },
  down: function (q, Sequelize) {
    return q.removeColumn('boops', 'counts');
  }
};
