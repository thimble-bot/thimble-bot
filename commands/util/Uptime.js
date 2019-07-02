const { Command } = require('discord.js-commando');
const prettyMs = require('pretty-ms');

const meta = {
  name: 'uptime',
  description: 'Get the bot\'s uptime.'
};

class Uptime extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      group: 'util',
      memberName: 'uptime'
    });
  }

  run(message) {
    const uptime = process.uptime();

    message.say(':stopwatch: `' + prettyMs(uptime) + '`');
  }
};

module.exports = Uptime;
module.exports.meta = meta;
