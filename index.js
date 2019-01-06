const Commando = require('discord.js-commando');
const path = require('path');

const config = require('./config');

const log = require('./lib/Logger');

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
    [ 'moderation', 'Moderation' ],
    [ 'fun', 'Fun commands' ]
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

client.on('message', message => {
  if (message.guild && message.content.startsWith(config.bot.prefix)) {
    const command = message.content.slice(1).split(' ')[0].toLowerCase();

    if (client.registry.commands.array().find(cmd => cmd.name === command || cmd.aliases.includes(command))) {
      log(client, message, command);
    }
  }
});

client.login(config.bot.token);
