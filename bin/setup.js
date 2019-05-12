#!/usr/bin/env node

const { prompt } = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';

if (env === 'example') {
  console.log('There is no need for one more example config!');
  process.exit(0);
}

const section = str => {
  console.log('\n------------------------------------\n');
  console.log(`${str}\n`);
};

const writeConfig = (key, config) => {
  const configJSON = JSON.stringify(config, null, 2);
  fs.writeFileSync(path.resolve(__dirname, '..', 'config', env, `${key}.json`), configJSON, {
    charset: 'utf8'
  });
};

console.log(`Generating configs for "${env}" environment.`);

const setup = async () => {
  let step = 1;

  section(`${step}. Common bot settings`);
  const bot = await prompt([
    {
      type: 'input',
      name: 'token',
      message: 'Bot token:'
    },
    {
      type: 'input',
      name: 'activity',
      message: 'Game activity:',
      default: null
    },
    {
      type: 'input',
      name: 'prefix',
      message: 'Bot prefix:'
    },
    {
      type: 'input',
      name: 'guild',
      message: 'Guild ID:'
    },
    {
      type: 'input',
      name: 'owner',
      message: 'Your user ID:'
    },
    {
      type: 'input',
      name: 'logging',
      message: 'Log channel ID (leave empty if you dont want logging):',
      default: null
    },
    {
      type: 'input',
      name: 'sentry',
      message: 'Sentry details (public, secret, id, separated by comma)\nLeave empty if you don\'t want to configure Sentry.',
      default: null
    }
  ]);

  if (bot.logging) {
    bot.logging = {
      enabled: true,
      channel: bot.logging
    };
  } else {
    bot.logging = {
      enabled: false
    };
  }

  if (bot.sentry) {
    const sentryData = bot.sentry.split(',').map(d => d.trim());
    bot.sentry = {
      public: sentryData[0],
      secret: sentryData[1],
      id: sentryData[2]
    };
  } else {
    bot.sentry = {
      public: null,
      secret: null,
      id: null
    };
  }

  step++;

  section(`${step}. Database settings`);

  const db = await prompt([
    {
      type: 'input',
      name: 'host',
      message: 'Host'
    },
    {
      type: 'input',
      name: 'user',
      message: 'Username'
    },
    {
      type: 'input',
      mask: '*',
      name: 'password',
      message: 'Password'
    },
    {
      type: 'input',
      name: 'database',
      message: 'Database name'
    },
    {
      type: 'list',
      name: 'dialect',
      choices: [
        'mysql'
      ],
      message: 'Dialect'
    },
    {
      type: 'confirm',
      name: 'logging',
      message: 'Enable logging?',
      default: false
    }
  ]);

  section('Generating configs. Please wait...');

  if (env === 'production') {
    const config = {
      bot,
      db
    };

    const configJSON = JSON.stringify(config, null, 2);
    fs.writeFileSync(path.resolve(__dirname, '..', 'temp', 'thimble-bot.json'), configJSON, {
      charset: 'utf8'
    });

    console.log(chalk.blue(`Production config file saved to ${chalk.bold('../temp/thimble-bot.json')}.`));
    console.log(chalk.blue(`Make sure to move this file to ${chalk.bold('/var/secrets/thimble-bot.json')}.`));

    process.exit(0);
  }

  fs.mkdirSync(path.resolve(__dirname, '..', 'config', env));

  writeConfig('bot', bot);
  writeConfig('db', db);

  console.log('Done.');
  process.exit(0);
};

setup();
