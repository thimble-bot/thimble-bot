const Commando = require('discord.js-commando');
const path = require('path');
const Raven = require('raven');
const puppeteer = require('puppeteer');

const config = require('./config');

const log = require('./lib/Logger');
const Guild = require('./db/models/guilds/Guild');

if (config.bot.sentry.secret && config.bot.sentry.id) {
  const dsn = `https://${config.bot.sentry.public}:${config.bot.sentry.secret}@sentry.io/${config.bot.sentry.id}`;
  Raven.config(dsn).install();
}

const client = new Commando.Client({
  commandPrefix: config.bot.prefix,
  disableEveryone: true,
  owner: config.bot.owner,
  unknownCommandResponse: false
});

client
  .registry
  .registerDefaultTypes()
  .registerGroups([
    [ 'fun', 'Fun commands' ],
    [ 'maintenance', 'Maintenance features' ],
    [ 'moderation', 'Moderation' ],
    [ 'boop', 'User interaction commands' ],
    [ 'custom', 'Custom commands' ]
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    help: false
  })
  .registerCommandsIn(path.join(__dirname, 'commands'))
  .registerCommandsIn(path.join(__dirname, 'custom', 'commands'));

client.on('ready', async () => {
  console.log('Bot started.');

  if (config.bot.activity) {
    client.setActivity(config.bot.activity);
  }

  // invoking workers
  const workers = path.join(__dirname, 'workers');
  const customWorkers = path.join(__dirname, 'custom', 'workers');

  Object.values(require('require-all')(workers)).forEach(worker => worker(client));
  Object.values(require('require-all')(customWorkers)).forEach(worker => worker(client));

  global.browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
});

client.on('message', message => {
  if (message.guild && message.content.startsWith(config.bot.prefix)) {
    const command = message.content.slice(1).split(' ')[0].toLowerCase();

    if (client.registry.commands.array().find(cmd => cmd.name === command || cmd.aliases.includes(command))) {
      log(client, message, command);
    }
  }
});

client.on('guildCreate', guild => {
  return Guild.create({ guildId: guild.id })
    .catch(err => console.error(err));
});

client.on('guildDelete', guild => {
  return Guild.destroy({ where: { guildId: guild.id } })
    .catch(err => console.error(err));
});

client.login(config.bot.token);
