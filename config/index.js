const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const config = {};
const envConfig = {};

if (!fs.existsSync(path.resolve(__dirname, 'development'))) {
  throw new Error('Development config doesnt exist. Did you make a copy of the example folder?');
}

const devKeys = fs.readdirSync(path.resolve(__dirname, 'development'));
devKeys.map(f => path.basename(f, '.json')).forEach(key => {
  config[key] = require(`./development/${key}.json`);
});

if (!fs.existsSync(path.resolve(__dirname, env))) {
  throw new Error(`No config for NODE_ENV=${env}`);
}

if (env !== 'development') {
  const envKeys = fs.readdirSync(path.resolve(__dirname, env));
  envKeys.map(f => path.basename(f, '.json')).forEach(key => {
    envConfig[key] = require(`./${env}/${key}.json`);
  });
}

const deepassign = (dest, src) => {
  Object.keys(src).forEach(key => {
    if (typeof dest[key] === 'object' && dest[key] !== null) {
      return deepassign(dest[key], src[key]);
    }

    dest[key] = src[key];
  });
};

deepassign(config, envConfig);

if (env === 'production') {
  const secretsConfigFile = '/var/secrets/thimble-bot.json';

  if (!fs.existsSync(secretsConfigFile)) {
    throw new Error('Could not find secrets config file. The bot cannot be started.');
  }

  const secretsConfig = require(secretsConfigFile);
  deepassign(config, secretsConfig);
}

module.exports = config;
