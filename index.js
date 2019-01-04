const Commando = require('discord.js-commando');
const path = require('path');

const config = require('./config');

const ServerStatusWorker = require('./workers/ServerStatusWorker');
const MoviesWorker = require('./workers/MoviesWorker');

const client = new Commando.Client({
  commandPrefix: config.bot.prefix,
  disableEveryone: true,
  unknownCommandResponse: false
});

client
  .registry
  .registerDefaultTypes()
  .registerGroups([
    [ 'utils', 'Utilities' ],
    [ 'moderation', 'Moderation' ]
  ])
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
  console.log('Bot started.');

  if (config.bot.activity) {
    client.setActivity(config.bot.activity);
  }

  ServerStatusWorker(client);
  MoviesWorker(client);
});

client.login(config.bot.token);
