import * as fs from 'fs';
import * as path from 'path';

import { IConfig } from './typings/config';

const env = process.env.NODE_ENV || 'development';
let config: IConfig = {
  bot: {},
  firebase: {},
  guilds: {}
};

if (!fs.existsSync(path.resolve(__dirname, '../config', env)) && env !== 'production') {
  throw new Error(`no config file found for NODE_ENV=${env}.`);
}

if (env !== 'production') {
  const envKeys = fs.readdirSync(path.resolve(__dirname, '../config', env));
  envKeys.map(f => path.basename(f, '.json')).forEach(key => {
    (config as any)[key] = require(`../config/${env}/${key}.json`);
  });
} else {
  const secretsConfigFile = '/var/secrets/thimble-bot.json';

  if (!fs.existsSync(secretsConfigFile)) {
    throw new Error('Could not find secrets config file. The bot could not be started.');
  }

  config = require(secretsConfigFile);
}

export default config;
