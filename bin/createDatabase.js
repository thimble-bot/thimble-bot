const config = require('../config');
const mysql = require('mysql2/promise');

let connection;

const query = sql => {
  return function () {
    config.bot.logging.enabled && console.log(sql);
    return connection.query(sql);
  };
};

const { user, host, password, database } = config.db;

mysql.createConnection({
  user,
  host,
  password
})
  .then(conn => {
    connection = conn;
    console.log(`Connected to MySQL ${user}@${host}:${database}`);

    return query(`CREATE DATABASE IF NOT EXISTS ${database}`)();
  })
  .then(query(`USE ${database}`))
  .then(query(`CREATE TABLE IF NOT EXISTS migrations (name VARCHAR(255))`))
  .then(function () {
    console.log('Done!');
  })
  .catch(err => console.error(err))
  .then(function () {
    connection.end();
  });
