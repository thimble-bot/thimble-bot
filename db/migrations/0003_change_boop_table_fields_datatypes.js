module.exports = {
  up: function (q, Sequelize) {
    return new Promise(async (resolve, reject) => {
      try {
        q.changeColumn('boops', 'sender', Sequelize.STRING);
        q.changeColumn('boops', 'receiver', Sequelize.STRING);
        q.changeColumn('boops', 'guild', Sequelize.STRING);
        return resolve();
      } catch (err) {
        return reject(err);
      }
    });
  },
  down: function (q, Sequelize) {
    return new Promise(resolve => resolve());
  }
};
