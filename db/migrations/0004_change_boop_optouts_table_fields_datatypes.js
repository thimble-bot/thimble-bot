module.exports = {
  up: function (q, Sequelize) {
    return new Promise(async (resolve, reject) => {
      try {
        q.changeColumn('boop_optouts', 'guild', Sequelize.STRING);
        q.changeColumn('boop_optouts', 'userId', Sequelize.STRING);
        return resolve();
      } catch (err) {
        return reject(err);
      }
    });
  },
  down: function (q, Sequelize) {
    return null;
  }
};
