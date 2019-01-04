const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
let config = {};

if (!fs.existsSync(path.resolve(__dirname, env)) && env !== 'production') {
  throw new Error(`No config for NODE_ENV=${env}. Try running 'NODE_ENV=${env} yarn setup'.`);
}

if (env !== 'production') {
  const envKeys = fs.readdirSync(path.resolve(__dirname, env));
  envKeys.map(f => path.basename(f, '.json')).forEach(key => {
    config[key] = require(`./${env}/${key}.json`);
  });
} else {
  const secretsConfigFile = '/var/secrets/thimble-bot.json';

  if (!fs.existsSync(secretsConfigFile)) {
    throw new Error('Could not find secrets config file. The bot cannot be started.');
  }

  config = require(secretsConfigFile);
}

module.exports = config;
