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
section('1. Common bot settings');

const setup = async () => {
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
    }
  ]);

  section('2. StatusTracker settings');

  const StatusTracker = await prompt([
    {
      type: 'input',
      name: 'channel',
      message: 'StatusTracker channel ID'
    },
    {
      type: 'number',
      name: 'refreshInterval',
      message: 'Check interval (hours):',
      default: 1
    },
    {
      type: 'number',
      name: 'timeout',
      message: 'Timeout (seconds):',
      default: 5
    },
    {
      type: 'confirm',
      name: 'quiet',
      message: 'Quiet mode?',
      default: true
    },
    {
      type: 'input',
      name: 'domains',
      message: 'Domains, separated by comma:'
    }
  ]);

  StatusTracker.domains = StatusTracker.domains
    ? StatusTracker.domains.split(',').map(d => d.trim())
    : [];

  section('3. MovieTracker settings');

  const MovieTracker = await prompt([
    {
      type: 'confirm',
      name: 'debug',
      message: 'Debug mode?',
      default: true
    },
    {
      type: 'input',
      name: 'channel',
      message: 'Channel ID:'
    },
    {
      type: 'input',
      name: 'time',
      message: 'Time of automated checking (24-hour format):',
      default: '6:00'
    }
  ]);

  MovieTracker.portdothu = {
    channels: [],
    genres: []
  };

  MovieTracker.cinemagia = {
    channels: [],
    genre: ''
  };

  const MovieTrackerConfigPath = env === 'production'
    ? `(../temp/thimble-bot.json).MovieTracker`
    : `config/${env}/MovieTracker.json`;

  console.log(chalk.blue(`Make sure to edit the channels and genres in ${chalk.bold(MovieTrackerConfigPath)}`));

  section('Generating configs. Please wait...');

  if (env === 'production') {
    const config = {
      bot,
      StatusTracker,
      MovieTracker
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
  writeConfig('StatusTracker', StatusTracker);
  writeConfig('MovieTracker', MovieTracker);

  console.log('Done.');
  process.exit(0);
};

setup();
